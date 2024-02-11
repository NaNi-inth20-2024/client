class LocalStorageService {
    getByKey(key: string) {
        return localStorage.getItem(key);
    }

    removeByKey(key: string) {
        return localStorage.removeItem(key);
    }

    set(key: string, value: string) {
        return localStorage.setItem(key, value);
    }

    reset() {
        localStorage.clear();
    }
}

export { LocalStorageService };
