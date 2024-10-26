let cart = [];

// Funzione per aggiungere un prodotto al carrello
function addToCart(productId, productName, productPrice) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
}

// Funzione per rimuovere un prodotto dal carrello
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Funzione per aggiornare il conteggio del carrello
function updateCartCount() {
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Funzione per visualizzare il carrello
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - €${item.price} x ${item.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Rimuovi";
        removeButton.onclick = () => removeFromCart(item.id);
        
        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `Totale: €${totalPrice.toFixed(2)}`;
}

// Gestione modale del carrello
document.getElementById('view-cart').onclick = () => {
    renderCart();
    document.getElementById('cart-modal').style.display = 'flex';
};

document.getElementById('close-cart').onclick = () => {
    document.getElementById('cart-modal').style.display = 'none';
};

// Aggiunta prodotto al carrello tramite bottone
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = () => {
        const product = button.closest('.product');
        const id = parseInt(product.getAttribute('data-id'));
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));
        addToCart(id, name, price);
    };
});
