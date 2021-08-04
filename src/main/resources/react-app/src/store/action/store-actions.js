export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            item
        }
    }
}

export const setInitialProducts = (products) => {
    return {
        type:'SET_INIT',
        payload: {
            products
        }
    }
}

export const checkExist = (id) => {
    return {
        type:'CHECK_EXIST',
        payload:{
            id
        }
    }
}