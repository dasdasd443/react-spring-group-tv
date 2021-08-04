import LoginCSS from './login.css';
import Image from '../../exportFiles/exportImages';
import {Link} from 'react-router-dom';
import { useCallback } from 'react';
import Header from '../../Header/header';
let images = new Image();
const Login = () => {
    const LoginUser = useCallback(async function LoginUser(e){
        e.preventDefault();
        document.querySelectorAll(".error").forEach((elem,index) => {
            elem.innerText = " ";
        });
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        const response = await fetch('http://localhost:5000/api/user/login', {
            mode:'cors',
            method:'POST',
            headers: new Headers({
                'content-type':'application/json',
            }),
            body: JSON.stringify({
                email,
                password,
                username:"blahblah"
            })
        }).then(res => res.text());
        
        console.log(response);
    })

    const Background = {
        backgroundImage: `url(${images.Background()})`
    }
    return (
        <section style={LoginCSS}>
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
                            <h1>Sign In</h1>
                            <button><i><img src={images.AppleLogo()} alt=""/></i><span>Sign in with apple</span></button>
                            <button><i><img src={images.FacebookLogo()} alt=""/></i><span>Sign in with facebook</span></button>
                            
                            <section className="separator">
                                <hr/>
                                <span>OR</span>
                            </section>
                            <section className="login__form">
                                <form action="">
                                    <div className="input-group">
                                        <label htmlFor="email">Email <span id="email-error" className='error'></span></label>
                                        <input type="text" id="email"/>
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="password">Password <span id="password-error" className='error'></span></label>
                                        <input type="password" id='password'/>
                                    </div>
                                    <input type="submit" value="SIGN IN" onClick={LoginUser}/>
                                </form>
                                <span className='terms'>
                                    By continuing, you agree to accept our Privacy Policy & Terms of Service.
                                </span>
                                <span className='signup'>Don't have an account? <Link to="/signup">Create a new account</Link></span>
                            </section>
                        </section>
                    </section>
                </section>
        </section>
    );
}

export default Login;