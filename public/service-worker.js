// Nombre del cache para la aplicación
const CACHE_NAME = 'juegos-biblicos-v1';

// Lista de recursos que queremos cachear para uso offline
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.min.js',
    '/static/css/main.min.css',
    '/manifest.json',
    // Iconos
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    // Esperar hasta que el cache esté completo
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        // Limpiar caches antiguos
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptación de peticiones
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Si encontramos una coincidencia en el cache
                if (response) {
                    return response;
                }

                // Si no está en cache, hacemos la petición a la red
                return fetch(event.request).then(
                    (response) => {
                        // Verificar respuesta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar la respuesta ya que va a ser consumida dos veces
                        const responseToCache = response.clone();

                        // Guardar en cache para uso futuro
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
