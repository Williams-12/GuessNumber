// les variables à utiliser
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// fonction pour afficher message
function entrerMessage(msg) {
    document.querySelector(`.message`).textContent = msg;
}

// fonction pour mettre a jours le score
function mettreAjours(newScore) {
    score = newScore;
    document.querySelector(`.score`).textContent = score;
}

//  Le bouton « Again » réinitialise tout (sauf le highscore)
function reinitialiser() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    document.querySelector(`.number`).textContent = `?`;
    document.querySelector(`.guess`).value = ` `;
    document.querySelector(`body`).style.backgroundColor = `black`;
    entrerMessage(`Start guessing...`);
    mettreAjours(score);
}

// fonction pour gerer la victoire
function gagner() {
    entrerMessage(`GREAT, YOU WIN !!!`);
    document.querySelector(`.number`).textContent = secretNumber;
    document.querySelector(`body`).style.backgroundColor = `green`;
    if (score > highscore) {
        highscore = score;
        document.querySelector(`.highscore`).textContent = highscore;
    }
}

// si l'entree est invalide, je veux clignoter le body
function cligonterBody() {
    const body = document.querySelector(`body`);
    body.classList.add(`blink`);
    // et ca va retirer apres 500ms
    setTimeout(function () { body.classList.remove(`blink`); }, 500);
}

// Le bouton « Check » permet de vérifier la valeur d'entrée avec le nombre généré par le programme
function verifierEntree() {
    let guess = Number(document.querySelector(`.guess`).value);
    if (!guess || guess < 1 || guess > 20) {
        entrerMessage(`Entrée un nombre entre 1 et 20`);
        // ici, je veux clignoter le body si l'entree est invalide
        cligonterBody();
        mettreAjours(score - 1);
    } else if (guess == secretNumber) {
        gagner();
    } else {
        entrerMessage(guess > secretNumber ? `Too high!` : `Too low!`);
        mettreAjours(score - 1);
        if (score < 1) {
            entrerMessage(`Vous avez perdu!!!`);
        }
    }

}

// je sors ici pour appeler mes fonctions
document.querySelector(`.again`).addEventListener(`click`, reinitialiser);
document.querySelector(`.check`).addEventListener(`click`, verifierEntree);