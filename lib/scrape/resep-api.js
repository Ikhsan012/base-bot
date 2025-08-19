import axios from "axios";

export async function GetResep(input) {
    try {
        let url = `https://api.ferdev.my.id/search/resep?query=${input}&apikey=ikhsan-null`
        let respon = await axios.get(url)
        const data = respon.data.result
        return data
    } catch (error) {
        console.error(error.message)
    }
}