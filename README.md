# RideWave - 基于Expo和React Native的打车软件

## 简介
RideWave 是一款使用 React Native 框架和 Expo 构建的现代化打车应用程序。该应用旨在为用户提供便捷、高效的打车服务，同时为司机提供接单和管理行程的功能。借助 React Native 的跨平台特性，RideWave 可以同时在 iOS 和 Android 设备上运行，为广大用户带来一致的优质体验。

## 功能特性

### 用户端
- **实时定位**：利用设备的 GPS 功能，实时获取用户的当前位置，方便用户快速叫车。
- **目的地选择**：支持用户手动输入目的地或从常用地址中选择，系统会自动计算预估费用和行程时间。
- **车辆选择**：提供多种车型供用户选择，满足不同用户的需求。
- **实时跟踪**：在行程中，用户可以实时跟踪车辆的位置和行驶路线，了解预计到达时间。
- **支付功能**：支持多种支付方式，如信用卡、支付宝、微信支付等，方便用户完成支付。

### 司机端
- **订单接收**：司机可以实时接收附近的订单，并选择是否接单。
- **导航功能**：集成地图导航功能，帮助司机快速准确地到达乘客上车点和目的地。
- **行程管理**：司机可以查看自己的行程历史、收入统计等信息，方便管理工作。

## 安装与运行

### 前提条件
- 安装 Node.js 和 npm（Node Package Manager）
- 安装 Expo CLI：`npm install -g expo-cli`

### 步骤
1. **克隆仓库**
```bash
git clone https://github.com/xb2lf/RideWave.git
cd RideWave
```
2. **安装依赖**
```bash
npm install
```
3. **启动开发服务器**
```bash
npx expo run start
```
4. **运行应用**
+ 使用 Expo Go 应用扫描二维码，在 iOS 或 Android 设备上运行应用。
+ 或者使用模拟器，选择相应的模拟器选项启动应用。

### 技术栈
- React Native：用于构建跨平台的移动应用界面。
- Expo：提供开发、构建和部署应用所需的工具和服务。
- Expo Router：实现应用的导航功能。
- Express：作为后端服务器框架，处理业务逻辑和 API 请求。
- Prisma：用于与 MongoDB 数据库进行交互，实现数据的存储和管理。
- Nylas：用于短信收发验证和邮件收发验证。
- ws：实现 WebSocket 通信，用于实时数据传输，如订单状态更新等。
- 谷歌地图和 Geolib：提供导航和地图相关功能，以及地理数据处理。
