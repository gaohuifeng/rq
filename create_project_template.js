const rq = require('./rq')
const config = require('config')
const count = config.count
const co = require('co')
const createProjectTemplateData = config.create_project_template

const createProjectFromTemplate = function * (num) {
  for (let i = 1; i <= num; i = i + 1) {
    yield done => rq.create_project_template(createProjectTemplateData, done)
  }
}

co(function * () {
  yield createProjectFromTemplate(count)
}, function (err, result) {
  console.log(err, result)
})
