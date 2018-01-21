var nstatic = require('node-static'),
  http = require('http'),
  path = require('path')

var fileServer = new nstatic.Server(path.resolve(__dirname, '..', 'public'))

http.createServer((request, response) => {
    request.on('end', () => {
        fileServer.serve(request, response, (err, res) => {
          if(err && (err.status === 404)){
            fileServer.serveFile('/index.html', 200, {}, request, response)
          }
        })
    }).resume()
}).listen(80)
