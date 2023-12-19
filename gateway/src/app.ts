import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorMiddleware } from './middlewares/errorMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';
import gatewayRoutes from './routes/gatewayRoutes';

const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/api', gatewayRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export = app;
