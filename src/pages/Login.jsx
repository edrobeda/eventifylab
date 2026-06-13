import { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // TODO: Implementar integracao com API real
    setTimeout(() => {
      message.info('Login em desenvolvimento');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-extrabold text-white">
            Eventify<span className="text-primary">Lab</span>
          </a>
          <p className="text-gray-400 mt-2">Acesse sua conta</p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-card border border-white/10 rounded-2xl p-8 shadow-2xl">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor, insira seu email' },
                { type: 'email', message: 'Email invalido' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Email"
                className="bg-dark-lighter border-white/10 text-white placeholder:text-gray-500 h-12 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Senha"
                className="bg-dark-lighter border-white/10 text-white placeholder:text-gray-500 h-12 rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-400">Lembrar-me</Checkbox>
                </Form.Item>
                <a href="#" className="text-primary hover:text-primary-light text-sm">
                  Esqueceu a senha?
                </a>
              </div>
            </Form.Item>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-primary hover:bg-primary-light border-none rounded-lg font-semibold text-dark"
              >
                Entrar
              </Button>
            </Form.Item>

            <div className="text-center text-gray-400 text-sm">
              Nao tem uma conta?{' '}
              <a href="#" className="text-primary hover:text-primary-light font-medium">
                Cadastre-se
              </a>
            </div>
          </Form>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-primary text-sm transition-colors">
            &larr; Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
