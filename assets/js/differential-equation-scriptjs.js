// ====== 清理后的微分方程脚本文件 ======
// 移除了重复代码，统一了事件处理和功能实现

// 全局变量
let totalSlides = 0;
let currentSlide = 0;
let currentFilters = { category: 'all' };

// ====== 数据处理部分 ======

// 检查数据是否加载成功
console.log('检查数据文件是否正确加载');
if (typeof window.exerciseData !== 'undefined') {
    console.log(`数据文件已加载: 知识点 ${window.exerciseData.knowledgePoints.length} 条, 习题 ${window.exerciseData.exercises.length} 道`);
    processLatexLineBreaks();
} else {
    console.error('数据文件未正确加载');
}

/**
 * 处理数据中的所有LaTeX公式，将可见的换行转换为LaTeX的换行符
 */
function processLatexLineBreaks() {
    // 处理知识点中的LaTeX公式
    if (exerciseData.knowledgePoints && Array.isArray(exerciseData.knowledgePoints)) {
        exerciseData.knowledgePoints.forEach(point => {
            if (point.content) {
                point.content = processLatexContent(point.content);
            }
        });
    }

    // 处理习题中的LaTeX公式
    if (exerciseData.exercises && Array.isArray(exerciseData.exercises)) {
        exerciseData.exercises.forEach(exercise => {
            if (exercise.question) {
                exercise.question = processLatexContent(exercise.question);
            }
            if (exercise.explanation) {
                exercise.explanation = processLatexContent(exercise.explanation);
            }
            if (exercise.answer) {
                exercise.answer = processLatexContent(exercise.answer);
            }
        });
    }

    console.log('已处理所有数据中的LaTeX公式换行');
}

/**
 * 处理单个内容中的LaTeX公式换行和斜杠
 */
function processLatexContent(content) {
    if (!content) return content;

    const inlineRegex = /\$((?:\\.|[^\$\n])*?)\$/g;
    const displayRegex = /\$\$((?:\\.|[^\$])*?)\$\$/gs;

    // 处理行内公式
    content = content.replace(inlineRegex, function (match, formula) {
        let processed = formula;
        processed = processed.replace(/\\\\([a-zA-Z]+)/g, '\\$1');
        return '$' + processed + '$';
    });

    // 处理行间公式
    content = content.replace(displayRegex, function (match, formula) {
        let processed = formula.replace(/\n/g, '\\\\');
        processed = processed.replace(/\\\\([a-zA-Z]+)/g, '\\$1');
        processed = processed.replace(/(?<!\\)\\\n/g, '\\\\\n');
        return '$$' + processed + '$$';
    });

    return content;
}

/**
 * 增强的LaTeX公式处理
 */
function enhanceLatexFormulas(content) {
    if (!content) return content;

    // 处理行间公式($$...$$)
    content = content.replace(/\$\$(([\s\S]*?))\$\$/gs, function (match, formula) {
        let processed = formula;
        processed = processed.replace(/\n/g, '\\\\');

        const commonCommands = [
            'frac', 'sum', 'int', 'prod', 'lim', 'sqrt',
            'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu',
            'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
            'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp'
        ];

        commonCommands.forEach(cmd => {
            const regex = new RegExp('\\\\' + cmd, 'g');
            processed = processed.replace(regex, '\\\\\\\\' + cmd);
        });

        processed = processed.replace(/(?<!\\)\\(?!\\)/g, '\\\\');
        return '$$' + processed + '$$';
    });

    // 处理行内公式($...$)
    content = content.replace(/\$([^\$\n]+?)\$/g, function (match, formula) {
        let processed = formula;

        const commonCommands = [
            'frac', 'sum', 'int', 'prod', 'lim', 'sqrt',
            'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu',
            'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
            'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp'
        ];

        commonCommands.forEach(cmd => {
            const regex = new RegExp('\\\\' + cmd, 'g');
            processed = processed.replace(regex, '\\\\\\\\' + cmd);
        });

        processed = processed.replace(/(?<!\\)\\(?!\\)/g, '\\\\');
        processed = processed.replace(/\\\\([A-Z])/g, '\\\\$1');
        processed = processed.replace(/\\{4,}/g, '\\\\');

        return '$' + processed + '$';
    });

    return content;
}

/**
 * 增强的Markdown格式处理
 */
function formatMarkdown(text) {
    const formulaPlaceholders = [];
    text = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g, function (match) {
        const placeholder = `__FORMULA_${formulaPlaceholders.length}__`;
        formulaPlaceholders.push(match);
        return placeholder;
    });

    text = text
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^\*]+)\*/g, '<em>$1</em>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

    formulaPlaceholders.forEach((formula, i) => {
        text = text.replace(`__FORMULA_${i}__`, formula);
    });

    return text;
}

// ====== 知识点幻灯片部分 ======

/**
 * 初始化幻灯片
 */
function initSlides() {
    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) return;

    slidesContainer.innerHTML = '';

    if (exerciseData && exerciseData.knowledgePoints) {
        totalSlides = exerciseData.knowledgePoints.length;

        exerciseData.knowledgePoints.forEach((point, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.id = `slide-${index}`;

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

            slide.querySelector('.slide-card').addEventListener('click', function (e) {
                if (e.target.closest('.ai-analysis-btn')) {
                    return;
                }
                if (currentSlide === totalSlides - 1) {
                    goToSlide(0);
                } else {
                    nextSlide();
                }
            });

            slidesContainer.appendChild(slide);
        });
    }

    updateIndicator();

    if (document.getElementById('slide-0')) {
        document.getElementById('slide-0').classList.add('active');
    }
}

/**
 * 更新幻灯片指示器
 */
function updateIndicator() {
    const circleNavs = document.querySelectorAll('.circle-num');
    if (circleNavs && circleNavs.length > 0) {
        circleNavs.forEach((nav, index) => {
            if (index === currentSlide) {
                nav.style.background = 'white';
                nav.classList.add('active');
            } else {
                nav.style.background = 'rgba(255,255,255,0.3)';
                nav.classList.remove('active');
            }
        });
    }
}

/**
 * 跳转到指定幻灯片
 */
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    updateIndicator();

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([slides[currentSlide]]).catch(function (err) {
            console.log('MathJax rendering error:', err);
        });
    }
}

/**
 * 上一张幻灯片
 */
function prevSlide() {
    goToSlide(currentSlide - 1);
}

/**
 * 下一张幻灯片
 */
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// ====== 习题渲染部分 ======

/**
 * 渲染所有习题
 */
function renderAllExercises() {
    console.log('执行renderAllExercises函数');

    const exerciseContainer = document.getElementById('exercise-container');
    if (!exerciseContainer) {
        console.error('习题容器不存在');
        return;
    }

    if (!exerciseData || !exerciseData.exercises || !Array.isArray(exerciseData.exercises)) {
        console.error('习题数据不存在或不是数组');
        return;
    }

    console.log(`找到 ${exerciseData.exercises.length} 道习题`);

    exerciseContainer.innerHTML = '';

    if (exerciseData.exercises.length === 0) {
        exerciseContainer.innerHTML = '<div class="no-exercises">暂无习题数据</div>';
        return;
    }

    exerciseData.exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise-item';
        exerciseElement.setAttribute('data-id', exercise.id);
        exerciseElement.setAttribute('data-type', exercise.type);
        exerciseElement.setAttribute('data-difficulty', exercise.difficulty);
        exerciseElement.setAttribute('data-category', exercise.category);

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
            <div id="solution-${exercise.id}" class="solution-content" style="display: none;">
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

        exerciseContainer.appendChild(exerciseElement);
    });

    updateFilterButtonCounts();
    applyFilter('all');

    setTimeout(() => {
        const solutionContents = document.querySelectorAll('.solution-content');
        solutionContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('show');
        });

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([exerciseContainer])
                .catch(err => console.warn('MathJax渲染警告:', err));
        }

        setupProblemLocator();
    }, 500);

    console.log('习题渲染完成');
}

/**
 * 渲染知识点部分
 */
function renderKnowledgeSection() {
    console.log('渲染知识点部分...');
    initSlides();
    setupCircleNavigation();
    console.log('知识点幻灯片渲染完成');

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

// ====== 筛选功能部分 ======

/**
 * 应用过滤器
 */
function applyFilter(category) {
    let visibleCount = 0;

    requestAnimationFrame(() => {
        const exerciseItems = document.querySelectorAll('.exercise-item');

        if (category === 'all') {
            exerciseItems.forEach(item => {
                item.style.display = 'block';
                visibleCount++;
            });
        } else {
            const categoryMap = {
                'concepts': '微分方程基本概念',
                'separable': '可分离变量的微分方程',
                'homogeneous': '齐次微分方程',
                'linear-first': '一阶线性微分方程',
                'linear-second': '二阶常系数线性微分方程'
            };

            const targetCategory = categoryMap[category];

            exerciseItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = targetCategory ? itemCategory.includes(targetCategory) : true;

                item.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) visibleCount++;
            });
        }

        const exerciseCountElement = document.getElementById('exercise-count');
        if (exerciseCountElement) {
            exerciseCountElement.textContent = visibleCount;
        } else {
            const statsNumberElements = document.querySelectorAll('.exercise-stats .stats-item .stats-number');
            if (statsNumberElements.length > 0) {
                statsNumberElements[0].textContent = visibleCount;
            }
        }

        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        setTimeout(() => updateFilterButtonCounts(), 50);
    });

    return visibleCount;
}

/**
 * 更新筛选按钮上的数量计数
 */
function updateFilterButtonCounts() {
    console.log('更新筛选按钮计数...');

    const allExercises = document.querySelectorAll('.exercise-item');
    console.log(`总习题数量: ${allExercises.length}`);

    const categoryCounts = {
        all: allExercises.length,
        concepts: 0,
        separable: 0,
        homogeneous: 0,
        'linear-first': 0,
        'linear-second': 0
    };

    allExercises.forEach(item => {
        const category = item.getAttribute('data-category');

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

    console.log('分类统计结果:', categoryCounts);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        const countSpan = btn.querySelector('.count');
        if (countSpan && categoryCounts[filterValue] !== undefined) {
            countSpan.textContent = `(${categoryCounts[filterValue]})`;
            console.log(`更新按钮 ${filterValue} 的计数为 ${categoryCounts[filterValue]}`);
        }
    });
}

// ====== 事件处理部分 ======

/**
 * 筛选按钮处理函数
 */
function handleFilterButton(e) {
    e.preventDefault();

    const filter = e.currentTarget.getAttribute('data-filter');

    requestAnimationFrame(() => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (window.renderExercises && typeof window.renderExercises === 'function') {
            window.renderExercises(filter);
        } else {
            applyFilter(filter);
        }
    });
}

/**
 * 解析按钮处理函数
 */
function handleSolutionToggle(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // 防止事件重复触发
    }

    const exerciseId = e.currentTarget.getAttribute('data-exercise-id');
    console.log(`点击解析按钮: ${exerciseId}`);

    const solution = document.getElementById('solution-' + exerciseId);
    if (!solution) {
        console.error(`找不到解析容器: solution-${exerciseId}`);
        return;
    }

    // 使用更可靠的方式检查可见性
    const computedStyle = window.getComputedStyle(solution);
    const isVisible = computedStyle.display !== 'none' || solution.classList.contains('show');
    
    if (isVisible) {
        // 隐藏解析
        solution.classList.remove('show');
        solution.style.display = 'none';
        solution.style.opacity = '0';
        e.currentTarget.innerHTML = '<i class="fas fa-lightbulb"></i> 查看解析';
        console.log(`已隐藏解析: ${exerciseId}`);
    } else {
        // 显示解析
        solution.classList.add('show');
        solution.style.display = 'block';
        solution.style.opacity = '1';
        solution.style.maxHeight = 'none';
        solution.style.overflow = 'visible';
        e.currentTarget.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏解析';
        console.log(`已显示解析: ${exerciseId}`);

        // 渲染数学公式
        if (window.MathJax) {
            try {
                if (MathJax.typesetPromise) {
                    MathJax.typesetPromise([solution]).catch(err => {
                        console.warn('MathJax渲染警告:', err);
                    });
                } else if (MathJax.Hub) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, solution]);
                }
            } catch (err) {
                console.error('公式渲染出错:', err);
            }
        }
        
        // 滚动到解析位置
        setTimeout(() => {
            solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

/**
 * AI分析按钮处理函数
 */
function handleAiAnalysisButton(btn, e) {
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
            const exerciseType = exercise.type || '未知类型';
            const exerciseCategory = exercise.category || '未分类';
            const exerciseMethod = exercise.method || '未指定方法';

            const content = `题目：${exercise.question}\n\n解析：${stripHTML(exercise.explanation)}\n\n答案：${exercise.answer}\n\n类型：${exerciseType}\n分类：${exerciseCategory}\n解题方法：${exerciseMethod}`;
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
            const cleanContent = stripHTML(point.content);
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
 * 设置圆形导航
 */
function setupCircleNavigation() {
    console.log('Setting up number navigation click events');
    setTimeout(function () {
        const circleNavs = document.querySelectorAll('.circle-num');
        console.log(`Found ${circleNavs.length} number navigation buttons`);

        if (circleNavs && circleNavs.length > 0) {
            circleNavs.forEach(nav => {
                nav.removeEventListener('click', circleNavClickHandler);
                nav.addEventListener('click', circleNavClickHandler);
                console.log(`Added click event to number ${nav.textContent}`);
            });
        }
    }, 500);
}

/**
 * 圆形导航点击处理函数
 */
function circleNavClickHandler(event) {
    const slideIndex = parseInt(this.getAttribute('data-slide'));
    console.log(`Clicked number navigation: ${this.textContent}, switching to slide ${slideIndex}`);
    if (!isNaN(slideIndex)) {
        goToSlide(slideIndex);
    }
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
        setTimeout(setupProblemLocator, 1000);
        return;
    }

    const exerciseItems = document.querySelectorAll('.exercise-item');
    console.log(`当前页面上有 ${exerciseItems.length} 个习题元素`);

    locateBtn.addEventListener('click', function () {
        console.log('点击了定位按钮');
        locateProblem();
    });

    problemInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            console.log('按下了回车键');
            locateProblem();
        }
    });

    function locateProblem() {
        const problemNumber = problemInput.value.trim();
        if (!problemNumber) {
            console.log('题号为空，不执行定位');
            return;
        }

        console.log(`尝试定位题目 #${problemNumber}`);

        const problemElement = document.querySelector(`.exercise-item[data-id="${problemNumber}"]`);
        console.log('查询选择器:', `.exercise-item[data-id="${problemNumber}"]`);

        if (!problemElement) {
            console.warn(`未找到题号为 ${problemNumber} 的习题`);
            alert(`未找到题号为 ${problemNumber} 的习题`);
            return;
        }

        console.log('找到了目标题目元素:', problemElement);

        document.querySelectorAll('.problem-highlight').forEach(el => {
            el.classList.remove('problem-highlight');
        });

        problemElement.classList.add('problem-highlight');
        problemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        problemElement.style.display = 'block';

        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterBtn) {
            allFilterBtn.click();
        }

        console.log(`已定位到题目 #${problemNumber}`);
    }

    console.log('题目定位器设置完成');
}

/**
 * 统一事件监听器设置
 */
function setupEventListeners() {
    console.log('设置统一事件监听器...');
    
    // 移除可能存在的旧监听器
    const oldListeners = document.querySelectorAll('[data-listener-id]');
    oldListeners.forEach(el => {
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
    });

    // 使用事件委托处理所有按钮点击，但要防止重复绑定
    if (!window._eventListenersSetup) {
        window._eventListenersSetup = true;
        
        document.addEventListener('click', function (e) {
            // 筛选按钮
            if (e.target.matches('.filter-btn') || e.target.closest('.filter-btn')) {
                e.preventDefault();
                const button = e.target.matches('.filter-btn') ? e.target : e.target.closest('.filter-btn');
                handleFilterButton({ currentTarget: button, preventDefault: () => { } });
            }

            // 解析按钮 - 使用新的处理方式
            if (e.target.matches('.solution-toggle') || e.target.closest('.solution-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const button = e.target.matches('.solution-toggle') ? e.target : e.target.closest('.solution-toggle');
                const exerciseId = button.getAttribute('data-exercise-id');
                const solution = document.getElementById('solution-' + exerciseId);
                
                if (!solution) {
                    console.error(`找不到解析容器: solution-${exerciseId}`);
                    return;
                }
                
                // 切换显示状态
                const isVisible = solution.style.display === 'block' || solution.classList.contains('show');
                
                if (isVisible) {
                    solution.style.display = 'none';
                    solution.classList.remove('show');
                    button.innerHTML = '<i class="fas fa-lightbulb"></i> 查看解析';
                } else {
                    solution.style.display = 'block';
                    solution.classList.add('show');
                    button.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏解析';
                    
                    // 渲染MathJax
                    if (window.MathJax && window.MathJax.typesetPromise) {
                        MathJax.typesetPromise([solution]).catch(err => {
                            console.warn('MathJax渲染警告:', err);
                        });
                    }
                }
            }

            // AI分析按钮
            if (e.target.matches('.ai-analysis-btn') || e.target.closest('.ai-analysis-btn')) {
                const button = e.target.matches('.ai-analysis-btn') ? e.target : e.target.closest('.ai-analysis-btn');
                handleAiAnalysisButton(button, e);
            }
        }, true); // 使用捕获阶段
    }

    // 返回顶部按钮
    const scrollTopButton = document.querySelector('.scroll-to-top');
    if (scrollTopButton && !scrollTopButton.hasAttribute('data-listener-setup')) {
        scrollTopButton.setAttribute('data-listener-setup', 'true');
        scrollTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });
    }

    console.log('统一事件监听器设置完成');
}

// ====== DeepSeek API 部分 ======

const DEEPSEEK_CONFIG = {
    API_KEY: '',
    API_URL: 'https://api.deepseek.com/v1/chat/completions',
    MODEL: 'deepseek-chat'
};

/**
 * 初始化DeepSeek API
 */
function initializeDeepSeekAPI() {
    try {
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

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

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
 * 设置API密钥处理
 */
function setupApiKeyHandling() {
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiKeyInput = document.getElementById('deepseek-api-key');
    const statusText = document.getElementById('api-key-status-text');

    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
        DEEPSEEK_CONFIG.API_KEY = savedApiKey;
        apiKeyInput.value = '••••••••••••••••••••';
        statusText.textContent = '已保存API密钥';
        statusText.className = 'api-key-valid';
        clearApiKeyBtn.style.display = 'block';
    }

    saveApiKeyBtn.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            statusText.textContent = '请输入有效的API密钥';
            statusText.className = 'api-key-invalid';
            return;
        }

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
 * 向DeepSeek API发送问题
 */
async function askDeepSeek(fullContext) {
    try {
        if (!DEEPSEEK_CONFIG.API_KEY) {
            return '请先设置您的DeepSeek API密钥再使用AI功能。';
        }

        console.log('正在向DeepSeek API发送请求...');

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
            temperature: 0.3,
            max_tokens: 1500
        };

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

    if (!DEEPSEEK_CONFIG.API_KEY) {
        const systemMessage = document.createElement('div');
        systemMessage.className = 'deepseek-chat-message deepseek-chat-ai';
        systemMessage.innerHTML = '请先设置您的DeepSeek API密钥再使用AI功能。点击页面顶部的"保存密钥"按钮进行设置。';
        chatContainer.appendChild(systemMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

    const userMessage = document.createElement('div');
    userMessage.className = 'deepseek-chat-message deepseek-chat-user';
    userMessage.textContent = message;
    chatContainer.appendChild(userMessage);

    chatInput.value = '';

    const aiMessage = document.createElement('div');
    aiMessage.className = 'deepseek-chat-message deepseek-chat-ai';
    aiMessage.innerHTML = '<div class="loading-spinner"></div> AI思考中...';
    chatContainer.appendChild(aiMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    window.deepseekSession.messages.push({
        role: 'user',
        content: message
    });

    const context = window.deepseekSession.currentContext;

    (async function () {
        try {
            let reply = await askDeepSeek(message, context);

            window.deepseekSession.messages.push({
                role: 'assistant',
                content: reply
            });

            reply = reply.replace(/\$(.+?)\$/g, function (match) {
                return match;
            });

            aiMessage.innerHTML = reply;

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
                    console.error('公式渲染出错:', err);
                }
            }

            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error('发送消息时出错:', error);
            aiMessage.innerHTML = `发生错误: ${error.message}`;
        }
    })();
}

/**
 * 全局上下文管理器
 */
const ContextManager = {
    current: {
        type: null,
        id: null,
        title: '',
        content: '',
        fullContext: ''
    },

    setContext(type, id, title, content) {
        this.current.type = type;
        this.current.id = id;
        this.current.title = title;
        this.current.content = content;

        if (type === 'exercise') {
            const questionMatch = content.match(/题目：([\s\S]*?)(?=\n\n解析|$)/);
            const explanationMatch = content.match(/解析：([\s\S]*?)(?=\n\n答案|$)/);
            const answerMatch = content.match(/答案：([\s\S]*?)(?=\n\n类型|$)/);
            const typeMatch = content.match(/类型：([\s\S]*?)(?=\n\n分类|$)/);
            const categoryMatch = content.match(/分类：([\s\S]*?)(?=\n\n解题方法|$)/);
            const methodMatch = content.match(/解题方法：([\s\S]*?)(?=$)/);

            this.current.fullContext =
                `当前正在讨论习题：${title}\n\n` +
                `题目：${questionMatch ? questionMatch[1].trim() : '无法获取题目'}\n\n` +
                `解析：${explanationMatch ? explanationMatch[1].trim() : '无法获取解析'}\n\n` +
                `答案：${answerMatch ? answerMatch[1].trim() : '无法获取答案'}\n\n` +
                `${typeMatch ? '类型：' + typeMatch[1].trim() + '\n' : ''}` +
                `${categoryMatch ? '分类：' + categoryMatch[1].trim() + '\n' : ''}` +
                `${methodMatch ? '解题方法：' + methodMatch[1].trim() + '\n' : ''}`;
        } else {
            this.current.fullContext =
                `当前正在讨论知识点：${title}\n\n${content}`;
        }

        console.log('上下文已更新:', this.current.title);
    },

    getFullContextWithUserQuery(userQuery) {
        return `${this.current.fullContext}\n\n用户问题：${userQuery}\n\n请严格围绕当前${this.current.type === 'exercise' ? '习题' : '知识点'}回答问题，即使用户问题看似偏离主题，也请将回答与当前主题关联。`;
    },

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
 */
function openDeepSeekModal(content, title, id) {
    console.log('打开DeepSeek模态框:', title);

    const modal = document.getElementById('deepseek-modal');
    const titleElement = document.querySelector('.deepseek-modal-title');
    const contextDiv = document.getElementById('deepseek-context');
    const chatContainer = document.getElementById('deepseek-chat-container');

    if (!modal || !titleElement || !contextDiv || !chatContainer) {
        console.error('DeepSeek模态框元素不存在');
        return;
    }

    const isExercise = title.includes('习题');
    ContextManager.setContext(
        isExercise ? 'exercise' : 'knowledge',
        id,
        title,
        content
    );

    titleElement.textContent = title;
    contextDiv.textContent = content;
    chatContainer.innerHTML = '';

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    const welcomeType = isExercise ? '习题' : '知识点';
    const welcomeMessage = `我正在分析${welcomeType}「${title}」。请随时提问关于${title}的任何问题，我会始终围绕${title}进行回答。`;

    addAIMessage(welcomeMessage);

    setTimeout(() => {
        const inputElement = document.getElementById('deepseek-chat-input');
        if (inputElement) inputElement.focus();
    }, 300);

    const chatInput = document.getElementById('deepseek-chat-input');
    const chatSendBtn = document.getElementById('deepseek-chat-send');
    const modalCloseBtn = document.getElementById('deepseek-modal-close');

    if (chatSendBtn) {
        const newChatSendBtn = chatSendBtn.cloneNode(true);
        chatSendBtn.parentNode.replaceChild(newChatSendBtn, chatSendBtn);
        newChatSendBtn.addEventListener('click', handleUserMessage);
    }

    if (chatInput) {
        chatInput.value = '';
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage();
            }
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function () {
            closeDeepSeekModal();
        });
    }

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
    document.body.style.overflow = '';
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

    addUserMessage(userMessage);
    chatInput.value = '';

    if (!ContextManager.current.title) {
        addAIMessage("抱歉，当前没有选中的题目或知识点。请先选择一个题目或知识点再提问。");
        return;
    }

    const pendingMessageId = addPendingAIMessage();
    const fullContext = ContextManager.getFullContextWithUserQuery(userMessage);

    (async function () {
        try {
            let response = await askDeepSeek(fullContext);
            updateAIMessage(pendingMessageId, response);
        } catch (error) {
            console.error('AI请求出错:', error);
            updateAIMessage(pendingMessageId, `很抱歉，发生了错误: ${error.message}`);
        }
    })();
}

/**
 * 添加AI思考中状态消息
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
 * 直接渲染LaTeX公式
 */
function directRenderLatex(content) {
    if (!content) return content;

    const formulas = [];

    content = content.replace(/\$\$(([\s\S]*?))\$\$/gs, function (match, formula) {
        const placeholder = `__FORMULA_DISPLAY_${formulas.length}__`;
        formulas.push({ type: 'display', content: formula });
        return placeholder;
    });

    content = content.replace(/\$([^\$\n]+?)\$/g, function (match, formula) {
        const placeholder = `__FORMULA_INLINE_${formulas.length}__`;
        formulas.push({ type: 'inline', content: formula });
        return placeholder;
    });

    content = content
        .replace(/\n/g, '<br>')
        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^\*]+)\*/g, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');

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
 */
function updateAIMessage(messageId, content) {
    if (!messageId) return;

    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    const directContent = directRenderLatex(content);
    messageElement.innerHTML = directContent;

    if (window.MathJax) {
        setTimeout(() => {
            if (window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([messageElement])
                    .then(() => {
                        console.log('公式渲染成功');
                    })
                    .catch(err => {
                        console.warn('MathJax渲染警告:', err);
                        console.log('尝试使用增强的公式处理...');
                        const enhancedContent = enhanceLatexFormulas(content);
                        const formattedContent = formatMarkdown(enhancedContent);
                        messageElement.innerHTML = formattedContent;

                        window.MathJax.typesetPromise([messageElement])
                            .catch(err => console.warn('第二次渲染警告:', err));
                    });
            } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, messageElement]);
            }
        }, 100);
    }

    const chatContainer = document.getElementById('deepseek-chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

/**
 * 添加用户消息
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
 */
function addAIMessage(message) {
    const chatContainer = document.getElementById('deepseek-chat-container');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'deepseek-chat-message deepseek-chat-ai';

    message = enhanceLatexFormulas(message);
    message = message.replace(/\n/g, '<br>');
    const formattedMessage = formatMarkdown(message);

    messageElement.innerHTML = formattedMessage;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

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
 */
function stripHTML(html) {
    if (!html) return '';

    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

// ====== 工具函数部分 ======

/**
 * 移动端检测
 */
function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ||
        (window.innerWidth <= 768);
}

/**
 * 移动端特定初始化
 */
function initMobile() {
    if (isMobile()) {
        const filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.style.display = 'grid';
            filterContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }

        const modal = document.querySelector('.deepseek-modal-content');
        if (modal) {
            modal.style.height = '95vh';
            modal.style.maxHeight = '95vh';
        }

        document.body.classList.add('mobile-device');
    }
}

/**
 * 添加触摸滑动支持
 */
function addTouchSupport() {
    const slidesContainer = document.querySelector('.slides-container');
    if (!slidesContainer) return;

    let startX = 0;
    let startY = 0;
    let isScrolling = false;

    slidesContainer.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });

    slidesContainer.addEventListener('touchmove', function (e) {
        if (!startX || !startY) return;

        const diffX = Math.abs(e.touches[0].clientX - startX);
        const diffY = Math.abs(e.touches[0].clientY - startY);

        if (diffY > diffX) {
            isScrolling = true;
        }
    }, { passive: true });

    slidesContainer.addEventListener('touchend', function (e) {
        if (isScrolling) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSlide < totalSlides - 1) {
                nextSlide();
            } else if (diffX < 0 && currentSlide > 0) {
                prevSlide();
            }
        }

        startX = 0;
        startY = 0;
    }, { passive: true });
}

/**
 * MathJax渲染优化
 */
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

// ====== 页面初始化部分 ======

/**
 * 初始化页面功能
 */
function initializePage() {
    setupEventListeners();
    setupProblemLocator();
    initMobile();
    addTouchSupport();
}

/**
 * 键盘导航
 */
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    }
});

// ====== 页面加载事件 ======

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM完全加载');

    initializeDeepSeekAPI();
    setupApiKeyHandling();
    setupEventListeners();
    initializePage();

    setTimeout(function () {
        if (typeof exerciseData !== 'undefined') {
            renderKnowledgeSection();
            renderAllExercises();
        } else {
            console.error('数据未正确加载');
        }
    }, 1000);
});

window.addEventListener('load', function () {
    console.log('整个页面加载完成');

    setTimeout(function () {
        updateFilterButtonCounts();
    }, 1500);
});

// ====== 导出函数到全局作用域（保持兼容性）======

window.goToSlide = goToSlide;
window.renderKnowledgeSection = renderKnowledgeSection;
window.renderAllExercises = renderAllExercises;
window.applyFilter = applyFilter;
window.setupGlobalDeepSeekQuery = function () {
    console.log('全局DeepSeek查询功能已就绪');
};