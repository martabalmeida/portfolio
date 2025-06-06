// Project Navigation JavaScript - Create as project-navigation.js

// Project navigation data - Order matches the portfolio sequence
const projectNavigation = {
    'A-Arte-da-Mesa.html': {
        prev: { url: 'modus.html', title: 'MODUS' },
        next: { url: 'SpreadEducationSpreadLove.html', title: 'Spread Education, Spread Love' }
    },
    'SpreadEducationSpreadLove.html': {
        prev: { url: 'A-Arte-da-Mesa.html', title: 'A Arte da Mesa' },
        next: { url: 'Mariana&Felipe.html', title: 'Mariana & Felipe\'s Wedding' }
    },
    'Mariana&Felipe.html': {
        prev: { url: 'SpreadEducationSpreadLove.html', title: 'Spread Education, Spread Love' },
        next: { url: 'Underground.html', title: 'Underground Magazine' }
    },
    'Underground.html': {
        prev: { url: 'Mariana&Felipe.html', title: 'Mariana & Felipe\'s Wedding' },
        next: { url: 'falp.html', title: 'FALP' }
    },
    'falp.html': {
        prev: { url: 'Underground.html', title: 'Underground Magazine' },
        next: { url: 'modus.html', title: 'MODUS' }
    },
    'modus.html': {
        prev: { url: 'falp.html', title: 'FALP' },
        next: { url: 'A-Arte-da-Mesa.html', title: 'A Arte da Mesa' }
    }
};

// Function to create navigation bar
function createProjectNavigationBar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navigation = projectNavigation[currentPage];
    
    if (!navigation) return;

    // Remove existing navigation if present
    const existingNav = document.querySelector('.project-nav-bar');
    if (existingNav) existingNav.remove();

    // Create navigation bar
    const navBar = document.createElement('div');
    navBar.className = 'project-nav-bar';
    
    // Previous project link
    if (navigation.prev) {
        const prevLink = document.createElement('a');
        prevLink.href = navigation.prev.url;
        prevLink.className = 'nav-project prev';
        prevLink.innerHTML = `
            <div class="nav-arrow-icon">
                <svg viewBox="0 0 24 24">
                    <path d="m15 18-6-6 6-6"/>
                </svg>
            </div>
            <span class="nav-text">previous project</span>
        `;
        navBar.appendChild(prevLink);
    } else {
        // Empty div to maintain spacing
        navBar.appendChild(document.createElement('div'));
    }
    
    // Next project link
    if (navigation.next) {
        const nextLink = document.createElement('a');
        nextLink.href = navigation.next.url;
        nextLink.className = 'nav-project next';
        nextLink.innerHTML = `
            <span class="nav-text">next project</span>
            <div class="nav-arrow-icon">
                <svg viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </div>
        `;
        navBar.appendChild(nextLink);
    } else {
        // Empty div to maintain spacing
        navBar.appendChild(document.createElement('div'));
    }
    
    // Insert at the top of the page
    document.body.insertBefore(navBar, document.body.firstChild);
    
    // Add class to body for padding adjustment
    document.body.classList.add('has-project-nav');
}

// Initialize navigation when page loads
document.addEventListener('DOMContentLoaded', function() {
    createProjectNavigationBar();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navigation = projectNavigation[currentPage];
    
    if (!navigation) return;

    // Left arrow key - previous project
    if (e.key === 'ArrowLeft' && navigation.prev) {
        window.location.href = navigation.prev.url;
    }
    
    // Right arrow key - next project
    if (e.key === 'ArrowRight' && navigation.next) {
        window.location.href = navigation.next.url;
    }
});