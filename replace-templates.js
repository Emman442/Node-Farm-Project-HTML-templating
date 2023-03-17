module.exports = function(temp,product){
    let Output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    Output = Output.replace(/{%PRICE%}/g,product.price)
    Output = Output.replace(/{%FROM%}/g,product.from)
    Output = Output.replace(/{%PRODUCTNUTRIENTSNAME%}/g,product.nutrients)
    Output = Output.replace(/{%QUANTITY%}/g,product.quantity)
    Output = Output.replace(/{%DESCRIPTION%}/g,product.description)
    Output = Output.replace(/{%ID%}/g,product.id)
    Output = Output.replace(/{%IMAGE%}/g,product.image)
    if(!product.organic){
        Output = Output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    }
    return Output
}
