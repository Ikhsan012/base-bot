import axios from "axios";

export async function GetMusicYT(input) {
    try {
        let url = `https://api.ryzumi.vip/api/downloader/ytmp3?url=${input}`
        const respon = await axios.get(url)
        const data = respon.data
        console.log(data)
        return data
    } catch (error) {
        console.error(error.message)
    }
}