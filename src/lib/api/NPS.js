import fetch from 'cross-fetch'

import {ConfigurationException} from './exceptions'

class NPS{
  static serverConfig = {}
  static usedServer = null

  static getServerURI(name){
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
      return this.serverConfig.servers[name].uri
    }

    throw new ConfigurationException({
      msg: "Server '"+name+"' not found",
      data: this.serverConfig
    })
    return "http://localhost:8080"
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

export {NPS}
export default NPS
