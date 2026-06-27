import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, Home, Settings, Heart, Star, Search, Filter, Eye, LogOut, User, Bell, Globe, CreditCard, Truck, Shield } from 'lucide-react';

export default function GlobalEcommerceStore() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [language, setLanguage] = useState('en');
  const [notification, setNotification] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingCountry, setShippingCountry] = useState('US');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvc: '' });

  // MULTI-LANGUAGE TRANSLATIONS
  const translations = {
    en: {
      brand: 'ModernHub',
      tagline: 'Premium Collections',
      searchPlaceholder: 'Search products...',
      shop: 'Shop',
      manage: 'Manage Products',
      cart: 'Cart',
      wishlist: 'Wishlist',
      discover: 'Discover What\'s Trending',
      discoverDesc: 'Curated collections of premium products for the modern lifestyle. Quality you can trust.',
      exploreNow: 'Explore Now',
      featured: 'Featured Products',
      browsing: 'Browse our collection of high-quality items',
      category: 'Category',
      view: 'View',
      add: 'Add',
      price: 'Price',
      rating: 'Rating',
      reviews: 'Reviews',
      inStock: 'in stock',
      removeFromCart: 'Remove from cart',
      shoppingCart: 'Shopping Cart',
      cartEmpty: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      tax: 'Tax (10%)',
      shipping: 'Shipping',
      total: 'Total',
      checkout: 'Checkout',
      free: 'FREE',
      checkout2: 'Proceed to Checkout',
      shippingCountry: 'Select Shipping Country',
      calculator: 'Shipping Calculator',
      selectCountry: 'Select your country',
      weight: 'Estimated weight: 0.5 kg',
      deliveryTime: 'Delivery time: ',
      days: ' business days',
      paymentMethod: 'Select Payment Method',
      cardNumber: 'Card Number',
      expiry: 'MM/YY',
      cvc: 'CVC',
      payNow: 'Pay Now',
      cancel: 'Cancel',
      orderPlaced: 'Order placed successfully!',
      qualityGuaranteed: 'Quality Guaranteed',
      qualityDesc: 'Premium products with 30-day returns',
      fastShipping: 'Fast Shipping',
      fastDesc: 'Free delivery on orders over $100',
      securePayment: 'Secure Payment',
      secureDesc: '100% encrypted transactions',
      trustedBrand: 'Trusted Brand',
      trustedDesc: '50K+ happy customers worldwide',
      back: 'Back',
      remove: 'Remove',
      productDetails: 'Product Details',
      availableColors: 'Available Colors',
      keyFeatures: 'Key Features',
      addToCart2: 'Add to Cart',
      description: 'Description',
      features: 'Features',
      selectColor: 'Select Color',
      about: 'About',
      aboutDesc: 'Your trusted global marketplace for premium products',
      contact: 'Contact Us',
      returns: '30-Day Returns',
      returnsDesc: 'Hassle-free returns within 30 days',
    },
    es: {
      brand: 'ModernHub',
      tagline: 'Colecciones Premium',
      searchPlaceholder: 'Buscar productos...',
      shop: 'Tienda',
      manage: 'Gestionar Productos',
      cart: 'Carrito',
      wishlist: 'Lista de Deseos',
      discover: 'Descubre lo Tendencia',
      discoverDesc: 'Colecciones seleccionadas de productos premium para el estilo de vida moderno. Calidad en la que puedes confiar.',
      exploreNow: 'Explorar Ahora',
      featured: 'Productos Destacados',
      browsing: 'Explora nuestra colección de artículos de alta calidad',
      category: 'Categoría',
      view: 'Ver',
      add: 'Añadir',
      price: 'Precio',
      rating: 'Calificación',
      reviews: 'Reseñas',
      inStock: 'en stock',
      removeFromCart: 'Eliminar del carrito',
      shoppingCart: 'Carrito de Compras',
      cartEmpty: 'Tu carrito está vacío',
      continueShopping: 'Continuar Comprando',
      orderSummary: 'Resumen del Pedido',
      subtotal: 'Subtotal',
      tax: 'Impuesto (10%)',
      shipping: 'Envío',
      total: 'Total',
      checkout: 'Pagar',
      free: 'GRATIS',
      checkout2: 'Proceder al Pago',
      shippingCountry: 'Seleccionar País de Envío',
      calculator: 'Calculadora de Envío',
      selectCountry: 'Selecciona tu país',
      weight: 'Peso estimado: 0.5 kg',
      deliveryTime: 'Tiempo de entrega: ',
      days: ' días hábiles',
      paymentMethod: 'Seleccionar Método de Pago',
      cardNumber: 'Número de Tarjeta',
      expiry: 'MM/AA',
      cvc: 'CVC',
      payNow: 'Pagar Ahora',
      cancel: 'Cancelar',
      orderPlaced: '¡Pedido realizado con éxito!',
      qualityGuaranteed: 'Calidad Garantizada',
      qualityDesc: 'Productos premium con devoluciones de 30 días',
      fastShipping: 'Envío Rápido',
      fastDesc: 'Envío gratuito en pedidos mayores a $100',
      securePayment: 'Pago Seguro',
      secureDesc: 'Transacciones 100% cifradas',
      trustedBrand: 'Marca Confiable',
      trustedDesc: '+50K clientes satisfechos en todo el mundo',
      back: 'Atrás',
      remove: 'Eliminar',
      productDetails: 'Detalles del Producto',
      availableColors: 'Colores Disponibles',
      keyFeatures: 'Características Principales',
      addToCart2: 'Añadir al Carrito',
      description: 'Descripción',
      features: 'Características',
      selectColor: 'Seleccionar Color',
    },
    fr: {
      brand: 'ModernHub',
      tagline: 'Collections Premium',
      searchPlaceholder: 'Rechercher des produits...',
      shop: 'Boutique',
      manage: 'Gérer les Produits',
      cart: 'Panier',
      wishlist: 'Liste de Souhaits',
      discover: 'Découvrez les Tendances',
      discoverDesc: 'Collections sélectionnées de produits premium pour le style de vie moderne. Qualité en laquelle vous pouvez faire confiance.',
      exploreNow: 'Explorer Maintenant',
      featured: 'Produits en Vedette',
      browsing: 'Parcourez notre collection d\'articles de haute qualité',
      category: 'Catégorie',
      view: 'Voir',
      add: 'Ajouter',
      price: 'Prix',
      rating: 'Note',
      reviews: 'Avis',
      inStock: 'en stock',
      removeFromCart: 'Supprimer du panier',
      shoppingCart: 'Panier',
      cartEmpty: 'Votre panier est vide',
      continueShopping: 'Continuer vos Achats',
      orderSummary: 'Résumé de la Commande',
      subtotal: 'Sous-total',
      tax: 'Taxe (10%)',
      shipping: 'Livraison',
      total: 'Total',
      checkout: 'Payer',
      free: 'GRATUIT',
      checkout2: 'Procéder au Paiement',
      shippingCountry: 'Sélectionner le Pays de Livraison',
      calculator: 'Calculatrice d\'Expédition',
      selectCountry: 'Sélectionnez votre pays',
      weight: 'Poids estimé: 0.5 kg',
      deliveryTime: 'Délai de livraison: ',
      days: ' jours ouvrables',
      paymentMethod: 'Sélectionner le Mode de Paiement',
      cardNumber: 'Numéro de Carte',
      expiry: 'MM/AA',
      cvc: 'CVC',
      payNow: 'Payer Maintenant',
      cancel: 'Annuler',
      orderPlaced: 'Commande passée avec succès!',
      qualityGuaranteed: 'Qualité Garantie',
      qualityDesc: 'Produits premium avec retours de 30 jours',
      fastShipping: 'Livraison Rapide',
      fastDesc: 'Livraison gratuite sur les commandes supérieures à 100 $',
      securePayment: 'Paiement Sécurisé',
      secureDesc: 'Transactions 100% chiffrées',
      trustedBrand: 'Marque de Confiance',
      trustedDesc: '50K+ clients satisfaits dans le monde',
      back: 'Retour',
      remove: 'Supprimer',
      productDetails: 'Détails du Produit',
      availableColors: 'Couleurs Disponibles',
      keyFeatures: 'Caractéristiques Principales',
      addToCart2: 'Ajouter au Panier',
      description: 'Description',
      features: 'Caractéristiques',
      selectColor: 'Sélectionner la Couleur',
    },
    de: {
      brand: 'ModernHub',
      tagline: 'Premium-Kollektionen',
      searchPlaceholder: 'Produkte durchsuchen...',
      shop: 'Shop',
      manage: 'Produkte Verwalten',
      cart: 'Warenkorb',
      wishlist: 'Wunschliste',
      discover: 'Entdecke die Trends',
      discoverDesc: 'Kuratierte Kollektionen hochwertiger Produkte für den modernen Lebensstil. Qualität, der Sie vertrauen können.',
      exploreNow: 'Jetzt Erkunden',
      featured: 'Ausgewählte Produkte',
      browsing: 'Durchsuchen Sie unsere Kollektion hochwertiger Artikel',
      category: 'Kategorie',
      view: 'Ansicht',
      add: 'Hinzufügen',
      price: 'Preis',
      rating: 'Bewertung',
      reviews: 'Bewertungen',
      inStock: 'auf Lager',
      removeFromCart: 'Aus dem Warenkorb entfernen',
      shoppingCart: 'Warenkorb',
      cartEmpty: 'Ihr Warenkorb ist leer',
      continueShopping: 'Zum Einkaufen Fortfahren',
      orderSummary: 'Bestellübersicht',
      subtotal: 'Zwischensumme',
      tax: 'Steuern (10%)',
      shipping: 'Versand',
      total: 'Gesamtbetrag',
      checkout: 'Kasse',
      free: 'KOSTENLOS',
      checkout2: 'Zur Kasse gehen',
      shippingCountry: 'Versandland Auswählen',
      calculator: 'Versandrechner',
      selectCountry: 'Wählen Sie Ihr Land',
      weight: 'Geschätztes Gewicht: 0,5 kg',
      deliveryTime: 'Lieferzeit: ',
      days: ' Geschäftstage',
      paymentMethod: 'Zahlungsmethode Auswählen',
      cardNumber: 'Kartennummer',
      expiry: 'MM/JJ',
      cvc: 'CVC',
      payNow: 'Jetzt Bezahlen',
      cancel: 'Abbrechen',
      orderPlaced: 'Bestellung erfolgreich aufgegeben!',
      qualityGuaranteed: 'Qualität Garantiert',
      qualityDesc: 'Premium-Produkte mit 30-tägiger Rückgabe',
      fastShipping: 'Schneller Versand',
      fastDesc: 'Kostenloser Versand bei Bestellungen über 100 $',
      securePayment: 'Sichere Zahlung',
      secureDesc: '100% verschlüsselte Transaktionen',
      trustedBrand: 'Vertrauenswürdige Marke',
      trustedDesc: '50K+ zufriedene Kunden weltweit',
      back: 'Zurück',
      remove: 'Entfernen',
      productDetails: 'Produktdetails',
      availableColors: 'Verfügbare Farben',
      keyFeatures: 'Hauptmerkmale',
      addToCart2: 'In den Warenkorb',
      description: 'Beschreibung',
      features: 'Merkmale',
      selectColor: 'Farbe Auswählen',
    },
    zh: {
      brand: 'ModernHub',
      tagline: '优质收藏',
      searchPlaceholder: '搜索产品...',
      shop: '商店',
      manage: '管理产品',
      cart: '购物车',
      wishlist: '愿望清单',
      discover: '发现时尚趋势',
      discoverDesc: '精选高品质产品，适合现代生活方式。值得信赖的品质。',
      exploreNow: '立即探索',
      featured: '精选产品',
      browsing: '浏览我们的高质量商品收藏',
      category: '类别',
      view: '查看',
      add: '添加',
      price: '价格',
      rating: '评分',
      reviews: '评价',
      inStock: '有货',
      removeFromCart: '从购物车删除',
      shoppingCart: '购物车',
      cartEmpty: '购物车为空',
      continueShopping: '继续购物',
      orderSummary: '订单摘要',
      subtotal: '小计',
      tax: '税金(10%)',
      shipping: '运费',
      total: '总计',
      checkout: '结账',
      free: '免费',
      checkout2: '前往结账',
      shippingCountry: '选择收货国家',
      calculator: '运费计算器',
      selectCountry: '选择您的国家',
      weight: '预计重量：0.5 公斤',
      deliveryTime: '配送时间：',
      days: '个工作日',
      paymentMethod: '选择支付方式',
      cardNumber: '卡号',
      expiry: '月/年',
      cvc: 'CVC',
      payNow: '立即支付',
      cancel: '取消',
      orderPlaced: '订单成功提交！',
      qualityGuaranteed: '品质保证',
      qualityDesc: '30天退货承诺的优质产品',
      fastShipping: '快速配送',
      fastDesc: '订单满$100免运费',
      securePayment: '安全支付',
      secureDesc: '100%加密交易',
      trustedBrand: '信赖品牌',
      trustedDesc: '全球50000+满意客户',
      back: '返回',
      remove: '删除',
      productDetails: '产品详情',
      availableColors: '可用颜色',
      keyFeatures: '主要特点',
      addToCart2: '加入购物车',
      description: '描述',
      features: '特点',
      selectColor: '选择颜色',
    }
  };

  const t = translations[language];

  // SHIPPING CALCULATOR DATA
  const shippingRates = {
    'US': { baseCost: 0, daysMin: 3, daysMax: 5, freeOver: 100 },
    'CA': { baseCost: 15, daysMin: 5, daysMax: 7, freeOver: 150 },
    'UK': { baseCost: 12, daysMin: 4, daysMax: 6, freeOver: 100 },
    'DE': { baseCost: 10, daysMin: 4, daysMax: 6, freeOver: 100 },
    'FR': { baseCost: 12, daysMin: 4, daysMax: 6, freeOver: 100 },
    'ES': { baseCost: 12, daysMin: 5, daysMax: 7, freeOver: 100 },
    'IT': { baseCost: 12, daysMin: 5, daysMax: 7, freeOver: 100 },
    'AU': { baseCost: 25, daysMin: 10, daysMax: 14, freeOver: 150 },
    'JP': { baseCost: 20, daysMin: 7, daysMax: 10, freeOver: 120 },
    'CN': { baseCost: 15, daysMin: 14, daysMax: 21, freeOver: 150 },
    'IN': { baseCost: 10, daysMin: 7, daysMax: 14, freeOver: 80 },
    'BR': { baseCost: 20, daysMin: 10, daysMax: 15, freeOver: 150 },
    'MX': { baseCost: 18, daysMin: 7, daysMax: 10, freeOver: 120 },
    'SG': { baseCost: 12, daysMin: 5, daysMax: 8, freeOver: 100 },
    'NZ': { baseCost: 28, daysMin: 10, daysMax: 15, freeOver: 180 },
  };

  const calculateShipping = (country, cartTotal) => {
    const rates = shippingRates[country] || { baseCost: 25, daysMin: 10, daysMax: 14, freeOver: 150 };
    const shippingCost = cartTotal >= rates.freeOver ? 0 : rates.baseCost;
    return {
      cost: shippingCost,
      minDays: rates.daysMin,
      maxDays: rates.daysMax,
      freeThreshold: rates.freeOver
    };
  };

  const [products] = useState([
    { 
      id: 1, 
      name: 'Pro Wireless Headphones', 
      price: 299.99, 
      originalPrice: 399.99,
      image: '🎧', 
      category: 'Electronics',
      rating: 4.8,
      reviews: 342,
      stock: 15,
      description: 'Experience studio-quality sound with our award-winning noise-cancelling technology. Built for professionals, designed for perfectionists.',
      marketingCopy: '🎧 Premium Audio for the Discerning Ear | 40-Hour Battery | Travel-Ready',
      features: ['Active Noise Cancellation', '40-hour battery', 'Bluetooth 5.3', 'Premium materials'],
      colors: ['Black', 'Midnight Blue', 'Rose Gold']
    },
    { 
      id: 2, 
      name: 'Artisan Coffee Collection', 
      price: 34.99,
      originalPrice: 44.99,
      image: '☕', 
      category: 'Food & Beverage',
      rating: 4.9,
      reviews: 512,
      stock: 45,
      description: 'Ethically sourced, freshly roasted single-origin coffee beans from award-winning roasters across three continents.',
      marketingCopy: '☕ Fair Trade | Freshly Roasted Daily | Elevate Your Morning Ritual',
      features: ['Fair trade', 'Freshly roasted', 'Organic', '500g bag'],
      colors: ['Medium Roast', 'Dark Roast', 'Light Roast']
    },
    { 
      id: 3, 
      name: 'Minimalist Leather Wallet', 
      price: 89.99,
      originalPrice: 129.99,
      image: '👜', 
      category: 'Accessories',
      rating: 4.7,
      reviews: 218,
      stock: 22,
      description: 'Handcrafted from premium Italian leather with RFID protection. Slim design perfected for the modern minimalist.',
      marketingCopy: '👜 Italian Leather | RFID Protected | Lifetime Warranty | Ultimate Sophistication',
      features: ['Italian leather', 'RFID protected', 'Slim design', 'Lifetime warranty'],
      colors: ['Black', 'Cognac', 'Navy']
    },
    { 
      id: 4, 
      name: 'Eco Water Bottle', 
      price: 49.99,
      originalPrice: 69.99,
      image: '🍶', 
      category: 'Lifestyle',
      rating: 4.6,
      reviews: 189,
      stock: 30,
      description: 'Made from sustainable bamboo fiber. Keeps drinks cold for 24 hours while helping save the planet.',
      marketingCopy: '🍶 Eco-Conscious | Temperature Control | 100% Recyclable | Sustainable Living',
      features: ['Bamboo fiber', 'Temperature control', 'Eco-friendly', '750ml capacity'],
      colors: ['Sage Green', 'Clay', 'Ocean Blue']
    },
    { 
      id: 5, 
      name: 'Ergonomic Mouse Pro', 
      price: 79.99,
      originalPrice: 99.99,
      image: '🖱️', 
      category: 'Electronics',
      rating: 4.8,
      reviews: 421,
      stock: 25,
      description: 'Precision engineering meets ergonomic design. Built for professionals who demand excellence.',
      marketingCopy: '🖱️ 8K Polling Rate | Ergonomic Perfection | Customizable Buttons | Pro Gaming',
      features: ['8K polling rate', 'Ergonomic shape', 'Customizable buttons', 'Wireless 2.4GHz'],
      colors: ['Classic Black', 'White', 'Space Gray']
    },
    { 
      id: 6, 
      name: 'Natural Skincare Set', 
      price: 119.99,
      originalPrice: 159.99,
      image: '🧴', 
      category: 'Beauty',
      rating: 4.9,
      reviews: 634,
      stock: 18,
      description: 'Luxurious, all-natural skincare formulated with organic ingredients. Dermatologist tested and cruelty-free.',
      marketingCopy: '🧴 100% Natural | Organic Certified | Dermatologist Tested | Radiant Skin',
      features: ['100% natural', 'Organic certified', 'Cruelty-free', '3-piece set'],
      colors: ['For Dry Skin', 'For Oily Skin', 'For Sensitive Skin']
    },
    { 
      id: 7, 
      name: 'Smart Watch Ultra', 
      price: 349.99,
      originalPrice: 449.99,
      image: '⌚', 
      category: 'Electronics',
      rating: 4.7,
      reviews: 876,
      stock: 12,
      description: 'Advanced health monitoring, GPS tracking, and 7-day battery life. Your personal wellness coach.',
      marketingCopy: '⌚ 7-Day Battery | Health Monitoring | GPS Tracking | Smart Living',
      features: ['7-day battery', 'Heart rate monitor', 'GPS tracking', 'Water resistant'],
      colors: ['Black', 'Gold', 'Silver']
    },
    { 
      id: 8, 
      name: 'Linen Bedding Collection', 
      price: 189.99,
      originalPrice: 249.99,
      image: '🛏️', 
      category: 'Lifestyle',
      rating: 4.8,
      reviews: 445,
      stock: 20,
      description: 'Premium Belgian linen bedding with exceptional durability and unmatched softness. Sleep like royalty.',
      marketingCopy: '🛏️ Belgian Linen | Pre-Washed | Hypoallergenic | Sleep in Luxury',
      features: ['Belgian linen', 'Pre-washed', 'Hypoallergenic', 'Queen size'],
      colors: ['Warm White', 'Sage', 'Charcoal']
    },
  ]);

  const categories = ['All', 'Electronics', 'Food & Beverage', 'Accessories', 'Beauty', 'Lifestyle'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification(`✓ ${product.name} ${t.add.toLowerCase()}`);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const taxRate = 0.1;
  const shipping = calculateShipping(shippingCountry, cartTotal);
  const shippingCost = shipping.cost;
  const finalTotal = cartTotal * (1 + taxRate) + shippingCost;

  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600">{rating} ({reviews})</span>
    </div>
  );

  // STRIPE PAYMENT MODAL
  const StripePaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard size={24} /> {t.paymentMethod}
          </h3>
          <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          {[
            { id: 'stripe', name: '💳 Stripe', icon: '🔒' },
            { id: 'paypal', name: '🅿️ PayPal', icon: '' },
            { id: 'googlepay', name: '📱 Google Pay', icon: '' },
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-3 rounded-lg border-2 transition ${
                paymentMethod === method.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-slate-600 hover:border-purple-400'
              }`}
            >
              <span className="text-white font-medium">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'stripe' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">{t.cardNumber}</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                maxLength="19"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">{t.expiry}</label>
                <input
                  type="text"
                  placeholder="12/25"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">{t.cvc}</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  maxLength="4"
                />
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg text-sm text-blue-300">
              💡 {t.paymentMethod === 'Select Payment Method' ? 'Use test card: 4242 4242 4242 4242' : 'Demo Mode: Use any 4242 card'}
            </div>
          </div>
        )}

        {/* Order Summary in Modal */}
        <div className="border-t border-slate-700 pt-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>{t.subtotal}</span>
              <span className="text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>{t.tax}</span>
              <span className="text-white">${(cartTotal * taxRate).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>{t.shipping}</span>
              <span className={shippingCost === 0 ? "text-green-400 font-bold" : "text-white"}>{shippingCost === 0 ? t.free : `$${shippingCost}`}</span>
            </div>
            <div className="flex justify-between border-t border-slate-600 pt-2 mt-2">
              <span className="text-white font-bold">{t.total}</span>
              <span className="text-2xl font-bold text-purple-400">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (paymentMethod === 'stripe' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvc)) {
              showNotification('❌ Please fill in all card details');
              return;
            }
            showNotification(`✅ ${t.orderPlaced}`);
            setTimeout(() => {
              setShowPaymentModal(false);
              setCart([]);
              setCurrentPage('home');
              setCardDetails({ cardNumber: '', expiry: '', cvc: '' });
            }, 2000);
          }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition mb-2"
        >
          {t.payNow} ${finalTotal.toFixed(2)}
        </button>
        <button
          onClick={() => setShowPaymentModal(false)}
          className="w-full text-gray-400 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );

  // HOME PAGE
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition">
                ✨
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t.brand}</h1>
                <p className="text-xs text-gray-400">{t.tagline}</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 mx-8">
              <div className="w-full relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm border border-slate-700 hover:border-purple-500 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="zh">🇨🇳 中文</option>
              </select>

              <button className="relative group">
                <Bell size={20} className="text-gray-400 group-hover:text-white transition" />
              </button>
              <button
                onClick={() => setCurrentPage('cart')}
                className="relative group"
              >
                <ShoppingCart size={20} className="text-gray-400 group-hover:text-white transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentPage('wishlist')}
                className="relative group"
              >
                <Heart size={20} className="text-gray-400 group-hover:text-pink-400 transition" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
                <User size={18} className="m-auto" />
              </button>
            </div>
          </div>

          {/* Category Bar */}
          <div className="border-t border-slate-800 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-400 hover:text-white bg-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-20 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 shadow-lg animate-pulse z-50">
            {notification}
          </div>
        )}

        {/* Hero Section with Marketing Copy */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-slate-800 to-pink-600 p-12 md:p-20">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.discover}</h2>
              <p className="text-lg text-gray-200 mb-6 max-w-lg">{t.discoverDesc}</p>
              <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:scale-105 transition shadow-lg">
                {t.exploreNow}
              </button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-3xl font-bold text-white mb-2">{t.featured}</h2>
          <p className="text-gray-400 mb-8">{t.browsing}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const isInWishlist = wishlist.find(item => item.id === product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 transition hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 h-48 flex items-center justify-center text-7xl overflow-hidden">
                    <div className="group-hover:scale-110 transition duration-300">{product.image}</div>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 p-2 bg-slate-900/80 rounded-lg hover:bg-pink-500 transition"
                    >
                      <Heart
                        size={18}
                        className={isInWishlist ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}
                      />
                    </button>
                    {product.originalPrice > product.price && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">{product.category}</p>
                    <p className="text-xs text-gray-400 mb-2">{product.marketingCopy}</p>
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="mb-3">
                      <StarRating rating={product.rating} reviews={product.reviews} />
                    </div>

                    <div className="flex gap-2 items-baseline mb-4">
                      <span className="text-lg font-bold text-white">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setCurrentPage('product-detail');
                        }}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition flex items-center justify-center gap-2"
                      >
                        <Eye size={16} /> {t.view}
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
                      >
                        {t.add}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust/Marketing Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-800">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-bold text-white mb-1">{t.qualityGuaranteed}</h3>
              <p className="text-sm text-gray-400">{t.qualityDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold text-white mb-1">{t.fastShipping}</h3>
              <p className="text-sm text-gray-400">{t.fastDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-white mb-1">{t.securePayment}</h3>
              <p className="text-sm text-gray-400">{t.secureDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-bold text-white mb-1">{t.trustedBrand}</h3>
              <p className="text-sm text-gray-400">{t.trustedDesc}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // CART PAGE WITH SHIPPING CALCULATOR
  if (currentPage === 'cart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{t.shoppingCart}</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← {t.back}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{t.cartEmpty}</p>
              <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
              >
                {t.continueShopping}
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex gap-4">
                    <div className="text-5xl flex-shrink-0">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-purple-400 font-bold">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-pink-400">
                        <Minus size={18} />
                      </button>
                      <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-pink-400">
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 mt-2 text-sm">
                        {t.remove}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Calculator & Order Summary */}
              <div className="lg:col-span-1 space-y-4">
                {/* Shipping Calculator */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                    <Truck size={20} /> {t.calculator}
                  </h3>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">{t.selectCountry}</label>
                    <select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                    >
                      {Object.keys(shippingRates).map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 p-3 bg-slate-900 rounded-lg text-sm">
                    <p className="text-gray-300 mb-2">{t.weight}</p>
                    <p className="text-purple-400 font-bold">
                      🚚 {t.deliveryTime} {shipping.minDays}-{shipping.maxDays} {t.days}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      💰 {t.free} {t.shipping} {t.checked === false ? `over $${shipping.freeThreshold}` : ''}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 sticky top-24">
                  <h3 className="font-bold text-white text-lg mb-6">{t.orderSummary}</h3>
                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t.subtotal}</span>
                      <span className="text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t.tax}</span>
                      <span className="text-white">${(cartTotal * taxRate).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t.shipping}</span>
                      <span className={shippingCost === 0 ? "text-green-400 font-bold" : "text-white"}>{shippingCost === 0 ? t.free : `$${shippingCost}`}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="font-bold text-white">{t.total}</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">${finalTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
                  >
                    {t.checkout2}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showPaymentModal && <StripePaymentModal />}
      </div>
    );
  }

  // WISHLIST PAGE
  if (currentPage === 'wishlist') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{t.wishlist}</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← {t.back}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your wishlist is empty</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <div key={product.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-pink-500 transition">
                  <div className="bg-gradient-to-br from-slate-700 to-slate-900 h-40 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-white mb-3">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg"
                    >
                      {t.add}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // PRODUCT DETAIL PAGE
  if (currentPage === 'product-detail' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{t.productDetails}</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              ← {t.back}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 flex items-center justify-center h-96">
              <div className="text-8xl">{selectedProduct.image}</div>
            </div>
            <div>
              <p className="text-purple-400 text-sm font-bold uppercase mb-2">{selectedProduct.category}</p>
              <h1 className="text-4xl font-bold text-white mb-4">{selectedProduct.name}</h1>
              <p className="text-gray-400 text-sm mb-4 italic">{selectedProduct.marketingCopy}</p>
              
              <div className="mb-6">
                <StarRating rating={selectedProduct.rating} reviews={selectedProduct.reviews} />
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-white">${selectedProduct.price}</span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                )}
              </div>

              <p className="text-gray-300 mb-6">{selectedProduct.description}</p>

              <div className="mb-6">
                <h3 className="font-bold text-white mb-3">{t.availableColors}</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.colors.map((color, i) => (
                    <button key={i} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-purple-600 transition">
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-white mb-3">{t.keyFeatures}</h3>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 flex items-center gap-2">
                      <span className="text-purple-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setCurrentPage('home');
                }}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                {t.addToCart2}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
