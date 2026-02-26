class Storage {
    protected readonly key: string;
    constructor(key: string) {
        this.key = key;
    };

    list<T>(){
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
    update<T extends {title: string}>(storageUpdate: T): void {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (!getStorageTeachings) return;
        const listTeachings: T[] = JSON.parse(getStorageTeachings);
        const teachingUpdate = listTeachings.map((teaching) => 
            teaching.title === storageUpdate.title ? storageUpdate : teaching
        );
        localStorage.setItem(this.key, JSON.stringify(teachingUpdate));
    };
};

export const storage = new Storage(`teachings`);