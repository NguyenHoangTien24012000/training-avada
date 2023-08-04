export function sortProductCreatedAt(sort = "asc", dataProduct){
    if(sort === "asc"){
        return dataProduct.sort((prevProduct, currentProduct) => new Date(prevProduct.createdAt) - new Date(currentProduct.createdAt));
    }else {
        return dataProduct.sort((prevProduct, currentProduct) => new Date(currentProduct.createdAt) - new Date(prevProduct.createdAt));
    }
}