class NPS{
  static server = "http://localhost:8080"

  construct({server}){
    if(server){
      this.server = server
    }
  }
}

export {NPS}
export default NPS
