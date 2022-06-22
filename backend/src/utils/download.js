import { HTTP } from '../vendor/open-api';

const cache = new Map();

export default async function download(url, ua) {
    ua = ua || 'Quantumult%20X/1.0.29 (iPhone14,5; iOS 15.4.1)';
    const id = ua + url;
    if (cache.has(id)) {
        const [data, timestamp] = cache.get(id);
        const diff = (Date.now() - timestamp) / 1000 / 60;
        if (diff <= 30) {
            console.log(
                `✅ cache expire in ${Math.round(
                    30 - diff,
                )} min(s): ${url} ${ua}`,
            );
            return data;
        }
        console.log(`❌ cache expire: ${url} ${ua}`);
    } else {
        console.log(`❌ cache miss: ${url} ${ua}`);
    }

    const http = HTTP({
        headers: {
            'User-Agent': ua,
        },
    });

    const result = new Promise((resolve, reject) => {
        http.get(url).then((resp) => {
            const body = resp.body;
            if (body.replace(/\s/g, '').length === 0)
                reject(new Error('订阅内容为空！'));
            else resolve(body);
        });
    });

    cache.set(id, [result, Date.now()]);
    return result;
}
