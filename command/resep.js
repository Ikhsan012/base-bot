import { GetResep } from "../lib/scrape/resep-api.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}resep <makanan>` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await GetResep(args)
        let message = `*${result.title}*

Waktu Masak: *${result.cookingTime}*
Porsi: *${result.serving}*

---

*Bahan-Bahan:*
${result.ingredients}

---

*Langkah-Langkah:*
${result.steps}`
        await sock.sendMessage(userjid, { text: message }, {quoted: m})
    } catch (error) {
        console.error(error.message)
    }

}

handler.help = ['resep'];
handler.tags = ['tools'];
handler.command = ['resep'];
handler.limit = false;

export default handler