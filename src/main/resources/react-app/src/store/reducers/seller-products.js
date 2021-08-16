

const SellerProducts = (state= false, action) => {
    switch(action.type){
        case 'GET_PRODUCTS':
            return state=action.payload.products
        default:
            return state;
    }
}

export default SellerProducts;