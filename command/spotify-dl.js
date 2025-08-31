import { SpotifyDl } from "../lib/scrape/spotify-dl.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}dlspo <link spotify> ` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await SpotifyDl(args)
        let message = `Lagu Ditemukan!

🎶 Judul: *${result.metadata.title}*
🎤 Artis: *${result.metadata.artists}*
💿 Album: *${result.metadata.album}*
🗓️ Rilis: *${result.metadata.releaseDate}*

File Sedang Di Kirim`
        await sock.sendMessage(userjid, { text: message }, { quoted: m })
        await sock.sendMessage(
    userjid, 
    {
        audio: {
            url: result.link
        },
        mimetype: 'audio/mp4'
    }
)
    } catch (error) {
        console.error(error.message)
    }
    
}

handler.help = ['dlspo'];
handler.tags = ['tools'];
handler.command = ['dlspo', 'spotifydl'];
handler.limit = false;

export default handler