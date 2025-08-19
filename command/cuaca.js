import { teapot } from "@hapi/boom";
import { GetCuaca } from "../lib/scrape/cuaca-api.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        const result = await GetCuaca(args)
        let message = `*Info Cuaca Hari Ini*

Lokasi: *${result.kota}*
Suhu: *${result.suhu}*
Kondisi: *${result.kondisi}*
Kelembapan: *${result.kelembapan}*
Angin: *${result.angin}*
Curah Hujan: *${result.curah_hujan}*
Visibilitas: *${result.visibilitas}*
Tutupan Awan: *${result.tutupan_awan}*

Matahari terbit: *${result.terbit}*
Matahari terbenam: *${result.terbenam}*
`

        await sock.sendMessage(userjid, { text: message }, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }

}

handler.help = ['cuaca <Kota>'];
handler.tags = ['tools'];
handler.command = ['cuaca'];
handler.limit = false;

export default handler