type StorageType = 'session' | 'local';

const useStorage = () => {
  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = (key: string, type?: StorageType): string => {
    const storageType: 'localStorage' | 'sessionStorage' = `${type ?? 'local'}Storage`;
    return isBrowser ? window[storageType][key] : '';
  };

  const setItem = (key: string, value: string, type?: StorageType) => {
    const storageType: 'localStorage' | 'sessionStorage' = `${type ?? 'local'}Storage`;
    if (isBrowser) {
      window[storageType][key] = value;
    }
  };

  return { getItem, setItem };
};

export default useStorage;
