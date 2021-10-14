let cardsList = [

    {'name': 'Frieza', 'src': './img/frieza.png'},
    {'name': 'Frieza', 'src': './img/frieza.png'},
    {'name': 'Gohan', 'src': './img/gohan.png'},
    {'name': 'Gohan', 'src': './img/gohan.png'},
    {'name': 'Goku', 'src': './img/goku.png'},
    {'name': 'Goku', 'src': './img/goku.png'},
    {'name': 'Vegeta', 'src': './img/vegeta.png'},
    {'name': 'Vegeta', 'src': './img/vegeta.png'}
];

let tentative = 0;
let newGameBtn = document.querySelector('.new-game');
let continueBtn = document.querySelector('.continue');
let menu = document.querySelector('.menu');
let game = document.querySelector('.game');
let divCards = document.querySelector('.cards');

window.addEventListener('keydown', pause);
newGameBtn.addEventListener('click', () => {
    newGame();
});
continueBtn.addEventListener('click', continueGame);

function newGame() {
    menu.classList.remove('active');
    continueBtn.classList.add('active');

    removeChild();
    shuffleCards();
    for (let card of cardsList) {
        createCards(card);
    }
    start();
}

function continueGame() {
    menu.classList.remove('active');
}

function pause(e) {
    if (e.key == "Escape") {
        menu.classList.add('active');
    }
}

function createCards(character) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-name', character.name);

    let img = document.createElement('img');
    img.src = character.src;
    let back = document.createElement('img');
    back.src = './img/back.png';

    card.appendChild(back);
    card.appendChild(img);
    divCards.appendChild(card);
}

function removeChild() {
    while (divCards.firstChild) {
        divCards.removeChild(divCards.firstChild);
    }
}

function shuffleCards() {
    for (let i = cardsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsList[i], cardsList[j]] = [cardsList[j], cardsList[i]];
    }
}

function start() {
    let cards = document.querySelectorAll('.card');

    for (let card of cards) {
        card.addEventListener('click', () => {
            if (!card.classList.contains("disable")) {
                tentative++;
                let trySpan = document.querySelector(".try");
                trySpan.innerHTML = `Click : ${tentative}`;
                card.classList.add('active');

                let activeCard = document.querySelectorAll('.active.card');
                if (activeCard.length == 2) {
                    isMatch(activeCard[0], activeCard[1]);
                }
            }
        });
    }
}

function isMatch(card1, card2) {
    if (card1.getAttribute("data-name") === card2.getAttribute("data-name")) {
        card1.classList.remove("active");
        card1.classList.add("disable");
        card2.classList.remove("active");
        card2.classList.add("disable");
    } else {
        setTimeout(() => {
            card1.classList.remove("active");
            card2.classList.remove("active");
        },500);
    }


}