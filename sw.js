// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-3bb7eeb5df0f';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-d13b07d8bdd71e4633446afb3d3cf2cb.js","/_expo/static/js/web/[id]-e86d893a6fb148f07895e31215a98087.js","/_expo/static/js/web/__common-a18666e3dbe3e2234d827b3c3d36c66c.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-28688bdb4b9934df92734a825b722553.js","/_expo/static/js/web/_layout-6bc634e8485105c938a20fd264543cd5.js","/_expo/static/js/web/anasayfa-de4c3efbb91ed62aedf09c594fce70b3.js","/_expo/static/js/web/defter-6492f2ee5437f933378aa1b400980bcd.js","/_expo/static/js/web/entry-02f8a35bd129093311a7517c3cc51f90.js","/_expo/static/js/web/hava-8d6db78addce32db9b6a276553315b27.js","/_expo/static/js/web/imdat-edc4d151eb6c51768ea04e417e493d2b.js","/_expo/static/js/web/index-1273e03dba28c79ed14fc813607faa44.js","/_expo/static/js/web/kiralama-baeec8e2cc10d1de0de3eb2c66541972.js","/_expo/static/js/web/koy-d260b8ef8134c20db177c91165c3faf7.js","/_expo/static/js/web/koylar-fa250ead0f1dff9db9e308278a209279.js","/_expo/static/js/web/paywall-722d1f19c3445e69b707d7b7490d5afe.js","/_expo/static/js/web/paywall-b5e892107a8ba00807c44d66b4b96ddc.js","/_expo/static/js/web/rota-2c0542710642e1324633e5982963e848.js","/_expo/static/js/web/rota-fb3debf13f818a4c8fc652637b7d4d36.js","/_expo/static/js/web/tekne-c797252a8afbb28992be7907d7022371.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
