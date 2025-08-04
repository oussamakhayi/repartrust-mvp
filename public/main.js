document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const conciergeTab = document.getElementById("conciergeTab");
  const garageTab = document.getElementById("garageTab");
  const conciergeForm = document.getElementById("conciergeForm");
  const garageForm = document.getElementById("garageForm");
  const conciergeHeader = document.getElementById("conciergeHeader");
  const garageHeader = document.getElementById("garageHeader");
  const conciergeSuccess = document.getElementById("conciergeSuccessMessage");
  const garageSuccess = document.getElementById("garageSuccessMessage");

  function showConciergeTab() {
    // Update tab buttons
    conciergeTab.classList.add("active");
    garageTab.classList.remove("active");

    // Show/hide content
    conciergeForm.classList.remove("hidden");
    garageForm.classList.add("hidden");
    conciergeHeader.classList.remove("hidden");
    garageHeader.classList.add("hidden");

    // Hide success messages
    conciergeSuccess.classList.add("hidden");
    garageSuccess.classList.add("hidden");
  }

  function showGarageTab() {
    // Update tab buttons
    garageTab.classList.add("active");
    conciergeTab.classList.remove("active");

    // Show/hide content
    garageForm.classList.remove("hidden");
    conciergeForm.classList.add("hidden");
    garageHeader.classList.remove("hidden");
    conciergeHeader.classList.add("hidden");

    // Hide success messages
    conciergeSuccess.classList.add("hidden");
    garageSuccess.classList.add("hidden");
  }

  // Add event listeners for tabs
  conciergeTab.addEventListener("click", showConciergeTab);
  garageTab.addEventListener("click", showGarageTab);

  // Mobile Menu Toggle
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Typewriter effect for hero section
  const title = "ReparTrust";
  const subtitle = "Votre solution digitale pour les réparations automobiles au Maroc";
  const titleEl = document.getElementById("typewriter-title");
  const subtitleEl = document.getElementById("typewriter-subtitle");

  function typeWriter(element, text, speed, callback) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  typeWriter(titleEl, title, 80, function () {
    setTimeout(function () {
      typeWriter(subtitleEl, subtitle, 30);
    }, 400);
  });

  // Smooth scrolling for navigation links with tab switching
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        // Scroll to target (both #concierge and #garage will scroll to the forms section)
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Switch tabs based on href
        if (href === '#concierge') {
          showConciergeTab();
        } else if (href === '#garage') {
          showGarageTab();
        }

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
      }
    });
  });

  // Add scroll effect to header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('bg-white', 'shadow-sm');
    } else {
      header.classList.remove('bg-white', 'shadow-sm');
    }
  });

  // Form Validation Functions
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /[0-9+\-\s]{8,}/.test(phone);
  }

  // Concierge Form Submission
  if (conciergeForm) {
    conciergeForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(e.target);

      // Reset errors
      document.querySelectorAll("#conciergeForm input, #conciergeForm textarea").forEach(input => {
        input.classList.remove("border-red-500");
      });
      document.querySelectorAll("#conciergeForm p.text-red-500").forEach(p => p.classList.add("hidden"));

      // Validation
      let valid = true;
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const phone = data.get("phone");

      if (!firstName) {
        valid = false;
        document.getElementById("conciergeFirstName").classList.add("border-red-500");
        document.getElementById("conciergeFirstNameError").classList.remove("hidden");
      }
      if (!lastName) {
        valid = false;
        document.getElementById("conciergeLastName").classList.add("border-red-500");
        document.getElementById("conciergeLastNameError").classList.remove("hidden");
      }
      if (!email || !validateEmail(email)) {
        valid = false;
        document.getElementById("conciergeEmail").classList.add("border-red-500");
        document.getElementById("conciergeEmailError").classList.remove("hidden");
      }
      if (!phone || !validatePhone(phone)) {
        valid = false;
        document.getElementById("conciergePhone").classList.add("border-red-500");
        document.getElementById("conciergePhoneError").classList.remove("hidden");
      }
      if (!valid) return;

      // Show loading spinner
      const submitBtn = document.getElementById("conciergeSubmitBtn");
      const spinner = document.getElementById("conciergeSpinner");
      const submitText = document.getElementById("conciergeSubmitText");

      submitBtn.disabled = true;
      spinner.classList.remove("hidden");
      submitText.textContent = "Envoi en cours...";

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxHN_VUPPF5ZAHpFo08fST7ep8iDgBftMJJNLRKC5QtcOBnfVotCaZ7kptIAxJCEzqu/exec",
          {
            method: "POST",
            body: data,
            redirect: "follow",
          }
        );

        if (response.ok) {
          conciergeForm.classList.add("hidden");
          document.getElementById("conciergeSuccessMessage").classList.remove("hidden");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
      } finally {
        spinner.classList.add("hidden");
        submitText.textContent = "Envoyer ma demande";
        submitBtn.disabled = false;
      }
    });
  }

  // Garage Form Submission
  if (garageForm) {
    garageForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(e.target);

      // Reset errors
      document.querySelectorAll("#garageForm input, #garageForm textarea").forEach(input => {
        input.classList.remove("border-red-500");
      });
      document.querySelectorAll("#garageForm p.text-red-500").forEach(p => p.classList.add("hidden"));

      // Validation
      let valid = true;
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const phone = data.get("phone");
      const businessName = data.get("businessName");
      const address1 = data.get("address1");
      const city = data.get("city");

      if (!firstName) {
        valid = false;
        document.getElementById("garageFirstName").classList.add("border-red-500");
        document.getElementById("garageFirstNameError").classList.remove("hidden");
      }
      if (!lastName) {
        valid = false;
        document.getElementById("garageLastName").classList.add("border-red-500");
        document.getElementById("garageLastNameError").classList.remove("hidden");
      }
      if (!email || !validateEmail(email)) {
        valid = false;
        document.getElementById("garageEmail").classList.add("border-red-500");
        document.getElementById("garageEmailError").classList.remove("hidden");
      }
      if (!phone || !validatePhone(phone)) {
        valid = false;
        document.getElementById("garagePhone").classList.add("border-red-500");
        document.getElementById("garagePhoneError").classList.remove("hidden");
      }
      if (!businessName) {
        valid = false;
        document.getElementById("garageBusinessName").classList.add("border-red-500");
        document.getElementById("garageBusinessNameError").classList.remove("hidden");
      }
      if (!address1) {
        valid = false;
        document.getElementById("garageAddress1").classList.add("border-red-500");
        document.getElementById("garageAddress1Error").classList.remove("hidden");
      }
      if (!city) {
        valid = false;
        document.getElementById("garageCity").classList.add("border-red-500");
        document.getElementById("garageCityError").classList.remove("hidden");
      }
      if (!valid) return;

      // Show loading spinner
      const submitBtn = document.getElementById("garageSubmitBtn");
      const spinner = document.getElementById("garageSpinner");
      const submitText = document.getElementById("garageSubmitText");

      submitBtn.disabled = true;
      spinner.classList.remove("hidden");
      submitText.textContent = "Envoi en cours...";

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyOtMRA-h9ahi_6lDDoUXCrXp65JA9S7FOnCBxXIRX0fz77lF6Nk9KzCfF36JKyRdY/exec",
          {
            method: "POST",
            body: data,
            redirect: "follow",
          }
        );

        if (response.ok) {
          garageForm.classList.add("hidden");
          document.getElementById("garageSuccessMessage").classList.remove("hidden");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
      } finally {
        spinner.classList.add("hidden");
        submitText.textContent = "Envoyer ma demande";
        submitBtn.disabled = false;
      }
    });
  }
});

// Modern Scroll Animations
function initScrollAnimations() {
  console.log('Initializing scroll animations...');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Element intersecting:', entry.isIntersecting, entry.target.className);
      if (entry.isIntersecting) {
        console.log('Adding visible class to:', entry.target.className);
        entry.target.classList.add('visible');

        // Special handling for stat counters
        if (entry.target.classList.contains('stat-counter')) {
          console.log('Animating number for:', entry.target);
          animateNumber(entry.target);
        }

        // Unobserve element after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  const elementsToAnimate = document.querySelectorAll('.scroll-animate, .card-reveal, .stat-counter, .hero-text');
  console.log('Found elements to animate:', elementsToAnimate.length);

  elementsToAnimate.forEach(el => {
    console.log('Observing element:', el.className);
    observer.observe(el);
  });
}

// Number animation for statistics
function animateNumber(element) {
  const target = element.querySelector('.stat-number');
  if (!target) return;

  const finalNumber = parseInt(target.textContent);
  const duration = 1500;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentNumber = Math.floor(finalNumber * easeOut);

    target.textContent = currentNumber + (target.textContent.includes('+') ? '+' : '') +
      (target.textContent.includes('%') ? '%' : '');

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  target.textContent = '0' + (target.textContent.includes('+') ? '+' : '') +
    (target.textContent.includes('%') ? '%' : '');
  requestAnimationFrame(updateNumber);
}

// Initialize animations when DOM is loaded
console.log('Document ready state:', document.readyState);
if (document.readyState === 'loading') {
  console.log('Document still loading, adding event listener');
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  console.log('Document already loaded, initializing immediately');
  initScrollAnimations();
}
