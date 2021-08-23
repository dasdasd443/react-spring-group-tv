import './messageshome.css';
import {FaWindowMinimize, RiSendPlane2Fill} from 'react-icons/all'
import { TextareaAutosize } from '@material-ui/core';
import { useEffect, useState } from 'react';
import wsConnection from './ws/wsConnection';
import messageType from './ws/messageType';
import {getUserByRole} from '../../fetchApi';

const MessageBox = ({onClick, isMessageBoxOpen}) =>{

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
		if(wsConnection.client) {
			wsConnection.onRefresh();
		}
	}, [sendTo])

	useEffect(() => {
		wsConnection.account=JSON.parse(localStorage.getItem('user')).details.name;
		wsConnection.callback=callback;
		if (!wsConnection.client) {
			if (localStorage.getItem('user')) {
				wsConnection.init();
			}
		}
	}, [isMessageBoxOpen])
	return(
		<div  className="mb-con">
			<div className="mb-ol">
			<h3>{myRole == role.CUS ? "Sellers" : "Customers"}</h3>
			{
				chatUsers.map((u,i) => {
					return(
						<p key={u.id} onClick={() => setSendTo(u.name)}>{u.name}</p>
					)
				})
			}
			</div>
			<div className="mb-chat">
				<div className="mb-head">
				<h3>Messages</h3>
				<FaWindowMinimize onClick={onClick}/>
				</div>
				<div className="mb-text">
					{
						msgs.map((m,i)=> {
							if ((m.sender == wsConnection.account && m.receiver == sendTo) || (m.sender == sendTo && m.receiver == wsConnection.account)) {
								return (<p key={i}>{m.sender}: {m.content}</p>)
							}
						}
						)
					}
				</div>
				<div className="mb-send">
					<TextareaAutosize onChange={(e) => setContent(e.target.value)}value={content} className="mb-input" minRows={2} maxRows={2} placeholder="Type something" />
					<RiSendPlane2Fill onClick={() => {
						wsConnection.onMessageSend({
							content,
							sender: wsConnection.account,
							receiver: sendTo,
							type: messageType.CHAT,
						})
					}}/>
				</div>
			</div>
		</div>
	) 
}
export default MessageBox;