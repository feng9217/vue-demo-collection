import axios from 'axios'

export function getSliderData() {
  const url = 'http://res.smartisanos.cn/marketing/mobile/index_89b703b1dc37d977dc86927896701b2f.json'
  return axios.get(url, {})
  .then((res) => {
    // console.log(res.data)
    return Promise.resolve(res.data)
  })
}