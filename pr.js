const rq = require('./rq')
const config = require('config')
const count = config.count
const co = require('co')
const prdata = require('./fixtures/github-hook.json')
const _ = require('lodash')
const crypto = require('crypto')
const mockHook = _.cloneDeep(prdata.mergeRequest.open)
const secret = config.webHookSecret

const createPr = function * (num) {
  for (let i = 1; i <= num; i = i + 1) {
    _.set(
      mockHook,
      'pull_request.title',
      `#${config.taskNo}-${i} 集成 github pr 操作`
    )

    mockHook.i = i
    const localSig = githubHmac(JSON.stringify(mockHook), secret)
    mockHook.headers = {
      'x-github-event': 'pull_request',
      'x-hub-signature': localSig
    }
    yield done => rq.create_integration(mockHook, done)
  }
}

co(function * () {
  yield createPr(count)
}, function (err, result) {
  console.log(err, result)
})

function githubHmac (blob, secret) {
  const hmac = crypto.createHmac('sha1', secret)
  return `sha1=${hmac.update(blob).digest('hex')}`
}
