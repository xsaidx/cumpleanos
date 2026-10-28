// ====== EDITA AQUÍ ======
const NOMBRE = 'Gwendolen Zoe García Mora';    // nombre de la bebé
const FIESTA = new Date(2026, 11, 31, 14, 0, 0); // año, mes (11 = diciembre), día, hora, min, seg
// ========================

document.querySelectorAll('[data-nombre]').forEach(el => (el.textContent = NOMBRE));
document.title = `El primer añito de ${NOMBRE} 🐝`;

const pantallaSobre = document.getElementById('pantalla-sobre');
const invitacion = document.getElementById('invitacion');
const sobre = document.getElementById('sobre');
const btnAbrir = document.getElementById('btnAbrir');

function abrirSobre() {
    if (sobre.classList.contains('abierto')) return;
    sobre.classList.add('abierto');
    btnAbrir.disabled = true;

    // Espera a que la tapa se abra y la carta salga; luego muestra la invitación
    setTimeout(() => {
        pantallaSobre.classList.add('oculto');
        setTimeout(() => {
            pantallaSobre.hidden = true;
            invitacion.hidden = false;
            invitacion.classList.add('entra');
            abejasDeFondo();
            lluviaDeCorazones();
            iniciarContador();
        }, 600);
    }, 2000);
}

btnAbrir.addEventListener('click', abrirSobre);
sobre.addEventListener('click', abrirSobre);

// ---------- Abejitas de fondo ----------
// Cambia TOTAL_ABEJAS si quieres más o menos
function abejasDeFondo() {
    const cont = document.getElementById('abejas');
    const movil = window.innerWidth < 600;
    const TOTAL_ABEJAS = movil ? 8 : 16;

    for (let i = 0; i < TOTAL_ABEJAS; i++) {
        const tam = 28 + Math.random() * 28;
        const izquierda = i % 2 === 0;
        // En pantallas grandes se reparten a los lados para no tapar la tarjeta
        const x = movil ? Math.random() * 88 : (izquierda ? 2 + Math.random() * 20 : 76 + Math.random() * 20);
        const y = (i / TOTAL_ABEJAS) * 88 + Math.random() * 8;

        cont.insertAdjacentHTML('beforeend',
            '<svg class="abeja vuela" style="' +
            'width:' + tam + 'px;height:' + tam + 'px;' +
            'left:' + x + '%;top:' + y + '%;' +
            'animation-duration:' + (7 + Math.random() * 5) + 's;' +
            'animation-delay:-' + (Math.random() * 10) + 's">' +
            '<use href="#abeja"/></svg>');
    }
}

// ---------- Corazones que suben ----------
function lluviaDeCorazones() {
    for (let i = 0; i < 18; i++) {
        const c = document.createElement('div');
        const tam = 18 + Math.random() * 26;
        c.className = 'corazon-flota';
        c.innerHTML = '<svg viewBox="0 0 24 24" width="' + tam + '" height="' + tam + '"><use href="#corazon"/></svg>';
        c.style.left = Math.random() * 95 + 'vw';
        c.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
        c.style.animationDuration = 3.5 + Math.random() * 3 + 's';
        c.style.animationDelay = Math.random() * 1.2 + 's';
        document.body.appendChild(c);
        c.addEventListener('animationend', () => c.remove());
    }
}

// ---------- Temporizador ----------
function iniciarContador() {
    const pad = n => String(n).padStart(2, '0');
    const el = id => document.getElementById(id);

    function tick() {
        const diff = FIESTA - new Date();
        if (diff <= 0) {
            el('titulo-cuenta').textContent = '¡Hoy es la fiesta! 🎉';
            ['dias', 'horas', 'minutos', 'segundos'].forEach(id => (el(id).textContent = '00'));
            clearInterval(timer);
            return;
        }
        el('dias').textContent = pad(Math.floor(diff / 86400000));
        el('horas').textContent = pad(Math.floor(diff / 3600000) % 24);
        el('minutos').textContent = pad(Math.floor(diff / 60000) % 60);
        el('segundos').textContent = pad(Math.floor(diff / 1000) % 60);
    }

    const timer = setInterval(tick, 1000);
    tick();
}