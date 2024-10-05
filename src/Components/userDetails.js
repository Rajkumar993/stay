import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const userDetails = async () => {
    try {
        const cookieValue = await Cookies.get("stayyoung");
        if (cookieValue) {
            const decodedValue = await JSON.parse(cookieValue);
            const decodedAuth = await jwtDecode(decodedValue.auth);
            return await decodedValue
        }
        return null;
    } catch (error) {
        return null;
    }
};

export default userDetails;