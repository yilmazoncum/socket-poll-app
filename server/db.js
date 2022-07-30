const uuid = require('uuid');
var DB = [];

// ! Test Polls
var question1 = {
    id:'795e7188-00ee-43cc-b70f-643c8e6b568c',
    text: "what's the best programming language ?",
    choices: ["C#", "javascript", "python", "asp.net"],
    votes: [2,4,2,1],
    voteCount: 0
    
};
var question2 = {
    id:"6e392fe8-eadb-404d-b6ba-776d947f3914",
    text: "what's the best city ?",
    choices: ["New York", "Amsterdam", "London", "Berlin"],
    votes: [0,0,0,0],
    voteCount: 0
};
var question3 = {
    id: "b3543cff-bb33-43e8-94d7-9fd20a9cb251",
    text: "what's the best country?",
    choices: ["Türkiye", "England", "Germany", "United States"],
    votes: [5,3,2,6],
    voteCount: 0
};
var question4 = {
    id: "271bb4a5-cba0-4ed9-9e9c-8f11f96a4ddc",
    text: "what's the best German car brand?",
    choices: ["BMW", "Mercedes", "Audi", "Opel"],
    votes: [0,0,0,0],
    voteCount: 0
};

DB.push(question1);
DB.push(question2);
DB.push(question3);
DB.push(question4);

const getPoll = (id) => {
   return DB.find(q => q.id == id)
}

const getDB = () => {
    return DB;
}

const addPoll = (q) => {
    q["id"] = uuid.v4();
    DB.push(q)
    console.log(q);
}

const setVote = (id,choice) => {
    let found = DB.find(q => q.id == id)
    
    found.votes[choice]++;
    found.voteCount++;
}

const getVotes = (id) => {
    let found = DB.find(q => q.id == id)
    return found.votes
}

module.exports = {
    getPoll,
    getDB,
    addPoll,
    setVote,
    getVotes,
}