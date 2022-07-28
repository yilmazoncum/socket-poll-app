const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/', express.static('ui'));

io.on('connection', (socket) => {
    console.log(`${socket.id} has connected`);
})

http.listen(5000, () => console.log('listening on port 5000'));