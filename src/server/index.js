const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(9000, function(){
    console.log('Express server listening on port ' + '9000');
});
