document.addEventListener('DOMContentLoaded', () => {    

    document.querySelectorAll('.product1').forEach(product => {
        // const productName = product.getAttribute('data-name'); 
        // const productInfo = product.querySelector('.product_info');

        const productPicture = product.getAttribute('data-picture');
        const productName = product.getAttribute('data-name');
        const productPriceRegular = product.getAttribute('data-price-regular');
        const decimalRegular = productPriceRegular - Math.floor(productPriceRegular);
        const productPriceOnline = product.getAttribute('data-price-online');
        const decimalOnline = productPriceOnline - Math.floor(productPriceOnline);
        
        product.querySelector('.product_name').innerHTML = productName;
        product.querySelector('.price_regular .product_price_number').innerHTML = 'S/.' + ${productPriceRegular};
        product.querySelector('.price_regular .product_price_number sup').innerHTML = '.' + ${decimalRegular};
        product.querySelector('.price_online .product_price_number').innerHTML = productPriceOnline;

        // });
    });

});

// function completeInfoProduct(classhtml , infohtml) {

// } 











