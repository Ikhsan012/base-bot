// import { teapot } from "@hapi/boom";
import { SearchSpotify } from "../lib/scrape/spotify-search.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}sposearch <judul lagu> ` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await SearchSpotify(args)
        let message = `Berikut Pencarian lagu Dari ${args}\n\n`
        result.forEach(data => {
            message += `Judul : ${data.name}\n`
            message += `Artis : ${data.artists}\n`
            message += `Nama Album : ${data.album.name}\n`
            message += `Release Date : ${data.album.release_date}\n`
            message += `Link Lagu : ${data.url}\n\n`

        });
        await sock.sendMessage(userjid, { text: message }, { quoted: m })
        console.log(message)
    } catch (error) {
        console.error(error.message)
    }
    
}

handler.help = ['spotify'];
handler.tags = ['tools'];
handler.command = ['spo', 'sposearch'];
handler.limit = false;

export default handler