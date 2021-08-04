import NewsLetterCSS from './newsletter.css';
import Image from '../../exportFiles/exportImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {useCallback, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {setNewsletter} from '../../../store/action/newsletter-action';
let images = new Image(); 

const Newsletter = () => {
    const dispatch = useDispatch();
    const newsletterdisplay = useCallback(()=>{
        dispatch(setNewsletter())
    });
    const close = useCallback(() => {
        let newsletter = document.querySelector(".newsletter").style;
        newsletter.display = "none";
        newsletterdisplay();
   })
    return (
        <section className="newsletter" style={NewsLetterCSS}>
            <section className="newsletter__background">
            </section>
            <section className="newsletter__popup">
                <button className="close" onClick={close}><FontAwesomeIcon icon={faTimes} className='closeIcon'/></button>
                <section className="newsletter__popup--content">
                    <h1>Newsletter</h1>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </span>
                    <form action="">
                        <input type="text" placeholder="Email" name="email" id="email"/>
                        <button>Subscribe</button>
                    </form>
                    <form action="" id='checkbox-form'>
                        <input type="checkbox" name="dontclick" id="dontclick"/>
                        <label htmlFor="dontclick">Don't show this popup again</label>
                    </form>
                </section>
                <section className="newsletter__popup--img">
                    <img src={images.NewsLetter()} alt=""/>
                </section>
            </section>
        </section>
    );
}

export default Newsletter;