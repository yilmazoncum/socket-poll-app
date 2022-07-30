var io = io();
var globalID;
var myChart;

io.on('showPoll', (question) => {
    loadQuestion(question)
})

io.on('updateResults', (results) => {
    console.log(chartData);
    chartData.datasets[0].data = results
    console.log(chartData);
    myChart.update();
});

io.on("connect", () => {
    var id = localStorage.getItem('pollID')
    globalID = id;
    io.emit('getSpecificPoll', id);
});


const loadQuestion = (q) => {
    document.querySelector('#question').textContent = question.text;

    for (var i = 0; i < q.choices.length; i++) {
        var element = document.querySelector('#choice' + i);
        element.innerHTML = q.choices[i];
        guess('btn' + i, q.choices[i], i);
    }

    setChart(q.choices,q.votes)

}

const guess = (id, guess, index) => {
    var btn = document.getElementById(id);
    btn.onclick = () => {
        console.log("clicked " + id + guess);
        disableBtns();
        var id = localStorage.getItem('pollID')
        io.emit("vote", { id: globalID, guess: guess, index: index })
    }
}

const disableBtns = () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
    })
}

// chart



const labels = [];

const chartData = {
    labels: labels,
    datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 0, 0, 0]
    }]
};

const config = {
    type: 'bar',
    data: chartData,
    options: {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Votes Chart'
            }
        }
    },
};

const setChart = (choices,results) => {
    choices.forEach((c) => { 
        labels.push(c);
    });
    chartData.datasets[0].data = results
    console.log(chartData);
    myChart = new Chart(document.getElementById('myChart'), config);
}

