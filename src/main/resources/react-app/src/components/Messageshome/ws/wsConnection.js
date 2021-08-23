import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import messageType from './messageType';

const wsConnection = {
	account: null,
	client: null,
	broker: `http://localhost:9001/ws`,
	callback: null,
	init: function() {
		wsConnection.client = Stomp.over(new SockJS(wsConnection.broker));
		wsConnection.client.heartbeat.outgoing = 20000;
		wsConnection.client.reconnect_delay = 100;
		wsConnection.client.connect({}, wsConnection.onConnect, wsConnection.onError);
	},
	onConnect: () => {
		wsConnection.client.subscribe('/topic/public', wsConnection.onMessageReceived);
		wsConnection.client.send('/app/chat.newUser', {}, JSON.stringify({
			sender: wsConnection.account,
			type: messageType.CONNECT
		}));
	},
	onMessageReceived: (payload) => {
		const message = JSON.parse(payload.body);

		if (message.type === messageType.CONNECT) {
			console.log(message.sender + " is connected");
		}

		if (message.constructor === Array) {
			if(wsConnection.callback) {
				wsConnection.callback(message);
			}
		}

		if (message.type === messageType.DISCONNECT) {
			console.log(message.sender + " is disconnected");
		}
	},
	onMessageSend: (payload) => {
		wsConnection.client.send("/app/chat.send", {}, JSON.stringify(payload));
	},
	onRefresh: () => {
		wsConnection.client.send("/app/chat.refresh");
	},
	onError: () => {
		console.log("ERROR");
	}
}

export default wsConnection;