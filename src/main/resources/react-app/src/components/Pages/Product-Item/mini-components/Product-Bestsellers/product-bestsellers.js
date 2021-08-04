import BestSellerCSS from './product-bestsellers.css';
import Images from '../../../../exportFiles/exportImages';
import { useEffect, useCallback, useState } from 'react';
import SolarSystemLoading from 'react-loadingg/lib/SolarSystemLoading';
import BestSellerCard from '../../../../mini-component/best-seller-card';
let images = new Images();
const ProductBestSellers = () => {
    const [products,setProducts] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bestSeller,setBestSeller] = useState(0);
    const getData = useCallback(async function getData(){
        const response = await fetch(`https://fakestoreapi.com/products`)
        .then(res=>res.json())
        .then(json=>json)
        setBestSeller(response[0])
        setIsLoaded(true);
    });
    useEffect(() => {
        let mounted = true;
        if(!isLoaded){
            getData();
        }
        return () => mounted = false;
    },[])
    return (
        <section className="items-right" style={BestSellerCSS}>
                    <div className="items-right-bestSeller">
                        {(bestSeller)? <div><h4 className="items-right-bestSeller-h4">BEST SELLER</h4>
                        <BestSellerCard id={bestSeller.id} itemName={bestSeller.title} price={bestSeller.price.toFixed(2)} image={bestSeller.image} hotornot={"hot"}/></div>: <SolarSystemLoading/>}
                    </div>
                    <div className="items-right-slides">
                        <div className="items-right-slides-button"></div>
                        <div className="items-right-slides-button"></div>
                        <div className="items-right-slides-button"></div>
                        <div className="items-right-slides-button"></div>
                    </div>
                    <div className="items-right-ads">
                        <h2 className="items-right-ads--h2">GoPro Hero 6</h2>
                        <p className="items-right-ads--p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="items-right-ads--price">$299</p>
                        <figure>
                        <img src={images.GoPro()} alt=""/>
                        </figure>
                    </div>
                </section>
    );
}
export default ProductBestSellers;