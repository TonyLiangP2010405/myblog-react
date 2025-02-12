import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Atom } from "react-loading-indicators";
import './ShowBlogDetail.css'

function ShowBlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/blogs/get_blog/${id}`);
                console.log(response.data.data);
                setBlog(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <Atom color="#15d2f1" size="medium" text="Loading..." textColor="#15d2f1" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <h2>Error Loading Blog</h2>
                    <p>{error}</p>
                    <Link to="/blogs/get_all_blogs" className="back-button">
                        Return to Blog List
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return <div className="not-found">Blog not found</div>;
    }

    return (
        <div className="blog-detail-container">
            <Link to="/blogs/get_all_blogs" className="back-button">
                &larr; Back to List
            </Link>

            <article className="blog-content">
                <header className="blog-header">
                    <h1 className="blog-title">{blog.title}</h1>
                </header>

                <div className="blog-body">
                    <div className="content">
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}

export default ShowBlogDetail;