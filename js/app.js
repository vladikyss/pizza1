let url = window.location.href;

let swLocation = '/pizzatime/sw.js'

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        swLocation = '/sw.js'
    }
    navigator.serviceWorker.register(swLocation)
}


// Smooth Scroll con js
document.querySelectorAll('.navbar .nav-link').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault()
        // leemos el enlace 
        // console.log(enlace.getAttribute('href'));
        document.querySelector(enlace.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })

    })
})

window.onscroll = (e) => {
    const scroll = window.scrollY;
    // console.log(scroll);
    let cabecera = document.querySelector('#navegacion-principal')
    if (scroll > 690) {
        cabecera.classList.add('bg-info');

    } else {
        cabecera.classList.remove('bg-info');
    }
}

$(document).ready(function () {
    $('#fecha').countdown('2019/01/18 17:00:00', function (e) {
        // console.log(e);
        $(this).html(e.strftime(' <span> %D</span> Dias <span>%H</span> Horas <span>%M</span> Minutos <span>%S</span> Segundos'));
    });
});