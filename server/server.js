const express = require('express'),
  path = require('path')
  fs = require('fs')

const app = express()
const publicPath = path.resolve(__dirname, '..', 'public')
const confPath = path.resolve(__dirname, '..', 'conf')

// serve config
app.get('/conf/:name', function(req, res){
  var name = req.params.name
  var srvPath = path.resolve(confPath, name+'.json')
  if(!fs.existsSync(srvPath)){
    srvPath = path.resolve(confPath, name+'.default.json')
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
