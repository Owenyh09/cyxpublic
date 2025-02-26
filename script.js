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

// 添加动画锁
let isAnimating = false;

// 修改键盘交互
document.addEventListener('keydown', function(e) {
    const loveText = document.querySelector('.love-text');
    
    // 如果正在播放动画，则不响应新的按键
    if (isAnimating) return;
    
    switch(e.key.toLowerCase()) {
        case 'c':
            // C键 - 放大旋转效果
            isAnimating = true;
            loveText.style.transform = 'scale(1.5) rotate(15deg)';
            loveText.style.color = '#ff1493';
            createHeartBurst(loveText);
            setTimeout(() => {
                loveText.style.transform = 'scale(1) rotate(0deg)';
                loveText.style.color = '#ff1493';
                isAnimating = false;
            }, 1500); // 等待动画完成
            break;
            
        case 'y':
            // Y键 - 心形环绕效果
            isAnimating = true;
            loveText.style.transform = 'scale(1.2)';
            loveText.style.color = '#ff69b4';
            createHeartCircle(loveText);
            setTimeout(() => {
                loveText.style.transform = 'scale(1) rotate(0deg)';
                loveText.style.color = '#ff1493';
                isAnimating = false;
            }, 2000); // 等待动画完成
            break;
            
        case 'x':
            // X键 - 左右摇摆效果
            loveText.style.transform = 'scale(1.3) skew(-10deg)';
            loveText.style.color = '#ff8cc6';
            createHeartRain();
            setTimeout(() => {
                loveText.style.transform = 'scale(1) rotate(0deg)';
                loveText.style.color = '#ff1493';
            }, 500);
            break;
    }
});

// 修改爱心爆炸效果
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const hearts = ['❤️', '💖', '💗', '💓', '💕'];
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'floating-heart burst-heart';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '48px';
        heart.style.setProperty('--angle', `${i * 30}deg`);
        heart.style.setProperty('--distance', `${Math.random() * 100 + 150}px`);
        document.body.appendChild(heart);
        setTimeout(() => document.body.removeChild(heart), 1500);
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

// 添加新的功能：双击文字产生爱心环绕效果
document.querySelector('.love-text').addEventListener('dblclick', function(e) {
    const centerX = e.clientX;
    const centerY = e.clientY;
    const radius = 100;
    const totalHearts = 16;
    
    for (let i = 0; i < totalHearts; i++) {
        const angle = (i / totalHearts) * Math.PI * 2;
        const heart = document.createElement('span');
        heart.innerHTML = '💝';
        heart.className = 'floating-heart spiral-heart';
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.setProperty('--angle', angle + 'rad');
        
        document.body.appendChild(heart);
        setTimeout(() => document.body.removeChild(heart), 2000);
    }
});

// 添加新功能：按住空格键时文字会发光并产生粒子效果
let isSpacePressed = false;
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !isSpacePressed) {
        isSpacePressed = true;
        const loveText = document.querySelector('.love-text');
        loveText.classList.add('glowing');
        startParticleEffect(loveText);
    }
});

document.addEventListener('keyup', function(e) {
    if (e.code === 'Space') {
        isSpacePressed = false;
        const loveText = document.querySelector('.love-text');
        loveText.classList.remove('glowing');
    }
});

function startParticleEffect(element) {
    if (!isSpacePressed) return;
    
    const rect = element.getBoundingClientRect();
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = rect.left + Math.random() * rect.width + 'px';
    particle.style.top = rect.top + Math.random() * rect.height + 'px';
    
    document.body.appendChild(particle);
    setTimeout(() => document.body.removeChild(particle), 1000);
    
    requestAnimationFrame(() => startParticleEffect(element));
}

// 修改鼠标悬停效果
document.addEventListener('DOMContentLoaded', () => {
    const loveText = document.querySelector('.love-text');
    if (loveText) {
        let isHovering = false;
        let lastHeart = null;
        
        function createHoverHeart(e) {
            if (!isHovering) return;
            
            // 如果存在上一个爱心，先移除它
            if (lastHeart && lastHeart.parentNode) {
                lastHeart.parentNode.removeChild(lastHeart);
            }
            
            const heart = document.createElement('span');
            heart.innerHTML = '❤️';
            heart.className = 'hover-heart';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            
            document.body.appendChild(heart);
            lastHeart = heart;
            
            // 自动移除爱心
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 500);
        }

        loveText.addEventListener('mousemove', (e) => {
            if (isHovering) {
                requestAnimationFrame(() => createHoverHeart(e));
            }
        });

        loveText.addEventListener('mouseenter', (e) => {
            isHovering = true;
            createHoverHeart(e);
        });

        loveText.addEventListener('mouseleave', () => {
            isHovering = false;
            if (lastHeart && lastHeart.parentNode) {
                lastHeart.parentNode.removeChild(lastHeart);
            }
        });
    }
});

// 添加新功能：摇一摇效果
let lastUpdate = 0;
let lastX = 0;
let lastY = 0;
let lastZ = 0;
const SHAKE_THRESHOLD = 15;

window.addEventListener('devicemotion', function(event) {
    const current = Date.now();
    if ((current - lastUpdate) > 100) {
        const diffTime = current - lastUpdate;
        lastUpdate = current;
        
        const acceleration = event.accelerationIncludingGravity;
        const x = acceleration.x;
        const y = acceleration.y;
        const z = acceleration.z;
        
        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
        
        if (speed > SHAKE_THRESHOLD) {
            createShakeEffect();
        }
        
        lastX = x;
        lastY = y;
        lastZ = z;
    }
});

function createShakeEffect() {
    const loveText = document.querySelector('.love-text');
    loveText.classList.add('shake-effect');
    createHeartExplosion();
    setTimeout(() => loveText.classList.remove('shake-effect'), 1000);
}

function createHeartExplosion() {
    const hearts = ['❤️', '💖', '💗', '💓', '💕', '💝', '💘', '💞'];
    const container = document.createElement('div');
    container.className = 'heart-explosion';
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.setProperty('--rotate', `${Math.random() * 360}deg`);
        heart.style.setProperty('--speed', `${Math.random() * 2 + 1}s`);
        heart.style.setProperty('--delay', `${Math.random() * 0.5}s`);
        container.appendChild(heart);
    }
    
    document.body.appendChild(container);
    setTimeout(() => document.body.removeChild(container), 2000);
}

// 添加新功能：长按文字产生爱心烟花
let pressTimer;
let isPressing = false;

document.querySelector('.love-text').addEventListener('mousedown', function(e) {
    isPressing = true;
    pressTimer = setInterval(() => {
        if (isPressing) {
            createHeartFirework(e.clientX, e.clientY);
        }
    }, 100);
});

document.querySelector('.love-text').addEventListener('mouseup', function() {
    isPressing = false;
    clearInterval(pressTimer);
});

document.querySelector('.love-text').addEventListener('mouseleave', function() {
    isPressing = false;
    clearInterval(pressTimer);
});

function createHeartFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'heart-firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('span');
        spark.style.setProperty('--angle', `${i * 30}deg`);
        firework.appendChild(spark);
    }
    
    document.body.appendChild(firework);
    setTimeout(() => document.body.removeChild(firework), 1000);
}

// 定义常量
const STORAGE_KEY = 'cardSystem';
const INITIAL_DRAWS = 3;
const DAILY_DRAWS_LIMIT = 3;  // 每日可领取的抽卡次数
const LAST_CLAIM_DATE_KEY = 'lastClaimDate';  // 添加这行

const ACTIVATION_CODES = {
    'cyxsyx': 1,      // 普通激活码
    'cyxsyx999': 999, // 特殊激活码
    'owen': 10,       // owen激活码
    'owen1': 10,      // owen1激活码
    'syx': 10,        // 宋亚轩老婆专属激活码
    'syxlp': 999      // 宋亚轩老婆至尊激活码
};

// 修改特殊码定义
const SPECIAL_CODES = {
    'owen': { 
        type: 'SSR_BOOST', 
        duration: 5 * 60 * 1000,
        draws: 10,
        rates: {
            SSR: 1,    // 100%
            SR: 0,
            R: 0,
            OR: 0
        }
    },
    'owen1': { 
        type: 'HR_BOOST', 
        duration: 60 * 1000,
        draws: 10,
        rates: {
            HR: 1,     // 100%
            SSR: 0,
            SR: 0,
            R: 0,
            OR: 0
        }
    },
    'syx': { 
        type: 'SSR_BOOST', 
        duration: 10 * 60 * 1000,
        draws: 10,
        rates: {
            SSR: 1,
            SR: 0,
            R: 0,
            OR: 0
        }
    },
    'syxlp': { 
        type: 'SSR_BOOST', 
        duration: 30 * 60 * 1000,
        draws: 999,
        rates: {
            SSR: 1,
            SR: 0,
            R: 0,
            OR: 0
        }
    }
};

// 定义抽卡概率
const DRAW_RATES = {
    SINGLE: {
        NORMAL: {
            SSR: 0.02,  // 2%
            SR: 0.18,   // 18%
            R: 0.75,    // 75%
            OR: 0.05    // 5%
        },
        BOOSTED_SSR: {
            SSR: 0.04,  // 4%
            SR: 0.18,   // 18%
            R: 0.73,    // 73%
            OR: 0.05    // 5%
        },
        BOOSTED_HR: {
            SSR: 0.02,  // 2%
            SR: 0.18,   // 18%
            R: 0.70,    // 70%
            HR: 0.05,   // 5%
            OR: 0.05    // 5%
        }
    },
    MULTI: {
        NORMAL: {
            SSR: 0.03,  // 3%
            SR: 0.20,   // 20%
            R: 0.72,    // 72%
            OR: 0.05    // 5%
        },
        BOOSTED_SSR: {
            SSR: 0.06,  // 6%
            SR: 0.20,   // 20%
            R: 0.69,    // 69%
            OR: 0.05    // 5%
        },
        BOOSTED_HR: {
            SSR: 0.03,  // 3%
            SR: 0.20,   // 20%
            R: 0.67,    // 67%
            HR: 0.05,   // 5%
            OR: 0.05    // 5%
        }
    }
};

// 修改全局变量
let boostType = null;  // 'SSR' 或 'HR' 或 null
let boostEndTime = null;

// 修改初始化系统函数
function initCardSystem() {
    let system = localStorage.getItem(STORAGE_KEY);
    const defaultSystem = {
        remainingDraws: INITIAL_DRAWS,
        cardInventory: {
            R: 0,
            SR: 0,
            SSR: 0,
            OR: 0,
            HR: 0  // 添加HR卡库存
        },
        hasDiscoveredOR: false,
        unlockedCards: [],
        exchangeCount: 0,
        hasUnlockedPhoto: false  // 添加照片解锁状态
    };

    if (!system) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSystem));
        return defaultSystem;
    }

    try {
        system = JSON.parse(system);
        system.cardInventory = system.cardInventory || defaultSystem.cardInventory;
        system.cardInventory.HR = system.cardInventory.HR || 0;  // 确保HR属性存在
        system.hasDiscoveredOR = system.hasDiscoveredOR || false;
        system.hasUnlockedPhoto = system.hasUnlockedPhoto || false;
        system.remainingDraws = system.remainingDraws ?? defaultSystem.remainingDraws;
        system.unlockedCards = system.unlockedCards || defaultSystem.unlockedCards;
        system.exchangeCount = system.exchangeCount || defaultSystem.exchangeCount;

        return system;
    } catch (e) {
        console.error('系统数据损坏，重置系统:', e);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSystem));
        return defaultSystem;
    }
}

// 修改抽卡函数
function performDraw(isMulti = false) {
    console.log('开始执行抽卡');
    let system = initCardSystem();
    
    const drawCost = isMulti ? 10 : 1;
    if (system.remainingDraws < drawCost) {
        showMessage(`抽卡次数不足，需要${drawCost}次`);
        return;
    }

    // 检查概率提升状态
    const now = Date.now();
    const isBoostActive = boostType && boostEndTime && now < boostEndTime;
    console.log('概率提升状态:', isBoostActive, boostType);

    // 如果概率提升已过期，清除状态
    if (boostType && boostEndTime && now >= boostEndTime) {
        boostType = null;
        boostEndTime = null;
        localStorage.removeItem('boostType');
        localStorage.removeItem('boostEndTime');
        localStorage.removeItem('boostRates');
    }

    // 使用提升概率或默认概率
    let currentRates;
    if (isBoostActive && window.boostRates) {
        currentRates = window.boostRates;
        console.log('使用提升概率:', currentRates);
    } else {
        currentRates = isMulti ? DRAW_RATES.MULTI.NORMAL : DRAW_RATES.SINGLE.NORMAL;
        console.log('使用默认概率:', currentRates);
    }

    // 防止重复点击
    const buttons = document.querySelectorAll('.draw-button');
    buttons.forEach(btn => btn.disabled = true);

    const results = [];
    // 执行抽卡
    for (let i = 0; i < (isMulti ? 10 : 1); i++) {
        const random = Math.random();
        let cardRarity;
        let sum = 0;
        
        // 概率计算
        for (const [rarity, rate] of Object.entries(currentRates)) {
            sum += rate;
            if (random <= sum) {
                cardRarity = rarity;
                break;
            }
        }

        console.log(`抽卡结果: random=${random}, cardRarity=${cardRarity}`);
        results.push(cardRarity);
        system.cardInventory[cardRarity] = (system.cardInventory[cardRarity] || 0) + 1;
    }

    // 更新抽卡次数
    system.remainingDraws -= drawCost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
    updateDisplay();
    showDrawAnimation(results, isMulti);

    setTimeout(() => {
        buttons.forEach(btn => btn.disabled = false);
    }, isMulti ? 4000 : 2000);
}

// 修改抽卡动画
function showDrawAnimation(results, isMulti) {
    const overlay = document.createElement('div');
    overlay.className = 'draw-overlay';
    
    if (isMulti) {
        // 十连抽动画
        overlay.innerHTML = `
            <div class="multi-draw-animation">
                ${results.map((rarity, index) => `
                    <div class="card-reveal ${rarity.toLowerCase()}" data-index="${index}">
                        <div class="card-back"></div>
                        <div class="card-front">
                            <span class="card-type ${rarity.toLowerCase()}">${rarity === 'OR' ? '隐藏卡片' : rarity}</span>
                            <div class="card-glow ${rarity.toLowerCase()}-glow"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="draw-controls">
                <button class="reveal-all-btn">全部翻开</button>
            </div>
        `;

        let revealedCount = 0;
        const cards = overlay.querySelectorAll('.card-reveal');
        
        // 修改卡片点击事件
        cards.forEach(card => {
            card.addEventListener('click', function() {
                if (!this.classList.contains('show')) {
                    this.classList.add('show');
                    
                    // 根据卡片稀有度添加不同特效
                    const rarity = this.classList[1];
                    if (rarity === 'ssr' || rarity === 'or') {
                        // 先添加震撼效果
                        document.body.classList.add('screen-flash');
                        this.classList.add('epic-reveal');
                        
                        // 添加光柱效果
                        createLightPillar(this);
                        
                        // 添加环绕光环
                        createCircularGlow(this);
                        
                        if (rarity === 'ssr') {
                            // SSR专属金色粒子
                            createGoldenParticles(this);
                        } else {
                            // OR专属彩虹特效
                            createRainbowEffect(this);
                            createColorfulFireworks();
                        }
                        
                        // 移除特效class
                        setTimeout(() => {
                            document.body.classList.remove('screen-flash');
                            this.classList.remove('epic-reveal');
                        }, 1500);
                    }
                    
                    revealedCount++;
                    
                    if (revealedCount === results.length) {
                        setTimeout(() => {
                            overlay.classList.add('fade-out');
                            setTimeout(() => {
                                overlay.remove();
                                showMessage(`获得: ${results.map(r => r === 'OR' ? '隐藏卡片' : r).join(', ')}`);
                            }, 500);
                        }, 1000);
                    }
                }
            });

            // 添加悬停特效
            card.addEventListener('mouseover', function() {
                if (!this.classList.contains('show')) {
                    this.classList.add('hover-effect');
                }
            });

            card.addEventListener('mouseout', function() {
                this.classList.remove('hover-effect');
            });
        });

        // 修改全部翻开按钮事件
        overlay.querySelector('.reveal-all-btn').addEventListener('click', () => {
            const button = overlay.querySelector('.reveal-all-btn');
            button.disabled = true;  // 禁用按钮
            
            // 添加翻转动画
            cards.forEach((card, index) => {
                setTimeout(() => {
                    if (!card.classList.contains('show')) {
                        card.classList.add('show');
                        
                        // 根据卡片稀有度添加特效
                        const rarity = card.classList[1];
                        if (rarity === 'ssr' || rarity === 'or') {
                            // 添加震撼效果
                            document.body.classList.add('screen-flash');
                            card.classList.add('epic-reveal');
                            
                            // 添加特效
                            createLightPillar(card);
                            createCircularGlow(card);
                            
                            if (rarity === 'ssr') {
                                createGoldenParticles(card);
                            } else {
                                createRainbowEffect(card);
                                createColorfulFireworks();
                            }
                            
                            // 移除特效
                            setTimeout(() => {
                                document.body.classList.remove('screen-flash');
                                card.classList.remove('epic-reveal');
                            }, 1500);
                        }
                    }
                }, index * 300); // 增加间隔时间
            });
            
            // 等待所有卡片翻转完成后移除遮罩
            setTimeout(() => {
                overlay.classList.add('fade-out');
                setTimeout(() => {
                    overlay.remove();
                    showMessage(`获得: ${results.map(r => r === 'OR' ? '隐藏卡片' : r).join(', ')}`);
                }, 500);
            }, cards.length * 300 + 1000);
        });
    } else {
        // 单抽动画
        overlay.innerHTML = `
            <div class="draw-animation">
                <div class="card-reveal ${results[0].toLowerCase()}">
                    <div class="card-back"></div>
                    <div class="card-front">
                        <span class="card-type ${results[0].toLowerCase()}">${results[0] === 'OR' ? '隐藏卡片' : results[0]}</span>
                        <div class="card-glow ${results[0].toLowerCase()}-glow"></div>
                    </div>
                </div>
            </div>
        `;

        // 点击卡片翻开
        const card = overlay.querySelector('.card-reveal');
        card.addEventListener('click', function() {
            if (!this.classList.contains('show')) {
                this.classList.add('show');
                
                // 根据卡片稀有度添加不同特效
                const rarity = this.classList[1];
                if (rarity === 'ssr' || rarity === 'or') {
                    // 先添加震撼效果
                    document.body.classList.add('screen-flash');
                    this.classList.add('epic-reveal');
                    
                    // 添加光柱效果
                    createLightPillar(this);
                    
                    // 添加环绕光环
                    createCircularGlow(this);
                    
                    if (rarity === 'ssr') {
                        // SSR专属金色粒子
                        createGoldenParticles(this);
                    } else {
                        // OR专属彩虹特效
                        createRainbowEffect(this);
                        createColorfulFireworks();
                    }
                    
                    // 移除特效class
                    setTimeout(() => {
                        document.body.classList.remove('screen-flash');
                        this.classList.remove('epic-reveal');
                    }, 1500);
                }
                
                setTimeout(() => {
                    overlay.remove();
                    showMessage(`获得了 ${results[0] === 'OR' ? '隐藏卡片' : results[0]} 卡片！`);
                }, 1000);
            }
        });
    }
    
    document.body.appendChild(overlay);
}

// 显示消息
function showMessage(text) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.zIndex = '10000';
    message.style.background = 'rgba(0, 0, 0, 0.8)';
    message.style.color = 'white';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '18px';
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}

// 修改更新显示函数
function updateDisplay() {
    const system = initCardSystem();
    
    // 更新抽卡次数
    const drawCount = document.querySelector('.draw-count');
    if (drawCount) {
        drawCount.textContent = system.remainingDraws >= 0 ? system.remainingDraws : 0;
    }

    // 更新卡片库存和按钮状态
    const inventoryItems = document.querySelectorAll('.inventory-item');
    inventoryItems.forEach(item => {
        if (item.classList.contains('or-card')) {
            // 处理OR卡片显示
            if (system.hasDiscoveredOR) {
                item.style.display = 'flex';
                const countSpan = item.querySelector('.card-count');
                if (countSpan) {
                    countSpan.textContent = `${system.cardInventory.OR || 0} 张`;
                }
            } else {
                item.style.display = 'none';
            }
        } else {
            // 处理其他卡片
            const type = item.querySelector('.card-type').textContent.split(' ')[0];
            const countSpan = item.querySelector('.card-count');
            const combineButton = item.querySelector('.combine-button');
            
            const count = system.cardInventory[type] || 0;
            countSpan.textContent = `${count} 张`;
            
            // 更新按钮状态
            if (combineButton) {
                if (type === 'R') {
                    combineButton.disabled = count < 10;
                } else if (type === 'SR') {
                    combineButton.disabled = count < 10;
                } else if (type === 'SSR') {
                    combineButton.disabled = count < 3;
                }
            }
        }
    });

    // 添加兑换次数
    const exchangeCount = document.querySelector('.exchange-count');
    if (exchangeCount) {
        exchangeCount.textContent = `已兑换: ${system.exchangeCount}/3 次`;
    }

    // 更新HR卡片进度
    const hrProgress = document.querySelector('.hr-progress');
    if (hrProgress) {
        hrProgress.textContent = `收集进度: ${system.cardInventory.HR || 0}/10`;
    }

    // 更新SSR卡片兑换按钮状态和文本
    const ssrSection = document.querySelector('.inventory-item:has(.card-type.ssr)');
    if (ssrSection) {
        const ssrButton = ssrSection.querySelector('.combine-button');
        const exchangeCount = ssrSection.querySelector('.exchange-count');
        
        if (system.exchangeCount >= 3) {
            // 修改按钮文本和状态
            ssrButton.textContent = '兑换HR卡片';
            ssrButton.disabled = system.cardInventory.SSR < 3;
        } else {
            ssrButton.textContent = '兑换微信号 (需要3张)';
            ssrButton.disabled = system.cardInventory.SSR < 3;
        }
        
        if (exchangeCount) {
            exchangeCount.textContent = `已兑换: ${system.exchangeCount}/3 次`;
        }
    }

    // 更新HR卡片兑换按钮状态
    const hrButton = document.querySelector('.inventory-item.hr-card .combine-button');
    if (hrButton) {
        hrButton.disabled = (system.cardInventory.HR || 0) < 10;
    }
}

// 修改合成卡片函数
function combineCards(rarity) {
    const system = initCardSystem();
    
    // 处理 SSR 卡片的特殊兑换逻辑
    if (rarity === 'SSR') {
        if (system.exchangeCount >= 3) {
            if (system.cardInventory.SSR >= 3) {
                system.cardInventory.SSR -= 3;
                system.cardInventory.HR = (system.cardInventory.HR || 0) + 1;
                system.exchangeCount = 0; // 重置兑换次数
                showHRCardAnimation();
                
                // 检查是否可以解锁照片
                if (system.cardInventory.HR >= 10) {
                    system.hasUnlockedPhoto = true;
                    system.cardInventory.HR -= 10;
                    showPhotoReveal();
                    showMessage('恭喜获得HR卡并解锁照片！');
                } else {
                    showMessage(`获得了一张HR卡！还需要${10 - system.cardInventory.HR}张可以解锁照片哦~`);
                }
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
                updateDisplay();
            } else {
                showMessage('SSR卡数量不足，需要3张');
            }
            return;
        }
        
        if (system.cardInventory.SSR >= 3) {
            system.cardInventory.SSR -= 3;
            system.exchangeCount++;
            showWechatReveal();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
            updateDisplay();
            showMessage(`兑换成功！剩余兑换次数：${3 - system.exchangeCount}次`);
        } else {
            showMessage('SSR卡数量不足，需要3张');
        }
        return;
    }
    
    // 其他卡片的合成逻辑
    const requirements = {
        'R': { cost: 10, result: 'SR' },
        'SR': { cost: 10, result: 'SSR' }
    };
    
    const config = requirements[rarity];
    if (config && system.cardInventory[rarity] >= config.cost) {
        system.cardInventory[rarity] -= config.cost;
        system.cardInventory[config.result] = (system.cardInventory[config.result] || 0) + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
        updateDisplay();
        showMessage(`合成成功！获得1张${config.result}卡`);
    } else {
        showMessage(`${rarity}卡数量不足，需要${config?.cost || 0}张`);
    }
}

// 修改微信号展示动画
function showWechatReveal() {
    const overlay = document.createElement('div');
    overlay.className = 'wechat-reveal-overlay';
    overlay.innerHTML = `
        <div class="wechat-reveal-animation">
            <h2>恭喜解锁微信号！</h2>
            <div class="wechat-code">
                <p>程雅馨的微信号：</p>
                <p class="wechat-id">TNTsyxcyx1222</p>
            </div>
            <button class="close-reveal">关闭</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.querySelector('.close-reveal').addEventListener('click', () => {
        overlay.remove();
    });
}

// 修改心形环绕效果
function createHeartCircle(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = 120;
    const hearts = ['❤️', '💖', '💗', '💓', '💕'];
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'circle-heart';
        heart.style.fontSize = '36px';
        heart.style.setProperty('--angle', `${i * 30}deg`);
        heart.style.setProperty('--radius', `${radius}px`);
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        document.body.appendChild(heart);
        
        setTimeout(() => document.body.removeChild(heart), 2000);
    }
}

// 添加烟花特效
function createFireworkEffect() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            createColorfulFirework(x, y);
        }, i * 300);
    }
}

function createColorfulFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    for (let i = 0; i < 24; i++) {
        const spark = document.createElement('span');
        spark.style.setProperty('--angle', `${i * 15}deg`);
        spark.style.setProperty('--hue', `${Math.random() * 360}deg`);
        firework.appendChild(spark);
    }
    
    document.body.appendChild(firework);
    setTimeout(() => document.body.removeChild(firework), 1000);
}

// 添加卡片闪光特效
function addSparkleEffect(card) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.style.setProperty('--delay', `${i * 0.1}s`);
        sparkle.appendChild(spark);
    }
    
    card.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// 添加迷你烟花特效
function createMiniFireworks(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'mini-firework';
        particle.style.setProperty('--angle', `${i * 45}deg`);
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// 添加粒子爆炸效果
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
        particle.style.setProperty('--speed', `${Math.random() * 200 + 300}px`);
        particle.style.setProperty('--size', `${Math.random() * 8 + 4}px`);
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// 添加彩虹光环效果
function createRainbowRing(element) {
    const ring = document.createElement('div');
    ring.className = 'rainbow-ring';
    element.appendChild(ring);
    
    setTimeout(() => ring.remove(), 2000);
}

// 添加绚丽烟花效果
function createColorfulFireworks() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);
            createLargeFirework(x, y);
        }, i * 200);
    }
}

function createLargeFirework(x, y) {
    const container = document.createElement('div');
    container.className = 'large-firework';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    
    for (let i = 0; i < 36; i++) {
        const spark = document.createElement('div');
        spark.className = 'large-spark';
        spark.style.setProperty('--angle', `${i * 10}deg`);
        spark.style.setProperty('--hue', `${Math.random() * 360}deg`);
        container.appendChild(spark);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2000);
}

// 添加光柱效果
function createLightPillar(element) {
    const pillar = document.createElement('div');
    pillar.className = 'light-pillar';
    element.appendChild(pillar);
    
    setTimeout(() => pillar.remove(), 2000);
}

// 添加环绕光环
function createCircularGlow(element) {
    const glow = document.createElement('div');
    glow.className = 'circular-glow';
    element.appendChild(glow);
    
    setTimeout(() => glow.remove(), 2000);
}

// 添加金色粒子
function createGoldenParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'golden-particle';
        particle.style.setProperty('--angle', `${Math.random() * 360}deg`);
        particle.style.setProperty('--distance', `${Math.random() * 150 + 100}px`);
        particle.style.setProperty('--delay', `${Math.random() * 0.5}s`);
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// 添加彩虹效果
function createRainbowEffect(element) {
    const rainbow = document.createElement('div');
    rainbow.className = 'rainbow-effect';
    element.appendChild(rainbow);
    
    // 添加闪耀效果
    const shine = document.createElement('div');
    shine.className = 'shine-effect';
    element.appendChild(shine);
    
    setTimeout(() => {
        rainbow.remove();
        shine.remove();
    }, 2000);
}

// 修改照片展示函数
function showPhotoReveal() {
    const overlay = document.createElement('div');
    overlay.className = 'photo-reveal-overlay';
    overlay.innerHTML = `
        <div class="photo-reveal-animation">
            <h2>恭喜解锁照片！</h2>
            <div class="photo-container">
                <img src="data:image/jpeg;base64,${getPhotoBase64()}" alt="CYX的照片">
            </div>
            <p class="photo-description">这是一张珍贵的照片，请好好珍惜~</p>
            <div class="photo-actions">
                <button class="download-photo">下载照片</button>
                <button class="close-reveal">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // 添加下载功能
    overlay.querySelector('.download-photo').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${getPhotoBase64()}`;
        link.download = 'cyx_photo.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    overlay.querySelector('.close-reveal').addEventListener('click', () => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
    });
}

// 获取照片base64编码
function getPhotoBase64() {
    // 这里返回图片的base64编码
    return '/9j/4AAQSkZJRgABAQEASABIAAD/...'; // 这里是实际图片的base64编码，为了简洁省略了
}

// 添加HR卡片获得动画
function showHRCardAnimation() {
    const overlay = document.createElement('div');
    overlay.className = 'hr-card-overlay';
    
    overlay.innerHTML = `
        <div class="hr-card-reveal">
            <div class="hr-card-content">
                <div class="hr-card-glow"></div>
                <div class="hr-card-sparkles"></div>
                <span class="hr-card-text">HR</span>
                <div class="hr-card-hearts"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // 添加心形粒子
    const hearts = overlay.querySelector('.hr-card-hearts');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.setProperty('--delay', `${Math.random() * 2}s`);
        heart.style.setProperty('--start-pos', `${Math.random() * 100}%`);
        hearts.appendChild(heart);
    }
    
    // 添加闪光效果
    const sparkles = overlay.querySelector('.hr-card-sparkles');
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'hr-sparkle';
        sparkle.style.setProperty('--angle', `${Math.random() * 360}deg`);
        sparkle.style.setProperty('--delay', `${Math.random()}s`);
        sparkles.appendChild(sparkle);
    }
    
    // 3秒后移除动画
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 1000);
    }, 3000);
}

// 添加宋亚轩老婆相关动画效果
function showSYXAnimation() {
    // 创建动画容器
    const animContainer = document.createElement('div');
    animContainer.className = 'syx-animation';
    
    // 添加副标题
    const subtitle = document.createElement('div');
    subtitle.className = 'syx-subtitle';
    subtitle.textContent = '师大附中国际部学生';
    animContainer.appendChild(subtitle);
    
    // 创建心形容器
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'syx-hearts';
    
    // 添加多个心形
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'syx-heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heartsContainer.appendChild(heart);
    }
    
    animContainer.appendChild(heartsContainer);
    document.body.appendChild(animContainer);
    
    // 3秒后移除动画
    setTimeout(() => {
        document.body.removeChild(animContainer);
    }, 3000);
}

// 修改激活码处理函数
function handleActivationCode(code) {
    if (!code) {
        showMessage('请输入激活码');
        return;
    }

    code = code.toLowerCase().trim();
    console.log('处理激活码:', code);
    
    // 检查是否是特殊概率提升码
    if (SPECIAL_CODES[code]) {
        const specialEffect = SPECIAL_CODES[code];
        
        // 设置概率提升
        window.boostType = specialEffect.type.split('_')[0];
        window.boostEndTime = Date.now() + specialEffect.duration;
        window.boostRates = specialEffect.rates;
        
        // 添加抽卡次数
        let system = initCardSystem();
        system.remainingDraws += specialEffect.draws;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
        updateDisplay();

        // 保存状态
        localStorage.setItem('boostType', window.boostType);
        localStorage.setItem('boostEndTime', window.boostEndTime.toString());
        localStorage.setItem('boostRates', JSON.stringify(window.boostRates));

        // 显示特效
        if (specialEffect.draws >= 999) {
            showSYXAnimation();
        }
        
        const minutes = Math.floor(specialEffect.duration / 60000);
        showMessage(`激活${window.boostType}概率提升！持续${minutes}分钟，获得${specialEffect.draws}次抽卡机会！`);
        return;
    }
    
    // 处理普通激活码
    if (ACTIVATION_CODES[code]) {
        let system = initCardSystem();
        const draws = ACTIVATION_CODES[code];
        system.remainingDraws += draws;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
        updateDisplay();
        showMessage(`激活码使用成功！获得${draws}次抽卡机会`);
        return;
    }
    
    showMessage('无效的激活码');
}

// 添加每日抽卡机会领取函数
function checkAndAddDailyDraws() {
    const today = new Date().toDateString();
    const lastClaimDate = localStorage.getItem(LAST_CLAIM_DATE_KEY);
    
    if (lastClaimDate !== today) {
        const system = initCardSystem();
        system.remainingDraws += DAILY_DRAWS_LIMIT;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
        localStorage.setItem(LAST_CLAIM_DATE_KEY, today);
        
        showMessage(`每日登录奖励！获得${DAILY_DRAWS_LIMIT}次抽卡机会`);
        updateDisplay();
    }
}

// 修改页面加载完成后的初始化代码
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成');
    
    // 初始化显示
    updateDisplay();
    
    // 移除原有的onclick属性绑定
    const buttons = document.querySelectorAll('.draw-button');
    buttons.forEach(btn => btn.removeAttribute('onclick'));
    
    // 重新绑定抽卡按钮事件
    const singleDrawBtn = document.querySelector('.draw-button:not(.multi-draw)');
    const multiDrawBtn = document.querySelector('.draw-button.multi-draw');
    
    if (singleDrawBtn) {
        singleDrawBtn.addEventListener('click', () => performDraw(false));
    }
    
    if (multiDrawBtn) {
        multiDrawBtn.addEventListener('click', () => performDraw(true));
    }
    
    // 绑定合成按钮事件
    const combineButtons = document.querySelectorAll('.combine-button');
    combineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rarity = button.getAttribute('data-rarity');
            combineCards(rarity);
        });
    });
    
    // 检查每日抽卡机会
    checkAndAddDailyDraws();
    
    // 激活码相关
    const activateButton = document.querySelector('.activate-button');
    const codeInput = document.querySelector('.code-input');
    
    // 调试输出
    console.log('激活按钮元素:', activateButton);
    console.log('输入框元素:', codeInput);
    
    if (activateButton && codeInput) {
        console.log('找到激活码相关元素');
        
        activateButton.addEventListener('click', () => {
            console.log('激活按钮被点击');
            const code = codeInput.value;
            console.log('输入的激活码:', code);
            handleActivationCode(code);
            codeInput.value = '';
        });

        codeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('按下回车键');
                const code = codeInput.value;
                console.log('输入的激活码:', code);
                handleActivationCode(code);
                codeInput.value = '';
            }
        });
    } else {
        console.error('未找到激活码相关元素');
    }

    // 恢复概率提升状态
    boostType = localStorage.getItem('boostType');
    boostEndTime = parseInt(localStorage.getItem('boostEndTime'));
    
    // 检查概率提升是否过期
    if (boostType && boostEndTime) {
        const now = Date.now();
        if (now >= boostEndTime) {
            // 清除过期的概率提升
            boostType = null;
            boostEndTime = null;
            localStorage.removeItem('boostType');
            localStorage.removeItem('boostEndTime');
        } else {
            // 显示剩余时间
            const remainingTime = Math.floor((boostEndTime - now) / 1000);
            showMessage(`${boostType}概率提升中！剩余${Math.floor(remainingTime / 60)}分${remainingTime % 60}秒`);
        }
    }
});

// 修改兑换功能
function exchangeHR() {
    let system = initCardSystem();
    
    // 检查是否有足够的卡片
    if (!system.cardInventory.SSR || system.cardInventory.SSR < 3) {
        showMessage('需要3张SSR卡片才能兑换1张HR卡片');
        return;
    }
    
    // 执行兑换
    system.cardInventory.SSR -= 3;
    system.cardInventory.HR = (system.cardInventory.HR || 0) + 1;
    
    // 保存状态
    localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
    
    // 更新显示
    updateDisplay();
    
    // 显示成功消息和特效
    showMessage('成功兑换1张HR卡片！');
    createFireworkEffect();
    
    // 添加兑换成功动画
    const hrAnimation = document.createElement('div');
    hrAnimation.className = 'hr-exchange-animation';
    document.body.appendChild(hrAnimation);
    
    setTimeout(() => {
        document.body.removeChild(hrAnimation);
    }, 2000);
} 