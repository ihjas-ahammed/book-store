const Category = require('./Category'); 

async function addProduct(categoryName, productData) {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
  category.items.push(productData);
  await category.save();
  return productData;
}


async function updateProduct(categoryName, productId, updateData) {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
  const productIndex = category.items.findIndex(item => item.id === productId);
  if (productIndex === -1) {
    throw new Error(`Product with id ${productId} not found`);
  }
  const updatedProduct = {
    ...category.items[productIndex]._doc, 
    ...updateData,
  };
  category.items[productIndex] = updatedProduct;
  await category.save();
  return updatedProduct;
}

async function removeProduct(categoryName, productId) {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
  const productIndex = category.items.findIndex(item => item.id === productId);
  if (productIndex === -1) {
    throw new Error(`Product with id ${productId} not found`);
  }
  category.items.splice(productIndex, 1);
  await category.save();
}

async function addCategory(categoryData) {
  const newCategory = new Category(categoryData);
  await newCategory.save();
  return newCategory;
}

async function updateCategory(categoryName, updateData) {
  const category = await Category.findOneAndUpdate(
    { name: categoryName },
    updateData,
    { new: true }
  );
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
  return category;
}

async function removeCategory(categoryName) {
  const category = await Category.findOneAndDelete({ name: categoryName });
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
}

async function getAllProducts() {
  return await Category.find();
}

async function getProducts(categoryName) {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error(`Category '${categoryName}' not found`);
  }
  return category.items;
}

async function getProductByName(productName) {
  const categories = await Category.find({ "items.name": productName });
  if (!categories || categories.length === 0) {
    throw new Error(`Product '${productName}' not found`);
  }
  
  const foundProducts = [];
  categories.forEach(category => {
    category.items.forEach(item => {
      if (item.name === productName) {
        foundProducts.push(item);
      }
    });
  });
  return foundProducts;
}

module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  addCategory,
  updateCategory,
  removeCategory,
  getAllProducts,
  getProducts,
  getProductByName,
};
