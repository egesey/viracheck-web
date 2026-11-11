// Üretildi: scripts/web-build.mjs — elle düzenlemeyin.
const ONBELLEK = 'viracheck-ec2880206293';
const KABUK = ["/","/_expo/static/css/leaflet-df687fead8c4838a4e6b8bcb2f176a0e.css","/_expo/static/js/web/[id]-888d4feaca043d56d6bc2e74644c29c3.js","/_expo/static/js/web/[id]-cbe1b4f3210032db7ba15f091a797868.js","/_expo/static/js/web/__common-6913003b2fa80e3020a1e6018b4ece38.js","/_expo/static/js/web/__expo-metro-runtime-1f8f5d3ca6b7f58204d51e14506d73fb.js","/_expo/static/js/web/_layout-1c1675333a0e9ff4c7e372bfc5ebbfca.js","/_expo/static/js/web/_layout-6bc634e8485105c938a20fd264543cd5.js","/_expo/static/js/web/anasayfa-66e637e6b21ca49b5903f84c546c4342.js","/_expo/static/js/web/defter-6492f2ee5437f933378aa1b400980bcd.js","/_expo/static/js/web/entry-e532215dc58025b2c6d65dab8cfeb4c6.js","/_expo/static/js/web/hava-8d6db78addce32db9b6a276553315b27.js","/_expo/static/js/web/imdat-37b315713b67c03bbbd2ea96f6c2d08a.js","/_expo/static/js/web/index-1273e03dba28c79ed14fc813607faa44.js","/_expo/static/js/web/kiralama-5788a867fe5fa39dd85ae6628e84be7d.js","/_expo/static/js/web/koy-7afc79393732428c8647dcb3739f2893.js","/_expo/static/js/web/koylar-2568410823d9f5af8a6000d6e94f28d1.js","/_expo/static/js/web/paywall-3f1e1d8faca17e171f535e476f4eaec8.js","/_expo/static/js/web/paywall-80337ebac1c24a2aaa85e997928410a0.js","/_expo/static/js/web/rota-b47ce38d625ec9efbe3cce5a0768747a.js","/_expo/static/js/web/rota-f24e5fb4228c02c72eabd2363a3745dc.js","/_expo/static/js/web/tekne-cf3a5773488ce191efe5c3852fd53455.js","/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.b4eb097d35f44ed943676fd56f6bdc51.ttf","/ikon/ikon-180.png","/ikon/ikon-192.png","/ikon/ikon-512.png","/manifest.webmanifest","/yazi/Inter_400Regular.woff2","/yazi/Inter_500Medium.woff2","/yazi/Inter_600SemiBold.woff2","/yazi/Inter_700Bold.woff2","/yazi/Inter_800ExtraBold.woff2"];

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
