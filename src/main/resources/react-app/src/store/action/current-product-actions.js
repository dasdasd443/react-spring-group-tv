export const addQuantity = (id) => {
    return {
        type: "ADD_QUANTITY",
        payload: {
            id
        }
    }
}

export const minusQuantity = (id) => {
    return {
        type: "MINUS_QUANTITY",
        payload: {
            id
        }
    }
}

export const setCurrentProduct = (item) => {
    return {
        type:"SET_CUR_PROD",
        payload:{
            item
        }
    }
}