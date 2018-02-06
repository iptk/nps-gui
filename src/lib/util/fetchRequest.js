import ServerList from './ServerList'

const fetchRequest = (path, method = 'GET', data = '') => {
  return fetch(ServerList.currentServerString()+path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default fetchRequest
