/* assets/js/main.js
   Versão corrigida e unificada - substitua o conteúdo atual por este.
*/
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
        // opcional: bloquear scroll do body quando menu aberto
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!has(navMenu)) return;
        navMenu.classList.remove('show-menu');
        if (has(navOverlay)) navOverlay.classList.remove('active');
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

    // fechar ao clicar em links do menu
    const navLinks = document.querySelectorAll('.nav__link');
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // fechar ao clicar no overlay (fora do menu)
    if (has(navOverlay)) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeMenu();
        }
    });

    /*=============== SHADOW HEADER on scroll ===============*/
    function handleShadowHeader() {
        if (!has(header)) return;
        if (window.scrollY >= 50) {
            header.classList.add('shadow-header');
        } else {
            header.classList.remove('shadow-header');
        }
    }
    window.addEventListener('scroll', handleShadowHeader);
    // chama uma vez
    handleShadowHeader();

    /*=============== SHOW SCROLL UP ===============*/
    function handleScrollUp() {
        if (!has(scrollUpBtn)) return;
        if (window.scrollY >= 350) {
            scrollUpBtn.classList.add('show-scroll');
        } else {
            scrollUpBtn.classList.remove('show-scroll');
        }
    }
    window.addEventListener('scroll', handleScrollUp);
    handleScrollUp();

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const selector = '.nav__list a[href*="' + sectionId + '"]';
            const sectionsClass = document.querySelector(selector);

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add('active-link');
                } else {
                    sectionsClass.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
    // inicial
    scrollActive();

    /*=============== OPTIONAL: prevent close when clicking inside menu (if needed) ===============*/
    if (has(navMenu)) {
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // evita que clique dentro do menu feche com handlers globais
        });
    }

    /*=============== SCROLL REVEAL ANIMATION ===============*/
    // Certifique-se que ScrollReveal foi carregado (CDN ou local)
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 300
        });

        sr.reveal('.home__content, .about__image, .services__card, .projects__card, .contact__content');
        sr.reveal('.home__image', { origin: 'bottom' });
        sr.reveal('.about__content', { origin: 'right' });
        sr.reveal('.contact__form', { origin: 'left' });
    } else {
        // console.warn('ScrollReveal não encontrado. Se quiser animações, carregue a lib antes do main.js.');
    }

    /*=============== EMAIL JS (se estiver usando) ===============*/
    // Se você usa emailjs, o script da CDN já foi incluso no HTML. Aqui fica a lógica (se presente)
    try {
        const contactForm = document.getElementById('contact-form');
        const contactName = document.getElementById('contact-name');
        const contactEmail = document.getElementById('contact-email');
        const contactMessage = document.getElementById('contact-message');

        if (contactForm && typeof emailjs !== 'undefined') {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                if (!contactName.value || !contactEmail.value || !contactMessage.value) {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }

                // Substitua seus dados do EmailJS
                emailjs.sendForm('service_xxx', 'template_xxx', '#contact-form', 'publicKey_xxx')
                    .then(() => {
                        alert('Mensagem enviada com sucesso!');
                        contactName.value = '';
                        contactEmail.value = '';
                        contactMessage.value = '';
                    }, (error) => {
                        alert('Falha no envio. Tente novamente.');
                    });
            });
        }
    } catch (err) {
        // falha silenciosa para emailjs
        // console.error(err);
    }

    /*=============== FECHAR MENU AO REDIMENSIONAR PARA DESKTOP ===============*/
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1151) {
            closeMenu();
        }
    });

})();
