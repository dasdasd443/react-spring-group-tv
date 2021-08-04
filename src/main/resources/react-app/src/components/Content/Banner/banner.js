import BannerCSS from './banner.css';
import Images from '../../exportFiles/exportImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGreaterThan, faLessThan} from '@fortawesome/free-solid-svg-icons';

let images = new Images();

const Banner = () => {
    return (
        <section className="banner" style={BannerCSS}>
        <section className="banner__flag">
            <FontAwesomeIcon icon={faLessThan} className="banner__flag--nav-icon"/>
            <section className="flag__text">
                <h1>iPhone X</h1>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</span>
                <a href="#">MORE</a>
            </section>
            <section className="flag__pic">
                <img src={images.MaskGroup1()} alt=""/>
            </section>
            <FontAwesomeIcon icon={faGreaterThan} className="banner__flag--nav-icon"/>
        </section>
        <section className="banner__mini">
            <section className="item-1">
                <section className="item-1__text">
                    <h1>
                        iPhone 6
                    </h1>
                    <span>
                        Lorem Ipsum dolor sit amet, consectetur adipiscing elit, labor
                    </span>
                    <h1>
                        $399
                    </h1>
                </section>
                <section className="item-1__pic">
                    <img src={images.iPhone()} alt=""/>
                </section>
            </section>
            <section className="item-2">
                <section className="item-2__pic">
                    <img src={images.OcculusRift()} alt=""/>
                </section>
                <section className="item-2__text">
                    <h1>Occulus Rift</h1>
                    <h1>
                        $349
                    </h1>
                </section>
            </section>
            <section className="item-3">
                <section className="item-3__text">
                    <h1>GoPro Hero 6</h1>
                    <span>
                        Lorem Ipsum dolor sit amet, consectetur adipiscing elit, labor
                    </span>
                    <h1>
                        $299
                    </h1>
                </section>
                <section className="item-3__pic">
                    <img src={images.GoPro()} alt=""/>
                </section>
            </section>
        </section>
    </section>
    );

}

export default Banner;