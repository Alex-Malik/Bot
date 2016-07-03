const URL = require('url');
const FS = require('fs');

exports.handle = function (request, response) {
  var url = URL.parse(request.url);
  if (url.pathname.startsWith('/content/css')) {
    FS.readFile('.' + url.pathname, (error, data) => {
      if (error) {
        throw error;
      } else {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.write(data);
        response.end();
      }
    });
  } else if (url.pathname.startsWith('/content/js')) {
    // TODO: Implement loading of js file
  } else if (url.pathname.startsWith('/content/img')) {
    // TODO: implement image loading
  }
}