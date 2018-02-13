import fetch from 'cross-fetch'

import {NPS} from './nps'

class Request{
  constructor({url, method='GET', data=''}){
    this.url = url
    this.method = method
    this.data = data
  }

  fetch(){
    var resp
    var req = async () => {
      var resp = await fetch(NPS.server+this.url, {
        method: this.method,
        body: JSON.stringify(this.data),
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        mode: 'cors'
      })
      resp = new Response(await resp)
    }
    req()
    return resp
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
    console.log(this)
  }
}

export {Request, Response}
