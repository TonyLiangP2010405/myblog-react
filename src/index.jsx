// src/components/Background/index.jsx
import { useEffect, useRef } from 'react';
import './index.css';

// 配置常量
const MAX_SNOWFLAKES = 30;    // 最大同时存在雪花数
const SNOW_INTERVAL = 150;    // 雪花生成间隔（毫秒）
const SIZE_RANGE = [3, 7];    // 雪花尺寸范围 [最小, 最大]（单位：px）
const SWAY_RANGE = 50;        // 左右摆动幅度（单位：px）
const DURATION_RANGE = [5000, 10000]; // 动画持续时间范围 [最小, 最大]（单位：毫秒）

const Background = () => {
    const snowflakeCount = useRef(0);

    useEffect(() => {
        const createSnowflake = () => {
            // 数量限制检查
            if (snowflakeCount.current >= MAX_SNOWFLAKES) return;

            // 创建雪花元素
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflakeCount.current += 1;

            // 生成随机属性
            const startX = Math.random() * window.innerWidth;
            const duration = DURATION_RANGE[0] + Math.random() * (DURATION_RANGE[1] - DURATION_RANGE[0]);
            const size = SIZE_RANGE[0] + Math.random() * (SIZE_RANGE[1] - SIZE_RANGE[0]);
            const sway = (Math.random() - 0.5) * SWAY_RANGE;

            // 创建唯一动画
            const animationName = `sway-${Math.random().toString(36).slice(2, 9)}`;
            const styleTag = document.createElement('style');
            styleTag.textContent = `
        @keyframes ${animationName} {
          0% { transform: translateX(0); }
          50% { transform: translateX(${sway}px); }
          100% { transform: translateX(${sway * 0.5}px); }
        }
      `;
            document.head.appendChild(styleTag);

            // 设置雪花样式
            snowflake.style.cssText = `
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        opacity: ${0.7 + Math.random() * 0.3};
        animation: 
          ${animationName} ${duration}ms ease-in-out infinite,
          fall ${duration}ms linear infinite;
      `;

            // 添加到容器
            const container = document.getElementById('snow-container');
            if (container) container.appendChild(snowflake);

            // 清理函数
            const handleAnimationEnd = () => {
                snowflake.remove();
                styleTag.remove();
                snowflakeCount.current = Math.max(0, snowflakeCount.current - 1);
            };

            // 绑定事件
            snowflake.addEventListener('animationend', handleAnimationEnd);
            snowflake.addEventListener('animationcancel', handleAnimationEnd);
        };

        // 启动定时器
        const snowInterval = setInterval(createSnowflake, SNOW_INTERVAL);

        // 组件卸载时清理
        return () => {
            clearInterval(snowInterval);
            document.querySelectorAll('.snowflake').forEach(s => s.remove());
            snowflakeCount.current = 0;
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