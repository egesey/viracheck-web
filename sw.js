// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-2a31b0e996e4';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-c5d8846a9d7b05eb88f9953a5abbf82a.js","/_expo/static/js/web/[id]-eef70e882a9a9805d9d670684aa32642.js","/_expo/static/js/web/__common-c62710aa0a2503710191cb58a815ee12.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-0e1d113bf8fedac45ac615b0d882e6fc.js","/_expo/static/js/web/_layout-cc564d2833e5a173e4437895973f18b7.js","/_expo/static/js/web/anasayfa-7f30119a5597e19ad240f42b6311279e.js","/_expo/static/js/web/defter-f14c88a9d75a284e744a546e2ac2e6d9.js","/_expo/static/js/web/entry-2f2b2c84cc44f02051dd40c31c398f31.js","/_expo/static/js/web/hava-1878b9a7168ff2c4b17178ae152dc75c.js","/_expo/static/js/web/imdat-c1d28c8609ca38e7f5d23ef864a1c243.js","/_expo/static/js/web/index-16f64c4255192f2538f21b37fa6c4558.js","/_expo/static/js/web/kiralama-2f49f6891673141f8dd297f97a62f807.js","/_expo/static/js/web/koy-b06509ec112f61d35582074114603450.js","/_expo/static/js/web/koylar-2b4e37f9ad937a6e6e7549db52a21efe.js","/_expo/static/js/web/paywall-2d492b105e53c625c7afb9d952220b51.js","/_expo/static/js/web/paywall-b279557605e8d837d51bca7721c5d673.js","/_expo/static/js/web/rota-99b76b20e9862d228f858f8020cd4547.js","/_expo/static/js/web/rota-bf0eec3dba2d762dab3e89bf96baa9c4.js","/_expo/static/js/web/routeResolve-7222deb415b9ac1b6fede1e73d2a61b4.js","/_expo/static/js/web/tekne-7ac8e3206bc3e28db3810e9066d80f8a.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/favicon-32.png","/ikon/favicon-96.png","/ikon/favicon-v2.ico","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Cormorant_500i_latin.woff2","/yazi/Cormorant_500i_latinext.woff2","/yazi/Cormorant_600_latin.woff2","/yazi/Cormorant_600_latinext.woff2","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
