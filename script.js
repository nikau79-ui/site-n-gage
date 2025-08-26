// =================================
// SCRIPT GLOBAL N-GAGE - VERSION COMPLÈTE
// =================================

// Menu mobile
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// Fermer le menu mobile si on clique ailleurs
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && mobileBtn && !mobileNav.contains(event.target) && !mobileBtn.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Gestion bouton retour en haut
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Fonction complète pour envoyer des emails
function sendEmail(type) {
    const templates = {
        'contact-general': {
            subject: 'Demande de renseignements - Catalogue N-Gage',
            body: 'Bonjour Nicolas,\n\nJe vous contacte concernant vos services.\n\nCordialement,'
        },
        'formation-decouvrir-ia': {
            subject: 'Réservation Formation "Découvrir l\'IA sans jargon" - 200€',
            body: 'Bonjour Nicolas,\n\nJe souhaite réserver la formation "Découvrir l\'IA sans jargon" (200€).\n\nMes informations :\n- Nom/Prénom : [À compléter]\n- Entreprise : [À compléter]\n- Email : [À compléter]\n- Téléphone : [À compléter]\n\nCordialement,\n[Votre nom]'
        },
        'formation-contenu-ia': {
            subject: 'Réservation Formation "Créer du contenu avec l\'IA" - 250€',
            body: 'Bonjour Nicolas,\n\nJe souhaite réserver la formation "Créer du contenu avec l\'IA" (250€).\n\nCordialement,\n[Votre nom]'
        },
        'formation-prompting': {
            subject: 'Réservation Formation "Maîtriser l\'art du Prompting" - 250€',
            body: 'Bonjour Nicolas,\n\nJe souhaite réserver la formation "Maîtriser l\'art du Prompting" (250€).\n\nCordialement,\n[Votre nom]'
        },
        'formation-notebook-lm': {
            subject: 'Réservation Formation "Notebook LM" - 200€',
            body: 'Bonjour Nicolas,\n\nJe souhaite réserver la formation "Utiliser Notebook LM" (200€).\n\nCordialement,\n[Votre nom]'
        },
        'formation-no-code': {
            subject: 'Formation Structuration avec Notion/Airtable/Tally',
            body: 'Bonjour Nicolas,\n\nJe m\'intéresse à la formation Notion/Airtable/Tally.\n\nCordialement,\n[Votre nom]'
        },
        'formation-automatisation': {
            subject: 'Réservation Formation "Automatiser son activité" - 250€',
            body: 'Bonjour Nicolas,\n\nJe souhaite réserver la formation "Automatiser son activité" (250€).\n\nCordialement,\n[Votre nom]'
        },
        'formation-api': {
            subject: 'Formation "Connecter ses outils" - 250€',
            body: 'Bonjour Nicolas,\n\nJe souhaite la formation "Connecter ses outils" (250€).\n\nCordialement,\n[Votre nom]'
        },
        'formation-veille': {
            subject: 'Formation "Système de veille automatisée" - 250€',
            body: 'Bonjour Nicolas,\n\nJe souhaite la formation "Système de veille automatisée" (250€).\n\nCordialement,\n[Votre nom]'
        },
        'pack-starter-ia': {
            subject: 'Inscription Pack "Starter IA Express" - 600€',
            body: 'Bonjour Nicolas,\n\nJe souhaite m\'inscrire au Pack "Starter IA Express" (600€).\n\nCordialement,\n[Votre nom]'
        },
        'pack-createur-contenu': {
            subject: 'Inscription Pack "Créateur de Contenu Augmenté" - 900€',
            body: 'Bonjour Nicolas,\n\nJe souhaite m\'inscrire au Pack "Créateur de Contenu Augmenté" (900€).\n\nCordialement,\n[Votre nom]'
        },
        'pack-business-flow': {
            subject: 'Pack "Business Flow Automation" - 1200€',
            body: 'Bonjour Nicolas,\n\nJe m\'intéresse au Pack "Business Flow Automation" (1200€).\n\nCordialement,\n[Votre nom]'
        },
        'consulting-ia': {
            subject: 'Demande de Consulting IA Stratégique - 150€/h',
            body: 'Bonjour Nicolas,\n\nJe souhaite faire appel à vos services de consulting IA stratégique.\n\nCordialement,\n[Votre nom]'
        },
        'assistant-ia': {
            subject: 'Demande Assistant IA Personnalisé - À partir de 400€',
            body: 'Bonjour Nicolas,\n\nJe souhaite faire développer un assistant IA personnalisé.\n\nCordialement,\n[Votre nom]'
        },
        'mini-crm': {
            subject: 'Devis Mini-CRM Automatisé (800-1500€)',
            body: 'Bonjour Nicolas,\n\nJe souhaite un devis pour un Mini-CRM automatisé.\n\nCordialement,\n[Votre nom]'
        },
        'podcast-ia': {
            subject: 'Devis Podcast IA Complet - À partir de 500€',
            body: 'Bonjour Nicolas,\n\nJe souhaite un devis pour un podcast IA complet.\n\nCordialement,\n[Votre nom]'
        },
        'automatisation-email': {
            subject: 'Devis Automatisation Email (400-800€)',
            body: 'Bonjour Nicolas,\n\nJe souhaite automatiser ma gestion email.\n\nCordialement,\n[Votre nom]'
        },
        'migration-outils': {
            subject: 'Devis Migration & Intégration (600-1200€)',
            body: 'Bonjour Nicolas,\n\nJe souhaite un devis pour migration et intégration d\'outils.\n\nCordialement,\n[Votre nom]'
        }
    };
    
    const template = templates[type];
    if (template) {
        const mailtoLink = `mailto:contact@n-gage.fr?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
        window.location.href = mailtoLink;
    } else {
        const fallbackLink = 'mailto:contact@n-gage.fr?subject=Demande%20de%20renseignements&body=Bonjour%20Nicolas%2C%0A%0AJe%20vous%20contacte%20concernant%20vos%20services.%0A%0ACordialement%2C';
        window.location.href = fallbackLink;
    }
}