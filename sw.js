// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-f4931828d43a';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-1517e37b4dacd40b6fb8867ce772b49f.js","/_expo/static/js/web/[id]-8f12ce37f9549899cfacf7b6d6f3990f.js","/_expo/static/js/web/__common-d99353a01cf976bb9fa82470976aa466.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-188a5f8553cf2a8dacd98e6fdcae8ef2.js","/_expo/static/js/web/_layout-d5ae808dc2f3028653493cc9f5aa07cb.js","/_expo/static/js/web/anasayfa-5ecffc694263277285d760965c328d07.js","/_expo/static/js/web/defter-52e60daeaf4527acf98a546cff55964e.js","/_expo/static/js/web/entry-0e0b1355c4008415558a8dc54c6c2b69.js","/_expo/static/js/web/hava-259a82b87562603e7b95d79946f3843b.js","/_expo/static/js/web/imdat-6cedd35c3ff342a846f32eb03e8cd2a7.js","/_expo/static/js/web/index-56ac16aa476d30b99b7fe9178e091da3.js","/_expo/static/js/web/kiralama-4a2046d0af2bd0395054d974cc6821d3.js","/_expo/static/js/web/koy-6b62809fe6368f0d89477517d9c93637.js","/_expo/static/js/web/koylar-5801e98730e000a6c0a271e0df6f5232.js","/_expo/static/js/web/paywall-9149c84f66f2bf7319267188c66c3080.js","/_expo/static/js/web/paywall-b356f6000e4a1f8df215099339d06604.js","/_expo/static/js/web/rota-88a9ce13be4dc5743d74aeef4685dbaa.js","/_expo/static/js/web/rota-8bb4e88df958cb333e82d8288b5305d0.js","/_expo/static/js/web/routeResolve-60e6e8fa56382eca022a993ee4915600.js","/_expo/static/js/web/tekne-61420b65c6b59be18f277d52fc5c10dd.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
