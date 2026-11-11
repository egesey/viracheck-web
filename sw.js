// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-3c5173d32de5';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-8253ca31131e7b8c54fd729974d9b8b2.js","/_expo/static/js/web/[id]-cbe1b4f3210032db7ba15f091a797868.js","/_expo/static/js/web/__common-0f8d3a7d88945de232d36a67f0cd5aea.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-6bc634e8485105c938a20fd264543cd5.js","/_expo/static/js/web/_layout-7da312e27464f1c0c484471e4b8f42d1.js","/_expo/static/js/web/anasayfa-66e637e6b21ca49b5903f84c546c4342.js","/_expo/static/js/web/defter-6492f2ee5437f933378aa1b400980bcd.js","/_expo/static/js/web/entry-b37e5b6934d1f821b9d0004c85a35fe3.js","/_expo/static/js/web/hava-8d6db78addce32db9b6a276553315b27.js","/_expo/static/js/web/imdat-37b315713b67c03bbbd2ea96f6c2d08a.js","/_expo/static/js/web/index-1273e03dba28c79ed14fc813607faa44.js","/_expo/static/js/web/kiralama-40958f2ce2d93df6970fa7a6475db122.js","/_expo/static/js/web/koy-09bb5e80f3ae367736da43521a6fdeb2.js","/_expo/static/js/web/koylar-1e636405b767cb9cb3b5465bbd8d1db1.js","/_expo/static/js/web/paywall-5347567f0e0a127344970ba681b4f43d.js","/_expo/static/js/web/paywall-d41d0c865f783ba03a1d684991106aab.js","/_expo/static/js/web/rota-d0b24f1a9620e4d6c808bc3d73080a37.js","/_expo/static/js/web/rota-d9d517148806ee9b1adea9235e12328a.js","/_expo/static/js/web/tekne-40be9276733e08629bdd2bc768e00099.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
