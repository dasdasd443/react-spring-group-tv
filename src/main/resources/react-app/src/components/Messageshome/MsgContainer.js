import { useState } from 'react';
import MessageBox from './messagebox';
import MessagesBtn from './messagesbtn';

const MsgContainer = () =>{

	const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

	const toggleMessageBox = () => {
		setIsMessageBoxOpen(!isMessageBoxOpen);
	}

	return(
		<>
		{isMessageBoxOpen && <MessageBox {...isMessageBoxOpen} onClick={toggleMessageBox}/>}
		{!isMessageBoxOpen && <MessagesBtn onClick={toggleMessageBox}/>}
		</>
	)
}
export default MsgContainer;