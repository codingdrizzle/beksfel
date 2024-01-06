import { useStore } from 'jotai';

export function useCustomStore() {
    const store = useStore();
    return store;
}
