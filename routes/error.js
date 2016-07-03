exports.handleNotFound = function (request, response) {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('not found');
  response.end();
}

exports.handleError = function (request, response, exception) {
  if (!response) return;

  // Write header as for a normal response
  response.writeHead(200, { 'Content-Type': 'text/html' });

  // Check info about exception
  if (exception !== undefined) {
    if (exception.message !== undefined) {
      response.write(exception.message);
    } else {
      response.write(JSON.stringify(exception));
    }
  } else {
    response.write('Unknown error occured...');
  }

  response.end();
}