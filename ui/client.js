var io = io();

/* var question = {
    text: "what's the best programming language ?",
    choices: ["C#", "javascript", "python", "asp.net"]
};
 */
var question = {
    text: "what's the best programming language ?",
    choices: ["C#", "javascript", "python", "asp.net"]
};
//TODO: Make choice count flexible

const loadQuestion = () => {
    var choices = question.choices;
    document.querySelector('#question').textContent = question.text;

    for (var i = 0; i < choices.length; i++) {
        var element = document.querySelector('#choice' + i);
        element.innerHTML = choices[i];
        guess('btn' + i, choices[i]);
    }
    
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = () => {
        //TODO: save answers in array 
        console.log("clicked " + id + guess);
    }
}

loadQuestion();