// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-4382f18b2d03';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-8742e8ab6e146dcf76d92e83896cc073.js","/_expo/static/js/web/[id]-cb1307b0016b66a41c504a7dda4865ad.js","/_expo/static/js/web/__common-1beb05edbd2eb5909028cf65d865f9e1.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-6bc634e8485105c938a20fd264543cd5.js","/_expo/static/js/web/_layout-fc743aa3c7d3c98a83f35a1ba87fd86d.js","/_expo/static/js/web/anasayfa-66e637e6b21ca49b5903f84c546c4342.js","/_expo/static/js/web/defter-6492f2ee5437f933378aa1b400980bcd.js","/_expo/static/js/web/entry-30dc1eeb8221cb5072c753b96e193eb8.js","/_expo/static/js/web/hava-8d6db78addce32db9b6a276553315b27.js","/_expo/static/js/web/imdat-cfef460f4d0a5de29bcc7b0febce69d5.js","/_expo/static/js/web/index-1273e03dba28c79ed14fc813607faa44.js","/_expo/static/js/web/kiralama-6a7497fa09be30e7f068439d95f94c2f.js","/_expo/static/js/web/koy-ace88e393cf45bc2d156573766e0533d.js","/_expo/static/js/web/koylar-9e9ed05c6ab985abce0955ea4157d10e.js","/_expo/static/js/web/paywall-26dab26b8b310fa2a6e07674ae502305.js","/_expo/static/js/web/paywall-8be663cd4c39aeda7ba85affaac31c84.js","/_expo/static/js/web/rota-1c195ab7858e07037071094733b115ed.js","/_expo/static/js/web/rota-97ade5f8f8f7756ca52e0cddb4c789f4.js","/_expo/static/js/web/tekne-e8304e0fb738d29aebefa824a11372b6.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(ONBELLEK).then((c) => c.addAll(KABUK)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((adlar) => Promise.all(adlar.filter((a) => a.startsWith('viracheck-') && a !== ONBELLEK).map((a) => caches.delete(a))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const istek = e.request;
  if (istek.method !== 'GET') return;
  const url = new URL(istek.url);
  // Yalnızca uygulamanın kendi dosyaları: dış servisler (hava, koy, harita)
  // ve tanıtım sayfası her zaman ağdan.
  if (url.origin !== self.location.origin || url.pathname.startsWith('/tanitim/')) return;

  // Sayfa gezintisi: önce ağ (yeni sürüm gelsin), ağ yoksa önbellekteki kabuk.
  if (istek.mode === 'navigate') {
    // cache: 'no-cache' — tarayıcının HTTP önbelleği (GitHub Pages 10 dk)
    // yeni sürümün yerine eski sayfayı vermesin; her açılışta sunucuya sorulur.
    e.respondWith(fetch(istek, { cache: 'no-cache' }).catch(() => caches.match('/')));
    return;
  }
  // Statik dosyalar adlarında içerik özeti taşıyor: önce önbellek.
  e.respondWith(
    caches.match(istek).then((var_) =>
      var_ ||
      fetch(istek).then((yanit) => {
        if (yanit.ok) {
          const kopya = yanit.clone();
          caches.open(ONBELLEK).then((c) => c.put(istek, kopya));
        }
        return yanit;
      }),
    ),
  );
});
