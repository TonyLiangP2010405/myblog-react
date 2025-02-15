import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

function RouterNavbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        // 如果需要可以添加跳转到首页
        navigate('/');
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* Brand Link */}
                <Navbar.Brand as={Link} to="/">
                    被Python控制的程序员的博客
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Regular Links */}
                        <Nav.Link as={Link} to="/">主页</Nav.Link>
                        <Nav.Link as={Link} to="/blogs/get_all_blogs">博客</Nav.Link>
                        <Nav.Link as={Link} to="/about">关于</Nav.Link>
                        {/* Dropdown with Router Links */}
                        {isAuthenticated && (
                            <NavDropdown title="功能" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/blogs/create_blog_form">
                                创建新博客
                            </NavDropdown.Item>
                        </NavDropdown>)}
                    </Nav>
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <Button
                                variant="outline-danger"
                                onClick={handleLogout}
                                className="ms-2"
                            >
                                退出登录
                            </Button>
                        ) : (
                            <Nav.Link as={Link} to="/login">管理员登录</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default RouterNavbar;