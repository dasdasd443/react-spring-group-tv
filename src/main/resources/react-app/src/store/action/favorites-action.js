export const addToFavorites = (item) => {
    return {
        type: 'ADD_TO_FAVORITES',
        payload: {
            item
        }
    }
}

export const removeFromFavorites = (id) => {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        payload: {
            id
        }
    }
}