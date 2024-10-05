import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const userId = async () => {
    try {
        const cookieValue = await Cookies.get("stayyoung");
        if (cookieValue) {
            const decodedValue = await JSON.parse(cookieValue);
            const decodedAuth = await jwtDecode(decodedValue.auth);
            return await parseInt(decodedAuth.user_id)
        }
        return null;
    } catch (error) {
        return null;
    }
};




export default userId;