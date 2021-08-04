import Images from "../../components/exportFiles/exportImages";
import {useSelector} from 'react-redux';



let images = new Images();

let initialState = [
]
const updateQuantity = (state = initialState, action) => {
    
    switch(action.type){
        case "ADD_TO_CART":
            state.push(action.payload.item);
            return state.map(item => {
                return (item.id === action.payload.item.id)?{...item,quantity: item.quantity + 1,unitPrice: (item.quantity + 1) * item.price} : {...item};
            });
        case "DELETE_PRODUCT_CHECKOUT":
            return state.filter(item => {
                return item.id != action.payload.id;
            });
        case "CHECKOUT_PRODUCT_INCREMENT":
            return state.map(item => {
                return (item.id === action.payload.id)?{...item,quantity: item.quantity + 1,unitPrice: (item.quantity + 1) * item.price} : {...item};
            });
            
        case "CHECKOUT_PRODUCT_DECREMENT":
            return state.map( item => {
                return (item.id === action.payload.id && item.quantity > 0)?{...item, quantity: item.quantity - 1, unitPrice: item.price * (item.quantity-1) }: {...item}
            });
        default:
            return state;
    }
}

export default updateQuantity;