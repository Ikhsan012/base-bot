import { Nigga } from "../lib/scrape/niggalizer.js";
import { uploadToRyzen } from "../lib/telegraph.js";
import { downloadMediaMessage } from "@whiskeysockets/baileys";

const handler = async (m, plug) => {
    const { sock, config, m: msg } = plug;

    if (!msg.message?.imageMessage) {
        return sock.sendMessage(m.key.remoteJid, { text: `⚠️ Kirim gambar dengan caption atau tag, bro.` }, { quoted: msg });
    }

    try {
        await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: msg });

        const imageBuffer = await downloadMediaMessage(msg, 'buffer', {});
        
        const publicImageUrl = await uploadToRyzen(imageBuffer);
        
        // if (!publicImageUrl) {
        //     return sock.sendMessage(m.key.remoteJid, { text: 'Gagal mengunggah gambar. Coba lagi, ya.' }, { quoted: msg });
        // }

        // console.log('Isi : ', publicImageUrl)

        const resultBuffer = await Nigga(publicImageUrl);
        
        if (resultBuffer) {
            await sock.sendMessage(m.key.remoteJid, { image: resultBuffer, caption: '✅ Gambar berhasil di-HD-in!' }, { quoted: msg });
        } else {
            throw new Error('Gagal mendapatkan data gambar dari API.');
        }

    } catch (error) {
        console.error('Error saat memproses gambar HD:', error);
        await sock.sendMessage(m.key.remoteJid, { text: 'Maaf, ada error saat meng-HD-kan gambar. Coba lagi nanti, ya.' }, { quoted: msg });
    }
};

handler.type = 'image';
handler.help = ['nigga'];
handler.tags = ['media'];
handler.command = ['nigga'];
handler.limit = true;

export default handler;