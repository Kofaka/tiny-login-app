import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Result, Form, Input, Button } from 'antd';
// Context
import { useAuthDispatch, AuthActionType } from 'context/authContext';
// Constants
import { PROFILE } from 'constants/routes';
// Hooks
import { useAuthLocalStorage } from 'hooks/authLocalStorage';
// Components
import PageWrapper from 'components/common/PageWrapper/PageWrapper';

const HomePage: NextPage = () => {
  const { push } = useRouter();
  const dispatch = useAuthDispatch();
  const { setTokenToLocalStorage } = useAuthLocalStorage();

  const handleLogin = () => {
    const token = 'some-auth-token';

    setTokenToLocalStorage(token);

    dispatch({
      type: AuthActionType.LOGIN,
      payload: {
        token,
      },
    });

    push(PROFILE).then();
  };

  return (
    <PageWrapper title="Login | Tiny login app">
      <Result
        status="403"
        title="Log in"
        extra={
          <Form
            onFinish={handleLogin}
            style={{
              width: '300px',
              margin: 'auto',
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        }
      />
    </PageWrapper>
  );
};

export default HomePage;
