export const userLogin = (user) => {
    return {
        type: 'LOGIN_USER',
        payload:{
            user
        }
    }
}