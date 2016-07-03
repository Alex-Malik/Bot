const URL = require('url');

const USERNAME = 'z01[=7';
const PASSWORD = 'z01[=7';

exports.handle = function (request, response, swig) {
  let url = URL.parse(request.url, true);
  if (url.search) {
    let username = url.query.username ? url.query.username : '';
    let password = url.query.password ? url.query.password : '';

    if (username == USERNAME && password == PASSWORD) {
      send({ href: '/home' })
    } else {
      send({ error: 'Authentication error occured.', username: 'message', password: 'message' });
    }
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(swig.compileFile('./templates/auth.html')());
    response.end();
  }

  function send(data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(data));
    response.end();
  }
}