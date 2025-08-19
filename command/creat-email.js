import { CreateTemp } from "../lib/scrape/create-temp-email.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    // if (!args) {
    //     return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    // }
    // await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await CreateTemp()
        let message = `Email Sementara Berhasil Dibuat!

ID Sesi: ${result.id}
Email: ${result.addresses[0].address}
Berlaku Sampai: ${result.expiresAt}

Sekarang kamu bisa pakai email ini untuk verifikasi atau pendaftaran.`
        console.log(message)
    } catch (error) {
        console.error(error.message)
    }
}

handler.help = ['tempemail'];
handler.tags = ['tools'];
handler.command = ['tempemail', 'mail'];
handler.limit = false;

export default handler