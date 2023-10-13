import { useLocalStorage } from 'react-use';
// Constants
import { STORAGE_KEYS } from 'constants/storage';

type Token = string | undefined;

type useAuthLocalStorageReturn = {
  tokenFromLocalStorage: Token;
  setTokenToLocalStorage: (token: Token) => void;
  clearTokenFromLocalStorage: () => void;
};

export const useAuthLocalStorage = (): useAuthLocalStorageReturn => {
  const [
    tokenFromLocalStorage,
    setTokenToLocalStorage,
    clearTokenFromLocalStorage,
  ] = useLocalStorage<Token>(STORAGE_KEYS.TOKEN);

  return {
    tokenFromLocalStorage,
    setTokenToLocalStorage,
    clearTokenFromLocalStorage,
  };
};
