let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");

let config = require('./config/config');
var db = require('./config/db_config');

let auth = require('./routes/auth');
let merchant = require('./routes/merchant');


// Mongodb connection
db.connectToServer(function (err, client) {
  if (err) console.log(err);
});


let server = require("http").Server(app);


app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '128kb' }))
app.use(cors())
app.use('/assets', express.static('assets'));
app.use(auth);
app.use(merchant);

server.listen(config.api.PORT, function () {
  console.log("Server is Up and Running " + config.api.PORT);
})
