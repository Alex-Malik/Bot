const jade = require('jade');

// TODO: Make templater (jade) the third argument. Implement
// interface which will have all needed methods for templating
// and will be no sensetive to which templater is used.

exports.handleNotFound = function (request, response) {
  response.writeHead(404, { "Content-Type": "text/html" });
  response.write('not found');
  response.end();
}

exports.handleError = function (request, response, exception) {
  if (!response) return;

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(exception.message || JSON.stringify(exception));
  response.end();
}