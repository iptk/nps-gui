import fetch from 'cross-fetch'

import {NPS} from './nps'

class Request{
  constructor({url, method='GET', data=''}){
    this.url = url
    this.method = method
    this.data = data
  }

  async fetch(){
    var payload = {
      method: this.method,
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      mode: 'cors'
    }

    // body is not allowed for GET and HEAD
    if(['GET', 'HEAD'].indexOf(this.method) === -1){
      payload = {...payload, body: JSON.stringify(this.data)}
    }
    return fetch(NPS.server+this.url, payload)
      .then(resp => new Response(resp))
  }
}

class Response{
  constructor(response, json){
    var jsondata = async () => {
      this.json = await response.json()
    }
    this.response = response
    jsondata()
    this.statuscode = response.status
    this.ok = response.ok
  }
}

export {Request, Response}
