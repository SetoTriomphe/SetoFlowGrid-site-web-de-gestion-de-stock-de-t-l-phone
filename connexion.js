// ========================================================
// 1. GESTION DE L'INSCRIPTION (Créer un compte)
// ========================================================
document.getElementById('formInscription').addEventListener('submit', function(event) {
    event.preventDefault(); // Évite que la page ne se recharge

    // Récupération des données de l'entreprise (les SEULS champs qui existent dans ton HTML)
    const nomEntreprise = document.getElementById('NomDeVotreEntreprise').value;
    const motDePasse = document.getElementById('MotDePasse').value; 
    const telEntreprise = document.getElementById('numero1').value;
    const emailEntreprise = document.getElementById('email1').value;
    
    //  SÉCURITÉ À L'INSCRIPTION (Entre 6 et 8 caractères)
            if (motDePasse.length < 6 || motDePasse.length > 8) {
                alert("❌ Le mot de passe doit contenir entre 6 et 8 caractères maximum.");
                return; // Bloque l'inscription
            }

    // Sauvegarde dans le localStorage
    localStorage.setItem('entreprise', nomEntreprise);
    localStorage.setItem('compteMotDePasse', motDePasse);
    localStorage.setItem('compteEmail', emailEntreprise);

    alert(" Votre compte d'administration pour " + nomEntreprise + " a été créé avec succès ! Connectez-vous ci-dessus.");
    
    // On vide les champs du formulaire d'inscription après enregistrement
    document.getElementById('formInscription').reset();
});


// ========================================================
// 2. GESTION DE LA CONNEXION (Accéder au gérant)
// ========================================================
document.getElementById('formConnexion').addEventListener('submit', function(event) {
    event.preventDefault(); // Évite que la page ne se recharge

    // Récupération des identifiants saisis dans la partie connexion
    const emailSaisi = document.getElementById('email2').value;
    const passwordSaisi = document.getElementById('password').value;

    //  SÉCURITÉ À LA CONNEXION : Entre 6 et 8 caractères
    if (passwordSaisi.length < 6 || passwordSaisi.length > 8) {
        alert("❌ Connexion impossible : Le mot de passe doit contenir entre 6 et 8 caractères.");
        return; // Arrête le script et empêche la connexion
    }

    // Récupération des identifiants enregistrés dans le localStorage
    const vraiEmail = localStorage.getItem('compteEmail');
    const vraiPassword = localStorage.getItem('compteMotDePasse');

    // Vérification de sécurité si aucun compte n'est encore créé
    if (!vraiEmail || !vraiPassword) {
        alert("❌ Aucun compte n'est enregistré sur cet appareil. Veuillez d'abord remplir le formulaire 'Créez un compte' ci-dessous.");
        return;
    }

    // Comparaison des accès
    if (emailSaisi === vraiEmail && passwordSaisi === vraiPassword) {
        alert("🔓 Connexion réussie ! Bienvenue dans votre gestionnaire.");
        window.location.href = "lecontenu.html";
    } else {
        alert("❌ Adresse email ou mot de passe incorrect. Veuillez réessayer.");
    }
});