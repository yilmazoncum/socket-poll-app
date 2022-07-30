var io = io();
var globalID;

io.on('showPoll', (question) => {
    console.log(question);
    loadQuestion(question)
})

io.on('updateResults', (results) => {
    console.log(results);
    var i = 0;
    document.querySelectorAll('.votes').forEach(p => {
        console.log(p);
        p.textContent = results[i];
        i++;
    })
});

io.on("connect", () => {
    var id = localStorage.getItem('pollID')
    globalID = id;
    io.emit('getSpecificPoll',id);
  });


const loadQuestion = (q) => {
    document.querySelector('#question').textContent = question.text;

    for (var i = 0; i < q.choices.length; i++) {
        var element = document.querySelector('#choice' + i);
        element.innerHTML = q.choices[i];
        guess('btn' + i, q.choices[i],i);
    }
    
}

const guess = (id, guess,index) => {
    var btn = document.getElementById(id);
    btn.onclick = () => {
        console.log("clicked " + id + guess);
        disableBtns();
        var id = localStorage.getItem('pollID')
        io.emit("vote",{id: globalID,guess: guess,index: index})
    }   
}

const disableBtns = ()=>{
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
    })
}