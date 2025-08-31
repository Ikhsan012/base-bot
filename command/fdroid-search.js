import { GetFdroid } from "../lib/scrape/fdroid-search.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}fdroid termux` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await GetFdroid(args)
        let message = `Berikut Hasil Pencarian Dari Fdroid ${args}`
        result.forEach(data => {
            message += `Nama : ${data.name}\n`
            message += `Tentang : ${data.summary}\n`
            message += `Link Download : ${data.link}\n\n`
        });

        await sock.sendMessage(userjid, {text: message}, {quoted: m})
    
    } catch (error) {
        console.error(error.message)
    }

}

handler.help = ['fdroid <link>'];
handler.tags = ['tools'];
handler.command = ['fdroid', 'fd'];
handler.limit = true;

export default handler