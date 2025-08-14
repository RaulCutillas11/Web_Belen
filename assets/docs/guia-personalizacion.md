# Guía de Personalización - Página Web de Belén

## 🎨 Personalización Básica

### 1. Información Personal

**Archivo**: `index.html`

#### Sección Hero (Inicio)
```html
<!-- Cambiar nombre y descripción -->
<h1 class="hero-title">¡Hola! Soy <span class="highlight">TU_NOMBRE</span></h1>
<p class="hero-subtitle">Tu profesión o descripción breve</p>
<p class="hero-description">
    Descripción más detallada sobre ti y lo que haces.
</p>
```

#### Sección Sobre Mí
```html
<!-- Personalizar información personal -->
<h3>¡Hola de nuevo!</h3>
<p>
    Soy [TU_NOMBRE], y me encanta [tu profesión/pasión aquí]. 
    Con experiencia en [tu área], me dedico a [descripción].
</p>
```

#### Habilidades
```html
<div class="skill-tags">
    <span class="skill-tag">Tu Habilidad 1</span>
    <span class="skill-tag">Tu Habilidad 2</span>
    <span class="skill-tag">Tu Habilidad 3</span>
    <!-- Añadir más habilidades -->
</div>
```

### 2. Servicios

**Archivo**: `index.html` - Sección Services

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-tu-icono"></i> <!-- Cambiar icono -->
    </div>
    <h3 class="service-title">Nombre del Servicio</h3>
    <p class="service-description">
        Descripción detallada de tu servicio.
    </p>
</div>
```

**Iconos disponibles** (Font Awesome):
- `fa-laptop-code` - Desarrollo web
- `fa-paint-brush` - Diseño
- `fa-camera` - Fotografía
- `fa-pen-fancy` - Escritura
- `fa-chart-line` - Marketing
- `fa-graduation-cap` - Educación

### 3. Portfolio/Proyectos

```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <img src="assets/images/tu-proyecto.jpg" alt="Tu Proyecto">
        <div class="portfolio-overlay">
            <h3>Nombre del Proyecto</h3>
            <p>Descripción breve del proyecto</p>
            <a href="URL_DEL_PROYECTO" class="portfolio-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
</div>
```

### 4. Información de Contacto

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>tu-email@ejemplo.com</span>
</div>
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <span>+34 123 456 789</span>
</div>
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>Tu Ciudad, País</span>
</div>
```

## 🎨 Personalización de Colores

**Archivo**: `assets/css/styles.css`

### Cambiar Colores Principales
```css
:root {
    --primary-color: #667eea;     /* Color principal */
    --secondary-color: #764ba2;   /* Color secundario */
    --accent-color: #f093fb;      /* Color de acento */
}
```

### Sugerencias de Paletas de Colores

#### Paleta Azul Profesional
```css
--primary-color: #2196F3;
--secondary-color: #1976D2;
--accent-color: #03DAC6;
```

#### Paleta Verde Natura
```css
--primary-color: #4CAF50;
--secondary-color: #388E3C;
--accent-color: #8BC34A;
```

#### Paleta Morada Creativa
```css
--primary-color: #9C27B0;
--secondary-color: #7B1FA2;
--accent-color: #E1BEE7;
```

#### Paleta Rosa Elegante
```css
--primary-color: #E91E63;
--secondary-color: #C2185B;
--accent-color: #F8BBD9;
```

## 📷 Gestión de Imágenes

### Tamaños Recomendados

- **Hero Image**: 800x600px
- **About Image**: 600x400px
- **Portfolio Images**: 400x300px
- **Favicon**: 32x32px

### Optimización de Imágenes

1. **Formato**: Usa JPG para fotografías, PNG para gráficos
2. **Compresión**: Herramientas recomendadas:
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)
   - [Squoosh](https://squoosh.app/)

### Nombres de Archivos
```
assets/images/
├── hero-image.jpg      # Imagen principal
├── about-image.jpg     # Tu foto personal
├── project1.jpg        # Proyecto 1
├── project2.jpg        # Proyecto 2
├── project3.jpg        # Proyecto 3
└── favicon.ico         # Icono del sitio
```

## 🔤 Tipografía

### Cambiar Fuente Principal
```css
/* En el <head> del HTML */
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@300;400;500;600;700&display=swap" rel="stylesheet">

/* En CSS */
body {
    font-family: 'TU_FUENTE', sans-serif;
}
```

### Fuentes Recomendadas
- **Inter**: Moderna y legible
- **Poppins**: Amigable y versátil
- **Roboto**: Profesional y limpia
- **Open Sans**: Clásica y confiable

## 📱 Responsive Design

### Puntos de Ruptura
```css
/* Móvil */
@media (max-width: 768px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Desktop pequeño */
@media (max-width: 1200px) { }
```

## 🚀 Funcionalidades Avanzadas

### 1. Integrar EmailJS para Formulario

1. Registrarse en [EmailJS](https://www.emailjs.com/)
2. Crear un servicio de correo
3. Añadir el script:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Configurar en JavaScript:
```javascript
// En script.js, reemplazar la función handleFormSubmission
function handleFormSubmission(e) {
    e.preventDefault();
    
    emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value,
    }, 'TU_PUBLIC_KEY')
    .then(() => {
        showNotification('¡Mensaje enviado correctamente!', 'success');
        contactForm.reset();
    })
    .catch(() => {
        showNotification('Error al enviar el mensaje.', 'error');
    });
}
```

### 2. Añadir Google Analytics

```html
<!-- En el <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_TRACKING_ID');
</script>
```

### 3. Añadir más Secciones

#### Blog Section
```html
<section id="blog" class="blog">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Mi Blog</h2>
            <p class="section-subtitle">Artículos y reflexiones</p>
        </div>
        
        <div class="blog-grid">
            <!-- Artículos del blog -->
        </div>
    </div>
</section>
```

#### Testimonios
```html
<section id="testimonios" class="testimonials">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Testimonios</h2>
        </div>
        
        <div class="testimonial-slider">
            <!-- Testimonios de clientes -->
        </div>
    </div>
</section>
```

## 🔧 Herramientas de Desarrollo

### Editores Recomendados
- **Visual Studio Code** (Gratuito)
- **Sublime Text**
- **Atom**

### Extensiones de VS Code
- **Live Server**: Para desarrollo local
- **Prettier**: Formateo de código
- **Auto Rename Tag**: Para HTML
- **IntelliSense for CSS**: Autocompletado CSS

### Navegadores para Pruebas
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

## 📤 Deployment (Publicación)

### Opciones Gratuitas
1. **GitHub Pages**
2. **Netlify**
3. **Vercel**
4. **Firebase Hosting**

### Pasos básicos para Netlify
1. Crear cuenta en Netlify
2. Arrastrar la carpeta del proyecto
3. ¡Tu sitio estará online!

## 🎯 SEO Básico

### Meta Tags Importantes
```html
<meta name="description" content="Descripción de tu sitio">
<meta name="keywords" content="palabra1, palabra2, palabra3">
<meta name="author" content="Tu Nombre">

<!-- Open Graph para redes sociales -->
<meta property="og:title" content="Título de tu página">
<meta property="og:description" content="Descripción">
<meta property="og:image" content="URL de imagen">
<meta property="og:url" content="URL de tu sitio">
```

---

¡Con esta guía podrás personalizar completamente tu página web! 🎉
