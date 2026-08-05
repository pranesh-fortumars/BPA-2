/**
 * Data Abstraction Layer
 * Offline-first, frontend-first architecture.
 * Currently uses IndexedDB for local storage. 
 * Can be swapped to Firestore later without changing the UI components.
 */

const DB_NAME = 'bpa_pro_db';
const DB_VERSION = 2;

// A simple promise-based IndexedDB wrapper
function getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            // SSR safety
            return reject(new Error("IndexedDB is not available on the server"));
        }
        
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            // Create object stores for different collections if they don't exist
            if (!db.objectStoreNames.contains('kpi_data')) {
                db.createObjectStore('kpi_data', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('projects')) {
                db.createObjectStore('projects', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('leads')) {
                db.createObjectStore('leads', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('candidates')) {
                db.createObjectStore('candidates', { keyPath: 'id' });
            }
        };
    });
}

export const DataService = {
    async get<T>(collection: string, id: string): Promise<T | null> {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(collection, 'readonly');
                const store = transaction.objectStore(collection);
                const request = store.get(id);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result ? request.result as T : null);
            });
        } catch (e) {
            console.warn("DB Error", e);
            return null;
        }
    },

    async getAll<T>(collection: string): Promise<T[]> {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(collection, 'readonly');
                const store = transaction.objectStore(collection);
                const request = store.getAll();

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result as T[]);
            });
        } catch (e) {
            console.warn("DB Error", e);
            return [];
        }
    },

    async save<T extends { id: string }>(collection: string, data: T): Promise<void> {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(collection, 'readwrite');
                const store = transaction.objectStore(collection);
                const request = store.put(data);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve();
            });
        } catch (e) {
            console.warn("DB Error", e);
        }
    },

    async delete(collection: string, id: string): Promise<void> {
        try {
            const db = await getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(collection, 'readwrite');
                const store = transaction.objectStore(collection);
                const request = store.delete(id);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve();
            });
        } catch (e) {
            console.warn("DB Error", e);
        }
    }
};
