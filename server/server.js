const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/', express.static('ui'));

var connections = []

io.on('connection', (socket) => {
    connections.push(socket)
    console.log(`${socket.id} has connected`);

    socket.on('questionCreated', (question) => {
        io.emit('showPoll',question);
    });
    
    socket.on('vote', (vote) => {
        console.log("vote server :" +vote.index + " " + vote.guess);    
    });

    socket.on('disconnect', () => {
        connections = connections.filter((cn) => cn.id !== socket.id);
        console.log(`${socket.id} is disconnected`);
    })
})

http.listen(5000, () => console.log('listening on port 5000'));