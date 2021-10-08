export const oAuthVerification = async (obj) => {
	const load = JSON.stringify(obj);
	const response = await fetch('https://localhost:5000/api/user/oauthenticate', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body:load
	});
	return response.json();
    }