import { InboxEmail } from "../lib/scrape/get-inbox-emailtemp.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args[0]) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}getinbox <id-email>` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await InboxEmail(args[0])
        if (!result || !result.mails || result.mails.length === 0) {
            let pesan = `Maaf, tidak ada email yang masuk untuk ID ini.\n\nPastikan ID sesi sudah benar atau coba lagi nanti.`;
            await sock.sendMessage(userjid, {text: pesan}, { quoted: m })
        }
        
        let mail = result.mails[0]
        
        let from = mail.fromAddr ? mail.fromAddr : 'Tidak Diketahui'
        let subject = mail.headerSubject ? mail.headerSubject : '(Tanpa Subjek)'
        let downloadUrl = mail.downloadUrl ? mail.downloadUrl : 'Link tidak tersedia.'

        let pesan = `Ada Email Masuk!

Dari: ${from}
Subjek: ${subject}

Untuk melihat isi email, klik link di bawah ini:
${downloadUrl}`
        
        await sock.sendMessage(userjid, { text: pesan }, { quoted: m })
        
    } catch (error) {
        console.error(error.message)
        let pesanError = `Maaf, terjadi kesalahan saat mengambil data. Mungkin ID yang kamu masukkan salah.\n\n${error.message}`
        await sock.sendMessage(userjid, { text: pesanError }, { quoted: m })
    }
}

handler.help = ['getinbox <id>'];
handler.tags = ['tools'];
handler.command = ['getinbox', 'getmail'];
handler.limit = false;

export default handler