 const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
    menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';}));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');entry.target.querySelectorAll('.fill').forEach(bar=>bar.style.width=bar.dataset.width);observer.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const projectData = {
  furrylove: {
    title: 'FurryLove',
    description: 'For these reasons, we decided to create FurryLove, as it streamlines the adoption process for responsible individuals looking for a pet; with this application, users can now adopt a new pet in a matter of minutes.',
    tags: ['Power Apps', 'Adoption', 'Animal welfare'],
    url: 'https://agent-6af4050d85636a185ae60--website-link-7993ae.netlify.app/'
  },

  contafacill: {
    title: 'ColorMagico',
    description: 'This opportunity, combined with the process we undertook, led us to create ColorMagico a tool that facilitates the learning of colors. It allows children to learn in a quick and interactive way, offering parents a unique approach to support their children through this stage of learning. ',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Financial'],
    url: 'https://colormagico.netlify.app'
  },

contafacil: {
    title: "ContaFacil",
    description: "This problem, along with the process we developed, led us to create Contafacil, which simplifies the management of business finances. This enables entrepreneurs to keep better track of their money and minimize errors, thereby helping them grow their businesses.",
    tags: ["HTML", "CSS", "JavaScript", "Financial Management"],
    url: "https://contafacill.netlify.app"
},

  cityride: {
    title: 'CityRide',
    description: 'Given the identified need, we decided to create CityRide, as it helps people get around without placing a financial burden on them; now, with CityRide, users can travel without worrying about the cost or their schedules.',
    tags: ['Secure', 'Python', 'HTML', 'CSS'],
    url: 'https://cityridesv.netlify.app'
  }
};


const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');


document.querySelectorAll('.project-card').forEach(card => {

  card.addEventListener('click', () => {

    const project = projectData[card.dataset.project];

    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTags.replaceChildren();

    project.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    
    if (project.url) {
      modalLink.href = project.url;
      modalLink.hidden = false;
    } else {
      modalLink.hidden = true;
      modalLink.removeAttribute('href');
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    modalClose.focus();

  });

});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    document.getElementById('year').textContent=new Date().getFullYear();
  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();

    const form = e.currentTarget;
    const btn = document.getElementById('submitBtn');
    const note = document.getElementById('formNote');

    btn.disabled = true;
    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    note.textContent = '';

    try {

        const response = await fetch('https://formspree.io/f/mgaajvlp', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.errors?.map(error => error.message).join(', ') ||
                'Unable to send your message.'
            );
        }

        note.textContent = 'Your message has been sent successfully! Thank you for contacting me.';
        note.style.color = '#287a50';

        form.reset();

    } catch (error) {

        note.textContent = 'Something went wrong. Please try again later.';
        note.style.color = '#b94d3b';

        console.error('Form submission error:', error);

    } finally {

        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';

    }
});


(() => {

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const trail = document.getElementById('cursorTrail');

    if (!dot || !ring || !trail) {
        console.error('Aurora Cursor: HTML elements not found.');
        return;
    }

    const finePointer = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    );

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    if (!finePointer.matches || reducedMotion.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    let initialized = false;
    let lastParticle = 0;

    document.addEventListener('mousemove', (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        if (!initialized) {
            ringX = mouseX;
            ringY = mouseY;
            initialized = true;
        }

        dot.classList.add('active');
        ring.classList.add('active');

        const now = performance.now();

        if (now - lastParticle > 40) {

            const particle = document.createElement('span');

            particle.className = 'cursor-particle';

            const size = Math.random() * 5 + 3;

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = mouseX + 'px';
            particle.style.top = mouseY + 'px';

            trail.appendChild(particle);

            particle.addEventListener('animationend', () => {
                particle.remove();
            }, { once: true });

            lastParticle = now;
        }

    });

    function animate() {

        if (initialized) {

            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';

        }

        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('mouseover', (e) => {

        if (e.target.closest(
            'a, button, .project-card, label, [role="button"]'
        )) {
            dot.classList.add('hover');
            ring.classList.add('hover');
        }

    });

    document.addEventListener('mouseout', (e) => {

        if (e.target.closest(
            'a, button, .project-card, label, [role="button"]'
        )) {
            const next = e.relatedTarget;

            if (!next || !next.closest(
                'a, button, .project-card, label, [role="button"]'
            )) {
                dot.classList.remove('hover');
                ring.classList.remove('hover');
            }
        }

    });

    document.addEventListener('mousedown', () => {
        ring.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        ring.classList.remove('click');
    });

    document.addEventListener('mouseleave', () => {
        dot.classList.remove('active');
        ring.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
        if (initialized) {
            dot.classList.add('active');
            ring.classList.add('active');
        }
    });

    console.log('Aurora Cursor: successfully initialized.');

})();


(() => {

    const carousel = document.getElementById("achievementCarousel");
    const prevButton = document.getElementById("achievementPrev");
    const nextButton = document.getElementById("achievementNext");

    if (!carousel || !prevButton || !nextButton) {
        console.warn("Achievements carousel: elements not found.");
        return;
    }

    const getStep = () => {
        const card = carousel.querySelector(".gallery-card");

        if (!card) return 300;

        const gap = parseFloat(
            getComputedStyle(carousel).gap
        ) || 20;

        return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {

        const maxScroll =
            carousel.scrollWidth - carousel.clientWidth;

        prevButton.disabled = carousel.scrollLeft <= 2;

        nextButton.disabled =
            carousel.scrollLeft >= maxScroll - 2;
    };

    
    prevButton.addEventListener("click", () => {

        carousel.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });

    });

    
    nextButton.addEventListener("click", () => {

        carousel.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });

    });

    
    carousel.addEventListener("scroll", updateButtons);

   
    window.addEventListener("resize", updateButtons);

    
    updateButtons();

    
    carousel.querySelectorAll("img").forEach(image => {
        image.addEventListener("load", updateButtons);
        image.addEventListener("error", updateButtons);
    });

    console.log("Achievements carousel: successfully initialized.");

})();

