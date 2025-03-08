/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 18:37:53
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 13:58:09
 * @Description:
 */
import express from 'express';
import {
  getAllRides,
  getLoggedInUserData,
  registerUser,
  sendingOtpToEmail,
  verifyingEmail,
  verityOtp,
} from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';

const userRouter = express.Router();

userRouter.post('/registration', registerUser);

userRouter.post('/verify-otp', verityOtp);

userRouter.post('/email-otp-request', sendingOtpToEmail);

userRouter.put('/email-otp-verify', verifyingEmail);

userRouter.get('/me', isAuthenticated, getLoggedInUserData);

userRouter.get('/get-rides', isAuthenticated, getAllRides);

export default userRouter;
