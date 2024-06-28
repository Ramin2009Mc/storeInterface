const products = [
	{
		id: 1,
		name: 'MacBook',
		price: 89900,
		images: [
			'images/Mac/macbook.jpg',
			'images/Mac/macbook2.jpg',
			'images/Mac/macbook3.jpg',
		],
	},
	{
		id: 2,
		name: 'Iphone',
		price: 146990,
		images: [
			'images/iphone/iphone.jpg',
			'images/iphone/iphone2.jpg',
			'images/iphone/iphone3.jpg',
		],
	},
	{
		id: 3,
		name: 'AirPods',
		price: 18990,
		images: [
			'images/airpods/airpods.jpg',
			'images/airpods/airpods2.jpg',
			'images/airpods/airpods3.jpg',
		],
	},
]

let cart = []

function countBasketPrice() {
	return cart.reduce((total, product) => total + product.price, 0)
}

function updateCart() {
	const cartDiv = document.getElementById('cart')
	cartDiv.innerHTML = ''

	if (cart.length === 0) {
		cartDiv.innerText = '🛒 Корзина пуста'
	} else {
		const totalPrice = countBasketPrice()
		cartDiv.innerText = `🛒 В корзине: ${cart.length} товаров на сумму ${totalPrice} рублей`
	}
}

function addToCart(productId) {
	const product = products.find(p => p.id === productId)
	if (product) {
		cart.push(product)
		updateCart()
	}
}

function createProductCard(product) {
	const productDiv = document.createElement('div')
	productDiv.className = 'product'

	const productName = document.createElement('h3')
	productName.innerText = product.name
	productDiv.appendChild(productName)

	const productPrice = document.createElement('p')
	productPrice.innerText = `Цена: ${product.price} рублей`
	productDiv.appendChild(productPrice)

	const productImage = document.createElement('img')
	productImage.src = product.images[0]
	productImage.alt = product.name
	productImage.addEventListener('click', () => openModal(product.images))
	productDiv.appendChild(productImage)

	const buyButton = document.createElement('button')
	buyButton.innerText = 'Купить'
	buyButton.addEventListener('click', () => addToCart(product.id))
	productDiv.appendChild(buyButton)

	return productDiv
}

function generateCatalog() {
	const catalogDiv = document.getElementById('catalog')
	products.forEach(product => {
		const productCard = createProductCard(product)
		catalogDiv.appendChild(productCard)
	})
}

let currentImages = []
let currentIndex = 0

function openModal(images) {
	currentImages = images
	currentIndex = 0
	updateModalImage()
	document.getElementById('modal').style.display = 'block'
	document.getElementById('modalOverlay').style.display = 'block'
}

function updateModalImage() {
	document.getElementById('modalImage').src = currentImages[currentIndex]
}

document.getElementById('prevImage').addEventListener('click', () => {
	if (currentIndex > 0) {
		currentIndex--
		updateModalImage()
	}
})

document.getElementById('nextImage').addEventListener('click', () => {
	if (currentIndex < currentImages.length - 1) {
		currentIndex++
		updateModalImage()
	}
})

document.getElementById('closeModal').addEventListener('click', () => {
	document.getElementById('modal').style.display = 'none'
	document.getElementById('modalOverlay').style.display = 'none'
})

document.getElementById('modalOverlay').addEventListener('click', () => {
	document.getElementById('modal').style.display = 'none'
	document.getElementById('modalOverlay').style.display = 'none'
})

document.addEventListener('DOMContentLoaded', () => {
	generateCatalog()
	updateCart()
})
