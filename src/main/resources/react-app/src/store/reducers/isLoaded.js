const isLoaded = (state = false, action) => {
    switch(action.type){
        case 'SET_TRUE':
            state = true;
            return state;
        default:
            return state;
    }
}

export default isLoaded;