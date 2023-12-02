const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const items = [];

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/getItems', (req, res) => {
    res.send(items);
});

app.post('/postItem', (req, res) => {
    const { item } = req.body;
    items.push(item);
    res.send(items);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});