import fetch from 'cross-fetch'

import {NetworkException} from './exceptions'
import {NPS} from './NPS'

class Request{
  constructor({url, method='GET', data=''}){
    this.url = url
    this.method = method
    this.data = data
  }

  async fetch(){
    var srv = NPS.getServer()
    var payload = {
      method: this.method,
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      mode: srv.cors,
      credentials: srv.credentials
    }

    // body is not allowed for GET and HEAD
    if(['GET', 'HEAD'].indexOf(this.method) === -1){
      payload = {...payload, body: JSON.stringify(this.data)}
    }
    return fetch(srv.uri+this.url, payload)
      .then(resp => new Response(resp))
      .catch(err => {
        throw new NetworkException({
          msg: "Error retrieving "+this.url+" as "+this.method,
          data: this,
          ancestor: err
        })
      })
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
