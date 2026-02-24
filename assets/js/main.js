(() => {
    "use strict";

    /*=============== ELEMENTS ===============*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');
    const scrollUpBtn = document.getElementById('scroll-up');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    /* SAFETY: se elementos essenciais não existem, não executa partes dependentes */
    const has = el => el !== null && el !== undefined;

    /*=============== MENU: abrir/fechar ===============*/
    function openMenu() {
        if (!has(navMenu)) return;
        navMenu.classList.add('show-menu');
        if (has(navOverlay)) navOverlay.classList.add('active');
        if (has(navToggle)) navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!has(navMenu)) return;
        navMenu.classList.remove('show-menu');
        if (has(navOverlay)) navOverlay.classList.remove('active');
        if (has(navToggle)) navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (has(navToggle)) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });
    }

    if (has(navClose)) {
        navClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    const navLinks = document.querySelectorAll('.nav__link');
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    if (has(navOverlay)) {
        navOverlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeMenu();
        }
    });

    /*=============== SHADOW HEADER on scroll ===============*/
    function handleShadowHeader() {
        if (!has(header)) return;
        header.classList.toggle('shadow-header', window.scrollY >= 50);
    }
    window.addEventListener('scroll', handleShadowHeader, { passive: true });
    handleShadowHeader();

    /*=============== SHOW SCROLL UP ===============*/
    function handleScrollUp() {
        if (!has(scrollUpBtn)) return;
        scrollUpBtn.classList.toggle('show-scroll', window.scrollY >= 350);
    }
    window.addEventListener('scroll', handleScrollUp, { passive: true });
    handleScrollUp();

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
    }

    function scrollActive() {
        // Offset dinâmico: 40% da altura do viewport.
        // Em monitores grandes isso representa ~430px — ponto onde o usuário
        // já está claramente "dentro" da seção. Em mobile (~700px) fica ~280px.
        // Garante consistência em qualquer tamanho de tela.
        const offset = window.innerHeight * 0.4;
        let activeId = sections[0]?.getAttribute('id');

        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top <= offset) {
                activeId = section.getAttribute('id');
            }
        });

        if (activeId) setActiveLink(activeId);
    }

    window.addEventListener('scroll', scrollActive, { passive: true });
    scrollActive();

    /*=============== PREVENT CLOSE WHEN CLICKING INSIDE MENU ===============*/
    if (has(navMenu)) {
        navMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 300,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false
        });

        // Elementos principais
        sr.reveal('.home__content, .about__image, .services__card, .projects__card, .contact__content');
        sr.reveal('.home__image', { origin: 'bottom' });
        sr.reveal('.about__content', { origin: 'right' });
        sr.reveal('.contact__form', { origin: 'left' });

        // Títulos das seções (agora com animação mais suave)
        sr.reveal('.section__title-1, .section__title-2', {
            origin: 'top',
            distance: '30px',
            duration: 2000,
            delay: 200,
            opacity: 0,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });
    }

    /*=============== EMAIL JS ===============*/
    try {
        const contactForm = document.getElementById('contact-form');
        const contactName = document.getElementById('contact-name');
        const contactEmail = document.getElementById('contact-email');
        const contactMessage = document.getElementById('contact-message');

        if (contactForm && typeof emailjs !== 'undefined') {
            // Inicializa o EmailJS com sua Public Key
            emailjs.init('publicKey_xxx'); // ← substitua pela sua Public Key real

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                if (!contactName.value || !contactEmail.value || !contactMessage.value) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                emailjs.sendForm('service_xxx', 'template_xxx', '#contact-form')
                    .then(() => {
                        alert('Mensagem enviada com sucesso!');
                        contactName.value = '';
                        contactEmail.value = '';
                        contactMessage.value = '';
                    })
                    .catch(() => {
                        alert('Falha no envio. Tente novamente.');
                    });
            });
        }
    } catch (err) {
        // Silencioso
    }

    /*=============== FECHAR MENU AO REDIMENSIONAR PARA DESKTOP ===============*/
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1150) {
            closeMenu();
        }
    });

})();