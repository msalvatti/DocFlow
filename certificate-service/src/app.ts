import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';

import { authMiddleware } from './middlewares/authMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';
import certificateRoutes from './routes/certificateRoutes';
import fileRoutes from './routes/fileRoutes';

const app: Application = express();
app.use(express.json());
app.use(helmet());

const corsOrigin = process.env.GATEWAY_URL;
const whitelist = (corsOrigin || '*').split(',');
app.use(cors({
    origin: (origin, callback) => {
        if (whitelist[0] === '*' || whitelist.includes(origin as string)) {
            callback(null, true);
        } else {
            callback(new Error(`Received origin: ${origin} | Not allowed by CORS`));
        }
    }
}));

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/api/certificate', authMiddleware, certificateRoutes);

const uploadMiddleware = multer({ dest: "files" });
app.use('/api/certificate/upload', authMiddleware, uploadMiddleware.single("file"), fileRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export = app;
