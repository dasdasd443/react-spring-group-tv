import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";

const Payments = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    return (
        <ViewTemplate
        active={"payments"}
        content={
            <Card>
                {(user.role!=="ADM" && user.role!=="SLR")?<Redirect to="/user/user"/>:null}
                asdasd
            </Card>
        }
        />
    )
}

export default Payments;