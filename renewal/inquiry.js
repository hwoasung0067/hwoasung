(() => {
  const form = document.querySelector('#tally-inquiry');
  const direct = document.querySelector('#tally-direct');
  const selected = new URLSearchParams(window.location.search).get('fabric');
  const preferredLanguage = new URLSearchParams(window.location.search).get('lang');
  if (preferredLanguage === 'en') {
    document.body.dataset.language = 'en';
    document.querySelectorAll('.back, .return-home').forEach(link => link.href = 'en-index.html#contact');
    const brand = document.querySelector('.page-header .brand');
    if (brand) brand.href = 'en-index.html';
  }
  if (selected) {
    const value = selected.slice(0, 100);
    const embedUrl = new URL(form.dataset.tallySrc);
    const directUrl = new URL(direct.href);
    embedUrl.searchParams.set('fabric', value);
    directUrl.searchParams.set('fabric', value);
    form.dataset.tallySrc = embedUrl.href;
    direct.href = directUrl.href;
  }
  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.onload = () => { if (window.Tally) window.Tally.loadEmbeds(); };
  script.onerror = () => { form.src = form.dataset.tallySrc; };
  document.body.appendChild(script);
})();
