const initialState = false;

const User = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            state = action.payload.user;
            return {...state, login: true}
        default:
            return state;
    }
}

export default User;