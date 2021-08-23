import './messageshome.css';
import {TiMessages} from 'react-icons/all'

const MessagesBtn = ({onClick}) =>{

	return(
		<div onClick={onClick} className="m-btn"><TiMessages/> Messages</div>
	)
}
export default MessagesBtn;