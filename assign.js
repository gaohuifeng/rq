const rq = require('./rq')
const config = require('config')
const count = config.count
const co = require('co')
const postTasksQeqData = config.post_tasks_req_data
const putTasksQeqData = config.put_task_req_data

const createTask = function * (num) {
  const tasks = []
  for (let i = 1; i <= num; i = i + 1) {
    postTasksQeqData.content = '------ ' + i
    postTasksQeqData.i = i
    const data = yield done => rq.post_task(postTasksQeqData, done)
    tasks.push(data._id)
  }
  return tasks
}

const assignTask = function * (tasks) {
  for (let task of tasks) {
    putTasksQeqData.task_id = task
    yield done => rq.put_task(putTasksQeqData, done)
  }
}

co(function * () {
  const tasks = yield createTask(count)
  yield done => setTimeout(done, 2000)
  yield assignTask(tasks)
}, function (err, result) {
  console.log(err, result)
})
