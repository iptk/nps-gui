import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

const changePage = (url) => {
  history.push(url)
}

export default history
export {changePage, history}
