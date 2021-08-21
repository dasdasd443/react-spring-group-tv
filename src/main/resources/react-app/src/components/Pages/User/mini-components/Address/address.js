import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";

const Address = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    return (
        <ViewTemplate
        active="address"
        content={
            <Card>
                asdasd
            </Card>
        }
        />
    )
}

export default Address;