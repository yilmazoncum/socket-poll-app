var DB = [];

// ! Test Polls
var question1 = {
    text: "what's the best programming language ?",
    choices: ["C#", "javascript", "python", "asp.net"],
    votes: [0,0,0,0],
    voteCount: 0
    
};
var question2 = {
    text: "what's the best city ?",
    choices: ["New York", "Amsterdam", "London", "Berlin"],
    votes: [0,0,0,0],
    voteCount: 0
};
var question3 = {
    text: "what's the best country?",
    choices: ["Türkiye", "England", "Germany", "United States"],
    votes: [0,0,0,0],
    voteCount: 0
};
var question4 = {
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
    return DB[id]
}

const getDB = () => {
    return DB;
}

const addPoll = (q) => {
    DB.push(q)
    console.log(JSON.stringify(DB));
}

const setVote = (id,choice) => {
    DB[id].votes[choice]++;
    DB[id].voteCount++;

}

const getVotes = (id) => {
    return DB[id].votes
}

module.exports = {
    getPoll,
    getDB,
    addPoll,
    setVote,
    getVotes,
}