/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 16:40:04
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 22:01:03
 * @Description:
 */
require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import driverRouter from './routes/driver.route';
import Nylas from 'nylas';

export const app = express();

export const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY!,
  apiUri: 'https://api.eu.nylas.com',
});

// body parser
app.use(express.json({ limit: '50mb' }));

// cookie parserv
app.use(cookieParser());

// routes
app.use('/api/v1', userRouter);
app.use('/api/v1/driver', driverRouter);

// testing api
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: 'API is working',
  });
});
