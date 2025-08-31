import axios from "axios";

export async function YtSearch(input) {
    try {
        let url = `https://api.ryzumi.vip/api/search/yt?query=${input}`
        const respon = await axios.get(url)
        const data = respon.data
        return data
    } catch (error) {
        console.error(error.message)
    }
}