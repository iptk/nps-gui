import fetch from 'cross-fetch'

import {NPS} from './NPS'

class Request{
  construct(url, params){
    this.url = url
    this.params = params
  }

  fetch(){
    resp = fetch(NPS.server+path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    return new Response(resp, 200)
  }
}

class Response{
  construct(response, statuscode){
    this.response = response
    this.statuscode = statuscode
  }
}

export {Request, Response}
