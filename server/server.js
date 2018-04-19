const express = require('express'),
  path = require('path')
  fs = require('fs')

const app = express()
const publicPath = path.resolve(__dirname, '..', 'public')
const confPath = path.resolve(__dirname, '..', 'conf')

// serve config
app.get('/conf/serverlist', function(req, res){
  var srvPath = path.resolve(confPath, 'srvlist.json')
  if(!fs.existsSync(srvPath)){
    srvPath = path.resolve(confPath, 'srvlist.default.json')
  }
  res.sendFile(srvPath)
})

// serve statics
app.use(express.static(publicPath))

// fall back to index
app.use((req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(80)
