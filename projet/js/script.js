/* Timer ------------------------------------------------------------------------------------------------------------------------ */
/* Variables -------------------------------------------------------- */
let minute = 2; 
let seconde = 0;

/* Fonction --------------------------------------------------------- */

/* Modifie le timer sur le Html */
function displayTimer(){
    document.getElementById("timer").textContent = `Temps : ${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`;
}

/* Indente le temps */
function Timer(){
    if (minute === 0 && seconde === 0) {
        stopTimer();
        return;
    }
    if (seconde == 0) {
        seconde = 60;
        minute--;
    }
    seconde--;
    displayTimer();
}

/* En combinaison de Timer() et setInterval() permet de mettre en place un décompte toute les secondes */
function ongoingTimer(){
    time = setInterval(Timer,1000); /* (function,delay) */
}

/* Commence le timer et désactive le bouton pour éviter le multiple lancement de ongoingTimer() */
function startTimer(){
    ongoingTimer();
    document.getElementById("start").disabled = true;
}

/* Arrete le timer et réactive le boutton */
function stopTimer(){
    clearInterval(time);
    document.getElementById("start").disabled = false;
}

/* Arrete via stopTimer() et reinisialise le timer */
function resetTimer(){
    stopTimer();
    minute = 2;
    seconde = 0;
    displayTimer();
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Jeu ------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Variable ------------------------------------------------------------------------- */
let compare = [] // Tableau pour la comparaison entre deux cartes
let victoire = -1; // Variable de victoire
let coups = 0; // Compteur du nombre coups (2 cartes retournées)
let isClikable = true; // variable permettant de gérer si l'utilisateur peut cliquer ou non (empêche pour éviter de pouvoir retourner des cartes pendants la comparaison)
let ongoingGame = false; // Booléen donnant l'état de la partie (true : la partie est en cours / false : partie en pause)
let won = false; // Booléen de l'état de vitcoire de l'utilisateur
let difficulte = document.getElementById("start").dataset.diff;
let paire = 2*2**difficulte;
console.log(paire);

/* Evenements ---------------------------------------------------------------------- */
document.getElementById("start").addEventListener("click",gameStart); // On lance la partie au moment du clique sur le bouton Start

/* Fonction -------------------------------------------------------------------------*/

/* Fonction vérifiant si c'est une paire / idente le nombre de coups */
function is_pair(){
    if (compare[0].dataset.valeur == compare[1].dataset.valeur) { // Vérifie si les deux éléments du tableau compare son similaire
        for(var i = 0; i <= 1; i++){
            compare[i].classList.add("pair"); // ajoute à la carte la classe paire pour éviter de pouvoir la retourner une fois la paire correcte
        }
        paire--;
    } else {
        for(var i = 0; i <= 1; i++){
            compare[i].querySelector(".carte").classList.toggle("retourne");  // On retourne les deux cartes qui ne sont pas une paire
        }
    }
    compare = []; // On réinisialise le tableau
    isClikable = true; // On redonne la capacité de cliquer à l'utilisateur
    coups++; // On ajoute un coup quelque soit le résultat
    document.getElementById("score").textContent = `Nombre de coup : ${coups}`; // On actualise le compteur de coups
}

/* Fonction vérifiant qi on peut ajouter et retourner une carte séléctionner*/
/*Les conditions :
    - la carte doit être cliquable (n'appartient pas à une paire déja formé ou la carte qui vient d'être mis face visible)
    - la partie est en cours
*/
function add_compare(){
    if (!isClikable ||this.classList.contains("pair") || this == compare[0] || !ongoingGame){ 
        return; // On sort de la boucle car la carte ne doit pas être touché
    }
    else{
        this.querySelector(".carte").classList.toggle("retourne");//On retourne la carte 
        compare.push(this); // On ajoute la carte au tableau compare pour comparaison dans is_pair()
        
    }    
    if (compare.length == 2) {
        isClikable = false; //On retire la capacité de cliquer à l'utilisateur le temps de comparer
        setTimeout(is_pair,1000); //On laisse un temps pour jouer l'animation de retournement et permettre de voir la carte si la paire n'est pas correcte. Ici pendant 1s
    }
}

/* Fonction vérifiant si l'utilisateur à gagner ou non */
function is_won(){
    let message = "";
    if (paire == 0 && seconde != 0){ // Victoire
        message = "Victoire";
        boiteFin(message);
        ongoingGame = false;  // On arrête la partie
        stopTimer();          // On arrête le timer
        clearInterval(game);  // On arrête l'intervalle de vérification de la condition de victoire
    }
    if (minute == 0 && seconde == 0){ // Défaite
        message = "Défaite";
        boiteFin(message);
        ongoingGame = false;
        stopTimer();
        clearInterval(game);
    }
}

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function melangerCartes(cartes) {
    for (let i = cartes.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cartes[i], cartes[j]] = [cartes[j], cartes[i]]; // Échange des éléments
    }
    return cartes;
}

// Tableau des cartes (chaque carte apparaît deux fois)
let cartef = [
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" }
];

let cartem = [
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" },
    { valeur: 5, src: "../multimedia/tiramisu.png" },
    { valeur: 5, src: "../multimedia/tiramisu.png" },
    { valeur: 6, src: "../multimedia/tarte.png" },
    { valeur: 6, src: "../multimedia/tarte.png" },
    { valeur: 7, src: "../multimedia/tarte2.png" },
    { valeur: 7, src: "../multimedia/tarte2.png" },
    { valeur: 8, src: "../multimedia/gros_gateau.png" },
    { valeur: 8, src: "../multimedia/gros_gateau.png" }
];

let carted = [
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 1, src: "../multimedia/cake_choco.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 2, src: "../multimedia/cookie.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 3, src: "../multimedia/fraise.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" },
    { valeur: 4, src: "../multimedia/cupcake.png" },
    { valeur: 5, src: "../multimedia/tiramisu.png" },
    { valeur: 5, src: "../multimedia/tiramisu.png" },
    { valeur: 6, src: "../multimedia/tarte.png" },
    { valeur: 6, src: "../multimedia/tarte.png" },
    { valeur: 7, src: "../multimedia/tarte2.png" },
    { valeur: 7, src: "../multimedia/tarte2.png" },
    { valeur: 8, src: "../multimedia/cake_fraise.png" },
    { valeur: 8, src: "../multimedia/cake_fraise.png" },
    { valeur: 9, src: "../multimedia/cake_myrtille.png" },
    { valeur: 9, src: "../multimedia/cake_myrtille.png" },
    { valeur: 10, src: "../multimedia/cake_orange.png" },
    { valeur: 10, src: "../multimedia/cake_orange.png" },
    { valeur: 11, src: "../multimedia/cheesecake.png" },
    { valeur: 11, src: "../multimedia/cheesecake.png" },
    { valeur: 12, src: "../multimedia/gros_gateau.png" },
    { valeur: 12, src: "../multimedia/gros_gateau.png" },
    { valeur: 13, src: "../multimedia/tarte_citron.png" },
    { valeur: 13, src: "../multimedia/tarte_citron.png" },
    { valeur: 14, src: "../multimedia/donut.png" },
    { valeur: 14, src: "../multimedia/donut.png" },
    { valeur: 15, src: "../multimedia/cupcake_rose.png" },
    { valeur: 15, src: "../multimedia/cupcake_rose.png" },
    { valeur: 16, src: "../multimedia/cup_cake.png" },
    { valeur: 16, src: "../multimedia/cup_cake.png" }
];

function shuffle(carteX){
    carteX = melangerCartes(carteX);
    const terrain = document.querySelector(".terrain");
    carteX.forEach(({ valeur, src }) => {
        const carte = `
            <div class="cartes" data-valeur="${valeur}">
                <div class="carte">
                    <div class="carte-dos face-arriere">
                        <img src="../multimedia/dos_carte.png" alt="Dos de carte">
                    </div>
                    <div class="carte-face face-devant">
                        <img src="${src}" alt="Carte ${valeur}">
                    </div>
                </div>
            </div>
        `;
        terrain.innerHTML += carte;
    });
}

/* Début de partie */
function gameStart(){
    if (difficulte == 1){
        shuffle(cartef);
    }
    else if(difficulte == 2){
        shuffle(cartem);
    }
    else{
        shuffle(carted);
    }
    document.querySelectorAll(".cartes").forEach(carte => {carte.addEventListener("click",add_compare)}) // On appelle une fonction quand on clique sur une des cartes
    startTimer();                    // On commence le timer
    ongoingGame = true;              // On lance la partie
    game = setInterval(is_won,1000); // On lance l'intervalle pour vérifier la condition de victoire
}

function boiteFin(message) {
    // Création du fond sombre
    let fond = document.createElement("div");
    fond.style.position = "fixed";
    fond.style.top = "0";
    fond.style.left = "0";
    fond.style.width = "100%";
    fond.style.height = "100%";
    fond.style.background = "rgba(0, 0, 0, 0.5)";
    fond.style.display = "flex";
    fond.style.justifyContent = "center";
    fond.style.alignItems = "center";
    fond.style.zIndex = "1000";

    // Création de la boîte de victoire
    let fondb = document.createElement("div");
    fondb.style.background = "white";
    fondb.style.padding = "20px";
    fondb.style.borderRadius = "10px";
    fondb.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    fondb.style.textAlign = "center";
    fondb.style.width = "300px";

    // Ajout du message de victoire
    let titre = document.createElement("h2");
    titre.textContent = message;

    // Bouton de fermeture
    let retourMenu = document.createElement("button");
    retourMenu.textContent = "OK";
    retourMenu.style.marginTop = "10px";
    retourMenu.style.padding = "10px";
    retourMenu.style.border = "none";
    retourMenu.style.background = "#28a745";
    retourMenu.style.color = "white";
    retourMenu.style.borderRadius = "5px";
    retourMenu.style.cursor = "pointer";

    // Création du formulaire
    let form = document.createElement("form");
    form.method = "POST";
    form.action = window.location.href;
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.alignItems = "center";
    form.style.gap = "10px";
    form.style.marginTop = "20px";

    // Création de l'input texte
    let pseudo = document.createElement("input");
    pseudo.setAttribute("type", "text");
    pseudo.setAttribute("placeholder", "Entrez votre pseudo");
    pseudo.name="pseudo";
    pseudo.style.padding = "8px";
    pseudo.style.border = "1px solid #ccc";
    pseudo.style.borderRadius = "5px";
    pseudo.style.width = "200px";

    // Création du bouton submit
    let submitButton = document.createElement("input");
    submitButton.type = "submit"
    submitButton.textContent = "Sauvegarder";
    submitButton.style.padding = "8px 12px";
    submitButton.style.border = "none";
    submitButton.style.background = "#007BFF";
    submitButton.style.color = "white";
    submitButton.style.borderRadius = "5px";
    submitButton.style.cursor = "pointer";

    function dataphp(id, value = "") {
        let input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("id", id);
        input.setAttribute("name", id);
        input.value = value;
        return input;
    }

    // Assemblage des éléments
    fondb.appendChild(titre);
    fondb.appendChild(form);
    form.appendChild(dataphp("score_par"));
    form.appendChild(dataphp("temps"));
    form.appendChild(dataphp("victoire"));
    form.appendChild(dataphp("difficulte", `${difficulte}`));
    form.appendChild(pseudo);
    form.appendChild(submitButton);
    fond.appendChild(fondb);
    document.body.appendChild(fond);
    if (message == "Victoire"){
        document.getElementById("victoire").value ="1";
    }
    else{
        document.getElementById("victoire").value = "0";
    }
    document.getElementById("score_par").value=`${coups}`;
    document.getElementById("temps").value=`${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`;
    console.log(document.getElementById("score").value);
    console.log(document.getElementById("victoire").value);
    // Ajout de l'événement submit
    form.addEventListener("submit", function () {
        if(pseudo.value == ""){
            return;
        }
        console.log("submit");
        window.location.href="Jeu_memory.php";
    });
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */