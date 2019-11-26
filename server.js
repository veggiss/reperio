var express  = require('express');
var app      = express();           
var bodyParser = require('body-parser');    
var cors = require('cors');
;                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT', 'GET', 'POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.server.get('*.*', express.static('www', {maxAge: '1y'}));
app.all('*', function (req, res) {
    res.status(200).sendFile('/', {root: 'www'});
});
 
//app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});