import { GetGD } from "../lib/gdrive-api.js";
import axios from "axios";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        const result = await GetGD(args)
        let message = `GDrive Downloader

Nama : ${result.fileName}
Size : ${result.fileSize}

Sedang Mengirim File`
        await sock.sendMessage(userjid, { text : message }, { quoted: m })

        const { data: fileBuffer } = await axios.get(result.downloadUrl, {
            responseType: 'arraybuffer'
        });

        await sock.sendMessage(userjid, {
        document: fileBuffer,
        fileName: result.fileName,
        mimetype: result.mimetype
    });

    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['gdrive <link>'];
handler.tags = ['tools'];
handler.command = ['gdrive', 'gd'];
handler.limit = true;

export default handler