import {
  useEffect,
  useContext,
  useReducer,
  createContext,
  ReactNode,
} from 'react';
import { useMountedState } from 'react-use';
// Hooks
import { useAuthLocalStorage } from 'hooks/authLocalStorage';

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Action =
  | {
      type: AuthActionType.LOGIN;
      payload: {
        token: string;
      };
    }
  | {
      type: AuthActionType.LOGOUT;
    };

type Dispatch = (action: Action) => void;

type State = {
  token: string | null;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthStateContext = createContext<State | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case AuthActionType.LOGOUT:
      return {
        token: null,
        loading: false,
      };

    default:
      throw new Error('Unhandled Auth action type');
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useMountedState();
  const { tokenFromLocalStorage } = useAuthLocalStorage();

  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    loading: true,
  });

  useEffect(() => {
    if (isMounted() && tokenFromLocalStorage) {
      dispatch({
        type: AuthActionType.LOGIN,
        payload: {
          token: tokenFromLocalStorage,
        },
      });
    }
  }, [isMounted, tokenFromLocalStorage]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
};
