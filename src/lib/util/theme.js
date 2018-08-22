import {NetworkException} from '../api/exceptions'

const loadTheme = async () => {
  return await fetch(
    '/conf/theme',
    {method: 'GET', redirect: 'follow'}
  )
  .then(resp => resp.json())
  .catch(err => {
    throw new NetworkException({
      msg: "Error retrieving theme",
      data: server,
      ancestor: err
    })
  })
}

export default loadTheme
