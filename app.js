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
    var url = URL.parse(request.url, true);

    // Log server activity
    console.log(request.method.toLowerCase() + ': ' + url.href);

    // // Handle request and switch to corresponding controller method
    // if (url.pathname === '/') {
    //   ROUTER.home.handle(request, response);
    // } else if(url.pathname.startsWith('/content')) {
    //   ROUTER.content.handle(request, response);
    // } else if(auth(request, response)) {
    //   if (url.pathname.startsWith('/api')) {
    //     ROUTER.api.handle(request, response);
    //   } else {
    //     ROUTER.error.handleNotFound(request, response);
    //   }
    // }



    // Check authorization before answering and
    // redirect to auth page if user is not authorized
    if (auth(request, response)) {
      // Handle request and switch to corresponding controller method
      if (url.pathname === '/') {
        ROUTER.home.handle(request, response);
      } else if(url.pathname.startsWith('/content')) {
        ROUTER.content.handle(request, response);
      } else if (url.pathname.startsWith('/auth')) {
        ROUTER.auth.handle(request, response, SWIG);
      } else if (url.pathname.startsWith('/api')) {
        ROUTER.api.handle(request, response);
      } else {
        ROUTER.error.handleNotFound(request, response);
      }
    }
  } catch(exception) {
    ROUTER.error.handleError(request, response, exception);
  }
}

function getCookies(request) {
  if (!request) return;
  if (!request.headers) return;

  console.log(request.headers.cookie);

  let cookies = {};

  for (cookie of request.headers.cookie.split(';')) {
    let pair = cookie.split('=');
    cookies[pair[0]] = pair[1];
  }

  return cookies;
}

function setCookies(response, cookies) {
  if (!response) return;
  if (!response.headers) return;

  console.log(response.headers.cookie);

  for (cookie in cookies) {
    response.headers.cookie[cookie] = cookie;
  }
}

function auth(request, response) {
  // // Parse Cookies from request to handle auth
  // var cookies = getCookies(request);
  // // If 'auth' cookie existing, then get user from it
  // // and continue answering; otherwise - redirect to auth page
  // if (!cookies.auth) {
  //   ROUTER.auth.handle(request, response, SWIG);
  // }

  return true;
}
