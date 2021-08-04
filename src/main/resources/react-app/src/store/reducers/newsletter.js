const newsletter = (state = 0, action) => {
    switch(action.type){
        case 'SET_NEWSLETTER':
            state = 1;
            return state;
        default:
            return state;
    }
}

export default newsletter;