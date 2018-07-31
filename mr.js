const rq = require('./rq')
const config = require('config')
const count = config.count
const co = require('co')
const mrdata = require('./fixtures/gitlab-hook.json')
const _ = require('lodash')
const mockHook = _.cloneDeep(mrdata.mergeRequest.open)
const secret = config.webHookSecret

const createPr = function * (num) {
  for (let i = 1; i <= num; i = i + 1) {
    _.set(
      mockHook,
      'object_attributes.title',
      `#${config.taskNo}-${i} 集成 gitlab mr 操作`
    )

    mockHook.i = i
    mockHook.headers = {
      'x-github-event': 'pull_request',
      'x-gitlab-token': secret
    }
    yield done => rq.create_integration(mockHook, done)
  }
}

co(function * () {
  yield createPr(count)
}, function (err, result) {
  console.log(err, result)
})
