export const initScrollToTop = () => {
  const button = document.getElementById('scroll-to-top');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.classList.add('is-visible');
    } else {
      button.classList.remove('is-visible');
    }
  });

  // Smooth scroll to top when clicked
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};
