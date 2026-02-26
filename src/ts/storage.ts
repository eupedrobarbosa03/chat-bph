class Storage {
    protected readonly key: string;
    constructor(key: string) {
        this.key = key;
    };

    list<T>() {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (getStorageTeachings) return JSON.parse(getStorageTeachings) || [];
    };

    append<T>(teaching: T): void {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (getStorageTeachings) {
            let storage = JSON.parse(getStorageTeachings);
            storage.push(teaching);
            localStorage.setItem(this.key, JSON.stringify(storage));
        }
    };
    update<T extends {text: string}>(storageUpdate: T): void {};
};

export const storage = new Storage(`teachings`);