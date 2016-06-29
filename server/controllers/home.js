const jade = require('jade');

// TODO: Make templater (jade) the third argument. Implement
// interface which will have all needed methods for templating
// and will be no sensetive to which templater is used.

exports.handle = function (request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  //response.writeHead(302, { 'Location': '/login' });
  var html = jade.compileFile('.\\server\\templates\\home.jade')();
  response.write(html);
  response.end();
}