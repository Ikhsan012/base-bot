import axios from "axios";


export async function GetQuoted(input) {
    try {
        let url = `https://api.ferdev.my.id/random/animequote?apikey=ikhsan-null`
        const respon = await axios.get(url)
        const data = respon.data.result[0]
        return data
        // console.log(data)
    } catch (error) {
        
    }
}