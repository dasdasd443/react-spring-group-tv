export const RetrieveProducts = (products) => {
    return {
        type:'GET_PRODUCTS',
        payload:{
            products
        }
    }
}