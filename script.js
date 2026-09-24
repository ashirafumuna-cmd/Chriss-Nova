const products = [
  {
    name: 'Fashion Outfits',
    category: 'Outfit',
    price: 'TSh 75,000',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Fur Slippers',
    category: 'Accessories',
    price: 'TSh 32,000',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Black Chelsea Boots',
    category: 'Shoes',
    price: 'TSh 120,000',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Women\'s Black Mary Jane Shoes',
    category: 'Shoes',
    price: 'TSh 98,000',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'CHRISS NOVA Branded T-Shirts',
    category: 'Outfit',
    price: 'TSh 42,000',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Branded Bonnets',
    category: 'Accessories',
    price: 'TSh 26,000',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Black Luxury Heels',
    category: 'Shoes',
    price: 'TSh 140,000',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Cherry Mini Bags',
    category: 'Bags',
    price: 'TSh 68,000',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rose-Gold Travel Luggage Set',
    category: 'Travel',
    price: 'TSh 240,000',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
];

const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.category-btn');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const productNameInput = document.getElementById('productName');
const closeModalButton = document.querySelector('.close-modal');

let activeFilter = 'All';

function renderProducts(filter = 'All') {
  const relevantProducts =
    filter === 'All' ? products : products.filter((product) => product.category === filter);

  if (!productGrid) return;

  productGrid.innerHTML = relevantProducts
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-card-inner">
            <div class="product-meta">
              <span class="product-tag">${product.category}</span>
              <span class="price">${product.price}</span>
            </div>
            <h3 class="product-name">${product.name}</h3>
            <button type="button" data-product="${product.name}">Order via WhatsApp</button>
          </div>
        </article>
      `
    )
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderProducts(activeFilter);
  });
});

document.addEventListener('click', (event) => {
  const orderButton = event.target.closest('[data-product]');

  if (orderButton) {
    const selectedProduct = orderButton.dataset.product;
    productNameInput.value = selectedProduct;
    orderModal.classList.remove('hidden');
    orderModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
});

closeModalButton.addEventListener('click', closeModal);

orderModal.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    closeModal();
  }
});

function closeModal() {
  orderModal.classList.add('hidden');
  orderModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const fullName = formData.get('name');
  const phone = formData.get('phone');
  const product = formData.get('product');
  const quantity = formData.get('quantity');
  const size = formData.get('size') || 'Not specified';
  const area = formData.get('area');
  const address = formData.get('address');
  const extraMessage = formData.get('message') || 'No additional notes';

  const message = [
    'Hello CHRISS NOVA, I would like to place an order.',
    '',
    `Full Name: ${fullName}`,
    `Phone Number: ${phone}`,
    `Product: ${product}`,
    `Quantity: ${quantity}`,
    `Size: ${size}`,
    `Delivery Area: ${area}`,
    `Address: ${address}`,
    `Additional Message: ${extraMessage}`,
  ].join('\n');

  const whatsappUrl = `https://wa.me/255626366433?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  closeModal();
  orderForm.reset();
  productNameInput.value = '';
});

renderProducts(activeFilter);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !orderModal.classList.contains('hidden')) {
    closeModal();
  }
});

