import axios from "axios";

export async function SpotifyDl(input) {
    try {
        let url = `https://api.ryzumi.vip/api/downloader/spotify?url=${input}`
        const respon = await axios.get(url)
        const data = respon.data
        return data
    } catch (error) {
        console.error(error.message)
    }
}