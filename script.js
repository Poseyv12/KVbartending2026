// KV Mobile Bartending - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // Navigation scroll effect
  // =============================================
  const nav = document.querySelector('.nav');

  const handleScroll = () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // =============================================
  // Scroll reveal animations
  // =============================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the reveal animation
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // Testimonial slider
  // =============================================
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoSlideInterval;

  const showSlide = (index) => {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % testimonials.length;
    showSlide(next);
  };

  // Auto-advance testimonials
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  if (testimonials.length > 0) {
    startAutoSlide();
  }

  // =============================================
  // CTA button - smooth scroll to contact
  // =============================================
  const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta');

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // =============================================
  // Smooth scroll for all anchor links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});

// =============================================
// Image Modal
// =============================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

function openModal(imgSrc) {
  modal.style.display = 'block';
  // Small delay for transition effect
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
  modalImg.src = imgSrc;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 400);
}

// Close modal on backdrop click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.style.display === 'block') {
    closeModal();
  }
});
