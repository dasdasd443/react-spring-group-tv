import CategoriesCSS from './categories.css';
import {faDollarSign, faShippingFast, faHeadset} from '@fortawesome/free-solid-svg-icons';
import FeaturedProduct from '../../mini-component/featured-product';
import LatestNews from '../../mini-component/latest-news';
import FreeFundBox from '../../mini-component/free-fund-box';
import Image from '../../exportFiles/exportImages';
let images = new Image();

const Categories = () => {
    return (
        <section className="others-category" style={CategoriesCSS}>
            <div className="others-category-freefundsupport">
                <FreeFundBox icon={faShippingFast} text = "FREE SHIPPING"/>
                <FreeFundBox icon={faDollarSign} text = "100% REFUND"/>
                <FreeFundBox icon={faHeadset} text = "SUPPORT 24/7"/>
            </div>
            <div className="others-category-latestnews">
                <h2 className="others-category-latestnews-h2">LATEST NEWS</h2>
                <div className="others-category-latestnews--boxes">
                    <LatestNews image={images.SmartPhoneCard()}/>
                    <LatestNews image={images.LaptopLatestNews()}/>
                    <LatestNews image={images.PhoneLatestNews()}/>
                </div>
            </div>
            <div className="others-category-latestnews">
                <h2 className="others-category-latestnews-h2">FEATURED PRODUCTS</h2>
                <div className="others-category-latestnews--boxes">
                    <FeaturedProduct image={images.BeatsSoloBlack1()} product_name="Beats Solo 2 On Ear Headphones-Black"/>
                    <FeaturedProduct image={images.HvTray()} product_name="H-Squared tvTray"/>
                    <FeaturedProduct image={images.RainGauge()} product_name="Netatmo Rain Gauge"/>
                </div>
            </div>
            <div className="input-search">
                <input type="text" placeholder="Search query" className="input-search--inputs"/><button className="input-search--butn">Search</button>
            </div>
        </section>
    );
}

export default Categories;