// Formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);

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
            formMessage.style.display = 'block';
            contactForm.reset(); // Réinitialiser le formulaire
        } else {
            // Afficher un message d'erreur
            formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
        }
    })
    .catch(error => {
        // Afficher un message d'erreur
        formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
    });
});