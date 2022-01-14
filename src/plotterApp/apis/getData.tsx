import request from 'superagent'

export default function getData(payload) {
  const item = {
        measures: payload.measureVal,
        dimension: payload.dimensionVal,
  }
  return new Promise((resolve, reject) => {
    request
      .post('https://plotter-task.herokuapp.com/data')
      .send(item)
      .then((resp) => {
        resolve(resp)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
