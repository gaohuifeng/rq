# 安装 
npm install

# 修改config/default.json
```
修改 cookie
修改 port core测试端口
修改 count 测试任务数量
```

## 测试批量创建任务，然后批量指派给某人
```
修改 post_tasks_req_data 创建任务接口{POST http://project.ci/api/tasks}请求数据
修改 put_task_req_data 指派任务接口 {PUT http://project.ci/api/tasks/5b445e3a72449eddc2f0962f}请求数据
```
## 运行
npm start a

## 测试批量创建任务同时指派给某人
```
修改 create_and_assign_req_data 创建任务接口{POST http://project.ci/api/tasks}请求数据
```
## 运行
npm start c
