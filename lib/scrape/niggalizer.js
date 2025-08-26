import axios from "axios";

export async function Nigga(gambar) {
    try {
        let url = `https://api.ryzumi.vip/api/ai/negro?url=${gambar}&filter=hitam`
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data);
    } catch (error) {
        console.error(error.message)
    }
}