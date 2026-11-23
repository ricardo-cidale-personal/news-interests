interface FilterState {
  interest: string;
  source: string;
}

const state: FilterState = {
  interest: 'all',
  source: 'all',
};

function updateArticleVisibility(): void {
  const articles = document.querySelectorAll<HTMLElement>('.card');
  
  articles.forEach((article) => {
    const articleInterests = article.dataset.interests?.split(',') || [];
    const articleSource = article.dataset.source || '';
    
    const matchesInterest = state.interest === 'all' || articleInterests.includes(state.interest);
    const matchesSource = state.source === 'all' || articleSource === state.source;
    
    if (matchesInterest && matchesSource) {
      article.classList.remove('hidden');
    } else {
      article.classList.add('hidden');
    }
  });
  
  updateVisibleCount();
}

function updateVisibleCount(): void {
  const visibleArticles = document.querySelectorAll('.card:not(.hidden)');
  const footer = document.querySelector('.footer p');
  
  if (footer) {
    const totalArticles = document.querySelectorAll('.card').length;
    if (visibleArticles.length === totalArticles) {
      footer.textContent = `Showing ${totalArticles} articles`;
    } else {
      footer.textContent = `Showing ${visibleArticles.length} of ${totalArticles} articles`;
    }
  }
}

function setupInterestFilters(): void {
  const interestContainer = document.getElementById('interest-filters');
  if (!interestContainer) return;
  
  const chips = interestContainer.querySelectorAll<HTMLButtonElement>('.chip');
  
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.interest = chip.dataset.interest || 'all';
      updateArticleVisibility();
    });
  });
}

function setupSourceFilters(): void {
  const sourceContainer = document.getElementById('source-filters');
  if (!sourceContainer) return;
  
  const chips = sourceContainer.querySelectorAll<HTMLButtonElement>('.chip');
  
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.source = chip.dataset.source || 'all';
      updateArticleVisibility();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupInterestFilters();
  setupSourceFilters();
});
