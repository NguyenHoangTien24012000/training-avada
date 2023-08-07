export function sortProductCreatedAt(dataProduct, sort = "asc") {
  if (sort === "asc") {
    return dataProduct.sort(
      (prevProduct, currentProduct) =>
        new Date(prevProduct.createdAt) - new Date(currentProduct.createdAt)
    );
  }
  return dataProduct.sort(
    (prevProduct, currentProduct) =>
      new Date(currentProduct.createdAt) - new Date(prevProduct.createdAt)
  );
}

