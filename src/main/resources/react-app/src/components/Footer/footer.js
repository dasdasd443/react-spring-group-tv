import Image from '../exportFiles/exportImages';
import FooterCSS from './footer.css';
let images = new Image();
const Footer = () =>{
    return (
        <footer className="foot" style={FooterCSS}>
        <hr/>
        <div className="container">
        <section className="foot-sec1">
            <div className="foot-sec1-rakuinfo">
                <h3 className="foot-sec1-rakuinfo-h3">RAKUTECH</h3>
                <p className="foot-sec1-rakuinfo-p">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore et voluptatum natus provident explicabo inventore,
                    incidunt sapiente temporibus eius atque! Corporis excepturi
                    nihil minima mollitia! Eveniet pariatur vitae ipsum earum!</p>
            </div>
            <div className="foot-sec1-follow">
                <h5 className="foot-sec1-follow-h5">Follow Us</h5>
                <p className="foot-sec1-follow-p">Since the 1500s, when an unknown printer took a gallery of type and scrambled.</p>
                <div className="foot-sec1-fticons">
                    <i className="fab fa-facebook-f foot-sec1-fticons-fb"></i>
                    <i className="fab fa-twitter foot-sec1-fticons-twit"></i>
                </div>
            </div>
            <div className="foot-sec1-contact">
                <h5 className="foot-sec1-contact-h5">Contact Us</h5>
                <p className="foot-sec1-contact-p">My company, 4578 Marmora Road, Glasgow
                   <span>D04 89GR</span> 
                   <span> Call us now: 0123-456-789</span>
                   <span>Email:support@whatever.com</span> 
                </p>
            </div>
        </section>
        <hr/>
    </div>
        <div className="container">
        <section className="foot-sec2">
            <div className="foot-sec2-information">
                <h5>Information</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="foot-sec2-services">
                <h5>Services</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="foot-sec2-extras">
                <h5>Extras</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="foot-sec2-myaccount">
                <h5>My Account</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="foot-sec2-usefullinks">
                <h5>Useful Links</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="foot-sec2-ouroffers">
                <h5>Our Offers</h5>
                <p>About Us</p>
                <p>Information</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>  
        </section>
    </div>
        <hr/>
        <div className="container">
        <section className="foot-sec3">
        <span className="foot-sec3-copyright">© 2018 Ecommerce theme by www.bisenbaev.com</span>
        <figure className="foot-sec3-paymentIcon">
        <img src={images.WesternUnionLogo()} alt="" />
        <img src={images.MasterCardLogo()} alt="" />
        <img src={images.PaypalLogo()} alt="" />
        <img src={images.VisaLogo()} alt="" />
        </figure>
        </section>
        </div>  
    </footer>
    );
}

export default Footer;