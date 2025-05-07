// 题目折叠展开功能
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM完全加载');

    // 初始化DeepSeek API
    initializeDeepSeekAPI();

    // 初始化页面
    initializePage();

    // 确保筛选按钮正常工作
    setTimeout(function () {
        if (typeof forceFixFilterButtons === 'function') {
            forceFixFilterButtons();
        }
    }, 800);
});

// 当整个页面加载完成时，再次确保按钮正常工作
window.addEventListener('load', function () {
    console.log('整个页面加载完成，确保筛选按钮正常工作');

    // 设置全局DeepSeek查询
    setupGlobalDeepSeekQuery();

    // 设置API密钥功能
    setupApiKeyHandling();

    setTimeout(function () {
        if (typeof forceFixFilterButtons === 'function') {
            forceFixFilterButtons();
        }
    }, 300);
});

// DeepSeek API 配置
const DEEPSEEK_CONFIG = {
    API_KEY: '', // 将从用户输入或本地存储获取
    API_URL: 'https://api.deepseek.com/v1/chat/completions',
    MODEL: 'deepseek-chat'
};

/**
 * 设置API密钥处理
 */
function setupApiKeyHandling() {
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiKeyInput = document.getElementById('deepseek-api-key');
    const statusText = document.getElementById('api-key-status-text');

    // 从本地存储加载API密钥
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
        DEEPSEEK_CONFIG.API_KEY = savedApiKey;
        apiKeyInput.value = '••••••••••••••••••••';
        statusText.textContent = '已保存API密钥';
        statusText.className = 'api-key-valid';
        clearApiKeyBtn.style.display = 'block';
    }

    // 保存API密钥
    saveApiKeyBtn.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            statusText.textContent = '请输入有效的API密钥';
            statusText.className = 'api-key-invalid';
            return;
        }

        // 验证API密钥
        validateApiKey(apiKey).then(isValid => {
            if (isValid) {
                DEEPSEEK_CONFIG.API_KEY = apiKey;
                localStorage.setItem('deepseek_api_key', apiKey);
                apiKeyInput.value = '••••••••••••••••••••';
                statusText.textContent = 'API密钥有效并已保存';
                statusText.className = 'api-key-valid';
                clearApiKeyBtn.style.display = 'block';
            } else {
                statusText.textContent = 'API密钥无效，请检查后重试';
                statusText.className = 'api-key-invalid';
            }
        });
    });

    // 清除API密钥
    clearApiKeyBtn.addEventListener('click', function () {
        DEEPSEEK_CONFIG.API_KEY = '';
        localStorage.removeItem('deepseek_api_key');
        apiKeyInput.value = '';
        statusText.textContent = '已清除API密钥，AI功能不可用';
        statusText.className = '';
        clearApiKeyBtn.style.display = 'none';
    });
}

/**
 * 验证API密钥
 */
async function validateApiKey(apiKey) {
    try {
        const response = await fetch(DEEPSEEK_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.MODEL,
                messages: [{
                    role: "user",
                    content: "Hello"
                }],
                max_tokens: 5
            })
        });

        return response.ok;
    } catch (error) {
        console.error('验证API密钥时出错:', error);
        return false;
    }
}

/**
 * 初始化DeepSeek API
 */
function initializeDeepSeekAPI() {
    try {
        // 初始化DeepSeek模态框
        console.log('初始化DeepSeek模态框...');
        const modal = document.getElementById('deepseek-modal');
        const closeBtn = document.getElementById('deepseek-modal-close');
        const chatContainer = document.getElementById('deepseek-chat-container');
        const contextDiv = document.getElementById('deepseek-context');
        const chatInput = document.getElementById('deepseek-chat-input');
        const sendBtn = document.getElementById('deepseek-chat-send');

        if (!modal || !closeBtn || !chatContainer || !contextDiv || !chatInput || !sendBtn) {
            console.error('DeepSeek模态框相关元素未找到');
            return;
        }

        // 绑定事件
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });

        sendBtn.addEventListener('click', function () {
            sendChatMessage();
        });

        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });

        // 点击模态框外部关闭
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // 保存当前会话属性
        window.deepseekSession = {
            currentContext: '',
            messages: []
        };

        console.log('DeepSeek模态框初始化完成');
    } catch (error) {
        console.error('初始化DeepSeek API出错:', error);
    }
}

/**
 * 向DeepSeek API发送问题并获取回答
 */
async function askDeepSeek(question, context = '') {
    try {
        if (!DEEPSEEK_CONFIG.API_KEY) {
            return '请先设置您的DeepSeek API密钥再使用AI功能。点击页面顶部的"保存密钥"按钮进行设置。';
        }

        // 构建上下文
        const prompt = context ? `参考以下内容：\n${context}\n\n问题：${question}` : question;

        // 显示加载状态
        console.log('正在向DeepSeek API发送请求...');

        // 发送请求
        const response = await fetch(DEEPSEEK_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.MODEL,
                messages: [{
                    role: "user",
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        return `很抱歉，发生了错误：${error.message}。请确认您的API密钥是否正确。`;
    }
}

/**
 * 发送聊天消息
 */
function sendChatMessage() {
    const chatInput = document.getElementById('deepseek-chat-input');
    const chatContainer = document.getElementById('deepseek-chat-container');
    const message = chatInput.value.trim();

    if (!message) return;

    // 检查API密钥
    if (!DEEPSEEK_CONFIG.API_KEY) {
        // 添加系统消息提示用户设置API密钥
        const systemMessage = document.createElement('div');
        systemMessage.className = 'deepseek-chat-message deepseek-chat-ai system-message';
        systemMessage.innerHTML = '<div class="system-icon"><i class="fas fa-exclamation-circle"></i></div><div class="system-content">请先设置您的DeepSeek API密钥再使用AI功能。点击页面顶部的“保存密钥”按钮进行设置。</div>';
        chatContainer.appendChild(systemMessage);

        // 自动滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

    // 获取当前上下文
    const contextDiv = document.getElementById('deepseek-context');
    const contextContent = contextDiv ? contextDiv.textContent.trim() : '';

    // 将用户输入与上下文结合
    const fullMessage = contextContent ? `${contextContent}\n\n${message}` : message;

    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'deepseek-chat-message deepseek-chat-user';
    userMessage.textContent = message;
    chatContainer.appendChild(userMessage);

    // 清空输入框
    chatInput.value = '';

    // 添加AI回复占位
    const aiMessage = document.createElement('div');
    aiMessage.className = 'deepseek-chat-message deepseek-chat-ai';
    aiMessage.innerHTML = '<div class="loading-spinner"></div> <span class="thinking-text">AI思考中...</span>';
    chatContainer.appendChild(aiMessage);

    // 自动滚动到底部
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 保存当前消息以便多轮对话
    window.deepseekSession.messages.push({
        role: 'user',
        content: fullMessage // 使用包含上下文的完整消息
    });

    // 更新消息到aiMessage
    (async function () {
        try {
            // 获取DeepSeek回答
            let reply = await askDeepSeek(fullMessage, '');

            // 保存AI回复
            window.deepseekSession.messages.push({
                role: 'assistant',
                content: reply
            });

            // 处理公式中的斜杠
            reply = enhanceLatexFormulas(reply);

            // 处理Markdown格式
            reply = formatMarkdown(reply);

            // 显示AI回复
            aiMessage.innerHTML = reply;

            // 渲染公式
            if (window.MathJax) {
                try {
                    setTimeout(() => {
                        if (MathJax.typesetPromise) {
                            MathJax.typesetPromise([aiMessage]).catch(function (err) {
                                console.warn('MathJax渲染警告:', err);
                            });
                        } else if (MathJax.Hub) {
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, aiMessage]);
                        }
                    }, 100);
                } catch (err) {
                    console.error('渲染公式出错:', err);
                }
            }

            // 自动滚动到底部
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error('发送消息时出错:', error);
            aiMessage.innerHTML = `<div class="system-icon error"><i class="fas fa-exclamation-triangle"></i></div><div class="system-content">发生错误: ${error.message}</div>`;
        }
    })();
}

/**
 * 增强的Markdown格式处理
 * @param {string} text 原始文本
 * @returns {string} 格式化后的HTML
 */
function formatMarkdown(text) {
    // 增强的Markdown处理，确保与LaTeX兼容

    // 处理LaTeX公式(在处理其他格式前先保护公式)
    const formulaPlaceholders = [];
    text = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g, function (match) {
        const placeholder = `__FORMULA_${formulaPlaceholders.length}__`;
        formulaPlaceholders.push(match);
        return placeholder;
    });

    // 处理Markdown格式
    text = text
        // 标题
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')

        // 加粗和斜体
        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^\*]+)\*/g, '<em>$1</em>')

        // 列表
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

        // 代码
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')

        // 换行
        .replace(/\n/g, '<br>');

    // 恢复公式
    formulaPlaceholders.forEach((formula, i) => {
        text = text.replace(`__FORMULA_${i}__`, formula);
    });

    return text;
}

/**
 * 处理公式中的斜杠
 * @param {string} content 包含公式的内容
 * @returns {string} 处理后的内容
 */
function enhanceLatexFormulas(content) {
    if (!content) return content;

    // 保护公式区域
    return content.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g, function (match) {
        // 处理公式中的斜杠，确保换行使用双斜杠
        return match.replace(/(?<!\\)\\(?!\\)/g, '\\\\');
    });
}

/**
 * 添加消息到聊天容器
 */
function addChatMessage(sender, content) {
    const chatContainer = document.getElementById('deepseek-chat-container');

    const messageId = `msg-${Date.now()}`;
    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `deepseek-chat-message deepseek-chat-${sender === 'user' ? 'user' : 'ai'}`;

    // 如果是AI消息，处理Markdown和公式
    if (sender !== 'user') {
        // 处理公式中的斜杠
        content = enhanceLatexFormulas(content);

        // 使用Markdown格式化
        content = formatMarkdown(content);
    }

    messageDiv.innerHTML = content;
    chatContainer.appendChild(messageDiv);

    // 渲染数学公式
    if (window.MathJax && sender !== 'user') {
        setTimeout(() => {
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([messageDiv])
                    .catch(err => console.warn('MathJax渲染警告:', err));
            } else if (window.MathJax.Hub) {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, messageDiv]);
            }
        }, 100);
    }

    // 滚动到底部
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return messageId;
}

/**
 * 打开DeepSeek模态框
 */
function openDeepSeekModal(context, title = '知识点分析') {
    const modal = document.getElementById('deepseek-modal');
    const chatContainer = document.getElementById('deepseek-chat-container');
    const contextDiv = document.getElementById('deepseek-context');

    modal.classList.add('show');
    chatContainer.innerHTML = '';
    contextDiv.textContent = context;
    window.deepseekSession.currentContext = context;
    window.deepseekSession.messages = [];

    document.querySelector('.deepseek-modal-title').textContent = `DeepSeek AI 分析：${title}`;

    // 添加欢迎消息
    addChatMessage('AI', `您好！我是DeepSeek AI助手。我已经阅读了关于"${title}"的内容，请问有什么我可以帮您解答的问题吗？`);

    // 锁定页面滚动
    document.body.style.overflow = 'hidden';

    // 聚焦输入框
    setTimeout(() => {
        document.getElementById('deepseek-chat-input').focus();
    }, 300);
}

/**
 * 从HTML内容中提取纯文本
 */
function stripHTML(html) {
    if (!html) return '';

    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

/**
 * 设置全局DeepSeek查询
 */
function setupGlobalDeepSeekQuery() {
    const globalInput = document.getElementById('global-deepseek-input');
    const globalButton = document.getElementById('global-deepseek-btn');

    if (!globalInput || !globalButton) {
        console.error('全局DeepSeek查询元素未找到');
        return;
    }

    globalButton.addEventListener('click', function () {
        const question = globalInput.value.trim();
        if (!question) return;

        // 检查API密钥
        if (!DEEPSEEK_CONFIG.API_KEY) {
            alert('请先设置您的DeepSeek API密钥再使用AI功能。');
            document.getElementById('deepseek-api-key').focus();
            return;
        }

        // 打开模态框，设置全局知识点作为上下文
        openDeepSeekModal('定积分知识点全局内容', 'DeepSeek AI 助手');

        // 设置问题
        document.getElementById('deepseek-chat-input').value = question;

        // 触发发送
        document.getElementById('deepseek-chat-send').click();

        // 清空全局输入
        globalInput.value = '';
    });

    // 添加回车键响应
    globalInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            globalButton.click();
        }
    });
}

// 初始化页面
function initializePage() {
    try {
        // 检查数据
        console.log('检查习题数据...');
        if (!window.exerciseData || !Array.isArray(window.exerciseData.exercises)) {
            console.error('数据未正确加载:', window.exerciseData);
            alert('习题数据加载失败，请刷新页面');
            return;
        }

        console.log(`原始数据中共有 ${exerciseData.exercises.length} 道题目`);

        // 渲染知识点部分
        renderKnowledgeSection();

        // 使用直接方法渲染所有题目
        renderAllExercises();

        // 添加返回顶部按钮
        addScrollToTopButton();

        // 设置事件监听
        setupEventListeners();

        // 确保分类统计正确显示
        setTimeout(function () {
            updateCategoryDisplay();

            // 强制修复筛选按钮
            forceFixFilterButtons();
        }, 500);

        // 再次检查按钮是否正常工作
        setTimeout(function () {
            forceFixFilterButtons();
        }, 1500);

        console.log('页面初始化完成');
    } catch (error) {
        console.error('初始化错误:', error);
        alert('页面初始化错误: ' + error.message);
    }
}

// 渲染所有习题
function renderAllExercises() {
    const container = document.getElementById('exercise-container');
    if (!container) {
        console.error('找不到习题容器');
        return;
    }

    console.log('开始渲染所有习题...');

    // 清除容器中的内容
    container.innerHTML = '';

    // 清除容器的高度限制和滚动
    container.style.maxHeight = 'none';
    container.style.overflow = 'visible';

    // 复制习题数组以避免引用问题
    const exercises = ExerciseManager && ExerciseManager.exercises ? [...ExerciseManager.exercises] : [];

    console.log(`总共有 ${exercises.length} 道习题，正在生成HTML...`);

    // 用于存储所有习题的HTML，最后一次性更新DOM
    const allHtml = [];

    // 已知的习题ID集合，用于检测重复
    const knownIds = new Set();

    // 分类映射函数 - 将原始分类映射到新的六大类别
    function mapCategory(category, title) {
        // 首先检查title是否可以直接映射
        if (title.includes('基本定积分计算')) {
            return '基本定积分计算';
        } else if (title.includes('换元定积分计算')) {
            return '换元定积分计算';
        } else if (title.includes('分部积分法')) {
            return '分部积分法';
        } else if (title.includes('定积分定义与性质')) {
            return '定积分定义与性质';
        } else if (title.includes('定积分应用')) {
            return '定积分应用';
        } else if (title.includes('广义积分')) {
            return '广义积分';
        }

        // 如果title没有直接映射，根据原始category映射
        if (category === '定积分计算') {
            return '基本定积分计算';
        } else if (category === '定积分性质') {
            return '定积分定义与性质';
        } else if (category.includes('积分法') || category.includes('分部积分')) {
            return '分部积分法';
        } else if (category.includes('换元') || category.includes('三角函数') ||
            category.includes('有理分式') || category.includes('根式')) {
            return '换元定积分计算';
        } else if (category.includes('应用') || category.includes('面积') ||
            category.includes('体积') || category.includes('旋转体')) {
            return '定积分应用';
        } else if (category.includes('广义')) {
            return '广义积分';
        }

        // 默认映射
        return '基本定积分计算';
    }

    // 处理每个习题
    for (let i = 0; i < exercises.length; i++) {
        try {
            const exercise = exercises[i];

            // 检查习题ID是否有效
            if (!exercise || !exercise.id) {
                console.warn(`第 ${i + 1} 个习题数据无效或缺少ID`);
                continue;
            }

            // 检查ID是否重复
            if (knownIds.has(exercise.id)) {
                console.warn(`发现重复的习题ID: ${exercise.id}`);
                continue;
            }
            knownIds.add(exercise.id);

            console.log(`处理习题 ${exercise.id}: ${exercise.title}`);

            // 检查是否需要函数图像 - 更新为只包含10个需要图形的习题ID
            const applicationIds = ['30', '31', '32', '33', '34', '37', '38', '39', '49', '50'];
            const needsPlot = applicationIds.includes(exercise.id.toString());

            // 将原始分类映射到新的六大类别
            const mappedCategory = mapCategory(exercise.category, exercise.title);

            // 为每个题目生成HTML
            const exerciseHtml = `
                <div class="exercise-item" data-id="${exercise.id}" data-difficulty="${exercise.difficulty}" data-category="${mappedCategory}" data-type="${exercise.type}">
                    <div class="exercise-header">
                        <div class="exercise-title-wrapper">
                            <div class="exercise-number">${exercise.id}</div>
                            <h3 class="exercise-title">${exercise.title}</h3>
                        </div>
                        <div class="exercise-meta">
                            <div class="exercise-type"><i class="fas fa-tag"></i> ${exercise.type}</div>
                            <div class="exercise-difficulty ${exercise.difficulty}"><i class="fas fa-signal"></i> ${getDifficultyText(exercise.difficulty)}</div>
                            <div class="exercise-category"><i class="fas fa-folder"></i> ${mappedCategory}</div>
                            ${exercise.method ? `<div class="exercise-method"><i class="fas fa-cogs"></i> ${exercise.method}</div>` : ''}
                        </div>
                    </div>
                    <div class="exercise-content">
                        <div class="exercise-question">${exercise.question}</div>
                        <div class="exercise-actions">
                            <button class="solution-toggle" data-exercise-id="${exercise.id}"><i class="fas fa-lightbulb"></i> 查看解析</button>
                            <button class="ai-analysis-btn" data-exercise-id="${exercise.id}"><i class="fas fa-robot"></i> AI分析</button>
                        </div>
                        <div id="solution-${exercise.id}" class="solution-content">
                            ${needsPlot ? `
                            <div class="function-image" style="text-align: center; margin: 20px 0;">
                                <img 
                                    src="../images/plots/plot-${exercise.id}.png" 
                                    alt="函数图像" 
                                    style="max-width: 50%; height: auto; display: block; margin: 0 auto; border-radius: 4px;"
                                    onload="console.log('图片加载成功: plot-${exercise.id}.png')"
                                    onerror="console.log('图片加载失败: plot-${exercise.id}.png'); this.style.border='2px solid red'; this.alt='图片加载失败，请检查路径'"
                                />
                            </div>
                            ` : ''}
                            <div class="solution-section">
                                <div class="explanation">
                                    <h4><i class="fas fa-chalkboard-teacher"></i> 解析</h4>
                                    <div class="explanation-content">${exercise.explanation}</div>
                                </div>
                                <div class="answer">
                                    <h4><i class="fas fa-check-circle"></i> 答案</h4>
                                    <div class="explanation-content">${exercise.answer}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            allHtml.push(exerciseHtml);
        } catch (error) {
            console.error(`处理习题 ${i + 1} 时出错:`, error);
            // 继续处理下一个习题
        }
    }

    console.log(`生成了 ${allHtml.length} 个习题的HTML`);

    // 一次性更新DOM
    container.innerHTML = allHtml.join('');
    console.log(`已渲染 ${allHtml.length} 道题目`);

    // 初始化所有解析内容的状态
    document.querySelectorAll('.solution-content').forEach(solution => {
        solution.style.display = 'none';
        solution.classList.remove('show');
        solution.style.maxHeight = 'none';
        solution.style.overflow = 'visible';
    });

    // 设置事件监听器
    setupEventListeners();

    // 检查最终渲染结果
    setTimeout(checkFinalRendering, 2000);

    // 更新习题计数
    updateExerciseCount(exercises);

    // 更新分类显示
    setTimeout(updateCategoryDisplay, 200);

    console.log('习题渲染完成，事件监听器已设置');
}

// 处理文本，保留MathJax公式并转换换行符为<br>
function processTextWithMath(text) {
    if (!text) return '';

    // 简单地将换行符转换为<br>标签
    return text.replace(/\n/g, '<br>');
}

// 检查最终渲染结果
function checkFinalRendering() {
    const items = document.querySelectorAll('.exercise-item');
    console.log(`最终渲染结果: ${items.length} 道题目`);

    if (items.length > 0) {
        // 检查每个题目
        items.forEach((item, i) => {
            const num = item.querySelector('.exercise-number');
            const id = item.getAttribute('data-id');
            console.log(`题目 #${i + 1}: 编号=${num ? num.textContent : '?'}, ID=${id}`);
        });
    } else {
        console.error('没有题目被渲染!');
    }
}

// 更新习题统计显示
function updateExerciseCount(exercises) {
    console.log('开始更新习题计数...');

    // 获取所有筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) {
        console.warn('未找到筛选按钮');
        return;
    }

    // 分类映射函数 - 将原始分类映射到新的六大类别
    function mapCategory(category, title) {
        // 首先检查title是否可以直接映射
        if (title.includes('基本定积分计算')) {
            return '基本定积分计算';
        } else if (title.includes('换元定积分计算')) {
            return '换元定积分计算';
        } else if (title.includes('分部积分法')) {
            return '分部积分法';
        } else if (title.includes('定积分定义与性质')) {
            return '定积分定义与性质';
        } else if (title.includes('定积分应用')) {
            return '定积分应用';
        } else if (title.includes('广义积分')) {
            return '广义积分';
        }

        // 如果title没有直接映射，根据原始category映射
        if (category === '定积分计算') {
            return '基本定积分计算';
        } else if (category === '定积分性质') {
            return '定积分定义与性质';
        } else if (category.includes('积分法') || category.includes('分部积分')) {
            return '分部积分法';
        } else if (category.includes('换元') || category.includes('三角函数') ||
            category.includes('有理分式') || category.includes('根式')) {
            return '换元定积分计算';
        } else if (category.includes('应用') || category.includes('面积') ||
            category.includes('体积') || category.includes('旋转体')) {
            return '定积分应用';
        } else if (category.includes('广义')) {
            return '广义积分';
        }

        // 默认映射
        return '基本定积分计算';
    }

    // 计算每个分类的习题数量
    const categoryCounts = {
        '全部题目': exercises.length,
        '基本定积分计算': 0,
        '换元定积分计算': 0,
        '分部积分法': 0,
        '定积分定义与性质': 0,
        '定积分应用': 0,
        '广义积分': 0
    };

    // 统计每个分类的习题数量
    exercises.forEach(exercise => {
        const mappedCategory = mapCategory(exercise.category, exercise.title);
        categoryCounts[mappedCategory]++;
    });

    console.log('分类统计结果:', categoryCounts);

    // 更新每个按钮的计数
    filterButtons.forEach(button => {
        const filterType = button.getAttribute('data-filter');
        let count = 0;

        // 根据筛选类型获取对应的计数
        if (filterType === 'all') {
            count = categoryCounts['全部题目'];
        } else if (filterType === 'calculation') {
            count = categoryCounts['基本定积分计算'] + categoryCounts['换元定积分计算'] + categoryCounts['分部积分法'];
        } else if (filterType === 'properties') {
            count = categoryCounts['定积分定义与性质'];
        } else if (filterType === 'applications') {
            count = categoryCounts['定积分应用'];
        } else if (filterType === 'improper-integral') {
            count = categoryCounts['广义积分'];
        }

        // 更新按钮文本
        const countSpan = button.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = count;
        }

        // 更新按钮状态
        if (count === 0) {
            button.classList.add('disabled');
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        } else {
            button.classList.remove('disabled');
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        }

        console.log(`更新按钮 ${filterType}: ${count} 道题目`);
    });

    console.log('习题计数更新完成');
}

// 设置所有事件监听器
function setupEventListeners() {
    console.log('设置事件监听');

    // 移除所有现有的事件监听器（通过克隆按钮来移除）
    document.querySelectorAll('.solution-toggle').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    // 筛选按钮
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', filterButtonHandler);

        // 为所有分类按钮添加数据属性
        const filterType = button.getAttribute('data-filter');
        if (filterType === 'basic') {
            button.setAttribute('data-category', '基本定积分计算');
        } else if (filterType === 'substitution') {
            button.setAttribute('data-category', '换元定积分计算');
        } else if (filterType === 'parts') {
            button.setAttribute('data-category', '分部积分法');
        } else if (filterType === 'properties') {
            button.setAttribute('data-category', '定积分定义与性质');
        } else if (filterType === 'applications') {
            button.setAttribute('data-category', '定积分应用');
        } else if (filterType === 'improper') {
            button.setAttribute('data-category', '广义积分');
        }
    });

    // 调整分类按钮显示
    updateCategoryButtons();

    // 为每个解析按钮添加点击事件
    document.querySelectorAll('.solution-toggle').forEach(button => {
        button.addEventListener('click', function () {
            console.log('点击解析按钮');
            const exerciseId = this.getAttribute('data-exercise-id');
            const solution = document.getElementById('solution-' + exerciseId);

            if (!solution) {
                console.error('找不到解析容器:', exerciseId);
                return;
            }

            // 切换显示/隐藏状态
            if (solution.classList.contains('show')) {
                // 当前是显示状态，切换为隐藏
                solution.classList.remove('show');
                solution.style.display = 'none';
                this.innerHTML = '<i class="fas fa-lightbulb"></i> 查看解析';
            } else {
                // 当前是隐藏状态，切换为显示
                solution.classList.add('show');
                solution.style.display = 'block';
                solution.style.maxHeight = 'none';
                solution.style.overflow = 'visible';
                this.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏解析';

                // 调试图片路径
                const imgElement = solution.querySelector('img');
                if (imgElement) {
                    console.log(`解析中的图片路径: ${imgElement.src}`);
                }

                // 渲染公式
                renderFormulas(solution);
            }
        });
    });

    // 题目定位功能
    const problemNumberInput = document.getElementById('problem-number-input');
    const locateProblemBtn = document.getElementById('locate-problem-btn');

    if (problemNumberInput && locateProblemBtn) {
        // 添加点击事件
        locateProblemBtn.addEventListener('click', function () {
            locateProblemByNumber();
        });

        // 添加回车键事件
        problemNumberInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                locateProblemByNumber();
            }
        });

        function locateProblemByNumber() {
            console.log('开始设置题目定位器...');
            const locateBtn = document.getElementById('locate-problem-btn');
            const problemInput = document.getElementById('problem-number-input');

            if (!locateBtn || !problemInput) {
                console.warn('题目定位器元素不存在');
                return;
            }

            // 点击定位按钮
            locateBtn.addEventListener('click', function () {
                console.log('点击了定位按钮');
                locateProblem();
            });

            // 按回车键定位
            problemInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    console.log('按下了回车键');
                    locateProblem();
                }
            });

            // 定位题目函数
            function locateProblem() {
                const problemNumber = problemInput.value.trim();
                if (!problemNumber) {
                    console.log('题号为空，不执行定位');
                    return;
                }

                console.log(`尝试定位题目 #${problemNumber}`);

                // 查找对应题号的习题
                const problemElement = document.querySelector(`.exercise-item[data-id="${problemNumber}"]`);

                if (!problemElement) {
                    console.warn(`未找到题号为 ${problemNumber} 的习题`);
                    alert(`未找到题号为 ${problemNumber} 的习题`);
                    return;
                }

                // 移除所有之前的高亮
                document.querySelectorAll('.problem-highlight').forEach(el => {
                    el.classList.remove('problem-highlight');
                });

                // 添加高亮效果
                problemElement.classList.add('problem-highlight');

                // 滚动到目标题目位置
                problemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // 确保所有筛选条件不影响该题目的显示
                problemElement.style.display = 'block';

                // 如果题目在某个筛选条件下被隐藏，则切换到全部题目模式
                const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                if (allFilterBtn) {
                    allFilterBtn.click();
                }

                console.log(`已定位到题目 #${problemNumber}`);
            }

            console.log('题目定位器设置完成');
        }

        // 设置题目定位器
        locateProblemByNumber();
    }

    // 为AI分析按钮添加点击事件
    document.querySelectorAll('.ai-analysis-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const exerciseId = this.getAttribute('data-exercise-id');
            const knowledgeId = this.getAttribute('data-knowledge-id');

            if (exerciseId) {
                // 习题分析
                const exercise = exerciseData.exercises.find(ex => ex.id == exerciseId);
                if (exercise) {
                    // 准备上下文内容
                    const content = `题目：${exercise.question}\n\n解析：${stripHTML(exercise.explanation)}\n\n答案：${exercise.answer}`;

                    // 打开DeepSeek模态框
                    openDeepSeekModal(content, `习题${exercise.id}: ${exercise.title}`);
                }
            } else if (knowledgeId) {
                // 知识点分析
                const pointIndex = parseInt(knowledgeId);
                if (pointIndex >= 0 && pointIndex < exerciseData.knowledgePoints.length) {
                    const point = exerciseData.knowledgePoints[pointIndex];

                    // 准备上下文内容
                    const content = stripHTML(point.content);

                    // 打开DeepSeek模态框
                    openDeepSeekModal(content, point.title);
                }
            }
        });
    });

    // 返回顶部按钮
    const scrollTopButton = document.querySelector('.scroll-to-top');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 筛选按钮处理函数 - 优化版
function filterButtonHandler(event) {
    event.preventDefault();

    // 获取过滤类型
    const filterType = this.getAttribute('data-filter');
    if (!filterType) return;

    // 使用requestAnimationFrame来避免在渲染周期内进行大量 DOM 操作
    requestAnimationFrame(() => {
        // 先移除所有按钮的active类
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            // 确保清除所有按钮的背景颜色
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });

        // 然后添加当前按钮的active类
        this.classList.add('active');

        // 应用过滤 - 设置renderMath为false以减少卡顿
        applyFilter(filterType, false);
    });
}

// 应用过滤
function applyFilter(filter, renderMath = true) {
    console.log(`应用过滤: ${filter}, 渲染公式: ${renderMath}`);

    // 所有习题元素
    const exercises = document.querySelectorAll('.exercise-item');
    if (!exercises || exercises.length === 0) {
        console.error('未找到习题元素');
        return;
    }

    // 显示总数
    let visibleCount = 0;

    // 需要重新渲染的元素
    const elementsToRender = [];

    // 批量操作减少重排版
    const showElements = [];
    const hideElements = [];

    // 处理每个习题
    exercises.forEach(exercise => {
        // 获取习题属性
        const id = exercise.getAttribute('data-id');
        const difficulty = exercise.getAttribute('data-difficulty');
        const category = exercise.getAttribute('data-category');

        // 根据过滤条件决定显示或隐藏
        let shouldShow = false;

        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'easy' && difficulty === 'easy') {
            shouldShow = true;
        } else if (filter === 'medium' && difficulty === 'medium') {
            shouldShow = true;
        } else if (filter === 'hard' && difficulty === 'hard') {
            shouldShow = true;
        } else if (filter === 'basic' && category === '基本定积分计算') {
            shouldShow = true;
        } else if (filter === 'substitution' && category === '换元定积分计算') {
            shouldShow = true;
        } else if (filter === 'parts' && category === '分部积分法') {
            shouldShow = true;
        } else if (filter === 'properties' && category === '定积分定义与性质') {
            shouldShow = true;
        } else if (filter === 'applications' && category === '定积分应用') {
            shouldShow = true;
        } else if (filter === 'improper' && category === '广义积分') {
            shouldShow = true;
        } else if (filter === 'calculation' && (
            category === '基本定积分计算' ||
            category === '换元定积分计算' ||
            category === '分部积分法'
        )) {
            shouldShow = true;
        } else if (filter === 'improper-integral' && category === '广义积分') {
            shouldShow = true;
        }

        // 收集需要显示和隐藏的元素
        if (shouldShow) {
            showElements.push(exercise);
            visibleCount++;
            // 将显示的习题添加到需要渲染的列表中
            elementsToRender.push(exercise);
        } else {
            hideElements.push(exercise);
        }
    });

    // 批量更新DOM，减少重排版
    requestAnimationFrame(() => {
        showElements.forEach(el => el.style.display = 'block');
        hideElements.forEach(el => el.style.display = 'none');
    });

    // 更新显示的习题数量
    updateExerciseCount(visibleCount);

    // 重新渲染显示的习题中的数学公式
    if (renderMath && window.MathJax && elementsToRender.length > 0) {
        console.log(`重新渲染 ${elementsToRender.length} 个习题的公式`);
        try {
            // 使用延迟渲染，减少卡顿
            setTimeout(() => {
                window.MathJax.typesetPromise(elementsToRender).catch(err => {
                    console.error('MathJax渲染错误:', err);
                });
            }, 100);
        } catch (error) {
            console.error('尝试渲染数学公式时出错:', error);
        }
    }
}

// 获取难度文本
function getDifficultyText(difficulty) {
    switch (difficulty) {
        case 'easy': return '简单';
        case 'medium': return '中等';
        case 'hard': return '困难';
        default: return '中等';
    }
}

// 幻灯片功能变量
let totalSlides = 0; // 将根据实际知识点数量动态计算
let currentSlide = 0;

// 初始化幻灯片内容
function initSlides() {
    // 获取容器
    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) return;

    // 清空容器
    slidesContainer.innerHTML = '';

    // 遇到知识点数据生成幻灯片
    if (exerciseData && exerciseData.knowledgePoints) {
        // 设置总幻灯片数量
        totalSlides = exerciseData.knowledgePoints.length;

        exerciseData.knowledgePoints.forEach((point, index) => {
            // 创建幻灯片元素
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.id = `slide-${index}`; // 直接使用索引作为ID

            // 创建幻灯片内容
            slide.innerHTML = `
                <div class="slide-card">
                    <div class="slide-number">${index + 1}</div>
                    <div class="slide-header">
                        <h2 class="slide-title">${point.title}</h2>
                        <button class="ai-analysis-btn" data-knowledge-id="${index}">
                            <i class="fas fa-robot"></i> AI分析
                        </button>
                    </div>
                    <div class="slide-content ${index === 3 ? 'two-column-content' : ''}">
                        ${point.content}
                    </div>
                </div>
            `;

            // 添加点击事件，点击幻灯片切换到下一张
            slide.querySelector('.slide-card').addEventListener('click', function (e) {
                // 如果点击的是AI分析按钮，不触发幻灯片切换
                if (e.target.closest('.ai-analysis-btn')) {
                    return;
                }
                // 如果是最后一张幻灯片，则返回第一张
                if (currentSlide === totalSlides - 1) {
                    goToSlide(0);
                } else {
                    // 否则切换到下一张幻灯片
                    nextSlide();
                }
            });

            // 添加到容器
            slidesContainer.appendChild(slide);
        });
    }

    // 初始化导航
    updateIndicator();

    // 设置初始激活状态
    if (document.getElementById('slide-0')) {
        document.getElementById('slide-0').classList.add('active');
    }

    // 确保元素存在再设置属性
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.disabled = true;
    }

    // 添加AI分析按钮事件
    setupAIAnalysisButtons();
}

// 设置AI分析按钮事件
function setupAIAnalysisButtons() {
    const aiButtons = document.querySelectorAll('.ai-analysis-btn');
    aiButtons.forEach(button => {
        button.addEventListener('click', function () {
            const knowledgeId = this.getAttribute('data-knowledge-id');
            if (knowledgeId && ExerciseManager && ExerciseManager.knowledgePoints) {
                const knowledgePoint = ExerciseManager.knowledgePoints[knowledgeId];
                if (knowledgePoint) {
                    openDeepSeekModal(knowledgePoint.content, knowledgePoint.title);
                }
            } else if (knowledgeId && window.exerciseData && window.exerciseData.knowledgePoints) {
                // 兼容旧版本的数据结构
                const knowledgePoint = window.exerciseData.knowledgePoints[knowledgeId];
                if (knowledgePoint) {
                    openDeepSeekModal(knowledgePoint.content, knowledgePoint.title);
                }
            }
        });
    });
}

// 分页指示器已删除

// 更新当前幻灯片指示
function updateIndicator() {
    // 更新带圈数字导航的激活状态
    const circleNavs = document.querySelectorAll('.circle-num');
    if (circleNavs && circleNavs.length > 0) {
        circleNavs.forEach((nav, index) => {
            if (index === currentSlide) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
    }

    // 兼容旧的指示器（如果存在）
    const currentSlideElem = document.getElementById('current-slide');
    const totalSlidesElem = document.getElementById('total-slides');

    if (currentSlideElem && totalSlidesElem) {
        currentSlideElem.textContent = currentSlide + 1;
        totalSlidesElem.textContent = totalSlides;
    }
}

// 切换到指定幻灯片
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // 获取所有幻灯片
    const slides = document.querySelectorAll('.slide');

    // 当前幻灯片移除active
    slides[currentSlide].classList.remove('active');

    // 新幻灯片添加active
    currentSlide = index;
    slides[currentSlide].classList.add('active');

    // 更新按钮状态
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // 更新指示器
    updateIndicator();

    // 确保MathJax渲染公式
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([slides[currentSlide]]).catch(function (err) {
            console.log('MathJax渲染错误:', err);
        });
    }
}

// 前一张幻灯片
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// 后一张幻灯片
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// 键盘监听
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    }
});

// 修改renderKnowledgeSection函数
function renderKnowledgeSection() {
    // 初始化幻灯片
    initSlides();

    // 为带圈数字导航添加点击事件
    setupCircleNavigation();

    console.log('知识点幻灯片渲染完成');
}

// 设置带圈数字导航的点击事件
function setupCircleNavigation() {
    console.log('设置数字导航点击事件');
    // 使用延时确保元素已经加载
    setTimeout(function () {
        const circleNavs = document.querySelectorAll('.circle-num');
        console.log(`找到 ${circleNavs.length} 个数字导航按钮`);

        if (circleNavs && circleNavs.length > 0) {
            circleNavs.forEach(nav => {
                // 移除现有事件监听器，防止重复添加
                nav.removeEventListener('click', circleNavClickHandler);
                // 添加新的事件监听器
                nav.addEventListener('click', circleNavClickHandler);
                console.log(`为数字 ${nav.textContent} 添加点击事件`);
            });
        }
    }, 500);
}

// 数字导航点击处理函数
function circleNavClickHandler(event) {
    // 直接使用按钮的data-slide属性值作为幻灯片索引
    const slideIndex = parseInt(this.getAttribute('data-slide'));
    
    console.log(`点击导航按钮: ${this.textContent}, 切换到幻灯片 ${slideIndex}`);
    
    if (!isNaN(slideIndex) && slideIndex >= 0) {
        goToSlide(slideIndex);
    }
}

function addScrollToTopButton() {
    const button = document.querySelector('.scroll-to-top');
    if (!button) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 全局上下文管理器
 * 负责维护当前讨论的题目或知识点信息
 */
const ContextManager = {
    // 当前上下文数据
    current: {
        type: null,         // 'exercise' 或 'knowledge'
        id: null,           // 内容ID
        title: '',          // 标题
        content: '',        // 原始内容
        fullContext: ''     // 格式化后的完整上下文信息
    },

    /**
     * 设置当前上下文
     * @param {string} type 类型：'exercise'或'knowledge'
     * @param {string} id 内容ID
     * @param {string} title 标题
     * @param {string} content 内容
     */
    setContext(type, id, title, content) {
        this.current.type = type;
        this.current.id = id;
        this.current.title = title;
        this.current.content = content;

        // 根据类型构建不同格式的完整上下文
        if (type === 'exercise') {
            // 习题上下文格式化 - 提取关键信息
            const questionMatch = content.match(/题目：([\s\S]*?)(?=\n\n解析|$)/);
            const explanationMatch = content.match(/解析：([\s\S]*?)(?=\n\n答案|$)/);
            const answerMatch = content.match(/答案：([\s\S]*?)(?=\n\n类型|$)/);
            const typeMatch = content.match(/类型：([\s\S]*?)(?=\n\n分类|$)/);
            const categoryMatch = content.match(/分类：([\s\S]*?)(?=\n\n解题方法|$)/);
            const methodMatch = content.match(/解题方法：([\s\S]*?)(?=$)/);

            // 构建完整上下文
            this.current.fullContext =
                `当前正在讨论习题：${title}\n\n` +
                `题目：${questionMatch ? questionMatch[1].trim() : '无法获取题目'}\n\n` +
                `解析：${explanationMatch ? explanationMatch[1].trim() : '无法获取解析'}\n\n` +
                `答案：${answerMatch ? answerMatch[1].trim() : '无法获取答案'}\n\n` +
                `${typeMatch ? '类型：' + typeMatch[1].trim() + '\n' : ''}` +
                `${categoryMatch ? '分类：' + categoryMatch[1].trim() + '\n' : ''}` +
                `${methodMatch ? '解题方法：' + methodMatch[1].trim() + '\n' : ''}`;
        } else {
            // 知识点上下文格式化
            this.current.fullContext =
                `当前正在讨论知识点：${title}\n\n${content}`;
        }

        console.log('上下文已更新:', this.current.title);
    },

    /**
     * 获取包含用户问题的完整上下文
     * @param {string} userQuery 用户问题
     * @returns {string} 完整上下文
     */
    getFullContextWithUserQuery(userQuery) {
        return `${this.current.fullContext}\n\n用户问题：${userQuery}\n\n请严格围绕当前${this.current.type === 'exercise' ? '习题' : '知识点'}回答问题，即使用户问题看似偏离主题，也请将回答与当前主题关联。`;
    },

    /**
     * 清除上下文
     */
    clearContext() {
        this.current = {
            type: null,
            id: null,
            title: '',
            content: '',
            fullContext: ''
        };
    }
};

/**
 * 打开DeepSeek对话模态框
 * @param {string} content 要分析的内容
 * @param {string} title 模态框标题
 * @param {string} id 内容ID
 */
function openDeepSeekModal(content, title, id) {
    console.log('打开DeepSeek模态框:', title);

    // 获取UI元素
    const modal = document.getElementById('deepseek-modal');
    const titleElement = document.querySelector('.deepseek-modal-title');
    const contextDiv = document.getElementById('deepseek-context');
    const chatContainer = document.getElementById('deepseek-chat-container');

    if (!modal || !titleElement || !contextDiv || !chatContainer) {
        console.error('DeepSeek模态框元素不存在');
        return;
    }

    // 设置上下文
    const isExercise = title.includes('习题');
    ContextManager.setContext(
        isExercise ? 'exercise' : 'knowledge',
        id,
        title,
        content
    );

    // 设置UI元素
    titleElement.textContent = title;
    contextDiv.textContent = content;
    chatContainer.innerHTML = '';

    // 显示模态框
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 阻止背景滚动

    // 添加欢迎消息
    const welcomeType = isExercise ? '习题' : '知识点';
    const welcomeMessage = `我正在分析${welcomeType}「${title}」。请随时提问关于此${welcomeType}的任何问题，我会始终围绕这个${welcomeType}进行回答。`;

    addAIMessage(welcomeMessage);

    // 设置输入框焦点
    setTimeout(() => {
        const inputElement = document.getElementById('deepseek-chat-input');
        if (inputElement) inputElement.focus();
    }, 300);

    // 设置事件监听器
    const chatInput = document.getElementById('deepseek-chat-input');
    const chatSendBtn = document.getElementById('deepseek-chat-send');
    const modalCloseBtn = document.getElementById('deepseek-modal-close');

    // 移除之前的事件监听器，防止重复添加
    if (chatSendBtn) {
        const newChatSendBtn = chatSendBtn.cloneNode(true);
        chatSendBtn.parentNode.replaceChild(newChatSendBtn, chatSendBtn);

        // 添加发送按钮的点击事件
        newChatSendBtn.addEventListener('click', handleUserMessage);
    }

    // 添加输入框的回车事件
    if (chatInput) {
        chatInput.value = ''; // 清空输入框
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage();
            }
        });
    }

    // 添加关闭按钮的点击事件
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function () {
            closeDeepSeekModal();
        });
    }

    // 点击模态框背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeDeepSeekModal();
        }
    });
}

/**
 * 关闭DeepSeek模态框
 */
function closeDeepSeekModal() {
    const modal = document.getElementById('deepseek-modal');
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复背景滚动

    // 清除上下文
    ContextManager.clearContext();
}

/**
 * 处理用户消息发送
 */
function handleUserMessage() {
    const chatInput = document.getElementById('deepseek-chat-input');
    if (!chatInput) return;

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // 显示用户消息并清空输入框
    addUserMessage(userMessage);
    chatInput.value = '';

    // 验证上下文存在
    if (!ContextManager.current.title) {
        addAIMessage("抱歉，当前没有选中的题目或知识点。请先选择一个题目或知识点再提问。");
        return;
    }

    // 添加"AI思考中"消息
    const pendingMessageId = addPendingAIMessage();

    // 获取完整上下文(强制包含当前主题信息)
    const fullContext = ContextManager.getFullContextWithUserQuery(userMessage);

    // 确保MathJax渲染正确的公式
    function ensureMathJaxRendering() {
        // 检查MathJax是否已加载
        if (window.MathJax) {
            console.log('确保MathJax渲染正确...');

            // 如果需要，重新渲染所有公式
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise()
                    .then(() => {
                        console.log('公式重新渲染成功');
                    })
                    .catch(err => {
                        console.warn('公式渲染错误:', err);
                    });
            } else if (window.MathJax.Hub) {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
            }
        } else {
            console.warn('MathJax尚未加载，无法渲染公式');
        }
    }

    // 在处理用户消息前确保MathJax渲染正确
    ensureMathJaxRendering();

    // 向AI发送请求
    (async function () {
        try {
            // 调用API
            let response = await askDeepSeek(fullContext);

            // 直接将原始回复发送给渲染函数，不做预处理
            updateAIMessage(pendingMessageId, response);
        } catch (error) {
            console.error('AI请求出错:', error);
            updateAIMessage(pendingMessageId, `很抱歉，发生了错误: ${error.message}`);
        }
    })();
}

/**
 * 添加AI思考中状态消息
 * @returns {string} 消息元素ID
 */
function addPendingAIMessage() {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return null;

    const messageId = 'ai-message-' + Date.now();
    const messageElement = document.createElement('div');
    messageElement.id = messageId;
    messageElement.className = 'deepseek-chat-message deepseek-chat-ai';
    messageElement.innerHTML = '<div class="loading-spinner"></div> AI思考中...';

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return messageId;
}

/**
 * 直接渲染LaTeX公式，不做任何预处理
 * @param {string} content 包含公式的内容
 * @returns {string} 准备渲染的内容
 */
function directRenderLatex(content) {
    if (!content) return content;

    // 将所有公式用特殊标记替换，以保护它们
    const formulas = [];

    // 先保护行间公式
    content = content.replace(/\$\$((([\s\S]*?)))\$\$/gs, function (match, formula) {
        const placeholder = `__FORMULA_DISPLAY_${formulas.length}__`;
        formulas.push({ type: 'display', content: formula });
        return placeholder;
    });

    // 再保护行内公式
    content = content.replace(/\$([^\$\n]+?)\$/g, function (match, formula) {
        const placeholder = `__FORMULA_INLINE_${formulas.length}__`;
        formulas.push({ type: 'inline', content: formula });
        return placeholder;
    });

    // 处理Markdown格式
    content = content
        // 处理换行
        .replace(/\n/g, '<br>')
        // 加粗
        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
        // 斜体
        .replace(/\*([^\*]+)\*/g, '<em>$1</em>')
        // 代码块
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // 行内代码
        .replace(/`([^`]+)`/g, '<code>$1</code>');

    // 恢复公式
    formulas.forEach((formula, i) => {
        if (formula.type === 'display') {
            content = content.replace(`__FORMULA_DISPLAY_${i}__`, `$$${formula.content}$$`);
        } else {
            content = content.replace(`__FORMULA_INLINE_${i}__`, `$${formula.content}$`);
        }
    });

    return content;
}

/**
 * 更新AI消息内容
 * @param {string} messageId 消息元素ID
 * @param {string} content 消息内容
 */
function updateAIMessage(messageId, content) {
    if (!messageId) return;

    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    // 尝试两种方法处理公式
    // 1. 先尝试直接渲染
    const directContent = directRenderLatex(content);

    // 更新消息内容
    messageElement.innerHTML = directContent;

    // 渲染LaTeX公式
    if (window.MathJax) {
        setTimeout(() => {
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([messageElement])
                    .then(() => {
                        console.log('公式渲染成功');
                    })
                    .catch(err => {
                        console.warn('MathJax渲染警告:', err);
                        // 如果直接渲染失败，尝试使用增强的公式处理
                        console.log('尝试使用增强的公式处理...');
                        const enhancedContent = enhanceLatexFormulas(content);
                        const formattedContent = formatMarkdown(enhancedContent);
                        messageElement.innerHTML = formattedContent;

                        // 再次尝试渲染
                        window.MathJax.typesetPromise([messageElement])
                            .catch(err => console.warn('第二次渲染警告:', err));
                    });
            } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, messageElement]);
            }
        }, 100);
    }

    // 滚动到底部
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

/**
 * 添加系统消息
 * @param {string} message 消息内容
 */
function addSystemMessage(message) {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'deepseek-chat-message deepseek-chat-system';
    messageElement.textContent = message;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * 添加用户消息
 * @param {string} message 消息内容
 */
function addUserMessage(message) {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'deepseek-chat-message deepseek-chat-user';
    messageElement.textContent = message;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * 添加AI回复消息
 * @param {string} message 消息内容
 */
function addAIMessage(message) {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'deepseek-chat-message deepseek-chat-ai';

    // 处理公式渲染
    const formattedMessage = directRenderLatex(message);
    messageElement.innerHTML = formattedMessage;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 渲染公式
    if (window.MathJax) {
        setTimeout(() => {
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([messageElement])
                    .catch(err => console.warn('MathJax渲染警告:', err));
            } else if (window.MathJax.Hub) {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, messageElement]);
            }
        }, 100);
    }
}

/**
 * 去除HTML标签
 * @param {string} html HTML字符串
 * @returns {string} 纯文本
 */
function stripHTML(html) {
    if (!html) return '';

    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

/**
 * 绑定AI分析按钮事件
 */
function bindAiAnalysisButtons() {
    const aiButtons = document.querySelectorAll('.ai-analysis-btn');
    aiButtons.forEach(btn => {
        btn.addEventListener('click', handleAiAnalysisButtonClick);
    });
}

/**
 * 向DeepSeek API发送问题
 * @param {string} fullContext 完整上下文
 * @returns {Promise<string>} AI回复
 */
async function askDeepSeek(fullContext) {
    try {
        if (!DEEPSEEK_CONFIG.API_KEY) {
            return '请先设置您的DeepSeek API密钥再使用AI功能。';
        }

        console.log('正在向DeepSeek API发送请求...');

        // 构建强化系统提示，确保AI始终围绕当前主题
        const requestBody = {
            model: DEEPSEEK_CONFIG.MODEL,
            messages: [
                {
                    role: "system",
                    content: `你是一个专注的定积分助手。遵循以下规则:
                    1. 严格围绕当前上下文(题目或知识点)回答问题，无论用户提问什么
                    2. 使用准确的LaTeX公式，公式中必须使用双反斜杠(\\)，公式用$或$$包裹。例如:
                       定积分: $\\int_{a}^{b} f(x) dx$或者$$\\int_{a}^{b} f(x) dx$$
                       不定积分: $\\int f(x) dx$或者$$\\int f(x) dx$$
                       广义积分: $\\int_{a}^{\\infty} f(x) dx=F(\\infty)-F(a)=\\lim_{x \\to \\infty} F(x)-F(a)$或者$$\\int_{a}^{\\infty} f(x) dx=F(\\infty)-F(a)=\\lim_{x \\to \\infty} F(x)-F(a)$$
                                $\\int_{\\infty}^{b} f(x) dx=F(b)-F(\\infty)=F(b)-\\lim_{x \\to \\infty} F(x)$或者$$\\int_{\\infty}^{b} f(x) dx=F(b)-F(\\infty)=F(b)-\\lim_{x \\to \\infty} F(x)$$
                       暇积分:x≠a $\\int_{a}^{b} f(x) dx=F(b)-F(a)=F(b)-\\lim_{x \\to a^+} F(x)$或者$$\\int_{a}^{b} f(x) dx=F(b)-F(a)=F(b)-\\lim_{x \\to a^+} F(x)$$
                             x≠b $\\int_{a}^{b} f(x) dx=F(b)-F(a)=\\lim_{x \\to b^-} F(x)-F(a)$或者$$\\int_{a}^{b} f(x) dx=F(b)-F(a)=\\lim_{x \\to b^-} F(x)-F(a)$$
                       极限: $\\lim\\limits_{x \\to a} f(x)$或者$$\\lim\\limits_{x \\to a} f(x)$$
                       分数: $\\frac{a}{b}$或者$$\\frac{a}{b}$$
                       微分: $\\frac{d}{dx}f(x)$或者$$\\frac{d}{dx}f(x)$$
                       导数: $f'(x)$或者$$f'(x)$$
                       根式: $\\sqrt{x}$或者$$\\sqrt{x}$$
                       三角函数: $\\sin x$, $\\cos x$, $\\tan x$,$\\csc x$,$\\sec x$,$\\cot x$,$\\sinh x$,$\\cosh x$,$\\tanh x$,$\\coth x$,$\\sec h x$,$\\csc h x$,$\\arcsin x$,$\\arccos x$,$\\arctan x$,$\\arccsc x$,$\\arcsec x$,$\\arccot x$,$\\arcsinh x$,$\\arccosh x$,$\\arctanh x$,$\\arccoth x$,$\\arcsec h x$,$\\arccsc h x$
                       反三角函数: $\\arcsin x$, $\\arccos x$, $\\arctan x$
                       复杂公式推导时使用清晰的步骤展示
                    4. 总是以用户当前所查看的内容为基础进行回答，遇到无法回答的问题，不要脱离上下文，应转回当前上下文(题目或知识点)回答问题`
                },
                {
                    role: "user",
                    content: fullContext
                }
            ],
            temperature: 0.3,  // 降低温度确保更聚焦的回答
            max_tokens: 1500  // 允许更详细的回答
        };

        // 发送请求
        const response = await fetch(DEEPSEEK_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API错误:', error);
        return `很抱歉，发生了错误：${error.message}。请确认API密钥是否正确。`;
    }
}

/**
 * 设置全局DeepSeek查询
 */
function setupGlobalDeepSeekQuery() {
    // DeepSeek配置
    window.DEEPSEEK_CONFIG = {
        API_KEY: localStorage.getItem('deepseek_api_key') || '',
        API_URL: 'https://api.deepseek.com/v1/chat/completions',
        MODEL: 'deepseek-chat'
    };

    // 初始化全局查询按钮
    const globalQueryBtn = document.getElementById('global-ai-query-btn');
    if (globalQueryBtn) {
        globalQueryBtn.addEventListener('click', function () {
            // 打开全局查询模态框
            const modal = document.getElementById('global-ai-modal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';

                // 设置输入框焦点
                const inputElement = document.getElementById('global-ai-input');
                if (inputElement) {
                    setTimeout(() => inputElement.focus(), 300);
                }
            }
        });
    }

    // 初始化关闭按钮
    const closeBtn = document.getElementById('global-ai-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const modal = document.getElementById('global-ai-modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // 初始化发送按钮
    const sendBtn = document.getElementById('global-ai-send');
    if (sendBtn) {
        sendBtn.addEventListener('click', handleGlobalAiQuery);
    }

    // 初始化输入框回车事件
    const inputElement = document.getElementById('global-ai-input');
    if (inputElement) {
        inputElement.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleGlobalAiQuery();
            }
        });
    }

    // 点击模态框背景关闭
    const modal = document.getElementById('global-ai-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * 处理全局AI查询
 */
async function handleGlobalAiQuery() {
    const inputElement = document.getElementById('global-ai-input');
    const resultElement = document.getElementById('global-ai-result');

    if (!inputElement || !resultElement) return;

    const query = inputElement.value.trim();
    if (!query) return;

    // 显示加载状态
    resultElement.innerHTML = '<div class="loading-spinner"></div> AI思考中...';

    try {
        // 构建全局查询的上下文
        const context = `这是关于定积分的全局查询。用户问题: ${query}`;

        // 发送查询
        const response = await askDeepSeek(context);

        // 处理公式渲染
        const formattedResponse = directRenderLatex(response);
        resultElement.innerHTML = formattedResponse;

        // 渲染公式
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([resultElement])
                .catch(err => console.warn('MathJax渲染警告:', err));
        }

        // 清空输入框
        inputElement.value = '';
    } catch (error) {
        console.error('全局AI查询错误:', error);
        resultElement.innerHTML = `<div class="error-message">发生错误: ${error.message}</div>`;
    }
}

/**
 * 设置API密钥处理
 */
function setupApiKeyHandling() {
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiKeyInput = document.getElementById('deepseek-api-key');
    const statusText = document.getElementById('api-key-status-text');

    // 检查必要元素是否存在
    if (!saveApiKeyBtn || !clearApiKeyBtn || !apiKeyInput || !statusText) {
        console.log('API密钥相关元素未找到，这可能是正常的，如果当前页面不需要这些元素');
        return;
    }

    // 从本地存储加载API密钥
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
        DEEPSEEK_CONFIG.API_KEY = savedApiKey;
        apiKeyInput.value = '••••••••••••••••••••';
        statusText.textContent = '已保存API密钥';
        statusText.className = 'api-key-valid';
        clearApiKeyBtn.style.display = 'block';
    }

    // 保存API密钥
    saveApiKeyBtn.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            statusText.textContent = '请输入有效的API密钥';
            statusText.className = 'api-key-invalid';
            return;
        }

        // 验证API密钥
        validateApiKey(apiKey).then(isValid => {
            if (isValid) {
                DEEPSEEK_CONFIG.API_KEY = apiKey;
                localStorage.setItem('deepseek_api_key', apiKey);
                apiKeyInput.value = '••••••••••••••••••••';
                statusText.textContent = 'API密钥有效并已保存';
                statusText.className = 'api-key-valid';
                clearApiKeyBtn.style.display = 'block';
            } else {
                statusText.textContent = 'API密钥无效，请检查后重试';
                statusText.className = 'api-key-invalid';
            }
        });
    });

    // 清除API密钥
    clearApiKeyBtn.addEventListener('click', function () {
        DEEPSEEK_CONFIG.API_KEY = '';
        localStorage.removeItem('deepseek_api_key');
        apiKeyInput.value = '';
        statusText.textContent = '已清除API密钥，AI功能不可用';
        statusText.className = '';
        clearApiKeyBtn.style.display = 'none';
    });
}

/**
 * 验证API密钥
 * @param {string} apiKey 要验证的API密钥
 * @returns {Promise<boolean>} 密钥是否有效
 */
async function validateApiKey(apiKey) {
    try {
        // 构建简单的测试请求
        const response = await fetch('https://api.deepseek.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // 检查响应状态
        return response.ok;
    } catch (error) {
        console.error('验证API密钥时出错:', error);
        return false;
    }
}

/**
 * 处理AI分析按钮点击
 * @param {Event} e 事件对象
 */
function handleAiAnalysisButtonClick(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    console.log('处理AI分析按钮点击');

    // 获取当前按钮
    const btn = this instanceof HTMLElement ? this : e.currentTarget;

    const exerciseId = btn.getAttribute('data-exercise-id');
    const knowledgeId = btn.getAttribute('data-knowledge-id');

    console.log(`按钮属性 - 知识点ID: ${knowledgeId}, 习题ID: ${exerciseId}`);

    if (exerciseId) {
        console.log(`处理习题ID: ${exerciseId}`);
        const exercise = exerciseData.exercises.find(ex => ex.id == exerciseId);
        if (exercise) {
            // 提取习题的详细信息，包括题目类型、分类等
            const exerciseType = exercise.type || '未知类型';
            const exerciseCategory = exercise.category || '未分类';
            const exerciseMethod = exercise.method || '未指定方法';

            // 构建更详细的内容描述
            const content = `题目：${exercise.question}\n\n解析：${stripHTML(exercise.explanation)}\n\n答案：${exercise.answer}\n\n类型：${exerciseType}\n分类：${exerciseCategory}\n解题方法：${exerciseMethod}`;

            // 使用更详细的标题
            const title = `习题${exercise.id}: ${exercise.title} (${exerciseType})`;

            openDeepSeekModal(content, title, exerciseId);
        } else {
            console.error(`找不到习题: ${exerciseId}`);
        }
    } else if (knowledgeId !== null) {
        console.log(`处理知识点ID: ${knowledgeId}`);
        const id = parseInt(knowledgeId);
        if (id >= 0 && id < exerciseData.knowledgePoints.length) {
            const point = exerciseData.knowledgePoints[id];

            // 提取知识点的详细内容，并进行格式化处理
            const cleanContent = stripHTML(point.content);

            // 构建更详细的内容描述
            const content = `知识点：${point.title}\n\n${cleanContent}\n\n这是关于定积分的重要知识点，包含了相关的定义、性质和应用。`;

            openDeepSeekModal(content, `知识点：${point.title}`, knowledgeId);
        } else {
            console.error(`知识点ID超出范围: ${id}`);
        }
    } else {
        console.error('按钮没有ID属性');
    }
}

// 帮助函数来渲染公式
function renderFormulas(container) {
    setTimeout(function () {
        try {
            if (window.MathJax) {
                console.log(`开始渲染公式，使用MathJax`);
                if (window.MathJax.typesetPromise) {
                    window.MathJax.typesetPromise([container])
                        .then(() => console.log(`公式渲染成功`))
                        .catch(err => console.error('渲染公式出错:', err));
                } else if (window.MathJax.Hub) {
                    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, container]);
                    console.log(`使用MathJax.Hub渲染公式`);
                }
            } else {
                console.warn('MathJax未加载，尝试加载');
                if (window.ResourceLoader && window.ResourceLoader.loadMathJax) {
                    window.ResourceLoader.loadMathJax();
                }
            }
        } catch (e) {
            console.error('渲染公式出错:', e);
        }
    }, 300);
}

// 更新分类显示
function updateCategoryDisplay() {
    try {
        console.log('正在更新分类显示...');

        // 获取所有题目
        const allExercises = document.querySelectorAll('.exercise-item');
        if (!allExercises.length) {
            console.warn('未找到习题，无法更新分类显示');
            return;
        }

        // 按分类统计题目数量
        const categoryCounts = {
            '全部': allExercises.length,
            '基本定积分计算': 0,
            '换元定积分计算': 0,
            '分部积分法': 0,
            '定积分定义与性质': 0,
            '定积分应用': 0,
            '广义积分': 0
        };

        // 统计每个分类的题目数量
        allExercises.forEach(exercise => {
            try {
                const exerciseCategory = exercise.getAttribute('data-category') || '';
                // 检查分类是否存在于我们的计数对象中
                if (exerciseCategory && categoryCounts.hasOwnProperty(exerciseCategory)) {
                    categoryCounts[exerciseCategory]++;
                }
            } catch (err) {
                console.warn('处理习题分类时出错:', err);
            }
        });

        console.log('分类统计结果:', categoryCounts);

        // 更新按钮上的数量显示
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            try {
                const filterType = button.getAttribute('data-filter') || 'all';
                let countToShow = 0;

                if (filterType === 'all') {
                    countToShow = categoryCounts['全部'];
                } else if (filterType === 'calculation') {
                    // 计算分类包含所有计算类题目
                    countToShow = categoryCounts['基本定积分计算'] +
                        categoryCounts['换元定积分计算'] +
                        categoryCounts['分部积分法'];
                } else if (filterType === 'properties') {
                    countToShow = categoryCounts['定积分定义与性质'];
                } else if (filterType === 'applications') {
                    countToShow = categoryCounts['定积分应用'];
                } else if (filterType === 'improper-integral') {
                    countToShow = categoryCounts['广义积分'];
                }

                // 更新计数显示
                const countSpan = button.querySelector('.count');
                if (countSpan) {
                    countSpan.textContent = countToShow;
                }
            } catch (err) {
                console.warn('更新按钮计数时出错:', err);
            }
        });

        console.log('分类显示更新完成');
    } catch (error) {
        console.error('更新分类显示时出错:', error);
    }
}

// 调整分类按钮显示
function updateCategoryButtons() {
    console.log('正在更新分类按钮...');
    // 获取所有筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) {
        console.warn('未找到筛选按钮');
        return;
    }

    // 确保按钮可点击
    filterButtons.forEach(button => {
        // 移除旧的事件监听器
        const oldButton = button.cloneNode(true);
        button.parentNode.replaceChild(oldButton, button);

        // 添加新的事件监听器
        oldButton.addEventListener('click', filterButtonHandler);

        // 设置数据属性
        const filterType = oldButton.getAttribute('data-filter');
        if (filterType === 'calculation') {
            oldButton.setAttribute('data-category', '定积分计算');
        } else if (filterType === 'properties') {
            oldButton.setAttribute('data-category', '定积分性质');
        } else if (filterType === 'applications') {
            oldButton.setAttribute('data-category', '定积分应用');
        } else if (filterType === 'improper-integral') {
            oldButton.setAttribute('data-category', '广义积分');
        } else if (filterType === 'all') {
            oldButton.setAttribute('data-category', '全部');
        }
    });

    // 更新分类显示
    updateCategoryDisplay();

    console.log('分类按钮更新完成，共更新', filterButtons.length, '个按钮');
}

// 强制修复筛选按钮
function forceFixFilterButtons() {
    console.log('强制修复筛选按钮...');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length === 0) {
        console.error('未找到筛选按钮，尝试重新查找');

        // 检查筛选容器是否存在
        const filterContainer = document.querySelector('.filter-container');
        if (!filterContainer) {
            console.error('筛选容器不存在，无法修复按钮');
            return;
        }

        // 重新创建所有筛选按钮 - 使用与HTML匹配的筛选值
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">
                <i class="fas fa-list"></i> 全部题目 <span class="count">(69)</span>
            </button>
            <button class="filter-btn" data-filter="calculation">
                <i class="fas fa-calculator"></i> 定积分计算 <span class="count">(47)</span>
            </button>
            <button class="filter-btn" data-filter="properties">
                <i class="fas fa-sitemap"></i> 定积分性质 <span class="count">(8)</span>
            </button>
            <button class="filter-btn" data-filter="applications">
                <i class="fas fa-project-diagram"></i> 定积分应用 <span class="count">(10)</span>
            </button>
            <button class="filter-btn" data-filter="improper-integral">
                <i class="fas fa-infinity"></i> 广义积分 <span class="count">(4)</span>
            </button>
        `;

        // 重新设置事件监听
        updateCategoryButtons();
        return;
    }

    // 为每个按钮手动设置点击事件
    filterButtons.forEach(button => {
        // 移除所有现有事件监听器
        const clone = button.cloneNode(true);
        if (button.parentNode) {
            button.parentNode.replaceChild(clone, button);
        }

        // 设置内联点击事件处理器
        clone.onclick = function (e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            // 更新活动状态
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            clone.classList.add('active');

            // 获取筛选类型
            const filterType = clone.getAttribute('data-filter');
            console.log(`点击了筛选按钮: ${filterType}`);

            // 应用筛选
            if (typeof applyFilter === 'function') {
                applyFilter(filterType);
            } else {
                console.error('applyFilter函数未定义');
            }

            return false;
        };
    });

    // 更新按钮计数
    updateCategoryDisplay();

    console.log('筛选按钮修复完成');
} 