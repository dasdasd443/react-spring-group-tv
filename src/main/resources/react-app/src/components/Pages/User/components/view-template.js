import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import UserMenu from "../mini-components/Menu/user-menu";


const ViewTemplate = ({content,active}) => {
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
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={4}>
                        <UserMenu user={user} active={active}/> 
                    </Grid>
                    <Grid item xs={12} sm={9} md={8}>
                        {content}
                    </Grid>
                </Grid>
            </div>
        </section>
    )
}

export default ViewTemplate;