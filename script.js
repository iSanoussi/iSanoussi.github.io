// Animation texte dynamique
const dynamicText = document.getElementById('dynamic-text');
const professions = ["Data Analyst", "Data Scientist", "Développeur Python", "Développeur SAS"];
let professionIndex = 0;

function changeProfession() {
    dynamicText.textContent = professions[professionIndex];
    professionIndex = (professionIndex + 1) % professions.length;
}

setInterval(changeProfession, 2000);

// Initialisation des animations AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Gestion du mode sombre
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.textContent = isDarkMode ? 'Mode Clair' : 'Mode Sombre';

    // Appliquer la couleur du texte dynamique en fonction du mode
    if (isDarkMode) {
        dynamicText.classList.remove('dynamic-text-light');
        dynamicText.classList.add('dynamic-text-dark');
    } else {
        dynamicText.classList.remove('dynamic-text-dark');
        dynamicText.classList.add('dynamic-text-light');
    }
}

// Appliquer le mode sombre par défaut au chargement de la page
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Mode Clair';
    dynamicText.classList.add('dynamic-text-dark'); // Appliquer la couleur violette en mode sombre
} else {
    themeToggle.textContent = 'Mode Sombre';
    dynamicText.classList.add('dynamic-text-light'); // Appliquer la couleur bleue en mode clair
}

themeToggle.addEventListener('click', toggleDarkMode);

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

function validateForm() {
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        showFormMessage('Veuillez remplir tous les champs.', 'error');
        return false;
    }

    if (!validateEmail(email)) {
        showFormMessage('Veuillez entrer une adresse email valide.', 'error');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function submitForm() {
    const formData = new FormData(contactForm);

    showFormMessage('Envoi en cours...', 'info');

    fetch('https://formspree.io/f/mvojzqzv', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('Message envoyé avec succès !', 'success');
            contactForm.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi du formulaire.');
        }
    })
    .catch(error => {
        showFormMessage('Une erreur s\'est produite. Veuillez réessayer.', 'error');
    });
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
        submitForm();
    }
});

// Gestion du menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

mobileMenu.addEventListener('click', toggleMobileMenu);

// Fermer le menu mobile lors du clic en dehors
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Défilement infini des outils et projets
function setupInfiniteScroll(container, itemSelector) {
    const items = container.querySelectorAll(itemSelector);

    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            } else {
                entry.target.style.opacity = 0;
            }
        });
    }, { threshold: 0.5 });

    items.forEach(item => observer.observe(item));
}

setupInfiniteScroll(document.getElementById('tools-grid'), '.tool');
setupInfiniteScroll(document.getElementById('projects-grid'), '.project');

// Bouton "Retour en haut"
const backToTopButton = document.getElementById('back-to-top');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);

// Sélectionnez tous les titres de section
const sectionTitles = document.querySelectorAll('.section-title-light, .section-title-dark');

// Fonction pour appliquer les classes dynamiques
function updateSectionTitles(isDarkMode) {
    sectionTitles.forEach(title => {
        if (isDarkMode) {
            title.classList.remove('section-title-light');
            title.classList.add('section-title-dark');
        } else {
            title.classList.remove('section-title-dark');
            title.classList.add('section-title-light');
        }
    });
}

// Gestion du mode sombre
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.textContent = isDarkMode ? 'Mode Clair' : 'Mode Sombre';

    // Appliquer les classes dynamiques aux titres de section
    updateSectionTitles(isDarkMode);
}

// Appliquer le mode sombre par défaut au chargement de la page
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Mode Clair';
    updateSectionTitles(true); // Appliquer la couleur violette en mode sombre
} else {
    themeToggle.textContent = 'Mode Sombre';
    updateSectionTitles(false); // Appliquer la couleur bleue en mode clair
}

themeToggle.addEventListener('click', toggleDarkMode);

const toolsGrid = document.querySelector('.tools-grid');

function startScroll() {
    let scrollAmount = 0;
    const scrollSpeed = 1; // Vitesse de défilement (en pixels)

    function scroll() {
        toolsGrid.scrollLeft += scrollSpeed;
        scrollAmount += scrollSpeed;

        // Si on atteint la fin du contenu, revenir au début
        if (scrollAmount >= toolsGrid.scrollWidth / 2) {
            toolsGrid.scrollLeft = 0;
            scrollAmount = 0;
        }

        requestAnimationFrame(scroll); // Boucle d'animation
    }

    scroll();
}

startScroll();


const certificationsContainer = document.querySelector('.certifications-container');

function autoScroll() {
    const scrollAmount = 300;
    const scrollInterval = 3000;

    setInterval(() => {
        certificationsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });

        if (certificationsContainer.scrollLeft + certificationsContainer.clientWidth >= certificationsContainer.scrollWidth) {
            certificationsContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, scrollInterval);
}

window.onload = autoScroll;
