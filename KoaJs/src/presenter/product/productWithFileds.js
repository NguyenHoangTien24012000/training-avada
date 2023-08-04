export function productWithFileds(fields, productCurrent){
    const arrFields = fields.split(',');
    const productWithFields = {};
    arrFields.forEach(field => {
      productWithFields[field] = productCurrent[field];
    });
    return productWithFields;
}