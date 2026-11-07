// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-66d066a2b08b';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-295ce6f5edb8973f0157c87af9fa0d82.js","/_expo/static/js/web/[id]-a2803f3bcc20df8799978d1e1ed7d10a.js","/_expo/static/js/web/__common-0bb0de502f3a8fa307786fd77062dad1.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-4b721286ce94f73b189b1ccc60ee7fbc.js","/_expo/static/js/web/_layout-de71711dd7b14bd4746ad1451032f529.js","/_expo/static/js/web/anasayfa-de4c3efbb91ed62aedf09c594fce70b3.js","/_expo/static/js/web/defter-6492f2ee5437f933378aa1b400980bcd.js","/_expo/static/js/web/entry-fdc68b0fd544cfed4ae6600acb1fb972.js","/_expo/static/js/web/hava-c52d8c9278e62e9b69b9a673791c2670.js","/_expo/static/js/web/imdat-ed84e1116032f6ad2174fd6a2820fe4b.js","/_expo/static/js/web/index-1b2522852dc560890bd126e38dc6846c.js","/_expo/static/js/web/kiralama-710b734299176a3a6dd4dd07453699ed.js","/_expo/static/js/web/koy-541a09fbdacba14ae3c2b360134ac7f2.js","/_expo/static/js/web/koylar-43354d3a2669c5ac4cb01162f88ff1e1.js","/_expo/static/js/web/paywall-1fb581e41eccdd4cd51bc1ab61b7eeb3.js","/_expo/static/js/web/paywall-a6fb9c50b718fc33b4597e508af888ad.js","/_expo/static/js/web/rota-79b799149b5f90ea036648507ef91fd2.js","/_expo/static/js/web/rota-9a3cba11b3f20bd205d8314bdfc5064e.js","/_expo/static/js/web/tekne-ccb8df6d7a2318780806098d36a73303.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
