import { GetGempa } from '../lib/scrape/gempa-api.js';

const handler = async (m, plug) => {
    const { sock, config } = plug;

    try {
        await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

        const gempa = await GetGempa();

        if (gempa) {
            const caption = `
🚨 *INFO GEMPA TERKINI* 🚨

🗓️ *Tanggal:* ${gempa.Tanggal}
⏰ *Waktu:* ${gempa.Jam}
📈 *Magnitudo:* ${gempa.Magnitude} SR
🌊 *Kedalaman:* ${gempa.Kedalaman}
📍 *Lokasi:* ${gempa.Lintang} | ${gempa.Bujur}
🗺️ *Wilayah:* ${gempa.Wilayah}
⚠️ *Potensi:* ${gempa.Potensi}
🗣️ *Dirasakan:* ${gempa.Dirasakan}
            `.trim();

            await sock.sendMessage(m.key.remoteJid, {
                image: { url: gempa.Shakemap },
                caption: caption
            }, { quoted: m });

        } else {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Gagal mendapatkan data gempa. Server BMKG mungkin sedang bermasalah.' }, { quoted: m });
        }

    } catch (error) {
        console.error("[GEMPA HANDLER ERROR]", error);
        await sock.sendMessage(m.key.remoteJid, { text: `Terjadi kesalahan internal: ${error.message}` }, { quoted: m });
    }
};

handler.help = ['gempa'];
handler.tags = ['info'];
handler.command = ['gempa', 'infogempa'];
handler.limit = true;

export default handler;