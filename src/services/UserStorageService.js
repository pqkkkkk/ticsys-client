export const GetUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}
export const RemoveUserSession = () => {
    sessionStorage.removeItem('user');
}
export const setUserSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}
export const setToken = (token) =>{
    sessionStorage.setItem('token',JSON.stringify(token));
}