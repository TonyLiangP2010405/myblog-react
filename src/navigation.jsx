import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function RouterNavbar() {
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
                        <NavDropdown title="功能" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/blogs/create_blog_form">
                                创建新博客
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/services/mobile">
                                Mobile Apps
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/contact">
                                Contact Us
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default RouterNavbar;