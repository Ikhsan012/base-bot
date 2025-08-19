import { GetQuoted } from "../lib/scrape/quotes-anime.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    // if (!args) {
    //     return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    // }
    // await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await GetQuoted()
        let message = `${result.quote}\n\n`
        message += `${result.char}`
        await sock.sendMessage(userjid, { text: message }, { quoted: m })
        // console.log(result)
    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['quoted'];
handler.tags = ['tools'];
handler.command = ['quotes', 'quoted'];
handler.limit = false;

export default handler