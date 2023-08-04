export function sortProductCreatedAt(sort, dataProduct){
    if(sort === "asc"){
        return dataProduct.sort((prevProduct, currentProduct) => new Date(prevProduct.createdAt) - new Date(currentProduct.createdAt));
    }else if(sort === "desc"){
        return dataProduct.sort((prevProduct, currentProduct) => new Date(currentProduct.createdAt) - new Date(prevProduct.createdAt));
    }
}