# LearnTechTogether
前端：`React`


后端: `Rust`

数据库:`Postgrpesql`


接口测试:`ApiFox`
## 后端开发
使用rust进行开发，使用rust的第三库axum作为接口服务器，使用tokio处理数据库和io,使用serde_json进行接口json数据的序列化
和反序列化。服务器开启于本地地址3000端口，为前端提供接口服务。
目前有如下接口
### 用户注册
前端需要传递注册者的邮箱，用户名，密码，验证码，由后端处理后返回相应状态码。
```json
   {
  "name":"xxx",
  "email": "xxx",
  "passwd": "xxx",
  "verify": "xxx"
}
```
### 用户登录（未实现）
前端传递（邮箱或用户名），密码，验证码给后端。

### cookie生成和检测
避免用户重复登录。
### 验证码(未实现)
用于登录和注册。验证码超过一定时间会失效。
### 文章相关操作
等前端实现

### 现阶段的问题

数据库，数据模型的确定（用户怎么存，文章怎么存，怎么检索）。
后端和数据库的交互，还有验证码和cookie模块（todo:axum示例也许有）。

### 后端api

- create_user
  - 回应
    - wronglength
    - space in values
    - user exist
    - email exist
    - user create success
  - 

## 前端开发

### 前端规范

- 模型与视图分离，模型使用**PaStateMan**管理
- 业务逻辑根据功能划分成proxy，通过从pastateman获取主proxy，在获取各个模块的proxy，proxy对操作逻辑进行封装。**界面**对数据的**读取**以及**逻辑的执行**都通过proxy进行
- 样式分为静态样式和动态
  - 静态样式放在assets/reuseable.less
  - 动态样式可通过joyui和emotion库进行动态创建
  - scheme文件夹里主要放给动态样式使用的特定样式
- layout中放所有的组件
  - 可复用组件放在useable中

### 前端todo

- 登录注册
  - x 初步界面
  - 对接接口
- tag列表
  - x 初步界面
  - 对接接口
  - 选择文章并获取
- 



