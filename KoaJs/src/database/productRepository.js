import fs from "fs";
import products from "./products.json";
import path from "path";
import { sortProductCreatedAt } from "../presenter/product/sortProductCreatedAt";
import { productWithFileds } from "../presenter/product/productWithFileds";


export function getAllProducts(queryParam) {
  const {limit, sort} = queryParam;
  const dataSort = sortProductCreatedAt(sort, products);
  if(limit){
    const dataLimit = dataSort.slice(0, parseInt(limit));
    return dataLimit;
  }
  return dataSort;
}

export function getOneProduct(id, queryParam) {
  const productFind = products.find((product) => parseInt(product.id) === parseInt(id));
  const {fields} = queryParam;
  if(fields){
    return productWithFileds(fields, productFind);
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


