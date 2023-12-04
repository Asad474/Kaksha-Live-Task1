const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8080;

mongoose.connect(process.env.MONGODB_URL)
    .then(conn => console.log(`Connected to database connection ${conn.connection.host} successfully`))
    .catch(error => console.log(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const itemSchema = new mongoose.Schema({
    item: String,
});

const itemData = mongoose.model('Item', itemSchema);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/getItems', async(req, res) => {
    try {
        const items = await itemData.find({});
        res.send(items);   
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.post('/postItem', async(req, res) => {
    try{
        const { item } = req.body;
        const ob = await itemData.create({ item });
        res.send(ob);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});