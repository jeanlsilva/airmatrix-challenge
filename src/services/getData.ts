import axios from 'axios';

export async function getData(url: string) {
    try {        
        const response = await axios.get(url);

        return response.data;
    } catch (err: any) {
        console.log(err.message);
    }
}