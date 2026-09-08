const analyticsAndConsent = `
<style>
  .dodonai-cookie-consent{position:fixed;inset:auto 0 0;z-index:9999;display:flex;justify-content:center;padding:16px;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
  .dodonai-cookie-consent[hidden]{display:none}
  .dodonai-cookie-card{width:min(672px,100%);padding:20px 24px;border:1px solid #E3E5F2;border-radius:16px;background:#fff;box-shadow:0 20px 50px rgba(21,21,74,.2)}
  .dodonai-cookie-card p{margin:0 0 16px;color:#65658F;font-size:14px;line-height:1.55}
  .dodonai-cookie-card a{color:#216FED;text-decoration:underline}
  .dodonai-cookie-actions{display:flex;justify-content:flex-end;gap:10px}
  .dodonai-cookie-actions button{padding:9px 18px;border-radius:999px;border:1px solid #CFD3E8;background:#fff;color:#282876;font:700 14px/1 'Plus Jakarta Sans',system-ui,sans-serif;cursor:pointer}
  .dodonai-cookie-actions .accept{border-color:#282876;background:#282876;color:#fff}
</style>
<div class="dodonai-cookie-consent" data-cookie-consent hidden role="dialog" aria-label="Cookie preferences">
  <div class="dodonai-cookie-card">
    <p>We use cookies to analyze site traffic and optimize your experience. By accepting, you consent to our use of cookies. <a href="/privacy-policy/">Privacy Policy</a></p>
    <div class="dodonai-cookie-actions">
      <button type="button" data-cookie-decline>Decline</button>
      <button type="button" class="accept" data-cookie-accept>Accept</button>
    </div>
  </div>
</div>
<script>
(function(){
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  window.gtag('config','G-S2VLXV89DL',{linker:{domains:['dodon.ai','www.dodon.ai','app.dodon.ai']}});
  window.gtag('config','AW-17511150141',{linker:{domains:['dodon.ai','www.dodon.ai','app.dodon.ai']}});

  var consent=localStorage.getItem('cookie-consent');
  var banner=document.querySelector('[data-cookie-consent]');
  function updateConsent(value){
    window.gtag('consent','update',{analytics_storage:value,ad_storage:value,ad_user_data:value,ad_personalization:value});
  }
  if(consent==='accepted') updateConsent('granted');
  else if(!consent&&banner) banner.hidden=false;
  document.querySelector('[data-cookie-accept]')?.addEventListener('click',function(){
    localStorage.setItem('cookie-consent','accepted');updateConsent('granted');
    window.gtag('event','consent_accepted',{event_category:'consent'});banner.hidden=true;
  });
  document.querySelector('[data-cookie-decline]')?.addEventListener('click',function(){
    localStorage.setItem('cookie-consent','declined');
    window.gtag('event','consent_declined',{event_category:'consent'});banner.hidden=true;
  });

  var adParams=['gclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  var incoming=new URLSearchParams(location.search);
  adParams.forEach(function(key){var value=incoming.get(key);if(value)sessionStorage.setItem('_ad_'+key,value)});
  document.querySelectorAll('a[href*="app.dodon.ai"]').forEach(function(link){
    var url=new URL(link.href);
    adParams.forEach(function(key){var value=sessionStorage.getItem('_ad_'+key);if(value)url.searchParams.set(key,value)});
    link.href=url.toString();
  });
})();
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S2VLXV89DL"></script>`;

/**
 * Keep the approved standalone mockups intact while adding the production
 * metadata, analytics consent, and attribution behavior supplied by app.html.
 */
export function renderStandalonePage(source, { canonical, title, description }) {
	const absoluteUrl = `https://www.dodon.ai${canonical}`;
	const head = `
<link rel="canonical" href="${absoluteUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dodonai">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${absoluteUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Dodonai, Inc.',
		url: 'https://www.dodon.ai',
		email: 'hello@dodon.ai'
	})}</script>`;

	return source.replace('</head>', `${head}\n</head>`).replace('</body>', `${analyticsAndConsent}\n</body>`);
}
