// ===================== STATE =====================
let currentStep = 1;
let categories = [];
let products = [];
let editingProductIndex = null;
let editingCategoryIndex = null;
let generatedCode = { html: "", css: "", js: "" };
let currentOutputTab = "html";

// Default sample data
const MIN_PRODUCTS_PER_TEMPLATE = 20;

const TEMPLATE_CATALOGS = {
  clothing: {
    categories: [
      { id: "tops", nameEn: "Tops", nameAr: "Tops", image: "" },
      { id: "bottoms", nameEn: "Bottoms", nameAr: "Bottoms", image: "" },
      { id: "hoodies", nameEn: "Hoodies", nameAr: "Hoodies", image: "" },
      {
        id: "accessories",
        nameEn: "Accessories",
        nameAr: "Accessories",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Classic T-Shirt",
        nameAr: "Classic T-Shirt",
        price: 24,
        origPrice: null,
        category: "tops",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Oversized Tee",
        nameAr: "Oversized Tee",
        price: 28,
        origPrice: 35,
        category: "tops",
        image:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "sale",
        rating: 4.6,
      },
      {
        nameEn: "Slim-Fit Joggers",
        nameAr: "Slim-Fit Joggers",
        price: 19,
        origPrice: 26,
        category: "bottoms",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "sale",
        rating: 4.5,
      },
      {
        nameEn: "Cargo Pants",
        nameAr: "Cargo Pants",
        price: 39,
        origPrice: null,
        category: "bottoms",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "",
        rating: 4.7,
      },
      {
        nameEn: "Classic Hoodie",
        nameAr: "Classic Hoodie",
        price: 42,
        origPrice: null,
        category: "hoodies",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "",
        rating: 4.9,
      },
      {
        nameEn: "Zip Sweatshirt",
        nameAr: "Zip Sweatshirt",
        price: 46,
        origPrice: 54,
        category: "hoodies",
        image:
          "https://images.unsplash.com/photo-1503341338985-c0477be52513?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "sale",
        rating: 4.6,
      },
      {
        nameEn: "Street Cap",
        nameAr: "Street Cap",
        price: 16,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&q=80",
        sizes: ["One Size"],
        badge: "new",
        rating: 4.4,
      },
      {
        nameEn: "Canvas Tote Bag",
        nameAr: "Canvas Tote Bag",
        price: 18,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.5,
      },
    ],
  },
  pharmacy: {
    categories: [
      {
        id: "supplements",
        nameEn: "Supplements",
        nameAr: "Supplements",
        image: "",
      },
      { id: "vitamins", nameEn: "Vitamins", nameAr: "Vitamins", image: "" },
      { id: "skincare", nameEn: "Skincare", nameAr: "Skincare", image: "" },
      { id: "wellness", nameEn: "Wellness", nameAr: "Wellness", image: "" },
    ],
    products: [
      {
        nameEn: "Omega 3 Softgels",
        nameAr: "Omega 3 Softgels",
        price: 19,
        origPrice: 24,
        category: "supplements",
        image:
          "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80",
        sizes: ["60 Capsules"],
        badge: "sale",
        rating: 4.7,
      },
      {
        nameEn: "Whey Protein Isolate",
        nameAr: "Whey Protein Isolate",
        price: 42,
        origPrice: null,
        category: "supplements",
        image:
          "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&q=80",
        sizes: ["1 KG"],
        badge: "new",
        rating: 4.8,
      },
      {
        nameEn: "Vitamin C 1000mg",
        nameAr: "Vitamin C 1000mg",
        price: 14,
        origPrice: null,
        category: "vitamins",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
        sizes: ["90 Tablets"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Vitamin D3 + K2",
        nameAr: "Vitamin D3 + K2",
        price: 17,
        origPrice: 22,
        category: "vitamins",
        image:
          "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80",
        sizes: ["60 Capsules"],
        badge: "sale",
        rating: 4.7,
      },
      {
        nameEn: "Hydrating Face Cream",
        nameAr: "Hydrating Face Cream",
        price: 22,
        origPrice: null,
        category: "skincare",
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
        sizes: ["50 ml"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Sunscreen SPF 50",
        nameAr: "Sunscreen SPF 50",
        price: 18,
        origPrice: null,
        category: "skincare",
        image:
          "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80",
        sizes: ["75 ml"],
        badge: "new",
        rating: 4.8,
      },
      {
        nameEn: "Digital Thermometer",
        nameAr: "Digital Thermometer",
        price: 9,
        origPrice: null,
        category: "wellness",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.4,
      },
      {
        nameEn: "Sleep Support Gummies",
        nameAr: "Sleep Support Gummies",
        price: 16,
        origPrice: null,
        category: "wellness",
        image:
          "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&q=80",
        sizes: ["60 Gummies"],
        badge: "",
        rating: 4.6,
      },
    ],
  },
  electronics: {
    categories: [
      { id: "phones", nameEn: "Phones", nameAr: "Phones", image: "" },
      { id: "audio", nameEn: "Audio", nameAr: "Audio", image: "" },
      {
        id: "gaming",
        nameEn: "Gaming",
        nameAr: "Gaming",
        image: "",
      },
      {
        id: "accessories",
        nameEn: "Accessories",
        nameAr: "Accessories",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Smartphone X12",
        nameAr: "Smartphone X12",
        price: 699,
        origPrice: 749,
        category: "phones",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        sizes: ["128 GB"],
        badge: "sale",
        rating: 4.8,
      },
      {
        nameEn: "Smartphone Lite 5G",
        nameAr: "Smartphone Lite 5G",
        price: 399,
        origPrice: null,
        category: "phones",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
        sizes: ["128 GB"],
        badge: "new",
        rating: 4.6,
      },
      {
        nameEn: "Noise Canceling Headphones",
        nameAr: "Noise Canceling Headphones",
        price: 189,
        origPrice: 229,
        category: "audio",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        sizes: ["One Size"],
        badge: "sale",
        rating: 4.7,
      },
      {
        nameEn: "Wireless Earbuds Pro",
        nameAr: "Wireless Earbuds Pro",
        price: 129,
        origPrice: null,
        category: "audio",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Mechanical Keyboard",
        nameAr: "Mechanical Keyboard",
        price: 99,
        origPrice: null,
        category: "gaming",
        image:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
        sizes: ["One Size"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Gaming Mouse RGB",
        nameAr: "Gaming Mouse RGB",
        price: 59,
        origPrice: 69,
        category: "gaming",
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
        sizes: ["One Size"],
        badge: "sale",
        rating: 4.6,
      },
      {
        nameEn: "Fast Charger 65W",
        nameAr: "Fast Charger 65W",
        price: 39,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "USB-C Hub 8-in-1",
        nameAr: "USB-C Hub 8-in-1",
        price: 49,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.4,
      },
    ],
  },
  groceries: {
    categories: [
      { id: "fruits", nameEn: "Fruits", nameAr: "Fruits", image: "" },
      { id: "dairy", nameEn: "Dairy", nameAr: "Dairy", image: "" },
      { id: "pantry", nameEn: "Pantry", nameAr: "Pantry", image: "" },
      { id: "snacks", nameEn: "Snacks", nameAr: "Snacks", image: "" },
    ],
    products: [
      {
        nameEn: "Fresh Bananas",
        nameAr: "Fresh Bananas",
        price: 2,
        origPrice: null,
        category: "fruits",
        image:
          "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=500&q=80",
        sizes: ["1 KG"],
        badge: "new",
        rating: 4.6,
      },
      {
        nameEn: "Organic Apples",
        nameAr: "Organic Apples",
        price: 3,
        origPrice: null,
        category: "fruits",
        image:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&q=80",
        sizes: ["1 KG"],
        badge: "",
        rating: 4.7,
      },
      {
        nameEn: "Greek Yogurt",
        nameAr: "Greek Yogurt",
        price: 4,
        origPrice: null,
        category: "dairy",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80",
        sizes: ["500 g"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Cheddar Cheese",
        nameAr: "Cheddar Cheese",
        price: 6,
        origPrice: 8,
        category: "dairy",
        image:
          "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=500&q=80",
        sizes: ["250 g"],
        badge: "sale",
        rating: 4.6,
      },
      {
        nameEn: "Extra Virgin Olive Oil",
        nameAr: "Extra Virgin Olive Oil",
        price: 11,
        origPrice: null,
        category: "pantry",
        image:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
        sizes: ["750 ml"],
        badge: "",
        rating: 4.8,
      },
      {
        nameEn: "Basmati Rice",
        nameAr: "Basmati Rice",
        price: 8,
        origPrice: null,
        category: "pantry",
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
        sizes: ["2 KG"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Protein Bar Pack",
        nameAr: "Protein Bar Pack",
        price: 7,
        origPrice: null,
        category: "snacks",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",
        sizes: ["6 pcs"],
        badge: "new",
        rating: 4.4,
      },
      {
        nameEn: "Mixed Nuts Snack",
        nameAr: "Mixed Nuts Snack",
        price: 5,
        origPrice: null,
        category: "snacks",
        image:
          "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&q=80",
        sizes: ["300 g"],
        badge: "",
        rating: 4.5,
      },
    ],
  },
  restaurant: {
    categories: [
      { id: "burgers", nameEn: "Burgers", nameAr: "Burgers", image: "" },
      { id: "pizza", nameEn: "Pizza", nameAr: "Pizza", image: "" },
      { id: "salads", nameEn: "Salads", nameAr: "Salads", image: "" },
      { id: "drinks", nameEn: "Drinks", nameAr: "Drinks", image: "" },
    ],
    products: [
      {
        nameEn: "Smash Burger",
        nameAr: "Smash Burger",
        price: 9,
        origPrice: null,
        category: "burgers",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
        sizes: ["Regular"],
        badge: "best",
        rating: 4.8,
      },
      {
        nameEn: "Chicken Burger",
        nameAr: "Chicken Burger",
        price: 8,
        origPrice: null,
        category: "burgers",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
        sizes: ["Regular"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Margherita Pizza",
        nameAr: "Margherita Pizza",
        price: 11,
        origPrice: null,
        category: "pizza",
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80",
        sizes: ["Medium"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Pepperoni Pizza",
        nameAr: "Pepperoni Pizza",
        price: 13,
        origPrice: 15,
        category: "pizza",
        image:
          "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&q=80",
        sizes: ["Medium"],
        badge: "sale",
        rating: 4.8,
      },
      {
        nameEn: "Caesar Salad",
        nameAr: "Caesar Salad",
        price: 7,
        origPrice: null,
        category: "salads",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
        sizes: ["Regular"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Quinoa Bowl",
        nameAr: "Quinoa Bowl",
        price: 8,
        origPrice: null,
        category: "salads",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80",
        sizes: ["Regular"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Fresh Lemonade",
        nameAr: "Fresh Lemonade",
        price: 3,
        origPrice: null,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=500&q=80",
        sizes: ["350 ml"],
        badge: "",
        rating: 4.4,
      },
      {
        nameEn: "Iced Tea",
        nameAr: "Iced Tea",
        price: 3,
        origPrice: null,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80",
        sizes: ["350 ml"],
        badge: "",
        rating: 4.4,
      },
    ],
  },
  coffeeshop: {
    categories: [
      { id: "espresso", nameEn: "Espresso", nameAr: "Espresso", image: "" },
      { id: "cold", nameEn: "Cold Drinks", nameAr: "Cold Drinks", image: "" },
      { id: "pastries", nameEn: "Pastries", nameAr: "Pastries", image: "" },
      {
        id: "beans",
        nameEn: "Coffee Beans",
        nameAr: "Coffee Beans",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Espresso Shot",
        nameAr: "Espresso Shot",
        price: 2,
        origPrice: null,
        category: "espresso",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
        sizes: ["Single"],
        badge: "",
        rating: 4.7,
      },
      {
        nameEn: "Cappuccino",
        nameAr: "Cappuccino",
        price: 4,
        origPrice: null,
        category: "espresso",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        sizes: ["Medium"],
        badge: "best",
        rating: 4.8,
      },
      {
        nameEn: "Iced Latte",
        nameAr: "Iced Latte",
        price: 5,
        origPrice: null,
        category: "cold",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
        sizes: ["Large"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Cold Brew",
        nameAr: "Cold Brew",
        price: 5,
        origPrice: null,
        category: "cold",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80",
        sizes: ["Large"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Butter Croissant",
        nameAr: "Butter Croissant",
        price: 3,
        origPrice: null,
        category: "pastries",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Chocolate Muffin",
        nameAr: "Chocolate Muffin",
        price: 3,
        origPrice: null,
        category: "pastries",
        image:
          "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.4,
      },
      {
        nameEn: "House Blend Beans",
        nameAr: "House Blend Beans",
        price: 12,
        origPrice: null,
        category: "beans",
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80",
        sizes: ["250 g"],
        badge: "",
        rating: 4.8,
      },
      {
        nameEn: "Dark Roast Beans",
        nameAr: "Dark Roast Beans",
        price: 13,
        origPrice: null,
        category: "beans",
        image:
          "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=500&q=80",
        sizes: ["250 g"],
        badge: "",
        rating: 4.7,
      },
    ],
  },
  nuts: {
    categories: [
      { id: "raw", nameEn: "Raw Nuts", nameAr: "Raw Nuts", image: "" },
      {
        id: "roasted",
        nameEn: "Roasted Nuts",
        nameAr: "Roasted Nuts",
        image: "",
      },
      { id: "mixes", nameEn: "Nut Mixes", nameAr: "Nut Mixes", image: "" },
      {
        id: "dried",
        nameEn: "Dried Fruits",
        nameAr: "Dried Fruits",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Raw Almonds",
        nameAr: "Raw Almonds",
        price: 9,
        origPrice: null,
        category: "raw",
        image:
          "https://images.unsplash.com/photo-1508747703725-719777637510?w=500&q=80",
        sizes: ["500 g"],
        badge: "",
        rating: 4.7,
      },
      {
        nameEn: "Raw Cashews",
        nameAr: "Raw Cashews",
        price: 10,
        origPrice: null,
        category: "raw",
        image:
          "https://images.unsplash.com/photo-1606923829579-0cb981a83e2b?w=500&q=80",
        sizes: ["500 g"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Roasted Pistachios",
        nameAr: "Roasted Pistachios",
        price: 12,
        origPrice: null,
        category: "roasted",
        image:
          "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&q=80",
        sizes: ["500 g"],
        badge: "best",
        rating: 4.9,
      },
      {
        nameEn: "Salted Peanuts",
        nameAr: "Salted Peanuts",
        price: 6,
        origPrice: null,
        category: "roasted",
        image:
          "https://images.unsplash.com/photo-1615485291234-9fbc8d7f2f2a?w=500&q=80",
        sizes: ["500 g"],
        badge: "",
        rating: 4.4,
      },
      {
        nameEn: "Premium Trail Mix",
        nameAr: "Premium Trail Mix",
        price: 11,
        origPrice: null,
        category: "mixes",
        image:
          "https://images.unsplash.com/photo-1590080875986-b5ea53b06f27?w=500&q=80",
        sizes: ["500 g"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Energy Nut Mix",
        nameAr: "Energy Nut Mix",
        price: 10,
        origPrice: 12,
        category: "mixes",
        image:
          "https://images.unsplash.com/photo-1604152135912-04a579f12f45?w=500&q=80",
        sizes: ["500 g"],
        badge: "sale",
        rating: 4.6,
      },
      {
        nameEn: "Dried Apricots",
        nameAr: "Dried Apricots",
        price: 8,
        origPrice: null,
        category: "dried",
        image:
          "https://images.unsplash.com/photo-1603052875687-8b9f530db70f?w=500&q=80",
        sizes: ["400 g"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Medjool Dates",
        nameAr: "Medjool Dates",
        price: 14,
        origPrice: null,
        category: "dried",
        image:
          "https://images.unsplash.com/photo-1606914610862-e2f8d7f4c2b9?w=500&q=80",
        sizes: ["500 g"],
        badge: "",
        rating: 4.8,
      },
    ],
  },
  beauty: {
    categories: [
      { id: "makeup", nameEn: "Makeup", nameAr: "Makeup", image: "" },
      { id: "skincare", nameEn: "Skincare", nameAr: "Skincare", image: "" },
      {
        id: "fragrance",
        nameEn: "Fragrance",
        nameAr: "Fragrance",
        image: "",
      },
      {
        id: "haircare",
        nameEn: "Haircare",
        nameAr: "Haircare",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Matte Lipstick",
        nameAr: "Matte Lipstick",
        price: 15,
        origPrice: null,
        category: "makeup",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
        sizes: ["One Size"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Liquid Foundation",
        nameAr: "Liquid Foundation",
        price: 24,
        origPrice: null,
        category: "makeup",
        image:
          "https://images.unsplash.com/photo-1599733589046-84d481f1f6fa?w=500&q=80",
        sizes: ["30 ml"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Vitamin C Serum",
        nameAr: "Vitamin C Serum",
        price: 21,
        origPrice: 27,
        category: "skincare",
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
        sizes: ["30 ml"],
        badge: "sale",
        rating: 4.8,
      },
      {
        nameEn: "Hydrating Cleanser",
        nameAr: "Hydrating Cleanser",
        price: 14,
        origPrice: null,
        category: "skincare",
        image:
          "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=500&q=80",
        sizes: ["200 ml"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Floral Perfume",
        nameAr: "Floral Perfume",
        price: 48,
        origPrice: null,
        category: "fragrance",
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
        sizes: ["50 ml"],
        badge: "best",
        rating: 4.8,
      },
      {
        nameEn: "Woody Perfume",
        nameAr: "Woody Perfume",
        price: 52,
        origPrice: 59,
        category: "fragrance",
        image:
          "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80",
        sizes: ["50 ml"],
        badge: "sale",
        rating: 4.7,
      },
      {
        nameEn: "Repair Hair Mask",
        nameAr: "Repair Hair Mask",
        price: 19,
        origPrice: null,
        category: "haircare",
        image:
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
        sizes: ["250 ml"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Sulfate-Free Shampoo",
        nameAr: "Sulfate-Free Shampoo",
        price: 16,
        origPrice: null,
        category: "haircare",
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
        sizes: ["300 ml"],
        badge: "",
        rating: 4.5,
      },
    ],
  },
  sports: {
    categories: [
      { id: "gear", nameEn: "Gym Gear", nameAr: "Gym Gear", image: "" },
      {
        id: "activewear",
        nameEn: "Activewear",
        nameAr: "Activewear",
        image: "",
      },
      { id: "recovery", nameEn: "Recovery", nameAr: "Recovery", image: "" },
      {
        id: "accessories",
        nameEn: "Accessories",
        nameAr: "Accessories",
        image: "",
      },
    ],
    products: [
      {
        nameEn: "Adjustable Dumbbells",
        nameAr: "Adjustable Dumbbells",
        price: 189,
        origPrice: 229,
        category: "gear",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
        sizes: ["20 KG"],
        badge: "sale",
        rating: 4.9,
      },
      {
        nameEn: "Kettlebell",
        nameAr: "Kettlebell",
        price: 39,
        origPrice: null,
        category: "gear",
        image:
          "https://images.unsplash.com/photo-1571019613914-85f342c55f95?w=500&q=80",
        sizes: ["12 KG"],
        badge: "",
        rating: 4.7,
      },
      {
        nameEn: "Training T-Shirt",
        nameAr: "Training T-Shirt",
        price: 22,
        origPrice: null,
        category: "activewear",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "new",
        rating: 4.6,
      },
      {
        nameEn: "Compression Leggings",
        nameAr: "Compression Leggings",
        price: 29,
        origPrice: 35,
        category: "activewear",
        image:
          "https://images.unsplash.com/photo-1506629905607-bb5e1d9d68fc?w=500&q=80",
        sizes: ["S", "M", "L", "XL"],
        badge: "sale",
        rating: 4.7,
      },
      {
        nameEn: "Foam Roller",
        nameAr: "Foam Roller",
        price: 18,
        origPrice: null,
        category: "recovery",
        image:
          "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Massage Ball Set",
        nameAr: "Massage Ball Set",
        price: 14,
        origPrice: null,
        category: "recovery",
        image:
          "https://images.unsplash.com/photo-1594737625785-c8f52b0b6b31?w=500&q=80",
        sizes: ["Set of 2"],
        badge: "",
        rating: 4.4,
      },
      {
        nameEn: "Resistance Bands Kit",
        nameAr: "Resistance Bands Kit",
        price: 21,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80",
        sizes: ["Set"],
        badge: "best",
        rating: 4.8,
      },
      {
        nameEn: "Gym Bottle 1L",
        nameAr: "Gym Bottle 1L",
        price: 12,
        origPrice: null,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&q=80",
        sizes: ["1 L"],
        badge: "",
        rating: 4.5,
      },
    ],
  },
  furniture: {
    categories: [
      {
        id: "living",
        nameEn: "Living Room",
        nameAr: "Living Room",
        image: "",
      },
      { id: "bedroom", nameEn: "Bedroom", nameAr: "Bedroom", image: "" },
      { id: "office", nameEn: "Office", nameAr: "Office", image: "" },
      { id: "decor", nameEn: "Decor", nameAr: "Decor", image: "" },
    ],
    products: [
      {
        nameEn: "Modular Sofa",
        nameAr: "Modular Sofa",
        price: 799,
        origPrice: 899,
        category: "living",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
        sizes: ["3 Seats"],
        badge: "sale",
        rating: 4.8,
      },
      {
        nameEn: "Coffee Table",
        nameAr: "Coffee Table",
        price: 149,
        origPrice: null,
        category: "living",
        image:
          "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&q=80",
        sizes: ["120 cm"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Queen Bed Frame",
        nameAr: "Queen Bed Frame",
        price: 499,
        origPrice: null,
        category: "bedroom",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
        sizes: ["Queen"],
        badge: "new",
        rating: 4.7,
      },
      {
        nameEn: "Nightstand Set",
        nameAr: "Nightstand Set",
        price: 179,
        origPrice: 210,
        category: "bedroom",
        image:
          "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&q=80",
        sizes: ["Set of 2"],
        badge: "sale",
        rating: 4.5,
      },
      {
        nameEn: "Ergonomic Desk",
        nameAr: "Ergonomic Desk",
        price: 299,
        origPrice: null,
        category: "office",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
        sizes: ["140 cm"],
        badge: "",
        rating: 4.6,
      },
      {
        nameEn: "Office Chair",
        nameAr: "Office Chair",
        price: 189,
        origPrice: null,
        category: "office",
        image:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80",
        sizes: ["One Size"],
        badge: "best",
        rating: 4.8,
      },
      {
        nameEn: "Wall Mirror",
        nameAr: "Wall Mirror",
        price: 89,
        origPrice: null,
        category: "decor",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
        sizes: ["80 cm"],
        badge: "",
        rating: 4.5,
      },
      {
        nameEn: "Floor Lamp",
        nameAr: "Floor Lamp",
        price: 109,
        origPrice: null,
        category: "decor",
        image:
          "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&q=80",
        sizes: ["One Size"],
        badge: "",
        rating: 4.6,
      },
    ],
  },
};

function ensureMinimumTemplateProducts(productsList, categoriesList, minCount) {
  if (!Array.isArray(productsList) || productsList.length === 0) return [];

  const fallbackCategory = categoriesList[0]?.id || "general";
  const normalized = productsList.map((product) => ({
    ...product,
    category:
      categoriesList.some((category) => category.id === product.category)
        ? product.category
        : fallbackCategory,
    sizes:
      Array.isArray(product.sizes) && product.sizes.length > 0
        ? product.sizes
        : ["One Size"],
    badge: product.badge || "",
    rating: Number.isFinite(product.rating) ? product.rating : 4.6,
    origPrice: Number.isFinite(product.origPrice) ? product.origPrice : null,
  }));

  let cloneIndex = 0;
  while (normalized.length < minCount) {
    const source = normalized[cloneIndex % productsList.length];
    const edition = Math.floor(cloneIndex / productsList.length) + 2;
    normalized.push({
      ...source,
      nameEn: `${source.nameEn} ${edition}`,
      nameAr: `${source.nameAr || source.nameEn} ${edition}`,
      badge: source.badge || (edition % 2 === 0 ? "new" : "sale"),
    });
    cloneIndex++;
  }

  return normalized;
}

function getTemplateCatalog(template) {
  const source = TEMPLATE_CATALOGS[template] || TEMPLATE_CATALOGS.clothing;
  const templateCategories = source.categories.map((category) => ({
    ...category,
    image: category.image || "",
  }));
  const templateProducts = ensureMinimumTemplateProducts(
    source.products,
    templateCategories,
    MIN_PRODUCTS_PER_TEMPLATE,
  );

  return {
    categories: templateCategories,
    products: templateProducts,
  };
}

function applyTemplateCatalog(template) {
  const catalog = getTemplateCatalog(template);
  categories = catalog.categories.map((category) => ({ ...category }));
  products = catalog.products.map((product) => ({
    ...product,
    sizes: [...product.sizes],
  }));
  renderCategories();
  renderProducts();
}

const testContent = {
  businessNameEn: "Demo Style Shop",
  businessNameAr:
    "\u0645\u062a\u062c\u0631 \u0633\u062a\u0627\u064a\u0644 \u062a\u062c\u0631\u064a\u0628\u064a",
  taglineEn: "Fresh everyday essentials",
  taglineAr:
    "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0639\u0635\u0631\u064a\u0629 \u0644\u0643\u0644 \u064a\u0648\u0645",
  aboutEn:
    "A test storefront with ready-to-preview products, fast WhatsApp ordering, and bilingual content.",
  aboutAr:
    "\u0645\u062a\u062c\u0631 \u062a\u062c\u0631\u064a\u0628\u064a \u0628\u0645\u0646\u062a\u062c\u0627\u062a \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0645\u0639\u0627\u064a\u0646\u0629 \u0648\u0637\u0644\u0628 \u0633\u0631\u064a\u0639 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628.",
  customerCount: "1250",
  whatsappNumber: "96181982312",
  phoneNumber: "+961 81 982 312",
  instagram: "@demostyleshop",
  email: "hello@demostyleshop.com",
  location: "Lebanon - Ships Nationwide",
  mapLocation: "Hamra, Beirut, Lebanon",
  carouselImages: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  ].join("\n"),
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  customerFeedback: [
    "Maya Haddad | \u0645\u0627\u064a\u0627 \u062d\u062f\u0627\u062f | Beirut | \u0628\u064a\u0631\u0648\u062a | 5 | The products arrived quickly and looked exactly like the photos. | \u0648\u0635\u0644\u062a \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0628\u0633\u0631\u0639\u0629 \u0648\u0643\u0627\u0646\u062a \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0635\u0648\u0631.",
    "Karim Mansour | \u0643\u0631\u064a\u0645 \u0645\u0646\u0635\u0648\u0631 | Tripoli | \u0637\u0631\u0627\u0628\u0644\u0633 | 4.8 | Clean website, easy ordering, and very responsive support. | \u0645\u0648\u0642\u0639 \u0645\u0631\u062a\u0628 \u0648\u0637\u0644\u0628 \u0633\u0647\u0644 \u0648\u062f\u0639\u0645 \u0633\u0631\u064a\u0639.",
    "Rana Khoury | \u0631\u0646\u0627 \u062e\u0648\u0631\u064a | Saida | \u0635\u064a\u062f\u0627 | 5 | I loved the packaging and the WhatsApp checkout was simple. | \u0623\u062d\u0628\u0628\u062a \u0627\u0644\u062a\u063a\u0644\u064a\u0641 \u0648\u0643\u0627\u0646 \u0627\u0644\u0637\u0644\u0628 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628 \u0633\u0647\u0644\u0627\u064b.",
    "Elie Nassar | \u0625\u064a\u0644\u064a \u0646\u0635\u0627\u0631 | Byblos | \u062c\u0628\u064a\u0644 | 4.9 | Great quality and clear product details before buying. | \u062c\u0648\u062f\u0629 \u0645\u0645\u062a\u0627\u0632\u0629 \u0648\u062a\u0641\u0627\u0635\u064a\u0644 \u0648\u0627\u0636\u062d\u0629 \u0642\u0628\u0644 \u0627\u0644\u0634\u0631\u0627\u0621.",
    "Nour Daher | \u0646\u0648\u0631 \u0636\u0627\u0647\u0631 | Zahle | \u0632\u062d\u0644\u0629 | 5 | The team helped me pick the right size and delivery was smooth. | \u0633\u0627\u0639\u062f\u0646\u064a \u0627\u0644\u0641\u0631\u064a\u0642 \u0628\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0633 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0648\u0643\u0627\u0646 \u0627\u0644\u062a\u0648\u0635\u064a\u0644 \u0633\u0644\u0633\u0627\u064b.",
  ].join("\n"),
};

const FONT_LIBRARY = {
  inter: {
    css: "'Inter', sans-serif",
    google: "Inter:wght@300;400;500;600;700;800",
  },
  poppins: {
    css: "'Poppins', sans-serif",
    google: "Poppins:wght@300;400;500;600;700;800",
  },
  montserrat: {
    css: "'Montserrat', sans-serif",
    google: "Montserrat:wght@300;400;500;600;700;800",
  },
  nunito: {
    css: "'Nunito', sans-serif",
    google: "Nunito:wght@300;400;500;600;700;800",
  },
  roboto: {
    css: "'Roboto', sans-serif",
    google: "Roboto:wght@300;400;500;700;900",
  },
  lora: { css: "'Lora', serif", google: "Lora:wght@400;500;600;700" },
  playfair: {
    css: "'Playfair Display', serif",
    google: "Playfair+Display:wght@400;500;600;700;800",
  },
  tajawal: {
    css: "'Tajawal', sans-serif",
    google: "Tajawal:wght@300;400;500;700;800",
  },
  cairo: {
    css: "'Cairo', sans-serif",
    google: "Cairo:wght@300;400;500;600;700;800",
  },
  almarai: {
    css: "'Almarai', sans-serif",
    google: "Almarai:wght@300;400;700;800",
  },
  changa: {
    css: "'Changa', sans-serif",
    google: "Changa:wght@300;400;500;600;700;800",
  },
  notoSansArabic: {
    css: "'Noto Sans Arabic', sans-serif",
    google: "Noto+Sans+Arabic:wght@300;400;500;600;700;800",
  },
  notoKufiArabic: {
    css: "'Noto Kufi Arabic', sans-serif",
    google: "Noto+Kufi+Arabic:wght@300;400;500;600;700;800",
  },
  amiri: { css: "'Amiri', serif", google: "Amiri:wght@400;700" },
};

function getVariationFontDefaults(variation) {
  const variationFonts = {
    modern: {
      enHeading: "inter",
      enBody: "inter",
      arHeading: "tajawal",
      arBody: "tajawal",
    },
    bold: {
      enHeading: "montserrat",
      enBody: "inter",
      arHeading: "changa",
      arBody: "tajawal",
    },
    elegant: {
      enHeading: "playfair",
      enBody: "lora",
      arHeading: "amiri",
      arBody: "tajawal",
    },
    playful: {
      enHeading: "poppins",
      enBody: "nunito",
      arHeading: "cairo",
      arBody: "cairo",
    },
    minimal: {
      enHeading: "inter",
      enBody: "inter",
      arHeading: "notoSansArabic",
      arBody: "notoSansArabic",
    },
    luxury: {
      enHeading: "playfair",
      enBody: "lora",
      arHeading: "amiri",
      arBody: "amiri",
    },
  };

  return variationFonts[variation] || variationFonts.modern;
}

function resolveFont(key, fallbackKey) {
  return FONT_LIBRARY[key] || FONT_LIBRARY[fallbackKey] || FONT_LIBRARY.inter;
}

function getDesignFonts(data = {}) {
  const fallback = getVariationFontDefaults(data.variation);

  return {
    enHeading: resolveFont(data.enHeadingFont, fallback.enHeading),
    enBody: resolveFont(data.enBodyFont, fallback.enBody),
    arHeading: resolveFont(data.arHeadingFont, fallback.arHeading),
    arBody: resolveFont(data.arBodyFont, fallback.arBody),
  };
}

function buildGoogleFontsHref(data = {}) {
  const fonts = getDesignFonts(data);
  const families = [
    ...new Set([
      fonts.enHeading.google,
      fonts.enBody.google,
      fonts.arHeading.google,
      fonts.arBody.google,
    ]),
  ];
  return `https://fonts.googleapis.com/css2?${families.map((family) => `family=${family}`).join("&")}&display=swap`;
}

function normalizeHex(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : fallback;
}

function composePreviewDocument(code) {
  if (!code || !code.html) return "";

  return code.html
    .replace(
      '<link rel="stylesheet" href="styles.css">',
      "<style>" + code.css + "</style>",
    )
    .replace(
      '<script src="script.js"><\/script>',
      "<script>" + code.js + "<\/script>",
    );
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize with the selected template catalog
  const initialTemplate =
    document.querySelector('input[name="template"]:checked')?.value ||
    "clothing";
  applyTemplateCatalog(initialTemplate);
  prefillTestContent();

  updatePreview();

  // Theme toggle
  const savedTheme = localStorage.getItem("generator-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    updateThemeIcon();
  }

  // Color input sync
  [
    "primaryColor",
    "secondaryColor",
    "tertiaryColor",
    "lightBgColor",
    "lightSurfaceColor",
    "lightSurface2Color",
    "lightTextColor",
    "lightMutedColor",
    "lightBorderColor",
    "darkPrimaryColor",
    "darkSecondaryColor",
    "darkTertiaryColor",
    "darkBgColor",
    "darkSurfaceColor",
    "darkSurface2Color",
    "darkTextColor",
    "darkMutedColor",
    "darkBorderColor",
    "bannerStartColor",
    "bannerEndColor",
    "imageRingColor",
    "imageOverlayColor",
    "heroCardColor",
  ].forEach((colorId) => setupColorSync(colorId, `${colorId}Text`));

  // Mobile menu
  document
    .getElementById("mobileMenuBtn")
    .addEventListener("click", openMobileMenu);
  document
    .getElementById("mobileMenuClose")
    .addEventListener("click", closeMobileMenu);
  document
    .getElementById("mobileOverlay")
    .addEventListener("click", closeMobileMenu);

  // Form input listeners for live preview
  const formInputs = document.querySelectorAll("input, select, textarea");
  const debouncedPreview = debounce(updatePreview, 300);
  formInputs.forEach((input) => {
    input.addEventListener("input", debouncedPreview);
    input.addEventListener("change", updatePreview);
  });

  // Template selection listener — auto-apply color presets
  const templateColorPresets = {
    clothing: ["#1a1a1a", "#d4a017", "#0ea5e9"],
    pharmacy: ["#059669", "#34d399", "#0ea5e9"],
    electronics: ["#1e40af", "#60a5fa", "#22d3ee"],
    groceries: ["#16a34a", "#facc15", "#fb7185"],
    restaurant: ["#c2410c", "#fb923c", "#fbbf24"],
    coffeeshop: ["#78350f", "#d97706", "#f59e0b"],
    nuts: ["#92400e", "#fbbf24", "#fb923c"],
    beauty: ["#9d174d", "#f472b6", "#a855f7"],
    sports: ["#1d4ed8", "#ef4444", "#f59e0b"],
    furniture: ["#44403c", "#a8a29e", "#0f766e"],
  };
  document.querySelectorAll('input[name="template"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      applyTemplateCatalog(radio.value);
      const [p, s, t] =
        templateColorPresets[radio.value] || templateColorPresets.clothing;
      document.getElementById("primaryColor").value = p;
      document.getElementById("primaryColorText").value = p;
      document.getElementById("secondaryColor").value = s;
      document.getElementById("secondaryColorText").value = s;
      document.getElementById("tertiaryColor").value = t;
      document.getElementById("tertiaryColorText").value = t;
      updatePreview();
    });
  });
});

function prefillTestContent(force = false) {
  Object.entries(testContent).forEach(([id, value]) => {
    const field = document.getElementById(id);

    if (field && (force || !field.value)) {
      field.value = value;
    }
  });
}

function prefillDemoData() {
  const template =
    document.querySelector('input[name="template"]:checked')?.value ||
    "clothing";

  const hasExistingForm =
    Boolean(String(document.getElementById("businessNameEn")?.value || "").trim()) ||
    Boolean(String(document.getElementById("businessNameAr")?.value || "").trim()) ||
    Boolean(String(document.getElementById("whatsappNumber")?.value || "").trim());
  const hasExistingCatalog = categories.length > 0 || products.length > 0;

  if (
    (hasExistingForm || hasExistingCatalog) &&
    !confirm(
      "This will overwrite the current form values and replace categories/products with demo data. Continue?",
    )
  ) {
    return;
  }

  prefillTestContent(true);
  applyTemplateCatalog(template);
  updatePreview();
}

function parseListInput(value) {
  const source = String(value || "").trim();

  if (!source) return [];

  return source
    .split(source.includes("\n") ? /\r?\n/ : ",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getHeroCarouselImages(data) {
  const imageUrls = parseListInput(data.carouselImages);

  if (imageUrls.length > 0) {
    return imageUrls.slice(0, 6);
  }

  const productImages = (data.products || [])
    .map((product) => product.image)
    .filter(Boolean);

  if (productImages.length > 0) {
    return productImages.slice(0, 6);
  }

  return [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  ];
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getVideoMedia(videoUrl) {
  const url = String(videoUrl || "").trim();

  if (!url) return null;

  const hasProtocol = /^https?:\/\//i.test(url);
  const normalizedUrl = hasProtocol ? url : `https://${url}`;

  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(normalizedUrl)) {
    return { type: "video", src: normalizedUrl };
  }

  try {
    const parsed = new URL(normalizedUrl);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id)
        return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const watchId = parsed.searchParams.get("v");
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const id =
        watchId ||
        (pathParts[0] === "shorts" || pathParts[0] === "embed"
          ? pathParts[1]
          : "");
      if (id)
        return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname
        .split("/")
        .filter(Boolean)
        .find((part) => /^\d+$/.test(part));
      if (id)
        return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
  } catch (error) {
    return { type: "iframe", src: normalizedUrl };
  }

    return { type: "iframe", src: normalizedUrl };
}

function getAutoplayIframeSrc(src) {
  const rawSrc = String(src || "").trim();

  if (!rawSrc) return "";

  try {
    const parsed = new URL(rawSrc);
    parsed.searchParams.set("autoplay", "1");
    parsed.searchParams.set("mute", "0");
    parsed.searchParams.set("muted", "0");
    parsed.searchParams.set("playsinline", "1");

    if (parsed.hostname.includes("youtube")) {
      parsed.searchParams.set("enablejsapi", "1");
    }

    return parsed.toString();
  } catch (error) {
    const joiner = rawSrc.includes("?") ? "&" : "?";
    return rawSrc + joiner + "autoplay=1&mute=0&muted=0&playsinline=1";
  }
}

function getDefaultCustomerFeedback() {
  return [
    {
      nameEn: "Maya Haddad",
      nameAr: "\u0645\u0627\u064a\u0627 \u062d\u062f\u0627\u062f",
      cityEn: "Beirut",
      cityAr: "\u0628\u064a\u0631\u0648\u062a",
      rating: 5,
      textEn:
        "The products arrived quickly and looked exactly like the photos.",
      textAr:
        "\u0648\u0635\u0644\u062a \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0628\u0633\u0631\u0639\u0629 \u0648\u0643\u0627\u0646\u062a \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0635\u0648\u0631.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Karim Mansour",
      nameAr: "\u0643\u0631\u064a\u0645 \u0645\u0646\u0635\u0648\u0631",
      cityEn: "Tripoli",
      cityAr: "\u0637\u0631\u0627\u0628\u0644\u0633",
      rating: 4.8,
      textEn: "Clean website, easy ordering, and very responsive support.",
      textAr:
        "\u0645\u0648\u0642\u0639 \u0645\u0631\u062a\u0628 \u0648\u0637\u0644\u0628 \u0633\u0647\u0644 \u0648\u062f\u0639\u0645 \u0633\u0631\u064a\u0639.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Rana Khoury",
      nameAr: "\u0631\u0646\u0627 \u062e\u0648\u0631\u064a",
      cityEn: "Saida",
      cityAr: "\u0635\u064a\u062f\u0627",
      rating: 5,
      textEn: "I loved the packaging and the WhatsApp checkout was simple.",
      textAr:
        "\u0623\u062d\u0628\u0628\u062a \u0627\u0644\u062a\u063a\u0644\u064a\u0641 \u0648\u0643\u0627\u0646 \u0627\u0644\u0637\u0644\u0628 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628 \u0633\u0647\u0644\u0627\u064b.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Elie Nassar",
      nameAr: "Elie Nassar",
      cityEn: "Byblos",
      cityAr: "Byblos",
      rating: 4.9,
      textEn: "Great quality and clear product details before buying.",
      textAr: "Great quality and clear product details before buying.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Nour Daher",
      nameAr: "Nour Daher",
      cityEn: "Zahle",
      cityAr: "Zahle",
      rating: 5,
      textEn: "The team helped me pick the right size and delivery was smooth.",
      textAr: "The team helped me pick the right size and delivery was smooth.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Tala Saad",
      nameAr: "Tala Saad",
      cityEn: "Jounieh",
      cityAr: "Jounieh",
      rating: 4.7,
      textEn: "The photos were accurate and the order arrived neatly packed.",
      textAr: "The photos were accurate and the order arrived neatly packed.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Omar Fares",
      nameAr: "Omar Fares",
      cityEn: "Beirut",
      cityAr: "Beirut",
      rating: 5,
      textEn: "Fast replies on WhatsApp and the checkout felt effortless.",
      textAr: "Fast replies on WhatsApp and the checkout felt effortless.",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Lina Barakat",
      nameAr: "Lina Barakat",
      cityEn: "Baalbek",
      cityAr: "Baalbek",
      rating: 4.8,
      textEn:
        "Lovely service, fair prices, and the product colors matched perfectly.",
      textAr:
        "Lovely service, fair prices, and the product colors matched perfectly.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Hadi Salameh",
      nameAr: "Hadi Salameh",
      cityEn: "Batroun",
      cityAr: "Batroun",
      rating: 4.9,
      textEn: "I found what I wanted quickly and reordering was very easy.",
      textAr: "I found what I wanted quickly and reordering was very easy.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Mira Aoun",
      nameAr: "Mira Aoun",
      cityEn: "Tyre",
      cityAr: "Tyre",
      rating: 5,
      textEn:
        "The store felt trustworthy and the product recommendations helped a lot.",
      textAr:
        "The store felt trustworthy and the product recommendations helped a lot.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Samir Karam",
      nameAr: "Samir Karam",
      cityEn: "Aley",
      cityAr: "Aley",
      rating: 4.6,
      textEn: "Everything was clear from browsing to confirming the order.",
      textAr: "Everything was clear from browsing to confirming the order.",
      image:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Dina Rahme",
      nameAr: "Dina Rahme",
      cityEn: "Keserwan",
      cityAr: "Keserwan",
      rating: 5,
      textEn: "Beautiful presentation and the delivery updates were clear.",
      textAr: "Beautiful presentation and the delivery updates were clear.",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Jad Khoury",
      nameAr: "Jad Khoury",
      cityEn: "Chouf",
      cityAr: "Chouf",
      rating: 4.8,
      textEn:
        "The product page answered every question before I messaged them.",
      textAr:
        "The product page answered every question before I messaged them.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Aya Matar",
      nameAr: "Aya Matar",
      cityEn: "Dbayeh",
      cityAr: "Dbayeh",
      rating: 4.9,
      textEn: "Smooth shopping experience and the support team was kind.",
      textAr: "Smooth shopping experience and the support team was kind.",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=160&h=160&fit=crop&q=80",
    },
    {
      nameEn: "Marc Haddad",
      nameAr: "Marc Haddad",
      cityEn: "Matn",
      cityAr: "Matn",
      rating: 5,
      textEn:
        "Quick delivery, polished packaging, and excellent product quality.",
      textAr:
        "Quick delivery, polished packaging, and excellent product quality.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&q=80",
    },
  ];
}

function getCustomerFeedback(data) {
  const defaults = getDefaultCustomerFeedback();
  const rows = String(data.customerFeedback || "")
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);
  const parsed = rows
    .map((row, index) => {
      const parts = row.split("|").map((part) => part.trim());
      const [nameEn, nameAr, cityEn, cityAr, rating, textEn, textAr, image] =
        parts;

      if (!nameEn || !cityEn || !textEn) return null;

      return {
        nameEn,
        nameAr: nameAr || nameEn,
        cityEn,
        cityAr: cityAr || cityEn,
        rating: Math.max(1, Math.min(5, parseFloat(rating) || 5)),
        textEn,
        textAr: textAr || textEn,
        image: image || defaults[index % defaults.length].image,
      };
    })
    .filter(Boolean);

  const feedback = parsed.length ? parsed : [...defaults];
  while (feedback.length < 15) {
    feedback.push({ ...defaults[feedback.length % defaults.length] });
  }

    return feedback;
}

function getCustomerCount(data, feedback = []) {
  const enteredCount = parseInt(String(data.customerCount || "").replace(/,/g, ""), 10);

  if (!Number.isNaN(enteredCount) && enteredCount > 0) {
    return enteredCount;
  }

  const reviewEstimate = Math.max(feedback.length * 42, 0);
  const productEstimate = Math.max((data.products || []).length * 65, 0);

  return Math.max(250, reviewEstimate, productEstimate);
}

function getAverageRating(feedback = []) {
  if (!feedback.length) return "5.0";

  const total = feedback.reduce((sum, item) => {
    return sum + Math.max(1, Math.min(5, parseFloat(item.rating) || 5));
  }, 0);

  return (total / feedback.length).toFixed(1);
}

function formatStatValue(value) {
  const number = parseInt(value, 10);

  if (Number.isNaN(number)) return String(value || "");

  return number.toLocaleString("en-US");
}

function getMapData(data) {
  const rawLocation = String(data.mapLocation || data.location || "").trim();

  if (!rawLocation) return null;

  const isUrl = /^https?:\/\//i.test(rawLocation);
  let query = rawLocation;

  if (isUrl) {
    try {
      const parsed = new URL(rawLocation);
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const placeIndex = pathParts.indexOf("place");
      query =
        parsed.searchParams.get("q") ||
        parsed.searchParams.get("query") ||
        (placeIndex > -1
          ? decodeURIComponent(pathParts[placeIndex + 1] || "")
          : "") ||
        data.location ||
        rawLocation;
    } catch (error) {
      query = data.location || rawLocation;
    }
  }

  return {
    query,
    embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
    link: isUrl
      ? rawLocation
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  };
}

// ===================== THEME =====================
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "generator-theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = document.querySelector("#themeToggle i");
  icon.className = document.body.classList.contains("dark")
    ? "fas fa-sun"
    : "fas fa-moon";
}

// ===================== MOBILE MENU =====================
function openMobileMenu() {
  document.getElementById("mobileMenu").classList.add("open");
  document.getElementById("mobileOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("mobileOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ===================== NAVIGATION =====================
function scrollToGenerator() {
  document.getElementById("generator").scrollIntoView({ behavior: "smooth" });
}

function selectTemplate(template) {
  const el = document.querySelector(
    `input[name="template"][value="${template}"]`,
  );
  if (el) el.checked = true;
  applyTemplateCatalog(template);

  // Apply template-appropriate default color presets
  const presets = {
    clothing: ["#1a1a1a", "#d4a017", "#0ea5e9"],
    pharmacy: ["#059669", "#34d399", "#0ea5e9"],
    electronics: ["#1e40af", "#60a5fa", "#22d3ee"],
    groceries: ["#16a34a", "#facc15", "#fb7185"],
    restaurant: ["#c2410c", "#fb923c", "#fbbf24"],
    coffeeshop: ["#78350f", "#d97706", "#f59e0b"],
    nuts: ["#92400e", "#fbbf24", "#fb923c"],
    beauty: ["#9d174d", "#f472b6", "#a855f7"],
    sports: ["#1d4ed8", "#ef4444", "#f59e0b"],
    furniture: ["#44403c", "#a8a29e", "#0f766e"],
  };

  const [p, s, t] = presets[template] || presets.clothing;
  document.getElementById("primaryColor").value = p;
  document.getElementById("primaryColorText").value = p;
  document.getElementById("secondaryColor").value = s;
  document.getElementById("secondaryColorText").value = s;
  document.getElementById("tertiaryColor").value = t;
  document.getElementById("tertiaryColorText").value = t;

  scrollToGenerator();
  updatePreview();
}

// ===================== FORM STEPS =====================
function nextStep() {
  if (currentStep < 4) {
    document.getElementById(`step${currentStep}`).classList.remove("active");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.remove("active");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.add("completed");

    currentStep++;

    document.getElementById(`step${currentStep}`).classList.add("active");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.add("active");

    updatePreview();
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.getElementById(`step${currentStep}`).classList.remove("active");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.remove("active");

    currentStep--;

    document.getElementById(`step${currentStep}`).classList.add("active");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.remove("completed");
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.add("active");
  }
}

// ===================== COLOR HELPERS =====================
function setupColorSync(colorId, textId) {
  const colorInput = document.getElementById(colorId);
  const textInput = document.getElementById(textId);
  if (!colorInput || !textInput) return;

  colorInput.addEventListener("input", () => {
    textInput.value = colorInput.value;
    updatePreview();
  });

  textInput.addEventListener("input", () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
      colorInput.value = textInput.value;
      updatePreview();
    }
  });
}

function applyColorPreset(primary, secondary, tertiary = secondary) {
  document.getElementById("primaryColor").value = primary;
  document.getElementById("primaryColorText").value = primary;
  document.getElementById("secondaryColor").value = secondary;
  document.getElementById("secondaryColorText").value = secondary;
  document.getElementById("tertiaryColor").value = tertiary;
  document.getElementById("tertiaryColorText").value = tertiary;
  updatePreview();
}

// ===================== PREVIEW =====================
function setPreviewDevice(device) {
  const frame = document.getElementById("previewFrame");
  document
    .querySelectorAll(".preview-device")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.preview-device[data-device="${device}"]`)
    .classList.add("active");

  frame.className = `preview-frame ${device}`;
}

function updatePreview() {
  const data = getFormData();
  const previewCode = generateFullWebsite(data);
  const previewIframe = ensurePreviewIframe();
  previewIframe.srcdoc = composePreviewDocument(previewCode);
}

function ensurePreviewIframe() {
  const previewContent = document.getElementById("previewContent");
  let iframe = previewContent.querySelector(".preview-iframe");

  if (!iframe) {
    previewContent.innerHTML = "";
    iframe = document.createElement("iframe");
    iframe.className = "preview-iframe";
    iframe.title = "Generated website preview";
    iframe.loading = "lazy";
    previewContent.appendChild(iframe);
  }

  return iframe;
}

function generatePreviewHTML(data) {
  const primaryColor = data.primaryColor || "#1a1a1a";
  const secondaryColor = data.secondaryColor || "#d4a017";
  const businessName = data.businessNameEn || "Your Store";
  const tagline = data.taglineEn || "Welcome to our store";
  const heroImages = getHeroCarouselImages(data);
  const feedbackCount = getCustomerFeedback(data).length;
  const previewMapData = getMapData(data);
  const previewVariations = {
    modern: {
      radius: "8px",
      heroAlign: "left",
      titleWeight: 800,
      headingTransform: "none",
      bg: "#fafafa",
      surface: "#fff",
      border: "#eee",
      shadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
    bold: {
      radius: "2px",
      heroAlign: "left",
      titleWeight: 900,
      headingTransform: "uppercase",
      bg: "#f6f6f6",
      surface: "#fff",
      border: primaryColor,
      shadow: "8px 8px 0 rgba(0,0,0,0.18)",
    },
    elegant: {
      radius: "6px",
      heroAlign: "center",
      titleWeight: 700,
      headingTransform: "none",
      bg: "#fbfaf7",
      surface: "#fffdf8",
      border: "#eadfcb",
      shadow: "0 14px 34px rgba(70,50,20,0.12)",
    },
    playful: {
      radius: "18px",
      heroAlign: "left",
      titleWeight: 800,
      headingTransform: "none",
      bg: "#fffaf2",
      surface: "#fff",
      border: secondaryColor,
      shadow: "0 10px 0 rgba(0,0,0,0.08)",
    },
    minimal: {
      radius: "0",
      heroAlign: "left",
      titleWeight: 700,
      headingTransform: "none",
      bg: "#fff",
      surface: "#fff",
      border: "#111",
      shadow: "none",
    },
    luxury: {
      radius: "6px",
      heroAlign: "center",
      titleWeight: 800,
      headingTransform: "uppercase",
      bg: "#111",
      surface: "#191919",
      border: secondaryColor,
      shadow: "0 16px 40px rgba(0,0,0,0.32)",
    },
  };
  const variation =
    previewVariations[data.variation] || previewVariations.modern;
  const isDarkPreview = data.variation === "luxury";
  const textColor = isDarkPreview ? "#f7f2e8" : "#1a1a1a";
  const mutedColor = isDarkPreview ? "rgba(255,255,255,0.68)" : "#666";
  const templateLabel = (data.template || "clothing").replace(/-/g, " ");
  const categoryFallback =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80";

  return `
        <style>
            .prev-wrap { font-family: 'Inter', sans-serif; background: ${variation.bg}; min-height: 100%; color: ${textColor}; }
            .prev-nav { background: ${variation.surface}; padding: 12px 16px; border-bottom: 1px solid ${variation.border}; display: flex; justify-content: space-between; align-items: center; }
            .prev-logo { font-weight: 700; font-size: 14px; color: ${primaryColor}; }
            .prev-nav-actions { display: flex; gap: 8px; }
            .prev-nav-btn { width: 28px; height: 28px; border-radius: ${variation.radius}; background: ${isDarkPreview ? "#252525" : "#f5f5f5"}; display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${mutedColor}; border: 1px solid ${variation.border}; }
            .prev-template-chip { display: inline-block; margin-bottom: 8px; padding: 3px 8px; border-radius: 999px; border: 1px solid ${variation.border}; color: ${primaryColor}; font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
            .prev-hero { padding: 18px 16px; display: grid; grid-template-columns: 1fr 92px; gap: 12px; align-items: center; text-align: ${variation.heroAlign}; background: linear-gradient(135deg, ${primaryColor}12, ${secondaryColor}12); }
            .prev-hero-copy { min-width: 0; }
            .prev-hero h1 { font-size: ${data.variation === "minimal" ? "16px" : "18px"}; font-weight: ${variation.titleWeight}; margin-bottom: 8px; color: ${textColor}; text-transform: ${variation.headingTransform}; line-height: 1; }
            .prev-hero p { font-size: 11px; color: ${mutedColor}; margin-bottom: 12px; }
            .prev-btn { display: inline-block; padding: 8px 16px; background: ${primaryColor}; color: #fff; border-radius: ${variation.radius}; font-size: 10px; font-weight: 700; }
            .prev-hero-media { aspect-ratio: 4/5; border-radius: ${variation.radius}; overflow: hidden; box-shadow: ${variation.shadow}; border: 1px solid ${variation.border}; }
            .prev-hero-media img { width: 100%; height: 100%; object-fit: cover; }
            .prev-video-chip, .prev-option-strip, .prev-map-chip { margin: 10px 16px 0; padding: 8px 10px; border-radius: ${variation.radius}; background: ${variation.surface}; border: 1px solid ${variation.border}; font-size: 10px; font-weight: 700; color: ${primaryColor}; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            .prev-option-strip span { color: ${mutedColor}; }
            .prev-section { padding: 16px; }
            .prev-section-title { font-size: 12px; font-weight: 800; margin-bottom: 12px; color: ${textColor}; text-transform: ${variation.headingTransform}; }
            .prev-cats { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; }
            .prev-cat { position: relative; flex: 0 0 88px; aspect-ratio: ${data.template === "restaurant" || data.template === "coffeeshop" ? "4/3" : "1"}; background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); border-radius: ${variation.radius}; display: flex; align-items: flex-end; padding: 8px; overflow: hidden; border: 1px solid ${variation.border}; }
            .prev-cat::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.62), rgba(0,0,0,0.05)); }
            .prev-cat-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
            .prev-cat span { position: relative; z-index: 1; font-size: 9px; font-weight: 700; color: #fff; }
            .prev-products { display: grid; grid-template-columns: ${data.template === "electronics" ? "1fr" : "repeat(2, 1fr)"}; gap: 8px; }
            .prev-product { background: ${variation.surface}; border-radius: ${variation.radius}; overflow: hidden; border: 1px solid ${variation.border}; box-shadow: ${variation.shadow}; }
            .prev-product-img { aspect-ratio: ${data.template === "furniture" ? "4/3" : "1"}; background: ${isDarkPreview ? "#252525" : "#f0f0f0"}; display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 20px; }
            .prev-product-img img { width: 100%; height: 100%; object-fit: cover; }
            .prev-product-info { padding: 8px; }
            .prev-product-name { font-size: 10px; font-weight: 600; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .prev-product-price { font-size: 11px; font-weight: 700; color: ${primaryColor}; }
            .prev-badge { position: absolute; top: 4px; left: 4px; padding: 2px 6px; border-radius: ${variation.radius}; font-size: 7px; font-weight: 700; text-transform: uppercase; }
            .prev-badge.new { background: ${primaryColor}; color: #fff; }
            .prev-badge.sale { background: #ef4444; color: #fff; }
            .prev-reviews { margin: 10px 16px 0; padding: 12px; display: ${data.enableReviews ? "block" : "none"}; color: ${mutedColor}; font-size: 10px; background: ${variation.surface}; border: 1px solid ${variation.border}; border-radius: ${variation.radius}; }
            .prev-footer { background: #1a1a1a; color: #fff; padding: 16px; text-align: center; margin-top: 16px; }
            .prev-footer-logo { font-size: 14px; font-weight: 700; margin-bottom: 8px; color: ${secondaryColor}; }
            .prev-footer p { font-size: 9px; color: rgba(255,255,255,0.6); }
            .prev-wa { position: fixed; bottom: 12px; right: 12px; width: 36px; height: 36px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
        </style>
        <div class="prev-wrap">
            <nav class="prev-nav">
                <span class="prev-logo">${businessName}</span>
                <div class="prev-nav-actions">
                    <span class="prev-nav-btn">&#128269;</span>
                    <span class="prev-nav-btn">&#128722;</span>
                    <span class="prev-nav-btn">&#9776;</span>
                </div>
            </nav>
            <div class="prev-hero">
                <div class="prev-hero-copy">
                    <span class="prev-template-chip">${templateLabel}</span>
                    <h1>${businessName}</h1>
                    <p>${tagline}</p>
                    <span class="prev-btn">Shop Now</span>
                </div>
                <div class="prev-hero-media">
                    <img src="${heroImages[0]}" alt="${businessName}">
                </div>
            </div>
            ${data.videoUrl ? '<div class="prev-video-chip">&#9658; Video section enabled</div>' : ""}
            ${previewMapData ? `<div class="prev-map-chip">&#128205; Map: ${escapeAttr(previewMapData.query)}</div>` : ""}
            <div class="prev-option-strip">
                ${data.enableLanguageToggle ? "<span>EN/AR</span>" : ""}
                ${data.enableDarkMode ? "<span>Dark mode</span>" : ""}
                ${data.enableCart ? "<span>Cart</span>" : ""}
                ${data.enableWishlist ? "<span>Wishlist</span>" : ""}
                ${data.enableReviews ? "<span>Reviews</span>" : ""}
            </div>
            <div class="prev-section">
                <div class="prev-section-title">Categories</div>
                <div class="prev-cats">
                    ${categories
                      .map(
                        (cat) => `
                        <div class="prev-cat">
                            <div class="prev-cat-bg" style="background-image: url('${escapeAttr(cat.image || categoryFallback)}')"></div>
                            <span>${cat.nameEn}</span>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            <div class="prev-section">
                <div class="prev-section-title">Products</div>
                <div class="prev-products">
                    ${products
                      .slice(0, 4)
                      .map(
                        (prod) => `
                        <div class="prev-product" style="position: relative;">
                            ${prod.badge ? `<span class="prev-badge ${prod.badge}">${prod.badge}</span>` : ""}
                            <div class="prev-product-img">
                                ${prod.image ? `<img src="${prod.image}" alt="${prod.nameEn}">` : "&#128230;"}
                            </div>
                            <div class="prev-product-info">
                                <div class="prev-product-name">${prod.nameEn}</div>
                                <div class="prev-product-price">$${prod.price}</div>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            <div class="prev-reviews">&#9733;&#9733;&#9733;&#9733;&#9733; ${feedbackCount} customer feedback cards enabled</div>
            <div class="prev-footer">
                <div class="prev-footer-logo">${businessName}</div>
                <p>${tagline}</p>
            </div>
            ${data.enableWhatsappFloat !== false ? '<div class="prev-wa">&#128172;</div>' : ""}
        </div>
    `;
}

// ===================== CATEGORIES =====================
function renderCategories() {
  const list = document.getElementById("categoriesList");

  if (categories.length === 0) {
    list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <p>No categories yet. Add one to get started.</p>
            </div>
        `;
    return;
  }

  list.innerHTML = categories
    .map(
      (cat, index) => `
        <div class="category-item">
            <div class="category-item-info">
                <div>
                    <div class="item-name">${cat.nameEn}</div>
                    <div class="item-meta">${cat.nameAr} &bull; ID: ${cat.id}</div>
                </div>
            </div>
            <div class="item-actions">
                <button class="item-action-btn" onclick="editCategory(${index})" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="item-action-btn delete" onclick="deleteCategory(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  // Update product category dropdown
  updateProductCategoryDropdown();
}

function addCategory() {
  editingCategoryIndex = null;
  document.getElementById("categoryModalTitle").textContent = "Add Category";
  document.getElementById("catNameEn").value = "";
  document.getElementById("catNameAr").value = "";
  document.getElementById("catId").value = "";
  document.getElementById("catImage").value = "";
  document.getElementById("categoryModal").classList.add("open");
}

function editCategory(index) {
  editingCategoryIndex = index;
  const cat = categories[index];
  document.getElementById("categoryModalTitle").textContent = "Edit Category";
  document.getElementById("catNameEn").value = cat.nameEn;
  document.getElementById("catNameAr").value = cat.nameAr;
  document.getElementById("catId").value = cat.id;
  document.getElementById("catImage").value = cat.image || "";
  document.getElementById("categoryModal").classList.add("open");
}

function saveCategory() {
  const nameEn = document.getElementById("catNameEn").value.trim();
  const nameAr = document.getElementById("catNameAr").value.trim();
  const id = document
    .getElementById("catId")
    .value.trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  const image = document.getElementById("catImage").value.trim();

  if (!nameEn || !nameAr || !id) {
    alert("Please fill in all required fields");
    return;
  }

  const category = { id, nameEn, nameAr, image };

  if (editingCategoryIndex !== null) {
    categories[editingCategoryIndex] = category;
  } else {
    categories.push(category);
  }

  closeCategoryModal();
  renderCategories();
  updatePreview();
}

function deleteCategory(index) {
  if (confirm("Are you sure you want to delete this category?")) {
    categories.splice(index, 1);
    renderCategories();
    updatePreview();
  }
}

function closeCategoryModal() {
  document.getElementById("categoryModal").classList.remove("open");
  editingCategoryIndex = null;
}

// ===================== PRODUCTS =====================
function renderProducts() {
  const list = document.getElementById("productsList");

  if (products.length === 0) {
    list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>No products yet. Add one to get started.</p>
            </div>
        `;
    return;
  }

  list.innerHTML = products
    .map(
      (prod, index) => `
        <div class="product-item">
            <div class="product-item-info">
                ${prod.image ? `<img src="${prod.image}" alt="${prod.nameEn}" class="product-item-img">` : '<div class="product-item-img" style="display:flex;align-items:center;justify-content:center;">&#128230;</div>'}
                <div>
                    <div class="item-name">${prod.nameEn}</div>
                    <div class="item-meta">$${prod.price}${prod.origPrice ? ` <s>$${prod.origPrice}</s>` : ""} &bull; ${prod.category}</div>
                </div>
            </div>
            <div class="item-actions">
                <button class="item-action-btn" onclick="editProduct(${index})" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="item-action-btn delete" onclick="deleteProduct(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

function updateProductCategoryDropdown() {
  const select = document.getElementById("prodCategory");
  select.innerHTML = categories
    .map((cat) => `<option value="${cat.id}">${cat.nameEn}</option>`)
    .join("");
}

function addProduct() {
  editingProductIndex = null;
  document.getElementById("productModalTitle").textContent = "Add Product";
  document.getElementById("prodNameEn").value = "";
  document.getElementById("prodNameAr").value = "";
  document.getElementById("prodPrice").value = "";
  document.getElementById("prodOrigPrice").value = "";
  document.getElementById("prodCategory").value = categories[0]?.id || "";
  document.getElementById("prodImage").value = "";
  document.getElementById("prodSizes").value = "S, M, L, XL";
  document.getElementById("prodBadge").value = "";
  document.getElementById("prodRating").value = "4.5";
  document.getElementById("productModal").classList.add("open");
}

function editProduct(index) {
  editingProductIndex = index;
  const prod = products[index];
  document.getElementById("productModalTitle").textContent = "Edit Product";
  document.getElementById("prodNameEn").value = prod.nameEn;
  document.getElementById("prodNameAr").value = prod.nameAr;
  document.getElementById("prodPrice").value = prod.price;
  document.getElementById("prodOrigPrice").value = prod.origPrice || "";
  document.getElementById("prodCategory").value = prod.category;
  document.getElementById("prodImage").value = prod.image || "";
  document.getElementById("prodSizes").value = prod.sizes?.join(", ") || "";
  document.getElementById("prodBadge").value = prod.badge || "";
  document.getElementById("prodRating").value = prod.rating || "4.5";
  document.getElementById("productModal").classList.add("open");
}

function saveProduct() {
  const nameEn = document.getElementById("prodNameEn").value.trim();
  const nameAr = document.getElementById("prodNameAr").value.trim();
  const price = parseFloat(document.getElementById("prodPrice").value);
  const origPrice =
    parseFloat(document.getElementById("prodOrigPrice").value) || null;
  const category = document.getElementById("prodCategory").value;
  const image = document.getElementById("prodImage").value.trim();
  const sizes = document
    .getElementById("prodSizes")
    .value.split(",")
    .map((s) => s.trim())
    .filter((s) => s);
  const badge = document.getElementById("prodBadge").value;
  const rating = parseFloat(document.getElementById("prodRating").value) || 4.5;

  if (!nameEn || !nameAr || !price || !category) {
    alert("Please fill in all required fields");
    return;
  }

  const product = {
    nameEn,
    nameAr,
    price,
    origPrice,
    category,
    image,
    sizes,
    badge,
    rating,
  };

  if (editingProductIndex !== null) {
    products[editingProductIndex] = product;
  } else {
    products.push(product);
  }

  closeProductModal();
  renderProducts();
  updatePreview();
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    renderProducts();
    updatePreview();
  }
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("open");
  editingProductIndex = null;
}

// ===================== FORM DATA =====================
function getFormData() {
  return {
    template:
      document.querySelector('input[name="template"]:checked')?.value ||
      "clothing",
    variation:
      document.querySelector('input[name="variation"]:checked')?.value ||
      "modern",
    businessNameEn: document.getElementById("businessNameEn")?.value || "",
    businessNameAr: document.getElementById("businessNameAr")?.value || "",
    taglineEn: document.getElementById("taglineEn")?.value || "",
    taglineAr: document.getElementById("taglineAr")?.value || "",
    aboutEn: document.getElementById("aboutEn")?.value || "",
    aboutAr: document.getElementById("aboutAr")?.value || "",
    customerCount: document.getElementById("customerCount")?.value || "",
    whatsappNumber: document.getElementById("whatsappNumber")?.value || "",
    phoneNumber: document.getElementById("phoneNumber")?.value || "",
    instagram: document.getElementById("instagram")?.value || "",
    email: document.getElementById("email")?.value || "",
    location: document.getElementById("location")?.value || "",
    mapLocation: document.getElementById("mapLocation")?.value || "",
    logoUrl: document.getElementById("logoUrl")?.value || "",
    carouselImages: document.getElementById("carouselImages")?.value || "",
    videoUrl: document.getElementById("videoUrl")?.value || "",
    customerFeedback: document.getElementById("customerFeedback")?.value || "",
    primaryColor: document.getElementById("primaryColor")?.value || "#1a1a1a",
    secondaryColor:
      document.getElementById("secondaryColor")?.value || "#d4a017",
    tertiaryColor: document.getElementById("tertiaryColor")?.value || "#0ea5e9",
    lightBgColor: document.getElementById("lightBgColor")?.value || "#fafafa",
    lightSurfaceColor:
      document.getElementById("lightSurfaceColor")?.value || "#ffffff",
    lightSurface2Color:
      document.getElementById("lightSurface2Color")?.value || "#f3f3f3",
    lightTextColor:
      document.getElementById("lightTextColor")?.value || "#1a1a1a",
    lightMutedColor:
      document.getElementById("lightMutedColor")?.value || "#888888",
    lightBorderColor:
      document.getElementById("lightBorderColor")?.value || "#e5e5e5",
    darkPrimaryColor:
      document.getElementById("darkPrimaryColor")?.value || "#fbbf24",
    darkSecondaryColor:
      document.getElementById("darkSecondaryColor")?.value || "#f59e0b",
    darkTertiaryColor:
      document.getElementById("darkTertiaryColor")?.value || "#34d399",
    darkBgColor: document.getElementById("darkBgColor")?.value || "#1a1b23",
    darkSurfaceColor:
      document.getElementById("darkSurfaceColor")?.value || "#22253a",
    darkSurface2Color:
      document.getElementById("darkSurface2Color")?.value || "#2a2e45",
    darkTextColor:
      document.getElementById("darkTextColor")?.value || "#e8eaf0",
    darkMutedColor:
      document.getElementById("darkMutedColor")?.value || "#8b90a8",
    darkBorderColor:
      document.getElementById("darkBorderColor")?.value || "#353a54",
    bannerStartColor:
      document.getElementById("bannerStartColor")?.value || "#d4a017",
    bannerEndColor:
      document.getElementById("bannerEndColor")?.value || "#1a1a1a",
    imageRingColor:
      document.getElementById("imageRingColor")?.value || "#d4a017",
    imageOverlayColor:
      document.getElementById("imageOverlayColor")?.value || "#0f0f0f",
    heroCardColor:
      document.getElementById("heroCardColor")?.value || "#ffffff",
    enHeadingFont: document.getElementById("enHeadingFont")?.value || "",
    enBodyFont: document.getElementById("enBodyFont")?.value || "",
    arHeadingFont: document.getElementById("arHeadingFont")?.value || "",
    arBodyFont: document.getElementById("arBodyFont")?.value || "",
    enableDarkMode:
      document.getElementById("enableDarkMode")?.checked !== false,
    enableLanguageToggle:
      document.getElementById("enableLanguageToggle")?.checked !== false,
    enableWhatsappFloat:
      document.getElementById("enableWhatsappFloat")?.checked !== false,
    enableCart: document.getElementById("enableCart")?.checked !== false,
    enableWishlist:
      document.getElementById("enableWishlist")?.checked !== false,
    enableReviews: document.getElementById("enableReviews")?.checked !== false,
    currency: document.getElementById("currency")?.value || "USD",
    exchangeRate: document.getElementById("exchangeRate")?.value || "90000",
    categories: categories,
    products: products,
  };
}

// ===================== GENERATE WEBSITE =====================
function generateWebsite() {
  const data = getFormData();

  // Validate required fields
  if (!data.businessNameEn || !data.businessNameAr) {
    alert("Please enter your business name in both English and Arabic");
    currentStep = 2;
    document
      .querySelectorAll(".form-step")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("step2").classList.add("active");
    return;
  }

  if (!data.whatsappNumber) {
    alert("Please enter your WhatsApp number");
    currentStep = 2;
    document
      .querySelectorAll(".form-step")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("step2").classList.add("active");
    return;
  }

  if (products.length === 0) {
    alert("Please add at least one product");
    currentStep = 3;
    document
      .querySelectorAll(".form-step")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("step3").classList.add("active");
    return;
  }

  // Generate code
  generatedCode = generateFullWebsite(data);

  // Show output modal
  document.getElementById("outputModal").classList.add("open");
  switchOutputTab("html");
}

function generateFullWebsite(data) {
  const html = generateHTML(data);
  const css = generateCSS(data);
  const js = generateJS(data);

  return { html, css, js };
}

// ===================== OUTPUT MODAL =====================
function closeOutputModal() {
  document.getElementById("outputModal").classList.remove("open");
}

function switchOutputTab(tab) {
  currentOutputTab = tab;
  document
    .querySelectorAll(".output-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelector(`.output-tab[onclick="switchOutputTab('${tab}')"]`)
    .classList.add("active");

  const codeEl = document.getElementById("outputCode");
  codeEl.textContent = generatedCode[tab];
}

function copyCode() {
  navigator.clipboard.writeText(generatedCode[currentOutputTab]).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  });
}

function downloadAll() {
  const htmlBlob = new Blob([generatedCode.html], { type: "text/html" });
  const cssBlob = new Blob([generatedCode.css], { type: "text/css" });
  const jsBlob = new Blob([generatedCode.js], { type: "text/javascript" });

  downloadFile(htmlBlob, "index.html");
  setTimeout(() => downloadFile(cssBlob, "styles.css"), 200);
  setTimeout(() => downloadFile(jsBlob, "script.js"), 400);
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function previewFullscreen() {
  const htmlContent = composePreviewDocument(generatedCode);

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// ===================== CODE GENERATORS =====================
function generateHTML(data) {
  const currencySymbol =
    { USD: "$", EUR: "€", LBP: "ل.ل", AED: "د.إ", SAR: "ر.س" }[data.currency] ||
    "$";
  const heroImages = getHeroCarouselImages(data);
  const videoMedia = getVideoMedia(data.videoUrl);
  const customerFeedback = getCustomerFeedback(data);
  const customerCount = getCustomerCount(data, customerFeedback);
  const averageRating = getAverageRating(customerFeedback);
  const mapData = getMapData(data);

  let html = "<!DOCTYPE html>\n";
  html += '<html lang="ar" dir="rtl">\n';
  html += "<head>\n";
  html += '    <meta charset="UTF-8">\n';
  html +=
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html +=
    "    <title>" +
    data.businessNameEn +
    " | " +
    data.businessNameAr +
    "</title>\n";
  html += '    <link rel="preconnect" href="https://fonts.googleapis.com">\n';
  html +=
    '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n';
  html +=
    '    <link href="' + buildGoogleFontsHref(data) + '" rel="stylesheet">\n';
  html +=
    '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n';
  html += '    <link rel="stylesheet" href="styles.css">\n';
  html += "</head>\n";
  html += "<body>\n";

  // Navbar
  html += "    <!-- Navbar -->\n";
  html += '    <nav class="navbar" id="navbar">\n';
  html += '        <a href="#" class="nav-brand">\n';
  if (data.logoUrl) {
    html +=
      '            <img src="' +
      data.logoUrl +
      '" alt="' +
      data.businessNameEn +
      '" class="nav-logo">\n';
  }
  html += '            <div class="nav-brand-text">\n';
  html +=
    '                <span class="nav-brand-name">' +
    data.businessNameEn +
    "</span>\n";
  html +=
    '                <span class="nav-brand-sub">' +
    (data.taglineEn || "") +
    "</span>\n";
  html += "            </div>\n";
  html += "        </a>\n";
  html += '        <div class="nav-links">\n';
  html +=
    '            <a href="#shop" class="nav-link" data-i18n="nav_shop">Shop</a>\n';
  html +=
    '            <a href="#categories" class="nav-link" data-i18n="nav_categories">Categories</a>\n';
  html +=
    '            <a href="#why-choose-us" class="nav-link" data-i18n="nav_why">Why Us</a>\n';
  if (videoMedia) {
    html +=
      '            <a href="#brand-video" class="nav-link" data-i18n="nav_video">Video</a>\n';
  }

  if (data.enableReviews && customerFeedback.length) {
    html +=
      '            <a href="#feedback" class="nav-link" data-i18n="nav_feedback">Feedback</a>\n';
  }
  if (mapData) {
    html +=
      '            <a href="#location-map" class="nav-link" data-i18n="nav_location">Location</a>\n';
  }
  html +=
    '            <a href="#about" class="nav-link" data-i18n="nav_about">About</a>\n';
  html +=
    '            <a href="#contact" class="nav-link" data-i18n="nav_contact">Contact</a>\n';
  html += "        </div>\n";
  html += '        <div class="nav-actions">\n';
  if (data.enableLanguageToggle) {
    html +=
      '            <button class="lang-toggle-btn" id="langToggle">EN</button>\n';
  }
  if (data.enableDarkMode) {
    html +=
      '            <button class="dark-toggle-btn" id="darkToggle"><i class="fas fa-moon"></i></button>\n';
  }
  html +=
    '            <button class="nav-icon-btn" id="searchToggle"><i class="fas fa-search"></i></button>\n';
  if (data.enableWishlist) {
    html +=
      '            <button class="nav-icon-btn" id="wishlistNav"><i class="far fa-heart"></i><span class="nav-badge" id="wishBadge">0</span></button>\n';
  }
  if (data.enableCart) {
    html +=
      '            <button class="nav-icon-btn" id="cartToggle"><i class="fas fa-shopping-bag"></i><span class="nav-badge" id="cartBadge">0</span></button>\n';
  }
  html += '            <button class="hamburger" id="menuToggle">\n';
  html += "                <span></span><span></span><span></span>\n";
  html += "            </button>\n";
  html += "        </div>\n";
  html += "    </nav>\n\n";

  // Search Bar
  html += "    <!-- Search Bar -->\n";
  html += '    <div class="search-bar" id="searchBar">\n';
  html +=
    '        <input type="text" id="searchInput" placeholder="Search products..." data-ph-ar="ابحث عن منتج..." data-ph-en="Search products...">\n';
  html +=
    '        <button class="search-close-btn" id="searchClose"><i class="fas fa-times"></i></button>\n';
  html += "    </div>\n\n";

  // Mobile Drawer
  html += "    <!-- Mobile Drawer -->\n";
  html += '    <div class="drawer-overlay" id="drawerOverlay"></div>\n';
  html += '    <div class="mobile-drawer" id="mobileDrawer">\n';
  html += '        <div class="drawer-header">\n';
  html +=
    '            <span class="nav-brand-name">' +
    data.businessNameEn +
    "</span>\n";
  html +=
    '            <button class="drawer-close" id="drawerClose"><i class="fas fa-times"></i></button>\n';
  html += "        </div>\n";
  html += '        <nav class="drawer-nav">\n';
  html += '            <a href="#shop" data-i18n="nav_shop">Shop</a>\n';
  html +=
    '            <a href="#categories" data-i18n="nav_categories">Categories</a>\n';
  html += '            <a href="#why-choose-us" data-i18n="nav_why">Why Us</a>\n';
  if (videoMedia) {
    html +=
      '            <a href="#brand-video" data-i18n="nav_video">Video</a>\n';
  }
  if (data.enableReviews && customerFeedback.length) {
    html +=
      '            <a href="#feedback" data-i18n="nav_feedback">Feedback</a>\n';
  }
  if (mapData) {
    html +=
      '            <a href="#location-map" data-i18n="nav_location">Location</a>\n';
  }
  html += '            <a href="#about" data-i18n="nav_about">About</a>\n';
  html +=
    '            <a href="#contact" data-i18n="nav_contact">Contact</a>\n';
  html += "        </nav>\n";
  html += '        <div class="drawer-footer">\n';
  if (data.enableLanguageToggle) {
    html += '            <div class="drawer-lang">\n';
    html +=
      '                <button class="active" onclick="setLang(\'ar\')">العربية</button>\n';
    html +=
      "                <button onclick=\"setLang('en')\">English</button>\n";
    html += "            </div>\n";
  }
  if (data.enableDarkMode) {
    html +=
      '            <button class="drawer-dark-btn" onclick="toggleDark()">\n';
    html += '                <i class="fas fa-moon" id="drawerDarkIcon"></i>\n';
    html += '                <span id="drawerDarkLabel">Dark Mode</span>\n';
    html += "            </button>\n";
  }
  html += "        </div>\n";
  html += "    </div>\n\n";

  // Hero Section
  html += "    <!-- Hero Section -->\n";
  html += '    <section class="hero">\n';
  html += '        <div class="hero-bg"></div>\n';
  html += '        <div class="hero-inner">\n';
  html += '            <div class="hero-content hero-copy">\n';
  html +=
    '                <span class="hero-kicker" data-i18n="hero_kicker">Curated for you</span>\n';
  html +=
    '                <h1 class="hero-title">' + data.businessNameEn + "</h1>\n";
  html +=
    '                <p class="hero-subtitle-ar">' +
    data.businessNameAr +
    "</p>\n";
  html +=
    '                <p class="hero-desc">' +
    (data.taglineEn || "Discover our amazing collection") +
    "</p>\n";
  html += '                <div class="hero-ctas">\n';
  html +=
    '                    <a href="#shop" class="btn btn-primary" data-i18n="hero_shop">Shop Now</a>\n';
  html +=
    '                    <a href="https://wa.me/' +
    data.whatsappNumber +
    '" target="_blank" class="btn btn-wa">\n';
  html += '                        <i class="fab fa-whatsapp"></i>\n';
  html +=
    '                        <span data-i18n="hero_wa">Contact Us</span>\n';
  html += "                    </a>\n";
  html += "                </div>\n";
  html += "            </div>\n";
  html +=
    '            <div class="hero-carousel" id="heroCarousel" aria-label="Business highlights">\n';
  html += '                <div class="hero-carousel-track">\n';
  heroImages.forEach((image, index) => {
    html +=
      '                    <div class="hero-slide' +
      (index === 0 ? " active" : "") +
      '">\n';
    html +=
      '                        <img src="' +
      escapeAttr(image) +
      '" alt="' +
      escapeAttr(data.businessNameEn) +
      " highlight " +
      (index + 1) +
      '">\n';
    html += "                    </div>\n";
  });
  html += "                </div>\n";
  html += '                <div class="hero-carousel-card">\n';
  html +=
    '                    <span data-i18n="hero_carousel_label">Brand preview</span>\n';
  html +=
    "                    <strong>" +
    (data.taglineEn || data.businessNameEn) +
    "</strong>\n";
  html += "                </div>\n";
  html += '                <div class="hero-carousel-dots">\n';
  heroImages.forEach((image, index) => {
    html +=
      '                    <button class="hero-dot' +
      (index === 0 ? " active" : "") +
      '" data-carousel-dot="' +
      index +
      '" aria-label="Show slide ' +
      (index + 1) +
      '"></button>\n';
  });
  html += "                </div>\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  html += "    <!-- Statistics Section -->\n";
  html += '    <section class="stats-section" id="statistics">\n';
  html += '        <div class="container">\n';
  html += '            <div class="stats-grid">\n';
  html += '                <div class="stat-card">\n';
  html +=
    '                    <strong class="stat-number">' +
    formatStatValue(customerCount) +
    "+</strong>\n";
  html +=
    '                    <span data-lang-en="Happy Customers" data-lang-ar="عملاء سعداء">عملاء سعداء</span>\n';
  html += "                </div>\n";
  html += '                <div class="stat-card">\n';
  html +=
    '                    <strong class="stat-number">' +
    formatStatValue((data.products || []).length) +
    "+</strong>\n";
  html +=
    '                    <span data-lang-en="Available Products" data-lang-ar="منتجات متوفرة">منتجات متوفرة</span>\n';
  html += "                </div>\n";
  html += '                <div class="stat-card">\n';
  html +=
    '                    <strong class="stat-number">' +
    formatStatValue((data.categories || []).length) +
    "+</strong>\n";
  html +=
    '                    <span data-lang-en="Curated Categories" data-lang-ar="فئات مختارة">فئات مختارة</span>\n';
  html += "                </div>\n";
  html += '                <div class="stat-card">\n';
  html +=
    '                    <strong class="stat-number">' +
    averageRating +
    "/5</strong>\n";
  html +=
    '                    <span data-lang-en="Average Rating" data-lang-ar="متوسط التقييم">متوسط التقييم</span>\n';
  html += "                </div>\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  if (videoMedia) {
    html += "    <!-- Video Section -->\n";
    html += '    <section class="video-section" id="brand-video">\n';
    html += '        <div class="container">\n';
    html += '            <div class="video-layout">\n';
    html += '                <div class="video-copy">\n';
    html +=
      '                    <span class="section-kicker" data-i18n="video_kicker">Video</span>\n';
    html +=
      '                    <h2 class="section-title" data-i18n="video_title">See the Story</h2>\n';
    html +=
      '                    <p class="section-subtitle" data-i18n="video_subtitle">A quick look at what makes this business special.</p>\n';
    html += "                </div>\n";
    html += '                <div class="video-frame-wrap">\n';
    if (videoMedia.type === "video") {
      html +=
        '                    <video class="brand-autoplay-video" controls autoplay playsinline preload="auto" poster="' +
        escapeAttr(heroImages[0]) +
        '">\n';
      html +=
        '                        <source src="' +
        escapeAttr(videoMedia.src) +
        '">\n';
      html += "                    </video>\n";
    } else {
      html +=
        '                    <iframe src="' +
        escapeAttr(getAutoplayIframeSrc(videoMedia.src)) +
        '" title="' +
        escapeAttr(data.businessNameEn) +
        ' video" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n';
    }
    html += "                </div>\n";
    html += "            </div>\n";
    html += "        </div>\n";
    html += "    </section>\n\n";
  }

  // Categories Section
  html += "    <!-- Categories Section -->\n";
  html += '    <section class="categories" id="categories">\n';
  html += '        <div class="container">\n';
  html += '            <div class="section-header">\n';
  html +=
    '                <h2 class="section-title" data-i18n="cat_title">Categories</h2>\n';
  html +=
    '                <p class="section-subtitle" data-i18n="cat_subtitle">Browse by category</p>\n';
  html += "            </div>\n";
  html += '            <div class="categories-grid">\n';
  data.categories.forEach((cat) => {
    const productCount = data.products.filter(
      (product) => product.category === cat.id,
    ).length;
    html +=
      '                <div class="cat-card" data-cat="' + cat.id + '">\n';
    html +=
      '                    <div class="cat-bg" style="background-image: url(\'' +
      (cat.image ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80") +
      "')\"></div>\n";
    html += '                    <div class="cat-info">\n';
    html +=
      '                        <span class="cat-count">' +
      productCount +
      " items</span>\n";
    html +=
      '                        <h3 class="cat-name">' + cat.nameEn + "</h3>\n";
    html +=
      '                        <span class="cat-name-ar">' +
      cat.nameAr +
      "</span>\n";
    html += "                    </div>\n";
    html +=
      '                    <span class="cat-arrow"><i class="fas fa-arrow-right"></i></span>\n';
    html += "                </div>\n";
  });
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  // Shop Section
  html += "    <!-- Shop Section -->\n";
  html += '    <section class="shop" id="shop">\n';
  html += '        <div class="container">\n';
  html += '            <div class="shop-header">\n';
  html += "                <div>\n";
  html +=
    '                    <h2 class="section-title" data-i18n="shop_title">Our Products</h2>\n';
  html +=
    '                    <p class="section-subtitle" data-i18n="shop_subtitle">Explore our collection</p>\n';
  html += "                </div>\n";
  html += '                <div class="filter-bar" id="filterBar">\n';
  html +=
    '                    <button class="filter-pill active" data-cat="all" data-i18n="filter_all">All</button>\n';
  data.categories.forEach((cat) => {
    html +=
      '                    <button class="filter-pill" data-cat="' +
      cat.id +
      '">' +
      cat.nameEn +
      "</button>\n";
  });
  html += "                </div>\n";
  html += "            </div>\n";
  html += "            <!-- Advanced Filters -->\n";
  html += '            <div class="adv-filters-bar" id="advFilters">\n';
  html += '                <div class="adv-filter-group">\n';
  html +=
    '                    <span class="adv-filter-label" data-i18n="adv_price_range">Price Range</span>\n';
  html += '                    <div class="adv-price-inputs">\n';
  html +=
    '                        <input class="adv-price-input" type="number" id="priceMin" placeholder="0" min="0">\n';
  html += '                        <span class="adv-price-sep">—</span>\n';
  html +=
    '                        <input class="adv-price-input" type="number" id="priceMax" placeholder="&#8734;" min="0">\n';
  html += "                    </div>\n";
  html += "                </div>\n";
  html += '                <div class="adv-filter-group">\n';
  html +=
    '                    <span class="adv-filter-label" data-i18n="adv_badge">Type</span>\n';
  html +=
    '                    <select class="adv-filter-select" id="badgeFilter">\n';
  html +=
    '                        <option value="" data-i18n="adv_all_types">All Types</option>\n';
  html +=
    '                        <option value="new" data-i18n="badge_new">New</option>\n';
  html +=
    '                        <option value="sale" data-i18n="badge_sale">Sale</option>\n';
  html +=
    '                        <option value="bestseller" data-i18n="badge_bestseller">Bestseller</option>\n';
  html += "                    </select>\n";
  html += "                </div>\n";
  html += '                <div class="adv-filter-group">\n';
  html +=
    '                    <span class="adv-filter-label" data-i18n="adv_rating">Min Rating</span>\n';
  html +=
    '                    <select class="adv-filter-select" id="ratingFilter">\n';
  html +=
    '                        <option value="0" data-i18n="adv_any_rating">Any Rating</option>\n';
  html += '                        <option value="3">3+ &#9733;</option>\n';
  html += '                        <option value="4">4+ &#9733;</option>\n';
  html += '                        <option value="4.5">4.5+ &#9733;</option>\n';
  html += "                    </select>\n";
  html += "                </div>\n";
  html += '                <div class="adv-filter-group">\n';
  html +=
    '                    <span class="adv-filter-label" data-i18n="adv_sort">Sort By</span>\n';
  html +=
    '                    <select class="adv-filter-select" id="sortFilter">\n';
  html +=
    '                        <option value="default" data-i18n="adv_default">Default</option>\n';
  html +=
    '                        <option value="price_asc" data-i18n="adv_price_asc">Price: Low &#8594; High</option>\n';
  html +=
    '                        <option value="price_desc" data-i18n="adv_price_desc">Price: High &#8594; Low</option>\n';
  html +=
    '                        <option value="rating_desc" data-i18n="adv_rating_desc">Highest Rated</option>\n';
  html +=
    '                        <option value="name_asc" data-i18n="adv_name_asc">Name A &#8594; Z</option>\n';
  html += "                    </select>\n";
  html += "                </div>\n";
  html +=
    '                <button class="adv-reset-btn" id="advResetBtn" data-i18n="adv_reset">Reset Filters</button>\n';
  html += "            </div>\n";
  html +=
    '            <div class="products-results-count" id="resultsCount"></div>\n';
  html += '            <div class="products-grid" id="productsGrid">\n';
  html += "                <!-- Products will be rendered by JavaScript -->\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  // About Section
  html += "    <!-- About Section -->\n";
  html += '    <section class="about" id="about">\n';
  html += '        <div class="container">\n';
  html += '            <div class="about-content">\n';
  html +=
    '                <h2 class="section-title" data-i18n="about_title">About Us</h2>\n';
  html +=
    '                <p class="about-text">' +
    (data.aboutEn ||
      "Welcome to our store. We offer the best quality products at competitive prices.") +
    "</p>\n";
  html +=
    '                <p class="about-text-ar">' +
    (data.aboutAr ||
      "مرحباً بكم في متجرنا. نقدم أفضل المنتجات بجودة عالية وأسعار منافسة.") +
    "</p>\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  html += "    <!-- Why Choose Us Section -->\n";
  html += '    <section class="why-section" id="why-choose-us">\n';
  html += '        <div class="container">\n';
  html += '            <div class="section-header">\n';
  html +=
    '                <span class="section-kicker" data-i18n="why_kicker">Why Choose Us</span>\n';
  html +=
    '                <h2 class="section-title" data-i18n="why_title">Why Customers Choose Us</h2>\n';
  html +=
    '                <p class="section-subtitle" data-i18n="why_subtitle">A smoother shopping experience from first look to final order.</p>\n';
  html += "            </div>\n";
  html += '            <div class="why-grid">\n';
  html +=
    '                <article class="why-card"><i class="fas fa-medal"></i><h3 data-lang-en="Quality First" data-lang-ar="الجودة أولا">الجودة أولا</h3><p data-lang-en="Products are presented clearly so customers know exactly what they are buying." data-lang-ar="نعرض المنتجات بوضوح ليعرف العميل تماما ما الذي يشتريه.">نعرض المنتجات بوضوح ليعرف العميل تماما ما الذي يشتريه.</p></article>\n';
  html +=
    '                <article class="why-card"><i class="fab fa-whatsapp"></i><h3 data-lang-en="Fast WhatsApp Ordering" data-lang-ar="طلب سريع عبر واتساب">طلب سريع عبر واتساب</h3><p data-lang-en="Customers can ask, confirm, and order with one familiar conversation." data-lang-ar="يمكن للعملاء السؤال والتأكيد والطلب من خلال محادثة مألوفة واحدة.">يمكن للعملاء السؤال والتأكيد والطلب من خلال محادثة مألوفة واحدة.</p></article>\n';
  html +=
    '                <article class="why-card"><i class="fas fa-heart"></i><h3 data-lang-en="Customer Care" data-lang-ar="اهتمام بالعملاء">اهتمام بالعملاء</h3><p data-lang-en="Helpful support, clear details, and a shopping flow built for confidence." data-lang-ar="دعم مفيد وتفاصيل واضحة وتجربة شراء تمنح العميل الثقة.">دعم مفيد وتفاصيل واضحة وتجربة شراء تمنح العميل الثقة.</p></article>\n';
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </section>\n\n";

  if (data.enableReviews && customerFeedback.length) {
    html += "    <!-- Customer Feedback Section -->\n";
    html += '    <section class="feedback-section" id="feedback">\n';
    html += '        <div class="container">\n';
    html += '            <div class="section-header">\n';
    html +=
      '                <span class="section-kicker" data-i18n="feedback_kicker">Customer Feedback</span>\n';
    html +=
      '                <h2 class="section-title" data-i18n="feedback_title">What Customers Say</h2>\n';
    html +=
      '                <p class="section-subtitle" data-i18n="feedback_subtitle">Real notes from customers across Lebanon.</p>\n';
    html += "            </div>\n";
    html += '            <div class="feedback-shell">\n';
    html +=
      '                <button class="feedback-nav feedback-prev" id="feedbackPrev" aria-label="Previous feedback"><i class="fas fa-arrow-left"></i></button>\n';
    html +=
      '                <div class="feedback-track" id="feedbackTrack"></div>\n';
    html +=
      '                <button class="feedback-nav feedback-next" id="feedbackNext" aria-label="Next feedback"><i class="fas fa-arrow-right"></i></button>\n';
    html += "            </div>\n";
    html += '            <div class="feedback-dots" id="feedbackDots"></div>\n';
    html += "        </div>\n";
    html += "    </section>\n\n";
  }

  if (mapData) {
    html += "    <!-- Location Map Section -->\n";
    html += '    <section class="map-section" id="location-map">\n';
    html += '        <div class="container">\n';
    html += '            <div class="map-layout">\n';
    html += '                <div class="map-copy">\n';
    html +=
      '                    <span class="section-kicker" data-i18n="map_kicker">Location</span>\n';
    html +=
      '                    <h2 class="section-title" data-i18n="map_title">Find Us on Google Maps</h2>\n';
    html +=
      '                    <p class="section-subtitle">' +
      escapeAttr(mapData.query) +
      "</p>\n";
    html +=
      '                    <a class="map-link-btn" href="' +
      escapeAttr(mapData.link) +
      '" target="_blank" rel="noopener">\n';
    html += '                        <i class="fas fa-map-location-dot"></i>\n';
    html +=
      '                        <span data-i18n="map_open">Open in Google Maps</span>\n';
    html += "                    </a>\n";
    html += "                </div>\n";
    html += '                <div class="map-frame-wrap">\n';
    html +=
      '                    <iframe src="' +
      escapeAttr(mapData.embedSrc) +
      '" title="' +
      escapeAttr(data.businessNameEn) +
      ' location" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n';
    html += "                </div>\n";
    html += "            </div>\n";
    html += "        </div>\n";
    html += "    </section>\n\n";
  }

  // Footer
  const footerNameEn = data.businessNameEn || "";
  const footerNameAr = data.businessNameAr || footerNameEn;
  const footerTaglineEn = data.taglineEn || "";
  const footerTaglineAr = data.taglineAr || footerTaglineEn;
  html += "    <!-- Footer -->\n";
  html += '    <footer id="contact">\n';
  html += '        <div class="footer-hero">\n';
  html +=
    '            <h2 class="footer-big" data-lang-en="' +
    escapeAttr(footerNameEn) +
    '" data-lang-ar="' +
    escapeAttr(footerNameAr) +
    '">' +
    footerNameAr +
    "</h2>\n";
  html += '            <div class="footer-underline"></div>\n';
  html += "        </div>\n";
  html += '        <div class="footer-main">\n';
  html += '            <div class="footer-brand">\n';
  if (data.logoUrl) {
    html +=
      '                <img src="' +
      data.logoUrl +
      '" alt="' +
      data.businessNameEn +
      '" class="footer-logo">\n';
  } else {
    html +=
      '                <span class="footer-brand-name" data-lang-en="' +
      escapeAttr(footerNameEn) +
      '" data-lang-ar="' +
      escapeAttr(footerNameAr) +
      '">' +
      footerNameAr +
      "</span>\n";
  }
  html +=
    '                <p class="footer-tagline" data-lang-en="' +
    escapeAttr(footerTaglineEn) +
    '" data-lang-ar="' +
    escapeAttr(footerTaglineAr) +
    '">' +
    footerTaglineAr +
    "</p>\n";
  html += '                <div class="footer-socials">\n';
  if (data.instagram) {
    html +=
      '                    <a href="https://instagram.com/' +
      data.instagram.replace("@", "") +
      '" target="_blank" class="footer-social"><i class="fab fa-instagram"></i></a>\n';
  }
  html +=
    '                    <a href="https://wa.me/' +
    data.whatsappNumber +
    '" target="_blank" class="footer-social"><i class="fab fa-whatsapp"></i></a>\n';
  html += "                </div>\n";
  html += "            </div>\n";
  html += '            <div class="footer-col">\n';
  html +=
    '                <h4 class="footer-col-title" data-i18n="footer_shop">Shop</h4>\n';
  html += '                <ul class="footer-links">\n';
  data.categories.forEach((cat) => {
    html +=
      '                    <li><a href="#shop" data-filter="' +
      cat.id +
      '" data-lang-en="' +
      escapeAttr(cat.nameEn) +
      '" data-lang-ar="' +
      escapeAttr(cat.nameAr || cat.nameEn) +
      '">' +
      (cat.nameAr || cat.nameEn) +
      "</a></li>\n";
  });
  html += "                </ul>\n";
  html += "            </div>\n";
  html += '            <div class="footer-col">\n';
  html +=
    '                <h4 class="footer-col-title" data-i18n="footer_contact">Contact</h4>\n';
  html += '                <div class="footer-contact">\n';
  if (data.phoneNumber) {
    html +=
      '                    <div class="footer-contact-item"><i class="fas fa-phone"></i><span>' +
      data.phoneNumber +
      "</span></div>\n";
  }
  html +=
    '                    <div class="footer-contact-item"><i class="fab fa-whatsapp"></i><a href="https://wa.me/' +
    data.whatsappNumber +
    '" target="_blank">WhatsApp</a></div>\n';
  if (data.email) {
    html +=
      '                    <div class="footer-contact-item"><i class="fas fa-envelope"></i><a href="mailto:' +
      data.email +
      '">' +
      data.email +
      "</a></div>\n";
  }
  if (data.location) {
    html +=
      '                    <div class="footer-contact-item"><i class="fas fa-location-dot"></i><span>' +
      data.location +
      "</span></div>\n";
  }
  html += "                </div>\n";
  html +=
    '                <a href="https://wa.me/' +
    data.whatsappNumber +
    '" target="_blank" class="footer-wa-btn">\n';
  html += '                    <i class="fab fa-whatsapp"></i>\n';
  html +=
    '                    <span data-i18n="footer_wa">Chat on WhatsApp</span>\n';
  html += "                </a>\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += '        <div class="footer-bottom">\n';
  html +=
    "            <span>&copy; " +
    new Date().getFullYear() +
    ' <span data-lang-en="' +
    escapeAttr(footerNameEn) +
    '" data-lang-ar="' +
    escapeAttr(footerNameAr) +
    '">' +
    footerNameAr +
    "</span>" +
    " — All Rights Reserved</span>\n";
  html += "        </div>\n";
  html += "    </footer>\n\n";

  // Cart Drawer
  if (data.enableCart) {
    html += "    <!-- Cart Drawer -->\n";
    html += '    <div class="cart-overlay" id="cartOverlay"></div>\n';
    html += '    <div class="cart-drawer" id="cartDrawer">\n';
    html += '        <div class="cart-head">\n';
    html +=
      '            <span class="cart-head-title" data-i18n="cart_title">Shopping Cart</span>\n';
    html +=
      '            <button class="cart-close-btn" id="cartClose"><i class="fas fa-times"></i></button>\n';
    html += "        </div>\n";
    html += '        <div class="cart-body" id="cartBody"></div>\n';
    html +=
      '        <div class="cart-foot" id="cartFoot" style="display:none">\n';
    html +=
      '            <input class="cart-input" id="custName" placeholder="Your name" data-ph-ar="اسمك" data-ph-en="Your name">\n';
    html +=
      '            <input class="cart-input" id="custAddress" placeholder="Your address" data-ph-ar="عنوانك" data-ph-en="Your address">\n';
    html += '            <div class="cart-total-row">\n';
    html +=
      '                <span class="cart-total-lbl" data-i18n="cart_total">Total</span>\n';
    html += "                <div>\n";
    html +=
      '                    <div class="cart-total-val" id="cartTotalVal">' +
      currencySymbol +
      "0</div>\n";
    html += "                </div>\n";
    html += "            </div>\n";
    html += '            <button class="cart-wa-btn" onclick="checkoutWA()">\n';
    html += '                <i class="fab fa-whatsapp"></i>\n';
    html +=
      '                <span data-i18n="cart_checkout">Order via WhatsApp</span>\n';
    html += "            </button>\n";
    html += "        </div>\n";
    html += "    </div>\n\n";
  }

  // Wishlist Drawer
  if (data.enableWishlist) {
    html += "    <!-- Wishlist Drawer -->\n";
    html += '    <div class="cart-overlay" id="wishlistOverlay"></div>\n';
    html += '    <div class="cart-drawer" id="wishlistDrawer">\n';
    html += '        <div class="cart-head">\n';
    html +=
      '            <span class="cart-head-title" data-i18n="wishlist_title">Wishlist</span>\n';
    html +=
      '            <button class="cart-close-btn" id="wishlistClose"><i class="fas fa-times"></i></button>\n';
    html += "        </div>\n";
    html += '        <div class="cart-body" id="wishlistBody"></div>\n';
    html += "    </div>\n\n";
  }

  // Product Modal
  html += "    <!-- Product Modal -->\n";
  html += '    <div class="modal-overlay" id="productModalOverlay">\n';
  html += '        <div class="product-modal" id="productModal">\n';
  html +=
    '            <button class="modal-close-btn" id="modalClose"><i class="fas fa-times"></i></button>\n';
  html += '            <div class="modal-img-side">\n';
  html += '                <img id="modalImg" src="" alt="">\n';
  html += "            </div>\n";
  html += '            <div class="modal-content">\n';
  html += '                <span class="modal-cat-tag" id="modalCat"></span>\n';
  html += '                <h2 class="modal-title" id="modalTitle"></h2>\n';
  html += '                <div class="modal-price-row">\n';
  html +=
    '                    <span class="modal-price-main" id="modalPrice"></span>\n';
  html +=
    '                    <span class="modal-price-orig" id="modalOrigPrice" style="display:none"></span>\n';
  html += "                </div>\n";
  html += '                <div id="modalSizesBlock">\n';
  html +=
    '                    <div class="modal-lbl" data-i18n="lbl_size">Size</div>\n';
  html +=
    '                    <div class="sizes-wrap" id="modalSizes"></div>\n';
  html += "                </div>\n";
  html += '                <div class="qty-row">\n';
  html +=
    '                    <span class="modal-lbl" data-i18n="lbl_qty">Quantity</span>\n';
  html += '                    <div class="qty-stepper">\n';
  html +=
    '                        <button onclick="changeModalQty(-1)"><i class="fas fa-minus"></i></button>\n';
  html +=
    '                        <span class="qty-num" id="modalQtyNum">1</span>\n';
  html +=
    '                        <button onclick="changeModalQty(1)"><i class="fas fa-plus"></i></button>\n';
  html += "                    </div>\n";
  html += "                </div>\n";
  html += '                <div class="modal-actions">\n';
  if (data.enableCart) {
    html +=
      '                    <button class="modal-add-btn" id="modalAddBtn"><i class="fas fa-shopping-bag"></i><span data-i18n="add_cart">Add to Cart</span></button>\n';
  }
  html +=
    '                    <a class="modal-wa-btn" id="modalWaBtn" target="_blank">\n';
  html += '                        <i class="fab fa-whatsapp"></i>\n';
  html +=
    '                        <span data-i18n="order_wa">Order via WhatsApp</span>\n';
  html += "                    </a>\n";
  html += "                </div>\n";
  html +=
    '                <div class="modal-recommendations" id="modalRecommendationsBlock">\n';
  html += '                    <div class="recommendations-head">\n';
  html += "                        <div>\n";
  html +=
    '                            <span class="recommendations-kicker" data-i18n="recommended_kicker">Recommended</span>\n';
  html +=
    '                            <h3 data-i18n="recommended_title">You may also like</h3>\n';
  html += "                        </div>\n";
  html +=
    '                        <span class="recommendations-count" id="recommendationsCount"></span>\n';
  html += "                    </div>\n";
  html +=
    '                    <div class="recommendations-grid" id="modalRecommendations"></div>\n';
  html += "                </div>\n";
  html += "            </div>\n";
  html += "        </div>\n";
  html += "    </div>\n\n";

  // WhatsApp Float Button
  if (data.enableWhatsappFloat) {
    html += "    <!-- WhatsApp Float Button -->\n";
    html +=
      '    <a href="https://wa.me/' +
      data.whatsappNumber +
      '" target="_blank" class="wa-float" title="Chat on WhatsApp">\n';
    html += '        <i class="fab fa-whatsapp"></i>\n';
    html += "    </a>\n\n";
  }

  html += '    <script src="script.js"><\/script>\n';
  html += "</body>\n";
  html += "</html>";

  return html;
}

function generateCSS(data) {
  const primary = normalizeHex(data.primaryColor, "#1a1a1a");
  const secondary = normalizeHex(data.secondaryColor, "#d4a017");
  const tertiary = normalizeHex(data.tertiaryColor, "#0ea5e9");
  const lightBg = normalizeHex(data.lightBgColor, "#fafafa");
  const lightSurface = normalizeHex(data.lightSurfaceColor, "#ffffff");
  const lightSurface2 = normalizeHex(data.lightSurface2Color, "#f3f3f3");
  const lightText = normalizeHex(data.lightTextColor, "#1a1a1a");
  const lightMuted = normalizeHex(data.lightMutedColor, "#888888");
  const lightBorder = normalizeHex(data.lightBorderColor, "#e5e5e5");
  const darkPrimary = normalizeHex(data.darkPrimaryColor, secondary);
  const darkSecondary = normalizeHex(data.darkSecondaryColor, secondary);
  const darkTertiary = normalizeHex(data.darkTertiaryColor, tertiary);
  const darkBg = normalizeHex(data.darkBgColor, "#1a1b23");
  const darkSurface = normalizeHex(data.darkSurfaceColor, "#22253a");
  const darkSurface2 = normalizeHex(data.darkSurface2Color, "#2a2e45");
  const darkText = normalizeHex(data.darkTextColor, "#e8eaf0");
  const darkMuted = normalizeHex(data.darkMutedColor, "#8b90a8");
  const darkBorder = normalizeHex(data.darkBorderColor, "#353a54");
  const bannerStart = normalizeHex(data.bannerStartColor, secondary);
  const bannerEnd = normalizeHex(data.bannerEndColor, primary);
  const imageRing = normalizeHex(data.imageRingColor, secondary);
  const imageOverlay = normalizeHex(data.imageOverlayColor, "#0f0f0f");
  const heroCard = normalizeHex(data.heroCardColor, "#ffffff");
  const fonts = getDesignFonts(data);

  let css = "/* ============================\n";
  css += "   CSS VARIABLES — LIGHT MODE\n";
  css += "   ============================ */\n";
  css += ":root {\n";
  css += "    --bg: " + lightBg + ";\n";
  css += "    --surface: " + lightSurface + ";\n";
  css += "    --surface2: " + lightSurface2 + ";\n";
  css += "    --accent: " + primary + ";\n";
  css += "    --accent-pop: " + secondary + ";\n";
  css += "    --accent-tertiary: " + tertiary + ";\n";
  css += "    --banner-start: " + bannerStart + ";\n";
  css += "    --banner-end: " + bannerEnd + ";\n";
  css += "    --image-ring: " + imageRing + ";\n";
  css += "    --image-overlay: " + imageOverlay + ";\n";
  css += "    --hero-card-bg: " + heroCard + ";\n";
  css += "    --red: #e03131;\n";
  css += "    --text: " + lightText + ";\n";
  css += "    --muted: " + lightMuted + ";\n";
  css += "    --border: " + lightBorder + ";\n";
  css += "    --wa: #25d366;\n";
  css += "    --radius: 8px;\n";
  css += "    --shadow: 0 2px 16px rgba(0,0,0,0.08);\n";
  css += "    --shadow-hover: 0 8px 32px rgba(0,0,0,0.14);\n";
  css += "    --font-en-heading: " + fonts.enHeading.css + ";\n";
  css += "    --font-en-body: " + fonts.enBody.css + ";\n";
  css += "    --font-ar-heading: " + fonts.arHeading.css + ";\n";
  css += "    --font-ar-body: " + fonts.arBody.css + ";\n";
  css += "}\n\n";

  css += "/* DARK MODE */\n";
  css += "body.dark {\n";
  css += "    --bg: " + darkBg + ";\n";
  css += "    --surface: " + darkSurface + ";\n";
  css += "    --surface2: " + darkSurface2 + ";\n";
  css += "    --accent: " + darkPrimary + ";\n";
  css += "    --accent-pop: " + darkSecondary + ";\n";
  css += "    --accent-tertiary: " + darkTertiary + ";\n";
  css += "    --text: " + darkText + ";\n";
  css += "    --muted: " + darkMuted + ";\n";
  css += "    --border: " + darkBorder + ";\n";
  css += "    --shadow: 0 2px 16px rgba(0,0,0,0.25);\n";
  css += "    --shadow-hover: 0 8px 32px rgba(0,0,0,0.4);\n";
  css += "}\n\n";

  css += "/* RESET */\n";
  css +=
    "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n";
  css += "html { scroll-behavior: smooth; }\n";
  css +=
    "body { background: var(--bg); color: var(--text); font-family: var(--font-ar-body); line-height: 1.6; transition: background 0.3s, color 0.3s; }\n";
  css += "body.lang-en { font-family: var(--font-en-body); }\n";
  css += 'html[dir="ltr"] body { font-family: var(--font-en-body); }\n';
  css +=
    "h1, h2, h3, .section-title, .hero-title, .nav-brand-name, .footer-big { font-family: var(--font-ar-heading); }\n";
  css +=
    "body.lang-en h1, body.lang-en h2, body.lang-en h3, body.lang-en .section-title, body.lang-en .hero-title, body.lang-en .nav-brand-name, body.lang-en .footer-big { font-family: var(--font-en-heading); }\n";
  css +=
    'html[dir="ltr"] h1, html[dir="ltr"] h2, html[dir="ltr"] h3, html[dir="ltr"] .section-title, html[dir="ltr"] .hero-title, html[dir="ltr"] .nav-brand-name, html[dir="ltr"] .footer-big { font-family: var(--font-en-heading); }\n';
  css += "a { text-decoration: none; color: inherit; }\n";
  css +=
    "button { cursor: pointer; border: none; background: none; font-family: inherit; }\n";
  css += "img { max-width: 100%; height: auto; }\n";
  css += "input, select, textarea { font-size: max(16px, 1rem); }\n\n";

  css += "/* UTILITIES */\n";
  css +=
    ".container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px); }\n";
  css +=
    ".section-title { font-size: clamp(1.6rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 8px; }\n";
  css += ".section-subtitle { color: var(--muted); font-size: 1rem; }\n";
  css += ".section-header { text-align: center; margin-bottom: 40px; }\n\n";

  css += "/* BUTTONS */\n";
  css +=
    ".btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 1rem; font-weight: 600; border-radius: var(--radius); transition: all 0.25s; min-height: 48px; }\n";
  css += ".btn-primary { background: var(--accent); color: #fff; }\n";
  css +=
    ".btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); opacity: 0.9; }\n";
  css += ".btn-wa { background: var(--wa); color: #fff; }\n";
  css += ".btn-wa:hover { background: #1da851; }\n";
  css += "body.dark .btn-primary { color: var(--bg); }\n\n";

  css += "/* NAVBAR */\n";
  css +=
    ".navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 70px; padding: 0 clamp(16px, 4vw, 48px); display: flex; align-items: center; justify-content: space-between; gap: clamp(6px, 1.2vw, 16px); background: var(--surface); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px); min-width: 0; }\n";
  css += ".nav-brand { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1 1 260px; }\n";
  css += ".nav-brand-text { min-width: 0; overflow: hidden; }\n";
  css += ".nav-logo { height: 40px; width: auto; }\n";
  css +=
    ".nav-brand-name { display: block; font-size: clamp(1rem, 2.2vw, 1.5rem); font-weight: 800; line-height: 1.15; color: var(--accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n";
  css +=
    ".nav-brand-sub { display: block; font-size: 0.75rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n";
  css +=
    ".nav-links { display: flex; gap: 4px; flex: 1 1 auto; justify-content: center; min-width: 0; overflow-x: auto; scrollbar-width: none; }\n";
  css += ".nav-links::-webkit-scrollbar { display: none; }\n";
  css +=
    ".nav-link { padding: 8px 12px; color: var(--text); font-weight: 500; border-radius: var(--radius); transition: all 0.2s; white-space: nowrap; flex: 0 0 auto; }\n";
  css +=
    ".nav-link:hover { background: var(--surface2); color: var(--accent); }\n";
  css += ".nav-actions { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }\n";
  css +=
    ".nav-icon-btn { position: relative; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text); font-size: 1.1rem; transition: all 0.2s; }\n";
  css += ".nav-icon-btn:hover { background: var(--surface2); }\n";
  css +=
    ".nav-badge { position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; background: var(--accent); color: #fff; border-radius: 50%; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }\n";
  css += "body.dark .nav-badge { color: var(--bg); }\n";
  css +=
    ".lang-toggle-btn { padding: 6px 14px; border: 1.5px solid var(--accent); color: var(--accent); border-radius: 20px; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; }\n";
  css += ".lang-toggle-btn:hover { background: var(--accent); color: #fff; }\n";
  css += "body.dark .lang-toggle-btn:hover { color: var(--bg); }\n";
  css +=
    ".dark-toggle-btn { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text); font-size: 1.1rem; transition: all 0.2s; }\n";
  css += ".dark-toggle-btn:hover { background: var(--surface2); }\n";
  css +=
    ".hamburger { display: none; flex-direction: column; gap: 5px; width: 44px; height: 44px; align-items: center; justify-content: center; }\n";
  css +=
    ".hamburger span { width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: all 0.3s; }\n\n";
  css += "@media (max-width: 1180px) {\n";
  css += "    .nav-brand-sub { display: none; }\n";
  css += "    .nav-link { padding: 8px 10px; font-size: 0.9rem; }\n";
  css += "}\n\n";
  css += "@media (max-width: 980px) {\n";
  css += "    .nav-links { display: none; }\n";
  css += "    .hamburger { display: flex; }\n";
  css += "}\n\n";

  css += "/* SEARCH BAR */\n";
  css +=
    ".search-bar { position: fixed; top: 82px; left: clamp(16px, 4vw, 48px); right: clamp(16px, 4vw, 48px); z-index: 999; background: color-mix(in srgb, var(--surface) 92%, transparent); border: 1px solid var(--border); border-radius: calc(var(--radius) * 2); padding: 10px; display: flex; gap: 10px; transform: translateY(-14px); opacity: 0; transition: all 0.25s; pointer-events: none; box-shadow: var(--shadow-hover); backdrop-filter: blur(18px); }\n";
  css +=
    ".search-bar.open { transform: translateY(0); opacity: 1; pointer-events: all; }\n";
  css +=
    '.search-bar::before { content: "\\f002"; font-family: "Font Awesome 6 Free"; font-weight: 900; width: 44px; height: 44px; border-radius: var(--radius); background: var(--surface2); color: var(--accent); display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }\n';
  css +=
    ".search-bar input { flex: 1; min-width: 0; padding: 12px 4px; background: transparent; border: 0; font-size: 1rem; color: var(--text); outline: none; }\n";
  css +=
    ".search-bar:focus-within { border-color: var(--accent); box-shadow: 0 16px 40px rgba(0,0,0,0.16); }\n";
  css +=
    ".search-close-btn { width: 44px; height: 44px; background: var(--surface2); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; }\n";
  css +=
    ".search-close-btn:hover { background: var(--accent); color: #fff; }\n\n";

  css += "/* MOBILE DRAWER */\n";
  css +=
    ".drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1998; display: none; }\n";
  css += ".drawer-overlay.open { display: block; }\n";
  css +=
    ".mobile-drawer { position: fixed; top: 0; bottom: 0; width: min(320px, 90vw); background: var(--surface); z-index: 1999; display: none; flex-direction: column; }\n";
  css += 'html[dir="ltr"] .mobile-drawer { right: 0; }\n';
  css += 'html[dir="rtl"] .mobile-drawer { left: 0; }\n';
  css += ".mobile-drawer.open { display: flex; }\n";
  css +=
    ".drawer-header { padding: 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }\n";
  css +=
    ".drawer-close { width: 44px; height: 44px; background: var(--surface2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; }\n";
  css += ".drawer-close:hover { background: var(--accent); color: #fff; }\n";
  css += ".drawer-nav { padding: 16px; flex: 1; }\n";
  css +=
    ".drawer-nav a { display: block; padding: 16px; font-size: 1.2rem; font-weight: 600; border-bottom: 1px solid var(--border); transition: all 0.2s; }\n";
  css +=
    ".drawer-nav a:hover { background: var(--surface2); color: var(--accent); }\n";
  css +=
    ".drawer-footer { padding: 20px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 12px; }\n";
  css += ".drawer-lang { display: flex; gap: 8px; }\n";
  css +=
    ".drawer-lang button { flex: 1; padding: 12px; border-radius: var(--radius); border: 1.5px solid var(--border); font-weight: 700; color: var(--muted); background: var(--surface2); transition: all 0.2s; }\n";
  css +=
    ".drawer-lang button.active { background: var(--accent); color: #fff; border-color: var(--accent); }\n";
  css += "body.dark .drawer-lang button.active { color: var(--bg); }\n";
  css +=
    ".drawer-dark-btn { padding: 12px; border-radius: var(--radius); border: 1.5px solid var(--border); font-weight: 700; color: var(--text); background: var(--surface2); display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }\n";
  css +=
    ".drawer-dark-btn:hover { border-color: var(--accent); color: var(--accent); }\n\n";

  css += "/* HERO */\n";
  css +=
    ".hero { min-height: 100vh; display: flex; align-items: center; padding: 100px clamp(16px, 4vw, 64px) 60px; position: relative; overflow: hidden; background: var(--bg); }\n";
  css +=
    ".hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 25% 25%, color-mix(in srgb, var(--banner-start) 24%, transparent) 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, color-mix(in srgb, var(--banner-end) 20%, transparent) 0%, transparent 50%); pointer-events: none; }\n";
  css +=
    ".hero-inner { max-width: 1280px; margin: 0 auto; width: 100%; position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 0.92fr) minmax(320px, 1.08fr); align-items: center; gap: clamp(32px, 6vw, 72px); }\n";
  css += ".hero-content { max-width: 620px; }\n";
  css +=
    ".hero-kicker, .section-kicker { display: inline-flex; width: fit-content; margin-bottom: 16px; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--accent); font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }\n";
  css +=
    ".hero-title { font-size: 4.75rem; font-weight: 800; line-height: 1; margin-bottom: 12px; }\n";
  css +=
    ".hero-subtitle-ar { font-size: clamp(1.5rem, 4vw, 2.5rem); color: var(--muted); margin-bottom: 16px; }\n";
  css +=
    ".hero-desc { font-size: 1.1rem; color: var(--muted); margin-bottom: 32px; }\n";
  css += ".hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }\n";
  css +=
    ".hero-carousel { position: relative; min-height: min(620px, 72vh); border-radius: calc(var(--radius) * 2); overflow: hidden; background: var(--surface2); box-shadow: var(--shadow-hover); border: 1px solid color-mix(in srgb, var(--image-ring) 46%, var(--border)); }\n";
  css +=
    ".hero-carousel-track, .hero-slide { position: absolute; inset: 0; }\n";
  css += ".hero-slide { opacity: 0; transition: opacity 0.6s ease; }\n";
  css += ".hero-slide.active { opacity: 1; }\n";
  css += ".hero-slide img { width: 100%; height: 100%; object-fit: cover; }\n";
  css +=
    '.hero-carousel::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, color-mix(in srgb, var(--image-overlay) 58%, transparent), transparent 52%); pointer-events: none; }\n';
  css +=
    ".hero-carousel-card { position: absolute; left: 20px; right: 20px; bottom: 20px; z-index: 2; padding: 16px; border-radius: var(--radius); background: color-mix(in srgb, var(--hero-card-bg) 88%, transparent); border: 1px solid color-mix(in srgb, var(--image-ring) 32%, transparent); backdrop-filter: blur(16px); display: flex; flex-direction: column; gap: 4px; color: var(--text); }\n";
  css +=
    ".hero-carousel-card span { font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); }\n";
  css += ".hero-carousel-card strong { font-size: 1.15rem; }\n";
  css +=
    ".hero-carousel-dots { position: absolute; top: 18px; right: 18px; z-index: 3; display: flex; gap: 8px; }\n";
  css += 'html[dir="rtl"] .hero-carousel-dots { right: auto; left: 18px; }\n';
  css +=
    ".hero-dot { width: 10px; height: 10px; border-radius: 999px; background: color-mix(in srgb, var(--hero-card-bg) 64%, transparent); transition: all 0.2s; }\n";
  css += ".hero-dot.active { width: 26px; background: var(--hero-card-bg); }\n\n";

  css += "/* VIDEO */\n";
  css +=
    ".stats-section { padding: clamp(26px, 4vw, 46px) 0; background: var(--bg); border-block: 1px solid var(--border); }\n";
  css +=
    ".stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(12px, 2vw, 20px); }\n";
  css +=
    ".stat-card { min-height: 136px; padding: clamp(20px, 3vw, 28px); border-radius: calc(var(--radius) * 1.35); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); display: flex; flex-direction: column; justify-content: center; gap: 8px; text-align: center; }\n";
  css +=
    ".stat-card strong { color: var(--accent); font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1; font-weight: 900; }\n";
  css +=
    ".stat-card span { color: var(--muted); font-size: 0.92rem; font-weight: 800; }\n\n";
  css +=
    ".stat-number { display: inline-block; min-width: 3ch; font-variant-numeric: tabular-nums; }\n";
  css +=
    ".reveal-item { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }\n";
  css +=
    ".reveal-item.in-view { opacity: 1; transform: translateY(0); }\n\n";
  css +=
    "@media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } }\n\n";

  css +=
    ".video-section { padding: clamp(60px, 8vw, 100px) 0; background: var(--surface); }\n";
  css +=
    ".video-layout { display: grid; grid-template-columns: minmax(240px, 0.72fr) minmax(320px, 1.28fr); gap: clamp(24px, 5vw, 56px); align-items: center; }\n";
  css += ".video-copy { max-width: 460px; }\n";
  css +=
    ".video-frame-wrap { position: relative; overflow: hidden; border-radius: calc(var(--radius) * 2); aspect-ratio: 16/9; background: #111; box-shadow: var(--shadow-hover); border: 1px solid color-mix(in srgb, var(--image-ring) 42%, var(--border)); }\n";
  css +=
    ".video-frame-wrap iframe, .video-frame-wrap video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; object-fit: cover; }\n\n";

  css += "/* CATEGORIES */\n";
  css +=
    ".categories { padding: clamp(60px, 8vw, 100px) 0; background: var(--surface); }\n";
  css +=
    ".categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(14px, 2vw, 24px); }\n";
  css +=
    ".cat-card { position: relative; aspect-ratio: 4/5; border-radius: calc(var(--radius) * 1.35); overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; border: 1px solid color-mix(in srgb, var(--border) 80%, transparent); background: var(--surface2); }\n";
  css +=
    ".cat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, color-mix(in srgb, var(--image-overlay) 14%, transparent), color-mix(in srgb, var(--image-overlay) 88%, transparent)); z-index: 1; }\n";
  css +=
    ".cat-card::after { content: ''; position: absolute; inset: 10px; border: 1px solid color-mix(in srgb, var(--image-ring) 55%, #ffffff); border-radius: calc(var(--radius) * 1.05); z-index: 2; pointer-events: none; opacity: 0; transition: opacity 0.3s; }\n";
  css +=
    ".cat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); border-color: var(--accent-pop); }\n";
  css += ".cat-card:hover::after { opacity: 1; }\n";
  css += ".cat-card:hover .cat-bg { transform: scale(1.05); }\n";
  css +=
    ".cat-bg { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 0.5s; }\n";
  css +=
    ".cat-info { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(16px, 3vw, 24px); z-index: 3; }\n";
  css +=
    ".cat-count { display: inline-flex; width: fit-content; margin-bottom: 10px; padding: 4px 10px; border-radius: 999px; background: color-mix(in srgb, var(--hero-card-bg) 24%, transparent); color: rgba(255,255,255,0.88); font-size: 0.72rem; font-weight: 800; backdrop-filter: blur(10px); }\n";
  css +=
    ".cat-name { font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 4px; }\n";
  css += ".cat-name-ar { font-size: 0.9rem; color: rgba(255,255,255,0.8); }\n";
  css +=
    ".cat-arrow { position: absolute; top: 14px; right: 14px; width: 38px; height: 38px; background: color-mix(in srgb, var(--hero-card-bg) 92%, transparent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); z-index: 3; opacity: 0; transform: translate(8px, -8px); transition: all 0.3s; }\n";
  css +=
    'html[dir="rtl"] .cat-arrow { right: auto; left: 12px; transform: translate(-8px, -8px); }\n';
  css +=
    ".cat-card:hover .cat-arrow { opacity: 1; transform: translate(0, 0); }\n\n";

  css += "/* SHOP */\n";
  css +=
    ".shop { padding: clamp(60px, 8vw, 100px) 0; background: var(--bg); }\n";
  css +=
    ".shop-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-bottom: 24px; }\n";
  css +=
    ".filter-bar { display: flex; gap: 8px; overflow-x: auto; max-width: 100%; padding: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.5); box-shadow: var(--shadow); scrollbar-width: thin; }\n";
  css +=
    ".filter-pill { padding: 10px 18px; border-radius: var(--radius); border: 1px solid transparent; background: transparent; color: var(--muted); font-size: 0.9rem; font-weight: 800; white-space: nowrap; transition: all 0.25s; }\n";
  css +=
    ".filter-pill:hover { color: var(--text); background: var(--surface2); }\n";
  css +=
    ".filter-pill.active { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 25%, transparent); }\n";
  css += "body.dark .filter-pill.active { color: var(--bg); }\n";

  css += "/* ADVANCED FILTERS */\n";
  css +=
    ".adv-filters-bar { display: grid; grid-template-columns: repeat(4, minmax(140px, 1fr)) auto; gap: 12px; align-items: end; margin-bottom: 18px; padding: 16px; background: var(--surface); border-radius: calc(var(--radius) * 1.5); border: 1px solid var(--border); box-shadow: var(--shadow); }\n";
  css +=
    ".adv-filter-group { display: flex; flex-direction: column; gap: 6px; min-width: 0; }\n";
  css +=
    ".adv-filter-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); }\n";
  css +=
    ".adv-filter-select { width: 100%; padding: 11px 12px; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); font-size: 0.9rem; color: var(--text); font-family: inherit; cursor: pointer; outline: none; }\n";
  css += ".adv-filter-select:focus { border-color: var(--accent); }\n";
  css +=
    ".adv-price-inputs { display: flex; align-items: center; gap: 6px; }\n";
  css +=
    ".adv-price-input { width: min(96px, 100%); padding: 11px 10px; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); font-size: 0.85rem; color: var(--text); text-align: center; }\n";
  css +=
    ".adv-price-input:focus { outline: none; border-color: var(--accent); }\n";
  css += ".adv-price-sep { color: var(--muted); font-size: 0.85rem; }\n";
  css +=
    ".adv-reset-btn { min-height: 44px; padding: 10px 16px; border-radius: var(--radius); border: 1.5px solid var(--border); background: var(--surface2); color: var(--muted); font-size: 0.85rem; font-weight: 800; white-space: nowrap; transition: all 0.2s; }\n";
  css +=
    ".adv-reset-btn:hover { border-color: var(--accent); color: var(--accent); }\n";
  css +=
    ".products-results-count { width: fit-content; font-size: 0.85rem; font-weight: 700; color: var(--muted); margin-bottom: 12px; padding: 6px 10px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); }\n";

  css +=
    ".products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 2vw, 20px); }\n";
  css +=
    ".product-card { background: var(--surface); border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; cursor: pointer; transition: all 0.3s; }\n";
  css +=
    ".product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); border-color: var(--accent-pop); }\n";
  css +=
    ".card-img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; border: 1.5px solid color-mix(in srgb, var(--image-ring) 35%, transparent); }\n";
  css +=
    ".card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }\n";
  css += ".product-card:hover .card-img-wrap img { transform: scale(1.05); }\n";
  css +=
    ".card-badge { position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: var(--radius); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; z-index: 2; }\n";
  css += 'html[dir="rtl"] .card-badge { left: auto; right: 10px; }\n';
  css += ".card-badge.new { background: var(--accent); color: #fff; }\n";
  css += "body.dark .card-badge.new { color: var(--bg); }\n";
  css += ".card-badge.sale { background: var(--red); color: #fff; }\n";
  css +=
    ".card-badge.bestseller { background: var(--accent-tertiary); color: #fff; }\n";
  css +=
    ".card-wish { position: absolute; top: 10px; right: 10px; width: 36px; height: 36px; background: color-mix(in srgb, var(--hero-card-bg) 90%, transparent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--muted); z-index: 2; transition: all 0.2s; }\n";
  css += 'html[dir="rtl"] .card-wish { right: auto; left: 10px; }\n';
  css += ".card-wish:hover, .card-wish.active { color: var(--red); }\n";
  css += ".card-body { padding: clamp(10px, 2vw, 16px); }\n";
  css +=
    ".card-name { font-size: clamp(0.85rem, 1.5vw, 1rem); font-weight: 700; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n";
  css +=
    ".card-stars { display: flex; align-items: center; gap: 4px; margin-bottom: 6px; color: var(--accent-pop); font-size: 0.75rem; }\n";
  css +=
    ".card-price { font-size: clamp(0.9rem, 1.5vw, 1.1rem); font-weight: 800; }\n";
  css +=
    ".card-price-orig { font-size: 0.85rem; color: var(--muted); text-decoration: line-through; margin-left: 8px; }\n";
  css +=
    'html[dir="rtl"] .card-price-orig { margin-left: 0; margin-right: 8px; }\n\n';

  css += "/* ABOUT */\n";
  css +=
    ".about { padding: clamp(60px, 8vw, 100px) 0; background: var(--surface); }\n";
  css +=
    ".about-content { max-width: 800px; margin: 0 auto; text-align: center; }\n";
  css +=
    ".about-text { font-size: 1.1rem; color: var(--text); margin-bottom: 16px; line-height: 1.8; }\n";
  css +=
    ".about-text-ar { font-size: 1.1rem; color: var(--muted); line-height: 1.8; }\n\n";

  css += "/* WHY CHOOSE US */\n";
  css +=
    ".why-section { padding: clamp(60px, 8vw, 100px) 0; background: var(--bg); }\n";
  css +=
    ".why-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 24px); }\n";
  css +=
    ".why-card { min-height: 260px; padding: clamp(22px, 3vw, 32px); border-radius: calc(var(--radius) * 1.5); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 14px; transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }\n";
  css +=
    ".why-card:hover { transform: translateY(-5px); border-color: var(--accent-pop); box-shadow: var(--shadow-hover); }\n";
  css +=
    ".why-card i { width: 52px; height: 52px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); font-size: 1.35rem; }\n";
  css +=
    ".why-card h3 { color: var(--text); font-size: 1.2rem; font-weight: 900; }\n";
  css +=
    ".why-card p { color: var(--muted); font-size: 0.96rem; line-height: 1.75; }\n\n";

  css += "/* CUSTOMER FEEDBACK */\n";
  css +=
    ".feedback-section { padding: clamp(60px, 8vw, 100px) 0; background: var(--bg); overflow: hidden; }\n";
  css +=
    ".feedback-shell { position: relative; display: grid; grid-template-columns: 48px minmax(0, 1120px) 48px; gap: 16px; align-items: center; justify-content: center; }\n";
  css += ".feedback-track { min-width: 0; }\n";
  css +=
    ".feedback-page { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 22px); animation: feedbackFade 0.35s ease; }\n";
  css +=
    ".feedback-card { min-height: 340px; padding: clamp(20px, 3vw, 30px); border-radius: calc(var(--radius) * 2); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-hover); display: flex; flex-direction: column; justify-content: space-between; gap: 20px; }\n";
  css +=
    "@keyframes feedbackFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }\n";
  css +=
    ".feedback-card-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; }\n";
  css +=
    ".feedback-photo { width: 64px; height: 64px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; overflow: hidden; flex: 0 0 auto; }\n";
  css +=
    ".feedback-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }\n";
  css += "body.dark .feedback-photo { color: var(--bg); }\n";
  css +=
    ".feedback-rating { display: flex; align-items: center; gap: 6px; color: var(--accent-pop); font-size: 1rem; }\n";
  css +=
    ".feedback-rating span { color: var(--muted); font-size: 0.86rem; font-weight: 800; margin-inline-start: 6px; }\n";
  css +=
    ".feedback-text { font-size: clamp(1rem, 1.5vw, 1.18rem); line-height: 1.55; font-weight: 700; color: var(--text); }\n";
  css +=
    ".feedback-person { display: flex; align-items: center; gap: 14px; }\n";
  css +=
    ".feedback-person strong { display: block; font-size: 1rem; color: var(--text); }\n";
  css +=
    ".feedback-person span { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 0.9rem; }\n";
  css +=
    ".feedback-nav { width: 48px; height: 48px; border-radius: 50%; background: var(--surface); color: var(--text); border: 1px solid var(--border); box-shadow: var(--shadow); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }\n";
  css +=
    ".feedback-nav:hover { background: var(--accent); color: #fff; border-color: var(--accent); transform: translateY(-2px); }\n";
  css +=
    ".feedback-dots { display: flex; justify-content: center; gap: 8px; margin-top: 22px; }\n";
  css +=
    ".feedback-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--border); transition: all 0.2s; }\n";
  css += ".feedback-dot.active { width: 28px; background: var(--accent); }\n\n";

  css += "/* MAP */\n";
  css +=
    ".map-section { padding: clamp(60px, 8vw, 100px) 0; background: var(--surface); }\n";
  css +=
    ".map-layout { display: grid; grid-template-columns: minmax(240px, 0.7fr) minmax(320px, 1.3fr); gap: clamp(24px, 5vw, 56px); align-items: center; }\n";
  css += ".map-copy { max-width: 480px; }\n";
  css +=
    ".map-link-btn { margin-top: 22px; display: inline-flex; align-items: center; gap: 10px; padding: 13px 18px; border-radius: var(--radius); background: var(--accent); color: #fff; font-weight: 800; transition: all 0.2s; }\n";
  css +=
    ".map-link-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }\n";
  css += "body.dark .map-link-btn { color: var(--bg); }\n";
  css +=
    ".map-frame-wrap { position: relative; overflow: hidden; border-radius: calc(var(--radius) * 2); min-height: 420px; background: var(--surface2); border: 1px solid var(--border); box-shadow: var(--shadow-hover); }\n";
  css +=
    ".map-frame-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }\n\n";

  css += "/* FOOTER */\n";
  css +=
    "footer { background: #1a1a1a; color: rgba(255,255,255,0.8); overflow: hidden; }\n";
  css += "footer * { min-width: 0; }\n";
  css += "body.dark footer { background: var(--bg); }\n";
  css +=
    ".footer-hero { padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }\n";
  css +=
    ".footer-big { max-width: 100%; font-size: clamp(2rem, 7vw, 6rem); font-weight: 800; color: #fff; letter-spacing: 4px; line-height: 1.05; margin-bottom: 16px; overflow-wrap: anywhere; word-break: break-word; }\n";
  css += 'html[dir="rtl"] .footer-big { letter-spacing: 0; }\n';
  css +=
    ".footer-underline { height: 4px; width: 100px; background: var(--accent-pop); margin: 0 auto; border-radius: 2px; }\n";
  css +=
    ".footer-main { max-width: 1280px; margin: 0 auto; padding: 48px clamp(16px, 4vw, 48px); display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr); gap: 40px; }\n";
  css += ".footer-brand, .footer-col { min-width: 0; }\n";
  css += ".footer-logo { height: 50px; width: auto; margin-bottom: 12px; }\n";
  css +=
    ".footer-brand-name { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 8px; display: block; overflow-wrap: anywhere; word-break: break-word; }\n";
  css +=
    ".footer-tagline { max-width: 100%; font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 20px; line-height: 1.8; overflow-wrap: anywhere; word-break: break-word; }\n";
  css += ".footer-socials { display: flex; gap: 10px; }\n";
  css +=
    ".footer-social { width: 44px; height: 44px; background: rgba(255,255,255,0.1); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 1.1rem; transition: all 0.25s; }\n";
  css +=
    ".footer-social:hover { background: var(--accent-pop); color: #fff; }\n";
  css +=
    ".footer-col-title { font-size: 0.9rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; line-height: 1.45; overflow-wrap: anywhere; word-break: break-word; }\n";
  css +=
    'html[dir="rtl"] .footer-col-title { text-transform: none; letter-spacing: 0; }\n';
  css += ".footer-links li { min-width: 0; }\n";
  css +=
    ".footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; min-width: 0; }\n";
  css +=
    ".footer-links a { display: inline-block; width: 100%; max-width: 100%; font-size: 0.9rem; line-height: 1.5; white-space: normal; color: rgba(255,255,255,0.6); transition: color 0.2s; overflow-wrap: anywhere; word-break: break-word; }\n";
  css += ".footer-links a:hover { color: #fff; }\n";
  css += ".footer-contact { margin-bottom: 20px; }\n";
  css +=
    ".footer-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 0.9rem; color: rgba(255,255,255,0.6); }\n";
  css += ".footer-contact-item i { width: 18px; color: var(--accent-pop); }\n";
  css +=
    ".footer-contact-item span, .footer-contact-item a { min-width: 0; max-width: 100%; overflow-wrap: anywhere; word-break: break-word; line-height: 1.6; }\n";
  css +=
    ".footer-contact-item a { color: rgba(255,255,255,0.6); transition: color 0.2s; }\n";
  css += ".footer-contact-item a:hover { color: #fff; }\n";
  css +=
    ".footer-wa-btn { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px; padding: 12px 20px; background: var(--wa); color: #fff; border-radius: var(--radius); font-weight: 700; text-align: center; line-height: 1.4; white-space: normal; transition: background 0.25s; }\n";
  css +=
    ".footer-wa-btn span { min-width: 0; overflow-wrap: anywhere; word-break: break-word; }\n";
  css += ".footer-wa-btn:hover { background: #1da851; }\n";
  css +=
    ".footer-bottom { max-width: 1280px; margin: 0 auto; padding: 20px clamp(16px, 4vw, 48px); border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 0.85rem; color: rgba(255,255,255,0.4); }\n\n";

  css += "/* CART / WISHLIST DRAWER */\n";
  css +=
    ".drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; display: none; }\n";
  css += ".drawer-backdrop.open { display: block; }\n";
  css +=
    ".cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; display: none; }\n";
  css += ".cart-overlay.open { display: block; }\n";
  css +=
    ".cart-drawer { position: fixed; top: 0; bottom: 0; width: min(400px, 100vw); background: var(--surface); z-index: 2001; display: none; flex-direction: column; box-shadow: -8px 0 32px rgba(0,0,0,0.2); transition: transform 0.3s ease; }\n";
  css += ".cart-drawer.open { display: flex; }\n";
  css += 'html[dir="ltr"] .cart-drawer { right: 0; }\n';
  css += 'html[dir="rtl"] .cart-drawer { left: 0; }\n';
  css +=
    ".cart-head { padding: 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }\n";
  css += ".cart-head-title { font-size: 1.3rem; font-weight: 700; }\n";
  css +=
    ".cart-close-btn { width: 44px; height: 44px; background: var(--surface2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; }\n";
  css += ".cart-close-btn:hover { background: var(--accent); color: #fff; }\n";
  css += ".cart-body { flex: 1; overflow-y: auto; padding: 16px; }\n";
  css +=
    ".cart-foot { padding: 20px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 12px; }\n";
  css +=
    ".cart-input { padding: 12px 16px; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); font-size: 1rem; color: var(--text); }\n";
  css += ".cart-input:focus { outline: none; border-color: var(--accent); }\n";
  css +=
    ".cart-total-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }\n";
  css += ".cart-total-lbl { font-weight: 700; font-size: 1rem; }\n";
  css +=
    ".cart-total-val { font-size: 1.5rem; font-weight: 800; text-align: right; }\n";
  css +=
    ".cart-wa-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; background: var(--wa); color: #fff; border-radius: var(--radius); font-size: 1rem; font-weight: 700; transition: background 0.25s; }\n";
  css += ".cart-wa-btn:hover { background: #1da851; }\n";
  css +=
    ".cart-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }\n";
  css +=
    ".cart-item-img { width: 70px; height: 70px; border-radius: var(--radius); object-fit: cover; }\n";
  css += ".cart-item-info { flex: 1; }\n";
  css +=
    ".cart-item-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }\n";
  css += ".cart-item-price { font-weight: 700; color: var(--accent); }\n";
  css += ".cart-item-size { font-size: 0.8rem; color: var(--muted); }\n";
  css +=
    ".cart-item-qty { display: flex; align-items: center; gap: 8px; margin-top: 8px; }\n";
  css +=
    ".qty-btn { width: 28px; height: 28px; background: var(--surface2); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--text); font-size: 0.8rem; transition: all 0.2s; }\n";
  css += ".qty-btn:hover { background: var(--accent); color: #fff; }\n";
  css +=
    ".cart-remove { width: 32px; height: 32px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; }\n";
  css +=
    ".cart-remove:hover { background: rgba(224, 49, 49, 0.1); color: var(--red); }\n";
  css +=
    ".cart-empty { padding: 60px 20px; text-align: center; color: var(--muted); }\n";
  css +=
    ".cart-empty i { font-size: 3rem; margin-bottom: 16px; opacity: 0.3; }\n";
  css += ".cart-empty p { font-size: 1rem; }\n\n";

  css += "/* PRODUCT MODAL */\n";
  css +=
    ".modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 3000; display: none; align-items: center; justify-content: center; padding: 20px; }\n";
  css += ".modal-overlay.open { display: flex; }\n";
  css +=
    ".product-modal { background: var(--surface); border-radius: calc(var(--radius) * 1.5); max-width: 1120px; width: 100%; max-height: 88vh; overflow: hidden; display: grid; grid-template-columns: minmax(280px, 36%) minmax(0, 64%); box-shadow: 0 24px 80px rgba(0,0,0,0.3); border: 1px solid var(--border); }\n";
  css +=
    ".modal-close-btn { position: absolute; top: 12px; right: 12px; width: 44px; height: 44px; background: var(--surface2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text); z-index: 10; transition: all 0.2s; }\n";
  css += 'html[dir="rtl"] .modal-close-btn { right: auto; left: 12px; }\n';
  css += ".modal-close-btn:hover { background: var(--red); color: #fff; }\n";
  css +=
    ".modal-img-side { position: relative; background: var(--surface2); }\n";
  css +=
    ".modal-img-side img { width: 100%; height: 100%; object-fit: cover; min-height: 360px; }\n";
  css +=
    ".modal-content { padding: clamp(18px, 3vw, 28px); overflow-y: auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(190px, 240px); align-content: start; gap: 13px 18px; }\n";
  css += ".modal-content > :not(.modal-recommendations) { grid-column: 1; }\n";
  css +=
    ".modal-cat-tag { display: inline-block; padding: 4px 12px; background: var(--surface2); border-radius: var(--radius); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; width: fit-content; }\n";
  css +=
    ".modal-title { font-size: clamp(1.25rem, 2.4vw, 1.7rem); font-weight: 800; line-height: 1.15; }\n";
  css +=
    ".modal-price-row { display: flex; align-items: baseline; gap: 12px; }\n";
  css +=
    ".modal-price-main { font-size: 1.35rem; font-weight: 800; color: var(--accent); }\n";
  css +=
    ".modal-price-orig { font-size: 1rem; color: var(--muted); text-decoration: line-through; }\n";
  css +=
    ".modal-lbl { font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; }\n";
  css += ".sizes-wrap { display: flex; gap: 8px; flex-wrap: wrap; }\n";
  css +=
    ".size-opt { min-width: 40px; height: 40px; padding: 0 10px; border: 1.5px solid var(--border); border-radius: var(--radius); background: var(--surface2); color: var(--text); font-weight: 600; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; }\n";
  css +=
    ".size-opt:hover, .size-opt.selected { background: var(--accent); color: #fff; border-color: var(--accent); }\n";
  css += "body.dark .size-opt.selected { color: var(--bg); }\n";
  css += ".qty-row { display: flex; align-items: center; gap: 16px; }\n";
  css +=
    ".qty-stepper { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: var(--radius); }\n";
  css +=
    ".qty-stepper button { width: 38px; height: 38px; background: var(--surface2); color: var(--text); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }\n";
  css +=
    ".qty-stepper button:hover { background: var(--accent); color: #fff; }\n";
  css +=
    ".qty-stepper .qty-num { min-width: 44px; text-align: center; font-weight: 700; }\n";
  css +=
    ".modal-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\n";
  css += ".modal-actions > :only-child { grid-column: 1 / -1; }\n";
  css +=
    ".modal-add-btn { padding: 12px 16px; min-height: 46px; background: var(--accent); color: #fff; border-radius: var(--radius); font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.25s; }\n";
  css += ".modal-add-btn:hover { opacity: 0.9; }\n";
  css += "body.dark .modal-add-btn { color: var(--bg); }\n";
  css +=
    ".modal-wa-btn { padding: 12px 16px; min-height: 46px; border: 2px solid var(--wa); color: var(--wa); border-radius: var(--radius); font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.25s; }\n";
  css += ".modal-wa-btn:hover { background: var(--wa); color: #fff; }\n\n";
  css +=
    ".modal-recommendations { grid-column: 2; grid-row: 1 / span 6; align-self: start; position: sticky; top: 0; margin-top: 0; padding-top: 0; padding-left: 18px; border-top: 0; border-left: 1px solid var(--border); max-height: calc(88vh - 56px); overflow: auto; }\n";
  css +=
    'html[dir="rtl"] .modal-recommendations { padding-left: 0; padding-right: 18px; border-left: 0; border-right: 1px solid var(--border); }\n';
  css +=
    ".recommendations-head { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 12px; }\n";
  css +=
    ".recommendations-kicker { display: block; margin-bottom: 2px; color: var(--accent); font-size: 0.68rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; }\n";
  css +=
    ".recommendations-head h3 { font-size: 1rem; font-weight: 800; line-height: 1.2; }\n";
  css +=
    ".recommendations-count { color: var(--muted); font-size: 0.78rem; font-weight: 700; white-space: nowrap; }\n";
  css +=
    ".recommendations-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }\n";
  css +=
    ".rec-card { overflow: hidden; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface2); cursor: pointer; transition: all 0.2s; text-align: start; color: var(--text); display: grid; grid-template-columns: 68px minmax(0, 1fr); min-height: 68px; }\n";
  css +=
    ".rec-card:hover { transform: translateY(-3px); border-color: var(--accent-pop); box-shadow: var(--shadow); }\n";
  css +=
    ".rec-img { aspect-ratio: 1; overflow: hidden; background: var(--surface); height: 100%; }\n";
  css +=
    ".rec-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }\n";
  css += ".rec-card:hover .rec-img img { transform: scale(1.05); }\n";
  css +=
    ".rec-body { padding: 9px; min-width: 0; display: flex; flex-direction: column; justify-content: center; }\n";
  css +=
    ".rec-name { font-size: 0.78rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }\n";
  css +=
    ".rec-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--muted); font-size: 0.72rem; }\n";
  css += ".rec-price { color: var(--accent); font-weight: 900; }\n\n";

  css += "/* WHATSAPP FLOAT */\n";
  css +=
    ".wa-float { position: fixed; bottom: 24px; right: 24px; z-index: 999; width: 60px; height: 60px; background: var(--wa); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.8rem; box-shadow: 0 4px 16px rgba(0,0,0,0.2); transition: all 0.25s; }\n";
  css += 'html[dir="rtl"] .wa-float { right: auto; left: 24px; }\n';
  css += ".wa-float:hover { transform: scale(1.1); background: #1da851; }\n\n";

  css += "/* RESPONSIVE */\n";
  css += "@media (max-width: 1024px) {\n";
  css +=
    "    .hero-inner, .video-layout, .map-layout { grid-template-columns: 1fr; }\n";
  css += "    .hero-content, .video-copy, .map-copy { max-width: 720px; }\n";
  css += "    .hero-title { font-size: 3.5rem; }\n";
  css += "    .hero-carousel { min-height: 520px; }\n";
  css += "    .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n";
  css += "    .products-grid { grid-template-columns: repeat(3, 1fr); }\n";
  css +=
    "    .adv-filters-bar { grid-template-columns: repeat(2, minmax(140px, 1fr)); }\n";
  css += "    .adv-reset-btn { width: 100%; }\n";
  css += "    .footer-main { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }\n";
  css += "}\n\n";

  css += "@media (max-width: 768px) {\n";
  css += "    .nav-links { display: none; }\n";
  css += "    .hamburger { display: flex; }\n";
  css += "    .lang-toggle-btn { display: inline-flex; padding: 6px 10px; font-size: 0.72rem; }\n";
  css += "    .dark-toggle-btn { display: inline-flex; width: 38px; height: 38px; font-size: 0.95rem; }\n";
  css += "    .hero { min-height: auto; padding: 100px 16px 60px; }\n";
  css += "    .hero-title { font-size: 2.5rem; }\n";
  css += "    .hero-carousel { min-height: 420px; }\n";
  css += "    .categories-grid { grid-template-columns: repeat(2, 1fr); }\n";
  css += "    .products-grid { grid-template-columns: repeat(2, 1fr); }\n";
  css += "    .why-grid { grid-template-columns: 1fr; }\n";
  css +=
    "    .shop-header { flex-direction: column; align-items: flex-start; }\n";
  css += "    .footer-main { grid-template-columns: 1fr; gap: 32px; }\n";
  css +=
    "    .product-modal { grid-template-columns: 1fr; max-height: 95vh; }\n";
  css += "    .modal-img-side img { max-height: 300px; }\n";
  css +=
    "    .modal-content { grid-template-columns: 1fr; overflow-y: auto; }\n";
  css +=
    "    .modal-content > :not(.modal-recommendations) { grid-column: 1; }\n";
  css +=
    "    .modal-recommendations { grid-column: 1; grid-row: auto; position: static; max-height: none; padding-left: 0; padding-top: 14px; border-left: 0; border-top: 1px solid var(--border); }\n";
  css +=
    '    html[dir="rtl"] .modal-recommendations { padding-right: 0; border-right: 0; }\n';
  css +=
    "    .recommendations-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n";
  css += "    .rec-card { grid-template-columns: 64px minmax(0, 1fr); }\n";
  css +=
    "    .wa-float { width: 50px; height: 50px; font-size: 1.5rem; bottom: 16px; right: 16px; }\n";
  css += '    html[dir="rtl"] .wa-float { right: auto; left: 16px; }\n';
  css += "}\n\n";

  css += "@media (max-width: 480px) {\n";
  css += "    .categories-grid { grid-template-columns: 1fr; }\n";
  css += "    .stats-grid { grid-template-columns: 1fr; }\n";
  css += "    .hero-ctas { flex-direction: column; }\n";
  css += "    .hero-ctas .btn { width: 100%; justify-content: center; }\n";
  css += "    .hero-carousel { min-height: 360px; }\n";
  css += "    .adv-filters-bar { grid-template-columns: 1fr; }\n";
  css += "    .recommendations-grid { grid-template-columns: 1fr; }\n";
  css += "    .modal-actions { grid-template-columns: 1fr; }\n";
  css += "    .feedback-shell { grid-template-columns: 1fr; }\n";
  css += "    .feedback-nav { display: none; }\n";
  css += "    .feedback-page { grid-template-columns: 1fr; }\n";
  css += "    .feedback-card { min-height: 240px; }\n";
  css += "    .map-frame-wrap { min-height: 320px; }\n";
  css += "}";

  // Template-specific overrides
  const templateStyles = {
    clothing: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}36 0%, ${bannerEnd}24 100%)`,
      cardRadius: "12px",
      heroFont: "clamp(3rem, 8vw, 6rem)",
      catAspect: "3/4",
      productGrid: "repeat(4, 1fr)",
    },
    pharmacy: {
      heroGradient: `linear-gradient(160deg, ${bannerStart}30 0%, ${bannerEnd}16 100%)`,
      cardRadius: "8px",
      heroFont: "clamp(2.5rem, 6vw, 4.5rem)",
      catAspect: "16/9",
      productGrid: "repeat(4, 1fr)",
    },
    electronics: {
      heroGradient: `linear-gradient(135deg, #0f172a 0%, ${bannerStart}30 55%, ${bannerEnd}22 100%)`,
      cardRadius: "6px",
      heroFont: "clamp(2.5rem, 7vw, 5rem)",
      catAspect: "16/9",
      productGrid: "repeat(4, 1fr)",
    },
    groceries: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}26 0%, ${bannerEnd}18 100%)`,
      cardRadius: "16px",
      heroFont: "clamp(2.5rem, 6vw, 4.5rem)",
      catAspect: "4/3",
      productGrid: "repeat(4, 1fr)",
    },
    restaurant: {
      heroGradient: `linear-gradient(135deg, ${bannerEnd}40 0%, ${bannerStart}34 100%)`,
      cardRadius: "12px",
      heroFont: "clamp(3rem, 7vw, 5.5rem)",
      catAspect: "4/3",
      productGrid: "repeat(3, 1fr)",
    },
    coffeeshop: {
      heroGradient: `linear-gradient(135deg, ${bannerEnd}36 0%, ${bannerStart}30 100%)`,
      cardRadius: "16px",
      heroFont: "clamp(2.8rem, 7vw, 5rem)",
      catAspect: "4/3",
      productGrid: "repeat(3, 1fr)",
    },
    nuts: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}34 0%, ${bannerEnd}20 100%)`,
      cardRadius: "12px",
      heroFont: "clamp(2.5rem, 6vw, 4.5rem)",
      catAspect: "4/3",
      productGrid: "repeat(4, 1fr)",
    },
    beauty: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}24 0%, ${bannerEnd}20 100%)`,
      cardRadius: "20px",
      heroFont: "clamp(2.8rem, 7vw, 5.5rem)",
      catAspect: "3/4",
      productGrid: "repeat(4, 1fr)",
    },
    sports: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}40 0%, ${bannerEnd}26 100%)`,
      cardRadius: "4px",
      heroFont: "clamp(3rem, 8vw, 6rem)",
      catAspect: "16/9",
      productGrid: "repeat(4, 1fr)",
    },
    furniture: {
      heroGradient: `linear-gradient(135deg, ${bannerStart}22 0%, ${bannerEnd}18 100%)`,
      cardRadius: "8px",
      heroFont: "clamp(2.5rem, 6vw, 4.5rem)",
      catAspect: "4/3",
      productGrid: "repeat(3, 1fr)",
    },
  };

  const tpl = templateStyles[data.template] || templateStyles.clothing;

  // Variation card styles
  const variationCards = {
    modern: {
      shadow: "0 2px 16px rgba(0,0,0,0.08)",
      hoverShadow: "0 12px 40px rgba(0,0,0,0.15)",
      border: "1px solid var(--border)",
      hoverBorder: "var(--accent-pop)",
    },
    bold: {
      shadow: "4px 4px 0 var(--accent)",
      hoverShadow: "6px 6px 0 var(--accent)",
      border: "2px solid var(--accent)",
      hoverBorder: "var(--accent)",
    },
    elegant: {
      shadow: "0 4px 24px rgba(0,0,0,0.06)",
      hoverShadow: "0 16px 48px rgba(0,0,0,0.12)",
      border: "1px solid var(--border)",
      hoverBorder: "var(--accent-pop)",
    },
    playful: {
      shadow: "0 4px 20px rgba(0,0,0,0.1)",
      hoverShadow: "0 8px 32px rgba(0,0,0,0.18)",
      border: "2px solid transparent",
      hoverBorder: "var(--accent-tertiary)",
    },
    minimal: {
      shadow: "none",
      hoverShadow: "0 8px 32px rgba(0,0,0,0.1)",
      border: "none",
      hoverBorder: "transparent",
    },
    luxury: {
      shadow: "0 4px 24px rgba(0,0,0,0.12)",
      hoverShadow: "0 16px 56px rgba(0,0,0,0.2)",
      border: "1px solid color-mix(in srgb, var(--accent-pop) 30%, transparent)",
      hoverBorder: "var(--accent-pop)",
    },
  };

  const vCard = variationCards[data.variation] || variationCards.modern;

  css += "/* TEMPLATE & VARIATION OVERRIDES */\n";
  css += ":root {\n";
  css += "    --card-radius: " + tpl.cardRadius + ";\n";
  css += "    --hero-font-size: " + tpl.heroFont + ";\n";
  css += "    --cat-aspect: " + tpl.catAspect + ";\n";
  css += "    --products-cols: " + tpl.productGrid + ";\n";
  css += "}\n\n";

  css += ".hero-bg { background: " + tpl.heroGradient + " !important; }\n";
  css += ".hero-title { font-size: var(--hero-font-size); }\n";
  css +=
    ".cat-card { aspect-ratio: " +
    tpl.catAspect +
    "; border-radius: var(--card-radius); }\n";
  css +=
    ".product-card { border-radius: var(--card-radius); box-shadow: " +
    vCard.shadow +
    "; border: " +
    vCard.border +
    "; }\n";
  css +=
    ".product-card:hover { box-shadow: " +
    vCard.hoverShadow +
    "; border-color: " +
    vCard.hoverBorder +
    "; }\n";
  css +=
    ".products-grid { grid-template-columns: " + tpl.productGrid + "; }\n\n";

  // Variation-specific hero styles
  if (data.variation === "bold") {
    css +=
      ".hero-title { text-transform: uppercase; letter-spacing: 0.04em; }\n";
    css +=
      ".section-title { text-transform: uppercase; letter-spacing: 0.05em; }\n";
    css +=
      ".btn-primary { border-radius: 0; font-weight: 800; letter-spacing: 0.05em; }\n";
    css += ".filter-pill { border-radius: 0; }\n";
    css += ".navbar { border-bottom: 3px solid var(--accent); }\n";
  }
  if (data.variation === "elegant") {
    css += ".hero-title { font-style: italic; letter-spacing: 0.02em; }\n";
    css += ".nav-brand-name { letter-spacing: 0.1em; font-weight: 600; }\n";
    css += ".btn-primary { border-radius: 30px; }\n";
    css += ".filter-pill { border-radius: 30px; }\n";
    css += ".product-card { border-radius: 16px; }\n";
    css += ".card-img-wrap { border-radius: 12px 12px 0 0; }\n";
  }
  if (data.variation === "playful") {
    css += ".hero-title { letter-spacing: -0.01em; }\n";
    css += ".btn-primary { border-radius: 30px; padding: 14px 32px; }\n";
    css += ".filter-pill { border-radius: 30px; }\n";
    css += ".product-card { border-radius: 20px; }\n";
    css += ".card-img-wrap { border-radius: 16px 16px 0 0; }\n";
    css += ".nav-badge { background: var(--accent-tertiary); }\n";
  }
  if (data.variation === "minimal") {
    css +=
      ".navbar { box-shadow: none; border-bottom: 1px solid var(--border); }\n";
    css += ".product-card { background: transparent; }\n";
    css += ".card-body { padding: 10px 0; }\n";
    css += ".hero { background: var(--bg); }\n";
    css += ".section-header { text-align: left; }\n";
    css += ".btn-primary { border-radius: 4px; }\n";
  }
  if (data.variation === "luxury") {
    css +=
      ".hero-title { letter-spacing: 0.08em; text-transform: uppercase; font-weight: 300; }\n";
    css +=
      ".nav-brand-name { letter-spacing: 0.15em; font-weight: 400; text-transform: uppercase; }\n";
    css +=
      ".btn-primary { background: transparent; border: 1.5px solid var(--accent); color: var(--accent); border-radius: 0; font-weight: 600; letter-spacing: 0.1em; }\n";
    css += ".btn-primary:hover { background: var(--accent); color: #fff; }\n";
    css += "body.dark .btn-primary:hover { color: var(--bg); }\n";
    css += ".filter-pill { border-radius: 0; }\n";
    css += ".footer-underline { background: var(--accent-pop); height: 1px; }\n";
  }

  // Template-specific section tweaks
  if (data.template === "restaurant" || data.template === "coffeeshop") {
    css += ".products-grid { grid-template-columns: repeat(3, 1fr); }\n";
    css +=
      "@media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }\n";
    css += ".card-img-wrap { aspect-ratio: 4/3; }\n";
  }
  if (data.template === "electronics") {
    css +=
      ".hero { background: color-mix(in srgb, var(--banner-end) 52%, #0b1120); }\n";
    css += ".hero-title { color: #ffffff; }\n";
    css += ".hero-subtitle-ar { color: rgba(255,255,255,0.7); }\n";
    css += ".hero-desc { color: rgba(255,255,255,0.6); }\n";
    css +=
      ".hero-bg { background: radial-gradient(ellipse at 20% 50%, " +
      bannerStart +
      "30 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, " +
      bannerEnd +
      "20 0%, transparent 50%) !important; }\n";
    css += ".card-img-wrap { aspect-ratio: 1; }\n";
  }
  if (data.template === "pharmacy") {
    css +=
      ".hero { background: linear-gradient(160deg, color-mix(in srgb, var(--banner-start) 18%, var(--surface)) 0%, var(--surface) 100%); }\n";
    css +=
      "body.dark .hero { background: linear-gradient(160deg, color-mix(in srgb, var(--banner-end) 20%, var(--bg)) 0%, var(--bg) 100%); }\n";
    css += ".card-img-wrap { aspect-ratio: 1; }\n";
  }
  if (data.template === "beauty") {
    css +=
      ".hero-title { background: linear-gradient(135deg, " +
      primary +
      ", " +
      secondary +
      "); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }\n";
    css += ".product-card { overflow: hidden; }\n";
  }
  if (data.template === "furniture") {
    css +=
      ".hero { background: color-mix(in srgb, var(--banner-start) 16%, var(--surface)); }\n";
    css += "body.dark .hero { background: var(--bg); }\n";
    css += ".card-img-wrap { aspect-ratio: 4/3; }\n";
    css += ".products-grid { grid-template-columns: repeat(3, 1fr); }\n";
    css +=
      "@media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }\n";
  }
  if (data.template === "sports") {
    css += ".hero-title { font-style: italic; font-weight: 900; }\n";
    css +=
      ".hero-bg { background: linear-gradient(135deg, " +
      bannerStart +
      "36, " +
      bannerEnd +
      "20) !important; }\n";
  }
  if (data.template === "nuts" || data.template === "groceries") {
    css += ".card-img-wrap { aspect-ratio: 1; }\n";
  }

  css +=
    "@media (max-width: 1024px) { .products-grid { grid-template-columns: repeat(3, 1fr) !important; } }\n";
  css +=
    "@media (max-width: 768px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }\n";
  css +=
    "@media (max-width: 480px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }\n";

  return css;
}

function generateJS(data) {
  const currencySymbol =
    { USD: "$", EUR: "€", LBP: "ل.ل", AED: "د.إ", SAR: "ر.س" }[data.currency] ||
    "$";
  const waNumber = data.whatsappNumber || "";
  const exchangeRate = data.exchangeRate || 90000;
  const testimonialsData = getCustomerFeedback(data);

  const productsData = data.products.map((p, i) => ({
    id: i + 1,
    name_en: p.nameEn,
    name_ar: p.nameAr,
    cat: p.category,
    price: p.price,
    orig: p.origPrice,
    sizes: p.sizes || ["S", "M", "L", "XL"],
    img: p.image,
    badge: p.badge || null,
    rating: p.rating || 4.5,
  }));

  let js = "// ===================== CONFIGURATION =====================\n";
  js += 'const WA = "' + waNumber + '";\n';
  js += 'const CURRENCY = "' + currencySymbol + '";\n';
  js += "const EXCHANGE_RATE = " + exchangeRate + ";\n\n";

  js += "// ===================== DATA =====================\n";
  js +=
    "const CATEGORIES = " + JSON.stringify(data.categories, null, 2) + ";\n\n";
  js += "const PRODUCTS = " + JSON.stringify(productsData, null, 2) + ";\n\n";
  js +=
    "const TESTIMONIALS = " +
    JSON.stringify(testimonialsData, null, 2) +
    ";\n\n";

  js += "// ===================== I18N =====================\n";
  js += "const I18N = {\n";
  js += "    ar: {\n";
  js += '        nav_shop: "المتجر",\n';
  js += '        nav_categories: "التصنيفات",\n';
  js += '        nav_why: "لماذا نحن",\n';
  js += '        nav_video: "فيديو",\n';
  js += '        nav_feedback: "آراء العملاء",\n';
  js += '        nav_location: "الموقع",\n';
  js += '        nav_about: "من نحن",\n';
  js += '        nav_contact: "تواصل",\n';
  js += '        hero_kicker: "مختار لك",\n';
  js += '        hero_shop: "تسوق الآن",\n';
  js += '        hero_wa: "تواصل معنا",\n';
  js += '        hero_carousel_label: "لمحة عن العلامة",\n';
  js += '        video_kicker: "فيديو",\n';
  js += '        video_title: "شاهد القصة",\n';
  js +=
    '        video_subtitle: "نظرة سريعة على ما يجعل هذا المشروع مميزاً.",\n';
  js += '        feedback_kicker: "آراء العملاء",\n';
  js += '        feedback_title: "ماذا يقول العملاء",\n';
  js += '        feedback_subtitle: "آراء حقيقية من عملاء في لبنان.",\n';
  js += '        map_kicker: "الموقع",\n';
  js += '        map_title: "اعثر علينا على خرائط جوجل",\n';
  js += '        map_open: "افتح في خرائط جوجل",\n';
  js += '        cat_title: "التصنيفات",\n';
  js += '        cat_subtitle: "تصفح حسب الفئة",\n';
  js += '        shop_title: "منتجاتنا",\n';
  js += '        shop_subtitle: "استكشف مجموعتنا",\n';
  js += '        filter_all: "الكل",\n';
  js += '        about_title: "من نحن",\n';
  js += '        why_kicker: "لماذا نحن",\n';
  js += '        why_title: "لماذا يختارنا العملاء",\n';
  js += '        why_subtitle: "تجربة تسوق أسهل من أول نظرة حتى تأكيد الطلب.",\n';
  js += '        cart_title: "سلة التسوق",\n';
  js += '        cart_total: "المجموع",\n';
  js += '        cart_checkout: "اطلب عبر واتساب",\n';
  js += '        cart_empty: "السلة فارغة",\n';
  js += '        wishlist_title: "المفضلة",\n';
  js += '        add_cart: "أضف للسلة",\n';
  js += '        order_wa: "اطلب عبر واتساب",\n';
  js += '        recommended_kicker: "مقترحات",\n';
  js += '        recommended_title: "قد يعجبك أيضاً",\n';
  js += '        recommended_count: "منتجات",\n';
  js += '        lbl_size: "المقاس",\n';
  js += '        lbl_qty: "الكمية",\n';
  js += '        badge_new: "جديد",\n';
  js += '        badge_sale: "تخفيض",\n';
  js += '        badge_bestseller: "الأكثر مبيعاً",\n';
  js += '        footer_shop: "تسوق",\n';
  js += '        footer_contact: "تواصل",\n';
  js += '        footer_wa: "تواصل عبر واتساب",\n';
  js += '        adv_price_range: "نطاق السعر",\n';
  js += '        adv_badge: "النوع",\n';
  js += '        adv_rating: "أقل تقييم",\n';
  js += '        adv_sort: "ترتيب حسب",\n';
  js += '        adv_all_types: "جميع الأنواع",\n';
  js += '        adv_any_rating: "أي تقييم",\n';
  js += '        adv_default: "الافتراضي",\n';
  js += '        adv_price_asc: "السعر: من الأقل",\n';
  js += '        adv_price_desc: "السعر: من الأعلى",\n';
  js += '        adv_rating_desc: "الأعلى تقييماً",\n';
  js += '        adv_name_asc: "الاسم أ ← ي",\n';
  js += '        adv_reset: "إعادة التعيين",\n';
  js += '        results_count: "نتيجة"\n';
  js += "    },\n";
  js += "    en: {\n";
  js += '        nav_shop: "Shop",\n';
  js += '        nav_categories: "Categories",\n';
  js += '        nav_why: "Why Us",\n';
  js += '        nav_video: "Video",\n';
  js += '        nav_feedback: "Feedback",\n';
  js += '        nav_location: "Location",\n';
  js += '        nav_about: "About",\n';
  js += '        nav_contact: "Contact",\n';
  js += '        hero_kicker: "Curated for you",\n';
  js += '        hero_shop: "Shop Now",\n';
  js += '        hero_wa: "Contact Us",\n';
  js += '        hero_carousel_label: "Brand preview",\n';
  js += '        video_kicker: "Video",\n';
  js += '        video_title: "See the Story",\n';
  js +=
    '        video_subtitle: "A quick look at what makes this business special.",\n';
  js += '        feedback_kicker: "Customer Feedback",\n';
  js += '        feedback_title: "What Customers Say",\n';
  js +=
    '        feedback_subtitle: "Real notes from customers across Lebanon.",\n';
  js += '        map_kicker: "Location",\n';
  js += '        map_title: "Find Us on Google Maps",\n';
  js += '        map_open: "Open in Google Maps",\n';
  js += '        cat_title: "Categories",\n';
  js += '        cat_subtitle: "Browse by category",\n';
  js += '        shop_title: "Our Products",\n';
  js += '        shop_subtitle: "Explore our collection",\n';
  js += '        filter_all: "All",\n';
  js += '        about_title: "About Us",\n';
  js += '        why_kicker: "Why Choose Us",\n';
  js += '        why_title: "Why Customers Choose Us",\n';
  js += '        why_subtitle: "A smoother shopping experience from first look to final order.",\n';
  js += '        cart_title: "Shopping Cart",\n';
  js += '        cart_total: "Total",\n';
  js += '        cart_checkout: "Order via WhatsApp",\n';
  js += '        cart_empty: "Your cart is empty",\n';
  js += '        wishlist_title: "Wishlist",\n';
  js += '        add_cart: "Add to Cart",\n';
  js += '        order_wa: "Order via WhatsApp",\n';
  js += '        recommended_kicker: "Recommended",\n';
  js += '        recommended_title: "You may also like",\n';
  js += '        recommended_count: "items",\n';
  js += '        lbl_size: "Size",\n';
  js += '        lbl_qty: "Quantity",\n';
  js += '        badge_new: "New",\n';
  js += '        badge_sale: "Sale",\n';
  js += '        badge_bestseller: "Bestseller",\n';
  js += '        footer_shop: "Shop",\n';
  js += '        footer_contact: "Contact",\n';
  js += '        footer_wa: "Chat on WhatsApp",\n';
  js += '        adv_price_range: "Price Range",\n';
  js += '        adv_badge: "Type",\n';
  js += '        adv_rating: "Min Rating",\n';
  js += '        adv_sort: "Sort By",\n';
  js += '        adv_all_types: "All Types",\n';
  js += '        adv_any_rating: "Any Rating",\n';
  js += '        adv_default: "Default",\n';
  js += '        adv_price_asc: "Price: Low → High",\n';
  js += '        adv_price_desc: "Price: High → Low",\n';
  js += '        adv_rating_desc: "Highest Rated",\n';
  js += '        adv_name_asc: "Name A → Z",\n';
  js += '        adv_reset: "Reset Filters",\n';
  js += '        results_count: "results"\n';
  js += "    }\n";
  js += "};\n\n";

  js += "// ===================== STATE =====================\n";
  js += "function storageGet(key, fallback) {\n";
  js += "    try {\n";
  js += "        var value = window.localStorage.getItem(key);\n";
  js += "        return value === null ? fallback : value;\n";
  js += "    } catch (error) {\n";
  js +=
    '        if (error && (error.name === "SecurityError" || error.name === "QuotaExceededError")) return fallback;\n';
  js += "        throw error;\n";
  js += "    }\n";
  js += "}\n\n";
  js += "function storageSet(key, value) {\n";
  js += "    try {\n";
  js += "        window.localStorage.setItem(key, value);\n";
  js += "    } catch (error) {\n";
  js +=
    '        if (error && (error.name === "SecurityError" || error.name === "QuotaExceededError")) return;\n';
  js += "        throw error;\n";
  js += "    }\n";
  js += "}\n\n";
  js += "function parseJsonOr(value, fallback) {\n";
  js += "    try {\n";
  js += "        return JSON.parse(value);\n";
  js += "    } catch (error) {\n";
  js += '        if (error && error.name === "SyntaxError") return fallback;\n';
  js += "        throw error;\n";
  js += "    }\n";
  js += "}\n\n";
  js += 'let lang = storageGet("site-lang", "ar");\n';
  js += 'let isDark = storageGet("site-dark", "false") === "true";\n';
  js += 'let currentFilter = "all";\n';
  js += "var _openOverlays = new Set();\n";
  js +=
    'function lockScroll(id) { _openOverlays.add(id); document.body.style.overflow = "hidden"; }\n';
  js +=
    'function unlockScroll(id) { _openOverlays.delete(id); if (_openOverlays.size === 0) document.body.style.overflow = ""; }\n';
  js += "let advPriceMin = 0;\n";
  js += "let advPriceMax = Infinity;\n";
  js += 'let advBadge = "";\n';
  js += "let advRating = 0;\n";
  js += 'let advSort = "default";\n';
  js += 'let cart = parseJsonOr(storageGet("site-cart", "[]"), []);\n';
  js += 'let wishlist = parseJsonOr(storageGet("site-wishlist", "[]"), []);\n';
  js += "let modalProduct = null;\n";
  js += "let modalSize = null;\n";
  js += "let modalQty = 1;\n";
  js += "let heroSlideIndex = 0;\n";
  js += "let heroSlideTimer = null;\n\n";
  js += "let feedbackIndex = 0;\n";
  js += "let feedbackTimer = null;\n\n";

  js += "// ===================== INIT =====================\n";
  js += 'document.addEventListener("DOMContentLoaded", function() {\n';
  js += "    applyLang();\n";
  js += "    applyDark();\n";
  js += "    renderProducts();\n";
  js += "    updateBadges();\n";
  js += "    initEventListeners();\n";
  js += "    initHeroCarousel();\n";
  js += "    initFeedbackCarousel();\n";
  js += "    initVideoAutoplay();\n";
  js += "    initInteractiveSections();\n";
  js += "});\n\n";

  js += "function initHeroCarousel() {\n";
  js += '    var slides = document.querySelectorAll(".hero-slide");\n';
  js += '    var dots = document.querySelectorAll("[data-carousel-dot]");\n';
  js += "    if (slides.length <= 1) return;\n\n";
  js += "    function showSlide(index) {\n";
  js += "        heroSlideIndex = (index + slides.length) % slides.length;\n";
  js +=
    '        slides.forEach(function(slide, i) { slide.classList.toggle("active", i === heroSlideIndex); });\n';
  js +=
    '        dots.forEach(function(dot, i) { dot.classList.toggle("active", i === heroSlideIndex); });\n';
  js += "    }\n\n";
  js += "    dots.forEach(function(dot) {\n";
  js += '        dot.addEventListener("click", function() {\n';
  js += "            showSlide(parseInt(dot.dataset.carouselDot, 10));\n";
  js += "            clearInterval(heroSlideTimer);\n";
  js +=
    "            heroSlideTimer = setInterval(function() { showSlide(heroSlideIndex + 1); }, 4500);\n";
  js += "        });\n";
  js += "    });\n\n";
  js +=
    "    heroSlideTimer = setInterval(function() { showSlide(heroSlideIndex + 1); }, 4500);\n";
  js += "}\n\n";

  js += "function initVideoAutoplay() {\n";
  js += '    var video = document.querySelector(".brand-autoplay-video");\n';
  js += "    if (!video) return;\n\n";
  js += "    var hasPlayed = false;\n";
  js += "    function playWithAudio() {\n";
  js += "        if (hasPlayed) return;\n";
  js += "        video.muted = false;\n";
  js += "        video.volume = 1;\n";
  js += "        var playPromise = video.play();\n";
  js += '        if (playPromise && typeof playPromise.then === "function") {\n';
  js += "            playPromise.then(function() {\n";
  js += "                hasPlayed = true;\n";
  js += "                removeRetryListeners();\n";
  js += "            }).catch(function() {\n";
  js += "                addRetryListeners();\n";
  js += "            });\n";
  js += "        } else {\n";
  js += "            hasPlayed = true;\n";
  js += "            removeRetryListeners();\n";
  js += "        }\n";
  js += "    }\n\n";
  js += "    function addRetryListeners() {\n";
  js += '        document.addEventListener("pointerdown", playWithAudio, { once: true });\n';
  js += '        document.addEventListener("keydown", playWithAudio, { once: true });\n';
  js += "    }\n\n";
  js += "    function removeRetryListeners() {\n";
  js += '        document.removeEventListener("pointerdown", playWithAudio);\n';
  js += '        document.removeEventListener("keydown", playWithAudio);\n';
  js += "    }\n\n";
  js += '    video.addEventListener("ended", function() { hasPlayed = true; removeRetryListeners(); }, { once: true });\n';
  js += "    setTimeout(playWithAudio, 250);\n";
  js += "}\n\n";

  js += "function initInteractiveSections() {\n";
  js +=
    '    var targets = Array.prototype.slice.call(document.querySelectorAll(".stats-grid .stat-card, .about-content, .why-card"));\n';
  js += "    if (!targets.length) return;\n";
  js += "    targets.forEach(function(target, index) {\n";
  js += '        target.classList.add("reveal-item");\n';
  js +=
    '        target.style.transitionDelay = (Math.min(index, 6) * 70) + "ms";\n';
  js += "    });\n\n";
  js += "    function reveal(target) {\n";
  js += '        target.classList.add("in-view");\n';
  js +=
    '        if (target.classList.contains("stat-card")) animateCountUp(target);\n';
  js += "    }\n\n";
  js += '    if (!("IntersectionObserver" in window)) {\n';
  js += "        targets.forEach(reveal);\n";
  js += "        return;\n";
  js += "    }\n\n";
  js += "    var observer = new IntersectionObserver(function(entries) {\n";
  js += "        entries.forEach(function(entry) {\n";
  js += "            if (!entry.isIntersecting) return;\n";
  js += "            reveal(entry.target);\n";
  js += "            observer.unobserve(entry.target);\n";
  js += "        });\n";
  js += '    }, { threshold: 0.22, rootMargin: "0px 0px -30px 0px" });\n\n';
  js += "    targets.forEach(function(target) { observer.observe(target); });\n";
  js += "}\n\n";

  js += "function animateCountUp(card) {\n";
  js += '    var numberEl = card.querySelector(".stat-number, strong");\n';
  js +=
    '    if (!numberEl || numberEl.dataset.countAnimated === "true") return;\n';
  js += "    var source = (numberEl.textContent || '').trim();\n";
  js += "    if (!source) return;\n";
  js += "    var match = source.match(/-?\\d+(?:\\.\\d+)?/);\n";
  js += "    if (!match) return;\n";
  js += "    var targetValue = parseFloat(match[0]);\n";
  js += "    if (!isFinite(targetValue)) return;\n";
  js += "    var decimals = (match[0].split('.')[1] || '').length;\n";
  js += "    var prefix = source.slice(0, match.index);\n";
  js += "    var suffix = source.slice(match.index + match[0].length);\n";
  js += "    var duration = 1250 + Math.min(900, targetValue * 12);\n";
  js += "    var startTime = null;\n";
  js += '    numberEl.dataset.countAnimated = "true";\n\n';
  js +=
    "    function formatValue(value) { return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value)); }\n\n";
  js += "    function tick(timestamp) {\n";
  js += "        if (startTime === null) startTime = timestamp;\n";
  js +=
    "        var progress = Math.min((timestamp - startTime) / duration, 1);\n";
  js += "        var eased = 1 - Math.pow(1 - progress, 3);\n";
  js += "        var current = targetValue * eased;\n";
  js +=
    '        numberEl.textContent = prefix + formatValue(current) + suffix;\n';
  js += "        if (progress < 1) {\n";
  js += "            requestAnimationFrame(tick);\n";
  js += "        } else {\n";
  js += "            numberEl.textContent = source;\n";
  js += "        }\n";
  js += "    }\n\n";
  js += "    requestAnimationFrame(tick);\n";
  js += "}\n\n";

  js += "function getFeedbackPages() {\n";
  js += "    var pages = [];\n";
  js += "    for (var i = 0; i < TESTIMONIALS.length; i += 3) pages.push(TESTIMONIALS.slice(i, i + 3));\n";
  js += "    return pages;\n";
  js += "}\n\n";

  js += "function renderFeedbackCard(active) {\n";
  js += '    var isAr = lang === "ar";\n';
  js += "    var name = isAr ? active.nameAr : active.nameEn;\n";
  js += "    var city = isAr ? active.cityAr : active.cityEn;\n";
  js += "    var text = isAr ? active.textAr : active.textEn;\n";
  js += "    var rating = Math.max(1, Math.min(5, parseFloat(active.rating) || 5));\n";
  js += "    var fullStars = Math.round(rating);\n";
  js += '    var stars = "";\n';
  js +=
    '    for (var i = 1; i <= 5; i++) stars += \'<i class="\' + (i <= fullStars ? "fas" : "far") + \' fa-star"></i>\';\n';
  js +=
    "    var photo = active.image ? '<img src=\"' + active.image + '\" alt=\"' + name + '\" loading=\"lazy\">' : name.charAt(0);\n\n";
  js += "    return '<article class=\"feedback-card\">' +\n";
  js += "        '<div class=\"feedback-card-top\">' +\n";
  js += "        '<div class=\"feedback-photo\">' + photo + '</div>' +\n";
  js +=
    "        '<div class=\"feedback-rating\">' + stars + '<span>' + rating.toFixed(1) + '</span></div>' +\n";
  js += "        '</div>' +\n";
  js += "        '<p class=\"feedback-text\">&ldquo;' + text + '&rdquo;</p>' +\n";
  js += "        '<div class=\"feedback-person\">' +\n";
  js +=
    "        '<div><strong>' + name + '</strong><span><i class=\"fas fa-location-dot\"></i> ' + city + '</span></div>' +\n";
  js += "        '</div>' +\n";
  js += "        '</article>';\n";
  js += "}\n\n";

  js += "function renderFeedbackCarousel() {\n";
  js += '    var track = document.getElementById("feedbackTrack");\n';
  js += '    var dots = document.getElementById("feedbackDots");\n';
  js += "    var pages = getFeedbackPages();\n";
  js += "    if (!track || !dots || !pages.length) return;\n\n";
  js +=
    "    feedbackIndex = (feedbackIndex + pages.length) % pages.length;\n";
  js += "    var active = TESTIMONIALS[feedbackIndex];\n";
  js += '    var isAr = lang === "ar";\n';
  js +=
    "    var rating = Math.max(1, Math.min(5, parseFloat(active.rating) || 5));\n";
  js += "    var fullStars = Math.round(rating);\n";
  js += '    var stars = "";\n';
  js +=
    '    for (var i = 1; i <= 5; i++) stars += \'<i class="\' + (i <= fullStars ? "fas" : "far") + \' fa-star"></i>\';\n\n';
  js += "    track.innerHTML = '<article class=\"feedback-card\">' +\n";
  js +=
    "        '<div class=\"feedback-rating\">' + stars + '<span>' + rating.toFixed(1) + '</span></div>' +\n";
  js +=
    "        '<p class=\"feedback-text\">“' + (isAr ? active.textAr : active.textEn) + '”</p>' +\n";
  js += "        '<div class=\"feedback-person\">' +\n";
  js +=
    "        '<div class=\"feedback-avatar\">' + (isAr ? active.nameAr : active.nameEn).charAt(0) + '</div>' +\n";
  js +=
    "        '<div><strong>' + (isAr ? active.nameAr : active.nameEn) + '</strong><span><i class=\"fas fa-location-dot\"></i> ' + (isAr ? active.cityAr : active.cityEn) + '</span></div>' +\n";
  js += "        '</div>' +\n";
  js += "        '</article>';\n\n";
  js += "    track.innerHTML = '<div class=\"feedback-page\">' + pages[feedbackIndex].map(renderFeedbackCard).join(\"\") + '</div>';\n\n";
  js += "    dots.innerHTML = pages.map(function(item, index) {\n";
  js +=
    '        return \'<button class="feedback-dot\' + (index === feedbackIndex ? " active" : "") + \'" data-feedback-dot="\' + index + \'" aria-label="Show feedback page \' + (index + 1) + \'"></button>\';\n';
  js += '    }).join("");\n';
  js +=
    '    dots.querySelectorAll("[data-feedback-dot]").forEach(function(dot) {\n';
  js += '        dot.addEventListener("click", function() {\n';
  js += "            feedbackIndex = parseInt(dot.dataset.feedbackDot, 10);\n";
  js += "            renderFeedbackCarousel();\n";
  js += "            restartFeedbackTimer();\n";
  js += "        });\n";
  js += "    });\n";
  js += "}\n\n";

  js += "function showFeedback(delta) {\n";
  js += "    feedbackIndex += delta;\n";
  js += "    renderFeedbackCarousel();\n";
  js += "    restartFeedbackTimer();\n";
  js += "}\n\n";

  js += "function restartFeedbackTimer() {\n";
  js += "    clearInterval(feedbackTimer);\n";
  js +=
    "    if (getFeedbackPages().length > 1) feedbackTimer = setInterval(function() { feedbackIndex++; renderFeedbackCarousel(); }, 4500);\n";
  js += "}\n\n";

  js += "function initFeedbackCarousel() {\n";
  js +=
    '    if (!TESTIMONIALS.length || !document.getElementById("feedbackTrack")) return;\n';
  js += "    renderFeedbackCarousel();\n";
  js += "    restartFeedbackTimer();\n";
  js += '    var prev = document.getElementById("feedbackPrev");\n';
  js += '    var next = document.getElementById("feedbackNext");\n';
  js +=
    '    if (prev) prev.addEventListener("click", function() { showFeedback(-1); });\n';
  js +=
    '    if (next) next.addEventListener("click", function() { showFeedback(1); });\n';
  js += "}\n\n";

  js += "function initEventListeners() {\n";
  js += "    // Navbar scroll\n";
  js += '    window.addEventListener("scroll", function() {\n';
  js += '        var navbar = document.getElementById("navbar");\n';
  js +=
    '        if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);\n';
  js += "    });\n\n";

  js += "    // Mobile drawer\n";
  js += '    var menuToggle = document.getElementById("menuToggle");\n';
  js += "    if (menuToggle) {\n";
  js += '        menuToggle.addEventListener("click", function() {\n';
  js +=
    '            document.getElementById("mobileDrawer").classList.add("open");\n';
  js +=
    '            document.getElementById("drawerOverlay").classList.add("open");\n';
  js += '            lockScroll("drawer");\n';
  js += "        });\n";
  js += "    }\n\n";

  js += '    var drawerClose = document.getElementById("drawerClose");\n';
  js +=
    '    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);\n';
  js += '    var drawerOverlay = document.getElementById("drawerOverlay");\n';
  js +=
    '    if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);\n\n';

  js += "    // Search\n";
  js += '    var searchToggle = document.getElementById("searchToggle");\n';
  js += "    if (searchToggle) {\n";
  js += '        searchToggle.addEventListener("click", function() {\n';
  js +=
    '            document.getElementById("searchBar").classList.add("open");\n';
  js += '            document.getElementById("searchInput").focus();\n';
  js += "        });\n";
  js += "    }\n\n";

  js += '    var searchClose = document.getElementById("searchClose");\n';
  js += "    if (searchClose) {\n";
  js += '        searchClose.addEventListener("click", function() {\n';
  js +=
    '            document.getElementById("searchBar").classList.remove("open");\n';
  js += '            document.getElementById("searchInput").value = "";\n';
  js += '            currentFilter = "all";\n';
  js += "            renderProducts();\n";
  js += "        });\n";
  js += "    }\n\n";

  js += '    var searchInput = document.getElementById("searchInput");\n';
  js += "    if (searchInput) {\n";
  js += '        searchInput.addEventListener("input", function(e) {\n';
  js += "            searchProducts(e.target.value);\n";
  js += "        });\n";
  js += "    }\n\n";

  js += "    // Filters\n";
  js += '    var filterBar = document.getElementById("filterBar");\n';
  js += "    if (filterBar) {\n";
  js += '        filterBar.addEventListener("click", function(e) {\n';
  js += '            var btn = e.target.closest(".filter-pill");\n';
  js += "            if (btn) filterProducts(btn.dataset.cat);\n";
  js += "        });\n";
  js += "    }\n\n";

  js += "    // Category cards\n";
  js +=
    '    document.querySelectorAll(".cat-card[data-cat]").forEach(function(card) {\n';
  js += '        card.addEventListener("click", function() {\n';
  js += "            filterProducts(card.dataset.cat);\n";
  js += '            var shop = document.getElementById("shop");\n';
  js += '            if (shop) shop.scrollIntoView({ behavior: "smooth" });\n';
  js += "        });\n";
  js += "    });\n\n";

  js += "    // Footer filter links\n";
  js +=
    '    document.querySelectorAll("[data-filter]").forEach(function(link) {\n';
  js += '        link.addEventListener("click", function(e) {\n';
  js += "            e.preventDefault();\n";
  js += "            filterProducts(link.dataset.filter);\n";
  js += '            var shop = document.getElementById("shop");\n';
  js += '            if (shop) shop.scrollIntoView({ behavior: "smooth" });\n';
  js += "        });\n";
  js += "    });\n\n";

  js += "    // Language toggle\n";
  js += '    var langToggle = document.getElementById("langToggle");\n';
  js += "    if (langToggle) {\n";
  js += '        langToggle.addEventListener("click", function() {\n';
  js += '            setLang(lang === "ar" ? "en" : "ar");\n';
  js += "        });\n";
  js += "    }\n\n";

  js += "    // Dark mode toggle\n";
  js += '    var darkToggle = document.getElementById("darkToggle");\n';
  js +=
    '    if (darkToggle) darkToggle.addEventListener("click", toggleDark);\n\n';

  js += "    // Cart\n";
  js += '    var cartToggle = document.getElementById("cartToggle");\n';
  js += '    if (cartToggle) cartToggle.addEventListener("click", openCart);\n';
  js += '    var cartClose = document.getElementById("cartClose");\n';
  js += '    if (cartClose) cartClose.addEventListener("click", closeCart);\n';
  js += '    var cartOverlay = document.getElementById("cartOverlay");\n';
  js +=
    '    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);\n\n';

  js += "    // Wishlist\n";
  js += '    var wishlistNav = document.getElementById("wishlistNav");\n';
  js +=
    '    if (wishlistNav) wishlistNav.addEventListener("click", openWishlist);\n';
  js += '    var wishlistClose = document.getElementById("wishlistClose");\n';
  js +=
    '    if (wishlistClose) wishlistClose.addEventListener("click", closeWishlist);\n';
  js +=
    '    var wishlistOverlay = document.getElementById("wishlistOverlay");\n';
  js +=
    '    if (wishlistOverlay) wishlistOverlay.addEventListener("click", closeWishlist);\n\n';

  js += "    // Product modal\n";
  js += '    var modalClose = document.getElementById("modalClose");\n';
  js +=
    '    if (modalClose) modalClose.addEventListener("click", closeProductModal);\n';
  js +=
    '    var productModalOverlay = document.getElementById("productModalOverlay");\n';
  js += "    if (productModalOverlay) {\n";
  js += '        productModalOverlay.addEventListener("click", function(e) {\n';
  js +=
    '            if (e.target.id === "productModalOverlay") closeProductModal();\n';
  js += "        });\n";
  js += "    }\n\n";

  js += '    var modalAddBtn = document.getElementById("modalAddBtn");\n';
  js +=
    '    if (modalAddBtn) modalAddBtn.addEventListener("click", addFromModal);\n\n';

  js += "    // Advanced filters\n";
  js += '    var priceMin = document.getElementById("priceMin");\n';
  js += '    var priceMax = document.getElementById("priceMax");\n';
  js += '    var badgeFilter = document.getElementById("badgeFilter");\n';
  js += '    var ratingFilter = document.getElementById("ratingFilter");\n';
  js += '    var sortFilter = document.getElementById("sortFilter");\n';
  js += '    var advResetBtn = document.getElementById("advResetBtn");\n';
  js += "    function applyAdvFilters() {\n";
  js +=
    "        advPriceMin = priceMin && priceMin.value ? parseFloat(priceMin.value) : 0;\n";
  js +=
    "        advPriceMax = priceMax && priceMax.value ? parseFloat(priceMax.value) : Infinity;\n";
  js += '        advBadge = badgeFilter ? badgeFilter.value : "";\n';
  js +=
    "        advRating = ratingFilter ? parseFloat(ratingFilter.value) : 0;\n";
  js += '        advSort = sortFilter ? sortFilter.value : "default";\n';
  js += "        renderProducts();\n";
  js += "    }\n";
  js +=
    '    if (priceMin) priceMin.addEventListener("input", applyAdvFilters);\n';
  js +=
    '    if (priceMax) priceMax.addEventListener("input", applyAdvFilters);\n';
  js +=
    '    if (badgeFilter) badgeFilter.addEventListener("change", applyAdvFilters);\n';
  js +=
    '    if (ratingFilter) ratingFilter.addEventListener("change", applyAdvFilters);\n';
  js +=
    '    if (sortFilter) sortFilter.addEventListener("change", applyAdvFilters);\n';
  js += "    if (advResetBtn) {\n";
  js += '        advResetBtn.addEventListener("click", function() {\n';
  js += '            if (priceMin) priceMin.value = "";\n';
  js += '            if (priceMax) priceMax.value = "";\n';
  js += '            if (badgeFilter) badgeFilter.value = "";\n';
  js += '            if (ratingFilter) ratingFilter.value = "0";\n';
  js += '            if (sortFilter) sortFilter.value = "default";\n';
  js +=
    '            advPriceMin = 0; advPriceMax = Infinity; advBadge = ""; advRating = 0; advSort = "default";\n';
  js += '            currentFilter = "all";\n';
  js +=
    '            document.querySelectorAll(".filter-pill").forEach(function(b) { b.classList.toggle("active", b.dataset.cat === "all"); });\n';
  js += "            renderProducts();\n";
  js += "        });\n";
  js += "    }\n\n";

  js += "    // Escape key\n";
  js += '    document.addEventListener("keydown", function(e) {\n';
  js += '        if (e.key === "Escape") {\n';
  js += "            closeDrawer();\n";
  js += "            closeCart();\n";
  js += "            closeWishlist();\n";
  js += "            closeProductModal();\n";
  js += '            var searchBar = document.getElementById("searchBar");\n';
  js += '            if (searchBar) searchBar.classList.remove("open");\n';
  js += "        }\n";
  js += "    });\n";
  js += "}\n\n";

  js += "function closeDrawer() {\n";
  js += '    var mobileDrawer = document.getElementById("mobileDrawer");\n';
  js += '    if (mobileDrawer) mobileDrawer.classList.remove("open");\n';
  js += '    var drawerOverlay = document.getElementById("drawerOverlay");\n';
  js += '    if (drawerOverlay) drawerOverlay.classList.remove("open");\n';
  js += '    unlockScroll("drawer");\n';
  js += "}\n\n";

  js += "// ===================== LANGUAGE =====================\n";
  js += "function t(key) {\n";
  js += "    return I18N[lang][key] || key;\n";
  js += "}\n\n";

  js += "function setLang(newLang) {\n";
  js += "    lang = newLang;\n";
  js += '    storageSet("site-lang", lang);\n';
  js += "    applyLang();\n";
  js += "    renderProducts();\n";
  js += "    renderFeedbackCarousel();\n";
  js += "}\n\n";

  js += "function applyLang() {\n";
  js += '    var isAr = lang === "ar";\n';
  js += "    document.documentElement.lang = lang;\n";
  js += '    document.documentElement.dir = isAr ? "rtl" : "ltr";\n';
  js += '    document.body.classList.toggle("lang-en", !isAr);\n';
  js += '    document.body.classList.toggle("lang-ar", isAr);\n\n';

  js += "    // Update i18n elements\n";
  js += '    document.querySelectorAll("[data-i18n]").forEach(function(el) {\n';
  js += "        el.textContent = t(el.dataset.i18n);\n";
  js += "    });\n\n";

  js += "    // Update generated bilingual content\n";
  js += '    document.querySelectorAll("[data-lang-en][data-lang-ar]").forEach(function(el) {\n';
  js += "        el.textContent = isAr ? el.dataset.langAr : el.dataset.langEn;\n";
  js += "    });\n\n";

  js += "    // Update placeholders\n";
  js +=
    '    document.querySelectorAll("[data-ph-ar]").forEach(function(el) {\n';
  js += "        el.placeholder = isAr ? el.dataset.phAr : el.dataset.phEn;\n";
  js += "    });\n\n";

  js += "    // Update lang toggle button\n";
  js += '    var langBtn = document.getElementById("langToggle");\n';
  js += '    if (langBtn) langBtn.textContent = isAr ? "EN" : "عربي";\n\n';

  js += "    // Update drawer lang buttons\n";
  js +=
    '    document.querySelectorAll(".drawer-lang button").forEach(function(btn) {\n';
  js += '        btn.classList.toggle("active", \n';
  js += '            (btn.textContent.includes("العربية") && isAr) || \n';
  js += '            (btn.textContent.includes("English") && !isAr)\n';
  js += "        );\n";
  js += "    });\n";
  js += "}\n\n";

  js += "// ===================== DARK MODE =====================\n";
  js += "function toggleDark() {\n";
  js += "    isDark = !isDark;\n";
  js += '    storageSet("site-dark", String(isDark));\n';
  js += "    applyDark();\n";
  js += "}\n\n";

  js += "function applyDark() {\n";
  js += '    document.body.classList.toggle("dark", isDark);\n';
  js += '    var icon = isDark ? "fa-sun" : "fa-moon";\n';
  js += '    var darkBtn = document.getElementById("darkToggle");\n';
  js +=
    "    if (darkBtn) darkBtn.innerHTML = '<i class=\"fas ' + icon + '\"></i>';\n";
  js += "    \n";
  js += '    var drawerIcon = document.getElementById("drawerDarkIcon");\n';
  js += '    if (drawerIcon) drawerIcon.className = "fas " + icon;\n';
  js += "    \n";
  js += '    var drawerLabel = document.getElementById("drawerDarkLabel");\n';
  js +=
    '    if (drawerLabel) drawerLabel.textContent = isDark ? (lang === "ar" ? "وضع فاتح" : "Light Mode") : (lang === "ar" ? "وضع داكن" : "Dark Mode");\n';
  js += "}\n\n";

  js += "// ===================== PRODUCTS =====================\n";
  js += "function pName(p) {\n";
  js += '    return lang === "ar" ? p.name_ar : p.name_en;\n';
  js += "}\n\n";

  js += "function renderProducts() {\n";
  js += '    var grid = document.getElementById("productsGrid");\n';
  js += "    if (!grid) return;\n\n";

  js += "    var list = PRODUCTS.filter(function(p) {\n";
  js +=
    '        if (currentFilter !== "all" && p.cat !== currentFilter) return false;\n';
  js += "        if (p.price < advPriceMin) return false;\n";
  js +=
    "        if (advPriceMax !== Infinity && p.price > advPriceMax) return false;\n";
  js += "        if (advBadge && p.badge !== advBadge) return false;\n";
  js += "        if (p.rating < advRating) return false;\n";
  js += "        return true;\n";
  js += "    });\n\n";

  js +=
    '    if (advSort === "price_asc") list.sort(function(a,b) { return a.price - b.price; });\n';
  js +=
    '    else if (advSort === "price_desc") list.sort(function(a,b) { return b.price - a.price; });\n';
  js +=
    '    else if (advSort === "rating_desc") list.sort(function(a,b) { return b.rating - a.rating; });\n';
  js +=
    '    else if (advSort === "name_asc") list.sort(function(a,b) { return pName(a).localeCompare(pName(b)); });\n\n';

  js += '    var countEl = document.getElementById("resultsCount");\n';
  js +=
    '    if (countEl) countEl.textContent = list.length + " " + (I18N[lang].results_count || "results");\n\n';

  js += "    if (!list.length) {\n";
  js +=
    '        grid.innerHTML = \'<div class="cart-empty"><i class="fas fa-box-open"></i><p>No products found</p></div>\';\n';
  js += "        return;\n";
  js += "    }\n\n";

  js += "    grid.innerHTML = list.map(function(p) {\n";
  js += "        var inWish = wishlist.includes(p.id);\n";
  js += '        var stars = "";\n';
  js += "        for (var i = 0; i < 5; i++) {\n";
  js +=
    '            stars += \'<i class="\' + (i < Math.floor(p.rating) ? "fas" : "far") + \' fa-star"></i>\';\n';
  js += "        }\n\n";

  js +=
    "        return '<div class=\"product-card\" onclick=\"openProductModal(' + p.id + ')\">' +\n";
  js += "            '<div class=\"card-img-wrap\">' +\n";
  js +=
    "            '<img src=\"' + p.img + '\" alt=\"' + pName(p) + '\" loading=\"lazy\">' +\n";
  js +=
    "            (p.badge ? '<span class=\"card-badge ' + p.badge + '\">' + t(\"badge_\" + p.badge) + '</span>' : \"\") +\n";
  js +=
    '            \'<button class="card-wish\' + (inWish ? " active" : "") + \'" onclick="event.stopPropagation(); toggleWish(\' + p.id + \')">\' +\n';
  js +=
    '            \'<i class="\' + (inWish ? "fas" : "far") + \' fa-heart"></i></button>\' +\n';
  js += "            '</div>' +\n";
  js += "            '<div class=\"card-body\">' +\n";
  js += "            '<div class=\"card-name\">' + pName(p) + '</div>' +\n";
  js +=
    "            '<div class=\"card-stars\">' + stars + \" \" + p.rating.toFixed(1) + '</div>' +\n";
  js += "            '<div class=\"card-price\">' + CURRENCY + p.price +\n";
  js +=
    "            (p.orig ? '<span class=\"card-price-orig\">' + CURRENCY + p.orig + '</span>' : \"\") +\n";
  js += "            '</div></div></div>';\n";
  js += '    }).join("");\n';
  js += "}\n\n";

  js += "function filterProducts(cat) {\n";
  js += "    currentFilter = cat;\n";
  js += '    document.querySelectorAll(".filter-pill").forEach(function(b) {\n';
  js += '        b.classList.toggle("active", b.dataset.cat === cat);\n';
  js += "    });\n";
  js += "    renderProducts();\n";
  js += "}\n\n";

  js += "function searchProducts(query) {\n";
  js += "    var q = query.toLowerCase().trim();\n";
  js += "    if (!q) {\n";
  js += "        renderProducts();\n";
  js += "        return;\n";
  js += "    }\n\n";

  js += '    var grid = document.getElementById("productsGrid");\n';
  js += "    var filtered = PRODUCTS.filter(function(p) {\n";
  js +=
    "        if (!p.name_ar.includes(q) && !p.name_en.toLowerCase().includes(q)) return false;\n";
  js +=
    '        if (currentFilter !== "all" && p.cat !== currentFilter) return false;\n';
  js += "        if (p.price < advPriceMin) return false;\n";
  js +=
    "        if (advPriceMax !== Infinity && p.price > advPriceMax) return false;\n";
  js += "        if (advBadge && p.badge !== advBadge) return false;\n";
  js += "        if (p.rating < advRating) return false;\n";
  js += "        return true;\n";
  js += "    });\n\n";

  js +=
    '    if (advSort === "price_asc") filtered.sort(function(a,b) { return a.price - b.price; });\n';
  js +=
    '    else if (advSort === "price_desc") filtered.sort(function(a,b) { return b.price - a.price; });\n';
  js +=
    '    else if (advSort === "rating_desc") filtered.sort(function(a,b) { return b.rating - a.rating; });\n';
  js +=
    '    else if (advSort === "name_asc") filtered.sort(function(a,b) { return pName(a).localeCompare(pName(b)); });\n\n';

  js += '    var countEl = document.getElementById("resultsCount");\n';
  js +=
    '    if (countEl) countEl.textContent = filtered.length + " " + (I18N[lang].results_count || "results");\n\n';

  js += "    if (!filtered.length) {\n";
  js +=
    '        grid.innerHTML = \'<div class="cart-empty"><i class="fas fa-search"></i><p>No results found</p></div>\';\n';
  js += "        return;\n";
  js += "    }\n\n";

  js += "    grid.innerHTML = filtered.map(function(p) {\n";
  js += "        var inWish = wishlist.includes(p.id);\n";
  js += '        var stars = "";\n';
  js += "        for (var i = 0; i < 5; i++) {\n";
  js +=
    '            stars += \'<i class="\' + (i < Math.floor(p.rating) ? "fas" : "far") + \' fa-star"></i>\';\n';
  js += "        }\n\n";

  js +=
    "        return '<div class=\"product-card\" onclick=\"openProductModal(' + p.id + ')\">' +\n";
  js += "            '<div class=\"card-img-wrap\">' +\n";
  js +=
    "            '<img src=\"' + p.img + '\" alt=\"' + pName(p) + '\" loading=\"lazy\">' +\n";
  js +=
    "            (p.badge ? '<span class=\"card-badge ' + p.badge + '\">' + t(\"badge_\" + p.badge) + '</span>' : \"\") +\n";
  js +=
    '            \'<button class="card-wish\' + (inWish ? " active" : "") + \'" onclick="event.stopPropagation(); toggleWish(\' + p.id + \')">\' +\n';
  js +=
    '            \'<i class="\' + (inWish ? "fas" : "far") + \' fa-heart"></i></button>\' +\n';
  js += "            '</div>' +\n";
  js += "            '<div class=\"card-body\">' +\n";
  js += "            '<div class=\"card-name\">' + pName(p) + '</div>' +\n";
  js +=
    "            '<div class=\"card-stars\">' + stars + \" \" + p.rating.toFixed(1) + '</div>' +\n";
  js += "            '<div class=\"card-price\">' + CURRENCY + p.price +\n";
  js +=
    "            (p.orig ? '<span class=\"card-price-orig\">' + CURRENCY + p.orig + '</span>' : \"\") +\n";
  js += "            '</div></div></div>';\n";
  js += '    }).join("");\n';
  js += "}\n\n";

  js += "function getProductRecommendations(product) {\n";
  js +=
    "    var sameCategory = PRODUCTS.filter(function(item) { return item.id !== product.id && item.cat === product.cat; })\n";
  js += "        .sort(function(a, b) { return b.rating - a.rating; });\n";
  js +=
    "    var fallback = PRODUCTS.filter(function(item) { return item.id !== product.id && item.cat !== product.cat; })\n";
  js += "        .sort(function(a, b) { return b.rating - a.rating; });\n";
  js += "    var seen = {};\n";
  js += "    return sameCategory.concat(fallback).filter(function(item) {\n";
  js += "        if (seen[item.id]) return false;\n";
  js += "        seen[item.id] = true;\n";
  js += "        return true;\n";
  js += "    }).slice(0, 3);\n";
  js += "}\n\n";

  js += "function renderRecommendations(product) {\n";
  js +=
    '    var block = document.getElementById("modalRecommendationsBlock");\n';
  js += '    var grid = document.getElementById("modalRecommendations");\n';
  js += '    var count = document.getElementById("recommendationsCount");\n';
  js += "    if (!block || !grid) return;\n\n";
  js += "    var recs = getProductRecommendations(product);\n";
  js += "    if (!recs.length) {\n";
  js += '        block.style.display = "none";\n';
  js += "        return;\n";
  js += "    }\n\n";
  js += '    block.style.display = "";\n';
  js +=
    '    if (count) count.textContent = recs.length + " " + t("recommended_count");\n';
  js += "    grid.innerHTML = recs.map(function(rec) {\n";
  js +=
    '        return \'<button type="button" class="rec-card" onclick="openProductModal(\' + rec.id + \')">\' +\n';
  js +=
    '            \'<span class="rec-img"><img src="\' + rec.img + \'" alt="\' + pName(rec) + \'" loading="lazy"></span>\' +\n';
  js += "            '<span class=\"rec-body\">' +\n";
  js += "            '<span class=\"rec-name\">' + pName(rec) + '</span>' +\n";
  js +=
    "            '<span class=\"rec-meta\"><span>' + rec.rating.toFixed(1) + ' &#9733;</span><span class=\"rec-price\">' + CURRENCY + rec.price + '</span></span>' +\n";
  js += "            '</span>' +\n";
  js += "            '</button>';\n";
  js += '    }).join("");\n';
  js += "}\n\n";

  js += "// ===================== PRODUCT MODAL =====================\n";
  js += "function openProductModal(id) {\n";
  js += "    var p = PRODUCTS.find(function(x) { return x.id === id; });\n";
  js += "    if (!p) return;\n\n";

  js += "    modalProduct = p;\n";
  js += "    modalQty = 1;\n";
  js += "    modalSize = p.sizes && p.sizes[0] ? p.sizes[0] : null;\n\n";

  js += '    document.getElementById("modalImg").src = p.img;\n';
  js += '    document.getElementById("modalTitle").textContent = pName(p);\n';
  js +=
    "    var cat = CATEGORIES.find(function(c) { return c.id === p.cat; });\n";
  js +=
    '    document.getElementById("modalCat").textContent = cat ? (lang === "ar" ? cat.nameAr : cat.nameEn) : p.cat;\n';
  js +=
    '    document.getElementById("modalPrice").textContent = CURRENCY + p.price;\n\n';

  js += '    var origEl = document.getElementById("modalOrigPrice");\n';
  js += "    if (p.orig) {\n";
  js += "        origEl.textContent = CURRENCY + p.orig;\n";
  js += '        origEl.style.display = "";\n';
  js += "    } else {\n";
  js += '        origEl.style.display = "none";\n';
  js += "    }\n\n";

  js += "    // Sizes\n";
  js += '    var sizesWrap = document.getElementById("modalSizes");\n';
  js += '    var sizesBlock = document.getElementById("modalSizesBlock");\n';
  js += "    if (p.sizes && p.sizes.length) {\n";
  js += "        sizesWrap.innerHTML = p.sizes.map(function(s, i) {\n";
  js +=
    "            return '<button class=\"size-opt' + (i === 0 ? \" selected\" : \"\") + '\" onclick=\"selectSize(\\''  + s + '\\', this)\">' + s + '</button>';\n";
  js += '        }).join("");\n';
  js += '        sizesBlock.style.display = "";\n';
  js += "    } else {\n";
  js += '        sizesBlock.style.display = "none";\n';
  js += "    }\n\n";

  js += '    document.getElementById("modalQtyNum").textContent = 1;\n\n';

  js += "    // WhatsApp button\n";
  js += '    var waBtn = document.getElementById("modalWaBtn");\n';
  js +=
    '    var waText = "🛍️ مرحبا، أريد الطلب | Hi, I want to order:\\n\\n";\n';
  js += '    waText += "• " + p.name_ar + " | " + p.name_en + "\\n";\n';
  js +=
    '    if (modalSize) waText += "📐 المقاس | Size: " + modalSize + "\\n";\n';
  js += '    waText += "💰 السعر | Price: " + CURRENCY + p.price + "\\n";\n';
  js += '    waText += "\\nشكراً! Thank you!";\n';
  js +=
    '    waBtn.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(waText);\n\n';
  js += "    renderRecommendations(p);\n";
  js +=
    '    var modalContent = document.querySelector("#productModal .modal-content");\n';
  js += "    if (modalContent) modalContent.scrollTop = 0;\n\n";

  js +=
    '    document.getElementById("productModalOverlay").classList.add("open");\n';
  js += '    lockScroll("modal");\n';
  js += "}\n\n";

  js += "function closeProductModal() {\n";
  js += '    var overlay = document.getElementById("productModalOverlay");\n';
  js += '    if (overlay) overlay.classList.remove("open");\n';
  js += '    unlockScroll("modal");\n';
  js += "}\n\n";

  js += "function selectSize(size, btn) {\n";
  js += "    modalSize = size;\n";
  js +=
    '    document.querySelectorAll(".size-opt").forEach(function(b) { b.classList.remove("selected"); });\n';
  js += '    btn.classList.add("selected");\n';
  js += "}\n\n";

  js += "function changeModalQty(d) {\n";
  js += "    modalQty = Math.max(1, modalQty + d);\n";
  js += '    document.getElementById("modalQtyNum").textContent = modalQty;\n';
  js += "}\n\n";

  js += "function addFromModal() {\n";
  js += "    if (!modalProduct) return;\n\n";

  js +=
    "    var existing = cart.find(function(item) { return item.id === modalProduct.id && item.size === modalSize; });\n";
  js += "    if (existing) {\n";
  js += "        existing.qty += modalQty;\n";
  js += "    } else {\n";
  js +=
    "        cart.push({ id: modalProduct.id, size: modalSize, qty: modalQty });\n";
  js += "    }\n\n";

  js += "    saveCart();\n";
  js += '    var overlay = document.getElementById("productModalOverlay");\n';
  js += '    if (overlay) overlay.classList.remove("open");\n';
  js += '    _openOverlays.delete("modal");\n';
  js += "    openCart();\n";
  js += "}\n\n";

  js += "// ===================== CART =====================\n";
  js += "function saveCart() {\n";
  js += '    storageSet("site-cart", JSON.stringify(cart));\n';
  js += "    updateBadges();\n";
  js += "}\n\n";

  js += "function updateBadges() {\n";
  js +=
    "    var cartTotal = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);\n";
  js += '    var cartBadge = document.getElementById("cartBadge");\n';
  js += "    if (cartBadge) cartBadge.textContent = cartTotal;\n\n";

  js += '    var wishBadge = document.getElementById("wishBadge");\n';
  js += "    if (wishBadge) wishBadge.textContent = wishlist.length;\n";
  js += "}\n\n";

  js += "function openCart() {\n";
  js += '    var cartOverlay = document.getElementById("cartOverlay");\n';
  js += '    if (cartOverlay) cartOverlay.classList.add("open");\n';
  js += '    var cartDrawer = document.getElementById("cartDrawer");\n';
  js += '    if (cartDrawer) cartDrawer.classList.add("open");\n';
  js += '    lockScroll("cart");\n';
  js += "    renderCart();\n";
  js += "}\n\n";

  js += "function closeCart() {\n";
  js += '    var cartOverlay = document.getElementById("cartOverlay");\n';
  js += '    if (cartOverlay) cartOverlay.classList.remove("open");\n';
  js += '    var cartDrawer = document.getElementById("cartDrawer");\n';
  js += '    if (cartDrawer) cartDrawer.classList.remove("open");\n';
  js += '    unlockScroll("cart");\n';
  js += "}\n\n";

  js += "function renderCart() {\n";
  js += '    var body = document.getElementById("cartBody");\n';
  js += '    var foot = document.getElementById("cartFoot");\n';
  js += "    if (!body) return;\n\n";

  js += "    if (!cart.length) {\n";
  js +=
    '        body.innerHTML = \'<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>\' + t("cart_empty") + \'</p></div>\';\n';
  js += '        if (foot) foot.style.display = "none";\n';
  js += "        return;\n";
  js += "    }\n\n";

  js += '    if (foot) foot.style.display = "";\n\n';

  js += "    var total = 0;\n";
  js += "    body.innerHTML = cart.map(function(item, idx) {\n";
  js +=
    "        var p = PRODUCTS.find(function(x) { return x.id === item.id; });\n";
  js += '        if (!p) return "";\n';
  js += "        var itemTotal = p.price * item.qty;\n";
  js += "        total += itemTotal;\n\n";

  js += "        return '<div class=\"cart-item\">' +\n";
  js +=
    "            '<img class=\"cart-item-img\" src=\"' + p.img + '\" alt=\"' + pName(p) + '\">' +\n";
  js += "            '<div class=\"cart-item-info\">' +\n";
  js +=
    "            '<div class=\"cart-item-name\">' + pName(p) + '</div>' +\n";
  js +=
    "            (item.size ? '<div class=\"cart-item-size\">' + item.size + '</div>' : \"\") +\n";
  js +=
    "            '<div class=\"cart-item-price\">' + CURRENCY + itemTotal + '</div>' +\n";
  js += "            '<div class=\"cart-item-qty\">' +\n";
  js +=
    '            \'<button class="qty-btn" onclick="updateCartQty(\' + idx + \', -1)"><i class="fas fa-minus"></i></button>\' +\n';
  js += "            '<span>' + item.qty + '</span>' +\n";
  js +=
    '            \'<button class="qty-btn" onclick="updateCartQty(\' + idx + \', 1)"><i class="fas fa-plus"></i></button>\' +\n';
  js += "            '</div></div>' +\n";
  js +=
    '            \'<button class="cart-remove" onclick="removeFromCart(\' + idx + \')"><i class="fas fa-trash"></i></button>\' +\n';
  js += "            '</div>';\n";
  js += '    }).join("");\n\n';

  js +=
    '    document.getElementById("cartTotalVal").textContent = CURRENCY + total;\n';
  js += "}\n\n";

  js += "function updateCartQty(idx, delta) {\n";
  js += "    cart[idx].qty += delta;\n";
  js += "    if (cart[idx].qty <= 0) cart.splice(idx, 1);\n";
  js += "    saveCart();\n";
  js += "    renderCart();\n";
  js += "}\n\n";

  js += "function removeFromCart(idx) {\n";
  js += "    cart.splice(idx, 1);\n";
  js += "    saveCart();\n";
  js += "    renderCart();\n";
  js += "}\n\n";

  js += "function checkoutWA() {\n";
  js += "    if (!cart.length) return;\n\n";

  js += '    var custName = document.getElementById("custName");\n';
  js += '    custName = custName ? custName.value.trim() : "";\n';
  js += '    var custAddress = document.getElementById("custAddress");\n';
  js += '    custAddress = custAddress ? custAddress.value.trim() : "";\n\n';

  js += "    var total = 0;\n";
  js += "    var itemLines = [];\n";
  js += "    cart.forEach(function(item) {\n";
  js +=
    "        var p = PRODUCTS.find(function(x) { return x.id === item.id; });\n";
  js += "        if (!p) return;\n";
  js += "        var itemTotal = p.price * item.qty;\n";
  js += "        total += itemTotal;\n";
  js += '        var line = "• " + p.name_ar + " | " + p.name_en;\n';
  js += '        if (item.size) line += " (" + item.size + ")";\n';
  js += '        line += " × " + item.qty + " = " + CURRENCY + itemTotal;\n';
  js += "        itemLines.push(line);\n";
  js += "    });\n\n";

  js += '    var msg = "";\n';
  js += '    msg += "🛍️ طلب جديد | New Order\\n";\n';
  js += '    msg += "━━━━━━━━━━━━━━━━━━\\n\\n";\n';
  js += '    msg += "📦 المنتجات | Products:\\n";\n';
  js += '    msg += itemLines.join("\\n") + "\\n\\n";\n';
  js += '    msg += "━━━━━━━━━━━━━━━━━━\\n";\n';
  js += '    msg += "💰 المجموع | Total: " + CURRENCY + total + "\\n";\n';
  js += '    if (custName) msg += "👤 الاسم | Name: " + custName + "\\n";\n';
  js +=
    '    if (custAddress) msg += "📍 العنوان | Address: " + custAddress + "\\n";\n';
  js += '    msg += "\\nشكراً لك! Thank you! 🙏";\n\n';

  js +=
    '    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank");\n';
  js += "}\n\n";

  js += "// ===================== WISHLIST =====================\n";
  js += "function toggleWish(id) {\n";
  js += "    var idx = wishlist.indexOf(id);\n";
  js += "    if (idx > -1) {\n";
  js += "        wishlist.splice(idx, 1);\n";
  js += "    } else {\n";
  js += "        wishlist.push(id);\n";
  js += "    }\n";
  js += '    storageSet("site-wishlist", JSON.stringify(wishlist));\n';
  js += "    updateBadges();\n";
  js += "    renderProducts();\n";
  js += "}\n\n";

  js += "function openWishlist() {\n";
  js +=
    '    var wishlistOverlay = document.getElementById("wishlistOverlay");\n';
  js += '    if (wishlistOverlay) wishlistOverlay.classList.add("open");\n';
  js += '    var wishlistDrawer = document.getElementById("wishlistDrawer");\n';
  js += '    if (wishlistDrawer) wishlistDrawer.classList.add("open");\n';
  js += '    lockScroll("wishlist");\n';
  js += "    renderWishlist();\n";
  js += "}\n\n";

  js += "function closeWishlist() {\n";
  js +=
    '    var wishlistOverlay = document.getElementById("wishlistOverlay");\n';
  js += '    if (wishlistOverlay) wishlistOverlay.classList.remove("open");\n';
  js += '    var wishlistDrawer = document.getElementById("wishlistDrawer");\n';
  js += '    if (wishlistDrawer) wishlistDrawer.classList.remove("open");\n';
  js += '    unlockScroll("wishlist");\n';
  js += "}\n\n";

  js += "function renderWishlist() {\n";
  js += '    var body = document.getElementById("wishlistBody");\n';
  js += "    if (!body) return;\n\n";

  js += "    if (!wishlist.length) {\n";
  js +=
    '        body.innerHTML = \'<div class="cart-empty"><i class="fas fa-heart"></i><p>Your wishlist is empty</p></div>\';\n';
  js += "        return;\n";
  js += "    }\n\n";

  js += "    body.innerHTML = wishlist.map(function(id) {\n";
  js += "        var p = PRODUCTS.find(function(x) { return x.id === id; });\n";
  js += '        if (!p) return "";\n\n';

  js += "        return '<div class=\"cart-item\">' +\n";
  js +=
    "            '<img class=\"cart-item-img\" src=\"' + p.img + '\" alt=\"' + pName(p) + '\">' +\n";
  js += "            '<div class=\"cart-item-info\">' +\n";
  js +=
    "            '<div class=\"cart-item-name\">' + pName(p) + '</div>' +\n";
  js +=
    "            '<div class=\"cart-item-price\">' + CURRENCY + p.price + '</div>' +\n";
  js += "            '</div>' +\n";
  js +=
    '            \'<button class="cart-remove" onclick="toggleWish(\' + p.id + \'); renderWishlist();"><i class="fas fa-times"></i></button>\' +\n';
  js += "            '</div>';\n";
  js += '    }).join("");\n';
  js += "}\n";

  return js;
}

// ===================== UTILITIES =====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close modals on overlay click
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal-overlay") &&
    !e.target.querySelector(".modal-content:hover")
  ) {
    e.target.classList.remove("open");
  }
});

