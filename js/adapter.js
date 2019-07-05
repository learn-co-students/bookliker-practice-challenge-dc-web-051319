class Adapter {
    static fetch(url) {
        return fetch(url)
            .then(response => response.json())
            .then(obj => {
                return obj;
            });
    }
}