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
    case 'create_project_template':
      url = `http://project.ci:${port}/api/projects/from-template?aaaa=uuuu`
      method = 'POST'
      break
    case 'integration':
      url = `${config.webHookUrl}??aaaa=uuuu`
      method = 'POST'
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
    const headers = {
      'content-type': 'application/json',
      cookie,
      'kbn-version': '5.5.1'
    }
    Object.assign(headers, json.headers)
    delete json.headers
    const obj = {
      method,
      headers,
      url: `${url}${json.i}`,
      json
    }
    request(obj, (err, result) => {
      if (err || result.statusCode !== 200) console.log(err, result ? result.statusCode : null, result ? result.body : null)
      callback(err, result ? result.body : null)
    })
  }
}

module.exports = {
  post_task: (...args) => rq('post_task').call(this, ...args),
  put_task: (...args) => rq('put_task').call(this, ...args),
  create_and_assign: (...args) => rq('create_and_assign').call(this, ...args),
  create_project_template: (...args) => rq('create_project_template').call(this, ...args),
  create_integration: (...args) => rq('integration').call(this, ...args)
}
