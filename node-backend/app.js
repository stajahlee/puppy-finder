const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');
const collection = 'puppies';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, result) => {
    result.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getPuppies', (request, response) => {
    db.getDB()
        .collection(collection)
        .find({})
        .toArray((error, documents) => {
            if (error) {
                console.log('getPuppies error', error);
            }
            else {
                console.log(documents);
                response.json(documents);
            }
        });
});

app.delete('/:id', (request, response) => {
    const puppyId = request.params.id;

    db.getDB()
        .collection(collection)
        .findOneAndDelete({_id: db.getPrimaryKey(puppyId)},
            (error, result) => {
                if (error) {
                    console.log('delete error', error);
                }
                else {
                    response.json(result);
                }
            });
});

app.post('/', (request, response) => {
    const userInput = request.body;

    db.getDB()
        .collection(collection)
        .insertOne(userInput, (error, result) => {
            if (error) {
                console.log('post error', error);
            }
            else {
                response.json({result: result, document: result.ops[0]});
            }
        });
});

app.put('/:id', (request, response) => {
    const puppyId = request.params.id;
    const userInput = request.body;

    db.getDB()
        .collection(collection)
        .findOneAndUpdate({_id: db.getPrimaryKey(puppyId)}, 
                            {$set : {"title": userInput.title,
                                    "image": userInput.image,
                                    "canines": userInput.canines
                                    }}, 
                            {returnOriginal: false}, 
        (error, result) => {
            if (error) {
                console.log('Could not update the puppy.', error);
            }
            else {
                response.json(result);
            }
        });
});

// be sure that MongoDB daemon is running first then from this same folder run 
// node app
// and leave the server running, then start the front end
db.connect((error) => {
    if(error) {
        console.log('Unable to connect to database.', error);
        process.exit(1);
    }
    else {
        app.listen(8080, () => {
            console.log('Connected to database, app listening on port 8080');
        });
    }
})