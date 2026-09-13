import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';

const firebaseConfig = {
  projectId: "duofy-database",
  appId: "1:627087433319:web:692ecabeaf47717f79fec2",
  databaseURL: "https://duofy-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "duofy-database.firebasestorage.app",
  apiKey: "AIzaSyC6BuQvYUAb5kFd5W2tazuD0kAtTSuYMfs",
  authDomain: "duofy-database.firebaseapp.com",
  messagingSenderId: "627087433319",
  projectNumber: "627087433319"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed data
const defaultCategories = [
  {
    name: "Fiction",
    items: [
      {
        id: 101,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 15,
        priceOld: 20,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
        description: "A classic novel about the American Dream in the 1920s."
      },
      {
        id: 102,
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12,
        priceOld: 15,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        description: "A story of racial injustice and the destruction of innocence in the American South."
      }
    ]
  },
  {
    name: "Science",
    items: [
      {
        id: 201,
        name: "A Brief History of Time",
        author: "Stephen Hawking",
        price: 18,
        priceOld: 25,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        description: "An landmark volume in science writing by one of the great minds of our time."
      },
      {
        id: 202,
        name: "Cosmos",
        author: "Carl Sagan",
        price: 20,
        priceOld: null,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
        description: "The companion volume to the legendary television series."
      }
    ]
  },
  {
    name: "Self-Help",
    items: [
      {
        id: 301,
        name: "Atomic Habits",
        author: "James Clear",
        price: 16,
        priceOld: 22,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
        description: "An easy and proven way to build good habits and break bad ones."
      },
      {
        id: 302,
        name: "The Power of Now",
        author: "Eckhart Tolle",
        price: 14,
        priceOld: 18,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600",
        description: "A guide to spiritual enlightenment."
      }
    ]
  }
];

async function ensureDefaultCategories() {
  const snap = await getDocs(collection(db, 'categories'));
  if (snap.empty) {
    for (const cat of defaultCategories) {
      await setDoc(doc(db, 'categories', cat.name), {
        name: cat.name,
        items: cat.items
      });
    }
  }
}

const axios = {
  get: async (url, config) => {
    await ensureDefaultCategories();
    const cleanUrl = url.replace('http://localhost:3001', '');

    // 1. GET /products
    if (cleanUrl === '/products') {
      const snap = await getDocs(collection(db, 'categories'));
      const data = [];
      snap.forEach(d => {
        data.push(d.data());
      });
      return { data };
    }

    // 2. GET /products/:categoryName
    if (cleanUrl.startsWith('/products/')) {
      const categoryName = decodeURIComponent(cleanUrl.replace('/products/', ''));
      const docRef = doc(db, 'categories', categoryName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: docSnap.data().items || [] };
      } else {
        throw new Error(`Category ${categoryName} not found`);
      }
    }

    // 3. GET /product/byname/:productName
    if (cleanUrl.startsWith('/product/byname/')) {
      const productName = decodeURIComponent(cleanUrl.replace('/product/byname/', ''));
      const snap = await getDocs(collection(db, 'categories'));
      const foundProducts = [];
      snap.forEach(d => {
        const cat = d.data();
        (cat.items || []).forEach(item => {
          if (item.name === productName) {
            foundProducts.push(item);
          }
        });
      });
      return { data: foundProducts };
    }

    // 4. GET /cart/:username
    if (cleanUrl.startsWith('/cart/')) {
      const username = decodeURIComponent(cleanUrl.replace('/cart/', ''));
      const docRef = doc(db, 'carts', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: docSnap.data() };
      } else {
        return { data: { username, cartItems: [] } };
      }
    }

    // 5. GET /order/:username
    if (cleanUrl.startsWith('/order/')) {
      const username = decodeURIComponent(cleanUrl.replace('/order/', ''));
      const docRef = doc(db, 'orders', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: docSnap.data() };
      } else {
        return { data: { username, orders: [] } };
      }
    }

    throw new Error(`Unknown GET route: ${cleanUrl}`);
  },

  post: async (url, data, config) => {
    await ensureDefaultCategories();
    const cleanUrl = url.replace('http://localhost:3001', '');

    // 1. POST /user
    if (cleanUrl === '/user') {
      const { username, password } = data || {};
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const u = docSnap.data();
        if (u.password === password) {
          return { data: u };
        }
      }
      throw new Error('User not found or invalid credentials');
    }

    // 2. POST /user/add
    if (cleanUrl === '/user/add') {
      const { username, password, email } = data || {};
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { data: false }; // Indicates already exists
      }
      await setDoc(docRef, { username, password, email });
      return { data: true };
    }

    // 3. POST /user/setpassword
    if (cleanUrl === '/user/setpassword') {
      const { username, email, oldPassword, newPassword } = data || {};
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const u = docSnap.data();
        if (u.email === email && u.password === oldPassword) {
          await updateDoc(docRef, { password: newPassword });
          return { data: true };
        }
      }
      return { data: false };
    }

    // 4. POST /users
    if (cleanUrl === '/users') {
      const { adminPass } = data || {};
      if (adminPass !== 'supersecret') {
        return { data: [] };
      }
      const snap = await getDocs(collection(db, 'users'));
      const users = [];
      snap.forEach(d => {
        users.push(d.data());
      });
      return { data: users };
    }

    // 5. POST /product/add
    if (cleanUrl === '/product/add') {
      const { categoryName, product } = data || {};
      const docRef = doc(db, 'categories', categoryName);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Category ${categoryName} not found`);
      }
      const cat = docSnap.data();
      const items = cat.items || [];
      items.push(product);
      await updateDoc(docRef, { items });
      return { data: product };
    }

    // 6. POST /category/add
    if (cleanUrl === '/category/add') {
      const { categoryData } = data || {};
      const docRef = doc(db, 'categories', categoryData.name);
      await setDoc(docRef, {
        name: categoryData.name,
        items: categoryData.items || []
      });
      return { data: categoryData };
    }

    // 7. POST /cart/add
    if (cleanUrl === '/cart/add') {
      const { username, item } = data || {};
      const docRef = doc(db, 'carts', username);
      const docSnap = await getDoc(docRef);
      let cart = { username, cartItems: [] };
      if (docSnap.exists()) {
        cart = docSnap.data();
      }
      const cartItems = cart.cartItems || [];
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.item.name === item.name);
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].count += 1;
      } else {
        cartItems.push({ item, count: 1 });
      }
      await setDoc(docRef, { username, cartItems });
      return { data: { username, cartItems } };
    }

    // 8. POST /order/add
    if (cleanUrl === '/order/add') {
      const { username, item, count } = data || {};
      const docRef = doc(db, 'orders', username);
      const docSnap = await getDoc(docRef);
      let orderDoc = { username, orders: [] };
      if (docSnap.exists()) {
        orderDoc = docSnap.data();
      }
      const orders = orderDoc.orders || [];
      const existingItemIndex = orders.findIndex(order => order.item.name === item.name);
      if (existingItemIndex !== -1) {
        orders[existingItemIndex].count += count;
        orders[existingItemIndex].status = "Requested";
      } else {
        orders.push({ item, status: "Requested", count });
      }
      await setDoc(docRef, { username, orders });
      return { data: { username, orders } };
    }

    throw new Error(`Unknown POST route: ${cleanUrl}`);
  },

  put: async (url, data, config) => {
    await ensureDefaultCategories();
    const cleanUrl = url.replace('http://localhost:3001', '');

    // 1. PUT /product/update
    if (cleanUrl === '/product/update') {
      const { categoryName, productId, updateData } = data || {};
      const docRef = doc(db, 'categories', categoryName);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Category ${categoryName} not found`);
      }
      const cat = docSnap.data();
      const items = cat.items || [];
      const productIndex = items.findIndex(item => item.id === productId);
      if (productIndex === -1) {
        throw new Error(`Product with id ${productId} not found`);
      }
      const updatedProduct = {
        ...items[productIndex],
        ...updateData
      };
      items[productIndex] = updatedProduct;
      await updateDoc(docRef, { items });
      return { data: updatedProduct };
    }

    // 2. PUT /category/update
    if (cleanUrl === '/category/update') {
      const { categoryName, updateData } = data || {};
      const docRef = doc(db, 'categories', categoryName);
      await updateDoc(docRef, updateData);
      const updatedSnap = await getDoc(docRef);
      return { data: updatedSnap.data() };
    }

    // 3. PUT /cart/update
    if (cleanUrl === '/cart/update') {
      const { username, itemName, newCount } = data || {};
      const docRef = doc(db, 'carts', username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Cart not found');
      }
      const cart = docSnap.data();
      const cartItems = cart.cartItems || [];
      const index = cartItems.findIndex(cartItem => cartItem.item.name === itemName);
      if (index === -1) {
        throw new Error('Item not found in cart');
      }
      cartItems[index].count = newCount;
      await updateDoc(docRef, { cartItems });
      return { data: { username, cartItems } };
    }

    // 4. PUT /order/update
    if (cleanUrl === '/order/update') {
      const { username, itemName, status } = data || {};
      const docRef = doc(db, 'orders', username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Orders not found');
      }
      const orderDoc = docSnap.data();
      const orders = orderDoc.orders || [];
      const index = orders.findIndex(order => order.item.name === itemName);
      if (index === -1) {
        throw new Error('Item not found in orders');
      }
      orders[index].status = status;
      await updateDoc(docRef, { orders });
      return { data: { username, orders } };
    }

    throw new Error(`Unknown PUT route: ${cleanUrl}`);
  },

  delete: async (url, config) => {
    await ensureDefaultCategories();
    const cleanUrl = url.replace('http://localhost:3001', '');
    const data = config ? config.data : {};

    // 1. DELETE /user/remove
    if (cleanUrl === '/user/remove') {
      const { username, adminPass } = data || {};
      if (adminPass !== 'supersecret') {
        return { data: false };
      }
      const docRef = doc(db, 'users', username);
      await deleteDoc(docRef);
      return { data: true };
    }

    // 2. DELETE /product/remove
    if (cleanUrl === '/product/remove') {
      const { categoryName, productId } = data || {};
      const docRef = doc(db, 'categories', categoryName);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Category ${categoryName} not found`);
      }
      const cat = docSnap.data();
      const items = (cat.items || []).filter(item => item.id !== productId);
      await updateDoc(docRef, { items });
      return { data: true };
    }

    // 3. DELETE /category/remove
    if (cleanUrl === '/category/remove') {
      const { categoryName } = data || {};
      const docRef = doc(db, 'categories', categoryName);
      await deleteDoc(docRef);
      return { data: true };
    }

    // 4. DELETE /cart/remove
    if (cleanUrl === '/cart/remove') {
      const { username, itemName } = data || {};
      const docRef = doc(db, 'carts', username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Cart not found');
      }
      const cart = docSnap.data();
      const cartItems = (cart.cartItems || []).filter(cartItem => cartItem.item.name !== itemName);
      await updateDoc(docRef, { cartItems });
      return { data: { username, cartItems } };
    }

    // 5. DELETE /order/remove
    if (cleanUrl === '/order/remove') {
      const { username, itemName } = data || {};
      const docRef = doc(db, 'orders', username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Order not found');
      }
      const orderDoc = docSnap.data();
      const orders = (orderDoc.orders || []).filter(order => order.item.name !== itemName);
      await updateDoc(docRef, { orders });
      return { data: { username, orders } };
    }

    throw new Error(`Unknown DELETE route: ${cleanUrl}`);
  }
};

export default axios;
