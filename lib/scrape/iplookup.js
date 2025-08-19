import axios from "axios";

export async function IpLookUP(input) {
    try {
        let url = `https://api.ryzumi.vip/api/tool/iplocation?ip=${input}`
        const respon = await axios.get(url)
        const data = respon.data.ipInfo
        return data
    } catch (error) {
        console.error(error.message)
    }
}