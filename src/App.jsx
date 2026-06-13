import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ptBR from 'antd/locale/pt_BR';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#10b981',
          borderRadius: 8,
          colorBgContainer: '#1a2234',
          colorBorder: 'rgba(255,255,255,0.1)',
          colorText: '#ffffff',
          colorTextPlaceholder: '#6b7280',
        },
        components: {
          Input: {
            colorBgContainer: '#1e293b',
            colorBorder: 'rgba(255,255,255,0.1)',
            colorText: '#ffffff',
            colorTextPlaceholder: '#6b7280',
            activeBorderColor: '#10b981',
            hoverBorderColor: '#10b981',
          },
          Checkbox: {
            colorText: '#9ca3af',
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
