// ===== VARIABLES GLOBALES =====
let navbar, navMenu, hamburger, navLinks, contactForm;

// ===== SCROLL AL INICIO AL CARGAR LA PÁGINA =====
window.addEventListener('beforeunload', function() {
    // Guardar la posición de scroll antes de recargar
    sessionStorage.setItem('scrollPosition', '0');
});

window.addEventListener('load', function() {
    // Forzar scroll al inicio cuando se carga/recarga la página
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
});

// Inicializar elementos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Forzar scroll al inicio también en DOMContentLoaded
    window.scrollTo(0, 0);
    
    // Inicializar variables globales
    navbar = document.querySelector('.navbar');
    navMenu = document.querySelector('.nav-menu');
    hamburger = document.querySelector('.hamburger');
    navLinks = document.querySelectorAll('.nav-link');
    contactForm = document.querySelector('.contact-form');
    
    // Verificar que los elementos principales existen
    if (!navbar || !navMenu || !hamburger || !navLinks.length) {
        console.warn('⚠️ Algunos elementos principales no se encontraron');
    }
    
    // Inicializar funcionalidades
    initMobileMenu();
    initScrollEffects();
    initFormHandler();
    initAnimations();
    initCookieConsent();
    
    console.log('🌟 Página web de Belén cargada correctamente');
});

// ===== NAVEGACIÓN MÓVIL =====
function initMobileMenu() {
    if (!hamburger || !navMenu) return;
    
    // Event listener para el botón hamburguesa
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú móvil al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Cerrar menú móvil al hacer click fuera de él
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (!navMenu || !hamburger) return;
    
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (!navMenu || !hamburger) return;
    
    navMenu.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Agregar clase para animación de entrada
    setTimeout(() => {
        navMenu.classList.add('menu-visible');
    }, 10);
}

function closeMobileMenu() {
    if (!navMenu || !hamburger) return;
    
    navMenu.classList.remove('active', 'menu-visible');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL NAVBAR =====
function initScrollEffects() {
    if (!navbar) return;
    
    // Throttle para mejor performance
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarUpdate);
    
    // Navegación activa
    window.addEventListener('scroll', throttle(updateActiveNavLink, 50));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
                
                // Si es un enlace de navegación, marcarlo como activo
                if (link.classList.contains('nav-link')) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
                
                // Hacer el scroll
                smoothScrollTo(href);
            }
        }
    });
}

function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Altura del navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== FORMULARIO DE CONTACTO =====
function initFormHandler() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!contactForm) return;
    
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const asunto = formData.get('asunto');
    const mensaje = formData.get('mensaje');
    
    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
        showNotification('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return;
    }
    
    // Simular envío del formulario
    showNotification('Enviando mensaje...', 'info');
    
    // Aquí podrías integrar con un servicio de correo como EmailJS, Formspree, etc.
    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
        contactForm.reset();
    }, 2000);
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Inicializar smooth scroll
    initSmoothScroll();
    
    // Cargar preferencias
    loadDarkModePreference();
    
    // Añadir estilos de animación
    addScrollAnimationStyles();
    
    // Ejecutar animaciones iniciales para elementos ya visibles
    handleScrollAnimations();
    
    // Inicializar navegación activa
    updateActiveNavLink();
}
function showNotification(message, type = 'info') {
    // Remover notificación existente si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Añadir estilos CSS dinámicamente si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                color: white;
                font-weight: 500;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #28a745, #20c997);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #dc3545, #e74c3c);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #17a2b8, #6f42c1);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-cerrar después de 5 segundos
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Event listener para cerrar manualmente
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== NAVEGACIÓN ACTIVA =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Si no hay secciones con id, salir silenciosamente
    if (!sections || sections.length === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        return;
    }
    
    let currentSection = '';
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Si estamos en la parte superior de la página, marcar "inicio"
    if (scrollPosition < 100) {
        currentSection = 'inicio';
    }
    // Si estamos cerca del final de la página, marcar la última sección
    else if ((windowHeight + scrollPosition) >= document.body.offsetHeight - 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            currentSection = lastSection.getAttribute('id');
        }
    }
    // Lógica principal de detección
    else {
        let foundSection = false;
        
        // Recorrer las secciones para encontrar cuál está más visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Calcular qué porcentaje de la sección está visible
            const sectionBottom = sectionTop + sectionHeight;
            const viewportTop = scrollPosition + 100; // Offset del header
            const viewportBottom = scrollPosition + windowHeight;
            
            // Si la sección está en el viewport
            if (sectionBottom > viewportTop && sectionTop < viewportBottom) {
                // Calcular cuánto de la sección está visible
                const visibleStart = Math.max(sectionTop, viewportTop);
                const visibleEnd = Math.min(sectionBottom, viewportBottom);
                const visibleHeight = visibleEnd - visibleStart;
                const visibilityRatio = visibleHeight / windowHeight;
                
                // Si más del 30% de la viewport está ocupada por esta sección, marcarla como activa
                if (visibilityRatio > 0.3 || (visibleStart <= viewportTop + 200)) {
                    currentSection = sectionId;
                    foundSection = true;
                }
            }
        });
        
        // Si no encontramos ninguna sección predominante, usar lógica simple
        if (!foundSection) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition + 200 >= sectionTop && scrollPosition + 200 < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
        }
    }
    
    // Actualizar enlaces de navegación
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .session-card, .pricing-card, .review-card, .specialty-category, .portfolio-item, .about-text, .about-image');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 100; // Reducido para activar antes
        
        // Elemento entra en viewport
        if (elementTop < window.innerHeight - elementVisible && elementBottom > 0) {
            if (!element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
            }
        }
        // Opcional: remover animación cuando sale del viewport (efecto de re-animación)
        // else if (elementTop > window.innerHeight || elementBottom < 0) {
        //     element.classList.remove('animate-in');
        // }
    });
}

// Añadir estilos para las animaciones
function addScrollAnimationStyles() {
    if (!document.querySelector('#scroll-animation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'scroll-animation-styles';
        styles.textContent = `
            .service-card,
            .session-card,
            .pricing-card,
            .review-card,
            .specialty-category,
            .portfolio-item,
            .about-text,
            .about-image {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .service-card.animate-in,
            .session-card.animate-in,
            .pricing-card.animate-in,
            .review-card.animate-in,
            .specialty-category.animate-in,
            .portfolio-item.animate-in,
            .about-text.animate-in,
            .about-image.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Efectos especiales para diferentes tipos de cards */
            .pricing-card {
                transform: translateY(40px) scale(0.95);
                transition: all 0.15s ease-out;
            }
            
            .pricing-card.animate-in {
                transform: translateY(0) scale(1);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .review-card {
                transform: translateX(-30px) translateY(20px);
                opacity: 0;
            }
            
            .review-card.animate-in {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            
            /* Especialidades con efecto de rotación sutil */
            .specialty-category {
                transform: translateY(30px) rotateX(15deg);
                opacity: 0;
                transform-origin: center bottom;
            }
            
            .specialty-category.animate-in {
                transform: translateY(0) rotateX(0deg);
                opacity: 1;
            }
            
            /* Delay para crear efecto escalonado en servicios */
            .service-card:nth-child(1) {
                transition-delay: 0s;
            }
            
            .service-card:nth-child(2) {
                transition-delay: 0.15s;
            }
            
            .service-card:nth-child(3) {
                transition-delay: 0.3s;
            }
            
            /* Delay para session cards */
            .session-card:nth-child(1) {
                transition-delay: 0s;
            }
            
            .session-card:nth-child(2) {
                transition-delay: 0.1s;
            }
            
            .session-card:nth-child(3) {
                transition-delay: 0.2s;
            }
            
            .session-card:nth-child(4) {
                transition-delay: 0.3s;
            }
            
            /* Delay para pricing cards */
            .pricing-card:nth-child(1) {
                transition-delay: 0.1s;
            }
            
            .pricing-card:nth-child(2) {
                transition-delay: 0.3s;
            }
            
            /* Delay para review cards */
            .review-card:nth-child(1) {
                transition-delay: 0s;
            }
            
            .review-card:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .review-card:nth-child(3) {
                transition-delay: 0.4s;
            }
            
            /* Delay para specialty categories */
            .specialty-category:nth-child(1) {
                transition-delay: 0s;
            }
            
            .specialty-category:nth-child(2) {
                transition-delay: 0.12s;
            }
            
            .specialty-category:nth-child(3) {
                transition-delay: 0.24s;
            }
            
            .specialty-category:nth-child(4) {
                transition-delay: 0.36s;
            }
            
            .specialty-category:nth-child(5) {
                transition-delay: 0.48s;
            }
            
            /* Portfolio items */
            .portfolio-item:nth-child(2) {
                transition-delay: 0.15s;
            }
            
            .portfolio-item:nth-child(3) {
                transition-delay: 0.3s;
            }
            
            /* Hover effects para mejorar la interactividad */
            .service-card.animate-in:hover,
            .session-card.animate-in:hover,
            .specialty-category.animate-in:hover {
                transform: translateY(-5px) scale(1.02);
                transition: all 0.3s ease;
            }
            
            .pricing-card.animate-in:hover {
                transform: translateY(-5px) scale(1.05);
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Transición rápida de vuelta para pricing cards */
            .pricing-card.animate-in {
                transition: all 0.15s ease-out;
            }
            
            .review-card.animate-in:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
            }
            
            /* Efecto especial hover para especialidades */
            .specialty-category.animate-in:hover {
                transform: translateY(-8px) scale(1.03);
                box-shadow: 0 10px 30px rgba(214, 157, 254, 0.2);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(styles);
    }
}

// Event listener para animaciones de scroll
window.addEventListener('scroll', handleScrollAnimations);

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Usar throttle para navegación activa para mejor respuesta
const throttledUpdateActiveNav = throttle(updateActiveNavLink, 50);
window.addEventListener('scroll', throttledUpdateActiveNav);

// Optimizar el scroll con debounce
const debouncedScrollAnimations = debounce(handleScrollAnimations, 10);
window.addEventListener('scroll', debouncedScrollAnimations);

// ===== TEMA OSCURO (OPCIONAL) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Cargar preferencias
    loadDarkModePreference();
    
    // Añadir estilos de animación
    addScrollAnimationStyles();
    
    // Ejecutar animaciones iniciales para elementos ya visibles
    handleScrollAnimations();
    
    // Inicializar navegación activa
    updateActiveNavLink();
    
    console.log('🌟 Página web de Belén cargada correctamente');
});

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    // Ignorar errores de carga de recursos (imágenes, fuentes, scripts externos)
    const isResourceError = e && e.target && (e.target.src || e.target.href);
    const isJsError = e && e.error instanceof Error;
    if (!isJsError || isResourceError) return;
    console.error('Error JS en la página:', e.error);
    showNotification('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
});

// Capturar promesas no manejadas
window.addEventListener('unhandledrejection', function(e) {
    if (!e || !(e.reason instanceof Error)) return;
    console.error('Promesa no manejada:', e.reason);
    showNotification('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Asegurar scroll al inicio después de que todo esté cargado
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 100);
    
    // Medir tiempo de carga
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Página cargada en ${loadTime}ms`);
    
    // Si la carga es lenta, mostrar mensaje
    if (loadTime > 3000) {
        showNotification('La página tardó un poco en cargar. Considera optimizar las imágenes.', 'info');
    }
});

// ===== ACCESIBILIDAD =====
// Navegación por teclado mejorada
document.addEventListener('keydown', function(e) {
    // Escape para cerrar menú móvil
    if (e.key === 'Escape' && navMenu && navMenu.classList && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Enter para activar elementos con role="button"
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.getAttribute('role') === 'button') {
            focusedElement.click();
        }
    }
});

// ===== INTEGRACIÓN CON REDES SOCIALES (OPCIONAL) =====
function shareOnSocialMedia(platform, url = window.location.href, text = 'Visita mi página web') {
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        default:
            console.warn('Plataforma de redes sociales no soportada:', platform);
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ===== MODALES PARA INFORMACIÓN ADICIONAL =====
function openFormationModal() {
    const modalContent = `
        <div class="modal-content">
            <h3><i class="fas fa-graduation-cap"></i> Mi Formación</h3>
            <div class="formation-list">
                <div class="formation-item">
                    <h4>Grado en Psicología</h4>
                    <p>Universidad de Murcia</p>
                </div>
                <div class="formation-item">
                    <h4>Máster en Psicología General Sanitaria</h4>
                    <p>Universidad Europea de Valencia</p>
                </div>
                <div class="formation-item">
                    <h4>Curso Experto Universitario en intervención multidisciplinar para trastornos alimentarios</h4>
                    <p>Universidad de Valencia</p>
                </div>
                <div class="formation-item">
                    <h4>Psicoterapia Integradora para el Tratamiento del Trauma</h4>
                    <p>Escuela Eva Molero</p>
                </div>
                <div class="formation-item">
                    <h4>Trastornos de la conducta alimentaria en la práctica clínica</h4>
                    <p>Universidad de Murcia</p>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

function openSpecialtyModal(specialty) {
    let modalContent = '';
    
    switch(specialty) {
        case 'alimentacion':
            modalContent = `
                <div class="modal-content">
                    <h3><i class="fas fa-utensils"></i> Problemas con la alimentación</h3>
                    <p>Especializada en el tratamiento de trastornos de la conducta alimentaria con un enfoque integral y personalizado.</p>
                    <ul>
                        <li><strong>Atracones:</strong> Episodios de ingesta descontrolada</li>
                        <li><strong>Relación con la comida:</strong> Mejora tu relación saludable con la alimentación</li>
                        <li><strong>Anorexia nerviosa:</strong> Tratamiento especializado y comprensivo</li>
                        <li><strong>Bulímia nerviosa:</strong> Apoyo en el proceso de recuperación</li>
                        <li><strong>Otros TCA:</strong> Trastorno por evitación/restricción, etc.</li>
                    </ul>
                </div>
            `;
            break;
        case 'ansiedad':
            modalContent = `
                <div class="modal-content">
                    <h3><i class="fas fa-brain"></i> Problemas de ansiedad</h3>
                    <p>Tratamiento especializado para diversos tipos de ansiedad con técnicas cognitivo-conductuales efectivas.</p>
                    <ul>
                        <li><strong>Ansiedad generalizada:</strong> Preocupación excesiva y persistente</li>
                        <li><strong>Ansiedad social:</strong> Miedo a situaciones sociales</li>
                        <li><strong>TOC:</strong> Pensamientos obsesivos y comportamientos compulsivos</li>
                        <li><strong>Fobias específicas:</strong> Miedos irracionales a objetos o situaciones</li>
                        <li><strong>Agorafobia:</strong> Miedo a espacios abiertos o situaciones de escape</li>
                        <li><strong>Trastorno de pánico:</strong> Ataques de pánico recurrentes</li>
                    </ul>
                </div>
            `;
            break;
        case 'animo':
            modalContent = `
                <div class="modal-content">
                    <h3><i class="fas fa-heart-broken"></i> Problemas del estado de ánimo</h3>
                    <p>Apoyo profesional para superar la depresión y mejorar tu bienestar emocional.</p>
                    <ul>
                        <li><strong>Depresión:</strong> Tristeza persistente y pérdida de interés</li>
                        <li><strong>Tristeza prolongada:</strong> Estados de ánimo bajo duraderos</li>
                        <li><strong>Desmotivación:</strong> Falta de energía y motivación</li>
                        <li><strong>Pérdida de interés:</strong> Anhedonia y apatía</li>
                    </ul>
                </div>
            `;
            break;
        case 'autoestima':
            modalContent = `
                <div class="modal-content">
                    <h3><i class="fas fa-star"></i> Autoestima</h3>
                    <p>Trabajo en el desarrollo de una autoestima saludable y el fortalecimiento personal.</p>
                    <ul>
                        <li><strong>Inseguridad:</strong> Fortalecimiento de la confianza personal</li>
                        <li><strong>Imagen corporal:</strong> Mejora de la percepción de ti misma</li>
                        <li><strong>Autocuidado:</strong> Desarrollo de hábitos saludables</li>
                        <li><strong>Límites y asertividad:</strong> Aprender a decir no y expresarte</li>
                        <li><strong>Autoexigencia:</strong> Manejo del perfeccionismo</li>
                    </ul>
                </div>
            `;
            break;
        case 'comunicacion':
            modalContent = `
                <div class="modal-content">
                    <h3><i class="fas fa-comments"></i> Comunicación</h3>
                    <p>Desarrollo de habilidades sociales y de comunicación efectiva.</p>
                    <ul>
                        <li><strong>Habilidades sociales:</strong> Mejora en las relaciones interpersonales</li>
                        <li><strong>Resolución de conflictos:</strong> Estrategias para manejar desacuerdos</li>
                        <li><strong>Solución de problemas:</strong> Técnicas estructuradas de resolución</li>
                        <li><strong>Asertividad:</strong> Comunicación clara y respetuosa</li>
                    </ul>
                </div>
            `;
            break;
    }
    
    showModal(modalContent);
}

function showModal(content) {
    // Crear modal si no existe
    let modal = document.getElementById('info-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'info-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        // Añadir estilos del modal
        addModalStyles();
    }
    
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()">
            <div class="modal-dialog" onclick="event.stopPropagation()">
                ${content}
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function addModalStyles() {
    if (!document.getElementById('modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(8px);
            }
            
            .modal.show {
                opacity: 1;
            }
            
            .modal-backdrop {
                background: rgba(0, 0, 0, 0.4);
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                overflow-y: auto;
                box-sizing: border-box;
            }
            
            .modal-dialog {
                background: white;
                border-radius: 10px;
                padding: 30px;
                max-width: 850px;
                width: 100%;
                max-height: 85vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                transform: scale(0.95);
                transition: transform 0.3s ease;
                margin: auto;
                box-sizing: border-box;
            }
            
            .modal.show .modal-dialog {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: #f5f5f5;
                color: #333;
            }
            
            .modal-content h3 {
                color: var(--primary-color);
                margin-bottom: 30px;
                font-size: 1.8rem;
                font-weight: 600;
                text-align: left;
                border-bottom: 2px solid #f0f0f0;
                padding-bottom: 15px;
            }
            
            .modal-content h3 i {
                margin-right: 10px;
            }
            
            .formation-list {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;
                margin-bottom: 35px;
            }
            
            .formation-item {
                margin-bottom: 0;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 8px;
                border-left: 3px solid var(--primary-color);
                transition: all 0.2s ease;
            }
            
            .formation-item:hover {
                background: #f5f5f5;
            }
            
            .formation-item h4 {
                color: var(--text-color);
                margin-bottom: 8px;
                font-size: 1.1rem;
                font-weight: 600;
                line-height: 1.3;
            }
            
            .formation-item p {
                color: var(--text-light);
                font-style: italic;
                font-size: 0.95rem;
                margin: 0;
            }
            
            .methodology-section {
                border-top: 2px solid #f0f0f0;
                padding-top: 25px;
                margin-top: 30px;
            }
            
            .methodology-section h4 {
                color: var(--secondary-color);
                margin-bottom: 15px;
                font-size: 1.3rem;
                font-weight: 600;
            }
            
            .methodology-section h4 i {
                margin-right: 8px;
            }
            
            .methodology-section p {
                font-size: 1rem;
                line-height: 1.6;
                color: var(--text-light);
                margin: 0;
            }
            
            .modal-content ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-content ul li {
                padding: 8px 0;
                border-bottom: 1px solid #f0f0f0;
                color: var(--text-light);
                position: relative;
                padding-left: 15px;
            }
            
            .modal-content ul li:before {
                content: '•';
                position: absolute;
                left: 0;
                color: var(--primary-color);
                font-weight: bold;
            }
            
            .modal-content ul li:last-child {
                border-bottom: none;
            }
            
            .modal-content ul li strong {
                color: var(--text-color);
            }
            
            @media (max-width: 768px) {
                .modal-backdrop {
                    padding: 10px;
                    align-items: flex-start;
                    padding-top: 20px;
                }
                
                .modal-dialog {
                    padding: 20px;
                    margin: 0;
                    max-width: 100%;
                    width: calc(100% - 20px);
                    max-height: calc(100vh - 40px);
                    border-radius: 8px;
                }
                
                .modal-content h3 {
                    font-size: 1.4rem;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                }
                
                .formation-list {
                    grid-template-columns: 1fr;
                    gap: 15px;
                    margin-bottom: 25px;
                }
                
                .formation-item {
                    padding: 15px;
                }
                
                .formation-item h4 {
                    font-size: 1rem;
                    line-height: 1.2;
                }
                
                .formation-item p {
                    font-size: 0.9rem;
                }
                
                .methodology-section h4 {
                    font-size: 1.2rem;
                }
                
                .methodology-section p {
                    font-size: 0.95rem;
                }
                
                .modal-close {
                    top: 10px;
                    right: 10px;
                    font-size: 1.3rem;
                }
            }
            
            @media (max-width: 480px) {
                .modal-backdrop {
                    padding: 5px;
                    padding-top: 15px;
                }
                
                .modal-dialog {
                    padding: 15px;
                    width: calc(100% - 10px);
                    max-height: calc(100vh - 30px);
                    border-radius: 6px;
                }
                
                .modal-content h3 {
                    font-size: 1.3rem;
                    margin-bottom: 15px;
                }
                
                .formation-item {
                    padding: 12px;
                }
                
                .formation-item h4 {
                    font-size: 0.95rem;
                }
                
                .formation-item p {
                    font-size: 0.85rem;
                }
                
                .modal-content ul li {
                    padding: 6px 0;
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Exportar funciones para uso global (seguro si no existe previamente)
try {
    const existingBel = (typeof window['belénWebsite'] === 'object' && window['belénWebsite'] !== null)
        ? window['belénWebsite']
        : {};
    window['belénWebsite'] = {
        ...existingBel,
        openFormationModal,
        openSpecialtyModal,
        closeModal
    };
} catch (e) {
    window['belénWebsite'] = {
        openFormationModal,
        openSpecialtyModal,
        closeModal
    };
}

// ===== COOKIES CONSENT =====
function initCookieConsent() {
    try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            createCookieBanner();
            // Mostrar tras breve delay para evitar flashes durante render inicial
            setTimeout(() => showCookieBanner(), 150);
        }
    } catch (e) {
        console.warn('No se pudo leer el consentimiento de cookies:', e);
        createCookieBanner();
        setTimeout(() => showCookieBanner(), 150);
    }
}

function createCookieBanner() {
    if (document.getElementById('cookie-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <div class="cookie-text">
                <i class="fas fa-cookie-bite" aria-hidden="true"></i>
                <p>Usamos cookies propias con fines técnicos para asegurar el correcto funcionamiento del sitio. Puedes aceptar o rechazar su uso. Más información en nuestra <a href="cookies.html" class="cookie-link">Política de Cookies</a>.</p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn cookie-decline" aria-label="Rechazar cookies" onclick="rejectCookies()">Rechazar</button>
                <button class="cookie-btn cookie-accept" aria-label="Aceptar cookies" onclick="acceptCookies()">Aceptar todas</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);
}

function showCookieBanner() {
    createCookieBanner();
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    requestAnimationFrame(() => {
        banner.classList.add('show');
    });
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.classList.remove('show');
    setTimeout(() => {
        if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    }, 300);
}

function acceptCookies() {
    try { localStorage.setItem('cookieConsent', 'accepted'); } catch (_) {}
    hideCookieBanner();
    document.dispatchEvent(new CustomEvent('cookies:consent', { detail: { status: 'accepted' } }));
}

function rejectCookies() {
    try { localStorage.setItem('cookieConsent', 'rejected'); } catch (_) {}
    hideCookieBanner();
    document.dispatchEvent(new CustomEvent('cookies:consent', { detail: { status: 'rejected' } }));
}

function getCookieConsentStatus() {
    try { return localStorage.getItem('cookieConsent'); } catch (_) { return null; }
}

// API sencilla en window para gestionar desde otras páginas/botones
window.showCookieBanner = showCookieBanner;
window.getCookieConsentStatus = getCookieConsentStatus;
