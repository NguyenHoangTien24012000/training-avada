import fs from "fs";
import products from "./products.json";
import path from "path";
import { sortProductCreatedAt } from "../presenter/product/sortProductCreatedAt";


export function getAllProducts(queryParam) {
  const {limit, sort} = queryParam;
  if(limit && sort){
    const dataLimit = products.slice(0, parseInt(limit));
    const dataLimitSort = sortProductCreatedAt(sort, dataLimit);
    return dataLimitSort;
  }else if(limit){
    return products.slice(0, parseInt(limit));
  }else if(sort){
    return sortProductCreatedAt(sort, products);
  }
  return products;
}

export function getOneProduct(id, queryParam) {
  const productFind = products.find((product) => parseInt(product.id) === parseInt(id));
  const {fields} = queryParam;
  if(fields){
    const arrFields = fields.split(',');
    const productWithFields = {};
    arrFields.forEach(field => {
      productWithFields[field] = productFind[field];
    });
    return productWithFields;
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
  products[findIndex] = { id, ...data };
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


