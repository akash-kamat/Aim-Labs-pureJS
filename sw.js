const cacheName = 'aimlab-v1';


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/script.js',
                '/style.css',
                '/icons/icon-192x192.png',
                '/icons/icon-256x256.png',
                '/icons/icon-512x512.png'
            ]);
        })
    );
});
self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });