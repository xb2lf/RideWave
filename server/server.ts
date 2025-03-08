/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 16:40:15
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-06 17:51:05
 * @Description:
 */
import http from 'http';
import { app } from './app';

const server = http.createServer(app);

// create server
server.listen(process.env.PORT, () => {
  console.log(`Serve is connected width port ${process.env.PORT}`);
});
