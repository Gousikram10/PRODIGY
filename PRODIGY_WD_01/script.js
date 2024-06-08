document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#0044cc';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
});
