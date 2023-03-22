export const requester = async(method, url, data) => {
    try {
        const user = localStorage.getItem('authData');
        const auth = JSON.parse(user || '{}');

        let headers = {
            'Content-Type': 'application/json',
        }
        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        let request;
        if (method === "GET") {
            request = fetch(url);
        } else {
            request = fetch(url, {
                method,
                headers,
            body: JSON.stringify(data)
            });
        } 
        const res = await request;
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
    
} 