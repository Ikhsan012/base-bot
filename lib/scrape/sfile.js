import axios from "axios";

export async function GetSfile(input) {
    let url = `https://api.ferdev.my.id/search/sfile?query=${input}apikey=ikhsan-null`
    const respon = await axios.get(url)
    const data = respon.data.result
    return respon
}