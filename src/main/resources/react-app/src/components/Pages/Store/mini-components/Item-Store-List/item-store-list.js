import Images from '../../../../exportFiles/exportImages';
import Item from '../Item/item';
import {useSelector,useDispatch} from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import {setInitialProducts} from '../../../../../store/action/store-actions';
import {SolarSystemLoading} from 'react-loadingg';
import './item-store-list.css';
let images = new Images();
const ItemStoreList = () => {
    const productList = useSelector(state => state.productList);
    const [productListElements,setproductListElements] = useState((productList)? productList.map(item => {
        return <Item key={item.id} description={item.description} itemName={item.itemName || item.title} image={item.image} price={item.price.toFixed(2)} id={item.id}/>
    }): ''); 
    const [isLoaded, setisLoaded] = useState(useSelector(state => state.productList));
    const [products,setProducts] = useState(useSelector(state => state.productList));
    const dispatch = useDispatch();
    const getData = useCallback( async function getData(){
        const response = await fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>json);
        setProducts(response);
        return response;
    });
    useEffect( () => {
        if(!isLoaded){
            getData();
            if(products){
                setisLoaded(true);
                setProducts(products);
                dispatch(setInitialProducts(products));
                setproductListElements(products.map(item => {
                    return <Item key={item.id} description={item.description} itemName={item.itemName || item.title} image={item.image} price={item.price.toFixed(2)} id={item.id}/>
                }));
            }
        }
    });
    
    return (
        <section className="items-container">
            <section className="banner-3">
                <section className="banner-3__text">
                    <h1>iPhone 8</h1>
                    <span>Performance and design. Taken right to the edge</span>
                    <a href="">SHOP NOW</a>
                </section>
                <section className="banner-3__pic">
                    <img src={images.iPhone()} alt=""/>
                </section>
            </section>
            <div className="items-container-menusettings">
                <div className="items-container-menusettings--left">
                    <span className="items-container-menusettings--left--items">13 items</span>
                    <label htmlFor="" className="items-container-menusettings--left--sort">Sort By</label>
                    <select name="" id="" className="items-container-menusettings--left--selectNames">
                        <option value="">Name</option>
                    </select>
                    <label htmlFor="" className="items-container-menusettings--left--show">Show</label>
                    <select name="" id="" className="items-container-menusettings--left--number">
                        <option value="">12</option>
                    </select>
                </div>
                <div className="items-container-menusettings--icons">
                    <i className="fas fa-list-ul"></i>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <div className="items-container-menus">
                {(products)? productListElements: <SolarSystemLoading/>}
            </div>

            <div className="items-container-menuNumbers">
                <a href="">1</a>
                <a href="">2</a>
                <a href="">3</a>
                <a href="">4</a>
                <a href="">5</a>
            </div>
        </section>
    );
}

export default ItemStoreList;