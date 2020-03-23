const CACHE_NAME = 'site_cache_v1';
let urlsToCache = [
    '/'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
})


self.addEventListener('fetch', event => {
    console.log('fetch request', event.request);
})