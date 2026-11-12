// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-b071360e078c';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-5f21d252bafc617c7c6ac7ff238e8c05.js","/_expo/static/js/web/[id]-ac2a6576b6fbd32df80c1c1a1bf7ff1e.js","/_expo/static/js/web/__common-59c292cca60ff80f99baaa7b2f682097.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-9c0defe9ab1c63c0f6bc96f3733a2ce2.js","/_expo/static/js/web/_layout-cc564d2833e5a173e4437895973f18b7.js","/_expo/static/js/web/anasayfa-7f30119a5597e19ad240f42b6311279e.js","/_expo/static/js/web/defter-f14c88a9d75a284e744a546e2ac2e6d9.js","/_expo/static/js/web/entry-5a3a641a29a1015b39e65175df07ae0c.js","/_expo/static/js/web/hava-1878b9a7168ff2c4b17178ae152dc75c.js","/_expo/static/js/web/imdat-853bc00deff3f9a336f1918bf685fe89.js","/_expo/static/js/web/index-16f64c4255192f2538f21b37fa6c4558.js","/_expo/static/js/web/kiralama-2f49f6891673141f8dd297f97a62f807.js","/_expo/static/js/web/koy-5eef938921a2b573719493d93f1cfcd8.js","/_expo/static/js/web/koylar-2b4e37f9ad937a6e6e7549db52a21efe.js","/_expo/static/js/web/paywall-1b54b4dbd8bd7f8051e809f701935ea3.js","/_expo/static/js/web/paywall-b27c66adc7b0cf09dfd311485dbe3adf.js","/_expo/static/js/web/rota-3fae5cfdccc583a004f2292bee02a038.js","/_expo/static/js/web/rota-75dc0160a36725c1bf20f5dd917e0a5a.js","/_expo/static/js/web/routeResolve-480f2e6e00a4c9099c46af936482a86f.js","/_expo/static/js/web/tekne-4a7cfe5c44e74e5da56999c9fdde69d2.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/favicon-32.png","/ikon/favicon-96.png","/ikon/favicon-v2.ico","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Cormorant_500i_latin.woff2","/yazi/Cormorant_500i_latinext.woff2","/yazi/Cormorant_600_latin.woff2","/yazi/Cormorant_600_latinext.woff2","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
