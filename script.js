// =========================================================
// 1. EFEK NAVBAR SCROLL
// =========================================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(17, 17, 17, 0.95)';
    } else {
      navbar.style.background = 'rgba(0,0,0,0.4)';
    }
  }
});

// =========================================================
// 2. HAMBURGER MENU (MOBILE NAVIGATION)
// =========================================================
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Otomatis menutup menu setelah salah satu link navigasi diklik
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// =========================================================
// 3. EVENT TAP GALLERY ON SMARTPHONE
// =========================================================
function initGalleryTap() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    card.onclick = () => {
      card.classList.toggle('active');
    };
  });
}

// =========================================================
// 4. LOGIKA SLIDER KAMAR DINAMIS (FULL BUTTON & AUTOPLAY)
// =========================================================
function initRoomSliders() {
  const roomCards = document.querySelectorAll('.room-card');

  roomCards.forEach(card => {
    const slides = card.querySelectorAll('.slide');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');

    // Jika foto slide 1 atau kurang, sembunyikan tombol geser
    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
      slides[currentIndex].classList.remove('active');
      currentIndex = (index + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startAutoplay() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000); // Otomatis geser tiap 5 detik
    }

    function stopAutoplay() {
      clearInterval(slideInterval);
    }

    // Tombol Next Manual
    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        startAutoplay(); // Reset timer interval
      };
    }

    // Tombol Prev Manual
    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        startAutoplay(); // Reset timer interval
      };
    }

    // Pause autoplay saat kursor mouse berada di atas kartu kamar
    card.addEventListener('mouseenter', stopAutoplay);
    card.addEventListener('mouseleave', startAutoplay);

    // Jalankan Autoplay
    startAutoplay();
  });
}

// Jalankan fitur tap galeri saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
  initGalleryTap();
});