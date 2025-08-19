import { IpLookUP } from "../lib/scrape/iplookup.js";

const handler = async (m, plug) => {
    const { sock, args, config } = plug
    const userjid = m.key.remoteJid
    if (!args) {
        return sock.sendMessage(m.key.remoteJid, { text: `Contoh: ${config.prefix}deepai halo, apa kabar?` }, { quoted: m });
    }
    await sock.sendMessage(m.key.remoteJid, { text: config.mess.wait }, { quoted: m });

    try {
        let result = await IpLookUP(args)
        let message = `*Detail IP Address Ditemukan*

📍 *Alamat IP:*
\`${result.ip}\`

---

🌐 *Lokasi:*
* *Negara:* ${result.country_name} (${result.country_code})
* *Region:* ${result.region} (${result.region_code})
* *Kota:* ${result.city}
* *Kode Pos:* ${result.postal}
* *Zona Waktu:* ${result.timezone}
* *Koordinat:* ${result.latitude}, ${result.longitude}

---

📡 *Informasi Jaringan:*
* *Jaringan:* ${result.network}
* *Versi IP:* ${result.version}
* *ASN:* ${result.asn}
* *Organisasi:* ${result.org}

---

🌍 *Data Geografis:*
* *Benua:* ${result.continent_code}
* *Luas Negara:* ${result.country_area} km²
* *Populasi:* ${result.country_population}
* *Ibukota:* ${result.country_capital}
* *Bahasa:* ${result.languages}
* *Mata Uang:* ${result.currency} (${result.currency_name})
* *Kode Telepon:* ${result.country_calling_code}`

        if (result.error === true) {
            await sock.sendMessage(userjid, {text: 'Maaf, Ip Tidak Bisa Di Lacak, Alasan ' + result.reason}, { quoted: m })
            return
        } else {
            await sock.sendMessage(userjid, { text: message }, { quoted: m })       
        }

    } catch (error) {
        console.error(error.message)
    }
    
}

handler.help = ['ip <ip>'];
handler.tags = ['tools'];
handler.command = ['ip', 'lacak'];
handler.limit = false;

export default handler