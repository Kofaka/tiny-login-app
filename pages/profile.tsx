import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
// Context
import {
  useAuthState,
  useAuthDispatch,
  AuthActionType,
} from 'context/authContext';
// Hooks
import { useAuthLocalStorage } from 'hooks/authLocalStorage';
// Constants
import { HOME_LOGIN } from 'constants/routes';
// Components
import PageWrapper from 'components/common/PageWrapper/PageWrapper';

const ProfilePage = () => {
  const { push } = useRouter();
  const dispatch = useAuthDispatch();
  const { loading, token } = useAuthState();
  const { clearTokenFromLocalStorage } = useAuthLocalStorage();

  useEffect(() => {
    if (!loading && !token) {
      push(HOME_LOGIN).then();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, token]);

  const handleLogout = () => {
    clearTokenFromLocalStorage();

    dispatch({ type: AuthActionType.LOGOUT });

    push(HOME_LOGIN).then();
  };

  return (
    <PageWrapper title="Profile | Tiny login app">
      <Result
        icon={<SmileOutlined />}
        title="Hi, Markus! Welcome aboard 🎉"
        extra={
          <Button danger type="primary" onClick={handleLogout}>
            Logout
          </Button>
        }
      />
    </PageWrapper>
  );
};

export default ProfilePage;
