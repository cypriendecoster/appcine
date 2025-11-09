export function getStoredList(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function toggleStoredItem(key, item) {
    const current = getStoredList(key);
    const exists = current.find(i => i.id === item.id);

    let updated;
    if(exists) {
        updated = current.filter(i => i.id !== item.id);
    }else {
        updated = [...current, item];
    }

    localStorage.setItem(key,JSON.stringify(updated));
    return updated;
}

export function isStored(key,id) {
    const current = getStoredList(key);
    return current.some(i => i.id === id);
}