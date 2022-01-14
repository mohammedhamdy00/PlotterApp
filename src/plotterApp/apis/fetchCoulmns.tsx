import request from 'superagent'

export default function fetchColumns() {
  return new Promise((resolve, reject) => {
    request
      .get('https://plotter-task.herokuapp.com/columns')
      .then((resp) => {
        resolve(resp)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
