const request = require('request')
const co = require('co')
const cookie = 'TEAMBITION_SESSIONID=demo; TEAMBITION_SESSIONID.sig=demo'

const json = {"ancestorIds":[],"objectType":"task","isDone":false,"isRedo":false,"content":"a","note":"","priority":0,"involveMembers":["5b14d0a28bc0cf00011b9d4f","5b07d2b48bc0cf00011b9ba2"],"subtaskCount":{"total":0,"done":0},"workTime":{"totalTime":0,"usedTime":0,"unit":"minute"},"_creatorId":"5b14d0a28bc0cf00011b9d4f","_executorId":"5b07d2b48bc0cf00011b9ba2","_projectId":"5b42fdc5b441027edb56d9b2","_tasklistId":"5b42fdc5b441027edb56d9e2","_stageId":"5b440a9e625666a273843e0a","_sprintId":null,"startDate":null,"dueDate":null,"isVisible":true,"reminder":{"date":null,"members":[],"type":"unset"},"creatorInvolversCache":[{"_id":"5b14d0a28bc0cf00011b9d4f","name":"gaohuifeng3@163.com","avatarUrl":"http://tcs.project.ci/thumbnail/0115931d1833bf5821c16509b6b5f6545770/w/100/h/100"},{"_id":"5b07d2b48bc0cf00011b9ba2","name":"ghf","avatarUrl":"http://tcs.project.ci/thumbnail/0115dff669369499232ec44f7a5fad3bcc53/w/100/h/100"}]}

const f = function * () {
  for(let i=1;i<=500;i++) {
//     yield done => setTimeout(done, 1000);
     console.log(i)  
     json.content = `@@@---------${i}`
     const obj = {
       method: 'POST',
       headers: {
          'content-type': 'application/json',
          'cookie': cookie,
          'kbn-version': '5.5.1'
       },
      url: `http://project.ci:30130/api/tasks?aaaa=uuuu${i}`,
      json
     }
     yield done => request(obj, done)    
  }  
}
co(function * () {
  yield f()
}, function (err, result){
  console.log(err)
})
