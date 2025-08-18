import axios from 'axios';
import crypto from 'crypto';

const handler = async (m, plug) => {
    const { sock, args, config } = plug;
    const userjid = m.key.remoteJid;
    
    if (!args) {
        return sock.sendMessage(userjid, { text: `Contoh: ${config.prefix}anycoder pantulkan bola|html` }, { quoted: m });
    }
    
    const [teks, bahasa] = args.split('|');

    const configha = {
      headers: {
        "content-type": "application/json",
        "x-zerogpu-uuid": "htimuHPuPpKanV7zNHH3r"
      },
      timeout: 15000 // Timeout 15 detik (dalam milidetik)
  };
    
    const generateSessionHash = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 11; i++) {
        const byte = crypto.randomBytes(1)[0];
        result += chars[byte % chars.length];
      }
      return result;
    };
    
    const bahasaList = [
      "html", "python", "javascript", "cpp", "c",
      "transformersjs", "typescript", "docker", "shell", "sql"
    ];
    
    async function anyCoder(teks_, bahasa) {
      if (!bahasaList.includes(bahasa)) return 'tidak valid';
    
      const sessionHash = generateSessionHash();
    
      await axios.post(
        `https://akhaliq-anycoder.hf.space/gradio_api/queue/join?__theme=system`,
        {
          data: [
            teks_,
            null,
            null,
            "",
            null,
            null,
            null,
            false,
            bahasa,
            null,
            false
          ],
          event_data: null,
          fn_index: 8,
          trigger_id: 25,
          session_hash: sessionHash
        },
        configha
      );
    
      const response = await axios.get(
        `https://akhaliq-anycoder.hf.space/gradio_api/queue/data?session_hash=${sessionHash}`,
        {
          responseType: 'stream',
          headers: {
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
            'accept': 'text/event-stream',
            'content-type': 'application/json'
          },
          timeout: 15000
        }
      );
    
      return new Promise((resolve, reject) => {
        let output = '';
    
        response.data.on('data', chunk => {
          const lines = chunk.toString().split('\n').filter(line => line.startsWith('data: '));
          for (const line of lines) {
            const jsonStr = line.slice(6);
            try {
              const obj = JSON.parse(jsonStr);
              const ops = obj?.output?.data?.[0];
              if (Array.isArray(ops)) {
                for (const op of ops) {
                  if (op[0] === 'append' && op[1][0] === 'value') {
                    output += op[2];
                  }
                }
              }
            } catch {}
          }
        });
    
        response.data.on('end', () => resolve(output));
        response.data.on('error', reject);
      });
    }
    if (!teks || !bahasa) {
        return sock.sendMessage(userjid, { text: `Format salah. Gunakan: ${config.prefix}anycoder <teks>|<bahasa>` }, { quoted: m });
    }

    await sock.sendMessage(userjid, { text: config.mess.wait }, { quoted: m });

    try {
        const result = await anyCoder(teks.trim(), bahasa.trim());

        if (result === 'tidak valid') {
            const bahasaList = ["html", "python", "javascript", "cpp", "c", "transformersjs", "typescript", "docker", "shell", "sql"];
            const listBahasa = bahasaList.join(', ');
            return sock.sendMessage(userjid, { text: `Bahasa '${bahasa}' tidak didukung. Bahasa yang tersedia: ${listBahasa}` }, { quoted: m });
        }

        await sock.sendMessage(userjid, { text: `*Hasil AnyCoder*\n\n\`\`\`${result}\`\`\`` }, { quoted: m });
    } catch (error) {
        console.error(error);
        sock.sendMessage(userjid, { text: `Terjadi error: ${error.message}` }, { quoted: m });
    }
}

handler.help = ['anycoder <teks>|<bahasa>'];
handler.tags = ['ai', 'tools'];
handler.command = ['anycoder', 'ac'];

export default handler;
