export function initMenu(){
    const heroSection = document.querySelector('.hero');
    const floatingNav = document.querySelector('.floating-nav');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            floatingNav.classList.remove('show-nav');
        } else {
            floatingNav.classList.add('show-nav');
        }
        });
    }, {
        threshold: 0.9
    });

    if (heroSection) {
        observer.observe(heroSection);
    }

    const sections = document.querySelectorAll('header[id], section[id]');
    const navItems = document.querySelectorAll('.floating-nav .nav-item');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            
            navItems.forEach(item => {
            const hrefId = item.getAttribute('href').replace('#', '');
            
            if (hrefId === currentId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
            });
        }
        });
    }, {
        threshold: 0.5 
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });



}