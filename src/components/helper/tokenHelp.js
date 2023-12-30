import { setToken } from "../../store/slices/userSlice";
export const getAccessTokenLocal = () => {
    const token = localStorage.getItem("accessToken");
    return token ? token : null
}
export const getRefreshTokenLocal = () => {
    const token = localStorage.getItem("refreshToken");
    return token ? token : null
}
export const getTypeTokenLocal = () => {
    const token = localStorage.getItem("typeToken");
    return token ? token : null
}
export const saveTokenUserLocal = (data) => {
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("typeToken", data.token_type);
}
export const handleRefreshToken = async (getNewToken, dispatch) => {
    const response = await getNewToken()
    console.log(response);
    dispatch(setToken({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        typeToken: response.token_type,
      }))
    return
}