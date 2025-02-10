import React, { useState, useEffect } from 'react';
import { Stack, Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Card, CardContent, CardMedia, CardActions} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Category as CategoryIcon } from '@mui/icons-material';
import axios from 'axios';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    price: '',
    priceOld: '',
    rating: '',
    image: '',
    description: '',
    author: ''
  });
  
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:3001/product/add', {
      categoryName: selectedCategory,
      product: { ...productForm, id: Date.now() }
    })
      .then(() => {
        setOpenProductDialog(false);
        fetchProducts();
        setProductForm({
          id: '',
          name: '',
          price: '',
          priceOld: '',
          rating: '',
          image: '',
          description: '',
          author: ''
        });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (categoryName, productId) => {
    axios.delete('http://localhost:3001/product/remove', {
      data: { categoryName, productId }
    })
      .then(() => fetchProducts())
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleAddCategory = () => {
    axios.post('http://localhost:3001/category/add', {
      categoryData: { name: categoryName }
    })
      .then(() => {
        setOpenCategoryDialog(false);
        setCategoryName('');
        fetchProducts();
      })
      .catch(error => console.error('Error adding category:', error));
  };

  const handleCategoryRename = (oldName) => {
    axios.put('http://localhost:3001/category/update', {
      categoryName: oldName,
      updateData: { name: categoryName }
    })
      .then(() => {
        setOpenCategoryDialog(false);
        setCategoryName('');
        fetchProducts();
      })
      .catch(error => console.error('Error updating category:', error));
  };

  const handleDeleteCategory = (categoryName) => {
    axios.delete('http://localhost:3001/category/remove', {
      data: { categoryName }
    })
      .then(() => fetchProducts())
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <Stack spacing={4} className="p-6">
      <Box className="flex justify-between items-center">
        <Typography variant="h4" className="font-bold">Products Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<CategoryIcon />}
          onClick={() => setOpenCategoryDialog(true)}
        >
          Add Category
        </Button>
      </Box>

      {products.map((category) => (
        <Box key={category.name} className="mb-8">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="font-medium">
              {category.name}
            </Typography>
            <Box>
              <IconButton onClick={() => {
                setCategoryName(category.name);
                setOpenCategoryDialog(true);
              }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteCategory(category.name)}>
                <DeleteIcon />
              </IconButton>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setOpenProductDialog(true);
                }}
              >
                Add Product
              </Button>
            </Box>
          </Box>

          <Box className="flex flex-wrap gap-4">
            {category.items.map((product) => (
              <Card key={product.id} className="w-64">
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  className="h-40 object-cover"
                />
                <CardContent>
                  <Typography variant="h6" noWrap>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {product.author}
                  </Typography>
                  <Box className="flex justify-between mt-2">
                    <Typography variant="body1" color="primary">
                      ${product.price}
                    </Typography>
                    {product.priceOld && (
                      <Typography variant="body2" color="text.secondary" className="line-through">
                        ${product.priceOld}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2">Rating: {product.rating}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleDeleteProduct(category.name, product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} className="mt-2">
            <TextField
              label="Name"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Author"
              value={productForm.author}
              onChange={(e) => setProductForm({ ...productForm, author: e.target.value })}
              fullWidth
            />
            <TextField
              label="Price"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              fullWidth
            />
            <TextField
              label="Old Price"
              value={productForm.priceOld}
              onChange={(e) => setProductForm({ ...productForm, priceOld: e.target.value })}
              fullWidth
            />
            <TextField
              label="Rating"
              value={productForm.rating}
              onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Category Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => categoryName === '' ? handleAddCategory() : handleCategoryRename(categoryName)} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ProductsAdmin;