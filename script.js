// Typing animation removed: profile title is now static text in HTML

// ==========================================
// SKILL BARS ANIMATION ON SCROLL
// ==========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return; // Check if elements exist
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width + '%';
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

animateSkillBars();

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return; // Check if element exists
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

if (backToTop) { // Check if element exists
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// DARK MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

if (themeToggle) { // Check if element exists
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });
}

// ==========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ==========================================
const copyButtons = document.querySelectorAll('.copy-btn');

if (copyButtons.length > 0) { // Check if elements exist
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const copyableElement = button.closest('.copyable');
            const textToCopy = copyableElement.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Copied to clipboard! ✓');
                button.textContent = '✓';
                
                setTimeout(() => {
                    button.textContent = '📋';
                }, 2000);
            }).catch(err => {
                showToast('Failed to copy');
            });
        });
    });
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// PROJECT FILTER FUNCTIONALITY
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterButtons.length > 0 && projectItems.length > 0) { // Check if elements exist
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('show'), 10);
                    } else {
                        item.classList.remove('show');
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                }
            });
        });
    });
    
    // Show all projects initially
    projectItems.forEach(item => {
        item.classList.add('show');
    });
}

// ==========================================
// EXPAND/COLLAPSE PROJECT DETAILS
// ==========================================
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectItem = button.closest('.project-item');
        const expandedContent = projectItem.querySelector('.expanded-content');
        
        projectItem.classList.toggle('expanded');
        
        if (projectItem.classList.contains('expanded')) {
            button.textContent = 'Show Less';
            expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
        } else {
            button.textContent = 'Read More';
            expandedContent.style.maxHeight = '0';
        }
    });
});

// ==========================================
// ANIMATED COUNTER FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

if (statNumbers.length > 0) { // Check if elements exist
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statNumbers[0].parentElement.parentElement);
}

// ==========================================
// SCROLL ANIMATION (Fade in on scroll)
// ==========================================
const animatedElements = document.querySelectorAll('[data-aos]');

if (animatedElements.length > 0) { // Check if elements exist
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });
}



// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// INITIALIZE ALL FEATURES ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Resume loaded successfully!');
});