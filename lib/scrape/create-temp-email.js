import axios from "axios";

export async function CreateTemp(input) {
    try {
        let url = `https://api.ferdev.my.id/internet/tempmail?apikey=ikhsan-null`
        const respon = await axios.get(url)
        const data = respon.data.data
        return data
    } catch (error) {
        console.error(error.message)
    }
}