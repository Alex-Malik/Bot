const http = require('http');
const url = require('url');
const server = http.createServer(onRequest).listen(process.env.PORT || 5000);
const controllers = {
  'home': require('./server/controllers/home.js'),
  'auth': require('./server/controllers/auth.js'),
  'api': require('./server/controllers/api.js'),
  'error': require('./server/controllers/error.js')
}

function onRequest(request, response) {
  try {
    // Log server activity
    console.log(request.method + ': ' + request.url);

    // TODO: check authorization before answering and
    // redirect to ligin page if user is not authorized

    // Parse url from request to handle routing
    var urlParts = url.parse(request.url);

    // Handle request and switch to corresponding controller method
    if (urlParts.pathname === '/') {
      controllers['home'].handle(request, response);
      //require('./server/controllers/home.js').handle(request, response);
    } else if (urlParts.pathname === '/auth') {
      controllers['auth'].handle(request, response);
    } else if (urlParts.pathname === '/api') {
      controllers['api'].handle(request, response);
    } else {
      controllers['error'].handleNotFound(request, response);
    }
  }
  catch(exception) {
    controllers['error'].handleError(request, response);
  }
}