const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/', express.static('ui'));

var connections = []
var questionDB = []


// ! TEST TEST TEST
var question1 = {
    text: "what's the best programming language ?",
    choices: ["C#", "javascript", "python", "asp.net"],
    votes: [0,0,0,0]
};
var question2 = {
    text: "what's the best city ?",
    choices: ["New York", "Amsterdam", "London", "Berlin"],
    votes: [0,0,0,0]
};

questionDB.push(question1);
questionDB.push(question2);

io.of("/room").on('connection', (socket) => {
    console.log(`${socket.id} is in a room`);

    socket.on('getPollHistory', ()=>{
        io.of("/room").emit('showPoll',questionDB);
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} is leave the room`);
    })
})

io.on('connection', (socket) => {
    connections.push(socket)
    console.log(`${socket.id} has connected`);

    socket.on('questionCreated', (question) => {
        io.emit('showPoll',question);
        question.votes = [0,0,0,0];
        questionDB.push(question);
    });
    
    socket.on('vote', (vote) => {
        console.log("vote server :" +vote.index + " " + vote.guess);    
        questionDB[0].votes[vote.index]++;
        io.to(socket.id).emit('updateResults',questionDB[0].votes)
    });

    socket.on('getSpecificPoll', (id) => {
        console.log("get specific poll", id);
        io.to(socket.id).emit('showPoll',questionDB[id])
    })

    socket.on('disconnect', () => {
        connections = connections.filter((cn) => cn.id !== socket.id);
        console.log(`${socket.id} is disconnected`);
    })
})

http.listen(5000, () => console.log('listening on port 5000'));