// Hämta poäng från localStorage eller initiera om det inte finns
let score = JSON.parse(localStorage.getItem('score')) || {
    vinst: 0,
    förlust: 0,
    likamed: 0
};
// Uppdatera poängvisningen vid sidladdning
updateScoreElement();

function playGame(userVal) {
    const datornVal = pickDatornVal();
    let RundansResultat = "";

    // Bestäm resultatet av rundan om userVal är papper 
    if (userVal === 'paper') {
        if (datornVal === 'rock') {
            RundansResultat = 'You win!';
        } else if (datornVal === 'paper') {
            RundansResultat = 'Lika.';
        } else {
            RundansResultat = 'You lose.';
        }

        // fortsätt med de andra valen om userVal är sten
    } else if (userVal === 'rock') {
        if (datornVal === 'rock') {
            RundansResultat = 'Lika.';
        } else if (datornVal === 'paper') {
            RundansResultat = 'You lose.';
        } else {
            RundansResultat = 'You win!';
        }
        // fortsätt med de andra valen om userVal är sax
    } else if (userVal === 'scissors') {
        if (datornVal === 'rock') {
            RundansResultat = 'You lose.';
        } else if (datornVal === 'paper') {
            RundansResultat = 'You win!';
        } else {
            RundansResultat = 'Lika.';
        }
    }
    // Uppdatera poängen baserat på resultatet
    if (RundansResultat === 'You win!') score.vinst++;
    else if (RundansResultat === 'You lose.') score.förlust++;
    else score.likamed++;
    // Spara uppdaterad poäng i localStorage
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    // Visa resultatet av rundan
    document.querySelector('.JS-moves').innerHTML = `
        You chose: <img src="../img/${userVal}.png" class="result-img">
        Computer chose: <img src="../img/${datornVal}.png" class="result-img">`;
    // Visa resultattexten
    document.querySelector('.JS-result').innerText = RundansResultat;
} // Uppdatera poängvisningen på sidan

function updateScoreElement() {
    document.querySelector('.JS-score').innerText =
        `Vinst: ${score.vinst}, Förlust: ${score.förlust}, LikaMed: ${score.likamed}`;
} // Datorns val slumpas fram

function pickDatornVal() {
    const randomNumber = Math.random();
    // 1/3 chans för varje val
    if (randomNumber < 1 / 3) return 'rock';
    if (randomNumber < 2 / 3) return 'paper';
    return 'scissors';
}