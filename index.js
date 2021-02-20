/*
 * Primary file for the API
 *  
*/

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function(request, response) {

  // Get the URL and parse it
  var parseURL = url.parse(request.url, true);

  // Get the path
  var path = parseURL.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  var queryStringObject = parseURL.query;

  // Get the HTTP Method
  var method = request.method.toLowerCase();

  // Get the headers as an object
  var headers = request.headers;

  // Send the response
  response.end('Hello World\n');
  
  // Log the request path
  console.log(
    'Resquest received on path: ' 
    + trimmedPath +
    ' with the method: '
    + method +
    ' and with these query string parameters:',
    queryStringObject,
    'and these headers:',
    headers
  );


});

// Start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log('The server is listening on port 3000 now');
});