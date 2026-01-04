/*
 * Portfolio Website - Main JavaScript
 * Handles navigation, form functionality, and interactive elements
 */

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('.section');

// Initialize the portfolio website
function initPortfolio() {
  // Set up event listeners
  setupEventListeners();

  // Initialize animations
  initAnimations();

  console.log('Portfolio website initialized successfully!');
}

// Set up all event listeners
function setupEventListeners() {
  // Mobile navigation toggle
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToSection);
  });

  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Add hover effects to project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', addCardHoverEffect);
    card.addEventListener('mouseleave', removeCardHoverEffect);
  });

  // Handle scroll events for animations
  window.addEventListener('scroll', handleScrollAnimations);
}

// Toggle mobile navigation menu
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');

  // Update ARIA attributes for accessibility
  const isExpanded = navMenu.classList.contains('active');
  navToggle.setAttribute('aria-expanded', isExpanded);
}

// Close mobile menu
function closeMobileMenu() {
  navMenu.classList.remove('active');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
}

// Smooth scroll to section
function smoothScrollToSection(e) {
  e.preventDefault();

  const targetId = e.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    // Close mobile menu if open
    closeMobileMenu();

    // Scroll to section with offset for fixed header
    const offsetTop = targetSection.offsetTop - 120; // Increased offset for better visibility

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // Update active nav link
    updateActiveNavLink(targetId);
  }
}

// Update active navigation link based on current section
function updateActiveNavLink(targetId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !message) {
    showError('Please fill in all fields.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // In a real application, you would send the data to a server here
  // For this frontend-only version, we'll just show a success message
  showSuccess('Message sent successfully! I\'ll get back to you soon.');

  // Reset form
  contactForm.reset();
}

// Show error message
function showError(message) {
  // Remove any existing error messages
  removeMessages();

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'message error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    background: var(--error-color);
    color: white;
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
    text-align: center;
  `;

  // Insert before the submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  contactForm.insertBefore(errorDiv, submitButton);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

// Show success message
function showSuccess(message) {
  // Remove any existing messages
  removeMessages();

  // Create success message element
  const successDiv = document.createElement('div');
  successDiv.className = 'message success';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    background: var(--success-color);
    color: white;
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
    text-align: center;
  `;

  // Insert before the submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  contactForm.insertBefore(successDiv, submitButton);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.remove();
    }
  }, 5000);
}

// Remove existing messages
function removeMessages() {
  const existingMessages = contactForm.querySelectorAll('.message');
  existingMessages.forEach(message => message.remove());
}

// Add hover effect to project card
function addCardHoverEffect(e) {
  const card = e.currentTarget;
  card.style.transform = 'translateY(-5px)';
}

// Remove hover effect from project card
function removeCardHoverEffect(e) {
  const card = e.currentTarget;
  card.style.transform = 'translateY(0)';
}

// Initialize animations
function initAnimations() {
  // Add fade-in-up animation to sections when page loads
  sections.forEach((section, index) => {
    // Add animation class with delay
    setTimeout(() => {
      section.classList.add('fade-in-up');
    }, index * 100);
  });
}

// Handle scroll animations
function handleScrollAnimations() {
  // Add fade-in-up animation to elements as they come into view
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('fade-in-up');
    }
  });
}

// Update active navigation link based on scroll position
function updateActiveLinkOnScroll() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= (sectionTop - 120)) { // Match the scroll offset
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener for updating active link
window.addEventListener('scroll', updateActiveLinkOnScroll);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPortfolio,
    setupEventListeners,
    toggleMobileMenu,
    closeMobileMenu,
    smoothScrollToSection,
    handleFormSubmit
  };
}