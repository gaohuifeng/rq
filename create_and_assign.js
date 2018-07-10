const rq = require('./rq')
const config = require('config')
const count = config.count
const co = require('co')
const createAndAssignTasksQeqData = config.create_and_assign_req_data

const createAndAssignTask = function * (num) {
  for (let i = 1; i <= num; i = i + 1) {
    createAndAssignTasksQeqData.content = '@@@---------' + i
    yield done => rq.post_task(createAndAssignTasksQeqData, done)
  }
}

co(function * () {
  yield createAndAssignTask(count)
}, function (err, result) {
  console.log(err, result)
})
