import {
  getOneProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../database/productRepository";

export async function handleGetProduct(ctx) {
  try {
    const { id } = ctx.params;
    const queryParam = ctx.query;
    const currentProduct = getOneProduct(id, queryParam);
    if (currentProduct) {
      return (ctx.body = {
        success: true,
        data: currentProduct,
      });
    }
    ctx.status(404);
    return (ctx.body = {
      success: false,
      massage: "Product Not Found with that id",
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.massage,
    });
  }
}

export async function handleGetProducts(ctx) {
  try {
    const queryParam = ctx.query;
    const allProducts = getAllProducts(queryParam);
    return (ctx.body = {
      success: true,
      data: allProducts,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message,
    });
  }
}

export async function handleAddProduct(ctx) {
  try {
    const postData = ctx.request.body;
    const productAdded = addProduct(postData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data : productAdded
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

export async function handleUpdateProduct(ctx) {
  try {
    const putData = ctx.request.body;
    const { id } = ctx.params;
    const productUpdated = updateProduct(id, putData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data : productUpdated
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

export async function handleDeleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    deleteProduct(id);
    ctx.status = 200;
    return (ctx.body = {
        success : true
    })
  } catch (error) {
    return (ctx.body = {
        success : false,
        error : error.message
    })
  }
}
