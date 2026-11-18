// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-26475c344506';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-71893047ca944fac9fcbf3d4200176a7.js","/_expo/static/js/web/[id]-f37fa5ce1081f9b9fac7ed8ed80f5d9b.js","/_expo/static/js/web/__common-80d0b86e24df90e4cdc4bed74b89f691.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-cc564d2833e5a173e4437895973f18b7.js","/_expo/static/js/web/_layout-f722d1fb30ce44f009f80db7a3b067a1.js","/_expo/static/js/web/anasayfa-7f30119a5597e19ad240f42b6311279e.js","/_expo/static/js/web/defter-f14c88a9d75a284e744a546e2ac2e6d9.js","/_expo/static/js/web/entry-5787ab73570acafbf2c125136376b573.js","/_expo/static/js/web/hava-1878b9a7168ff2c4b17178ae152dc75c.js","/_expo/static/js/web/imdat-d8b168ea809cafc9148fa662e1618f0b.js","/_expo/static/js/web/index-16f64c4255192f2538f21b37fa6c4558.js","/_expo/static/js/web/kiralama-cf9d097f9cd334443b41a08ec71956ab.js","/_expo/static/js/web/koy-1ce88c5bf6589f72eede2e29c3a774f8.js","/_expo/static/js/web/koylar-0be591d10dfa1c3ec833802e0e1974de.js","/_expo/static/js/web/paywall-1c8dc57f1f1745b5f131732871d81e64.js","/_expo/static/js/web/paywall-58befb93c03856fbaffc4578fdcb3998.js","/_expo/static/js/web/rota-32cf7b3299fb2f361a3b44ae9c6ba20a.js","/_expo/static/js/web/rota-97de4538a2295ca685618ebf583bedb0.js","/_expo/static/js/web/routeResolve-81034dad9592186773625ae59e7d3c65.js","/_expo/static/js/web/tekne-236ebd6348e80627feca520256d8a4a4.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/favicon-32.png","/ikon/favicon-96.png","/ikon/favicon-v2.ico","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Cormorant_500i_latin.woff2","/yazi/Cormorant_500i_latinext.woff2","/yazi/Cormorant_600_latin.woff2","/yazi/Cormorant_600_latinext.woff2","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
