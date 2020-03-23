const CACHE_NAME = 'site_cache_v1';
let urlsToCache = [
    '/',
    'css/app.css'
];

self.addEventListener('install', (event) => {
    event.waitUntill(
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