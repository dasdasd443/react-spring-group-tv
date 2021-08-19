const Favorites = (state = [{}], action) => {
    switch(action.type){
        case 'ADD_TO_FAVORITES':
            state.push(action.payload.item);
            return state;
        case 'REMOVE_FROM_FAVORITES':
            return state.filter(item => {
                return item.product_id != action.payload.id
            });
        default:
            return state
    }
}

export default Favorites;