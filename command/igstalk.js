import { GetIg } from "../lib/scrape/igstalk.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        const result = await GetIg(args)
        console.log(result)
        const Verifedstatus = result.data.verified ? 'Akun Terverifikasi' : 'Akun Tidak Terverifikasi'
        let message = `IGSTALK

Nama : ${result.data.name}
Folowers : ${result.data.followers}
Username : ${result.data.username}
Bio : ${result.data.bio}
Post : ${result.data.posts}
Verifed : ${Verifedstatus}`
        await sock.sendMessage(userjid, {image: {url: result.data.profile_pic}, caption: message})
    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['ig <teks>'];
handler.tags = ['ig'];
handler.command = ['igstalk', 'ig'];
handler.limit = true;

export default handler;