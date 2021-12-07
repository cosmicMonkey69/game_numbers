const playButton = document.getElementById('playButton'),
    gameTable = document.getElementById('gameTable'),
    cells = gameTable.querySelectorAll('td'),
    timer = document.getElementById('timer');

playButton.addEventListener('click', play);

let timerId;

function play () {
    
    playButton.value = 'Начать сначала';

    let arrNumbers = [];
    for(let i=1; i<=cells.length; i++) {
        arrNumbers.push(i);
    }
    let n = cells.length;
    for (let i=cells.length-1; i>=0; i--) {
        let randomNumber = Math.floor(Math.random()*n);
        let fontSize = Math.random()*(36-18)+12;
        cells[i].textContent = arrNumbers[randomNumber];
        cells[i].style.color = '#'+(Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
        cells[i].style.fontSize = fontSize+'px';
        arrNumbers.splice(randomNumber, 1);
        n--;
    }

    let timeGame = 31;
    timerId = setInterval(function () {
        timeGame--;
        timer.textContent = `Времени осталось: ${timeGame}`;
        if(timeGame == -1) {
            timer.textContent = 'Ты проиграл!';
            clearInterval(timerId);
        }
    }, 1000);

    let num=1;
    for (let cell of cells) {
        cell.addEventListener('click', control);
    }
    function control (){
        if(this.textContent == num && timer.textContent != 'Ты проиграл!') {
            this.classList.add('activeTd');
            if(num == cells.length) {
                clearInterval(timerId);
                timer.textContent = 'Ты выиграл!';
            }
            num++;
        }
    }

    playButton.removeEventListener('click', play);
    playButton.addEventListener('click', function() {
        clearInterval(timerId);
        for (let cell of cells) {
            cell.classList.remove('activeTd');
        }
        play();
    });

}