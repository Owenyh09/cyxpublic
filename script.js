// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// 修改点击效果部分
document.querySelector('.love-text').addEventListener('click', function(e) {
    // 创建爱心
    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    
    // 随机位置和大小
    const x = e.clientX;
    const y = e.clientY;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    document.body.appendChild(heart);
    
    // 添加缩放动画
    this.style.transform = 'scale(1.3)';
    setTimeout(() => this.style.transform = 'scale(1)', 200);
    
    // 移除爱心元素
    setTimeout(() => document.body.removeChild(heart), 1000);
});

// 添加悬浮特效
let hearts = ['❤️', '💖', '💗', '💓', '💕'];
document.querySelector('.love-text').addEventListener('mousemove', function(e) {
    if (Math.random() > 0.8) {  // 30%的概率生成爱心
        const heart = document.createElement('span');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'floating-heart';
        
        const x = e.clientX;
        const y = e.clientY;
        heart.style.left = (x - 10) + 'px';
        heart.style.top = (y - 10) + 'px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        
        document.body.appendChild(heart);
        setTimeout(() => document.body.removeChild(heart), 1000);
    }
});

// 修改键盘交互
document.addEventListener('keydown', function(e) {
    const loveText = document.querySelector('.love-text');
    
    switch(e.key.toLowerCase()) {
        case 'c':
            // C键 - 放大旋转效果
            loveText.style.transform = 'scale(1.5) rotate(15deg)';
            loveText.style.color = '#ff1493';
            createHeartBurst(loveText);
            break;
            
        case 'y':
            // Y键 - 上下弹跳效果
            loveText.style.transform = 'translateY(-20px) scale(1.2)';
            loveText.style.color = '#ff69b4';
            createRainbowHearts();
            break;
            
        case 'x':
            // X键 - 左右摇摆效果
            loveText.style.transform = 'scale(1.3) skew(-10deg)';
            loveText.style.color = '#ff8cc6';
            createHeartRain();
            break;
    }
    
    // 重置样式
    setTimeout(() => {
        loveText.style.transform = 'scale(1) rotate(0deg)';
        loveText.style.color = 'transparent';  // 恢复渐变色效果
    }, 500);
});

// 添加爱心爆炸效果
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.className = 'floating-heart burst-heart';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.transform = `rotate(${i * 30}deg)`;
        document.body.appendChild(heart);
        setTimeout(() => document.body.removeChild(heart), 1000);
    }
}

// 添加彩虹爱心效果
function createRainbowHearts() {
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff8cc6', '#ffb6c1'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.innerHTML = '💖';
            heart.className = 'floating-heart rainbow-heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(heart);
            setTimeout(() => document.body.removeChild(heart), 2000);
        }, i * 100);
    }
}

// 添加爱心雨效果
function createHeartRain() {
    const hearts = ['❤️', '💖', '💗', '💓', '💕'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.className = 'floating-heart rain-heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
            document.body.appendChild(heart);
            setTimeout(() => document.body.removeChild(heart), 3000);
        }, i * 150);
    }
} 