const request = require('request')
const config = require('config')
const cookie = config.cookie
const port = config.port

function rq (action) {
  let url
  let method
  switch (action) {
    case 'put_task':
      url = `http://project.ci:${port}/api/tasks/_id?aaaa=uuuu`
      method = 'PUT'
      break
    default:
      url = `http://project.ci:${port}/api/tasks?aaaa=uuuu`
      method = 'POST'
  }

  return (json, callback) => {
    if (method === 'PUT') {
      url = url.replace(/_id/, json.task_id)
      delete json.task_id
    }
    const obj = {
      method,
      headers: {
        'content-type': 'application/json',
        cookie,
        'kbn-version': '5.5.1'
      },
      url: `${url}${json.i}`,
      json
    }
    request(obj, (err, result) => {
      callback(err, result.body)
    })
  }
}

module.exports = {
  post_task: (...args) => rq('post_task').call(this, ...args),
  put_task: (...args) => rq('put_task').call(this, ...args),
  create_and_assign: (...args) => rq('create_and_assign').call(this, ...args)
}
