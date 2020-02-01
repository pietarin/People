var express = require('express')
var helmet = require('helmet')
var app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');

const path = 'http://localhost:3000/';
mongoose.connect('mongodb+srv://admin:admin@cluster0-m0cse.azure.mongodb.net/test?retryWrites=true&w=majority');

var db = mongoose.connection;

var playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
}, {
  collection: 'Players'
});

playerSchema.virtual('links').get(function () {
  return [{
    'self': path + 'api/players/' + this._id
  }];
});
playerSchema.set('toJSON', {
  virtuals: true
})

var Player = mongoose.model('Player', playerSchema);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var api = express.Router()


app.use(helmet())

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.post('/players', function (req, res) {

  if (req.body && req.body.name) {
    console.log('adding player');

    let isActive = req.body.active ? req.body.active : true;

    var newPlayer = new Player({
      name: req.body.name,
      active: isActive
    });

    newPlayer.save(function (err) {
      if (err) {
        res.sendStatus(400);
        return console.error(err);
      };
      console.log("Inserted 1 document into the collection");
      res.status(201);
      res.set('Location', path + 'api/players/' + newPlayer._id);
      res.json(newPlayer);
    });

  } else {
    res.sendStatus(400);
  }

});

api.get('/players', function (req, res) {
  Player.find(function (err, players) {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    };
    if (!players) {
      res.sendStatus(404)
    } else {
      res.set('Location', path + 'api/players/');
      res.status(200);
      res.json(players);
    }
  })
})

api.get('/players/:id', function (req, res) {
  Player.findOne({
    '_id': req.params.id
  }, function (err, player) {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    };
    if (!player) {
      res.sendStatus(404)
    } else {
      res.set('Location', path + 'api/players/' + player._id);
      res.status(200);
      res.json(player);
    }
  })
})

api.delete('/players/:id', function (req, res) {
  Player.findByIdAndDelete(req.params.id, function (err, player) {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    };
    if (!player) {
      res.sendStatus(404)
    } else {
      res.set('Location', path + 'api/players/' + player._id);
      res.status(204);
      res.json();
    }
  })
})

api.delete('/players/', function (req, res) {
  Player.remove(function (err, players) {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    };
    if (!players) {
      res.sendStatus(404)
    } else {
      res.set('Location', path + 'api/players/');
      res.status(204);
      res.json();
    }
  })
})

api.put('/players/:id', function (req, res) {
  console.log(req.body);
  Player.findByIdAndUpdate(req.params.id, req.body, {
    'new': true
  }, function (err, player) {
    if (err) {
      res.sendStatus(400);
      return console.error(err);
    };
    if (!player) {
      res.sendStatus(404)
    } else {
      res.set('Location', path + 'api/players/' + player._id);
      res.status(200);
      res.json(player);
    }
  })
})


app.use('/api', api);
app.use('/', express.static('public'))
app.listen(3000, () => console.log('People app listening on port 3000!'))
