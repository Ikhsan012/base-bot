import axios from "axios";

export async function GetCoding(input) {
    try {
        let url = `https://api.ferdev.my.id/ai/aicoding?prompt=${input}&apikey=ikhsan-null`
        const response = await axios.get(url)
        const data = response.data.message
        console.log(data)
        return data
    } catch (error) {
        console.error(error.message)
    }
}