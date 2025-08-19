import axios from "axios";

export async function GetCuaca(input) {
    try {
        let url = `https://api.ferdev.my.id/search/cuaca?kota=${input}&apikey=ikhsan-null`
        const respon = await axios.get(url)
        const data = respon.data.data
        return data
    } catch (error) {
        console.error(error.message)
    }
}