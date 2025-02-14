import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaWeibo, FaGamepad, FaHeart } from 'react-icons/fa';
import { SiBilibili } from 'react-icons/si';

// ======================
// 动画定义
// ======================
const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
`;

// ======================
// 样式组件
// ======================
const MainContainer = styled.div`
    padding: 80px 2rem 2rem;
    font-family: 'Comic Neue', cursive;
`;

const MainContent = styled(motion.div)`
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const CharacterSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const AvatarWrapper = styled(motion.div)`
    position: relative;
    text-align: center;
`;

const AnimeAvatar = styled.img`
    width: 100%;
    max-width: 300px;
    border-radius: 20px;
    border: 5px solid #fff;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    animation: ${float} 4s ease-in-out infinite;
`;

const Badge = styled.div`
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff7675;
    color: white;
    padding: 8px 20px;
    border-radius: 15px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(255, 118, 117, 0.3);
`;

const InfoCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
`;

const StatItem = styled(motion.div)`
    background: ${props => props.color};
    padding: 1.5rem;
    border-radius: 15px;
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -20px;
        right: -20px;
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }
`;

const SocialLink = styled(motion.a).attrs(() => ({
    whileTap: { scale: 0.95 }
}))`
  background: ${props => props.color};
  padding: 12px 25px;
  border-radius: 30px;
  color: white !important;
  display: inline-flex;
  align-items: center;
  margin: 0 15px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px ${props => `${props.color}50`};

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  svg {
    margin-right: 12px;
  }
`;

// ======================
// 主页组件
// ======================
export default function AnimeBlogHome() {
    const stats = [
        { title: '总游戏时长', value: '1500+小时', color: '#6c5ce7' },
        { title: '收藏角色', value: '58位', color: '#00b894' },
        { title: '达成成就', value: '236项', color: '#ff7675' },
        { title: '好友数量', value: '89位', color: '#fdcb6e' }
    ];

    return (
        <MainContainer>
            <MainContent
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <CharacterSection>
                    <AvatarWrapper
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AnimeAvatar
                            src="/headtitle.jpg"
                            alt="Anime Avatar"
                        />
                        <Badge>
                            <FaHeart style={{ marginRight: 8 }} />
                            资深旅行者
                        </Badge>
                    </AvatarWrapper>

                    <InfoCard>
                        <motion.h1
                            style={{
                                fontSize: '2.5rem',
                                color: '#2d3436',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ color: '#ff7675', marginRight: '10px' }}>✦</span>
                            星海漫游者
                            <span style={{ color: '#6c5ce7', marginLeft: '10px' }}>✧</span>
                        </motion.h1>

                        <StatsGrid>
                            {stats.map((stat) => (
                                <StatItem
                                    key={stat.title}
                                    color={stat.color}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.9rem' }}>{stat.title}</div>
                                </StatItem>
                            ))}
                        </StatsGrid>
                    </InfoCard>
                </CharacterSection>

                <div className="d-flex justify-content-center mb-4">
                    <SocialLink
                        color="#ff7675"
                        href="https://www.bilibili.com"
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                    >
                        <SiBilibili style={{ fontSize: '1.5rem' }} />
                        哔哩哔哩
                    </SocialLink>
                    <SocialLink
                        color="#6c5ce7"
                        href="https://weibo.com"
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaWeibo style={{ fontSize: '1.5rem' }} />
                        微博
                    </SocialLink>
                    <SocialLink
                        color="#00b894"
                        href="https://www.miyoushe.com"
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaGamepad style={{ fontSize: '1.5rem' }} />
                        米游社
                    </SocialLink>
                </div>
            </MainContent>
        </MainContainer>
    );
}