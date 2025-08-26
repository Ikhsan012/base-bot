import { GetResi } from "../lib/scrape/cekresi.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args || !args.includes(',')) {
        return sock.sendMessage(userjid, { text: `Contoh: ${config.prefix}cekresi nomoresi,kurir` }, { quoted: m });
    }
    await sock.sendMessage(userjid, { text: config.mess.wait }, { quoted: m });

    try {
        const [ resi, kurir ] = args.split(',')
        const result = await GetResi(resi, kurir)
        console.log(result)
        let message = `Berikut Data Resi ${resi}\n\n`
        message += `Nomor Resi : ${resi}\n`
        message += `Ekspedisi : ${result.ekspedisi}\n`
        message += `Status : ${result.status}\n`
        message += `Tanggal Pengiriman : ${result.tanggalKirim}\n`
        message += `Posisi Terahkir : ${result.lastPosition}\n\n`
        result.history.forEach(data => {
            // message += `History Paket\n\n${data.history}\n`
            message += `Tanggal : ${data.tanggal}\n`
            message += `Ket : ${data.keterangan}\n\n`
        });
        await sock.sendMessage(userjid, { text: message }, { quoted: m })
    } catch (error) {
        console.error(error.message)
    }

}

handler.help = ['cekresi <resi, kurir>'];
handler.tags = ['tools'];
handler.command = ['resi', 'cekresi'];
handler.limit = true;

export default handler