import { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";
import { useAuth } from './AuthContext.jsx'

const SimpleLogin = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 基础验证
        if (!credentials.name.trim() || !credentials.password) {
            setError('请输入用户名和密码');
            return;
        }

        try {
            setLoading(true);
            // 模拟API请求
            const response = await axios.post(
                'http://localhost:3000/users/checklogin',
                credentials
            );
            login(response.data.token);

            // 登录成功跳转
            navigate('/');
        } catch (err) {
            console.log(err)
            setError('登录失败，请检查用户名或密码');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container className="simple-login-container">
            <div className="simple-login-box">
                <h2 className="text-center mb-4">系统登录</h2>

                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="请输入用户名"
                            value={credentials.name}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>密码</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="请输入密码"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            '登 录'
                        )}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default SimpleLogin;