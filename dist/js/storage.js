class Storage {
    key;
    constructor(key) {
        this.key = key;
    }
    ;
    list() {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (getStorageTeachings)
            return JSON.parse(getStorageTeachings) || [];
    }
    ;
    append(teaching) {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (getStorageTeachings) {
            let storage = JSON.parse(getStorageTeachings);
            storage.push(teaching);
            localStorage.setItem(this.key, JSON.stringify(storage));
        }
    }
    ;
    update(storageUpdate) {
        const getStorageTeachings = localStorage.getItem(this.key);
        if (!getStorageTeachings)
            return;
        const listTeachings = JSON.parse(getStorageTeachings);
        const teachingUpdate = listTeachings.map((teaching) => teaching.title === storageUpdate.title ? storageUpdate : teaching);
        localStorage.setItem(this.key, JSON.stringify(teachingUpdate));
    }
    ;
}
;
export const storage = new Storage(`teachings`);
