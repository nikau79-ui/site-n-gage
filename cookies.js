// =================================
// GESTIONNAIRE DE COOKIES CENTRALISÉ - VERSION COMPLÈTE
// Fichier : cookies.js
// Auteur : N-Gage
// Date : 2025 - Version Analytics Améliorée avec NotebookLM + Canva
// =================================

(function() {
    'use strict';
    
    // Configuration des cookies et analytics
    const COOKIE_CONFIG = {
        name: 'ngage_cookie_consent',
        duration: 365,
        version: '1.2', // Version mise à jour pour nouvelles formations
        gaId: 'G-D387K5QH0F'
    };
    
    // Configuration Analytics enrichie
    const ANALYTICS_CONFIG = {
        debug: false, // Passer à true en développement
        enhanced_measurement: true,
        custom_map: {
            'custom_parameter_1': 'user_type',
            'custom_parameter_2': 'formation_interest',
            'custom_parameter_3': 'formation_level'
        }
    };
    
    // État des cookies
    let cookiePreferences = {
        essential: true,
        analytics: false,
        marketing: false,
        version: COOKIE_CONFIG.version
    };
    
    let consentGiven = false;
    
    // HTML COMPLET de la bannière et du modal
    const COOKIE_HTML = `
        <div id="cookieBanner" class="cookie-banner">
            <div class="cookie-banner-content">
                <div class="cookie-text">
                    <h4>🍪 Respect de votre vie privée</h4>
                    <p>
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                        Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.
                        <a href="politique-de-confidentialite.html" target="_blank">En savoir plus</a>
                    </p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="CookieManager.acceptAll()">
                        ✅ Tout accepter
                    </button>
                    <button class="cookie-btn cookie-btn-reject" onclick="CookieManager.rejectAll()">
                        ❌ Tout refuser
                    </button>
                    <button class="cookie-btn cookie-btn-settings" onclick="CookieManager.showSettings()">
                        ⚙️ Personnaliser
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Modal des paramètres détaillés -->
        <div id="cookieModal" class="cookie-modal">
            <div class="cookie-modal-content">
                <button class="cookie-close" onclick="CookieManager.hideSettings()">&times;</button>
                <h3>🍪 Paramètres des cookies</h3>
                
                <div class="cookie-category">
                    <h4>
                        Cookies essentiels
                        <div class="cookie-toggle active disabled" title="Requis pour le fonctionnement"></div>
                    </h4>
                    <p><strong>Toujours actifs</strong> - Ces cookies sont nécessaires au fonctionnement du site (navigation, sécurité, formulaires).</p>
                </div>
                
                <div class="cookie-category">
                    <h4>
                        Cookies d'analyse
                        <div id="analyticsToggle" class="cookie-toggle" onclick="CookieManager.toggleCookie('analytics')"></div>
                    </h4>
                    <p>Google Analytics nous aide à comprendre comment vous utilisez notre site pour l'améliorer (pages visitées, durée, parcours).</p>
                </div>
                
                <div class="cookie-category">
                    <h4>
                        Cookies marketing
                        <div id="marketingToggle" class="cookie-toggle" onclick="CookieManager.toggleCookie('marketing')"></div>
                    </h4>
                    <p>Ces cookies nous permettent de personnaliser nos contenus et de mesurer l'efficacité de nos campagnes publicitaires.</p>
                </div>
                
                <div class="cookie-modal-buttons">
                    <button class="cookie-btn cookie-btn-accept" onclick="CookieManager.saveSettings()">
                        ✅ Enregistrer mes choix
                    </button>
                    <button class="cookie-btn cookie-btn-reject" onclick="CookieManager.rejectAll()">
                        ❌ Tout refuser
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Gestionnaire principal des cookies
    window.CookieManager = {
        
        // Initialisation
        init: function() {
            this.loadStoredPreferences();
            this.injectHTML();
            this.updateToggles();
            
            if (!consentGiven) {
                this.showBanner();
            } else {
                this.applyPreferences();
            }
        },
        
        // Injecter le HTML
        injectHTML: function() {
            if (!document.getElementById('cookieBanner')) {
                document.body.insertAdjacentHTML('beforeend', COOKIE_HTML);
            }
        },
        
        // Charger les préférences sauvegardées
        loadStoredPreferences: function() {
            const stored = this.getCookie(COOKIE_CONFIG.name);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed.version === COOKIE_CONFIG.version) {
                        cookiePreferences = { ...cookiePreferences, ...parsed };
                        consentGiven = true;
                    }
                } catch (e) {
                    console.warn('Erreur lecture préférences cookies:', e);
                }
            }
        },
        
        // Afficher la bannière
        showBanner: function() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.style.display = 'flex';
                setTimeout(() => banner.classList.add('show'), 100);
            }
        },
        
        // Masquer la bannière
        hideBanner: function() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.remove('show');
                setTimeout(() => banner.style.display = 'none', 300);
            }
        },
        
        // Afficher les paramètres
        showSettings: function() {
            this.hideBanner();
            const modal = document.getElementById('cookieModal');
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 100);
            }
        },
        
        // Masquer les paramètres
        hideSettings: function() {
            const modal = document.getElementById('cookieModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        },
        
        // Basculer un type de cookie
        toggleCookie: function(type) {
            if (type !== 'essential') {
                cookiePreferences[type] = !cookiePreferences[type];
                this.updateToggles();
            }
        },
        
        // Mettre à jour l'affichage des toggles
        updateToggles: function() {
            const analyticsToggle = document.getElementById('analyticsToggle');
            const marketingToggle = document.getElementById('marketingToggle');
            
            if (analyticsToggle) {
                analyticsToggle.className = cookiePreferences.analytics ? 'cookie-toggle active' : 'cookie-toggle';
            }
            if (marketingToggle) {
                marketingToggle.className = cookiePreferences.marketing ? 'cookie-toggle active' : 'cookie-toggle';
            }
        },
        
        // Accepter tous les cookies
        acceptAll: function() {
            cookiePreferences.analytics = true;
            cookiePreferences.marketing = true;
            this.saveAndApply();
        },
        
        // Refuser tous les cookies (sauf essentiels)
        rejectAll: function() {
            cookiePreferences.analytics = false;
            cookiePreferences.marketing = false;
            this.saveAndApply();
        },
        
        // Sauvegarder les paramètres personnalisés
        saveSettings: function() {
            this.saveAndApply();
            this.hideSettings();
        },
        
        // Sauvegarder et appliquer
        saveAndApply: function() {
            this.setCookie(COOKIE_CONFIG.name, JSON.stringify(cookiePreferences), COOKIE_CONFIG.duration);
            consentGiven = true;
            this.hideBanner();
            this.hideSettings();
            this.applyPreferences();
        },
        
        // Appliquer les préférences
        applyPreferences: function() {
            if (cookiePreferences.analytics) {
                this.loadGoogleAnalytics();
            } else {
                this.removeGoogleAnalytics();
            }
            
            if (cookiePreferences.marketing) {
                this.loadMarketingCookies();
            } else {
                this.removeMarketingCookies();
            }
        },
        
        // =================================
        // NOUVELLE SECTION : GOOGLE ANALYTICS 4 OPTIMISÉ
        // =================================
        
        // Charger Google Analytics avec configuration enrichie
        loadGoogleAnalytics: function() {
            if (!window.gtag && !document.querySelector(`script[src*="${COOKIE_CONFIG.gaId}"]`)) {
                // Chargement du script GA4
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${COOKIE_CONFIG.gaId}`;
                document.head.appendChild(script);
                
                // Initialisation gtag
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                
                gtag('js', new Date());
                gtag('config', COOKIE_CONFIG.gaId, {
                    'anonymize_ip': true,
                    'cookie_expires': 63072000, // 2 ans
                    
                    // Configuration Enhanced E-commerce
                    'send_page_view': true,
                    'enhanced_measurement': {
                        'scrolls': true,
                        'outbound_clicks': true,
                        'file_downloads': true,
                        'video_engagement': true
                    },
                    
                    // Paramètres personnalisés N-Gage
                    'custom_map': ANALYTICS_CONFIG.custom_map,
                    'content_group1': 'formation_ia', // Catégorie principale
                    'content_group2': this.detectUserType(), // Type d'utilisateur
                    
                    // Debug mode si nécessaire
                    'debug_mode': ANALYTICS_CONFIG.debug
                });
                
                // Configuration du consentement (GA4 Consent Mode V2)
                gtag('consent', 'default', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'functionality_storage': 'granted',
                    'security_storage': 'granted'
                });
                
                // Événements personnalisés automatiques
                this.setupCustomEvents();
                
                // Tracking E-commerce pour les formations
                this.setupEcommerceTracking();
                
                console.log('✅ Google Analytics 4 chargé avec événements personnalisés N-Gage');
            }
        },
        
        // Détecter le type d'utilisateur
        detectUserType: function() {
            const url = window.location.pathname;
            const referrer = document.referrer;
            
            if (url.includes('catalogue')) return 'prospect_formation';
            if (url.includes('formation-notebooklm')) return 'prospect_notebooklm';
            if (url.includes('formation-canva')) return 'prospect_canva';
            if (url.includes('apropos')) return 'prospect_service'; 
            if (referrer.includes('linkedin')) return 'prospect_linkedin';
            if (referrer.includes('google')) return 'prospect_seo';
            return 'visiteur_direct';
        },
        
        // Configuration des événements personnalisés N-Gage
        setupCustomEvents: function() {
            // 1. TRACKING DES EMAILS
            document.addEventListener('click', function(e) {
                const target = e.target.closest('a');
                if (target && target.href.includes('mailto:')) {
                    const subject = new URL(target.href).searchParams.get('subject') || 'contact_general';
                    gtag('event', 'email_click', {
                        'event_category': 'contact',
                        'event_label': subject,
                        'custom_parameter_1': CookieManager.detectUserType()
                    });
                }
            });
            
            // 2. SUIVI DES FORMATIONS (E-COMMERCE)
            document.addEventListener('click', function(e) {
                const target = e.target.closest('a, button');
                if (!target) return;
                
                // Détection des clics sur formations
                const formationData = CookieManager.detectFormationClick(target);
                if (formationData) {
                    gtag('event', 'view_item', {
                        'currency': 'EUR',
                        'value': formationData.price,
                        'items': [{
                            'item_id': formationData.id,
                            'item_name': formationData.name,
                            'item_category': 'formation_ia',
                            'item_category2': formationData.level,
                            'price': formationData.price,
                            'quantity': 1
                        }]
                    });
                }
            });
            
            // 3. SCROLL TRACKING PERSONNALISÉ
            let scrollDepths = [25, 50, 75, 90];
            let scrollTracked = [];
            
            window.addEventListener('scroll', function() {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                
                scrollDepths.forEach(depth => {
                    if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
                        scrollTracked.push(depth);
                        gtag('event', 'scroll', {
                            'event_category': 'engagement',
                            'event_label': `scroll_${depth}_percent`,
                            'value': depth
                        });
                    }
                });
            });
            
            // 4. TRACKING TEMPS DE SESSION
            let sessionStart = Date.now();
            window.addEventListener('beforeunload', function() {
                const sessionDuration = Math.round((Date.now() - sessionStart) / 1000);
                gtag('event', 'session_duration', {
                    'event_category': 'engagement',
                    'value': sessionDuration,
                    'custom_parameter_1': CookieManager.detectUserType()
                });
            });
        },
        
        // =================================
        // DÉTECTION DES FORMATIONS (MISE À JOUR 2025)
        // =================================
        
        // Détecter les clics sur formations (avec nouvelles formations)
        detectFormationClick: function(element) {
            const href = element.href || '';
            const text = element.textContent || '';
            
            // Base de données des formations mise à jour
            const formations = {
                'notebooklm': { 
                    id: 'FORM_002', 
                    name: 'Formation NotebookLM - 2h', 
                    price: 200, 
                    level: 'module' 
                },
                'canva': { 
                    id: 'FORM_003', 
                    name: 'Formation Canva 2025', 
                    price: 350, 
                    level: 'module' 
                },
                'découvrir': { 
                    id: 'FORM_001', 
                    name: 'Découvrir l\'IA sans jargon', 
                    price: 200, 
                    level: 'decouverte' 
                },
                'intensive': { 
                    id: 'FORM_004', 
                    name: 'Formation IA Intensive', 
                    price: 600, 
                    level: 'avance' 
                },
                'liberation': { 
                    id: 'PACK_001', 
                    name: 'Pack Libération IA', 
                    price: 990, 
                    level: 'pack' 
                },
                'starter': { 
                    id: 'PACK_002', 
                    name: 'Pack Starter IA Express', 
                    price: 600, 
                    level: 'pack' 
                },
                'créateur': { 
                    id: 'PACK_003', 
                    name: 'Pack Créateur de Contenu', 
                    price: 900, 
                    level: 'pack' 
                },
                'business': { 
                    id: 'PACK_004', 
                    name: 'Pack Business Flow', 
                    price: 1200, 
                    level: 'pack' 
                }
            };
            
            for (const [key, formation] of Object.entries(formations)) {
                if (text.toLowerCase().includes(key) || href.includes(key.replace(' ', '-'))) {
                    return formation;
                }
            }
            
            return null;
        },
        
        // Configuration E-commerce pour les packs/formations
        setupEcommerceTracking: function() {
            // Track des vues de catalogue
            if (window.location.pathname.includes('catalogue')) {
                gtag('event', 'view_item_list', {
                    'item_list_id': 'formations_catalogue',
                    'item_list_name': 'Catalogue Formations IA',
                    'items': [
                        {
                            'item_id': 'FORM_002',
                            'item_name': 'Formation NotebookLM - 2h',
                            'item_category': 'formation_ia',
                            'item_category2': 'module',
                            'item_list_position': 1,
                            'price': 200
                        },
                        {
                            'item_id': 'FORM_003',
                            'item_name': 'Formation Canva 2025',
                            'item_category': 'formation_ia',
                            'item_category2': 'module',
                            'item_list_position': 2,
                            'price': 350
                        },
                        {
                            'item_id': 'PACK_001', 
                            'item_name': 'Pack Libération IA',
                            'item_category': 'formation_ia',
                            'item_category2': 'pack',
                            'item_list_position': 3,
                            'price': 990
                        }
                    ]
                });
            }
            
            // Track des vues de formations spécifiques
            if (window.location.pathname.includes('formation-notebooklm')) {
                gtag('event', 'view_item', {
                    'currency': 'EUR',
                    'value': 200,
                    'items': [{
                        'item_id': 'FORM_002',
                        'item_name': 'Formation NotebookLM - 2h',
                        'item_category': 'formation_ia',
                        'item_category2': 'module',
                        'price': 200,
                        'quantity': 1
                    }]
                });
            }
            
            if (window.location.pathname.includes('formation-canva')) {
                gtag('event', 'view_item', {
                    'currency': 'EUR',
                    'value': 350,
                    'items': [{
                        'item_id': 'FORM_003',
                        'item_name': 'Formation Canva 2025',
                        'item_category': 'formation_ia',
                        'item_category2': 'module',
                        'price': 350,
                        'quantity': 1
                    }]
                });
            }
        },
        
        // Tracking des conversions avancées
        trackConversion: function(type, value = 0, details = {}) {
            const conversionEvents = {
                'audit_scheduled': {
                    'event_name': 'generate_lead',
                    'currency': 'EUR',
                    'value': 25
                },
                'contact_form': {
                    'event_name': 'generate_lead',
                    'currency': 'EUR', 
                    'value': 15
                },
                'phone_call': {
                    'event_name': 'generate_lead',
                    'currency': 'EUR',
                    'value': 20
                },
                'formation_interest': {
                    'event_name': 'begin_checkout',
                    'currency': 'EUR',
                    'value': value
                },
                'notebooklm_interest': {
                    'event_name': 'begin_checkout',
                    'currency': 'EUR',
                    'value': 200
                },
                'canva_interest': {
                    'event_name': 'begin_checkout',
                    'currency': 'EUR',
                    'value': 350
                }
            };
            
            const event = conversionEvents[type];
            if (event && window.gtag) {
                gtag('event', event.event_name, {
                    ...event,
                    ...details,
                    'custom_parameter_1': this.detectUserType()
                });
            }
        },
        
        // =================================
        // FIN DES NOUVELLES FONCTIONS ANALYTICS
        // =================================
        
        // Supprimer Google Analytics
        removeGoogleAnalytics: function() {
            const gaCookies = ['_ga', '_ga_*', '_gid', '_gat', '_gat_*'];
            gaCookies.forEach(cookieName => {
                if (cookieName.includes('*')) {
                    document.cookie.split(';').forEach(cookie => {
                        const name = cookie.split('=')[0].trim();
                        if (name.startsWith(cookieName.replace('*', ''))) {
                            this.deleteCookie(name);
                        }
                    });
                } else {
                    this.deleteCookie(cookieName);
                }
            });
            
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
            
            console.log('❌ Google Analytics supprimé');
        },
        
        // Charger les cookies marketing
        loadMarketingCookies: function() {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
            }
            console.log('✅ Cookies marketing activés');
        },
        
        // Supprimer les cookies marketing
        removeMarketingCookies: function() {
            const marketingCookies = ['_fbp', '_fbc', 'fr'];
            marketingCookies.forEach(cookie => this.deleteCookie(cookie));
            
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                });
            }
            console.log('❌ Cookies marketing supprimés');
        },
        
        // Utilitaires cookies
        setCookie: function(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        },
        
        getCookie: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        
        deleteCookie: function(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        }
    };
    
    // =================================
    // FONCTION GLOBALE POUR GÉRER LES COOKIES
    // =================================
    window.manageCookies = function() {
        CookieManager.showSettings();
    };
    
    // =================================
    // INITIALISATION AUTOMATIQUE
    // =================================
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CookieManager.init());
    } else {
        CookieManager.init();
    }

})();

// =================================
// FONCTIONS UTILITAIRES POUR LES PAGES
// =================================

// Fonction de tracking spécifique NotebookLM
function trackNotebookLMInterest(action = 'page_view') {
    if (window.gtag && window.CookieManager) {
        if (action === 'contact') {
            CookieManager.trackConversion('notebooklm_interest', 200, {
                'formation_type': 'notebooklm',
                'event_label': 'contact_notebooklm'
            });
        }
        
        gtag('event', action, {
            'event_category': 'formation_notebooklm',
            'event_label': 'notebooklm_2h',
            'custom_parameter_2': 'notebooklm_interest',
            'custom_parameter_3': 'module'
        });
    }
}

// Fonction de tracking spécifique Canva
function trackCanvaInterest(action = 'page_view') {
    if (window.gtag && window.CookieManager) {
        if (action === 'contact') {
            CookieManager.trackConversion('canva_interest', 350, {
                'formation_type': 'canva',
                'event_label': 'contact_canva'
            });
        }
        
        gtag('event', action, {
            'event_category': 'formation_canva',
            'event_label': 'canva_2025',
            'custom_parameter_2': 'canva_interest',
            'custom_parameter_3': 'module'
        });
    }
}

// Auto-tracking pour les pages de formation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('formation-notebooklm')) {
        trackNotebookLMInterest('page_view');
    } else if (currentPage.includes('formation-canva')) {
        trackCanvaInterest('page_view');
    }
});