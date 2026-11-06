// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-87317e4d6077';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-79a10f8e9b2be3d48d159940c3f83550.js","/_expo/static/js/web/[id]-bd061b9693f8231814661f9220654215.js","/_expo/static/js/web/__common-6f7a7ee9bbf7e0626cfee7f0096ef71c.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-0182f8b723253b86205b872434f65f75.js","/_expo/static/js/web/_layout-5719e6d4a4829271ef085117043ade1c.js","/_expo/static/js/web/anasayfa-b9567c7f9d61c3433af16e125c9b3ce1.js","/_expo/static/js/web/defter-4d3ded46960f6953e1e6f05f343d0189.js","/_expo/static/js/web/entry-0688d3ca9e2d81bc7364719120f275fe.js","/_expo/static/js/web/hava-9dde8703831333a8f2a0b9fc38285f9f.js","/_expo/static/js/web/imdat-d104e5f11962958c56adfaa8897794a5.js","/_expo/static/js/web/index-a7ddba3da298d492a78cb88457dfeca1.js","/_expo/static/js/web/kiralama-dcffd014302c302077c23c7c3e95c723.js","/_expo/static/js/web/koy-98c295f6464325a83a8fd13a07ac5abf.js","/_expo/static/js/web/koylar-3a34e9a6b06a327c6416245e6c841cb5.js","/_expo/static/js/web/paywall-6d4d92aca5a09302c025dadcca641498.js","/_expo/static/js/web/paywall-985e17c518362e5ed2abf079e2ec5f99.js","/_expo/static/js/web/rota-7e5d4bcec7069a57d351022dc18b4b32.js","/_expo/static/js/web/rota-c0896462353445f1dcc0a401bacb6b8e.js","/_expo/static/js/web/tekne-d7a45d47173d3fc4020d504bc9c38b4d.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
    e.respondWith(fetch(istek).catch(() => caches.match('/')));
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
