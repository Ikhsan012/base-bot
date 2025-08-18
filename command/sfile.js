import { GetSfile } from "../lib/scrape/sfile.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    try {
        const result = await GetSfile(args)
        console.log(result)
    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['sfile <teks>'];
handler.tags = ['sfile'];
handler.command = ['sfile', 'sf'];
handler.limit = true;

export default handler;