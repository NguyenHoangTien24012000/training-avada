export function productWithFields(fields, productCurrent){
    const arrFields = fields.split(',');
    const productWithFields = {};
    arrFields.forEach(field => {
      productWithFields[field] = productCurrent[field];
    });
    return productWithFields;
}