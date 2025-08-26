import axios from "axios";

export async function Hdgambar(gambar) {
    // console.log(gambar)
    try {
        const apiUrl = `https://api.ryzumi.vip/api/ai/remini?url=${gambar}`; 
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer'
        });

        return Buffer.from(response.data);

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return null;
    }
}