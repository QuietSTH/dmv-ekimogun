document.addEventListener('DOMContentLoaded', () => {
    console.log("DMV Ekimogun Association site loaded.");
    
    // Smooth scroll for anchor links (extra browser support)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});