var io = io();

io.on('showPoll', (question) => {
    loadQuestion(question)
})


const loadQuestion = (question) => {
    var choices = question.choices;
    document.querySelector('#question').textContent = question.text;

    for (var i = 0; i < choices.length; i++) {
        var element = document.querySelector('#choice' + i);
        element.innerHTML = choices[i];
        guess('btn' + i, choices[i],i);
    }
    
}

const guess = (id, guess,index) => {
    var btn = document.getElementById(id);
    btn.onclick = () => {
        //TODO: save answers in array 
        console.log("clicked " + id + guess);
        disableBtns();
        io.emit("vote",{guess: guess,index: index})
    }   
}

const disableBtns = ()=>{
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
    })
}



loadQuestion();