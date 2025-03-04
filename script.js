// Animation texte dynamique
const dynamicText = document.getElementById('dynamic-text');
const professions = ["Data Analyst", "Data Scientist", "Développeur Python", "Développeur SAS"];
let professionIndex = 0;

/**
 * Change le texte dynamique toutes les 2 secondes.
 */
function changeProfession() {
    dynamicText.textContent = professions[professionIndex];
    professionIndex = (professionIndex + 1) % professions.length; // Boucle à travers les professions
}

// Démarrer l'animation du texte
setInterval(changeProfession, 2000);

// Initialisation des animations AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Durée des animations
    once: true, // Les animations ne se déclenchent qu'une fois
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message'); // Sélection du message de formulaire

/**
 * Valide les champs du formulaire.
 * @returns {boolean} - Retourne `true` si le formulaire est valide, sinon `false`.
 */
function validateForm() {
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = 'Veuillez remplir tous les champs.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return false;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Veuillez entrer une adresse email valide.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        return false;
    }

    return true;
}

/**
 * Valide une adresse email.
 * @param {string} email - L'adresse email à valider.
 * @returns {boolean} - Retourne `true` si l'email est valide, sinon `false`.
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Envoie les données du formulaire via Fetch API.
 */
function submitForm() {
    const formData = new FormData(contactForm);

    // Afficher un message de chargement
    formMessage.textContent = 'Envoi en cours...';
    formMessage.style.display = 'block';
    formMessage.classList.remove('success', 'error');

    fetch('https://formspree.io/f/mvojzqzv', { // Remplacez par votre URL Formspree
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessage.textContent = 'Message envoyé avec succès !';
            formMessage.classList.add('success');
            contactForm.reset(); // Réinitialiser le formulaire
        } else {
            throw new Error('Erreur lors de l\'envoi du formulaire.');
        }
    })
    .catch(error => {
        formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
        formMessage.classList.add('error');
    })
    .finally(() => {
        // Masquer le message après 5 secondes
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Écouteur d'événement pour la soumission du formulaire
contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    if (validateForm()) {
        submitForm();
    }
});

// Gestion du menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

/**
 * Bascule la visibilité du menu mobile.
 */
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Écouteur d'événement pour le bouton du menu mobile
mobileMenu.addEventListener('click', toggleMobileMenu);

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Défilement infini des outils
const toolsGrid = document.getElementById('tools-grid');

/**
 * Configure le défilement infini pour la section des outils.
 */
function setupInfiniteScroll() {
    const tools = toolsGrid.querySelectorAll('.tool');

    // Cloner les éléments et les ajouter à la fin
    tools.forEach(tool => {
        const clone = tool.cloneNode(true);
        toolsGrid.appendChild(clone);
    });
}

setupInfiniteScroll();

// Bouton "Retour en haut"
const backToTopButton = document.getElementById('back-to-top');

/**
 * Affiche ou masque le bouton "Retour en haut" en fonction de la position de défilement.
 */
function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

/**
 * Fait défiler la page vers le haut de manière fluide.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Écouteur d'événement pour le défilement de la page
window.addEventListener('scroll', toggleBackToTopButton);

// Écouteur d'événement pour le bouton "Retour en haut"
backToTopButton.addEventListener('click', scrollToTop);

// Défilement infini des projets
function setupProjectsInfiniteScroll() {
    const projectsGrid = document.getElementById('projects-grid');
    const projects = projectsGrid.querySelectorAll('.project');

    // Cloner les éléments et les ajouter à la fin pour créer un effet de boucle
    projects.forEach(project => {
        const clone = project.cloneNode(true);
        projectsGrid.appendChild(clone);
    });
}

setupProjectsInfiniteScroll();
