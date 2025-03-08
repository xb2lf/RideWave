/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 12:01:20
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 12:20:29
 * @Description:
 */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Please Log in to access this content!' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
    // Verify the token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        const userData = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        // Attach the user data to the request object
        req.user = userData;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticatedDriver = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Please Log in to access this content!' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        const driverData = await prisma.driver.findUnique({
          where: {
            id: decoded.id,
          },
        });
        // Attach the user data to the request object
        req.driver = driverData;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};
