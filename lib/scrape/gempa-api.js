import axios from 'axios';

export async function GetGempa() {
    const url = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';
    
    const gambarBaseUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/';

    try {
        const response = await axios.get(url);
        const infoGempa = response.data.Infogempa
        console.log(infoGempa)
        const infogempa1 = infoGempa.gempa

        if (!infogempa1) {
            throw new Error('Format data dari BMKG tidak sesuai.');
        }

        const result = {
            ...infogempa1,
            Shakemap: gambarBaseUrl + infogempa1.Shakemap
        };

        return result

    } catch (error) {
        console.error('Error fetching gempa data:', error);
        return null;
    }
}