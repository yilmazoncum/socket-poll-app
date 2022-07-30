const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db = require('./db.js');

app.use('/', express.static('ui'));

var connections = []

io.of("/room").on('connection', (socket) => {
    console.log(`${socket.id} is in a room`);

    socket.on('getPollHistory', ()=>{
        io.of("/room").emit('showPoll',db.getDB());
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} is leave the room`);
    })
})

io.on('connection', (socket) => {
    connections.push(socket)
    console.log(`${socket.id} has connected`);

    socket.on('questionCreated', (question) => {
        question.votes = [0,0,0,0];
        db.addPoll(question)
    });
    
    socket.on('vote', (vote) => {
        console.log("vote server :" +vote.index + " " + vote.guess);    
        db.setVote(vote.id,vote.index)
        //questionDB[0].votes[vote.index]++;
        io.to(socket.id).emit('updateResults',db.getVotes(vote.id))
    });

    socket.on('getSpecificPoll', (id) => {
        console.log("get specific poll", id);
        io.to(socket.id).emit('showPoll',db.getPoll(id))
    })

    socket.on('disconnect', () => {
        connections = connections.filter((cn) => cn.id !== socket.id);
        console.log(`${socket.id} is disconnected`);
    })
})

http.listen(5000, () => console.log('listening on port 5000'));