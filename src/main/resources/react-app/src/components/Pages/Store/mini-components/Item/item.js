import './item.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faShoppingCart, faHeart, faCheck} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {addToCart} from '../../../../../store/action/store-actions';
import {Link} from 'react-router-dom';
import {addToFavorites, removeFromFavorites} from '../../../../../store/action/favorites-action';
const Item = ({product}) => {
    const dispatch = useDispatch();
    const defaultText = `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Doloremque harum magni eum iure dolores tempora facere blanditiis assumenda! Dolorem iste obcaecati
    possimus.`;
    const productList = useSelector(state => state.productList);
    const checkoutList = useSelector(state => state.checkoutProducts);
    const favorites = useSelector(state => state.favorites);
    const addToCartFunc = useCallback((id) => {
        let item = {...product, quantity: 0, unitPrice: 0};
        setAddToCartButton(<button className="items-container-menus-content--buttons--add"><FontAwesomeIcon icon={faCheck} /> Added to Cart</button>)
        dispatch(addToCart(item));
    })
    const [addToCartButton, setAddToCartButton] = useState(
        (checkoutList.some(item => item.product_id === product.product_id)?<button className="items-container-menus-content--buttons--add"><FontAwesomeIcon icon={faCheck} /> Added to Cart</button>:<button className="enabled items-container-menus-content--buttons--add" onClick={() => addToCartFunc(product.product_id)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>)
    );
    const [addToFavoritesButton, setAddToFavoritesButton] = useState(
        (favorites.some(item => item.product_id === product.product_id)? <button className="items-container-menus-content--buttons--heart favorite" onClick={ ()=>removeFromFavoritesFunc(product.product_id)}><FontAwesomeIcon icon={faHeart} /></button>: <button className="items-container-menus-content--buttons--heart" onClick={() => addToFavoritesFunc(product.product_id)}><FontAwesomeIcon icon={faHeart} /></button>)
    );
    const removeFromFavoritesFunc = useCallback((id) => {
        setAddToFavoritesButton(<button className="items-container-menus-content--buttons--heart" onClick={() => addToFavoritesFunc(product.product_id)}><FontAwesomeIcon icon={faHeart} /></button>)
        dispatch(removeFromFavorites(product.product_id));
    })

    const addToFavoritesFunc = useCallback((id) => {
        
        setAddToFavoritesButton(<button className="items-container-menus-content--buttons--heart favorite" onClick={ ()=>removeFromFavoritesFunc(id)}><FontAwesomeIcon icon={faHeart} /></button>)
        dispatch(addToFavorites(product));
    })
    return (
        <div style={{width:'100%'}}>
            <div className="items-container-menus-boxes">
                <figure className="items-container-menus-boxes--img">
                    <img src={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`} alt=""/>
                </figure>
                <div className="items-container-menus-content">
                    <h3 className="items-container-menus-content--h3"><Link to={`/product-item/${product.product_id}`}>{product.product_name}</Link></h3>
                    <div className="items-container-menus-content--smallDetails">
                        <div className="items-container-menus-content--smallDetails--str">
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <span className="items-container-menus-content--smallDetails--reviews">0 reviews</span>
                        <span className="items-container-menus-content--smallDetails--subReviews">Submit a review</span>
                    </div>
                    <hr className="hr-properties"/>
                    <div className="bs-category-gallery--one--box--price items-container-menus-content--price">
                        <p className="bs-category-gallery--one--box--price--enabled" >${product.price.toLocaleString(undefined, {minimumFractionDigits:2})}</p>
                        <p className="bs-category-gallery--one--box--price--disabled"></p>
                    </div>
                    <p className="items-container-menus-content--p">{product.description || defaultText}
                    </p>
                    <div className="items-container-menus-content--buttons">
                    {addToCartButton}
                    {addToFavoritesButton}
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default Item;