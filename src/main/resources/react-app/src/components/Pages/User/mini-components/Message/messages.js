import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextareaAutosize } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";
import './msgstyle.css';

import {BiSend} from 'react-icons/all';
import { useEffect, useState } from 'react';
import wsConnection from '../../../../../components/Messageshome/ws/wsConnection';
import messageType from '../../../../../components/Messageshome/ws/messageType';
import {getUserByRole} from '../../../../../fetchApi';

const Messages = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)

    const role = {
		CUS: "SLR",
		SLR: "CUS"
	}

    const [content, setContent] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [sendTo, setSendTo] = useState('');
	const [chatUsers, setChatUsers] = useState([]);
	const [myRole, setMyRole] = useState('');
   
    const callback = (data) => {
		setMsgs(data);
		setContent('');
	}

    useEffect(() => {
		const r = JSON.parse(localStorage.getItem('user')).details.role;
		setMyRole(r);
		getUserByRole(role[`${r}`]).then(resp => {
			setChatUsers(resp);
		})
	}, []);

	useEffect(() => {
		wsConnection.account=JSON.parse(localStorage.getItem('user')).details.name;
		wsConnection.callback=callback;
		if (!wsConnection.client) {
			if (localStorage.getItem('user')) {
				wsConnection.init();
			}
		}
	}, [])

    return (
        <ViewTemplate
        active="message"
       content={
           <div className="msg-con">
        <div className="msg-chatlist">
        {
				chatUsers.map((u,i) => {
					return(
                        <div className="msg-chatlist-names" key={u.id} onClick={() => {
                            if(wsConnection.client) {
                                wsConnection.onRefresh();
                            }
                            setSendTo(u.name)
                            }}>
						<p style={{'background':`${u.color}`}}>{u.name[0]}</p><span>{u.name}</span>
                        </div>
					)
				})
			}
        </div>
        <div className="msg-chatbox">
            {/* <h3>Receiver</h3> */}
            <div className="msg-text">
            {
						msgs.map((m,i)=> {
							if ((m.sender == wsConnection.account && m.receiver == sendTo) || (m.sender == sendTo && m.receiver == wsConnection.account)) {
                                if (m.sender == wsConnection.account) {
                                    return (<p className="sender" key={i}>{m.content} <span>{m.sender[0]}</span></p>)
                                }
								return (<p className="receiver" key={i}>{m.content} <span>{m.sender[0]}</span></p>)
							}
						}
						)
					}
            </div>
            <div className="msg-send">
            <TextareaAutosize onChange={(e) => setContent(e.target.value)}value={content} className="msg-send-input" minRows={2} maxRows={2} placeholder="Type something" />
                <div className="msg-send-btn"
                onClick={() => {
                    wsConnection.onMessageSend({
                        content,
                        sender: wsConnection.account,
                        receiver: sendTo,
                        type: messageType.CHAT,
                    })
                }}>
                    <p>Send</p> <BiSend/> </div>
            </div>
        </div>
        </div>
       }
        />

    )
}

export default Messages;