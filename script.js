// Texte dynamique pour les métiers
const dynamicText = document.getElementById('dynamic-text');
const professions = ["Data Scientist", "Data Analyst", "Développeur Python", "Développeur SAS"];
let index = 0;

function changeProfession() {
    dynamicText.textContent = professions[index];
    index = (index + 1) % professions.length; // Passer au métier suivant
}

// Changer de métier toutes les 3 secondes
setInterval(changeProfession, 3000);

// Initialisation des animations AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Durée des animations
    once: true, // Les animations ne se déclenchent qu'une fois
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message'); // Sélection du message de formulaire

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);

    // Afficher un message de chargement
    formMessage.textContent = 'Envoi en cours...';
    formMessage.style.display = 'block';
    formMessage.classList.remove('success', 'error');

    // Envoyer les données via Fetch API
    fetch('https://formspree.io/f/mvojzqzv', { // Remplacez par votre URL Formspree
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Afficher un message de succès
            formMessage.textContent = 'Message envoyé avec succès !';
            formMessage.classList.add('success');
            contactForm.reset(); // Réinitialiser le formulaire
        } else {
            // Afficher un message d'erreur
            formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
            formMessage.classList.add('error');
        }
    })
    .catch(error => {
        // Afficher un message d'erreur en cas de problème réseau
        formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
        formMessage.classList.add('error');
    })
    .finally(() => {
        // Masquer le message après 5 secondes
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
});

// Gestion du menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Dupliquer le contenu des outils pour un défilement infini
const toolsScroll = document.querySelector('.tools-scroll');
const toolsContent = toolsScroll.innerHTML; // Récupère le contenu actuel
toolsScroll.innerHTML += toolsContent; // Duplique le contenu
