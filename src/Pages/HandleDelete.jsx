import axios from "axios";

const HandleDelete = async (userData, posid) => {
    try {
        const respo = await axios.delete(`https://cautious-sniffle.netlify.app/.netlify/functions/api/delete/${posid}`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
                , "deleteID": `Bearer ${posid}`
            }
        });
        return respo;
    } catch (error) {
        console.error('Error deleting post:', error);

        return error;
    }
};
export default HandleDelete;