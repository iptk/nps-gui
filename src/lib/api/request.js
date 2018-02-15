import fetch from 'cross-fetch'

import {NPS} from './nps'

class Request{
  constructor({url, method='GET', data=''}){
    this.url = url
    this.method = method
    this.data = data
  }

  async fetch(){
    return fetch(NPS.server+this.url, {
      method: this.method,
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      mode: 'cors'
    }).then(resp => new Response(resp))
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
