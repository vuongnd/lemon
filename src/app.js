function switchView () {
    $('.products-list').toggleClass('grid-view row-view');
    $('.switch-view').toggleClass('disabled');
}

function openProductDetails() {
    $('.btn-details').toggleClass(['open-product']);
    $('.product-content').toggle();
    $('.product-details').toggleClass('product-details-block');
}