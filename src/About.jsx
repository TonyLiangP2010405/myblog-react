import {
    Container,
    Row,
    Col,
    Card,
    ProgressBar,
} from 'react-bootstrap';
import {FaGithub, FaLinkedin, FaCode, FaDesktop} from 'react-icons/fa';
import { MdEmail, MdWork, MdSchool } from 'react-icons/md';
import './About.css';

const ProfilePage = () => {
    // 技能数据
    const skills = [
        { name: '设计', level: 20, icon: <FaDesktop /> },
        { name: '实现', level: 80, icon: <FaCode /> },
    ];

    // 项目数据
    const projects = [
        {
            title: '人脸识别出勤系统',
            description: '基于Django的全栈项目',
            tech: ['SVM', 'Django', 'REST API'],
        },
        {
            title: '航天智算云端产品报价单系统',
            description: '基于Django的全栈项目',
            tech: [ 'Django', 'REST API'],
        },
        {
            title: '健身助手方案系统',
            description: '基于Django的全栈项目',
            tech: [ 'Django', 'REST API'],
        },
        {
            title: '瓦萨米商城系统',
            description: '基于Django的全栈项目',
            tech: [ 'Django', 'REST API'],
        },
        {
            title: 'Minecraft服务器与QQ互联qqbot',
            description: '基于Nonebot项目',
            tech: [ 'Python','JAVA','Flask', 'REST API'],
        },
    ];

    // 经历数据
    const experiences = [
        {
            title: '云服务售前工程师 & 全栈工程师',
            company: '航天智算科技有限公司',
            period: '2024 - 现在',
            icon: <MdWork />,
            details: ['云产品方案设计','云产品彩页制作','公司官网设计','公司系统开发']
        },
        {
            title: '计算机科学硕士',
            company: '悉尼大学',
            period: '2024 - 现在',
            icon: <MdSchool />,
            details: ['专业方向: 软件工程']
        },
        {
            title: '计算机科学学士',
            company: '澳门理工大学',
            period: '2020 - 2024',
            icon: <MdSchool />,
            details: ['专业方向: 前后端开发']
        },
    ];

    // 处理导航点击

    return (
        <div className="profile-container">
            {/* 主要内容 */}
            <Container className="main-content">
                {/* 个人简介区块 */}
                <section id="about" className="profile-header animate__animated animate__fadeIn">
                    <Row className="align-items-center py-5">
                        <Col md={4} className="text-center">
                            <div className="avatar-wrapper">
                                <img
                                    src="/headtitle.jpg"
                                    alt="头像"
                                    className="profile-avatar"
                                />
                            </div>
                        </Col>
                        <Col md={8}>
                            <h1 className="display-4">被Python控制的程序员</h1>
                            <p className="lead text-muted">全栈开发工程师 | 云服务售前工程师</p>
                            <div className="social-links">
                                <a href="https://github.com/TonyLiangP2010405" className="me-3">
                                    <FaGithub size={28} />
                                </a>
                                <a href="https://www.linkedin.com/in/tony-liang-9aaa81279/" className="me-3">
                                    <FaLinkedin size={28} />
                                </a>
                                <a href="https://tghrtwld@gmail.com">
                                    <MdEmail size={28} />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* 技能展示 */}
                <section id="skills" className="skills-section my-5">
                    <h2 className="section-title mb-4">技术能力</h2>
                    <Row>
                        {skills.map((skill, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="skill-card h-100">
                                    <Card.Body>
                                        <div className="skill-icon">{skill.icon}</div>
                                        <h5>{skill.name}</h5>
                                        <ProgressBar
                                            now={skill.level}
                                            label={`${skill.level}%`}
                                            className="skill-progress"
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* 项目展示 */}
                <section id="projects" className="projects-section my-5">
                    <h2 className="section-title mb-4">精选项目</h2>
                    <Row>
                        {projects.map((project, index) => (
                            <Col lg={6} key={index} className="mb-4">
                                <Card className="project-card h-100">
                                    <Card.Body>
                                        <Card.Title>{project.title}</Card.Title>
                                        <Card.Text>{project.description}</Card.Text>
                                        <div className="tech-tags">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* 经历时间轴 */}
                <section className="experience-section my-5">
                    <h2 className="section-title mb-4">经历</h2>
                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-icon">{exp.icon}</div>
                                <div className="timeline-content">
                                    <h5>{exp.title}</h5>
                                    <p className="text-muted">{exp.company} · {exp.period}</p>
                                    <ul>
                                        {exp.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default ProfilePage;