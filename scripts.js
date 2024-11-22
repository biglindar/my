// scripts.js

// 生成雪花点
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow');
    const snowflakeCount = 100; // 雪花数量
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // 随机设置雪花大小
        const size = Math.random() * 5 + 2 + 'px';
        snowflake.style.width = size;
        snowflake.style.height = size;
        
        // 随机设置雪花的横向位置
        snowflake.style.left = Math.random() * 100 + 'vw';
        
        snowContainer.appendChild(snowflake);
    }
}

// 调用函数
createSnowflakes();
