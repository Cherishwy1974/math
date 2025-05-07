// 题目折叠展开功能
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    try {
        // 初始化DeepSeek API
        initializeDeepSeekAPI();

        // 检查数据是否正确加载
        console.log('Exercise data:', window.exerciseData);

        // 渲染知识点部分
        renderKnowledgeSection();

        // 渲染习题部分
        renderExercises();

        // 添加事件监听器
        addEventListeners();

        // 添加返回顶部按钮
        addScrollToTopButton();

        // 公式特例切换功能已删除

        // 初始化MathJax
        refreshMathJax();

        console.log('Initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// 当整个页面加载完成时，再次确保功能正常工作
window.addEventListener('load', function () {
    console.log('Page fully loaded');

    // 设置全局DeepSeek查询
    setupGlobalDeepSeekQuery();

    // 设置API密钥功能
    setupApiKeyHandling();

    // 在页面加载完成后处理所有HTML内容中的LaTeX公式换行
    processHTMLLatexLineBreaks();
});

// DeepSeek API 配置
window.DEEPSEEK_CONFIG = window.DEEPSEEK_CONFIG || {};
Object.assign(window.DEEPSEEK_CONFIG, {
    API_KEY: '', // 将从用户输入或本地存储获取
    API_URL: 'https://api.deepseek.com/v1/chat/completions',
    MODEL: 'deepseek-chat'
});

/**
 * 设置API密钥处理
 */
function setupApiKeyHandling() {
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiKeyInput = document.getElementById('deepseek-api-key');
    const statusText = document.getElementById('api-key-status-text');

    if (!saveApiKeyBtn || !clearApiKeyBtn || !apiKeyInput || !statusText) {
        console.error('API密钥相关元素未找到');
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
            return '错误：未设置DeepSeek API密钥。请在设置中输入您的API密钥。';
        }

        // 构建发送给 AI 的消息列表
        let messagesToSend = [];

        // 添加系统消息，指导 AI 的行为和输出格式
        messagesToSend.push({
            role: "system",
            content: `你是一个专注的不定积分助手。遵循以下规则:
                    1. 严格围绕当前上下文(题目或知识点)回答问题，无论用户提问什么
                    2. 使用准确的LaTeX公式，公式中必须使用双反斜杠(\\)，公式用$或$$包裹。例如:
                       定积分: $\\int_{a}^{b} f(x) dx$或者$$\\int_{a}^{b} f(x) dx$$
                       极限: $\\lim\\limits_{x \\to a} f(x)$或者$$\\lim\\limits_{x \\to a} f(x)$$
                       分数: $\\frac{a}{b}$或者$$\\frac{a}{b}$$
                       微分: $\\frac{d}{dx}f(x)$或者$$\\frac{d}{dx}f(x)$$
                       导数: $f'(x)$或者$$f'(x)$$
                       根式: $\\sqrt{x}$或者$$\\sqrt{x}$$ 
                    3. 复杂公式推导时使用清晰的步骤展示
                    4. 总是以用户当前所查看的内容为基础进行回答，遇到无法回答的问题，不要脱离上下文，应转回当前上下文(题目或知识点)回答问题`
        });

        // 添加历史消息 (如果需要可以取消注释)
        // messagesToSend = messagesToSend.concat(window.deepseekSession.messages);

        // 添加当前用户的问题和上下文
        let userMessageContent = '';
        if (context) {
            // 确保上下文是纯文本，移除可能存在的HTML标签
            const plainTextContext = stripHTML(context).trim();
            if (plainTextContext) {
                userMessageContent += `当前上下文内容如下：\n---\n${plainTextContext}\n---\n\n`;
            }
        }
        userMessageContent += `我的问题是：${question}`;

        messagesToSend.push({
            role: "user",
            content: userMessageContent
        });

        console.log('发送给 DeepSeek 的消息:', messagesToSend);

        const response = await fetch(DEEPSEEK_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.MODEL,
                messages: messagesToSend,
                max_tokens: 1024, // 根据需要调整
                temperature: 0.7 // 根据需要调整
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('DeepSeek API 错误:', errorData);
            if (response.status === 401) {
                return '错误：DeepSeek API密钥无效或已过期。请检查您的API密钥设置。';
            }
            return `错误：请求DeepSeek API失败。状态码: ${response.status}. 详情: ${errorData.error?.message || '未知错误'}`;
        }

        const data = await response.json();
        console.log('来自 DeepSeek 的原始响应:', data);

        if (data.choices && data.choices.length > 0) {
            const aiResponse = data.choices[0].message.content;
            console.log('处理前的 AI 回答:', aiResponse);
            // 更新会话历史 (如果需要可以取消注释)
            // window.deepseekSession.messages.push({ role: "user", content: userMessageContent });
            // window.deepseekSession.messages.push({ role: "assistant", content: aiResponse });
            return aiResponse;
        } else {
            return '未能从DeepSeek获取有效回答。';
        }
    } catch (error) {
        console.error('调用DeepSeek API时出错:', error);
        return `网络错误或API调用异常: ${error.message}`;
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

    // 获取当前上下文和标题
    const context = window.deepseekSession.currentContext;
    const title = window.deepseekSession.currentTitle || '知识点分析';

    // 保存原始用户消息，不做修改
    window.deepseekSession.messages.push({
        role: 'user',
        content: message
    });

    // 更新消息到aiMessage
    (async function () {
        try {
            // 获取DeepSeek回答，传入当前上下文确保回答与知识点/习题相关
            let reply = await askDeepSeek(message, context);

            // 保存AI回复
            window.deepseekSession.messages.push({
                role: 'assistant',
                content: reply
            });

            // 处理公式和 Markdown 格式
            reply = processMarkdown(reply);

            // 显示AI回复
            aiMessage.innerHTML = reply;

            // 直接将 AI 回复中的公式标记保留，不做额外处理
            // 这样 MathJax 可以直接渲染原始的 $...$ 和 $$...$$ 标记

            // 在添加新内容后刷新MathJax渲染 - 优化版
            refreshMathJax([aiMessage]);

            // 自动滚动到底部
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error('发送消息时出错:', error);
            aiMessage.innerHTML = `发生错误: ${error.message}`;
        }
    })();
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

    // 保存当前上下文和标题
    window.deepseekSession = {
        currentContext: context,
        currentTitle: title,
        messages: []
    };

    document.querySelector('.deepseek-modal-title').textContent = `DeepSeek AI 分析：${title}`;

    // 添加欢迎消息
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'deepseek-chat-message deepseek-chat-ai';

    // 使用 Markdown 格式的欢迎消息
    const welcomeText = `## 您好！

我是 **DeepSeek AI 助手**。我已经阅读了关于"【${title}】"的内容，请随时提问关于此【${title}】的任何问题，我会始终围绕这个【${title}】进行回答。`;

    // 处理 Markdown 格式
    welcomeMessage.innerHTML = processMarkdown(welcomeText);
    chatContainer.appendChild(welcomeMessage);

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
 * 处理 Markdown 格式和 LaTeX 公式
 * @param {string} text - 需要处理的文本
 * @returns {string} - 处理后的 HTML
 */
function processMarkdown(text) {
    if (!text) return '';

    // 将所有换行统一为 \n
    text = text.replace(/\r\n/g, '\n');
    text = text.replace(/\r/g, '\n');

    // 简化公式处理逻辑，不再替换公式
    // 而是在处理 Markdown 时避开公式部分

    // 收集所有公式的位置信息
    const mathPositions = [];

    // 收集多行公式位置
    let match;
    const displayMathRegex = /\$\$(([\s\S])+?)\$\$/g;
    while ((match = displayMathRegex.exec(text)) !== null) {
        mathPositions.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'display'
        });
    }

    // 收集行内公式位置
    const inlineMathRegex = /\$([^\$\n]+?)\$/g;
    while ((match = inlineMathRegex.exec(text)) !== null) {
        // 检查这个公式是否在多行公式内
        let isInsideDisplayMath = false;
        for (const pos of mathPositions) {
            if (match.index >= pos.start && match.index < pos.end) {
                isInsideDisplayMath = true;
                break;
            }
        }

        if (!isInsideDisplayMath) {
            mathPositions.push({
                start: match.index,
                end: match.index + match[0].length,
                type: 'inline'
            });
        }
    }

    // 步骤 2: 处理 Markdown 格式

    // 处理标题 (# 标题)
    text = text.replace(/^(#{1,6})\s+(.+)$/gm, function (match, hashes, content) {
        const level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
    });

    // 处理粗体 (**文本** 或 __文本__)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // 处理斜体 (*文本* 或 _文本_)
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

    // 处理无序列表 (- 项目 或 * 项目)
    text = text.replace(/^[\s]*[\-\*]\s+(.+)$/gm, '<li>$1</li>');

    // 将连续的列表项包装在 <ul> 标签中
    text = text.replace(/(<li>.+<\/li>)\n+(?!<li>)/g, '$1</ul>');
    text = text.replace(/(?<!<\/ul>\n*)(<li>)/g, '<ul>$1');

    // 处理有序列表 (1. 项目)
    text = text.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // 将连续的有序列表项包装在 <ol> 标签中
    text = text.replace(/(<li>.+<\/li>)\n+(?!<li>)/g, '$1</ol>');
    text = text.replace(/(?<!<\/ol>\n*)(<li>)/g, '<ol>$1');

    // 处理段落 (空行分隔的文本块)
    text = text.replace(/^(?!<[hou][l\d>]).+$/gm, '<p>$&</p>');

    // 处理代码块 (```代码```)
    text = text.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');

    // 处理行内代码 (`代码`)
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 将所有公式位置按起始位置降序排序，以便从后向前处理
    mathPositions.sort((a, b) => b.start - a.start);

    // 先处理 Markdown 格式，但不处理公式部分
    // 将文本分成多个段落处理
    const paragraphs = text.split('\n\n');
    const processedParagraphs = paragraphs.map(para => {
        // 跳过空段落
        if (!para.trim()) return '';

        // 处理标题
        if (/^#{1,6}\s+.+$/.test(para)) {
            return para.replace(/^(#{1,6})\s+(.+)$/, (match, hashes, content) => {
                const level = hashes.length;
                return `<h${level}>${content}</h${level}>`;
            });
        }

        // 处理列表
        if (/^[\s]*[\-\*]\s+.+/.test(para)) {
            const items = para.split('\n').map(line => {
                return line.replace(/^[\s]*[\-\*]\s+(.+)$/, '<li>$1</li>');
            }).join('');
            return `<ul>${items}</ul>`;
        }

        // 处理有序列表
        if (/^[\s]*\d+\.\s+.+/.test(para)) {
            const items = para.split('\n').map(line => {
                return line.replace(/^[\s]*\d+\.\s+(.+)$/, '<li>$1</li>');
            }).join('');
            return `<ol>${items}</ol>`;
        }

        // 处理普通段落
        return `<p>${para}</p>`;
    });

    // 将处理后的段落重新组合
    text = processedParagraphs.join('\n\n');

    // 处理粗体和斜体
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

    // 处理代码块和行内代码
    text = text.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    return text;
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
        // 将可见的换行替换为 LaTeX 的换行符 \
        let processed = formula.replace(/\n/g, '\\');

        // 确保LaTeX命令前有单斜杠，但不重复添加
        processed = processed.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

        // 确保换行符是双斜杠
        processed = processed.replace(/(?<!\\)\\\n/g, '\\\n');

        return '$$' + processed + '$$';
    });

    return content;
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
        const processedHTML = html.replace(/\$\$((?:\\.|[^\$])*?)\$\$/gs, function (match, formula) {
            // 将公式中的<br>和\n替换为 LaTeX 的换行符 \
            let processedFormula = formula
                .replace(/<br\s*\/?>/gi, '\\')
                .replace(/\n/g, '\\')
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

// 在页面加载完成后处理公式
window.addEventListener('load', function () {
    console.log('页面加载完成，处理公式...');
    processHTMLLatexLineBreaks();
    // 特例折叠功能已删除
});

/**
 * 设置公式特例切换功能 - 已删除，不再需要
 */
function setupFormulaExampleToggles() {
    // 此功能已删除
    console.log('公式特例切换功能已删除');
}

/**
 * 公式特例切换按钮点击处理函数 - 已删除，不再需要
 * @param {Event} event 点击事件
 */
function formulaExampleToggleHandler(event) {
    // 此功能已删除
    console.log('公式特例切换功能已删除');
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
        openDeepSeekModal('不定积分知识点全局内容', 'DeepSeek AI 助手');

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

// 幻灯片功能变量
let totalSlides = 0; // 将根据实际知识点数量动态计算
let currentSlide = 0;

// 初始化幻灯片内容
function initSlides() {
    console.log('初始化幻灯片');
    // 获取容器
    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) {
        console.error('找不到幻灯片容器');
        return;
    }

    // 清空容器
    slidesContainer.innerHTML = '';

    // 遇到知识点数据生成幻灯片
    if (window.exerciseData && window.exerciseData.knowledgePoints) {
        // 设置总幻灯片数量
        totalSlides = window.exerciseData.knowledgePoints.length;
        console.log(`总幻灯片数量: ${totalSlides}`);

        window.exerciseData.knowledgePoints.forEach((point, index) => {
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
                        <button class="ai-analysis-btn" data-slide-index="${index}">
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
                // 如果点击的是AI分析按钮或其子元素，不触发幻灯片切换
                if (e.target.closest('.ai-analysis-btn')) {
                    console.log('点击了AI分析按钮，不触发幻灯片切换');
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

    // 添加AI分析按钮事件
    setupAIAnalysisButtons();
}

// 设置AI分析按钮事件
function setupAIAnalysisButtons() {
    console.log('设置AI分析按钮事件');
    // 先移除所有现有的事件监听器
    document.querySelectorAll('.ai-analysis-btn').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    // 重新添加事件监听器
    const aiButtons = document.querySelectorAll('.ai-analysis-btn');
    console.log(`找到 ${aiButtons.length} 个AI分析按钮`);

    aiButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // 阻止事件冒泡，防止触发幻灯片切换
            event.stopPropagation();

            // 使用当前幻灯片索引
            if (window.exerciseData && window.exerciseData.knowledgePoints) {
                console.log(`分析当前幻灯片: ${currentSlide}`);
                const knowledgePoint = window.exerciseData.knowledgePoints[currentSlide];
                if (knowledgePoint) {
                    console.log(`分析知识点: ${knowledgePoint.title}`);
                    openDeepSeekModal(knowledgePoint.content, knowledgePoint.title);
                } else {
                    console.error(`找不到知识点，索引: ${currentSlide}`);
                }
            } else {
                console.error('知识点数据不存在');
            }
        });
    });
}

// 更新当前幻灯片指示
function updateIndicator() {
    // 更新带圈数字导航的激活状态
    const circleNavs = document.querySelectorAll('.circle-num');
    if (circleNavs && circleNavs.length > 0) {
        circleNavs.forEach((nav, index) => {
            if (index === currentSlide) {
                nav.classList.add('active');
                nav.style.background = 'white';
            } else {
                nav.classList.remove('active');
                nav.style.background = 'rgba(255,255,255,0.7)';
            }
        });
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
                // 折叠块功能已删除${nav.textContent} 添加点击事件`);
            });
        }
    }, 500);
}

// 数字导航点击处理函数
function circleNavClickHandler(event) {
    const slideIndex = parseInt(this.getAttribute('data-slide')) - 1;
    console.log(`点击数字导航: ${this.textContent}, 切换到幻灯片 ${slideIndex}`);
    if (!isNaN(slideIndex)) {
        goToSlide(slideIndex);
    }
}

// 优化后的渲染习题函数
function renderExercises(filter = 'all', renderMathJax = true) {
    const container = document.getElementById('exercise-container');
    if (!container) return;

    // 确保exerciseData.exercises存在
    if (!window.exerciseData || !window.exerciseData.exercises || !Array.isArray(window.exerciseData.exercises)) {
        console.error('Exercise data is not properly structured:', window.exerciseData);
        return;
    }

    // 缓存当前滑动位置
    const scrollPosition = window.scrollY;

    // 使用缓存的筛选结果，如果可能
    if (window.cachedExercises && window.cachedExercises[filter]) {
        console.log('Using cached exercises for filter:', filter);
        const filteredExercises = window.cachedExercises[filter];

        // 更新习题统计
        updateExerciseStats(filteredExercises);

        // 渲染习题
        container.innerHTML = filteredExercises.cachedHTML ||
            filteredExercises.map((exercise, index) => createExerciseHTML(exercise, index + 1)).join('');

        // 重新添加事件监听器
        addSolutionToggleListeners();
        addAIAnalysisListeners();

        // 可选的MathJax渲染
        if (renderMathJax) {
            // 使用requestAnimationFrame确保DOM更新后再渲染MathJax
            requestAnimationFrame(() => {
                refreshMathJax();
            });
        } else {
            // 延迟渲染MathJax，提高响应速度
            setTimeout(() => {
                refreshMathJax();
            }, 100);
        }

        // 恢复滑动位置
        window.scrollTo(0, scrollPosition);
        return;
    }

    // 初始化缓存对象
    if (!window.cachedExercises) {
        window.cachedExercises = {};
    }

    // 根据筛选条件过滤习题
    let filteredExercises = window.exerciseData.exercises;

    if (filter !== 'all') {
        // 按类型筛选
        if (filter === 'formula') {
            filteredExercises = window.exerciseData.exercises.filter(exercise => exercise.category === '基本积分');
        }
        else if (filter === 'first-substitution') {
            filteredExercises = window.exerciseData.exercises.filter(exercise => exercise.method && exercise.method.includes('第一类换元'));
        }
        else if (filter === 'second-substitution') {
            filteredExercises = window.exerciseData.exercises.filter(exercise => exercise.method && exercise.method.includes('第二类换元'));
        }
        else if (filter === 'parts') {
            filteredExercises = window.exerciseData.exercises.filter(exercise => exercise.method && exercise.method.includes('分部'));
        }
        else if (filter === 'other') {
            // 筛选不属于上述四类的习题
            filteredExercises = window.exerciseData.exercises.filter(exercise => {
                const isFormula = exercise.category === '基本积分';
                const isFirstSubstitution = exercise.method && exercise.method.includes('第一类换元');
                const isSecondSubstitution = exercise.method && exercise.method.includes('第二类换元');
                const isParts = exercise.method && exercise.method.includes('分部');

                return !isFormula && !isFirstSubstitution && !isSecondSubstitution && !isParts;
            });
        }
    }

    console.log('Filtered exercises:', filteredExercises.length);

    // 缓存筛选结果
    window.cachedExercises[filter] = filteredExercises;

    // 更新习题统计
    updateExerciseStats(filteredExercises);

    // 生成HTML
    const exercisesHTML = filteredExercises.map((exercise, index) => createExerciseHTML(exercise, index + 1)).join('');

    // 缓存生成的HTML
    window.cachedExercises[filter].cachedHTML = exercisesHTML;

    // 渲染习题
    container.innerHTML = exercisesHTML;

    // 重新添加事件监听器
    addSolutionToggleListeners();
    addAIAnalysisListeners();

    // 可选的MathJax渲染
    if (renderMathJax) {
        // 使用requestAnimationFrame确保DOM更新后再渲染MathJax
        requestAnimationFrame(() => {
            refreshMathJax();
        });
    } else {
        // 延迟渲染MathJax，提高响应速度
        setTimeout(() => {
            refreshMathJax();
        }, 100);
    }

    // 延迟调用统计更新函数，减少对主线程的阻塞
    setTimeout(() => {
        if (typeof window.updateCategoryCountsAndStats === 'function') {
            window.updateCategoryCountsAndStats();
        }
    }, 200);

    // 恢复滑动位置
    window.scrollTo(0, scrollPosition);
}

function updateExerciseStats(exercises) {
    const statsItems = document.querySelectorAll('.stats-item .stats-number');
    if (statsItems.length >= 4) {
        // 总题数
        statsItems[0].textContent = exercises.length;

        // 简单题数量
        const easyCount = exercises.filter(ex => ex.difficulty === 'easy').length;
        statsItems[1].textContent = easyCount;

        // 中等题数量
        const mediumCount = exercises.filter(ex => ex.difficulty === 'medium').length;
        statsItems[2].textContent = mediumCount;

        // 困难题数量
        const hardCount = exercises.filter(ex => ex.difficulty === 'hard').length;
        statsItems[3].textContent = hardCount;
    }
}

function createExerciseHTML(exercise, number) {
    // 将解析文本转换为HTML格式
    const explanationHTML = exercise.explanation.split('\n')
        .map(line => {
            if (!line.trim()) return '';
            const [math, comment] = line.split(/\s+(?=\()/);
            return `
                <div class="explanation-step">
                    <div class="explanation-math">${math}</div>
                    ${comment ? `<div class="explanation-comment">${comment}</div>` : ''}
                </div>
            `;
        })
        .join('');

    return `
        <div class="exercise-item" data-id="${exercise.id}">
            <div class="exercise-header">
                <div class="exercise-title-wrapper">
                    <span class="exercise-number">${number}</span>
                    <h3 class="exercise-title">${exercise.title}</h3>
                </div>
                <div class="exercise-meta">
                    <span class="exercise-type"><i class="fas fa-tag"></i> ${exercise.type}</span>
                    <span class="exercise-difficulty ${exercise.difficulty}"><i class="fas fa-battery-half"></i> ${getDifficultyText(exercise.difficulty)}</span>
                    ${exercise.category ? `<span class="exercise-category"><i class="fas fa-folder"></i> ${exercise.category}</span>` : ''}
                    ${exercise.method ? `<span class="exercise-method"><i class="fas fa-tools"></i> ${exercise.method}</span>` : ''}
                </div>
            </div>
            <div class="exercise-content">
                <div class="exercise-question">
                    <div class="question-content">${exercise.question}</div>
                </div>
                <div class="solution-section">
                    <div class="exercise-actions">
                        <button class="solution-toggle"><i class="fas fa-lightbulb"></i> 查看解析</button>
                        <button class="ai-analysis-btn" data-exercise-id="${exercise.id}"><i class="fas fa-robot"></i> AI分析</button>
                    </div>
                    <div class="solution-content">
                        <div class="explanation">
                            <h4><i class="fas fa-chalkboard-teacher"></i> 解析</h4>
                            ${explanationHTML}
                        </div>
                        <div class="answer">
                            <h4><i class="fas fa-check-circle"></i> 答案</h4>
                            ${exercise.answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addEventListeners() {
    console.log('Adding event listeners');

    // 添加解析显示/隐藏事件监听器
    addSolutionToggleListeners();

    // 添加AI分析按钮事件监听器
    addAIAnalysisListeners();

    // 题目定位功能
    setupProblemLocator();

    // 筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Found filter buttons:', filterButtons.length);

    filterButtons.forEach(button => {
        // 移除旧的事件监听器（避免重复添加）
        button.removeEventListener('click', filterButtonHandler);
        // 添加新的事件监听器 - 不需要防抖，因为我们在函数内部处理了延迟
        button.addEventListener('click', filterButtonHandler);
    });

    // 导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found nav links:', navLinks.length);

    navLinks.forEach(link => {
        // 移除旧的事件监听器
        link.removeEventListener('click', navLinkHandler);
        // 添加新的事件监听器
        link.addEventListener('click', navLinkHandler);
    });
}

// 添加AI分析按钮事件监听器
function addAIAnalysisListeners() {
    const buttons = document.querySelectorAll('.ai-analysis-btn');
    console.log('Found AI analysis buttons:', buttons.length);

    buttons.forEach(button => {
        // 移除旧的事件监听器（避免重复添加）
        button.removeEventListener('click', aiAnalysisHandler);
        // 添加新的事件监听器
        button.addEventListener('click', aiAnalysisHandler);
    });
}

// AI分析按钮处理函数
function aiAnalysisHandler(event) {
    const button = event.currentTarget;
    const exerciseId = button.getAttribute('data-exercise-id');
    const knowledgeId = button.getAttribute('data-knowledge-id');

    if (exerciseId) {
        // 习题分析
        const exercise = exerciseData.exercises.find(ex => ex.id.toString() === exerciseId);
        if (exercise) {
            // 准备上下文内容
            const content = `题目：${exercise.question}\n\n解析：${stripHTML(exercise.explanation)}\n\n答案：${exercise.answer}`;

            // 打开DeepSeek模态框
            openDeepSeekModal(content, `习题 ${exerciseId}: ${exercise.title}`);
        }
    } else if (knowledgeId) {
        // 知识点分析
        const pointIndex = parseInt(knowledgeId) - 1;
        if (pointIndex >= 0 && pointIndex < exerciseData.knowledgePoints.length) {
            const point = exerciseData.knowledgePoints[pointIndex];

            // 准备上下文内容
            const content = stripHTML(point.content);

            // 打开DeepSeek模态框
            openDeepSeekModal(content, point.title);
        }
    }
}

// 筛选按钮点击处理函数
function filterButtonHandler(event) {
    // 立即更新UI状态，提供即时反馈
    const button = event.currentTarget;
    const filter = button.getAttribute('data-filter');
    console.log('Filter selected:', filter);

    // 移除所有按钮的active类
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 添加当前按钮的active类
    button.classList.add('active');

    // 立即渲染习题，但延迟渲染MathJax
    renderExercises(filter, false);
}

// 导航链接点击处理函数
function navLinkHandler(event) {
    event.preventDefault();
    console.log('Nav link clicked');

    const link = event.currentTarget;
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
        // 改为即时跳转而非平滑滚动
        target.scrollIntoView({ behavior: 'auto' });
    } else {
        console.error('Target element not found:', targetId);
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
            behavior: 'auto'
        });
    });
}

/**
 * 获取难度对应的文字
 * @param {string} difficulty 难度代码
 * @returns {string} 难度文字
 */
function getDifficultyText(difficulty) {
    const difficultyMap = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难'
    };
    return difficultyMap[difficulty] || difficulty;
}

/**
 * 设置题目定位功能
 */
function setupProblemLocator() {
    const problemNumberInput = document.getElementById('problem-number-input');
    const locateProblemBtn = document.getElementById('locate-problem-btn');

    if (!problemNumberInput || !locateProblemBtn) {
        console.error('题目定位器元素未找到');
        return;
    }

    console.log('设置题目定位功能');

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

    // 定位题目函数
    function locateProblemByNumber() {
        const problemNumber = problemNumberInput.value.trim();
        if (!problemNumber) return;

        console.log('尝试定位题目:', problemNumber);

        const exerciseItems = document.querySelectorAll('.exercise-item');
        let found = false;
        let targetItem = null;

        // 先遍历所有题目找到目标题目
        for (let i = 0; i < exerciseItems.length; i++) {
            const item = exerciseItems[i];
            const itemId = item.getAttribute('data-id');
            if (itemId === problemNumber) {
                found = true;
                targetItem = item;
                break;
            }
        }

        if (found && targetItem) {
            // 显示所有题目（可能在筛选状态下隐藏了）
            // 先重置筛选按钮状态
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // 激活“全部题目”按钮
            const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allFilterBtn) {
                allFilterBtn.classList.add('active');
            }

            // 重新渲染所有题目
            renderExercises('all', false);

            // 等待渲染完成后再滚动到目标题目
            setTimeout(() => {
                // 重新获取元素（因为可能已经重新渲染）
                const newTargetItem = document.querySelector(`.exercise-item[data-id="${problemNumber}"]`);
                if (newTargetItem) {
                    // 滚动到该题目
                    newTargetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // 使用动画类而不是直接改变背景色
                    newTargetItem.classList.add('problem-highlight');
                    setTimeout(() => {
                        newTargetItem.classList.remove('problem-highlight');
                    }, 2000);
                }
            }, 100);
        } else {
            alert(`未找到题号为 ${problemNumber} 的题目`);
        }
    }
}

// 在添加新内容后刷新MathJax渲染
function refreshMathJax() {
    console.log('Refreshing MathJax...');
    if (window.MathJax) {
        try {
            if (window.MathJax.typesetPromise) {
                // MathJax v3
                window.MathJax.typesetPromise();
            } else if (window.MathJax.Hub) {
                // MathJax v2
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
            }
        } catch (e) {
            console.error('渲染公式时出错:', e);
        }
        // 公式渲染后确保表格宽度正确
        setTimeout(ensureTableWidths, 200);
    }
}

/**
 * 确保表格宽度自适应函数 - 适用于不定积分基本公式表格
 */
function ensureTableWidths() {
    try {
        // 查找所有公式表格
        const formulaTables = document.querySelectorAll('.formula-table');

        if (!formulaTables || formulaTables.length === 0) {
            console.log('未找到公式表格');
            return;
        }

        console.log(`找到 ${formulaTables.length} 个公式表格，开始调整宽度`);

        // 遍历每个表格进行处理
        formulaTables.forEach((table, tableIndex) => {
            // 获取表格行
            const rows = table.querySelectorAll('tr');
            if (!rows || rows.length === 0) return;

            // 计算每列的最大宽度
            const columnsWidths = [];

            // 初始化列宽数组
            const firstRow = rows[0];
            const cells = firstRow.querySelectorAll('td, th');
            for (let i = 0; i < cells.length; i++) {
                columnsWidths.push(0);
            }

            // 计算每列的最大宽度
            rows.forEach(row => {
                const cells = row.querySelectorAll('td, th');
                cells.forEach((cell, index) => {
                    if (index < columnsWidths.length) {
                        const cellWidth = cell.scrollWidth;
                        columnsWidths[index] = Math.max(columnsWidths[index], cellWidth);
                    }
                });
            });

            // 设置列宽
            rows.forEach(row => {
                const cells = row.querySelectorAll('td, th');
                cells.forEach((cell, index) => {
                    if (index < columnsWidths.length) {
                        cell.style.minWidth = `${columnsWidths[index]}px`;
                    }
                });
            });

            console.log(`表格 ${tableIndex + 1} 宽度调整完成`);
        });
    } catch (e) {
        console.error('调整表格宽度时出错:', e);
    }
}

// 添加解析显示/隐藏事件监听器
function addSolutionToggleListeners() {
    console.log('Adding solution toggle listeners');
    const buttons = document.querySelectorAll('.solution-toggle');
    console.log('Found solution toggle buttons:', buttons.length);

    buttons.forEach(button => {
        // 移除旧的事件监听器（避免重复添加）
        button.removeEventListener('click', solutionToggleHandler);
        // 添加新的事件监听器
        button.addEventListener('click', solutionToggleHandler);
    });
}

// 解析按钮点击处理函数
function solutionToggleHandler(event) {
    console.log('Solution toggle clicked');
    const button = event.currentTarget;
    const solution = button.closest('.exercise-actions').nextElementSibling;

    if (!solution) {
        console.error('No solution content found for button:', button);
        return;
    }

    const isVisible = solution.classList.contains('show');
    console.log('Solution visibility:', isVisible ? 'visible' : 'hidden');

    if (isVisible) {
        solution.classList.remove('show');
        button.innerHTML = '<i class="fas fa-lightbulb"></i> 查看解析';
    } else {
        solution.classList.add('show');
        button.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏解析';

        // 只在显示解析内容时刷新MathJax
        setTimeout(() => {
            refreshMathJax();
        }, 0);
    }
} 