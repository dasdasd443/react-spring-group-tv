import {faStar,faHeart,faShoppingCart,faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../store/action/store-actions';
import {addToFavorites, removeFromFavorites} from '../../store/action/favorites-action';
import {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import './best-seller-card.css';
const BestSellerCard = ({id,itemName, price, image,hotornot}) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const checkoutList = useSelector(state => state.checkoutProducts);
    const favorites = useSelector(state => state.favorites);
    const addToCartFunc = useCallback((id) => {
        let [item] = productList.filter(item => item.id==id); 
        item = {...item, quantity: 0, unitPrice: 0};
        setAddToCartButton(<FontAwesomeIcon icon={faCheck} className='overlay-icon disabled'/>)
        dispatch(addToCart(item));
    })

    const removeFromFavoritesFunc = useCallback((id) => {
        setAddToFavoritesButton(<FontAwesomeIcon icon={faHeart} onClick={()=>addToFavoritesFunc(id)} className='overlay-icon enabled'/>)
        dispatch(removeFromFavorites(id));
    })

    const addToFavoritesFunc = useCallback((id) => {
        
        let [item] = productList.filter(item => item.id==id);
        setAddToFavoritesButton(<FontAwesomeIcon icon={faHeart} onClick={ ()=>removeFromFavoritesFunc(id)} className='overlay-icon favorite enabled'/>)
        dispatch(addToFavorites(item));
    })
    const [addToCartButton, setAddToCartButton] = useState(
        (checkoutList.some(item => item.id == id)?<FontAwesomeIcon icon={faCheck} className='overlay-icon disabled'/>:<FontAwesomeIcon icon={faShoppingCart} onClick={() => addToCartFunc(id)} className='overlay-icon enabled'/>)
    );
    const [addToFavoritesButton, setAddToFavoritesButton] = useState(
        (favorites.some(item => item.id == id)? <FontAwesomeIcon icon={faHeart} onClick={ ()=>removeFromFavoritesFunc(id)} className='overlay-icon favorite enabled'/>: <FontAwesomeIcon icon={faHeart} onClick={() => addToFavoritesFunc(id)}className='overlay-icon enabled'/>)
    );
    return (
        <div className={`bs-category-gallery--one--box ${hotornot}`}>
            <section className="bs-category-gallery--one--box--image">
                <img src={image} alt="" />
                <div className="bs-category-gallery--one--box--image--overlay">
                    {addToCartButton}
                    {addToFavoritesButton}
                </div>
            </section>
            <section className="bs-category-gallery--one--box--details">
                <h4 className="bs-category-gallery--one--box--details--h4"><Link to={`/product-item/${id}`}>{itemName}</Link></h4>
                <div className="bs-category-gallery--one--box--details--stars">
                <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar}/>
                    <FontAwesomeIcon icon={faStar} className = "bs-category-gallery--one--box--details--stars--last"/>
                </div>
                <div className="bs-category-gallery--one--box--details--price">
                    <p className="bs-category-gallery--one--box--details--price--enabled" >${price}</p>
                    <p className="bs-category-gallery--one--box--details--price--disabled">$599</p>
                </div>
            </section>
        </div>
    );
}

export default BestSellerCard;