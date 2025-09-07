import { YTVidDL } from "../lib/scrape/yt.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(userjid, { text: `Contoh: ${config.prefix}ytmp4 <link>` }, { quoted: m });
    }
    await sock.sendMessage(userjid, { text: config.mess.wait }, { quoted: m });
    try {
        const result = await YTVidDL(args)
        let message = `Judul Video: ${result.title}
    Penyanyi: ${result.author}
    Ditonton Sebanyak: ${result.views} kali
    Durasi Video: ${result.lengthSeconds} detik
    Link Video: ${result.videoUrl}
    
    File Sedang Di Kirim........
    `
        await sock.sendMessage(userjid, {text : message}, {quoted: m})
        await sock.sendMessage(userjid, { video: { url: result.url }}, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }
}


handler.help = ['cekresi <resi, kurir>'];
handler.tags = ['tools'];
handler.command = ['ytmp4', 'ytdl'];
handler.limit = true;

export default handler