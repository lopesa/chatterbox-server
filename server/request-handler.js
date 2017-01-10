/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var request = require('request');


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var messages = [];

var Message = function(username, message) {
  this.username = username;
  this.message = message;
};



exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'POST') {
    // console.log('44', Buffer.concat(request.results).toString());
    // console.log(request);

    request.on('error', function(err) {
      console.log(err);
    }).on('data', data => {
        // data is in buffer form at this point

      console.log(JSON.parse(data));
      
      var temp = JSON.parse(data);

      var thisMessage = new Message(temp.username, temp.message);

      messages.push(thisMessage);

    }).on('end', function() {

      response.on('error', function(err) {
        console.log(err);
      });

      response.statusCode = 201;
      response.setHeader('Content-Type', 'application/json');

      var responseBody = {
        message: 'message received'
      };

      response.end(JSON.stringify(responseBody));  

    // do post stuff
    /*request('classes/messages', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
      }*/
    });
  }

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.




  var body = [];

  request.on('error', function(err) {
    console.log(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body.push('some string');

    response.on('error', function(err) {
      console.log(err);
    });

    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json');

    var responseBody = {
      headers: headers,
      method: request.method,
      url: request.url,
      results: body
    };

    response.end(JSON.stringify(responseBody));  
  });

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


// module.exports = requestHandler;

