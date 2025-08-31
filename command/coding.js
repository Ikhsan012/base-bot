import { GetCoding } from "../lib/scrape/aicoding.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(userjid, { text: `Contoh: ${config.prefix}coding halo, apa itu html?` }, { quoted: m });
    }
    await sock.sendMessage(userjid, { text: config.mess.wait }, { quoted: m });

    try {
        // console.log(args)
        const input = args
        const result = await GetCoding(input)
        // console.log(result)
        return sock.sendMessage(userjid, { text: result }, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['coding <teks>'];
handler.tags = ['tools'];
handler.command = ['coding', 'tekno'];
handler.limit = true;

export default handler