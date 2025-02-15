import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {FaGithub, FaWeibo, FaEnvelope, FaRss, FaLinkedin, FaQq} from 'react-icons/fa';

function RouterFooter() {
    return (
        <footer className="bg-body-tertiary mt-5 border-top">
            <Container className="py-5">
                <Row className="justify-content-between">
                    {/* 网站信息栏目 */}
                    <Col lg={4} className="mb-4">
                        <h5 className="mb-3">被Python控制的程序员的博客</h5>
                        <p className="text-muted">
                            探索技术世界，分享编程心得<br />
                            记录从全栈开发到人工智能的旅程
                        </p>
                        <div className="social-links">
                            <a href="https://github.com/TonyLiangP2010405" className="me-3 text-dark">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/tony-liang-9aaa81279/" className="me-3 text-danger">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://qm.qq.com/q/GQrvhYuj0Y" className="me-3 text-primary">
                                <FaQq size={24} />
                            </a>
                        </div>
                    </Col>

                    {/* 快速链接栏目 */}
                    <Col lg={2} className="mb-4">
                        <h5 className="mb-3">快速导航</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/" className="px-0 text-muted">主页</Nav.Link>
                            <Nav.Link as={Link} to="/blogs/get_all_blogs" className="px-0 text-muted">博客列表</Nav.Link>
                            <Nav.Link as={Link} to="/about" className="px-0 text-muted">关于作者</Nav.Link>
                        </Nav>
                    </Col>

                    {/* 技术支持栏目 */}
                    <Col lg={3} className="mb-4">
                        <h5 className="mb-3">技术支持</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/about" className="px-0 text-muted">联系作者</Nav.Link>
                        </Nav>
                    </Col>

                </Row>

                {/* 版权信息 */}
                <Row className="border-top mt-4 pt-3">
                    <Col className="text-center text-muted">
                        <p className="mb-0">
                            © {new Date().getFullYear()} 被Python控制的程序员
                            <span className="mx-2">|</span>
                        </p>
                        <small>Powered by React & Express</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default RouterFooter;