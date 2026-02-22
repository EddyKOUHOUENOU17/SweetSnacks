// Toggle Menu Mobile
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Scroll Effect
window.onscroll = function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

// Gestion Quantités
function changeQty(btn, delta) {
    const qtyElement = btn.parentElement.querySelector('.qty-value');
    let currentQty = parseInt(qtyElement.innerText);
    currentQty = Math.max(0, currentQty + delta);
    qtyElement.innerText = currentQty;
}

// WhatsApp
function sendWhatsApp() {
    const phoneNumber = "0164603616"; // Ton numéro
    let message = "Bonjour The Sweet Snacks ! ✨\nVoici ma commande :\n\n";
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
    window.open("https://wa.me/2290164603616"?text=${encodeURIComponent(message)}`, '_blank');
}


