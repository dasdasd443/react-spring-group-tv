import updateQuantity from './reducers/update-quantity';
import UpdateCurrentProduct from './reducers/current-product';
import ProductList from './reducers/store';
import Favorites from './reducers/favorites';
import isLoaded from './reducers/isLoaded';
import Newsletter from './reducers/newsletter';
import {combineReducers} from 'redux';

let reducers = combineReducers({
    checkoutProducts: updateQuantity,
    currentProduct: UpdateCurrentProduct,
    productList: ProductList,
    favorites: Favorites,
    isLoaded: isLoaded,
    newsletter: Newsletter
});

export default reducers;