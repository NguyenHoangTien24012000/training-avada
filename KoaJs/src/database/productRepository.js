import fs from "fs";
import products from "./products.json";
import path from "path";
import { sortProductCreatedAt } from "../presenter/product/sortProductCreatedAt";
import { productWithFields } from "../presenter/product/productWithFileds";


export function getAllProducts(queryParam) {
  const {limit, sort} = queryParam;
  let dataProduct = [];
  if(sort){
    dataProduct = sortProductCreatedAt(products, sort);
  }
  if(limit){
    dataProduct = dataProduct.slice(0, parseInt(limit));
  }
  
  return dataProduct;
}

export function getOneProduct(id, queryParam) {
  const productFind = products.find((product) => parseInt(product.id) === parseInt(id));
  const {fields} = queryParam;
  if(fields){
    return productWithFields(fields, productFind);
  }
  return productFind;
}

export function addProduct(data) {
  const newProduct = {id: Date.now(),...data};
  const updatedProducts = [newProduct, ...products];
  fs.writeFileSync(
    path.join(__dirname, 'products.json'),
    JSON.stringify(updatedProducts)
  );
  return newProduct
}

export function updateProduct(id, data) {
  const findIndex = products.findIndex(
    (product) => parseInt(product.id) === parseInt(id)
  );
  products[findIndex] = { ...data, id};
  fs.writeFileSync(
    path.join(__dirname, 'products.json'),
    JSON.stringify(products)
  );
  return products[findIndex];
}

export function deleteProduct(id) {
  const findIndex = products.findIndex(
    (product) => parseInt(product.id) === parseInt(id)
  );
  products.splice(findIndex, 1);
  return fs.writeFileSync(
    path.join(__dirname, 'products.json'),
    JSON.stringify(products)
  );
}


