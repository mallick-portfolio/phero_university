import express, { Application, Request, Response } from 'express';
const app: Application = express();

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/route/intex';
import notFound from './app/middlewares/notFound';

// default middleware
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
