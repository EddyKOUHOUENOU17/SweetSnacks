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
    const phoneNumber = "2290164603616"; // Ton numéro ici
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

