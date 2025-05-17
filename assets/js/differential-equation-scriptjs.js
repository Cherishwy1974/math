// 确保使用differential-equation-data.js中的数据
console.log('检查数据文件是否正确加载');
if (typeof window.exerciseData !== 'undefined') {
    console.log(`数据文件已加载: 知识点 ${window.exerciseData.knowledgePoints.length} 条, 习题 ${window.exerciseData.exercises.length} 道`);

    // 处理所有数据中的换行，将其转换为LaTeX的换行符
    processLatexLineBreaks();
} else {
    console.error('数据文件未正确加载');
}

// Slideshow variables
let totalSlides = 0; // Will be calculated based on actual knowledge points
let currentSlide = 0;

// Initialize slides
function initSlides() {
    // Get container
    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) return;

    // Clear container
    slidesContainer.innerHTML = '';

    // Generate slides from knowledge points data
    if (exerciseData && exerciseData.knowledgePoints) {
        // Set total slides count
        totalSlides = exerciseData.knowledgePoints.length;

        exerciseData.knowledgePoints.forEach((point, index) => {
            // Create slide element
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.id = `slide-${index}`;

            // Create slide content
            slide.innerHTML = `
                <div class="slide-card">
                    <div class="slide-number">${index + 1}</div>
                    <div class="slide-header">
                        <h2 class="slide-title">${point.title}</h2>
                        <button class="ai-analysis-btn" data-knowledge-id="${index}">
                            <i class="fas fa-robot"></i> AI分析
                        </button>
                    </div>
                    <div class="slide-content">
                        ${point.content}
                    </div>
                </div>
            `;

            // Add click event to navigate to next slide when clicking the card
            slide.querySelector('.slide-card').addEventListener('click', function (e) {
                // Don't trigger navigation if clicking the AI analysis button
                if (e.target.closest('.ai-analysis-btn')) {
                    return;
                }
                // If last slide, return to first
                if (currentSlide === totalSlides - 1) {
                    goToSlide(0);
                } else {
                    // Otherwise go to next slide
                    nextSlide();
                }
            });

            // Add to container
            slidesContainer.appendChild(slide);
        });
    }

    // Initialize navigation
    updateIndicator();

    // Set initial active state
    if (document.getElementById('slide-0')) {
        document.getElementById('slide-0').classList.add('active');
    }

    // Setup AI analysis buttons
    setupAIAnalysisButtons();
}

// Setup AI analysis buttons
function setupAIAnalysisButtons() {
    const aiButtons = document.querySelectorAll('.ai-analysis-btn');
    aiButtons.forEach(button => {
        button.addEventListener('click', function () {
            const knowledgeId = this.getAttribute('data-knowledge-id');
            if (knowledgeId && exerciseData && exerciseData.knowledgePoints) {
                const knowledgePoint = exerciseData.knowledgePoints[knowledgeId];
                if (knowledgePoint) {
                    openDeepSeekModal(knowledgePoint.content, knowledgePoint.title);
                }
            }
        });
    });
}

// Update slide indicator
function updateIndicator() {
    // Update circle navigation active state
    const circleNavs = document.querySelectorAll('.circle-num');
    if (circleNavs && circleNavs.length > 0) {
        circleNavs.forEach((nav, index) => {
            if (index === currentSlide) {
                // 当前幻灯片的按钮变成白色
                nav.style.background = 'white';
                nav.classList.add('active');
            } else {
                // 其他按钮保持透明
                nav.style.background = 'rgba(255,255,255,0.3)';
                nav.classList.remove('active');
            }
        });
    }
}

// Go to specific slide
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // Get all slides
    const slides = document.querySelectorAll('.slide');

    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Set new current slide and add active class
    currentSlide = index;
    slides[currentSlide].classList.add('active');

    // Update indicator
    updateIndicator();

    // Ensure MathJax renders formulas
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([slides[currentSlide]]).catch(function (err) {
            console.log('MathJax rendering error:', err);
        });
    }
}

// Go to previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Go to next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Keyboard navigation
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    }
});

// Setup circle navigation
function setupCircleNavigation() {
    console.log('Setting up number navigation click events');
    // Use timeout to ensure elements are loaded
    setTimeout(function () {
        const circleNavs = document.querySelectorAll('.circle-num');
        console.log(`Found ${circleNavs.length} number navigation buttons`);

        if (circleNavs && circleNavs.length > 0) {
            circleNavs.forEach(nav => {
                // Remove existing event listeners to prevent duplicates
                nav.removeEventListener('click', circleNavClickHandler);
                // Add new event listener
                nav.addEventListener('click', circleNavClickHandler);
                console.log(`Added click event to number ${nav.textContent}`);
            });
        }
    }, 500);
}

// Circle navigation click handler
function circleNavClickHandler(event) {
    const slideIndex = parseInt(this.getAttribute('data-slide'));
    console.log(`Clicked number navigation: ${this.textContent}, switching to slide ${slideIndex}`);
    if (!isNaN(slideIndex)) {
        goToSlide(slideIndex);
    }
}

/**
 * 处理数据中的所有LaTeX公式，将可见的换行转换为LaTeX的换行符
 */
function processLatexLineBreaks() {
    // 处理知识点中的LaTeX公式
    if (exerciseData.knowledgePoints && Array.isArray(exerciseData.knowledgePoints)) {
        exerciseData.knowledgePoints.forEach(point => {
            if (point.content) {
                // 在LaTeX公式内部处理换行
                point.content = processLatexContent(point.content);
            }
        });
    }

    // 处理习题中的LaTeX公式
    if (exerciseData.exercises && Array.isArray(exerciseData.exercises)) {
        exerciseData.exercises.forEach(exercise => {
            // 处理题目
            if (exercise.question) {
                exercise.question = processLatexContent(exercise.question);
            }

            // 处理解析
            if (exercise.explanation) {
                exercise.explanation = processLatexContent(exercise.explanation);
            }

            // 处理答案
            if (exercise.answer) {
                exercise.answer = processLatexContent(exercise.answer);
            }
        });
    }

    console.log('已处理所有数据中的LaTeX公式换行');
}

/**
 * 优化LaTeX公式处理，确保所有换行使用双斜杠
 * @param {string} content 包含LaTeX公式的内容
 * @returns {string} 处理后的内容
 */
function enhanceLatexFormulas(content) {
    if (!content) return content;

    // 处理行间公式($$...$$)
    content = content.replace(/\$\$(([\s\S]*?))\$\$/gs, function (match, formula) {
        // 将所有单斜杠替换为双斜杠
        let processed = formula;

        // 先处理换行
        processed = processed.replace(/\n/g, '\\\\');

        // 处理常见的LaTeX命令，确保单斜杠变成双斜杠
        const commonCommands = [
            'frac', 'sum', 'int', 'prod', 'lim', 'sqrt',
            'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu',
            'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
            'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp'
        ];

        // 对每个命令进行替换
        commonCommands.forEach(cmd => {
            const regex = new RegExp('\\\\' + cmd, 'g');
            processed = processed.replace(regex, '\\\\\\\\' + cmd);
        });

        // 处理其他单斜杠
        processed = processed.replace(/(?<!\\)\\(?!\\)/g, '\\\\');

        return '$$' + processed + '$$';
    });

    // 处理行内公式($...$)
    content = content.replace(/\$([^\$\n]+?)\$/g, function (match, formula) {
        // 将所有单斜杠替换为双斜杠
        let processed = formula;

        // 处理常见的LaTeX命令，确保单斜杠变成双斜杠
        const commonCommands = [
            'frac', 'sum', 'int', 'prod', 'lim', 'sqrt',
            'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu',
            'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
            'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp'
        ];

        // 对每个命令进行替换
        commonCommands.forEach(cmd => {
            const regex = new RegExp('\\\\' + cmd, 'g');
            processed = processed.replace(regex, '\\\\\\\\' + cmd);
        });

        // 处理其他单斜杠
        processed = processed.replace(/(?<!\\)\\(?!\\)/g, '\\\\');
        processed = processed.replace(/\\\\([A-Z])/g, '\\\\$1');

        // 修复可能产生的过多斜杠(四个以上)，确保只有双斜杠
        processed = processed.replace(/\\{4,}/g, '\\\\');

        return '$' + processed + '$';
    });

    return content;
}

/**
 * 处理单个内容中的LaTeX公式换行和斜杠
 * @param {string} content 要处理的内容
 * @returns {string} 处理后的内容
 */
function processLatexContent(content) {
    if (!content) return content;

    // 定义正则表达式来匹配LaTeX公式块
    const inlineRegex = /\$((?:\\.|[^\$\n])*?)\$/g;
    const displayRegex = /\$\$((?:\\.|[^\$])*?)\$\$/gs; // 注意使用s标志来匹配多行

    // 处理行内公式
    content = content.replace(inlineRegex, function (match, formula) {
        // 保留原始公式，不做过度处理
        // 只处理换行为LaTeX换行符
        let processed = formula;

        // 确保LaTeX命令前有单斜杠，但不重复添加
        processed = processed.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

        return '$' + processed + '$';
    });

    // 处理行间公式
    content = content.replace(displayRegex, function (match, formula) {
        // 将可见的换行替换为 LaTeX 的换行符 \\
        let processed = formula.replace(/\n/g, '\\\\');

        // 确保LaTeX命令前有单斜杠，但不重复添加
        processed = processed.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

        // 确保换行符是双斜杠
        processed = processed.replace(/(?<!\\)\\\n/g, '\\\\\n');

        return '$$' + processed + '$$';
    });

    return content;
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
 * 在页面加载完成后处理所有HTML内容中的LaTeX公式换行
 */
function processHTMLLatexLineBreaks() {
    // 获取所有包含LaTeX公式的元素
    const mathElements = document.querySelectorAll('.knowledge-point-content, .exercise-content, .solution-content');

    mathElements.forEach(element => {
        // 获取元素的HTML内容
        const html = element.innerHTML;

        // 处理行间公式中的换行
        const processedHTML = html.replace(/\$\$(.*?)\$\$/gs, function (match, formula) {
            // 将公式中的<br>和\n替换为 LaTeX 的换行符 \\
            let processedFormula = formula
                .replace(/<br\s*\/?>/gi, '\\\\')
                .replace(/\n/g, '\\\\')
                .replace(/\r/g, '');

            return '$$' + processedFormula + '$$';
        });

        // 更新元素的HTML内容
        if (html !== processedHTML) {
            element.innerHTML = processedHTML;
        }
    });

    console.log('已处理HTML内容中的LaTeX公式换行');

    // 重新渲染MathJax
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise()
            .catch(err => console.warn('MathJax渲染警告:', err));
    }
}

// MathJax批量渲染和延迟加载优化

// 批量渲染MathJax公式
function batchRenderMathJax(containers) {
    if (window.MathJax && window.MathJax.typesetPromise) {
        // 收集所有需要渲染的容器
        window.MathJax.typesetPromise(containers)
            .catch(err => console.warn('MathJax渲染警告:', err));
    }
}

// 延迟渲染，避免频繁调用
const pendingContainers = new Set();
let renderTimeout = null;

function scheduleRender(container) {
    pendingContainers.add(container);

    if (renderTimeout) clearTimeout(renderTimeout);

    renderTimeout = setTimeout(() => {
        if (pendingContainers.size > 0) {
            batchRenderMathJax(Array.from(pendingContainers));
            pendingContainers.clear();
        }
    }, 300);
}

// 题目折叠展开功能
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM完全加载');

    // 初始化DeepSeek API
    initializeDeepSeekAPI();

    // 设置API密钥处理
    setupApiKeyHandling();

    // 设置事件监听器
    setupEventListeners();

    // 初始化页面功能
    initializePage();

    // 更新分类按钮
    updateCategoryButtons();

    // 处理页面上的LaTeX公式换行
    processHTMLLatexLineBreaks();
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
                    content: `你是一个专注的微分方程助手。遵循以下规则:
                    1. 严格围绕当前上下文(题目或知识点)回答问题，无论用户提问什么
                    2. 使用准确的LaTeX公式，公式中必须使用双反斜杠(\\)，公式用$或$$包裹。例如:
                       定积分: $\\int_{a}^{b} f(x) dx$或者$$\\int_{a}^{b} f(x) dx$$
                       极限: $\\lim\\limits_{x \\to a} f(x)$或者$$\\lim\\limits_{x \\to a} f(x)$$
                       分数: $\\frac{a}{b}$或者$$\\frac{a}{b}$$
                       微分: $\\frac{d}{dx}f(x)$或者$$\\frac{d}{dx}f(x)$$
                       导数: $f'(x)$或者$$f'(x)$$
                       根式: $\\sqrt{x}$或者$$\\sqrt{x}$$
                    3. 复杂公式推导时使用清晰的步骤展示
                    4. 总是以用户当前所查看的内容为基础进行回答，遇到无法回答的问题，不要脱离上下文，应转回当前上下文(题目或知识点)`
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
        systemMessage.className = 'deepseek-chat-message deepseek-chat-ai';
        systemMessage.innerHTML = '请先设置您的DeepSeek API密钥再使用AI功能。点击页面顶部的"保存密钥"按钮进行设置。';
        chatContainer.appendChild(systemMessage);

        // 自动滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

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
    aiMessage.innerHTML = '<div class="loading-spinner"></div> AI思考中...';
    chatContainer.appendChild(aiMessage);

    // 自动滚动到底部
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 保存当前消息以便多轮对话
    window.deepseekSession.messages.push({
        role: 'user',
        content: message
    });

    // 获取当前上下文
    const context = window.deepseekSession.currentContext;

    // 更新消息到aiMessage
    (async function () {
        try {
            // 获取DeepSeek回答
            let reply = await askDeepSeek(message, context);

            // 保存AI回复
            window.deepseekSession.messages.push({
                role: 'assistant',
                content: reply
            });

            // 处理公式
            reply = reply.replace(/\$(.+?)\$/g, function (match) {
                return match;
            });

            // 显示AI回复
            aiMessage.innerHTML = reply;

            // 渲染公式
            if (window.MathJax) {
                try {
                    if (MathJax.typesetPromise) {
                        MathJax.typesetPromise([aiMessage]).catch(function (err) {
                            console.warn('MathJax渲染警告:', err);
                        });
                    } else if (MathJax.Hub) {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, aiMessage]);
                    }
                } catch (err) {
                    console.error('渲染公式出错:', err);
                }
            }

            // 自动滚动到底部
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error('发送消息时出错:', error);
            aiMessage.innerHTML = `发生错误: ${error.message}`;
        }
    })();
}

function setupEventListeners() {
    console.log('设置事件监听器...');

    // 尝试修复AI分析按钮事件丢失问题
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            console.log('延迟绑定AI分析按钮事件');
            bindAiAnalysisButtons();
        }, 1000);
    });

    // 确保MathJax渲染后依然能正常点击按钮
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('ai-analysis-btn') || e.target.closest('.ai-analysis-btn')) {
            console.log('直接点击捕获: AI分析按钮');
            const btn = e.target.classList.contains('ai-analysis-btn') ? e.target : e.target.closest('.ai-analysis-btn');
            handleAiAnalysisButtonClick(btn, e);
        }
    });

    // 移除所有现有的事件监听器（通过克隆按钮来移除）
    document.querySelectorAll('.solution-toggle').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    // 筛选器区域的事件委托 - 处理所有筛选按钮
    const filtersSection = document.querySelector('.filters');
    if (filtersSection) {
        filtersSection.addEventListener('click', function (e) {
            // 筛选按钮
            if (e.target.matches('.filter-btn') || e.target.closest('.filter-btn')) {
                const button = e.target.matches('.filter-btn') ? e.target : e.target.closest('.filter-btn');
                filterButtonHandler({
                    target: button
                });
            }

            // 难度按钮
            if (e.target.matches('.difficulty-btn') || e.target.closest('.difficulty-btn')) {
                const button = e.target.matches('.difficulty-btn') ? e.target : e.target.closest('.difficulty-btn');
                difficultyButtonHandler({
                    target: button
                });
            }

            // 类型按钮
            if (e.target.matches('.type-btn') || e.target.closest('.type-btn')) {
                const button = e.target.matches('.type-btn') ? e.target : e.target.closest('.type-btn');
                typeButtonHandler({
                    target: button
                });
            }
        });
    }

    // 设置所有事件监听器 - 使用事件委托代替大量独立监听器
    function setupEventListeners() {
        console.log('设置事件委托');

        try {
            // 习题区域事件委托 - 同时处理解析按钮和AI分析按钮
            const exerciseSection = document.querySelector('.exercise-section');
            if (exerciseSection) {
                exerciseSection.addEventListener('click', function (e) {
                    // 解析按钮
                    if (e.target.matches('.solution-toggle') || e.target.closest('.solution-toggle')) {
                        const button = e.target.matches('.solution-toggle') ? e.target : e.target.closest('.solution-toggle');
                        const exerciseId = button.getAttribute('data-exercise-id');
                        toggleSolution(exerciseId, button);
                    }

                    // AI分析按钮
                    if (e.target.matches('.ai-analysis-btn') || e.target.closest('.ai-analysis-btn')) {
                        const button = e.target.matches('.ai-analysis-btn') ? e.target : e.target.closest('.ai-analysis-btn');
                        handleAiAnalysisButtonClick(button, e);
                    }
                });
            }

            // 搜索输入框
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', handleSearchInput);
            }

            console.log('事件委托设置完成');
        } catch (error) {
            console.error('设置事件监听器错误:', error);
        }
    }

    aiButtons.forEach((btn, index) => {
        console.log(`按钮 ${index + 1} - 知识点ID: ${btn.getAttribute('data-knowledge-id')}, 习题ID: ${btn.getAttribute('data-exercise-id')}`);

        btn.addEventListener('click', function (e) {
            console.log('按钮被点击');
            e.preventDefault();
            e.stopPropagation();

            const exerciseId = this.getAttribute('data-exercise-id');
            const knowledgeId = this.getAttribute('data-knowledge-id');

            console.log(`点击的按钮 - 知识点ID: ${knowledgeId}, 习题ID: ${exerciseId}`);

            if (exerciseId) {
                console.log(`开始处理习题ID: ${exerciseId}`);
                // 习题分析
                const exercise = exerciseData.exercises.find(ex => ex.id == exerciseId);
                if (exercise) {
                    console.log(`找到习题: ${exercise.title}`);
                    // 准备上下文内容
                    const content = `题目：${exercise.question}\n\n解析：${stripHTML(exercise.explanation)}\n\n答案：${exercise.answer}`;

                    // 打开DeepSeek模态框
                    openDeepSeekModal(content, `习题${exercise.id}: ${exercise.title}`);
                } else {
                    console.error(`找不到习题ID: ${exerciseId}`);
                }
            } else if (knowledgeId !== null) {
                console.log(`开始处理知识点ID: ${knowledgeId}`);
                // 知识点分析
                const id = parseInt(knowledgeId);
                console.log(`解析后的知识点ID: ${id}, 知识点总数: ${exerciseData.knowledgePoints.length}`);

                if (id >= 0 && id < exerciseData.knowledgePoints.length) {
                    const point = exerciseData.knowledgePoints[id];
                    console.log(`找到知识点: ${point.title}`);

                    // 准备上下文内容
                    const content = `知识点：${point.title}\n\n${stripHTML(point.content)}`;

                    // 打开DeepSeek模态框
                    openDeepSeekModal(content, `知识点：${point.title}`);
                } else {
                    console.error(`知识点ID超出范围: ${id}`);
                }
            } else {
                console.error('无法获取按钮的ID属性');
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

// 筛选按钮点击处理
function filterButtonHandler(event) {
    // 阻止默认行为
    event.preventDefault();

    // 获取筛选值
    const filterValue = event.currentTarget.getAttribute('data-filter');

    // 更新激活状态
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // 保存当前筛选状态
    currentFilters.category = filterValue;

    // 应用筛选
    applyFilter(currentFilters.category, currentFilters.searchText);
}

// 难度按钮点击处理
function difficultyButtonHandler(event) {
    // 阻止默认行为
    event.preventDefault();

    // 获取难度值
    const difficultyValue = event.currentTarget.getAttribute('data-difficulty');

    // 更新激活状态
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    difficultyBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // 保存当前筛选状态
    currentFilters.difficulty = difficultyValue;

    // 应用筛选
    applyFilter(currentFilters.category, currentFilters.searchText);
}

// 类型按钮点击处理
function typeButtonHandler(event) {
    // 阻止默认行为
    event.preventDefault();

    // 获取类型值
    const typeValue = event.currentTarget.getAttribute('data-type');

    // 更新激活状态
    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // 保存当前筛选状态
    currentFilters.type = typeValue;

    // 应用筛选
    applyFilter(currentFilters.category, currentFilters.searchText);
}

// 搜索功能已移除

// 初始化当前筛选状态
const currentFilters = {
    category: 'all'
};

// 应用过滤器 - 优化版
function applyFilter(category) {
    // 减少日志输出以提高性能
    // console.log(`应用过滤器: 分类=${category}`);
    let visibleCount = 0;

    // 使用requestAnimationFrame来避免在渲染周期内进行大量 DOM 操作
    requestAnimationFrame(() => {
        // 获取所有习题元素
        const exerciseItems = document.querySelectorAll('.exercise-item');

        // 使用DocumentFragment来批量处理DOM操作
        const fragment = document.createDocumentFragment();
        const container = document.getElementById('exercise-container');

        // 如果是'all'分类，直接显示所有题目
        if (category === 'all') {
            exerciseItems.forEach(item => {
                item.style.display = 'block';
                visibleCount++;
            });
        } else {
            // 其他分类需要过滤
            const categoryMap = {
                'concepts': '微分方程基本概念',
                'separable': '可分离变量的微分方程',
                'homogeneous': '齐次微分方程',
                'linear-first': '一阶线性微分方程',
                'linear-second': '二阶常系数线性微分方程'
            };

            const targetCategory = categoryMap[category];

            // 使用数组方法代替循环来提高效率
            exerciseItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = targetCategory ? itemCategory.includes(targetCategory) : true;

                item.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) visibleCount++;
            });
        }

        // 更新计数显示
        const exerciseCountElement = document.getElementById('exercise-count');
        if (exerciseCountElement) {
            exerciseCountElement.textContent = visibleCount;
        } else {
            const statsNumberElements = document.querySelectorAll('.exercise-stats .stats-item .stats-number');
            if (statsNumberElements.length > 0) {
                statsNumberElements[0].textContent = visibleCount;
            }
        }

        // 显示或隐藏无结果提示
        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        // 延迟更新按钮计数，以减少主线程负担
        setTimeout(() => updateFilterButtonCounts(), 50);
    });

    return visibleCount;
}

// 更新筛选按钮上的数量计数
function updateFilterButtonCounts() {
    console.log('更新筛选按钮计数...');

    // 获取所有习题，而不仅仅是可见的
    const allExercises = document.querySelectorAll('.exercise-item');

    // 打印总习题数
    console.log(`总习题数量: ${allExercises.length}`);

    // 按分类统计
    const categoryCounts = {
        all: allExercises.length,
        concepts: 0,
        separable: 0,
        homogeneous: 0,
        'linear-first': 0,
        'linear-second': 0
    };

    // 遍历所有习题并统计各类别数量
    allExercises.forEach(item => {
        const category = item.getAttribute('data-category');

        // 根据类别属性进行统计
        if (category && category.includes('微分方程基本概念')) {
            categoryCounts.concepts++;
        }
        else if (category && category.includes('可分离变量的微分方程')) {
            categoryCounts.separable++;
        }
        else if (category && category.includes('齐次微分方程')) {
            categoryCounts.homogeneous++;
        }
        else if (category && category.includes('一阶线性微分方程')) {
            categoryCounts['linear-first']++;
        }
        else if (category && category.includes('二阶常系数线性微分方程')) {
            categoryCounts['linear-second']++;
        }
    });

    // 打印分类统计结果，便于调试
    console.log('分类统计结果:', categoryCounts);

    // 更新分类按钮计数
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        const countSpan = btn.querySelector('.count');
        if (countSpan && categoryCounts[filterValue] !== undefined) {
            countSpan.textContent = `(${categoryCounts[filterValue]})`;
            console.log(`更新按钮 ${filterValue} 的计数为 ${categoryCounts[filterValue]}`);
        }
    });
}

// 强制修复筛选按钮
function forceFixFilterButtons() {
    console.log('强制修复筛选按钮...');

    // 确保使用setupEventListeners重新绑定所有事件监听
    setupEventListeners();

    // 更新按钮计数
    setTimeout(() => {
        // 重新应用当前筛选器以更新计数
        applyFilter(currentFilters.category, currentFilters.searchText);
    }, 100);

    console.log('筛选按钮修复完成');
}

// 不再使用难度分类
function getDifficultyText(difficulty) {
    return '';
}

// 处理AI分析按钮点击
function handleAiAnalysisButtonClick(btn, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    console.log('处理AI分析按钮点击');
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

            openDeepSeekModal(content, title);
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
            const content = `知识点：${point.title}\n\n${cleanContent}\n\n这是关于微分方程的重要知识点，包含了相关的定义、性质和应用。`;

            openDeepSeekModal(content, `知识点：${point.title}`);
        } else {
            console.error(`知识点ID超出范围: ${id}`);
        }
    } else {
        console.error('按钮没有ID属性');
    }
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
    const welcomeMessage = `我正在分析${welcomeType}「${title}」。请随时提问关于${title}的任何问题，我会始终围绕${title}进行回答。`;

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
    content = content.replace(/\$\$(([\s\S]*?))\$\$/gs, function (match, formula) {
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
 * 生成AI回复
 * @param {string} userMessage 用户消息（已包含完整内容）
 * @param {string} context 当前上下文
 * @param {string} title 当前标题
 * @param {boolean} isExercise 是否为习题
 */
function generateAIResponse(userMessage, context, title, isExercise) {
    console.log('生成AI回复');

    // 提取用户实际问题
    const userQuestionMatch = userMessage.match(/用户问题：([\s\S]*)$/);
    const actualUserQuestion = userQuestionMatch ? userQuestionMatch[1].trim() : '';

    console.log('实际用户问题：', actualUserQuestion);

    // 直接将完整内容发送给AI进行处理
    // 这样AI就有了完整的上下文信息

    // 不预设问题类型，直接将完整上下文传递给AI
    // 无论用户问题是什么，都将其视为与当前题目或知识点相关
    let aiResponse = '';

    // 将完整上下文和用户问题一起发送给AI
    // 这样AI就会基于当前上下文回答用户的问题
    aiResponse = `${context}\n\n用户问题：${actualUserQuestion}`;

    // 注意：这里不再进行任何预设的问题类型判断
    // 完全依赖DeepSeek API来理解上下文并生成相关回复

    return aiResponse;
}

// 聊天界面消息管理函数

/**
 * 添加系统消息
 * @param {string} message 消息内容
 */
function addSystemMessage(message) {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'deepseek-message system-message';
    messageElement.innerHTML = `<div class="message-content">${message}</div>`;

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
    messageElement.innerHTML = `<div class="message-content">${message}</div>`;

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

    // 使用增强的LaTeX公式处理函数
    message = enhanceLatexFormulas(message);

    // 处理换行
    message = message.replace(/\n/g, '<br>');

    // 使用增强的Markdown格式处理
    const formattedMessage = formatMarkdown(message);

    messageElement.innerHTML = formattedMessage;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 渲染LaTeX公式
    if (window.MathJax) {
        setTimeout(() => {
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([messageElement])
                    .catch(err => console.warn('MathJax渲染警告:', err));
            } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
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

    // 创建div元素并设置HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // 返回纯文本
    return temp.textContent || temp.innerText || '';
}

// 绑定AI分析按钮事件
function bindAiAnalysisButtons() {
    const buttons = document.querySelectorAll('.ai-analysis-btn');
    console.log(`找到 ${buttons.length} 个AI分析按钮`);

    buttons.forEach(btn => {
        btn.onclick = function (e) {
            handleAiAnalysisButtonClick(this, e);
        };
    });
}

function renderKnowledgeSection() {
    console.log('渲染知识点部分...');

    // 使用幻灯片方式渲染知识点
    initSlides();

    // 设置圆形导航按钮点击事件
    setupCircleNavigation();

    console.log('知识点幻灯片渲染完成');

    // 为知识点区域添加事件委托
    const knowledgeSection = document.querySelector('.knowledge-section');
    if (knowledgeSection) {
        console.log('为知识点区域添加事件委托');
        knowledgeSection.addEventListener('click', function (e) {
            // 处理AI分析按钮点击
            if (e.target.matches('.ai-analysis-btn') || e.target.closest('.ai-analysis-btn')) {
                const button = e.target.matches('.ai-analysis-btn') ? e.target : e.target.closest('.ai-analysis-btn');
                console.log('知识点AI分析按钮被点击');
                handleAiAnalysisButtonClick(button, e);
            }
        });
    }

    // 在渲染完毕后，确保MathJax渲染公式
    setTimeout(() => {
        const slides = document.querySelectorAll('.slide');
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            console.log('正在使用MathJax渲染幻灯片公式...');
            MathJax.typesetPromise(Array.from(slides)).then(() => {
                console.log('幻灯片公式渲染完成');
            }).catch(err => {
                console.error('幻灯片公式渲染失败:', err);
            });
        }
    }, 300);
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
 * 初始化页面功能
 */
function initializePage() {
    console.log('初始化页面功能...');

    // 设置题目定位器功能
    setupProblemLocator();

    // 添加返回顶部按钮
    addScrollToTopButton();

    console.log('页面功能初始化完成');
}

/**
 * 设置题目定位器功能
 */
function setupProblemLocator() {
    console.log('开始设置题目定位器...');
    const locateBtn = document.getElementById('locate-problem-btn');
    const problemInput = document.getElementById('problem-number-input');

    if (!locateBtn || !problemInput) {
        console.warn('题目定位器元素不存在');
        // 尝试在一段时间后再次初始化
        setTimeout(setupProblemLocator, 1000);
        return;
    }

    // 检查页面上的习题元素
    const exerciseItems = document.querySelectorAll('.exercise-item');
    console.log(`当前页面上有 ${exerciseItems.length} 个习题元素`);

    // 打印几个习题的ID以便调试
    exerciseItems.forEach((item, index) => {
        if (index < 5) { // 只打印前5个作为示例
            console.log(`习题 ${index + 1} 的ID: ${item.getAttribute('data-id')}`);
        }
    });

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
        console.log('查询选择器:', `.exercise-item[data-id="${problemNumber}"]`);

        if (!problemElement) {
            console.warn(`未找到题号为 ${problemNumber} 的习题`);
            alert(`未找到题号为 ${problemNumber} 的习题`);
            return;
        }

        console.log('找到了目标题目元素:', problemElement);

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

// 帮助函数来渲染公式
function renderFormulas(container) {
    if (!window.MathJax) {
        console.warn('MathJax未加载，无法渲染公式');
        return;
    }

    try {
        if (window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container])
                .catch(err => console.warn('MathJax渲染警告:', err));
        } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, container]);
        }
    } catch (error) {
        console.error('渲染公式时出错:', error);
    }
}

// 更新分类显示
function updateCategoryDisplay() {
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
        '基本概念': 0,
        '可分离变量的微分方程': 0,
        '齐次微分方程': 0,
        '一阶线性微分方程': 0,
        '二阶常系数线性微分方程': 0
    };

    // 统计每个分类的习题数量和类型
    allExercises.forEach(exercise => {
        const category = exercise.getAttribute('data-category');
        const type = exercise.getAttribute('data-type');

        if (category && categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
        }

        // 统计基本概念类型题目
        if (type === '判断题' || type === '填空题' || type === '概念题' || type === '理论题') {
            categoryCounts['基本概念']++;
        }
    });

    console.log('分类统计结果:', categoryCounts);

    // 更新按钮上的数量显示
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const filterType = button.getAttribute('data-filter');
        let countToShow = 0;

        if (filterType === 'all') {
            countToShow = categoryCounts['全部'];
        } else if (filterType === 'concepts') {
            countToShow = categoryCounts['基本概念'];
        } else if (filterType === 'separable') {
            countToShow = categoryCounts['可分离变量的微分方程'];
        } else if (filterType === 'homogeneous') {
            countToShow = categoryCounts['齐次微分方程'];
        } else if (filterType === 'linear-first') {
            countToShow = categoryCounts['一阶线性微分方程'];
        } else if (filterType === 'linear-second') {
            countToShow = categoryCounts['二阶常系数线性微分方程'];
        } else if (filterType === 'calculation') {
            // 计算分类包含所有计算类题目
            countToShow = categoryCounts['可分离变量的微分方程'] +
                categoryCounts['齐次微分方程'] +
                categoryCounts['一阶线性微分方程'];
        }

        // 更新计数显示
        const countSpan = button.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = `(${countToShow})`;
        }
    });

    console.log('分类显示更新完成');
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
            oldButton.setAttribute('data-category', '微分方程计算');
        } else if (filterType === 'separable') {
            oldButton.setAttribute('data-category', '可分离变量的微分方程');
        } else if (filterType === 'homogeneous') {
            oldButton.setAttribute('data-category', '齐次微分方程');
        } else if (filterType === 'linear-first') {
            oldButton.setAttribute('data-category', '一阶线性微分方程');
        } else if (filterType === 'linear-second') {
            oldButton.setAttribute('data-category', '二阶常系数线性微分方程');
        } else if (filterType === 'concepts') {
            oldButton.setAttribute('data-category', '微分方程基本概念');
        } else if (filterType === 'all') {
            oldButton.setAttribute('data-category', '全部');
        }
    });

    // 更新分类显示
    updateCategoryDisplay();

    console.log('分类按钮更新完成，共更新', filterButtons.length, '个按钮');
}

/**
 * 渲染所有习题
 * 将习题数据渲染到页面上
 */
function renderAllExercises() {
    console.log('执行renderAllExercises函数');

    // 查找习题容器
    const exerciseContainer = document.getElementById('exercise-container');
    if (!exerciseContainer) {
        console.error('习题容器不存在');
        return;
    }

    // 确保习题数据存在
    if (!exerciseData || !exerciseData.exercises || !Array.isArray(exerciseData.exercises)) {
        console.error('习题数据不存在或不是数组');
        return;
    }

    console.log(`找到 ${exerciseData.exercises.length} 道习题`);

    // 清空容器
    exerciseContainer.innerHTML = '';

    // 如果没有习题，显示提示
    if (exerciseData.exercises.length === 0) {
        exerciseContainer.innerHTML = '<div class="no-exercises">暂无习题数据</div>';
        return;
    }

    // 渲染每道习题
    exerciseData.exercises.forEach(exercise => {
        // 创建习题元素
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise-item';
        exerciseElement.setAttribute('data-id', exercise.id);
        exerciseElement.setAttribute('data-type', exercise.type);
        exerciseElement.setAttribute('data-difficulty', exercise.difficulty);
        exerciseElement.setAttribute('data-category', exercise.category);

        // 创建习题内容
        exerciseElement.innerHTML = `
            <div class="exercise-header">
                <h3 class="exercise-title">${exercise.title}</h3>
                <span class="exercise-type">${exercise.type}</span>
                <span class="exercise-difficulty">${exercise.difficulty}</span>
            </div>
            <div class="exercise-content">
                <div class="question">${exercise.question}</div>
            </div>
            <div class="exercise-footer">
                <button class="solution-toggle" data-exercise-id="${exercise.id}">
                    <i class="fas fa-lightbulb"></i> 查看解析
                </button>
                <button class="ai-analysis-btn" data-exercise-id="${exercise.id}">
                    <i class="fas fa-robot"></i> AI分析
                </button>

            </div>
            <div id="solution-${exercise.id}" class="solution-content">
                <div class="solution-header">
                    <strong>解析：</strong>
                </div>
                <div class="solution-body">
                    ${exercise.explanation || ''}
                </div>
                <div class="answer">
                    <strong>答案：</strong> ${exercise.answer || ''}
                </div>
            </div>
        `;

        // 添加到容器
        exerciseContainer.appendChild(exerciseElement);
    });

    // 附加事件监听器
    const solutionButtons = document.querySelectorAll('.solution-toggle');
    solutionButtons.forEach(button => {
        button.addEventListener('click', solutionToggleHandler);
    });

    // 绑定AI分析按钮
    bindAiAnalysisButtons();

    // 更新筛选按钮数量
    updateFilterButtonCounts();

    // 应用默认筛选
    applyFilter('all');

    // 更新数学公式
    setTimeout(() => {
        if (window.MathJax) {
            const solutionContents = document.querySelectorAll('.solution-content');
            solutionContents.forEach(content => {
                content.style.display = 'none';
            });

            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([exerciseContainer])
                    .catch(err => console.warn('MathJax渲染警告:', err));
            }
        }

        // 在习题渲染完成后初始化题目定位器
        console.log('习题渲染完成，初始化题目定位器');
        setupProblemLocator();
    }, 500);

    console.log('习题渲染完成');

}