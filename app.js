// Require libs
const HTTP = require('http');
const URL = require('url');
const SWIG = require('swig');
SWIG.setDefaults({ cache: false }); // Disables caching in Swig.

// Define possible routes
const ROUTER = {
  'home': require('./routes/home.js'),
  'auth': require('./routes/auth.js'),
  'api': require('./routes/api.js'),
  'error': require('./routes/error.js'),
  'content': require('./routes/content.js')
}

// Run the server
const SERVER = HTTP.createServer(onRequest).listen(process.env.PORT || 5000);

// The handler for any request. It is the
// entry point for every request from the client.
function onRequest(request, response) {
  try {
    // Parse URL from request to handle routing
    var url = URL.parse(request.url);

    // TODO: check authorization before answering and
    // redirect to ligin page if user is not authorized

    // Log server activity
    console.log(request.method.toLowerCase() + ': ' + url.href);

    // Handle request and switch to corresponding controller method
    if (url.pathname === '/') {
      ROUTER.home.handle(request, response);
    } else if (url.pathname.startsWith('/auth')) {
      ROUTER.auth.handle(request, response, SWIG);
    } else if (url.pathname.startsWith('/api')) {
      ROUTER.api.handle(request, response);
    } else if(url.pathname.startsWith('/content')) {
      ROUTER.content.handle(request, response);
    } else {
      ROUTER.error.handleNotFound(request, response);
    }
  } catch(exception) {
    ROUTER.error.handleError(request, response, exception);
  }
}