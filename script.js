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
const ACTIVATION_CODE = 'cyxsyx';

// 抽卡概率设置
const DRAW_RATES = {
    R: 0.80,    // 80%概率抽到R
    SR: 0.15,   // 15%概率抽到SR
    SSR: 0.05   // 5%概率抽到SSR
};

// 初始化系统
function initCardSystem() {
    let system = localStorage.getItem(STORAGE_KEY);
    const defaultSystem = {
        remainingDraws: INITIAL_DRAWS,
        cardInventory: {
            R: 0,
            SR: 0,
            SSR: 0
        },
        unlockedCards: []
    };

    if (!system) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSystem));
        return defaultSystem;
    }

    try {
        system = JSON.parse(system);
        // 确保所有必要的属性都存在
        system.cardInventory = system.cardInventory || defaultSystem.cardInventory;
        system.remainingDraws = system.remainingDraws ?? defaultSystem.remainingDraws;
        system.unlockedCards = system.unlockedCards || defaultSystem.unlockedCards;

        // 确保所有卡片类型都存在
        system.cardInventory.R = system.cardInventory.R || 0;
        system.cardInventory.SR = system.cardInventory.SR || 0;
        system.cardInventory.SSR = system.cardInventory.SSR || 0;

        return system;
    } catch (e) {
        console.error('系统数据损坏，重置系统:', e);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSystem));
        return defaultSystem;
    }
}

// 修改抽卡函数
function performDraw() {
    console.log('开始执行抽卡');
    let system = initCardSystem();
    
    if (system.remainingDraws <= 0) {
        showMessage('抽卡次数不足');
        return;
    }

    // 随机抽取卡片稀有度
    const random = Math.random();
    let cardRarity;
    if (random < DRAW_RATES.R) {
        cardRarity = 'R';
    } else if (random < DRAW_RATES.R + DRAW_RATES.SR) {
        cardRarity = 'SR';
    } else {
        cardRarity = 'SSR';
    }

    // 更新库存
    system.cardInventory[cardRarity]++;
    system.remainingDraws--;

    // 立即保存状态
    localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
    
    // 立即更新显示
    updateDisplay();
    
    // 显示动画
    showDrawAnimation(cardRarity);
}

// 显示抽卡动画
function showDrawAnimation(cardRarity) {
    const overlay = document.createElement('div');
    overlay.className = 'draw-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    
    overlay.innerHTML = `
        <div class="draw-animation">
            <div class="card-reveal ${cardRarity.toLowerCase()}">
                <span class="card-type ${cardRarity.toLowerCase()}">${cardRarity}</span>
                <h3>${cardRarity} 卡片</h3>
                <p>恭喜获得！</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
        showMessage(`获得了 ${cardRarity} 卡片！`);
    }, 2000);
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
        const type = item.querySelector('.card-type').textContent.split(' ')[0];
        const countSpan = item.querySelector('.card-count');
        const combineButton = item.querySelector('.combine-button');
        
        const count = system.cardInventory[type] || 0;
        countSpan.textContent = `${count} 张`;
        
        // 更新按钮状态
        if (type === 'R') {
            combineButton.disabled = count < 10;
        } else if (type === 'SR') {
            combineButton.disabled = count < 10;
        } else if (type === 'SSR') {
            combineButton.disabled = count < 3;
        }
    });
}

// 合成卡片
function combineCards(rarity) {
    const system = initCardSystem();
    
    switch(rarity) {
        case 'R':
            if (system.cardInventory.R >= 10) {
                system.cardInventory.R -= 10;
                system.cardInventory.SR += 1;
                showMessage('成功将10张R卡合成为1张SR卡！');
            } else {
                showMessage('R卡数量不足，需要10张');
            }
            break;
        case 'SR':
            if (system.cardInventory.SR >= 10) {
                system.cardInventory.SR -= 10;
                system.cardInventory.SSR += 1;
                showMessage('成功将10张SR卡合成为1张SSR卡！');
            } else {
                showMessage('SR卡数量不足，需要10张');
            }
            break;
        case 'SSR':
            if (system.cardInventory.SSR >= 3) {
                system.cardInventory.SSR -= 3;
                system.unlockedCards.push('wechat');
                showMessage('恭喜获得微信号！');
            } else {
                showMessage('SSR卡数量不足，需要3张');
            }
            break;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
    updateDisplay();
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

// 修改页面加载完成后的初始化代码
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成'); // 调试日志
    
    // 初始化显示
    updateDisplay();
    
    // 绑定抽卡按钮事件
    const drawButton = document.querySelector('.draw-button');
    console.log('抽卡按钮:', drawButton); // 调试日志
    
    if (drawButton) {
        drawButton.addEventListener('click', performDraw);
    }
    
    // 绑定合成按钮事件
    const combineButtons = document.querySelectorAll('.combine-button');
    combineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rarity = button.getAttribute('data-rarity');
            combineCards(rarity);
        });
    });
    
    // 绑定激活码按钮事件
    const activateButton = document.querySelector('.activate-button');
    const codeInput = document.querySelector('.code-input');
    
    if (activateButton && codeInput) {
        activateButton.addEventListener('click', () => {
            const code = codeInput.value.trim();
            if (code === ACTIVATION_CODE) {
                const system = initCardSystem();
                system.remainingDraws += 1;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(system));
                updateDisplay();
                showMessage('激活成功！获得1次抽卡机会');
                codeInput.value = '';
            } else {
                showMessage('激活码无效');
            }
        });
    }
}); 