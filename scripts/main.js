document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Abstract Toggling for Publications ---
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        const btn = collapsible.querySelector('.toggle-abstract');
        const preview = collapsible.querySelector('.abstract-preview');
        const full = collapsible.querySelector('.abstract-full');

        if (btn && preview && full) {
            btn.addEventListener('click', () => {
                const isHidden = full.classList.contains('hidden');
                
                if (isHidden) {
                    // Show full abstract
                    preview.classList.add('hidden');
                    full.classList.remove('hidden');
                    btn.innerHTML = 'Read Less &uarr;';
                } else {
                    // Show preview
                    full.classList.add('hidden');
                    preview.classList.remove('hidden');
                    btn.innerHTML = 'Read More &darr;';
                }
            });
        }
    });

    // --- Intersection Observer for fade-in animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Add a base class for the animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// Add this CSS to your main.css for the fade-in effect
const style = document.createElement('style');
style.innerHTML = `
.fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);
