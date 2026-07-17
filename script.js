/* Base de données locale */

let produits =
JSON.parse(localStorage.getItem("produits")) || [];

let recette =
parseFloat(localStorage.getItem("recette")) || 0;

/* Sauvegarde */

function sauvegarder(){

    localStorage.setItem(
        "produits",
        JSON.stringify(produits)
    );

    localStorage.setItem(
        "recette",
        recette
    );
}

/* Ajouter produit */

function ajouterProduit() {
    // 1. On récupère les valeurs du formulaire
    let nom = document.getElementById("nom").value;
    let prix = parseFloat(document.getElementById("prix").value);
    let stock = parseInt(document.getElementById("stock").value);

    // 2. Validation des champs
    if (nom === "" || isNaN(prix) || isNaN(stock)) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // 3. Chercher si le téléphone existe déjà (insensible à la casse)
    let produitExistant = produits.find(p => p.nom.toLowerCase() === nom.toLowerCase());

    if (produitExistant) {
        // Si oui, on ajoute seulement la quantité au stock existant
        produitExistant.stock += stock;
    } else {
        // Si non, on ajoute le nouveau produit au tableau
        produits.push({
            nom,
            prix,
            stock
        });
    }

    // 4. Sauvegarde, nettoyage et affichage
    sauvegarder();

    document.getElementById("nom").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("stock").value = "";

    afficherProduits();
}

/* Vente */

function vendre(index){

    let qte =
    parseInt(
        prompt("Quantité vendue :")
    );

    if(
        isNaN(qte) ||
        qte <= 0
    ){
        return;
    }

    if(
        qte >
        produits[index].stock
    ){
        alert("Stock insuffisant !");
        return;
    }

    produits[index].stock -= qte;

    recette +=
    qte * produits[index].prix;

    sauvegarder();

    afficherProduits();
}

/* Supprimer */

function supprimerProduit(index){

    if(confirm(
        "Supprimer ce produit ?"
    )){

        produits.splice(index,1);

        sauvegarder();

        afficherProduits();
    }

}

/* Affichage */

function afficherProduits(){

    let liste =
    document.getElementById("liste");

    liste.innerHTML="";

    let stockTotal = 0;

    produits.forEach(
        (produit,index)=>{

        stockTotal +=
        produit.stock;

        liste.innerHTML += `

        <div class="produit">

            <h3>${produit.nom}</h3>

            <p><strong>Prix :</strong>
            ${produit.prix}$</p>

            <p><strong>Stock :</strong>
            ${produit.stock}</p>

            <div class="actions">

                <button
                class="btn-vendre"
                onclick="vendre(${index})">

                Vendre

                </button>

                <button
                class="btn-supprimer"
                onclick="supprimerProduit(${index})">

                Supprimer

                </button>

            </div>

        </div>

        `;
    });

    document.getElementById(
        "nbProduits"
    ).innerText =
    produits.length;

    document.getElementById(
        "stockTotal"
    ).innerText =
    stockTotal;

    document.getElementById(
        "recette"
    ).innerText =
    recette.toFixed(2);
}

function reinitialiserTout() {
    const confirmation = confirm("⚠️ Attention ! Voulez-vous vraiment tout réinitialiser ? Cela supprimera définitivement tous les téléphones et les recettes.");
    
    if (confirmation) {
        // 1. On vide proprement la base de données locale
        localStorage.clear();
        
        // 2. On vide le tableau en mémoire dans le script pour que l'affichage comprenne qu'il n'y a plus rien
        produits = []; 
        
        // 3. On force l'application à recalculer les compteurs (Recettes, Stock, etc.) et effacer la liste
        afficherProduits(); 
        
        alert("L'application a été réinitialisée avec succès !");
        
        // 4. On recharge simplement la page actuelle pour tout remettre à plat proprement
        window.location.reload();
    }
}
/* Chargement initial */

afficherProduits();
