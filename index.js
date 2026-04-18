// fetch('http://localhost:8000/', {
//     method: 'POST',
//     headers: {
//         'application-type': 'application/json'
//     },
//     body: JSON.stringify({name: 'bac', color: 'abc'}),
// });

//fetch('http://localhost:8000/');

import express from "express";
import { connectDb, dbo } from './connectDb.js';
import { ObjectId } from "mongodb";

const app = express();

// Middleware
app.use(express.json());


app.post('/item', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        
        await dbo.collection('testing_collection').insertOne({
            name: data.name,
            email: data.email
        });
        //res.send('data has been created.');
        res.status(200).json({resp: 'data has been created'});
    }
    catch (err) {
        console.log(err);
    }
}); 

//Get All Data
app.get('/', async (req, res) => {
    try{
        const data = await dbo.collection('testing_collection').find().toArray();
        res.json(data);
    }
    catch(err){
        res.json(err);
    }
});

//Get Single Data
//Path Parameter
app.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const data = await dbo.collection('testing_collection')
                              .findOne({ _id: new ObjectId(id) });
        res.json(data);
    }
    catch(err){
        res.json(err);
    }
});

//Delete
app.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const data = await dbo.collection('testing_collection').deleteOne({ _id: new ObjectId(id) });

        res.json(data);
    }
    catch(err){
        res.json(err)
    }
});

app.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { name, email } = req.body;

        await dbo.collection('testing_collection').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { name, email }
            }
        );

        res.json({status: 'updated successfuly'});
    }
    catch(err){
        res.json(err);
    }
});

app.patch('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

        await dbo.collection('testing_collection').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { name }
            }
        );

        res.json({status: 'updated successfuly'});
    }
    catch(err){
        res.json(err);
    }
});

connectDb();

app.listen(8000, () => {
    console.log("server is listening on http://localhost:8000");

});