### 安装 
```
git clone https://github.com/gaohuifeng/rq.git
cd rq
npm install
```

### 修改配置
```
// 修改 config/default.json
修改 cookie
修改 port core测试端口
修改 count 测试任务数量
```

### a. 测试批量创建任务，然后批量指派给某人
```
修改 post_tasks_req_data 创建任务接口{POST http://project.ci/api/tasks}请求数据
修改 put_task_req_data 指派任务接口 {PUT http://project.ci/api/tasks/5b445e3a72449eddc2f0962f}请求数据
```
### 运行命令
npm run a

### b. 测试批量创建任务同时指派给某人
```
修改 create_and_assign_req_data 创建任务接口{POST http://project.ci/api/tasks}请求数据
```
### 运行命令
npm run c

### 如果统计web端通知数量
- 以下脚本贴入浏览器控制台
- 通知的数量会打控制台打印
- 每次重新测试需要单独执行语句: global.noticeCount =0; 
```js
global.noticeCount =0; 
teambition.socket.on('all', function() {
  //console.log(arguments); 
  if (arguments[0] === ':new:notifications' && 
  new RegExp(/------/).test(arguments[1].content)
  ){
    global.noticeCount = global.noticeCount + 1; 
    console.log("global.noticeCount: ", global.noticeCount)
   } 
})
```
