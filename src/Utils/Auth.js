/* Auth Token */
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

/* Auth NiverPermissao */
export const setUserNivelPermissao = (level) => localStorage.setItem("UserNivelPermissao", level);
export const getUserNivelPermissao = () => Number(localStorage.getItem("UserNivelPermissao"));
export const removeUserNivelPermissao = () => localStorage.removeItem("UserNivelPermissao");