const express = require('express')
const app = express()
const port = 3001

var cors = require('cors')

require('./connection')

app.use(express.json())
app.use(cors())


const {
    getUser,
    setUserPassword,
    addUser,
    removeUser,
    getAllUsers,
} = require('./models/userOperations');

const {
    addProduct,
    updateProduct,
    removeProduct,
    addCategory,
    updateCategory,
    removeCategory,
    getAllProducts,
    getProducts,
    getProductByName,
  } = require('./models/productOperations');

  const Cart = require('./models/Cart')

  app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/user', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'username and password required' });
    }
    try {
        const user = await getUser(username, password);
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User not found or invalid credentials' });
        }
        res.json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error retrieving user', error: err.message });
    }
});

app.post('/user/add', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res
            .status(400)
            .json({ message: 'username, password, and email required' });
    }
    try {
        const success = await addUser(username, password, email);
        if (!success) {
            return res.status(400).json({ message: 'User already exists' });
        }
        res.json({ message: 'User added successfully' });
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error adding user', error: err.message });
    }
});


app.post('/user/setpassword', async (req, res) => {
    const { username, email, oldPassword, newPassword } = req.body;
    if (!username || !email || !oldPassword || !newPassword) {
        return res.status(400).json({
            message: 'username, email, oldPassword, and newPassword required',
        });
    }
    try {
        const success = await setUserPassword(
            username,
            email,
            oldPassword,
            newPassword
        );
        if (!success) {
            return res
                .status(400)
                .json({ message: 'User not found or credentials do not match' });
        }
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating password',
            error: err.message,
        });
    }
});



app.delete('/user/remove', async (req, res) => {
    const { username, adminPass } = req.body;
    if (!username || !adminPass) {
        return res
            .status(400)
            .json({ message: 'username and adminPass required' });
    }
    try {
        const success = await removeUser(username, adminPass);
        if (!success) {
            return res
                .status(400)
                .json({ message: 'User not found or invalid admin password' });
        }
        res.json({ message: 'User removed successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'Error removing user',
            error: err.message,
        });
    }
});


app.get('/users', async (req, res) => {
    const { adminPass } = req.body;
    if (!adminPass) {
        return res.status(400).json({ message: 'adminPass required' });
    }
    try {
        const users = await getAllUsers(adminPass);
        if (!users || (Array.isArray(users) && users.length === 0)) {
            return res.status(400).json({
                message: 'Invalid admin password or no users found',
            });
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving users',
            error: err.message,
        });
    }
});

app.post('/product/add', async (req, res) => {
    const { categoryName, product } = req.body;
    if (!categoryName || !product) {
      return res
        .status(400)
        .json({ message: 'categoryName and product data are required' });
    }
    try {
      const newProduct = await addProduct(categoryName, product);
      res.json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
      res.status(500).json({ message: 'Error adding product', error: err.message });
    }
  });
  
  app.put('/product/update', async (req, res) => {
    const { categoryName, productId, updateData } = req.body;
    if (!categoryName || !productId || !updateData) {
      return res.status(400).json({
        message: 'categoryName, productId, and updateData are required',
      });
    }
    try {
      const updatedProduct = await updateProduct(categoryName, productId, updateData);
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
      res.status(500).json({ message: 'Error updating product', error: err.message });
    }
  });
  
  app.delete('/product/remove', async (req, res) => {
    const { categoryName, productId } = req.body;
    if (!categoryName || !productId) {
      return res
        .status(400)
        .json({ message: 'categoryName and productId are required' });
    }
    try {
      await removeProduct(categoryName, productId);
      res.json({ message: 'Product removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error removing product', error: err.message });
    }
  });
  
  app.post('/category/add', async (req, res) => {
    const { categoryData } = req.body;
    if (!categoryData || !categoryData.name) {
      return res.status(400).json({ message: 'categoryData with a name is required' });
    }
    try {
      const newCategory = await addCategory(categoryData);
      res.json({ message: 'Category added successfully', category: newCategory });
    } catch (err) {
      res.status(500).json({ message: 'Error adding category', error: err.message });
    }
  });
  
  app.put('/category/update', async (req, res) => {
    const { categoryName, updateData } = req.body;
    if (!categoryName || !updateData) {
      return res
        .status(400)
        .json({ message: 'categoryName and updateData are required' });
    }
    try {
      const updatedCategory = await updateCategory(categoryName, updateData);
      res.json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (err) {
      res.status(500).json({ message: 'Error updating category', error: err.message });
    }
  });
  
  app.delete('/category/remove', async (req, res) => {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: 'categoryName is required' });
    }
    try {
      await removeCategory(categoryName);
      res.json({ message: 'Category removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error removing category', error: err.message });
    }
  });
  
  app.get('/products', async (req, res) => {
    try {
      const allProducts = await getAllProducts();
      res.json(allProducts);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving products', error: err.message });
    }
  });
  
  app.get('/products/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
      const products = await getProducts(categoryName);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving products', error: err.message });
    }
  });

  app.get('/product/byname/:productName', async (req, res) => {
    const productName = req.params.productName;
    try {
      const products = await getProductByName(productName);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving product', error: err.message });
    }
  });

  app.get('/cart/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const cart = await Cart.findOne({ username });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/cart/add', async (req, res) => {
    try {
      const { username, item } = req.body;
      if (!username || !item || !item.name) {
        return res.status(400).json({ message: 'username and item (with at least a name property) are required' });
      }
  
      let cart = await Cart.findOne({ username });
      if (!cart) {
        cart = new Cart({ username, cartItems: [] });
      }
  
      const existingItemIndex = cart.cartItems.findIndex(cartItem => cartItem.item.name === item.name);
      if (existingItemIndex !== -1) {
        cart.cartItems[existingItemIndex].count += 1;
      } else {
        cart.cartItems.push({ item, count: 1 });
      }
  
      await cart.save();
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/cart/remove', async (req, res) => {
    try {
      const { username, itemName } = req.body;
      if (!username || !itemName) {
        return res.status(400).json({ message: 'username and itemName are required' });
      }
  
      let cart = await Cart.findOne({ username });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.cartItems = cart.cartItems.filter(cartItem => cartItem.item.name !== itemName);
  
      await cart.save();
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.put('/cart/update', async (req, res) => {
    try {
      const { username, itemName, newCount } = req.body;
      if (!username || !itemName || newCount === undefined) {
        return res.status(400).json({ message: 'username, itemName, and newCount are required' });
      }
  
      let cart = await Cart.findOne({ username });
      if (!cart) {
        cart = new Cart({ username, cartItems: [] });
      }
  
      const index = cart.cartItems.findIndex(cartItem => cartItem.item.name === itemName);
      if (index === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      cart.cartItems[index].count = newCount;
  
      await cart.save();
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.listen(port, () => {
    console.log(`Backend server started at ${port} `)
})