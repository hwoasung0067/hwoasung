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
  const loading = document.querySelector('#form-loading');
  loading.hidden = false;
  const slowLoadTimer = setTimeout(() => {
    loading.querySelector('.loading-ko').textContent = '양식을 불러오는 데 시간이 걸리고 있습니다. 위의 직접 열기 링크를 이용하실 수 있습니다.';
    loading.querySelector('.loading-en').textContent = 'The form is taking longer to load. You can open it directly using the link above.';
  }, 8000);
  const tallyOrigin = new URL(form.dataset.tallySrc).origin;
  window.addEventListener('message', function onFormLoaded(event) {
    if (event.origin !== tallyOrigin || event.source !== form.contentWindow) return;
    let message = event.data;
    if (typeof message === 'string') {
      try { message = JSON.parse(message); }
      catch { return; }
    }
    if (message?.event !== 'Tally.FormLoaded') return;
    loading.hidden = true;
    clearTimeout(slowLoadTimer);
    window.removeEventListener('message', onFormLoaded);
  });
  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.onload = () => { if (window.Tally) window.Tally.loadEmbeds(); };
  script.onerror = () => { form.src = form.dataset.tallySrc; };
  document.body.appendChild(script);
})();
