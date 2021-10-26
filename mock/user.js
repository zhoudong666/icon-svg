const msgObj = { code: 0, msg: 'ok' }
module.exports = [
  // get user
  {
    url: '/user/info',
    type: 'get',
    response: req => {
      // const {user} = req.body
      console.log('req.body', req.body, 'req.query', req.query)
      return { ...msgObj, result: { name: '@cname' } }
    }
  },
  {
    url: '/user/age',
    type: 'post',
    response: { ...msgObj, result: { 'age|18-28': 0 } }
  },
  {
    url: '/user/date',
    type: 'post',
    response: req => {
      console.log('req.body', req.body, 'req.query', req.query)
      return { ...msgObj, result: { name: '@date' } }
    }
  }
]
