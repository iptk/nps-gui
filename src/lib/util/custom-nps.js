import {NetworkException} from '../api/exceptions'

const loadDefaults = async () => {
  return await fetch(
    '/conf/npsdefaults',
    {method: 'GET', redirect: 'follow'}
  )
  .then(resp => resp.json())
  .catch(err => {
    throw new NetworkException({
      msg: "Error retrieving defaults",
      data: server,
      ancestor: err
    })
  })
}

const loadCustom = async () => {
  return await fetch(
    '/conf/npscustom',
    {method: 'GET', redirect: 'follow'}
  )
  .then(resp => resp.json())
  .catch(err => {
    throw new NetworkException({
      msg: "Error retrieving custom-values",
      data: server,
      ancestor: err
    })
  })
}

const loadVersion = async () => {
  return await fetch(
    '/version',
    {method: 'GET', redirect: 'follow'}
  )
  .then(resp => resp.text())
  .then(vers => vers.replace(/(?:\r\n|\r|\n)/g, '\n').split('\n'))
  .catch(err => {
    throw new NetworkException({
      msg: "Error fetching version",
      ancestor: err
    })
  })
}

export default {loadDefaults, loadCustom, loadVersion}
export {loadDefaults, loadCustom, loadVersion}
