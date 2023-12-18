import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { errorMiddleware } from './middlewares/errorMiddleware';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware';

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}



app.use(notFoundMiddleware);

app.use(errorMiddleware);

export = app;
