const container = document.getElementById('main-container');

var io = io("/room");
var rowCount = 0

io.on("connect", () => {
    io.emit('getPollHistory');
  });

    io.on('showPoll', (questionDB) => {
    for (let index = 0; index < questionDB.length; index++) {
        addRow(container,rowCount,questionDB[index]);
        rowCount++;
    }
})

const addRow = (container,rowCount,q) => {
    
    container.innerHTML += `<div class="row ${rowCount}">
            <div class="poll ${rowCount}">${q.text}</div>
            <div class="count ${rowCount}">count</div>
            <div class="pollbtn ${rowCount}"><button id="${rowCount}" class="btnpoll">btn</button></div>
                </div>` 
    container.style.gridTemplateRows = `repeat(${rowCount+1}, 50px)`

    addListener();
}

const addListener = () =>{
    document.querySelectorAll('.btnpoll').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('clicked' + btn.id);
            //! Add real question id
            localStorage.setItem('pollID', btn.id);
            window.location.replace("poll.html")
        });
    })

}
