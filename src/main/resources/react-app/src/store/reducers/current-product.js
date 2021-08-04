import Images from '../../components/exportFiles/exportImages'
let images = new Images()
let initialState = {
    id: 1,
    itemName: "Beats on Solo2 On Ear Headphones",
    image: images.BeatsSoloBlack1(),
    color: "Black",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    size: "XS",
    favorite: 0,
    quantity: 0,
    price: 499,
    category: "men's clothing"
}
const updateCurrentProductQuantity = (state = initialState, action) => {
    switch(action.type){
        case "ADD_QUANTITY":
            console.log(5);
            return {...state, quantity: state.quantity + 1}
        case "MINUS_QUANTITY":
            return (state.quantity > 0)? {...state, quantity: state.quantity - 1}: state;
        case "SET_CUR_PROD":
            state = action.payload.item;
            return state;
        default:
            return state;
    }
}

export default updateCurrentProductQuantity;