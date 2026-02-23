// Gestion de la transparence du Header au scroll
window.onscroll = function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

// Gestion des quantités
function changeQty(btn, delta) {
    const qtyElement = btn.parentElement.querySelector('.qty-value');
    let currentQty = parseInt(qtyElement.innerText);
    currentQty = Math.max(0, currentQty + delta);
    qtyElement.innerText = currentQty;
}

// Envoi vers WhatsApp
function sendWhatsApp() {
    const phoneNumber = "2290167604447"; // Ton numéro ici
    let message = "Bonjour ! J'aimerais commander : \n\n";
    let total = 0;
    let hasItems = false;

    document.querySelectorAll('.product-card').forEach(card => {
        const qty = parseInt(card.querySelector('.qty-value').innerText);
        if (qty > 0) {
            hasItems = true;
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const variant = card.querySelector('.product-variant').value;
            total += (qty * price);
            message += `▪️ ${qty}x ${name} (${variant})\n`;
        }
    });

    if (!hasItems) {
        alert("Ajoutez des douceurs au panier !");
        return;
    }

    message += `\n💰 Total : ${total.toFixed(2)}€`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// Toggle du menu mobile (bouton en haut à droite)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // Fermer le menu quand on clique sur un lien (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});

// Vérification des horaires d'ouverture : disponible de 07:00 (inclus) à 19:00 (exclus)


// récupère un état global dans un fichier modifiable (open/closed)
async function fetchStatus() {
    try {
        const res = await fetch('status.txt', {cache: 'no-store'});
        if (!res.ok) return 'open';
        const txt = (await res.text()).trim().toLowerCase();
        return txt === 'closed' ? 'closed' : 'open';
    } catch (e) {
        return 'open';
    }
}

function showClosedOverlay() {
    if (document.getElementById('closed-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'closed-overlay';
    overlay.className = 'closed-overlay';
    overlay.setAttribute('aria-hidden', 'false');
    overlay.innerHTML = `
        <div class="closed-overlay__box">
            <h1 class="closed-overlay__title">Nous sommes fermés</h1>
            <p class="closed-overlay__message">Le site est ouvert chaque jour de <strong>07:00</strong> à <strong>19:00</strong>. Revenez pendant nos horaires d'ouverture pour commander.</p>
            <p id="reopen-timer" class="closed-overlay__timer"></p>
        </div>
    `;
    document.body.appendChild(overlay);

    const now = new Date();
    let nextOpen = new Date(now);
    nextOpen.setHours(9,0,0,0);
    if (now.getHours() >= 9) {
        nextOpen.setDate(nextOpen.getDate() + 1);
    }

    const timerEl = document.getElementById('reopen-timer');
    function updateTimer() {
        const diff = nextOpen - new Date();
        if (diff <= 0) {
            window.location.reload();
            return;
        }
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        timerEl.textContent = `Réouverture dans ${hrs}h ${mins}m ${secs}s`;
        setTimeout(updateTimer, 1000);
    }
    updateTimer();
}

// Exécute la vérification dès le chargement du DOM
// On combine l'horaire fixe et l'état global du fichier status.txt
document.addEventListener('DOMContentLoaded', async function() {
    const status = await fetchStatus();
    if (status === 'closed' || !isWithinBusinessHours()) {
        showClosedOverlay();
    }
});


