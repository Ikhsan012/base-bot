import axios from "axios";

export async function SearchSpotify(input) {
    try {
        let url = `https://api.ryzumi.vip/api/search/spotify?query=${input}`
        const respon = await axios.get(url)
        const data = respon.data.tracks
        return data
    } catch (error) {
        
    }
}