import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { authMiddleware } from './middlewares/authMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';
import certificateRoutes from './routes/certificateRoutes';

const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/api/certificate', authMiddleware, certificateRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export = app;
