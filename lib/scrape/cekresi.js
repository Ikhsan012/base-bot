import axios from "axios";

export async function GetResi(input, resi) {
    try {
        let url = `https://api.ryzumi.vip/api/tool/cek-resi?resi=${input}&ekspedisi=${resi}`
        const respon = await axios.get(url)
        const data = respon.data.data
        return data
    } catch (error) {
        console.error(error.message)
    }

}

