// Portfolio projects data
const portfolioProjects = [
  {
      title: "A Arte da Mesa",
      description: "Rebranding a book on table etiquette, transforming tradition into a modern, visually engaging experience.",
      tags: ["branding", "book design", "layout", "print design", "editorial"],
      link: "A-Arte-da-Mesa.html",
      image: "images/04 A Arte da Mesa/livrofrente_mesa.jpg"
  },
  {
      title: "Spread Education, Spread Love",
      description: "Creating a collection that raises awareness for education and love, empowering young students' futures.",
      tags: ["art direction", "brand identity", "social impact", "print design", "illustration"],
      link: "SpreadEducationSpreadLove.html",
      image: "images/03 Spread education, spread love/_R5A2043.jpg"
  },
  {
      title: "Mariana & Felipe's Wedding",
      description: "Visual identity for a summer wedding, blending hand-drawn illustrations and soft watercolors to capture intimacy.",
      tags: ["wedding design", "brand identity", "illustration", "print design", "watercolor"],
      link: "Mariana&Felipe.html",
      image: "images/02 Mariana e Ipy/BenditoMockup-WWW-Wine_Bottle-04 copiar.jpg"
  },
  {
      title: "Underground Magazine",
      description: "Editorial design celebrating British underground designers, with special focus on Peter Saville's iconic work.",
      tags: ["editorial design", "layout design", "typography", "magazine", "british design"],
      link: "Underground.html",
      image: "images/05 Underground/Mockup_capa.jpg"
  }
];

// Initialize search functionality
function initializeSearch() {
  const searchIcon = document.querySelector('.search-icon');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  const suggestionTags = document.querySelectorAll('.suggestion-tag');

  if (!searchIcon || !searchOverlay) return; // Exit if elements don't exist

  // Open search overlay
  searchIcon.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      searchInput.focus();
      document.body.style.overflow = 'hidden';
  });

  // Close search overlay
  function closeSearch() {
      searchOverlay.classList.remove('active');
      searchInput.value = '';
      searchResults.innerHTML = '';
      document.body.style.overflow = '';
  }

  searchClose.addEventListener('click', closeSearch);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
          closeSearch();
      }
  });

  // Close when clicking outside search box
  searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
          closeSearch();
      }
  });

  // Search function
  function performSearch(query) {
      if (!query.trim()) {
          searchResults.innerHTML = '';
          return;
      }

      const results = portfolioProjects.filter(project => {
          const searchText = (project.title + ' ' + project.description + ' ' + project.tags.join(' ')).toLowerCase();
          return searchText.includes(query.toLowerCase());
      });

      displayResults(results, query);
  }

  // Display search results
  function displayResults(results, query) {
      if (results.length === 0) {
          searchResults.innerHTML = `
              <div class="no-results">
                  <p>No results found for "${query}"</p>
                  <p style="margin-top: 10px; font-size: 14px; color: #999;">
                      Try searching for "branding", "wedding", "editorial", or "illustration"
                  </p>
              </div>
          `;
          return;
      }

      const resultsHTML = results.map(project => `
          <a href="${project.link}" class="search-result-item">
              <img src="${project.image}" alt="${project.title}" class="result-image" onerror="this.style.display='none'">
              <div class="result-content">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
              </div>
          </a>
      `).join('');

      searchResults.innerHTML = resultsHTML;
  }

  // Real-time search
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
          performSearch(e.target.value);
      }, 300);
  });

  // Suggestion tags
  suggestionTags.forEach(tag => {
      tag.addEventListener('click', () => {
          searchInput.value = tag.textContent;
          performSearch(tag.textContent);
      });
  });

  // Handle Enter key
  searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          const firstResult = searchResults.querySelector('.search-result-item');
          if (firstResult) {
              window.location.href = firstResult.href;
          }
      }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);