import fetch from 'cross-fetch'

import {ConfigurationException} from './exceptions'

class NPS{
  static serverConfig = {}
  static usedServer = null

  static getServer(name){
    if(!name){
      if(this.usedServer){
        name = this.usedServer
      }
      else{
        if('default' in this.serverConfig){
          name = this.serverConfig.default
        }
        else{
          throw new ConfigurationException({
            msg: "Server name not provided and default is unknown",
            data: this.serverConfig
          })
        }
      }
    }

    if(name in this.serverConfig.servers){
      return new Server({name: name, ...this.serverConfig.servers[name]})
    }

    throw new ConfigurationException({
      msg: "Server '"+name+"' not found",
      data: this.serverConfig
    })
  }

  static async fetchConfiguration(url){
    var payload = {
      method: 'GET',
      redirect: 'follow'
    }

    this.serverConfig = await fetch(
        url,
        {method: 'GET', redirect: 'follow'}
      )
      .then(resp => resp.json())
      .catch(err => {
        throw new NetworkException({
          msg: "Error retrieving serverconfig",
          data: server,
          ancestor: err
        })
      })
  }

  static useServer(serverName){
    this.usedServer = serverName
  }
}

class Server{
  constructor({name, uri, cors=true, credentials=true, description=''}){
    this.name = name
    this.uri = uri
    this._cors = cors
    this._credentials = credentials
    this.description = description
  }

  get cors(){
    return this._cors == undefined ? false : this._cors
  }
  get credentials(){
    return this._credentials ? 'include' : 'omit'
  }
}

export {NPS}
export default NPS
