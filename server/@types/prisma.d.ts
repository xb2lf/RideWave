/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 21:24:45
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-06 21:25:07
 * @Description:
 */
import { PrismaClient } from '@prisma/client';
declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
