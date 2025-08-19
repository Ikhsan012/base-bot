import axios from "axios";

export async function GetFdroid(input) {

    try {
        let url = `https://api.ferdev.my.id/search/fdroid?query=${input}&apikey=ikhsan-null`
        const respon = await axios.get(url)
        const data = respon.data.result
        return data  
    } catch (error) {
        console.error(error.message)
    }
    }