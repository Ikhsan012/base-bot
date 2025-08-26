import axios from "axios";

export async function GetGD(input) {
    try {
        let url = `https://api.ryzumi.vip/api/downloader/gdrive?url=${encodeURIComponent(input)}`
        const respon = await axios.get(url)
        const data = respon.data
        // console.log(respon)
        return data
    } catch (error) {
        console.error(error.message)
    }
    
}