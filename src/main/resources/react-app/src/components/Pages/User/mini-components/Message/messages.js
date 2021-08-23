import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextareaAutosize } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";
import './msgstyle.css';
import {BiSend} from 'react-icons/all';

const Messages = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    return (
        <ViewTemplate
        active="message"
       content={
           <div className="msg-con">
        <div className="msg-chatlist">
            
        </div>
        <div className="msg-chatbox">
            <h3>Receiver</h3>
            <div className="msg-text">
                
            </div>
            <div className="msg-send">
            <TextareaAutosize className="msg-send-input" minRows={2} maxRows={2} placeholder="Type something" />
                <p className="msg-send-btn">Send <BiSend/> </p>
            </div>
        </div>
        </div>
       }
        />

    )
}

export default Messages;