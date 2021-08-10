import SignupCSS from './signup.css';
import {Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import Images from '../../exportFiles/exportImages';
import { useCallback, useState } from 'react';
let images = new Images();

const Signup = () => {
    const [loggedUser,setLoggedUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).detail :false);
    const ShowPassword = useCallback(() => {
        let password = document.querySelector("#password");
        let icon = document.querySelector("i");
        if(password.type === "password"){
            password.type = "text";
            icon.className = "fas fa-eye-slash show-password";
        }else if(password.type === "text"){
            password.type = "password";
            icon.className = "fas fa-eye show-password";
        }
    })

    const SignupUser = useCallback(async function SignupUser(e) {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const name = document.querySelector("#fullname").value;
        const seller = document.querySelector("#seller").checked;
        const response = await fetch('http://localhost:5000/api/user/register/',
            {mode:'cors',
            method:'POST',
            headers: new Headers({'content-type':'application/json'}),
            body: JSON.stringify({
                name,
                email,
                password,
                username: " ",
                billing_address: " ",
                shipping_address: " ",
                role: (seller)? "SLR": "CUS",
                phone: " "
            })
            }
        ).then(res => res.json())
        .then(res => {
            if(res!==null){
                localStorage.setItem('user', JSON.stringify({
                    login:true,
                    token: res.token,
                    details: res.user
                }))
                setLoggedUser({
                    login:true,
                    token: res.token,
                    details: res.user
                })
            }
        });
    });

    const Background = {
        backgroundImage: `url(${images.Background()})`
    }
    return (
        <section style={SignupCSS}>
            {(loggedUser)? <Redirect to="/"/>: null}
            <section className="login-container--background"></section>
            <section className="container-background" style={Background}>
            </section>
            <section className="login-container">
                <section className="login-container--text">
                    <section className="login-container--text__text-container">
                        <Link to="/">
                            <section className="login-container--text__text-container--title">
                                <h1>RAKU</h1>
                                <h1>TECH</h1>
                            </section>
                        </Link>
                        <h1>Browse from over 500 devices in your area</h1>
                    </section>
                </section>
                <section className="login-container__login">
                    <section className="login-container__login--card">
                        <section className='arrow-container'>
                            <i className="fas fa-arrow-left backarrow"></i>
                        </section>
                        <h1>Sign Up</h1>
                        <span className='existing-account--text'>Already have an account? <Link to="/login">Log in</Link></span>
                        <section className="login__form">
                            <form action="">
                                <div className="input-group">
                                    <label htmlFor="fullname">Full Name <span id="fullname-error" className='error'></span></label>
                                    <input type="text" id="fullname" required/>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email <span id="email-error" className='error'></span></label>
                                    <input type="text" id="email" required className='error'/>
                                    
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password <span id="password-error" className='error'></span></label>
                                    <input type="password" id='password' placeholder="Must be at least 6 characters" required className='error'/>
                                    <FontAwesomeIcon icon={faEye} className= "show-password" onClick={ShowPassword}/>
                                        
                                </div>
                                <div className='input-group'>
                                    <input type="checkbox" id="seller"/>
                                    <label htmlFor="seller">Signup as Seller</label>
                                </div>
                                <div className='input-group'>
                                    <input type="checkbox" id="updates"/>
                                    <label htmlFor="updates">Signup for email updates</label>
                                </div>
                                <input type="submit" value="SIGN UP" onClick={SignupUser}/>
                                
                            </form>
                            <span className='terms'>
                                By continuing, you agree to accept our Privacy Policy & Terms of Service.
                            </span>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Signup;