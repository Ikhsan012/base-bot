import axios from 'axios';
import FormData from 'form-data';

export async function uploadToRyzen(imageBuffer) {
    // console.log(imageBuffer)
    const form = new FormData();
    form.append('file', imageBuffer, { filename: 'upload.png' });

    try {
        const data  = await axios.post('https://api.ryzumi.vip/api/uploader/ryzencdn', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        const data2 = data.data.url
        return data2
    } catch (error) {
        console.error('Error saat upload ke Telegraph:', error);
        // return null;
    }
}