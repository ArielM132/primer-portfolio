document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SCROLL ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. CONFIGURACIÓN GSAP ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 3. LÓGICA DEL HEADER ---
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;
    let isNavigating = false;

    gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

    window.addEventListener("wheel", () => { isNavigating = false; });
    window.addEventListener("touchstart", () => { isNavigating = false; });

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (isNavigating) {
            lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            gsap.to(header, { y: "-100%", duration: 1, ease: "power2.out" });
        } else {
            gsap.to(header, { y: "0%", duration: 1, ease: "power2.out" });
        }
        lastScrollY = currentScrollY;
    });
 // --- 4. NAVEGACIÓN CENTRADA CON EXCEPCIÓN ---
document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const id = this.getAttribute('href');

        if (id === '#' || id === '' || id === '#home') {
            isNavigating = true;
            gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" });
            
            lenis.scrollTo(0, { 
                duration: 1.5,
                onComplete: () => {
                    setTimeout(() => { isNavigating = false; }, 100);
                }
            });
            return; 
        }

        const targetElement = document.querySelector(id);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offset = elementPosition - (window.innerHeight / 2) + (targetElement.offsetHeight / 2);

            if (id === '#influencias') {
                isNavigating = true; 
                gsap.to(header, { y: "-100%", duration: 0.4, ease: "power2.inOut" });
            } else {
                isNavigating = true; 
                gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" });
            }

            lenis.scrollTo(offset, {
                duration: 1.5,
                ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                onComplete: () => {
                    setTimeout(() => { isNavigating = false; }, 100);
                }
            });
        }
    });
});
    // --- 5. ANIMACIONES HERO ---
    const tl = gsap.timeline();
    tl.to(".profile-img", { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" })
      .to(".text h1", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .to(".text p", { opacity: 1, y: 0, duration: 1 }, "-=0.8");

    // --- 6. REVEAL DE SECCIONES ---
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        const items = section.querySelectorAll('.project-item');
        if (items.length > 0) {
            gsap.to(items, {
                scrollTrigger: { 
                    trigger: section, 
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        }

        const hr = section.querySelector('hr');
        if (hr) {
            gsap.to(hr, {
                scrollTrigger: {
                    trigger: section,
                    start: section.id === 'home' ? "top 100%" : "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse"
                },
                width: "100%",
                duration: 1,
                ease: "expo.out"
            });
        }
    });

    // --- 7. SALUDO DINÁMICO ---
    const mensajeBienvenida = document.querySelector(".subtitle strong");
    if (mensajeBienvenida) {
        const hora = new Date().getHours();
        let saludo = (hora >= 6 && hora < 13) ? "¡Buen día!" : 
                     (hora >= 13 && hora < 20) ? "¡Buenas tardes!" : "¡Buenas noches!";
        
        const originalText = mensajeBienvenida.textContent;
        mensajeBienvenida.innerHTML = `<span style="font-weight:normal">${saludo}</span> ${originalText}`;
    }

// --- 7.5 INICIALIZACIÓN DE POSICIÓN Y REVELADO ---
const inicializarFondo = () => {
    const bg = document.querySelector(".background-bg");
    if (!bg) return;

    const scrolled = window.scrollY;
    actualizarPosicionEstrellas(scrolled);

    gsap.to(bg, { opacity: 1, duration: 1 });
};

// --- FUNCIÓN ÚNICA DE MOVIMIENTO ---
const actualizarPosicionEstrellas = (scrolled) => {
    gsap.set(".background-bg", {
        backgroundPosition: `
            center ${-(scrolled * 0.8)}px, center ${-(scrolled * 0.8)}px, center ${-(scrolled * 0.8)}px, 
            center ${-(scrolled * 0.4)}px, center ${-(scrolled * 0.4)}px, center ${-(scrolled * 0.4)}px, center ${-(scrolled * 0.4)}px, 
            center ${-(scrolled * 0.1)}px, center ${-(scrolled * 0.1)}px, center ${-(scrolled * 0.1)}px, center ${-(scrolled * 0.1)}px, center ${-(scrolled * 0.1)}px, 
            center 0px
        `.replace(/\s+/g, ' ')
    });
};

window.addEventListener("scroll", () => {
    actualizarPosicionEstrellas(window.scrollY);
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        gsap.set(blob, { y: (window.scrollY * (index + 1) * 0.2) });
    });
});

inicializarFondo();


// --- 8. EFECTO PARALLAX CINEMATOGRÁFICO ---
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    
    gsap.set(".background-bg", {
        backgroundPosition: `
            center ${-(scrolled * 0.8)}px, center ${-(scrolled * 0.75)}px, center ${-(scrolled * 0.7)}px, /* Capa 4 (Muy rápidas) */
            center ${-(scrolled * 0.55)}px, center ${-(scrolled * 0.5)}px, center ${-(scrolled * 0.45)}px, /* Capa 3 */
            center ${-(scrolled * 0.35)}px, center ${-(scrolled * 0.3)}px, center ${-(scrolled * 0.25)}px, /* Capa 2 */
            center ${-(scrolled * 0.15)}px, center ${-(scrolled * 0.12)}px, center ${-(scrolled * 0.1)}px, /* Capa 1 (Muy lentas) */
            center ${-(scrolled * 0.05)}px /* Vía Láctea */
        `.replace(/\s+/g, ' ')
    });

        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.2; 
            gsap.set(blob, { y: (scrolled * speed) });
        });
    });
window.addEventListener('load', () => {
    inicializarFondo();
});
});