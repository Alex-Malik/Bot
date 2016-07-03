exports.handle = function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  //response.writeHead(302, { 'Location': '/login' });
  //var html = jade.compileFile('.\\server\\templates\\home.jade')();
  //response.write(html);
  response.end();
}