const cacheName = "app-" + "d3bb6dd0e63f618ac3d3e1b79736484cce533af8";

self.addEventListener("install", event => {
  console.log("installing app worker d3bb6dd0e63f618ac3d3e1b79736484cce533af8");

  event.waitUntil(
    caches.open(cacheName).
      then(cache => {
        return cache.addAll([
          "/goapp",
          "/goapp/app.css",
          "/goapp/app.js",
          "/goapp/manifest.webmanifest",
          "/goapp/wasm_exec.js",
          "/goapp/web/app.wasm",
          "https://storage.googleapis.com/murlok-github/icon-192.png",
          "https://storage.googleapis.com/murlok-github/icon-512.png",
          
        ]);
      }).
      then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker d3bb6dd0e63f618ac3d3e1b79736484cce533af8 is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
