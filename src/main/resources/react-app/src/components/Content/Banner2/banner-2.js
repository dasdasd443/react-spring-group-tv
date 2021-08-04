import Banner2CSS from './banner-2.css';
import Image from '../../exportFiles/exportImages';
let images = new Image();
const Banner2 = () => {
    return (
        <div className="banner-2" style={Banner2CSS}>
            <section className="banner-2__flag">
                <section className="banner-2__flag__text">
                    <span>iPhone 6 Plus</span>
                    <span>Performance and design. Taken right to the edge.</span>
                    <a href="#">SHOP NOW</a>
                </section>
                <section className="banner-2__flag__pic">
                    <img src={images.iPhone()} alt=""/>
                </section>
            </section>
        </div>
    )
}

export default Banner2;