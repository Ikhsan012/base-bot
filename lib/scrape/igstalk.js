import axios from "axios";

export async function GetIg(input) {
    let url = `https://api.ferdev.my.id/stalker/instagram?username=${input}&apikey=ikhsan-null`
    const respon = await axios.get(url)
    const data = respon.data
    return data
}