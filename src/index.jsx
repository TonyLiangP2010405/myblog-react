// src/components/Background/index.jsx
import { useEffect } from 'react';
import './index.css';

const Background = () => {
    useEffect(() => {
        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            // 随机属性
            const startX = Math.random() * window.innerWidth;
            const duration = 5000 + Math.random() * 5000;
            const size = 3 + Math.random() * 4; // 3-7px
            const sway = (Math.random() - 0.5) * 50; // 左右摆动幅度

            // 创建唯一动画名称
            const animName = `sway-${Math.random().toString(36).substr(2, 9)}`;
            const style = document.createElement('style');
            style.textContent = `
        @keyframes ${animName} {
          0% { transform: translateX(0); }
          50% { transform: translateX(${sway}px); }
          100% { transform: translateX(${sway * 0.5}px); }
        }
      `;
            document.head.appendChild(style);

            snowflake.style.cssText = `
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        opacity: ${0.7 + Math.random() * 0.3};
        animation: 
          ${animName} ${duration}ms ease-in-out infinite,
          fall ${duration}ms linear infinite;
      `;

            document.getElementById('snow-container').appendChild(snowflake);

            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
                style.remove();
            });
        };

        const interval = setInterval(createSnowflake, 150);
        return () => {
            clearInterval(interval);
            document.querySelectorAll('.snowflake').forEach(s => s.remove());
        };
    }, []);

    return (
        <div id="global-background">
            <div className="background-image" />
            <div id="snow-container" />
        </div>
    );
};

export default Background;