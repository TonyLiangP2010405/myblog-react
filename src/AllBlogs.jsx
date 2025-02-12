import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import './AllBlogs.css';
import {Atom} from "react-loading-indicators";

function AllBlogs () {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blogs/get_all_blogs');
                setBlogs(response.data);
            }
            catch (error) {
                console.log(error.response.data);
                setError(error.response.data.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [])
    if (loading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%'
    }}><Atom color="#15d2f1" size="medium" text="加载中。。。" textColor="#15d2f1" /></div>;
    if (error) return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h2 className="error-title">访问错误</h2>
                <p className="error-message">{error}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    重新加载
                </button>
            </div>
        </div>
    );


    return (
        <div className="blog-page">
            <header className="blog-header">
                <h1 className="blog-title">Latest Blog Posts</h1>
                <div className="header-accent"></div>
            </header>

            <div className="blog-grid">
                {blogs.map(blog => (
                    <article key={blog.id} className="blog-card">
                        <div className="card-content">
                            <div className="card-header">
                                <h2 className="card-title">{blog.title}</h2>
                                {blog.date &&
                                    <time className="card-date">{new Date(blog.date).toLocaleDateString()}</time>}
                            </div>
                            <p className="card-excerpt">
                                {blog.content.length > 150 ?
                                    `${blog.content.substring(0, 150)}...` :
                                    blog.content
                                }
                            </p>
                            <div className="card-actions">
                                <Link to={`/blogs/update_blog/${blog.id}/`} className="update-button">
                                    <button className="btn-primary">
                                        <i className="fas fa-edit"></i>
                                        更改内容
                                    </button>
                                </Link>
                            </div>
                            <div className="card-footer">
                                <button className="read-more-btn">
                                    <Link to={`/blogs/get_blog/${blog.id}`}>
                                    Read More
                                    <span className="arrow">→</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default AllBlogs;