const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileMenuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px'
};

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      animateObserver.unobserve(entry.target);3
    }
  });
}, observerOptions);

document.querySelectorAll('.about-content, .feature-card, .pricing-card').forEach(el => {
  animateObserver.observe(el);
});

let currentSlide = 0;
const testimonialTrack = document.getElementById('testimonialTrack');

if (testimonialTrack) {
  const testimonialDots = document.querySelectorAll('#sliderNav .slider-dot');
  const testimonialSlides = document.querySelectorAll('.testimonial');
  const slideCount = testimonialSlides.length;

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  const aboutTrack = document.getElementById('aboutCarouselTrack');
  const aboutDots = document.querySelectorAll('#about .slider-nav .slider-dot');
  const aboutSlides = document.querySelectorAll('#about .testimonial');

  if (!aboutTrack || !aboutDots.length || !aboutSlides.length) return;

  let currentIndex = 0;
  const slideCount = aboutSlides.length;

  function updateAboutCarousel() {
    aboutTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    aboutDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateAboutCarousel();
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateAboutCarousel();
  }, 5000);
});

const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modalImg.loading = "lazy";
    modalImg.src = item.querySelector('img').src;
    modal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

const reserveModal = document.getElementById('reserveModal');

if (reserveModal) {
  const reserveClose = document.querySelector('#reserveModal .modal-close');
  const reserveButtons = document.querySelectorAll('.reserve-btn');

  reserveButtons.forEach(button => {
    button.addEventListener('click', () => {
      reserveModal.style.display = 'flex';
      gtag('event', 'click_reserve', {
        'event_category': 'Button',
        'event_label': button.getAttribute('data-plan')
      });
    });
  });

  reserveClose.addEventListener('click', () => {
    reserveModal.style.display = 'none';
  });

  reserveModal.addEventListener('click', (e) => {
    if (e.target === reserveModal) {
      reserveModal.style.display = 'none';
    }
  });

  document.querySelectorAll('.reserve-socials .social-icon').forEach(link => {
    link.addEventListener('click', () => {
      gtag('event', 'click_social_reserve', {
        'event_category': 'Social',
        'event_label': link.getAttribute('data-social')
      });
    });
  });
}
