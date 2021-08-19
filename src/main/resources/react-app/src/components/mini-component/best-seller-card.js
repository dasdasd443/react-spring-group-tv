import {faStar,faHeart,faShoppingCart,faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../store/action/store-actions';
import {addToFavorites, removeFromFavorites} from '../../store/action/favorites-action';
import {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './best-seller-card.css';
import { Card, CardContent, CardMedia } from '@material-ui/core';
const BestSellerCard = ({product ,hotornot}) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const checkoutList = useSelector(state => state.checkoutProducts);
    const favorites = useSelector(state => state.favorites);
    const addToCartFunc = useCallback((id) => {
        let item = {...product, quantity: 0, unitPrice: 0};
        setAddToCartButton(<FontAwesomeIcon icon={faCheck} className='overlay-icon disabled'/>)
        dispatch(addToCart(item));
    })

    const removeFromFavoritesFunc = useCallback((id) => {
        setAddToFavoritesButton(<FontAwesomeIcon icon={faHeart} onClick={()=>addToFavoritesFunc(id)} className='overlay-icon enabled'/>)
        dispatch(removeFromFavorites(id));
    })

    const addToFavoritesFunc = useCallback((id) => {
        
        setAddToFavoritesButton(<FontAwesomeIcon icon={faHeart} onClick={ ()=>removeFromFavoritesFunc(id)} className='overlay-icon favorite enabled'/>)
        dispatch(addToFavorites(product));
    })
    const [addToCartButton, setAddToCartButton] = useState(
        (checkoutList.some(item => item.product_id == product.product_id)?<FontAwesomeIcon icon={faCheck} className='overlay-icon disabled'/>:<FontAwesomeIcon icon={faShoppingCart} onClick={() => addToCartFunc(product.product_id)} className='overlay-icon enabled'/>)
    );
    const [addToFavoritesButton, setAddToFavoritesButton] = useState(
        (favorites.some(item => item.product_id == product.product_id)? <FontAwesomeIcon icon={faHeart} onClick={ ()=>removeFromFavoritesFunc(product.product_id)} className='overlay-icon favorite enabled'/>: <FontAwesomeIcon icon={faHeart} onClick={() => addToFavoritesFunc(product.product_id)}className='overlay-icon enabled'/>)
    );

    const [seller,setSeller] = useState(0)

    const GetSeller = useCallback(async function GetSeller(){
        await fetch(`http://localhost:5000/api/user/get-user/${product.seller_id}`).then(res => res.json())
        .then(json => setSeller(json));
    })

    useEffect(() => {
        GetSeller();
    },[product])
    return (
        <Card>
            <section className="bs-category-gallery--one--box--image">
                <CardMedia component="img" image={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`}/>
                <div className="bs-category-gallery--one--box--image--overlay">
                    {addToCartButton}
                    {addToFavoritesButton}
                </div>
            </section>
            <section className="bs-category-gallery--one--box--details">
                <CardContent>
                    <div className="bs-category-gallery--one--box--details--price">
                        <p className="bs-category-gallery--one--box--details--price--enabled" >${product.price.toLocaleString(undefined,{minimumFractionDigits:2})}</p>
                        <p className="bs-category-gallery--one--box--details--price--disabled">{(product.discount_price!== 0)?`$${product.price - product.discount_price}`:null}</p>
                    </div>
                    <h4 className="bs-category-gallery--one--box--details--h4"><Link to={`/product-item/${product.product_id}`}>{product.product_name}</Link></h4>
                    <small>Sold by: {(seller!==0)? (seller.seller_name!=='null' && seller.seller_name!=="")?seller.seller_name:seller.name:null}</small>
                    <div className="bs-category-gallery--one--box--details--stars">
                    <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar} className = "bs-category-gallery--one--box--details--stars--last"/>
                    </div>
                    
                </CardContent>
            </section>
        </Card>
    );
}

export default BestSellerCard;