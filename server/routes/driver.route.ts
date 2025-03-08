/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 21:54:04
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 17:59:17
 * @Description:
 */
import express from 'express';
import {
  getAllRides,
  updatingRideStatus,
  newRide,
  getDriversById,
  getLoggedInDriverData,
  sendingOtpToEmail,
  sendingOtpToPhone,
  updateDriverStatus,
  verifyingEmailOtp,
  verifyPhoneOtpForLogin,
  verifyPhoneOtpForRegistration,
} from '../controllers/driver.controller';
import { isAuthenticatedDriver } from '../middleware/isAuthenticated';

const driverRouter = express.Router();

driverRouter.post('/sedn-otp', sendingOtpToPhone);

driverRouter.post('/login', verifyPhoneOtpForLogin);

driverRouter.post('/verify-otp', verifyPhoneOtpForRegistration);

driverRouter.put('/email-otp-request', sendingOtpToEmail);

driverRouter.post('/registration-driver', verifyingEmailOtp);

driverRouter.get('/me', isAuthenticatedDriver, getLoggedInDriverData);

driverRouter.put('/update-status', isAuthenticatedDriver, updateDriverStatus);

driverRouter.get('/get-drivers-data', getDriversById);

driverRouter.post('/new-ride', isAuthenticatedDriver, newRide);

driverRouter.put(
  '/update-ride-status',
  isAuthenticatedDriver,
  updatingRideStatus
);

driverRouter.get('/get-rides', isAuthenticatedDriver, getAllRides);

export default driverRouter;
