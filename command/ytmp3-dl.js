import { GetMusicYT } from "../lib/scrape/ytmp3.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(userjid, { text: `Contoh: ${config.prefix}ytmp3 <link>` }, { quoted: m });
    }
    await sock.sendMessage(userjid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await GetMusicYT(args)
        // console.log(result)
        let message = `Judul Video: ${result.title}
        Penyanyi: ${result.author}
        Ditonton Sebanyak: ${result.views} kali
        Durasi Video: ${result.lengthSeconds} detik
        Link Video: ${result.videoUrl}
        
        File Sedang Di Kirim........
    `
        await sock.sendMessage(userjid, {text : message}, {quoted: m})
        await sock.sendMessage(userjid, { audio: { url: result.url }, mimetype: 'audio/mp4' }, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }
}


handler.help = ['cekresi <resi, kurir>'];
handler.tags = ['tools'];
handler.command = ['ytmp3', 'mp3'];
handler.limit = true;

export default handler