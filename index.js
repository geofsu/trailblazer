var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'over_the_rolling_hills') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

//Webhook for reading messages
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === '2') {
                sendLess2Message(sender)
                continue
            }
            sendTextMessage(sender, text.substring(0, 200) + "is unavailable.")
            if (text === '1') {
              sendLess1message(sender)
              continue
            }
            sendTextMessage(sender, text.substring(0,200) + "is unavailable")
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "CAAWpnyuovccBALyR77qRFA2zGj8BYdwoyaT2lXtObZBIAB4zQZC8up7oupVH5NmrtpQZBRRw9LKonE7fZB38KiHgI3ToyPxoBEaKZA1Ll2PdE6QZBgdvjscf7uwnZAjAcGRbfuhxIzxVZAAyg004v5DB7Ffk2tYx4Mvy8cKxGwf8hZBkjhuaNmr2duwLffodYpxgZD"

// //Allows viewing of the database
// var pg = require('pg');
//
// var DATABASE_URL = "postgres://tkkktgmwasgzis:8ZYY3XZKr_Li-EsxFzmGdQX4ZW@ec2-50-16-200-223.compute-1.amazonaws.com:5432/dced00g9j2sfrp";
//
// var conString = "postgres://username:password@localhost/database";
//
// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM trails', function(err, result) {
//       console.log (result);
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendLess2Message(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Fern Trail",
                    "subtitle": "1.62 mi",
                    "image_url": "http://defencely.com/blog/wp-content/uploads/2013/06/ways-hackers-hack-your-website-e1371080108770.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://talgov.com/Uploads/Public/Documents/parks/pdf/ferntrail.pdf",
                        "title": "Map of trail"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendLess1Message(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Hello",
                    "subtitle": "0.62 mi",
                    "image_url": "http://decorriver.com/wp-content/uploads/2015/12/Hello1.jpeg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://talgov.com/Uploads/Public/Documents/parks/pdf/ferntrail.pdf",
                        "title": "Map of trail"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
