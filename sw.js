importScripts('js/sw-utils.js');


const STATIC_CACHE = 'pizzatime-v1'
const DYNAMIC_CACHE = 'dynamic-v1'
const INMUTABLE_CACHE ='inmutable-v1'

const APP_SHELL = [
    // '/',
    'css/bootstrap.min.css',
    'css/font-awesome.min.css',
    'css/styles.css',
    'img/favicon.ico',
    'img/72x72.png',
    'img/96x96.png',
    'img/128x128.png',
    'img/144x144.png',
    'img/152x152.png',
    'img/192x192.png',
    'img/384x384.png',
    'img/512x512.png',
    'img/1024x1024.png',
    'img/baguette-svg.png',
    'img/baguette.png',
    'img/baguette2.jpg',
    'img/bg-2pizza.jpg',
    'img/bg-pizza.jpg',
    'img/burger-2.png',
    'img/burguer.jpeg',
    'img/burguer.png',
    'img/hamburguesa.jpg',
    'img/local.jpg',
    'img/menu1.png',
    'img/menu2.png',
    'img/miniburgerswfd.jpg',
    'img/minipizza.jpg',
    'img/pasta-svg.png',
    'img/pizza-svg.jpg',
    'img/rectangular.jpg',
    'js/app.js'
]
const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Oswald:300,400,700',
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
]


self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE)
                .then( cache => cache.addAll(APP_SHELL))
                .catch(err => console.log('fallo el registro de cache', err))
    const cacheInmutable = caches.open(INMUTABLE_CACHE)
                .then( cache => cache.addAll(APP_SHELL_INMUTABLE))
                .catch(err => console.log('fallo el registro de cache inmutable', err))

        event.waitUntil.addAll(Promise.all( [cacheStatic, cacheInmutable]))
});

self.addEventListener('activate', event => {
    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {
            if( key !== STATIC_CACHE && key.includes('pizzatime')){
                return caches.delete(key)
            }
        })
    })
    event.waitUntil(respuesta)
});

self.addEventListener('fetch', event => {
    const respuesta = caches.match( event.request)
        .then( resp => {
        if( resp){
            return resp
        } else {
            return fetch( event.request).then(newRes => {
            return actualizarCacheDinamico( DYNAMIC_CACHE, event.request, newRes)
        })
            
        }
    })
    event.respondWith(respuesta);
});
