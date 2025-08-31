import { YtSearch } from "../lib/scrape/ytsearch.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}ytsearch <judul>` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let message = `Ini Hasil Pencarian Dari Video ${args}\n\n`
        const result = await YtSearch(args)
        result.videos.forEach(data => {
            message += `Nama : ${data.title}\n`
            message += `Penonton : ${data.views}\n`
            message += `Durasi : ${data.duration.timestamp}\n`
            message += `Link : ${data.url}\n\n`
        });
        console.log(message)
        await sock.sendMessage(userjid, { text: message }, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }

}

handler.help = ['spotify'];
handler.tags = ['tools'];
handler.command = ['yt', 'ytsearch'];
handler.limit = false;

export default handler