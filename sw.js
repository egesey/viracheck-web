// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-635d03efb3b2';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-b206804ccc525fbe61c1cf05fd1c0129.js","/_expo/static/js/web/[id]-fe745c3f32810a2d3066e5c0f4cbd0a7.js","/_expo/static/js/web/__common-3ca6d66b16ec96b5844ac4a4760ab7ba.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-b3524a0d54b590c2df1bf12be8b2bc3e.js","/_expo/static/js/web/_layout-cc564d2833e5a173e4437895973f18b7.js","/_expo/static/js/web/anasayfa-7f30119a5597e19ad240f42b6311279e.js","/_expo/static/js/web/defter-f14c88a9d75a284e744a546e2ac2e6d9.js","/_expo/static/js/web/entry-8abff043890f1b065f9850214f3e6b12.js","/_expo/static/js/web/hava-1878b9a7168ff2c4b17178ae152dc75c.js","/_expo/static/js/web/imdat-67f11cadd47821bf979c32ca970ff434.js","/_expo/static/js/web/index-16f64c4255192f2538f21b37fa6c4558.js","/_expo/static/js/web/kiralama-2f49f6891673141f8dd297f97a62f807.js","/_expo/static/js/web/koy-6270d8dd81f54e9e80e930854899bdf2.js","/_expo/static/js/web/koylar-2b4e37f9ad937a6e6e7549db52a21efe.js","/_expo/static/js/web/paywall-45a3989664a28f7df701b814136f1d24.js","/_expo/static/js/web/paywall-af9e0ee8897061cc11ff5c0503970c72.js","/_expo/static/js/web/rota-b0d4b748ec743d8836dfc2e8b518eb72.js","/_expo/static/js/web/rota-cfc7923d6108ea9fa519c188f07b1e56.js","/_expo/static/js/web/routeResolve-044f2c79bfdbf7c2eafdf1c90556a224.js","/_expo/static/js/web/tekne-4a7cfe5c44e74e5da56999c9fdde69d2.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/favicon-32.png","/ikon/favicon-96.png","/ikon/favicon-v2.ico","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Cormorant_500i_latin.woff2","/yazi/Cormorant_500i_latinext.woff2","/yazi/Cormorant_600_latin.woff2","/yazi/Cormorant_600_latinext.woff2","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
