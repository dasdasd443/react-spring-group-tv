import Title from "../../../../Header/Title/title"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import UserMenu from "../Menu/user-menu"
import TempProfile from '../../../../../assets/temp_profile_picture.png';
import './user-info.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    return (
        <section>
            {(user === false)? <Redirect to="/login"/>:null}
            <div className="content-header">
                <div><span>RAKU</span><span style={{color: "#FD2E2E"}}>TECH</span><span> {(user.role==='SLR')?"SELLER":(user.role==='ADM')?"ADMIN":"USER"}</span></div>
                <div className="content-header__icons">
                    <div><FontAwesomeIcon icon={faSearch}/></div>
                    <div><FontAwesomeIcon icon={faBell}/></div>
                    <div><FontAwesomeIcon icon={faUser}/></div>
                </div>
            </div>
            <div className="content-container">
                <UserMenu user={user} active="account"/> 
            </div>
        </section>
    )
}

export default UserInfo;