const article = document.querySelector('#article');
const title = document.querySelector('#page-title');
const buttons = [...document.querySelectorAll('.article-tabs button')];

async function loadArticle(button) {
  buttons.forEach(item => item.classList.toggle('active', item === button));
  title.textContent = button.dataset.title;
  article.innerHTML = '<p>Loading preview…</p>';
  try {
    const response = await fetch(button.dataset.file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const start = html.indexOf('<div class="kbdfans-guide">');
    article.innerHTML = start >= 0 ? html.slice(start) : html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    article.innerHTML = `<p>Preview could not load: ${error.message}. Start the included local HTTP server rather than opening this file directly.</p>`;
  }
}

buttons.forEach(button => button.addEventListener('click', () => loadArticle(button)));
loadArticle(buttons[0]);
