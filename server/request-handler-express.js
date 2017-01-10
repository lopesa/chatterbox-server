
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var request = require('request');


var express = require('express');
var bodyParser = require('body-parser');
var json = require('express-json');
var app = express();



var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

var messages = [];
var body = [];

var Message = function(username, message) {
  this.username = username;
  this.message = message;
};

var myLogger = function(req, res, next) {
  console.log('logged');
  next();
};

app.use(bodyParser.json());
app.use(json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  } else {
  //move on
    next();
  }
});


app.get('/classes/messages', function(req, res) {
  console.log('hit the server here');
  res.send(messages);
});

app.post('/classes/messages', function(req, res) {
  
  var thisMessage = new Message(req.body.username, req.body.message);
  messages.push(thisMessage);
  
  res.send('success');
});

app.listen(3000, function() {
  console.log('listening at 3000');
});




// exports.requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   // console.log('Serving request type ' + request.method + ' for url ' + request.url);

//   // app.options('/classes/messages', function(req, res) {
//   //   response.writeHead(200, defaultCorsHeaders);
//   //   response.send(200);
//   // });

//   // app.use(function(req, res, next) {
//   //   res.header('Access-Control-Allow-Origin', '*');
//   //   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//   //   //intercepts OPTIONS method
//   //   if ('OPTIONS' === req.method) {
//   //     console.log('METHOD METHOD METHOD', req.method)
//   //     //respond with 200
//   //     res.send(200);
//   //   } else {
//   //   //move on
//   //     next();
//   //   }
//   // });

//   // app.use(function(req, res, next) {
//   //   console.log('line 82');
//   //   res.header('Access-Control-Allow-Origin', '*');
//   //   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accecpt');
    
//   //   if ('OPTIONS' === req.method) {
//   //     res.send(200);
//   //   } else {
//   //     console.log('line 90');
//   //     next();
//   //   }
//   // });


//   // app.route('/classes/messages')

//   app.get('http://127.0.0.1:3000/classes/messages', function(req, res) {
//     console.log('line 100');

//     res.writeHead(200, defaultCorsHeaders);

//     var responseBody = {
//       method: req.method,
//       url: req.url,
//       results: messages
//     };

//     res.send(JSON.stringify(responseBody));
//   });
//   app.post(function(req, res) {

//     console.log('inPOST')
    
//     req.on('data', function(data) {
//       // data is in buffer form at this point
//       var temp = JSON.parse(data);
//       var thisMessage = new Message(temp.username, temp.message);
//       messages.push(thisMessage);

//     });

//     req.on('end', function() {

//       response.writeHead(201, defaultCorsHeaders);

//       var responseBody = {
//         message: 'message received'
//       };
//       response.end(JSON.stringify(responseBody));  
//     });

//   });


//   app.get('*', function(req, res) {
//     res.send('404', 404);
//   });
// };



  // app.get('/', function(req, res) {



  //   res.end();

  // });



  // if (request.url === '/classes/messages' || request.url === '/classes/room') {
  //   if (request.method === 'OPTIONS') {
  //     response.writeHead(200, defaultCorsHeaders);
  //     response.end();
  //   }

    // else if (request.method === 'POST') {
    //   request.on('error', function(err) {
    //     console.log(err);
    //   });
    //   request.on('data', data => {
    //     // data is in buffer form at this point
    //     var temp = JSON.parse(data);
    //     var thisMessage = new Message(temp.username, temp.message);
    //     messages.push(thisMessage);

    //   });
    //   request.on('end', function() {
    //     response.writeHead(201, defaultCorsHeaders);

    //     var responseBody = {
    //       message: 'message received'
    //     };
    //     response.end(JSON.stringify(responseBody));  
    //   });
    // }

    // else if (request.method === 'GET') {
    //   request.on('error', function(err) {
    //     console.log(err);
    //   });
    //   request.on('data', function(chunk) {
    //     body.push(chunk);
    //   });
    //   request.on('end', function() {

    //     response.writeHead(200, defaultCorsHeaders);

    //     var responseBody = {
    //       method: request.method,
    //       url: request.url,
    //       results: messages
    //     };

    //     response.end(JSON.stringify(responseBody));  
    //   });
      
  //   }
  // } else {
  //   request.on('error', function(err) {
  //     console.log(err);
  //   });
  //   request.on('data', function(chunk) {
  //     body.push(chunk);
  //   });
  //   request.on('end', function() {
  //     response.writeHead(404, defaultCorsHeaders);
  //     var responseBody = {
  //       results: '404',
  //     };
  //     response.end(JSON.stringify(responseBody));
  //   });
  // }
  // The outgoing status.
  //var statusCode = 200;

  // See the note below about CORS headers.
  //var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  //headers['Content-Type'] = 'application/json';

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