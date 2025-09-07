import { ytsummarizer } from "../lib/scrape/yt-sumarizer-api.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    try {
        if (!args[0]) throw new Error("Kasih link YouTube dong 🙂")
        const result = await ytsummarizer(args) 
        console.log(result)
        // kalau mau kirim balik ke user
        await sock.sendMessage(userjid, { text: JSON.stringify(result, null, 2) })
    } catch (error) {
        console.error(error.message)
        await sock.sendMessage(userjid, { text: "❌ " + error.message })
    }
}


handler.help = ['ytz <teks>'];
handler.tags = ['ytz'];
handler.command = ['ytz', 'ytsummarizer'];
handler.limit = true;

export default handler;