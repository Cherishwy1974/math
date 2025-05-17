// 习题数据管理
const ExerciseManager = {
  exercises: [],

  /**
   * 添加单个习题
   * @param {Object} exercise 习题对象
   * @returns {string} 习题ID
   */
  addExercise(exercise) {
    // 确保习题有唯一ID
    if (!exercise.id) {
      exercise.id = `exercise-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    // 添加折叠块属性
    if (exercise.collapsed === undefined) {
      exercise.collapsed = true; // 默认折叠
    }

    this.exercises.push(exercise);
    this.saveToStorage();

    return exercise.id;
  },

  /**
   * 批量添加习题
   * @param {Array} exercises 习题数组
   */
  addExercises(exercises) {
    if (!Array.isArray(exercises) || exercises.length === 0) {
      return;
    }

    // 确保每个习题都有唯一ID和折叠状态
    const timestamp = Date.now();
    exercises.forEach((exercise, index) => {
      if (!exercise.id) {
        exercise.id = `exercise-${timestamp}-${index}`;
      }
      if (exercise.collapsed === undefined) {
        exercise.collapsed = true; // 默认折叠
      }
    });

    this.exercises = [...this.exercises, ...exercises];
    this.saveToStorage();
  },

  /**
   * 获取所有习题
   * @returns {Array} 习题数组
   */
  getAllExercises() {
    return this.exercises;
  },

  /**
   * 通过ID获取习题
   * @param {string} id 习题ID
   * @returns {Object|null} 习题对象或null
   */
  getExerciseById(id) {
    return this.exercises.find(ex => ex.id === id) || null;
  },

  /**
   * 按章节获取习题
   * @param {string} chapterId 章节ID
   * @returns {Array} 习题数组
   */
  getExercisesByChapter(chapterId) {
    return this.exercises.filter(ex => ex.chapterId === chapterId);
  },

  /**
   * 按类型获取习题
   * @param {string} type 习题类型
   * @returns {Array} 习题数组
   */
  getExercisesByType(type) {
    return this.exercises.filter(ex => ex.type === type);
  },

  /**
   * 按难度获取习题
   * @param {string} difficulty 难度级别
   * @returns {Array} 习题数组
   */
  getExercisesByDifficulty(difficulty) {
    return this.exercises.filter(ex => ex.difficulty === difficulty);
  },

  /**
   * 更新习题
   * @param {string} id 习题ID
   * @param {Object} updatedData 更新的数据
   * @returns {boolean} 是否更新成功
   */
  updateExercise(id, updatedData) {
    const index = this.exercises.findIndex(ex => ex.id === id);
    if (index === -1) {
      return false;
    }

    // 不允许更新ID
    if (updatedData.id) {
      delete updatedData.id;
    }

    this.exercises[index] = {
      ...this.exercises[index],
      ...updatedData
    };

    this.saveToStorage();
    return true;
  },

  /**
   * 切换习题的折叠状态
   * @param {string} id 习题ID
   * @returns {boolean} 是否切换成功
   */
  toggleExerciseCollapse(id) {
    const exercise = this.getExerciseById(id);
    if (!exercise) {
      return false;
    }

    exercise.collapsed = !exercise.collapsed;
    this.saveToStorage();
    return true;
  },

  /**
   * 删除习题
   * @param {string} id 习题ID
   * @returns {boolean} 是否删除成功
   */
  deleteExercise(id) {
    const index = this.exercises.findIndex(ex => ex.id === id);
    if (index === -1) {
      return false;
    }

    this.exercises.splice(index, 1);
    this.saveToStorage();
    return true;
  },

  /**
   * 获取习题统计信息
   * @returns {Object} 统计信息
   */
  getStatistics() {
    const total = this.exercises.length;
    const typeCount = {};
    const difficultyCount = {};
    const categoryCount = {};
    const methodCount = {};

    this.exercises.forEach(ex => {
      // 统计类型
      typeCount[ex.type] = (typeCount[ex.type] || 0) + 1;

      // 统计难度
      difficultyCount[ex.difficulty] = (difficultyCount[ex.difficulty] || 0) + 1;

      // 统计分类
      if (ex.category) {
        categoryCount[ex.category] = (categoryCount[ex.category] || 0) + 1;
      }

      // 统计方法
      if (ex.method) {
        methodCount[ex.method] = (methodCount[ex.method] || 0) + 1;
      }
    });

    return {
      total,
      typeCount,
      difficultyCount,
      categoryCount,
      methodCount
    };
  },

  /**
   * 搜索习题
   * @param {Object} criteria 搜索条件
   * @returns {Array} 匹配的习题数组
   */
  searchExercises(criteria = {}) {
    return this.exercises.filter(ex => {
      let match = true;

      // 按ID搜索
      if (criteria.id && ex.id !== criteria.id) {
        match = false;
      }

      // 按类型搜索
      if (criteria.type && ex.type !== criteria.type) {
        match = false;
      }

      // 按难度搜索
      if (criteria.difficulty && ex.difficulty !== criteria.difficulty) {
        match = false;
      }

      // 按章节搜索
      if (criteria.chapterId && ex.chapterId !== criteria.chapterId) {
        match = false;
      }

      // 按关键词搜索
      if (criteria.keyword) {
        const keyword = criteria.keyword.toLowerCase();
        const searchableText = `${ex.title} ${ex.question} ${ex.explanation}`.toLowerCase();
        if (!searchableText.includes(keyword)) {
          match = false;
        }
      }

      return match;
    });
  },

  /**
   * 从Markdown文本解析习题
   * @param {string} markdownText Markdown文本
   * @returns {Array} 解析出的习题数组
   */
  parseMarkdownExercises(markdownText) {
    const exercises = [];
    const lines = markdownText.split('\n');
    let currentExercise = null;
    let currentField = null;
    let fieldContent = '';

    lines.forEach(line => {
      // 检测新习题的开始
      if (line.startsWith('## ')) {
        // 保存之前的习题
        if (currentExercise) {
          // 保存最后一个字段
          if (currentField && fieldContent) {
            currentExercise[currentField] = fieldContent.trim();
          }
          exercises.push(currentExercise);
        }

        // 创建新习题
        currentExercise = {
          title: line.substring(3).trim(),
          id: `exercise-${Date.now()}-${exercises.length}`,
          collapsed: true
        };
        currentField = null;
        fieldContent = '';
      }
      // 检测字段的开始
      else if (line.startsWith('### ') && currentExercise) {
        // 保存之前的字段
        if (currentField && fieldContent) {
          currentExercise[currentField] = fieldContent.trim();
        }

        // 设置新字段
        currentField = line.substring(4).trim().toLowerCase();
        fieldContent = '';
      }
      // 累加字段内容
      else if (currentField) {
        fieldContent += line + '\n';
      }
    });

    // 保存最后一个习题
    if (currentExercise) {
      if (currentField && fieldContent) {
        currentExercise[currentField] = fieldContent.trim();
      }
      exercises.push(currentExercise);
    }

    return exercises;
  },

  /**
   * 导出为Markdown格式
   * @param {Array} exercises 要导出的习题数组
   * @returns {string} Markdown文本
   */
  exportToMarkdown(exercises = null) {
    const exportExercises = exercises || this.exercises;
    let markdown = '# 习题集\n\n';

    exportExercises.forEach(ex => {
      markdown += `## ${ex.title || '无标题习题'}\n\n`;

      if (ex.type) {
        markdown += `### 类型\n${ex.type}\n\n`;
      }

      if (ex.difficulty) {
        markdown += `### 难度\n${ex.difficulty}\n\n`;
      }

      if (ex.question) {
        markdown += `### 问题\n${ex.question}\n\n`;
      }

      if (ex.explanation) {
        markdown += `### 解析\n${ex.explanation}\n\n`;
      }

      if (ex.answer) {
        markdown += `### 答案\n${ex.answer}\n\n`;
      }

      if (ex.category) {
        markdown += `### 分类\n${ex.category}\n\n`;
      }

      if (ex.method) {
        markdown += `### 方法\n${ex.method}\n\n`;
      }

      markdown += '---\n\n';
    });

    return markdown;
  },

  /**
   * 保存到本地存储
   */
  saveToStorage() {
    localStorage.setItem('exercises', JSON.stringify(this.exercises));
  },

  /**
   * 从本地存储加载
   */
  loadFromStorage() {
    const stored = localStorage.getItem('exercises');
    if (stored) {
      try {
        this.exercises = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load exercises from storage:', e);
      }
    }
  },

  /**
   * 清空习题
   */
  clearExercises() {
    this.exercises = [];
    this.saveToStorage();
  },

  /**
   * 导入习题
   * @param {Array|Object} data 导入的数据
   * @param {boolean} replace 是否替换现有数据
   * @returns {number} 导入的习题数量
   */
  importExercises(data, replace = false) {
    let importedData = data;

    // 尝试解析JSON字符串
    if (typeof data === 'string') {
      try {
        importedData = JSON.parse(data);
      } catch (e) {
        console.error('Invalid JSON format:', e);
        return 0;
      }
    }

    // 转换为数组
    let exercisesToImport = Array.isArray(importedData) ? importedData : [importedData];

    // 验证每个习题
    exercisesToImport = exercisesToImport.filter(ex => {
      return ex && typeof ex === 'object' && (ex.question || ex.title);
    });

    if (exercisesToImport.length === 0) {
      return 0;
    }

    // 替换或合并
    if (replace) {
      this.exercises = exercisesToImport;
    } else {
      this.addExercises(exercisesToImport);
    }

    return exercisesToImport.length;
  },

  /**
   * 添加章节
   * @param {string} name 章节名称
   * @returns {string} 章节ID
   */
  addChapter(name) {
    // 确保chapters属性存在
    if (!this.chapters) {
      this.chapters = [];
    }

    const chapter = {
      id: `chapter-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      collapsed: true
    };

    this.chapters.push(chapter);
    this.saveToStorage();

    return chapter.id;
  },

  /**
   * 获取所有章节
   * @returns {Array} 章节数组
   */
  getAllChapters() {
    if (!this.chapters) {
      this.chapters = [];
    }
    return this.chapters;
  },

  /**
   * 获取章节名称
   * @param {string} id 章节ID
   * @returns {string} 章节名称
   */
  getChapterName(id) {
    if (!this.chapters) {
      return '';
    }

    const chapter = this.chapters.find(ch => ch.id === id);
    return chapter ? chapter.name : '';
  },

  /**
   * 切换章节的折叠状态
   * @param {string} id 章节ID
   * @returns {boolean} 是否切换成功
   */
  toggleChapterCollapse(id) {
    if (!this.chapters) {
      return false;
    }

    const chapter = this.chapters.find(ch => ch.id === id);
    if (!chapter) {
      return false;
    }

    chapter.collapsed = !chapter.collapsed;
    this.saveToStorage();
    return true;
  },

  /**
   * 更新章节
   * @param {string} id 章节ID
   * @param {string} name 章节名称
   * @returns {boolean} 是否更新成功
   */
  updateChapter(id, name) {
    if (!this.chapters) {
      return false;
    }

    const chapter = this.chapters.find(ch => ch.id === id);
    if (!chapter) {
      return false;
    }

    chapter.name = name;
    this.saveToStorage();
    return true;
  },

  /**
   * 删除章节
   * @param {string} id 章节ID
   * @returns {boolean} 是否删除成功
   */
  deleteChapter(id) {
    if (!this.chapters) {
      return false;
    }

    const index = this.chapters.findIndex(ch => ch.id === id);
    if (index === -1) {
      return false;
    }

    this.chapters.splice(index, 1);
    this.saveToStorage();
    return true;
  },

  saveToStorage() {
    localStorage.setItem('exercises', JSON.stringify(this.exercises));
    if (this.chapters) {
      localStorage.setItem('chapters', JSON.stringify(this.chapters));
    }
  },

  loadFromStorage() {
    const storedExercises = localStorage.getItem('exercises');
    if (storedExercises) {
      try {
        this.exercises = JSON.parse(storedExercises);
      } catch (e) {
        console.error('Failed to load exercises from storage:', e);
      }
    }

    const storedChapters = localStorage.getItem('chapters');
    if (storedChapters) {
      try {
        this.chapters = JSON.parse(storedChapters);
      } catch (e) {
        console.error('Failed to load chapters from storage:', e);
      }
    } else {
      this.chapters = [];
    }
  }
};

// 初始化示例数据
ExerciseManager.exercises = [
  {
    id: 1,
    type: "计算题",
    title: "基本定积分计算",
    question: "1.求 $\\int_0^1 (2x+3) dx$",
    explanation: ` $$ 在求解定积分 \\int_0^1 (2x+3) dx  时， 我们首先需要计算不定积分：$$ 


$$ \\int (2x+3) dx = 2\\int x dx + 3\\int dx $$ (积分的线性性质)

$$= 2 \\cdot \\frac{x^2}{2} + 3x + C$$ (幂函数和常数积分公式)

$$= x^2 + 3x + C$$ (化简)

$$ 得到原函数 F(x) = x^2 + 3x + C$$

$$ 接下来应用牛顿-莱布尼兹公式计算定积分：$$

$$ \\int_0^1 (2x+3) dx = F(1) - F(0)$$

$$= (1^2 + 3 \\cdot 1) - (0^2 + 3 \\cdot 0)$$

$$= (1 + 3) - 0$$

$$= 4$$

因此，$\\int_0^1 (2x+3) dx = 4$。`,
    answer: "4",
    difficulty: "easy",
    category: "定积分计算",
    method: "牛顿-莱布尼兹公式"
  },
  {
    id: 2,
    type: "计算题",
    title: "基本定积分计算",
    question: "2.设 $f(x) = \\begin{cases} x, & 0 \\leq x < 1 \\\\ 2-x, & 1 \\leq x \\leq 2 \\end{cases}$，求 $\\int_0^2 f(x) dx$",
    explanation: `
由于 $f(x)$ 是分段函数，我们需要将积分区间分成两部分，分别计算。

根据定积分的区间可加性：
$$\\int_0^2 f(x) dx = \\int_0^1 f(x) dx + \\int_1^2 f(x) dx\\int_0^1 x dx = \\left.\\frac{x^2}{2}\\right|_0^1 = \\frac{1^2}{2} - \\frac{0^2}{2} = \\frac{1}{2}$$

再计算第二部分：
当 $1 \\leq x \\leq 2$ 时，$f(x) = 2-x$：
$$\\int_1^2 (2-x) dx = \\left.2x\\right|_1^2 - \\left.\\frac{x^2}{2}\\right|_1^2 = (4 - 2) - (2 - 0.5) = 2 - 1.5 = 0.5 = \\frac{1}{2}$$

将两部分结果相加：
$$\\int_0^2 f(x) dx = \\frac{1}{2} + \\frac{1}{2} = 1$$

`,
    answer: "1",
    difficulty: "medium",
    category: "定积分计算",
    method: "区间可加性"
  },
  {
    id: 3,
    type: "计算题",
    title: "定积分定义与性质",
    question: "3.求 $\\int_{-\\pi}^{\\pi} \\sin x dx$",
    explanation: `
本积分可以利用奇偶函数的对称性来简化计算。
首先分析被积函数的奇偶性：
$$\\text{令}\\ f(x) = \\sin x$$
$$f(-x) = \\sin(-x) = -\\sin x = -f(x)$$
因此，$f(x)$ 是奇函数。
根据定积分的对称性性质：
当被积函数是奇函数且积分区间关于原点对称时：
$$\\int_{-a}^{a} f(x) dx = 0$$
应用此性质：
$$\\int_{-\\pi}^{\\pi} \\sin x dx = 0$$
几何解释：
在对称区间 $[-\\pi, \\pi]$ 上，奇函数的图像关于原点对称，其在 $[-\\pi,0]$ 和 $[0,\\pi]$ 上的积分面积大小相等符号相反，因此相互抵消。`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性对称性"
  },
  {
    id: 4,
    type: "计算题",
    title: "定积分定义与性质",
    question: "4.求 $\\frac{d}{dx}\\int_{a}^{b} f(x)dx$",
    explanation: `这是一个关于定积分导数的基本问题。
关键点：定积分的上下限如果是常数，那么对x的导数为0，因为积分与x无关。
$$\\frac{d}{dx}\\int_{a}^{b} f(x)dx = 0$$
这是因为当积分限是常数时，定积分的结果是一个常数，对x求导自然为0。
注意：这与$\\int_{a}^{b} \\frac{d}{dx}f(x)dx$是不同的概念。`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "定积分导数"
  },
  {
    id: 5,
    type: "计算题",
    title: "定积分定义与性质",
    question: "5.设 $F(x) = \\int_{0}^{2} \\frac{t}{\\sqrt{1+t^2}} dt$，求 $F'(x)$",
    explanation: `这是一个关于定积分导数的基本问题。

关键点分析：
根据微积分基本定理，当积分上下限是常数时：
$$F'(x) = \\frac{d}{dx}\\left(\\int_{a}^{b} f(t)dt\\right) = 0$$

具体到本题：
1) 被积函数 $\\frac{t}{\\sqrt{1+t^2}}$ 的积分变量是 t，与 x 无关
2) 积分上下限 [0,2] 是常数区间
3) 积分结果是一个确定的数值常数

因此：
$$F'(x) = \\frac{d}{dx}(\\text{常数}) = 0$$

注意：这与积分上限函数 $F(x) = \\int_{a}^{x} f(t)dt$ 的导数 $F'(x) = f(x)$ 有本质区别。`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "微积分基本定理"
  },
  {
    id: 6,
    type: "计算题",
    title: "定积分定义与性质",
    question: "6.求 $\\int_{-1}^{1} x^3 dx$",
    explanation: `这是一个关于奇函数在对称区间上的定积分问题。

关键点：
1) $x^3$ 是奇函数，即 $f(-x) = -f(x)$
2) 积分区间 $[-1,1]$ 是关于原点对称的

对于奇函数在对称区间上的定积分：
$$\\int_{-a}^{a} f(x)dx = 0$$

因此：
$$\\int_{-1}^{1} x^3 dx = 0$$

几何意义：$x^3$ 在 $[-1,0]$ 上的积分面积与 $[0,1]$ 上的积分面积大小相等但符号相反，相互抵消。`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 7,
    type: "计算题",
    title: "定积分定义与性质",
    question: "7.求 $\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}} \\frac{x^3}{1+\\cos x}dx$",
    explanation: `这是一个利用奇函数性质求解定积分的问题。

解题步骤：
1) 观察被积函数 $f(x) = \\frac{x^3}{1+\\cos x}$
   验证奇偶性：
   $$f(-x) = \\frac{(-x)^3}{1+\\cos(-x)} = \\frac{-x^3}{1+\\cos x} = -f(x)$$
   因此这是奇函数

2) 积分区间 $[-\\frac{\\pi}{4}, \\frac{\\pi}{4}]$ 是关于原点对称的

根据奇函数在对称区间上的定积分性质：
$$\\int_{-a}^{a} f(x)dx = 0$$

因此：
$$\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}} \\frac{x^3}{1+\\cos x}dx = 0$$

几何解释：函数图像关于原点对称，正负面积相互抵消。`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 8,
    type: "计算题",
    title: "广义积分",
    question: "8.求广义积分 $\\int_0^{+\\infty} x e^{x} dx$",
    explanation: `计算广义积分 $\\int_0^{+\\infty} x e^{x} dx$。
首先，我们可以使用分部积分法：
$$\\int x e^{x} dx = x e^x - e^x + C$$
现在计算定积分：
$$(x e^x - e^x)\\bigg|_0^{+\\infty} = \\lim\\limits_{x \\to +\\infty}(x e^x - e^x) - (0 \\cdot e^0 - e^0)$$
$$= \\lim\\limits_{x \\to +\\infty}(x e^x - e^x) - (0 - 1)$$
$$= \\lim\\limits_{x \\to +\\infty}(x e^x - e^x) + 1$$
当 $x \\to +\\infty$ 时，$x e^x$ 和 $e^x$ 都趋向于 $+\\infty$，该广义积分发散，无确定值。`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "分部积分法"
  },
  {
    id: 9,
    type: "计算题",
    title: "基本定积分计算",
    question: "9.求 $\\int_0^1 (3x^2+2) dx$",
    explanation: `$$\\int_0^1(3x^2+2) dx=\\int_0^1 3x^2 dx+\\int_0^1 2 dx$$ (积分的线性性质)
$$= 3\\int_0^1 x^2 dx+2\\int_0^1 dx$$ (常数因子提出)
$$= 3 \\cdot \\frac{x^{2+1}}{2+1}\\bigg|_0^1 + 2x\\bigg|_0^1 + C$$ (幂函数和常数积分公式)
$$= 3 \\cdot \\frac{x^3}{3}\\bigg|_0^1 + 2x\\bigg|_0^1$$ (求原函数)
$$= 3 \\cdot (\\frac{1^3}{3} - \\frac{0^3}{3}) + 2(1 - 0)$$ (代入上下限)
$$= 3 \\cdot \\frac{1}{3} + 2 = 1 + 2 = 3$$ (计算结果)`,
    answer: "$3$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 10,
    type: "计算题",
    title: "基本定积分计算",
    question: "10.求 $\\int_0^2 (5x^4-3x^2+2x-7) dx$",
    explanation: `$$\\int_0^2(5x^4-3x^2+2x-7) dx = \\int_0^2 5x^4 dx - \\int_0^2 3x^2 dx + \\int_0^2 2x dx - \\int_0^2 7 dx$$ (积分的线性性质)
$$= 5\\int_0^2 x^4 dx - 3\\int_0^2 x^2 dx + 2\\int_0^2 x dx - 7\\int_0^2 dx$$ (常数因子提出)
$$= 5 \\cdot \\frac{x^{4+1}}{4+1}\\bigg|_0^2 - 3 \\cdot \\frac{x^{2+1}}{2+1}\\bigg|_0^2 + 2 \\cdot \\frac{x^{1+1}}{1+1}\\bigg|_0^2 - 7x\\bigg|_0^2$$ (幂函数和常数积分公式)
$$= 5 \\cdot \\frac{x^5}{5}\\bigg|_0^2 - 3 \\cdot \\frac{x^3}{3}\\bigg|_0^2 + 2 \\cdot \\frac{x^2}{2}\\bigg|_0^2 - 7x\\bigg|_0^2$$ (计算原函数)
$$= 5 \\cdot (\\frac{2^5}{5} - \\frac{0^5}{5}) - 3 \\cdot (\\frac{2^3}{3} - \\frac{0^3}{3}) + 2 \\cdot (\\frac{2^2}{2} - \\frac{0^2}{2}) - 7(2 - 0)$$ (代入上下限)
$$= 5 \\cdot \\frac{32}{5} - 3 \\cdot \\frac{8}{3} + 2 \\cdot \\frac{4}{2} - 7 \\cdot 2$$ (计算)
$$= 32 - 8 + 4 - 14 = 14$$ (最终结果)`,
    answer: "$14$",
    difficulty: "medium",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 11,
    type: "计算题",
    title: "分部积分法",
    question: "11.求 $\\int_0^1 x\\ln x dx$",
    explanation: `
$$x dx = d(\\frac{1}{2}x^2)，应用分部积分公式：$$
$$\\int_0^1 \\ln x \\cdot x dx = \\int_0^1 \\ln x \\cdot d(\\frac{1}{2}x^2) = $$
$$= \\ln x \\cdot \\frac{1}{2}x^2\\bigg|_0^1 - \\int_0^1 \\frac{1}{2}x^2 \\cdot d(\\ln x)$$

计算新积分中的微分部分：$d(\\ln x) = \\frac{1}{x}dx$
$$= \\frac{1}{2}x^2\\ln x\\bigg|_0^1 - \\frac{1}{2}\\int_0^1 x^2 \\cdot \\frac{1}{x}dx$$
$$= \\frac{1}{2}x^2\\ln x\\bigg|_0^1 - \\frac{1}{2} \\cdot \\frac{1}{2}x^2\\bigg|_0^1$$
$$= \\frac{1}{2} \\cdot 1^2 \\cdot \\ln 1 - \\frac{1}{2} \\cdot 0^2 \\cdot \\ln 0 - \\frac{1}{4}(1^2 - 0^2)$$`,
    answer: "$-\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 12,
    type: "计算题",
    title: "换元定积分计算",
    question: "12.求 $\\int_0^{\\pi/2} \\sin^2 x dx$",
    explanation: `使用二倍角公式：$\\sin^2 x=\\frac{1}{2}(1-\\cos 2x)$
原式 $=\\int_0^{\\pi/2} \\frac{1}{2}(1-\\cos 2x) dx$
$=\\frac{1}{2}\\int_0^{\\pi/2} dx - \\frac{1}{2}\\int_0^{\\pi/2}\\cos 2x dx$
$$第一部分：\\frac{1}{2}\\int_0^{\\pi/2} dx=\\frac{1}{2}x\\bigg|_0^{\\pi/2} = \\frac{\\pi}{4}$$
$$第二部分：\\frac{1}{2}\\int_0^{\\pi/2}\\cos 2x dx $$
$$1. 发现复合：\\cos(2x)，内层函数是 2x$$
$$2. 强行改写：\\int_0^{\\pi/2} \\cos(2x) dx \\rightarrow \\int_0^{\\pi/2} \\cos(2x) d(2x)$$
$$3. 调整系数：$$
   $$d(2x)=2 dx \\Rightarrow dx=\\frac{1}{2} d(2x)$$
   $$\\frac{1}{2}\\int_0^{\\pi/2} \\cos(2x) dx=\\frac{1}{2}\\int_0^{\\pi/2} \\cos(2x) \\cdot \\frac{1}{2} d(2x)=\\frac{1}{4} \\int_0^{\\pi/2} \\cos(2x) d(2x)$$
$$4. 套用公式：\\int \\cos u du=\\sin u + C$$
$$5. 计算结果并代入上下限：$$
   $$\\frac{1}{4}\\int_0^{\\pi} \\cos u du = \\frac{1}{4}\\sin u\\bigg|_0^{\\pi} = \\frac{1}{4}(\\sin \\pi - \\sin 0) = \\frac{1}{4} \\cdot 0 = 0$$

6. 最终结果：$\\int_0^{\\pi/2} \\sin^2 x dx = \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 13,
    type: "计算题",
    title: "换元定积分计算",
    question: "13.求 $\\int_0^1 e^{3x} dx$",
    explanation: `$$1. 发现复合：e^{3x}，内层函数是 3x$$
$$2. 强行改写：\\int_0^1 e^{3x} dx \\rightarrow \\int_0^1 e^{3x} d(3x)$$
$$3. 调整系数：d(3x)=3 dx \\Rightarrow dx=\\frac{1}{3} d(3x)$$
   $$\\int_0^1 e^{3x} dx=\\int_0^1 e^{3x} \\cdot \\frac{1}{3} d(3x)=\\frac{1}{3} \\int_0^1 e^{3x} d(3x)$$
$$4. 套用公式：\\int e^u du=e^u + C$$
$$5. 计算结果并代入上下限：$$
   $$\\frac{1}{3}\\int_0^1 e^{3x} d(3x) = \\frac{1}{3}e^{3x}\\bigg|_0^1 = \\frac{1}{3}(e^3 - e^0) = \\frac{1}{3}(e^3 - 1)$$`,
    answer: "$\\frac{1}{3}(e^3 - 1)$",
    difficulty: "medium",
    category: "定积分计算",
    method: "第一类换元积分法"
  },
  {
    id: 14,
    type: "计算题",
    title: "分部积分法",
    question: "14.求 $\\int_0^1 x^2e^x dx$",
    explanation: `$$ e^xdx =de^x ，应用分部积分公式：$$

$$\\int_0^1 x^2e^x dx = \\int_0^1 x^2 de^x = x^2e^x\\bigg|_0^1 - \\int_0^1 e^x d x^2$$
$$= x^2e^x\\bigg|_0^1 - \\int_0^1 e^x \\cdot 2x dx$$

计算边界项：
$$x^2e^x\\bigg|_0^1 = 1^2e^1 - 0^2e^0 = e$$

处理剩余积分项：
$$\\int_0^1 2xe^x dx = 2\\int_0^1 xe^x dx$$
$$ e^xdx =de^x ，继续应用分部积分公式：$$

$$2\\int_0^1 xe^x dx = 2\\int_0^1 x de^x$$

$$= 2xe^x\\bigg|_0^1 - 2\\int_0^1 e^x dx$$

$$= 2xe^x\\bigg|_0^1 - 2e^x\\bigg|_0^1$$
$$= 2 \\cdot 1 \\cdot e^1 - 2 \\cdot 0 \\cdot e^0 - 2e^1 + 2e^0$$
$$= 2e - 0 - 2e + 2 = 2 - 2e + 2e = 2$$
合并结果：
$$\\int_0^1 x^2e^x dx = e - 2$$`,
    answer: "$e - 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 15,
    type: "计算题",
    title: "基本定积分计算",
    question: "15.求 $\\int_0^4 \\sqrt{x} dx$",
    explanation: `转换为幂函数：$\\sqrt{x} = x^{1/2}$
$$\\int_0^4 x^{1/2} dx = \\frac{x^{1/2+1}}{1/2+1}\\bigg|_0^4 = \\frac{x^{3/2}}{3/2}\\bigg|_0^4$$
$$= \\frac{2}{3}x^{3/2}\\bigg|_0^4 = \\frac{2}{3}(4^{3/2} - 0^{3/2})$$
$$= \\frac{2}{3} \\cdot 8 = \\frac{16}{3}$$`,
    answer: "$\\frac{16}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 16,
    type: "计算题",
    title: "基本定积分计算",
    question: "16.求 $\\int_0^\\pi \\sin x dx$",
    explanation: `应用基本积分公式：$\\int \\sin x dx = -\\cos x + C$
$$\\int_0^\\pi \\sin x dx = -\\cos x\\bigg|_0^\\pi$$
$$= -\\cos \\pi - (-\\cos 0)$$
$$= -(-1) - (-1) = 1 + 1 = 2$$`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 17,
    type: "计算题",
    title: "定积分定义与性质",
    question: "17.求 $\\int_{-1}^1 x^3 dx$",
    explanation: `利用奇函数在对称区间上的积分为零：$x^3$是奇函数，因为$(-x)^3 = -x^3$
由于积分区间$[-1,1]$对原点对称，所以：
$$\\int_{-1}^{1} x^3 dx = 0$$

也可以直接计算验证：
$$\\int_{-1}^{1} x^3 dx = \\frac{x^4}{4}\\bigg|_{-1}^{1}$$
$$= \\frac{1^4}{4} - \\frac{(-1)^4}{4} = \\frac{1}{4} - \\frac{1}{4} = 0$$`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分计算",
    method: "对称性质应用"
  },
  {
    id: 18,
    type: "计算题",
    title: "基本定积分计算",
    question: "18.求 $\\int_0^{\\pi/4} \\tan^2 x dx$",
    explanation: `$$\\int_0^{\\pi/4} \\tan^2 x dx=\\int_0^{\\pi/4}(\\sec^2 x-1) dx$$ (利用恒等式 $\\tan^2 x = \\sec^2 x - 1$)
$$= \\int_0^{\\pi/4} \\sec^2 x dx - \\int_0^{\\pi/4} 1 dx$$ (积分的线性性质)
$$= \\tan x\\bigg|_0^{\\pi/4} - x\\bigg|_0^{\\pi/4}$$ (基本积分公式)
$$= (\\tan \\frac{\\pi}{4} - \\tan 0) - (\\frac{\\pi}{4} - 0)$$
$$= (1 - 0) - \\frac{\\pi}{4} = 1 - \\frac{\\pi}{4}$$`,
    answer: "$1 - \\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 19,
    type: "计算题",
    title: "基本定积分计算",
    question: "19.求 $\\int_1^2 \\frac{x^2}{1+x^2} dx$",
    explanation: `$$\\int_1^2 \\frac{x^2}{1+x^2} dx=\\int_1^2 \\frac{1+x^2-1}{1+x^2} dx$$ (分子加减 $1$，为了分项)
$$=\\int_1^2(\\frac{1+x^2}{1+x^2}-\\frac{1}{1+x^2})dx$$ (分项)
$$=\\int_1^2(1-\\frac{1}{1+x^2})dx$$ (化简)
$$=\\int_1^2 1 dx-\\int_1^2 \\frac{1}{1+x^2}dx$$ (积分的线性性质)
$$= x\\bigg|_1^2 - \\arctan x\\bigg|_1^2$$ (基本积分公式)
$$= (2-1) - (\\arctan 2 - \\arctan 1)$$
$$= 1 - (\\arctan 2 - \\frac{\\pi}{4})$$
$$= 1 - \\arctan 2 + \\frac{\\pi}{4}$$`,
    answer: "$1 - \\arctan 2 + \\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分项积分法"
  },
  {
    id: 20,
    type: "计算题",
    title: "分部积分法",
    question: "20.求 $\\int_0^{\\pi/2} x\\cos x dx$",
    explanation: `分部积分法详细步骤：
1. 把积分拆成两个部分相乘：原式可以看作 $x$ 和 $\\cos x dx$ 的乘积
$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x \\cdot \\cos x dx$$

2. 选择要放进微分符号后面的部分：把容易积分的$\\cos x$放进$d$后面
令前面部分为 $ x $ ，后面部分 $\\cos x dx = d(\\sin x)$
$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x d(\\sin x)$$

3. 应用分部积分公式：前面保留部分乘以后面积分部分 减去 交换后的积分
$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x d(\\sin x)$$
$$= x \\cdot \\sin x\\bigg|_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x \\cdot d(x)$$

4. 计算简单积分：$\\int_0^{\\pi/2} \\sin x dx = -\\cos x\\bigg|_0^{\\pi/2} = -\\cos\\frac{\\pi}{2} + \\cos 0 = 0 + 1 = 1$

5. 代入上下限计算最终结果：
$$\\int_0^{\\pi/2} x\\cos x dx = (\\frac{\\pi}{2} \\cdot \\sin\\frac{\\pi}{2} - 0 \\cdot \\sin 0) - 1$$
$$= \\frac{\\pi}{2} \\cdot 1 - 0 - 1 = \\frac{\\pi}{2} - 1$$`,
    answer: "$\\frac{\\pi}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 21,
    type: "计算题",
    title: "基本定积分计算",
    question: "21.求 $\\int_0^1 \\frac{1}{1+x^2} dx$",
    explanation: `直接应用基本积分公式：$\\int \\frac{1}{1+x^2} dx = \\arctan x + C$
$$\\int_0^1 \\frac{1}{1+x^2} dx = \\arctan x\\bigg|_0^1$$
$$= \\arctan 1 - \\arctan 0$$
$$= \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}$$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "基本积分公式应用"
  },
  {
    id: 22,
    type: "计算题",
    title: "基本定积分计算",
    question: "22.求 $\\int_0^{\\pi} \\sin x dx$",
    explanation: `应用基本积分公式：$\\int \\sin x dx = -\\cos x + C$
$$\\int_0^{\\pi} \\sin x dx = -\\cos x\\bigg|_0^{\\pi}$$
$$= -\\cos \\pi - (-\\cos 0)$$
$$= -(-1) - (-1) = 1 + 1 = 2$$`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 23,
    type: "计算题",
    title: "基本定积分计算",
    question: "23.求 $\\int_0^2 x^2 dx$ ",
    explanation: `计算定积分：
$$\\int_0^2 x^2 dx = \\frac{x^3}{3}\\bigg|_0^2 = \\frac{2^3}{3} - \\frac{0^3}{3} = \\frac{8}{3} - 0 = \\frac{8}{3}$$ `,
    answer: "$\\frac{8}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分的几何意义"
  },
  {
    id: 24,
    type: "计算题",
    title: "换元定积分计算",
    question: "24.求 $\\int_0^1 \\frac{2x}{(1+x^2)^2} dx$",
    explanation: `$$1. 发现复合：\\frac{2x}{(1+x^2)^2}，内层函数是 1+x^2$$
$$2. 强行改写：\\int_0^1 \\frac{2x}{(1+x^2)^2} dx \\rightarrow \\int_0^1 \\frac{2x}{(1+x^2)^2} d(1+x^2)$$
$$3. 调整系数：d(1+x^2)=2x dx \\Rightarrow dx=\\frac{1}{2x} d(1+x^2)$$
$$原积分：\\int_0^1 \\frac{2x}{(1+x^2)^2} dx=\\int_0^1 \\frac{2x}{(1+x^2)^2} \\cdot \\frac{1}{2x} d(1+x^2)=\\int_0^1 \\frac{1}{(1+x^2)^2} d(1+x^2)$$
$$4. 套用公式：\\int \\frac{1}{u^2} du=-\\frac{1}{u}+C$$
$$5. 计算并代入上下限：$$
$$-\\frac{1}{1+x^2}\\bigg|_0^1 = -\\frac{1}{1+1} + \\frac{1}{1+0} = -\\frac{1}{2} + 1 = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "第一类换元积分法"
  },
  {
    id: 25,
    type: "计算题",
    title: "分部积分法",
    question: "25.求 $\\int_1^e \\ln x dx$",
    explanation: `分部积分公式直接应用：
$$\\int_1^e \\ln x dx = x\\ln x\\bigg|_1^e - \\int_1^e x  d\\ln x= x\\ln x\\bigg|_1^e - \\int_1^e x \\cdot \\frac{1}{x} dx$$

3. 化简右侧积分：
$$= x\\ln x\\bigg|_1^e - \\int_1^e 1 dx$$
$$= x\\ln x\\bigg|_1^e - x\\bigg|_1^e$$

4. 代入上下限计算：
$$= (e\\ln e - 1\\ln 1) - (e - 1)$$
$$= (e \\cdot 1 - 0) - (e - 1)$$
$$= e - e + 1 = 1$$`,
    answer: "$1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 26,
    type: "计算题",
    title: "定积分定义与性质",
    question: "26.求 $\\int_{-\\pi}^{\\pi} \\cos x dx$",
    explanation: `利用$\\cos x$是偶函数，即$\\cos(-x) = \\cos x$
在对称区间$[-\\pi,\\pi]$上，可以简化计算：
$$\\int_{-\\pi}^{\\pi} \\cos x dx = 2\\int_0^{\\pi} \\cos x dx$$

计算$\\int_0^{\\pi} \\cos x dx$：
$$\\int_0^{\\pi} \\cos x dx = \\sin x\\bigg|_0^{\\pi} = \\sin \\pi - \\sin 0 = 0 - 0 = 0$$

因此：
$$\\int_{-\\pi}^{\\pi} \\cos x dx = 2 \\cdot 0 = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分计算",
    method: "对称性质应用"
  },
  {
    id: 27,
    type: "计算题",
    title: "分部积分法",
    question: "27.求 $\\int_0^{\\pi/2} e^x\\sin x dx$",
    explanation: ` $\\sin x dx = d(-\\cos x)$
应用分部积分公式：
$$\\int_0^{\\pi/2} e^x\\sin x dx = \\int_0^{\\pi/2} e^x d(-\\cos x) = -e^x\\cos x\\bigg|_0^{\\pi/2} + \\int_0^{\\pi/2} \\cos x d e^x $$

$$= -e^x\\cos x\\bigg|_0^{\\pi/2} + \\int_0^{\\pi/2} \\cos x \\cdot e^x dx$$

首先计算边界项：
$$-e^x\\cos x\\bigg|_0^{\\pi/2} = -e^{\\pi/2}\\cos\\frac{\\pi}{2} + e^0\\cos 0 = -0 + 1 = 1$$

对剩余积分再次应用分部积分：
$$\\int_0^{\\pi/2} e^x\\cos x dx = \\int_0^{\\pi/2} e^x d(\\sin x)  = e^x\\sin x\\bigg|_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x de^x = e^x\\sin x\\bigg|_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x \\cdot e^x dx$$

计算新的边界项：
$$e^x\\sin x\\bigg|_0^{\\pi/2} = e^{\\pi/2}\\sin\\frac{\\pi}{2} - e^0\\sin 0 = e^{\\pi/2} - 0 = e^{\\pi/2}$$

将结果代回原式：
$$\\int_0^{\\pi/2} e^x\\sin x dx= 1 + \\left(e^{\\pi/2} - \\int_0^{\\pi/2} e^x\\sin x dx\\right)$$

移项整理得：
$$2\\int_0^{\\pi/2} e^x\\sin x dx = 1 + e^{\\pi/2}$$

最终结果：
$$\\int_0^{\\pi/2} e^x\\sin x dx = \\frac{1 + e^{\\pi/2}}{2}$$



`,
    answer: "$\\frac{1 + e^{\\pi/2}}{2}$",
    difficulty: "hard",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 28,
    type: "计算题",
    title: "基本定积分计算",
    question: "28.求 $\\int_0^3 (2x+1) dx$",
    explanation: `$$\\int_0^3 (2x+1) dx = \\int_0^3 2x dx + \\int_0^3 1 dx$$ (积分的线性性质)
$$= 2\\int_0^3 x dx + \\int_0^3 dx$$ (常数因子提出)
$$= 2 \\cdot \\frac{x^2}{2}\\bigg|_0^3 + x\\bigg|_0^3$$ (基本积分公式)
$$= x^2\\bigg|_0^3 + x\\bigg|_0^3$$ (化简)
$$= (3^2 - 0^2) + (3 - 0)$$ (代入上下限)
$$= 9 + 3 = 12$$ (计算结果)`,
    answer: "$12$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 29,
    type: "计算题",
    title: "基本定积分计算",
    question: "29.求 $\\int_1^3 x^2 dx$",
    explanation: `应用幂函数积分公式：$\\int x^2 dx = \\frac{x^3}{3} + C$
$$\\int_1^3 x^2 dx = \\frac{x^3}{3}\\bigg|_1^3$$
$$= \\frac{3^3}{3} - \\frac{1^3}{3}$$
$$= \\frac{27}{3} - \\frac{1}{3}$$
$$= 9 - \\frac{1}{3} = \\frac{26}{3}$$`,
    answer: "$\\frac{26}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 30,
    type: "计算题",
    title: "定积分应用",
    question: "30.求曲线 $y = x^2$ 与 $x$ 轴以及直线 $x = 1$ 和 $x = 2$ 所围成的平面图形的面积",
    explanation: `区域面积等于定积分：$A = \\int_1^2 x^2 dx$
$$A = \\frac{x^3}{3}\\bigg|_1^2$$
$$= \\frac{2^3}{3} - \\frac{1^3}{3}$$
$$= \\frac{8}{3} - \\frac{1}{3}$$
$$= \\frac{7}{3}$$
所以曲线 $y = x^2$ 与 $x$ 轴以及直线 $x = 1$ 和 $x = 2$ 所围成的平面图形的面积为 $\\frac{7}{3}$ 平方单位。`,
    answer: "$\\frac{7}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 31,
    type: "计算题",
    title: "定积分应用",
    question: "31.求曲线 $y = 4-x^2$ 与 $x$ 轴所围成的平面图形的面积",
    explanation: `首先确定曲线与 $x$ 轴的交点，令 $4-x^2 = 0$，得 $x = \\pm 2$。
因此区域范围是 $x \\in [-2, 2]$，面积计算如下：
$$A = \\int_{-2}^2 (4-x^2) dx$$
$$= \\int_{-2}^2 4 dx - \\int_{-2}^2 x^2 dx$$
$$= 4x\\bigg|_{-2}^2 - \\frac{x^3}{3}\\bigg|_{-2}^2$$
$$= 4(2-(-2)) - \\frac{1}{3}(2^3-(-2)^3)$$
$$= 4 \\cdot 4 - \\frac{1}{3}(8-(-8))$$
$$= 16 - \\frac{16}{3} = 16 - \\frac{16}{3} = \\frac{48-16}{3} = \\frac{32}{3}$$
所以曲线 $y = 4-x^2$ 与 $x$ 轴所围成的平面图形的面积为 $\\frac{32}{3}$ 平方单位。`,
    answer: "$\\frac{32}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 32,
    type: "计算题",
    title: "定积分应用",
    question: "32.求抛物线 $y = x^2$ 与直线 $y = 4x$ 所围成的平面图形的面积",
    explanation: `首先确定两条曲线的交点。令 $x^2 = 4x$，得 $x^2 - 4x = 0$，即 $x(x-4) = 0$，解得 $x = 0$ 或 $x = 4$。

在区间 $[0, 4]$ 上，直线在上，抛物线在下，因此面积为：
$$A = \\int_0^4 (4x - x^2) dx$$
$$= \\int_0^4 4x dx - \\int_0^4 x^2 dx$$
$$= 4 \\cdot \\frac{x^2}{2}\\bigg|_0^4 - \\frac{x^3}{3}\\bigg|_0^4$$
$$= 2x^2\\bigg|_0^4 - \\frac{x^3}{3}\\bigg|_0^4$$
$$= 2(4^2) - \\frac{4^3}{3} = 2 \\cdot 16 - \\frac{64}{3} = 32 - \\frac{64}{3}$$
$$= \\frac{96-64}{3} = \\frac{32}{3}$$
所以抛物线 $y = x^2$ 与直线 $y = 4x$ 所围成的平面图形的面积为 $\\frac{32}{3}$ 平方单位。`,
    answer: "$\\frac{32}{3}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 33,
    type: "计算题",
    title: "定积分应用",
    question: "33.求曲线 $y = \\sqrt{x}$、$x = 0$、$x = 4$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `旋转体体积计算公式：$V = \\pi \\int_a^b [f(x)]^2 dx$，其中 $f(x)$ 表示曲线方程。

在本题中，$f(x) = \\sqrt{x}$，积分区间为 $[0, 4]$，所以：
$$V = \\pi \\int_0^4 (\\sqrt{x})^2 dx = \\pi \\int_0^4 x dx$$
$$= \\pi \\cdot \\frac{x^2}{2}\\bigg|_0^4$$
$$= \\pi \\cdot \\frac{4^2}{2} = \\pi \\cdot \\frac{16}{2} = 8\\pi$$

所以旋转体的体积为 $8\\pi$ 立方单位。`,
    answer: "$8\\pi$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 34,
    type: "计算题",
    title: "定积分应用",
    question: "34.求曲线 $y = x^2$、$x = 0$、$x = 1$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `旋转体体积计算公式：$V = \\pi \\int_a^b [f(x)]^2 dx$，其中 $f(x)$ 表示曲线方程。

在本题中，$f(x) = x^2$，积分区间为 $[0, 1]$，所以：
$$V = \\pi \\int_0^1 (x^2)^2 dx = \\pi \\int_0^1 x^4 dx$$
$$= \\pi \\cdot \\frac{x^5}{5}\\bigg|_0^1$$
$$= \\pi \\cdot \\frac{1^5}{5} = \\pi \\cdot \\frac{1}{5} = \\frac{\\pi}{5}$$

所以旋转体的体积为 $\\frac{\\pi}{5}$ 立方单位。`,
    answer: "$\\frac{\\pi}{5}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 35,
    type: "计算题",
    title: "基本定积分计算",
    question: "35.求 $\\int_0^\\pi \\cos x dx$",
    explanation: `应用基本积分公式：$\\int \\cos x dx = \\sin x + C$
$$\\int_0^\\pi \\cos x dx = \\sin x\\bigg|_0^\\pi$$
$$= \\sin \\pi - \\sin 0$$
$$= 0 - 0 = 0$$`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 36,
    type: "计算题",
    title: "基本定积分计算",
    question: "36.求 $\\int_0^1 3x^2 dx$",
    explanation: `应用幂函数积分公式：$\\int 3x^2 dx = 3 \\cdot \\frac{x^3}{3} + C = x^3 + C$
$$\\int_0^1 3x^2 dx = x^3\\bigg|_0^1$$
$$= 1^3 - 0^3 = 1 - 0 = 1$$`,
    answer: "$1$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 37,
    type: "计算题",
    title: "定积分应用",
    question: "37.求曲线 $y = \\sin x$ 在区间 $[0, \\pi]$ 与 $x$ 轴所围成的平面图形的面积",
    explanation: `在区间 $[0, \\pi]$ 上，$\\sin x \\geq 0$，因此面积为：
$$A = \\int_0^\\pi \\sin x dx$$
$$= -\\cos x\\bigg|_0^\\pi$$
$$= -\\cos \\pi - (-\\cos 0)$$
$$= -(-1) - (-1) = 1 + 1 = 2$$

所以曲线 $y = \\sin x$ 在区间 $[0, \\pi]$ 与 $x$ 轴所围成的平面图形的面积为 $2$ 平方单位。`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 38,
    type: "计算题",
    title: "定积分应用",
    question: "38.求曲线 $y = \\sin x$ 在区间 $[0, \\pi]$ 与 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `旋转体体积计算公式：$V = \\pi \\int_a^b [f(x)]^2 dx$，其中 $f(x)$ 表示曲线方程。

在本题中，$f(x) = \\sin x$，积分区间为 $[0, \\pi]$，所以：
$$V = \\pi \\int_0^\\pi (\\sin x)^2 dx = \\pi \\int_0^\\pi \\sin^2 x dx$$

使用半角公式：$\\sin^2 x = \\frac{1-\\cos 2x}{2}$，得：
$$V = \\pi \\int_0^\\pi \\frac{1-\\cos 2x}{2} dx = \\frac{\\pi}{2} \\int_0^\\pi (1-\\cos 2x) dx$$
$$= \\frac{\\pi}{2} \\left(\\int_0^\\pi dx - \\int_0^\\pi \\cos 2x dx\\right)$$
$$= \\frac{\\pi}{2} \\left(x\\bigg|_0^\\pi - \\frac{1}{2}\\sin 2x\\bigg|_0^\\pi\\right)$$
$$= \\frac{\\pi}{2} \\left((\\pi - 0) - \\frac{1}{2}(\\sin 2\\pi - \\sin 0)\\right)$$
$$= \\frac{\\pi}{2} \\left(\\pi - \\frac{1}{2} \\cdot 0\\right) = \\frac{\\pi}{2} \\cdot \\pi = \\frac{\\pi^2}{2}$$

所以旋转体的体积为 $\\frac{\\pi^2}{2}$ 立方单位。`,
    answer: "$\\frac{\\pi^2}{2}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 39,
    type: "计算题",
    title: "定积分应用",
    question: "39.求直线 $y = 2x$、$x = 1$ 和 $y = 0$ 所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `旋转体体积计算公式：$V = \\pi \\int_a^b [f(x)]^2 dx$，其中 $f(x)$ 表示曲线方程。

在本题中，$f(x) = 2x$，积分区间为 $[0, 1]$，所以：
$$V = \\pi \\int_0^1 (2x)^2 dx = \\pi \\int_0^1 4x^2 dx$$
$$= 4\\pi \\int_0^1 x^2 dx = 4\\pi \\cdot \\frac{x^3}{3}\\bigg|_0^1$$
$$= 4\\pi \\cdot \\frac{1^3}{3} = 4\\pi \\cdot \\frac{1}{3} = \\frac{4\\pi}{3}$$

所以旋转体的体积为 $\\frac{4\\pi}{3}$ 立方单位。`,
    answer: "$\\frac{4\\pi}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 40,
    type: "计算题",
    title: "广义积分",
    question: "40.求广义积分 $\\int_1^{+\\infty} \\frac{1}{x} dx$",
    explanation: `$$\\int_1^{+\\infty} \\frac{1}{x} dx = \\ln|x|\\bigg|_1^{+\\infty}$$ 代入上下限： $$\\ln|x|\\bigg|_1^{+\\infty} = \\lim\\limits_{x \\to +\\infty}\\ln x - \\ln 1 = \\lim\\limits_{x \\to +\\infty}\\ln x = +\\infty$$ 由于结果是无穷大，所以广义积分 $\\int_1^{+\\infty} \\frac{1}{x} dx$ 发散。`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 41,
    type: "计算题",
    title: "基本定积分计算",
    question: "41.求 $\\int_0^1 \\frac{x^2}{1+x^3} dx$",
    explanation: `
$$1. 发现复合：\\frac{1}{1+x^3}$$
$$2. 强行改写：\\int_0^1 \\frac{x^2}{1+x^3} dx \\rightarrow \\int_0^1 \\frac{x^2}{1+x^3} d(1+x^3)$$
$$3. 调整系数：$$
   $$d(x^3)=3x^2 dx \\Rightarrow dx=\\frac{1}{3x^2} d(x^3)$$
   $$\\int_0^1 \\frac{x^2}{1+x^3} dx=\\int_0^1 \\frac{x^2}{1+x^3} \\cdot \\frac{1}{3x^2} d(1+x^3)=\\frac{1}{3}\\int_0^1 \\frac{1}{1+x^3} d(1+x^3)$$
$$4. 套用公式：\\int \\frac{1}{u} du=\\ln|u| + C$$
$$5. 计算结果并代入上下限：$$
   $$\\frac{1}{3}\\ln|1+x^3|\\bigg|_0^1 = \\frac{1}{3}(\\ln|1+1^3| - \\ln|1+0^3|) = \\frac{1}{3}(\\ln 2 - \\ln 1) = \\frac{1}{3}\\ln 2$$
`,
    answer: "$\\frac{1}{3}\\ln 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法与对称性"
  },
  {
    id: 42,
    type: "计算题",
    title: "广义积分",
    question: "42.求广义积分 $\\int_2^{+\\infty} \\frac{1}{x^2} dx$",
    explanation: `$$\\int_2^{+\\infty} \\frac{1}{x^2} dx = -\\frac{1}{x}\\bigg|_2^{+\\infty}$$ 代入上下限： $$-\\frac{1}{x}\\bigg|_2^{+\\infty} = \\lim\\limits_{x \\to +\\infty}(-\\frac{1}{x}) - (-\\frac{1}{2}) = 0 - (-\\frac{1}{2}) = \\frac{1}{2}$$ 所以广义积分 $\\int_2^{+\\infty} \\frac{1}{x^2} dx = \\frac{1}{2}$。`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 43,
    type: "计算题",
    title: "分部积分法",
    question: "43.计算定积分 $\\int_0^{\\pi/2} x\\cos x dx$",
    explanation: `分部积分法详细步骤：
1. 把积分拆成两个部分相乘：原式可以看作 $x$ 和 $\\cos x dx$ 的乘积
$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x \\cdot \\cos x dx$$

2.  $\\cos x dx = d(\\sin x)$
应用分部积分公式：前面保留部分乘以后面积分部分 减去 交换后的积分
$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x d(\\sin x)$$
$$= x \\cdot \\sin x\\bigg|_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x \\cdot d(x)$$

3. 分别计算两部分
   - 第一部分：
     $$x \\cdot \\sin x\\bigg|_0^{\\pi/2} = (\\frac{\\pi}{2} \\cdot \\sin \\frac{\\pi}{2}) - (0 \\cdot \\sin 0) = \\frac{\\pi}{2} \\cdot 1 - 0 = \\frac{\\pi}{2}$$
   - 第二部分：
     $$\\int_0^{\\pi/2} \\sin x \\cdot dx = -\\cos x \\bigg|_0^{\\pi/2} = -(\\cos \\frac{\\pi}{2} - \\cos 0) = -(0 - 1) = 1$$

4.  最终结果：
    $$\\frac{\\pi}{2} - 1$$

`,
    answer: "$\\frac{\\pi}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 44,
    type: "计算题",
    title: "换元定积分计算",
    question: "44.计算定积分 $\\int_0^{\\pi/2} \\sin^2 x dx$",
    explanation: `使用二倍角公式：$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$

原积分变为：
$$\\int_0^{\\pi/2} \\sin^2 x dx = \\int_0^{\\pi/2} \\frac{1 - \\cos 2x}{2} dx$$
$$= \\frac{1}{2} \\int_0^{\\pi/2} (1 - \\cos 2x) dx$$
$$= \\frac{1}{2} \\left( \\int_0^{\\pi/2} 1 dx - \\int_0^{\\pi/2} \\cos 2x dx \\right)$$  \\(= \\frac{1}{2} \\left( \\int_0^{\\pi/2} 1 dx - \\int_0^{\\pi/2} \\cos 2x \\frac{1}{2}d(2x) \\right)\\) 
$$(因为 d(2x) = 2dx, 即dx = \\frac{1}{2}d(2x))$$
$$= \\frac{1}{2} \\left( \\frac{\\pi}{2} - 0 - \\frac{1}{2} \\int_0^{\\pi/2} \\cos 2x d(2x) \\right)$$
$$= \\frac{1}{2} \\left( \\frac{\\pi}{2} - 0 - \\frac{1}{2} \\sin 2x \\bigg|_0^{\\pi/2} \\right)$$
$$= \\frac{1}{2} \\left( \\frac{\\pi}{2} - 0 - \\frac{1}{2} \\cdot 0 \\right) = \\frac{1}{2} \\cdot \\frac{\\pi}{2} = \\frac{\\pi}{4}$$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分"
  },
  {
    id: 45,
    type: "计算题",
    title: "分部积分法",
    question: "45.利用分部积分法计算 $\\int_0^1 x \\ln(1+x) dx$",
    explanation: `直接应用分部积分法：

$$\\int_0^1 x \\ln(1+x) dx = \\int_0^1 \\ln(1+x) \\cdot x dx$$

将 $\\ln(1+x)$ 看作第一个函数，$x dx$ 看作第二个函数的微分

由于 $x dx = d(\\frac{x^2}{2})$，所以可以写作：

$$\\int_0^1 x \\ln(1+x) dx = \\int_0^1 \\ln(1+x) \\cdot d(\\frac{x^2}{2})$$

$$= \\ln(1+x) \\cdot \\frac{x^2}{2}\\bigg|_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot d(\\ln(1+x))$$

$$= \\ln(2) \\cdot \\frac{1}{2} - 0 - \\int_0^1 \\frac{x^2}{2} \\cdot \\frac{1}{1+x}dx$$

$$= \\frac{\\ln(2)}{2} - \\int_0^1 \\frac{x^2}{2(1+x)} dx$$

对于 $\\int_0^1 \\frac{x^2}{2(1+x)} dx$，将分子变形：

$$\\frac{x^2}{2(1+x)} = \\frac{1}{2} \\cdot \\frac{x^2}{1+x} = \\frac{1}{2} \\cdot \\frac{(1+x-1)^2}{1+x}$$

$$= \\frac{1}{2} \\cdot \\frac{(1+x)^2-2(1+x)+1}{1+x}$$

$$= \\frac{1}{2} \\cdot ((1+x) - 2 + \\frac{1}{1+x})$$

$$= \\frac{1}{2} \\cdot (x - 1 + \\frac{1}{1+x})$$

所以：

$$\\int_0^1 \\frac{x^2}{2(1+x)} dx = \\frac{1}{2} \\int_0^1 (x - 1 + \\frac{1}{1+x}) dx$$

$$= \\frac{1}{2} (\\frac{x^2}{2} - x + \\ln(1+x))\\bigg|_0^1$$

$$= \\frac{1}{2} ((\\frac{1}{2} - 1 + \\ln(2)) - (0 - 0 + 0))$$

$$= \\frac{1}{2} (\\frac{1}{2} - 1 + \\ln(2))$$

$$= \\frac{1}{4} - \\frac{1}{2} + \\frac{\\ln(2)}{2}$$

最终结果：

$$\\int_0^1 x \\ln(1+x) dx = \\frac{\\ln(2)}{2} - (\\frac{1}{4} - \\frac{1}{2} + \\frac{\\ln(2)}{2})$$

$$= \\frac{\\ln(2)}{2} - \\frac{1}{4} + \\frac{1}{2} - \\frac{\\ln(2)}{2}$$

$$= -\\frac{1}{4} + \\frac{1}{2} = \\frac{-1 + 2}{4} = \\frac{1}{4}$$`,
    answer: "$\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 46,
    type: "计算题",
    title: "换元定积分计算",
    question: "46.计算 $\\int_0^{\\pi/3} \\sec^2 x dx$",
    explanation: `使用基本积分公式：$\\int \\sec^2 x dx = \\tan x + C$
$$\\int_0^{\\pi/3} \\sec^2 x dx = \\tan x\\bigg|_0^{\\pi/3} = \\tan \\frac{\\pi}{3} - \\tan 0 = \\sqrt{3} - 0 = \\sqrt{3}$$`,
    answer: "$\\sqrt{3}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分"
  },
  {
    id: 47,
    type: "计算题",
    title: "换元定积分计算",
    question: "47.计算 $\\int_0^{\\pi/2} \\sin^3 x dx$",
    explanation: `使用三角恒等式：$\\sin^3 x = \\sin x \\cdot \\sin^2 x = \\sin x \\cdot (1 - \\cos^2 x)$

所以：
$$\\int_0^{\\pi/2} \\sin^3 x dx = \\int_0^{\\pi/2} \\sin x \\cdot (1 - \\cos^2 x) dx$$

我们可以将积分分成两部分：
$$\\int_0^{\\pi/2} \\sin^3 x dx = \\int_0^{\\pi/2} \\sin x dx - \\int_0^{\\pi/2} \\sin x \\cos^2 x dx$$

第一部分：
$$\\int_0^{\\pi/2} \\sin x dx = -\\cos x \\bigg|_0^{\\pi/2} = -\\cos(\\pi/2) + \\cos(0) = 0 + 1 = 1$$

第二部分， $\\sin x dx = d(-\\cos x)$：
$$\\int_0^{\\pi/2} \\sin x \\cos^2 x dx = -\\int_0^{\\pi/2}  \\cos^2 x d(\\cos x)$$

$$= -\\frac{\\cos^3 x}{3} \\bigg|_0^{\\pi/2} = -(\\frac{\\cos^3 (\\frac{\\pi}{2})}{3} - \\frac{\\cos^3 0}{3}) = - (0 - \\frac{1}{3}) = \\frac{1}{3}$$

因此：
$$\\int_0^{\\pi/2} \\sin^3 x dx = 1 - \\frac{1}{3} = \\frac{3-1}{3} = \\frac{2}{3}$$`,
    answer: "$\\frac{2}{3}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 48,
    type: "计算题",
    title: "基本定积分计算",
    question: "48.求 $\\int_0^1 x^2(1-x) dx$",
    explanation: `$$\\int_0^1 x^2(1-x) dx = \\int_0^1 (x^2 - x^3) dx$$ (展开括号)
$$= \\int_0^1 x^2 dx - \\int_0^1 x^3 dx$$ (积分的线性性质)
$$= \\frac{x^3}{3}\\bigg|_0^1 - \\frac{x^4}{4}\\bigg|_0^1$$ (基本积分公式)
$$= (\\frac{1^3}{3} - \\frac{0^3}{3}) - (\\frac{1^4}{4} - \\frac{0^4}{4})$$ (代入上下限)
$$= \\frac{1}{3} - \\frac{1}{4} = \\frac{4-3}{12} = \\frac{1}{12}$$ (计算结果)`,
    answer: "$\\frac{1}{12}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 49,
    type: "计算题",
    title: "定积分应用",
    question: "49.求曲线 $y = x(1-x)$ 与 $x$ 轴在区间 $[0,1]$ 所围成的平面图形的面积",
    explanation: `因为在区间 $[0,1]$ 上，$x(1-x) \\geq 0$，所以面积为：
$$A = \\int_0^1 x(1-x) dx = \\int_0^1 (x - x^2) dx$$
$$= \\frac{x^2}{2}\\bigg|_0^1 - \\frac{x^3}{3}\\bigg|_0^1$$
$$= (\\frac{1^2}{2} - \\frac{0^2}{2}) - (\\frac{1^3}{3} - \\frac{0^3}{3})$$
$$= \\frac{1}{2} - \\frac{1}{3} = \\frac{3-2}{6} = \\frac{1}{6}$$

所以曲线 $y = x(1-x)$ 与 $x$ 轴在区间 $[0,1]$ 所围成的平面图形的面积为 $\\frac{1}{6}$ 平方单位。`,
    answer: "$\\frac{1}{6}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 50,
    type: "计算题",
    title: "定积分应用",
    question: "50.求由曲线 $y = x + 1$、$x = -2$、$x = 2$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `利用对称性和奇偶函数性质简化计算：

体积公式：$V = \\pi \\int_{-2}^{2} (x + 1)^2 dx$

展开平方项：
$$(x + 1)^2 = x^2 + 2x + 1$$

根据奇偶函数性质：
1. $x^2$ 和 $1$ 是偶函数
2. $2x$ 是奇函数

积分化简：
$$V = \\pi \\left[ 2\\int_{0}^{2} (x^2 + 1) dx + \\underbrace{\\int_{-2}^{2} 2x dx}_{0} \\right]$$

计算剩余积分：
$$2\\int_{0}^{2} (x^2 + 1) dx = 2\\left( \\frac{x^3}{3} + x \\right)\\bigg|_0^2$$
$$= 2\\left( \\frac{8}{3} + 2 \\right) = 2\\left( \\frac{14}{3} \\right) = \\frac{28}{3}$$

最终体积：
$$V = \\pi \\cdot \\frac{28}{3} = \\frac{28\\pi}{3}$$

该解法通过对称区间和奇偶函数性质，将复杂积分简化为仅需计算区间一半的偶函数部分。`,
    answer: "$\\frac{28\\pi}{3}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "对称性简化积分"
  },
  {
    id: 51,
    type: "计算题",
    title: "基本定积分计算",
    question: "51.求 $\\int_0^1 x^3(1-x)^2 dx$",
    explanation: `展开 $(1-x)^2 = 1 - 2x + x^2$，所以：
$$\\int_0^1 x^3(1-x)^2 dx = \\int_0^1 x^3(1 - 2x + x^2) dx$$
$$= \\int_0^1 (x^3 - 2x^4 + x^5) dx$$
$$= \\frac{x^4}{4}\\bigg|_0^1 - 2\\frac{x^5}{5}\\bigg|_0^1 + \\frac{x^6}{6}\\bigg|_0^1$$
$$= \\frac{1^4}{4} - 2\\frac{1^5}{5} + \\frac{1^6}{6} - (0 - 0 + 0)$$
$$= \\frac{1}{4} - \\frac{2}{5} + \\frac{1}{6} = \\frac{15-24+10}{60} = \\frac{1}{60}$$`,
    answer: "$\\frac{1}{60}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 52,
    type: "计算题",
    title: "基本定积分计算",
    question: "52.求 $\\int_{-2}^2 |x| dx$",
    explanation: `因为 $|x| = \\begin{cases} x, & x \\geq 0 \\\\ -x, & x < 0 \\end{cases}$，所以可以分区间计算：
$$\\int_{-2}^2 |x| dx = \\int_{-2}^0 |x| dx + \\int_0^2 |x| dx = \\int_{-2}^0 (-x) dx + \\int_0^2 x dx$$
$$= -\\int_{-2}^0 x dx + \\int_0^2 x dx = -\\frac{x^2}{2}\\bigg|_{-2}^0 + \\frac{x^2}{2}\\bigg|_0^2$$
$$= -(0 - \\frac{(-2)^2}{2}) + (\\frac{2^2}{2} - 0) = -0 + \\frac{4}{2} + \\frac{4}{2} - 0 = 2 + 2 = 4$$`,
    answer: "$4$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分段函数定积分"
  },
  {
    id: 53,
    type: "计算题",
    title: "分部积分法",
    question: "53.求 $\\int_0^{\\pi} t\\sin t dt$",
    explanation: `直接应用分部积分法：

$$\\int_0^{\\pi} t\\sin t dt$$

将 $t$ 看作第一个函数，$\\sin t dt$ 看作第二个函数的微分

由于 $\\sin t dt = d(-\\cos t)$，所以可以写作：

$$\\int_0^{\\pi} t\\sin t dt = \\int_0^{\\pi} t \\cdot d(-\\cos t)$$

$$= -t\\cos t\\bigg|_0^{\\pi} + \\int_0^{\\pi} \\cos t dt$$

$$= -\\pi\\cos\\pi - (-0\\cos0) + \\sin t\\bigg|_0^{\\pi}$$

$$= \\pi + (0 - 0) = \\pi$$`,
    answer: "$\\pi$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 54,
    type: "计算题",
    title: "广义积分",
    question: "54.讨论广义积分 $\\int_0^2 \\frac{dx}{(x-1)^2}$ 的敛散性",
    explanation: `因积分区间[0, 2]内存在瑕点x=1（使被积函数无定义的点），需将积分分为两部分：
$$\\int_0^2 \\frac{dx}{(x-1)^2} = \\int_0^1 \\frac{dx}{(x-1)^2} + \\int_1^2 \\frac{dx}{(x-1)^2}$$
$$ =-\\frac{1}{x-1}\\bigg|_0^{1} +-\\frac{1}{x-1}\\bigg|_1^{2} $$

$$这里需要计算瑕点 x=1 处的极限：$$
$$对于第一部分积分 \\int_0^1，考察 x 从左侧（小于1的值）逼近1，记为 x \\to 1^-$$
$$对于第二部分积分 \\int_1^2，考察 x 从右侧（大于1的值）逼近1，记为 x \\to 1^+$$
$$=\\lim\\limits_{x \\to 1^-} (-\\frac{1}{x-1}) - (-\\frac{1}{0-1}) + (-\\frac{1}{2-1})-\\lim\\limits_{x \\to 1^+} (-\\frac{1}{x-1})  $$
因为
$$ \\lim\\limits_{x \\to 1^+}\\frac{1}{x-1} = +\\infty$$
$$ \\lim\\limits_{x \\to 1^-}\\frac{1}{x-1} = -\\infty$$
因此，原广义积分 $\\int_0^2 \\frac{dx}{(x-1)^2}$ 的两部分均发散，所以整个积分发散。`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 55,
    type: "计算题",
    title: "换元定积分计算",
    question: "55.求 $\\int_0^{\\pi} \\sin^2 x \\cos x dx$",
    explanation: `注意到 $\\cos x dx = d(\\sin x)$，所以可以将积分改写为：

$$\\int_0^{\\pi} \\sin^2 x \\cos x dx = \\int_0^{\\pi} \\sin^2 x \\cdot d(\\sin x)$$


$$= \\frac{\\sin^3 x}{3}\\bigg|_0^{\\pi} = \\frac{\\sin^3 \\pi}{3} - \\frac{\\sin^3 0}{3} = \\frac{0^3}{3} - \\frac{0^3}{3} = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 56,
    type: "计算题",
    title: "换元定积分计算",
    question: "56.求 $\\int_0^4 \\frac{1}{1+\\sqrt{x}} dx$",
    explanation: `设 $\\sqrt{x}=t$，即 $x=t^2$，则 $dx=2tdt$。当 $x=0$ 时，$t=0$；当 $x=4$ 时，$t=2$。于是

$$\\int_0^4 \\frac{1}{1+\\sqrt{x}} dx = \\int_0^2 \\frac{2t}{1+t} dt = 2\\int_0^2 (1-\\frac{1}{1+t}) dt$$
$$= 2(t-\\ln|1+t|)\\bigg|_0^2 = 2(2-\\ln3) .$$`,
    answer: "$2(2-\\ln3)$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 57,
    type: "计算题",
    title: "定积分定义与性质",
    question: "57.求 $\\int_{-\\sqrt{3}}^{\\sqrt{3}} \\frac{x^2\\sin x}{1+x^4} dx$",
    explanation: `因为被积函数 $f(x)=\\frac{x^2\\sin x}{1+x^4}$ 是奇函数，且积分区间 $[-\\sqrt{3},\\sqrt{3}]$ 是对称区间，所以

$$\\int_{-\\sqrt{3}}^{\\sqrt{3}} \\frac{x^2\\sin x}{1+x^4} dx = 0 .$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 58,
    type: "计算题",
    title: "定积分定义与性质",
    question: "58.求 $\\int_{-1}^1 (\\sin 3x\\cdot\\tan^2 x + \\frac{x}{\\sqrt{1+x^2}} + x^2) dx$",
    explanation: `因为 $\\sin 3x\\cdot\\tan^2 x$ 和 $\\frac{x}{\\sqrt{1+x^2}}$ 都是奇函数，$x^2$ 是偶函数，所以

$$\\int_{-1}^1 (\\sin 3x\\cdot\\tan^2 x + \\frac{x}{\\sqrt{1+x^2}} + x^2) dx = \\int_{-1}^1 \\sin 3x\\tan^2 xdx + \\int_{-1}^1 \\frac{x}{\\sqrt{1+x^2}} dx + 2\\int_0^1 x^2dx$$
$$= 0 + 0 + 2\\cdot\\frac{1}{3}x^3\\bigg|_0^1 = \\frac{2}{3} .$$`,
    answer: "$\\frac{2}{3}$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 59,
    type: "计算题",
    title: "分部积分法",
    question: "59.求 $\\int_0^{\\frac{1}{2}} \\arcsin x dx$",
    explanation: `直接应用分部积分法：

$$\\int_0^{\\frac{1}{2}} \\arcsin x dx$$

将 $\\arcsin x$ 看作第一个函数，$dx$ 看作第二个函数的微分

由于 $dx = d(x)$，所以可以写作：

$$\\int_0^{\\frac{1}{2}} \\arcsin x dx = \\int_0^{\\frac{1}{2}} \\arcsin x \\cdot d(x)$$

$$= \\arcsin x \\cdot x \\bigg|_0^{\\frac{1}{2}} - \\int_0^{\\frac{1}{2}} x \\cdot d(\\arcsin x)$$

$$= \\frac{1}{2} \\arcsin \\frac{1}{2} - 0 - \\int_0^{\\frac{1}{2}} x \\cdot \\frac{1}{\\sqrt{1-x^2}} dx$$

$$= \\frac{\\pi}{12} - \\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx$$

$$使用第一类换元积分法求 \\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx$$

$$1. 发现内层函数：1-x^2$$
$$2. 调整微分：d(1-x^2) = -2xdx \\Rightarrow xdx = -\\frac{1}{2}d(1-x^2)$$
$$3. 改写积分：\\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx = -\\frac{1}{2}\\int_0^{\\frac{1}{2}} \\frac{1}{\\sqrt{1-x^2}} d(1-x^2)$$
$$4. 直接计算：$$
$$-\\frac{1}{2}\\int_0^{\\frac{1}{2}} \\frac{1}{\\sqrt{1-x^2}} d(1-x^2) = -\\frac{1}{2} \\cdot 2\\sqrt{1-x^2} \\bigg|_0^{\\frac{1}{2}}$$
$$= -\\sqrt{1-x^2} \\bigg|_0^{\\frac{1}{2}} = -\\sqrt{1-\\frac{1}{4}} + \\sqrt{1-0} = -\\frac{\\sqrt{3}}{2} + 1$$
$$最终结果是：$$
$$\\int_0^{\\frac{1}{2}} \\arcsin x dx = \\frac{\\pi}{12} - (-\\frac{\\sqrt{3}}{2} + 1) = \\frac{\\pi}{12} + \\frac{\\sqrt{3}}{2} - 1$$`,
    answer: "$\\frac{\\pi}{12} + \\frac{\\sqrt{3}}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 60,
    type: "计算题",
    title: "分部积分法",
    question: "60.求 $\\int_0^{\\pi/4} x\\sin 2x dx$",
    explanation: `直接应用分部积分法：

$$\\int_0^{\\pi/4} x\\sin 2x dx$$

将 $x$ 看作第一个函数，$\\sin 2x dx$ 看作第二个函数的微分

首先令 $t = 2x$，则 $x = \\frac{t}{2}$，$dx = \\frac{dt}{2}$，积分区间变为 $t \\in [0, \\pi/2]$

$$\\int_0^{\\pi/4} x\\sin 2x dx = \\int_0^{\\pi/2} \\frac{t}{2} \\sin t \\cdot \\frac{dt}{2} = \\frac{1}{4} \\int_0^{\\pi/2} t \\sin t dt$$

$$现在应用分部积分法： \\sin t dt = d(-\\cos t)$$

$$\\frac{1}{4} \\int_0^{\\pi/2} t \\sin t dt = \\frac{1}{4} \\int_0^{\\pi/2} t d(-\\cos t)  = \\frac{1}{4} \\left[ -t \\cos t \\bigg|_0^{\\pi/2} + \\int_0^{\\pi/2} \\cos t dt \\right]$$

$$= \\frac{1}{4} \\left[ -\\frac{\\pi}{2} \\cos \\frac{\\pi}{2} + 0 \\cdot \\cos 0 + \\sin t \\bigg|_0^{\\pi/2} \\right]$$

$$= \\frac{1}{4} \\left[ 0 + (\\sin \\frac{\\pi}{2} - \\sin 0) \\right]$$

$$= \\frac{1}{4} \\cdot (1 - 0) = \\frac{1}{4}$$`,
    answer: "$\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 61,
    type: "计算题",
    title: "基本定积分计算",
    question: "61.求 $\\int_0^1 e^x dx$",
    explanation: `使用基本积分公式：$\\int e^x dx = e^x + C$
$$\\int_0^1 e^x dx = e^x\\bigg|_0^1 = e^1 - e^0 = e - 1$$`,
    answer: "$e-1$",
    difficulty: "easy",
    category: "定积分计算",
    method: "指数函数积分法"
  },
  {
    id: 62,
    type: "计算题",
    title: "换元定积分计算",
    question: "62.求 $\\int_{0}^{\\pi} \\sin^2 x dx$",
    explanation: `利用三角恒等式 $\\sin^2 x = \\frac{1 - \\cos 2x}{2}$，可以将积分转化为：

$$\\int_{0}^{\\pi} \\sin^2 x dx = \\int_{0}^{\\pi} \\frac{1 - \\cos 2x}{2} dx = \\frac{1}{2}\\int_{0}^{\\pi} (1 - \\cos 2x) dx$$

$$= \\frac{1}{2}\\int_{0}^{\\pi} dx - \\frac{1}{2}\\int_{0}^{\\pi} \\cos 2x dx$$

$$= \\frac{1}{2}[x]_{0}^{\\pi} - \\frac{1}{2}\\int_{0}^{\\pi} \\cos 2x dx$$

对于第二项，我们使用凑微分法：$d(2x)=2dx$，即$dx=\\frac{1}{2}d(2x)$

$$= \\frac{1}{2}[x]_{0}^{\\pi} - \\frac{1}{2} \\cdot \\frac{1}{2}\\int_{0}^{2\\pi} \\cos (2x) d(2x)$$

$$= \\frac{1}{2}(\\pi - 0) - \\frac{1}{4}[\\sin (2x)]_{0}^{2\\pi}$$

$$= \\frac{\\pi}{2} - \\frac{1}{4}(\\sin 4\\pi - \\sin 0)$$

$$= \\frac{\\pi}{2} - \\frac{1}{4}(0 - 0)$$

$$= \\frac{\\pi}{2}$$`,
    answer: "$\\frac{\\pi}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 63,
    type: "计算题",
    title: "换元定积分计算",
    question: "63.求 $\\int_0^{\\ln 2} e^x(e^x+1) dx$",
    explanation: `展开被积函数：
$$\\int_0^{\\ln 2} e^x(e^x+1) dx = \\int_0^{\\ln 2} (e^{2x}+e^x) dx$$
$$= \\int_0^{\\ln 2} e^{2x} dx + \\int_0^{\\ln 2} e^x dx$$
对于第一项，使用凑微分法, $d(2x) = 2dx$,即$dx=\\frac{1}{2}d(2x)$：
$$ \\int_0^{\\ln 2} e^{2x} dx =  \\frac{1}{2}\\int_0^{\\ln 2} e^{2x} d(2x) = \\frac{1}{2}e^{2x} \\bigg|_0^{\\ln 2}$$
所以：
$$= \\frac{1}{2}e^{2x} \\bigg|_0^{\\ln 2} + e^x\\bigg|_0^{\\ln 2}$$
$$= \\frac{e^{2\\ln 2}}{2} - \\frac{e^0}{2} + e^{\\ln 2} - e^0$$
$$= \\frac{e^{\\ln 2^2}}{2} - \\frac{1}{2} + e^{\\ln 2} - 1$$
$$= \\frac{2^2}{2} - \\frac{1}{2} + 2 - 1 = \\frac{4}{2} - \\frac{1}{2} + 2 - 1 = 2 - \\frac{1}{2} + 2 - 1 = 2.5$$`,
    answer: "$\\frac{5}{2}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "指数函数积分法"
  },
  {
    id: 64,
    type: "计算题",
    title: "换元定积分计算",
    question: "64.求 $\\int_0^1 \\frac{dx}{(x+1)^2}$",
    explanation: `使用换元法。$dx = d(x+1)$。
原积分变为：
$$\\int_0^1 \\frac{dx}{(x+1)^2} = \\int_0^1 \\frac{d(x+1)}{(x+1)^2} = -\\frac{1}{x+1}\\bigg|_0^1 = -\\frac{1}{1+1} - (-\\frac{1}{0+1}) = -\\frac{1}{2} + 1 = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 65,
    type: "计算题",
    title: "换元定积分计算",
    question: "65.求 $\\int_0^{\\pi/2} \\sin x \\cos x dx$",
    explanation: `使用二倍角公式：$\\sin x \\cos x = \\frac{\\sin 2x}{2}$
$$\\int_0^{\\pi/2} \\sin x \\cos x dx = \\int_0^{\\pi/2} \\frac{\\sin 2x}{2} dx = \\frac{1}{2}\\int_0^{\\pi/2} \\sin 2x dx$$
$$d(2x) = 2dx即dx=\\frac{1}{2}d(2x)$$
$$= \\frac{1}{2} \\int_0^{\\pi/2} \\sin 2x \\frac{1}{2} d(2x) = \\frac{1}{4}\\int_0^{\\pi/2} \\sin 2x d(2x) = \\frac{1}{4}(-\\cos 2x)\\bigg|_0^{\\pi/2} $$
$$= -\\frac{1}{4}(\\cos \\pi - \\cos 0) = -\\frac{1}{4}((-1) - 1) = -\\frac{1}{4} \\cdot (-2) = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 66,
    type: "计算题",
    title: "基本定积分计算",
    question: "66.求 $\\int_0^1 (x^2+1)^2 dx$",
    explanation: `展开被积函数：
$$(x^2+1)^2 = x^4 + 2x^2 + 1$$

所以：
$$\\int_0^1 (x^2+1)^2 dx = \\int_0^1 (x^4 + 2x^2 + 1) dx$$
$$= \\int_0^1 x^4 dx + 2\\int_0^1 x^2 dx + \\int_0^1 dx$$
$$= \\frac{x^5}{5}\\bigg|_0^1 + 2\\frac{x^3}{3}\\bigg|_0^1 + x\\bigg|_0^1$$
$$= \\frac{1^5}{5} - \\frac{0^5}{5} + 2(\\frac{1^3}{3} - \\frac{0^3}{3}) + (1 - 0)$$
$$= \\frac{1}{5} + 2 \\cdot \\frac{1}{3} + 1 = \\frac{1}{5} + \\frac{2}{3} + 1 = \\frac{3+10+15}{15} = \\frac{28}{15}$$`,
    answer: "$\\frac{28}{15}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 67,
    type: "计算题",
    title: "换元定积分计算",
    question: "67.求 $\\int_0^4 e^{\\sqrt{x}} dx$",
    explanation: `使用换元法求解:
令 $t = \\sqrt{x}$，则 $x = t^2$，$dx = 2t dt$
当 $x = 0$ 时，$t = 0$；当 $x = 4$ 时，$t = 2$

$$\\int_0^4 e^{\\sqrt{x}} dx = \\int_0^2 e^t \\cdot 2t dt = 2\\int_0^2 t e^t dt$$

利用分部积分法：
令 $u = t$, $dv = e^t dt$，则 $du = dt$, $v = e^t$

$$2\\int_0^2 t e^t dt = 2(te^t|_0^2 - \\int_0^2 e^t dt)$$
$$= 2(2e^2 - 0 - (e^2 - e^0))$$
$$= 2(2e^2 - e^2 + 1)$$
$$= 2(e^2 + 1)$$
$$= 2e^2 + 2$$

因此，$\\int_0^4 e^{\\sqrt{x}} dx = 2e^2 + 2$。`,
    answer: "$2e^2 + 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法与分部积分法"
  },
  {
    id: 68,
    type: "计算题",
    title: "定积分定义与性质",
    question: "68.求 $\\int_{-\\pi}^{\\pi} x^6 \\sin x dx$",
    explanation: `由于被积函数中的 $x^6$ 是偶函数，$\\sin x$ 是奇函数，所以它们的乘积 $x^6 \\sin x$ 是奇函数。

对于奇函数 $f(x)$ 在区间 $[-a,a]$ 上的定积分，有 $\\int_{-a}^a f(x) dx = 0$。

因此，$\\int_{-\\pi}^{\\pi} x^6 \\sin x dx = 0$。`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 69,
    type: "计算题",
    title: "定积分定义与性质",
    question: "69.求 $\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx$",
    explanation: `将被积函数拆分为两部分：
$$\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx = \\int_{-1}^1 \\frac{2}{1+x^2} dx + \\int_{-1}^1 \\frac{\\sin x}{1+x^2} dx$$

对于第一项，$\\frac{2}{1+x^2}$ 是偶函数，所以：
$$\\int_{-1}^1 \\frac{2}{1+x^2} dx = 2\\int_0^1 \\frac{2}{1+x^2} dx = 4\\int_0^1 \\frac{1}{1+x^2} dx = 4 \\cdot \\arctan x|_0^1 = 4 \\cdot (\\frac{\\pi}{4} - 0) = \\pi$$

对于第二项，注意到 $\\sin x$ 是奇函数，$\\frac{1}{1+x^2}$ 是偶函数，所以它们的乘积 $\\frac{\\sin x}{1+x^2}$ 是奇函数。
对于奇函数在对称区间上的积分为零，因此：
$$\\int_{-1}^1 \\frac{\\sin x}{1+x^2} dx = 0$$

综合上述结果：
$$\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx = \\pi + 0 = \\pi$$`,
    answer: "$\\pi$",
    difficulty: "medium",
    category: "定积分计算",
    method: "奇偶性与分部积分法"
  },



];
// 创建exerciseData结构，将ExerciseManager中的习题转换成所需格式
const exerciseData = {
  title: "定积分知识点整理",
  exercises: ExerciseManager.exercises || [],
  knowledgePoints: [
    {
      title: "定积分的概念",
      content: `
      <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
        <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>定积分定义</strong>：定积分 $\\int_a^b f(x) dx$ 表示在区间 $[a,b]$ 上对函数 $f(x)$ 进行积分。其中 $a$ 为积分下限，$b$ 为积分上限。定积分可以理解为函数曲线与坐标轴围成的面积。</li>
            <li style="margin-bottom: 10px;"><strong>几何意义</strong>：
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li style="margin-bottom: 5px;">当 $f(x) > 0$ 时，$\\int_a^b f(x) dx$ 表示曲线 $y=f(x)$ 与 $x$ 轴、$x=a$、$x=b$ 所围成的图形的面积。</li>
                <li style="margin-bottom: 5px;">当 $f(x) < 0$ 时，$\\int_a^b f(x) dx$ 为负值，表示曲线下方的面积取负。</li>
                <li style="margin-bottom: 5px;">当 $f(x)$ 有正有负时，$\\int_a^b f(x) dx$ 为正部分面积减去负部分面积的代数和。</li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;"><strong>特殊几何情况</strong>：当 $a=b$ 时，$\\int_a^b f(x) dx = 0$，表示没有面积。</li>
            <li style="margin-bottom: 10px;"><strong>单位函数的几何意义</strong>：当 $f(x)=1$ 时，$\\int_a^b 1 dx = b-a$，表示区间 $[a,b]$ 的长度。</li>
          </ul>
        </div>
      </div>
    `
    },
    {
      title: "定积分的性质",
      content: `
      <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
        <div style="border-left: 4px solid #59a14f; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>线性性质</strong>：$\\int_a^b [\\alpha f(x) + \\beta g(x)] dx = \\alpha \\int_a^b f(x) dx + \\beta \\int_a^b g(x) dx$</li>
            <li style="margin-bottom: 10px;"><strong>区间可加性</strong>：$\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx$ （$a < c < b$）</li>
            <li style="margin-bottom: 10px;"><strong>积分值与上下限有关</strong>：$\\int_a^b f(x) dx = -\\int_b^a f(x) dx$ 和 $\\int_a^a f(x) dx = 0$</li>
            <li style="margin-bottom: 10px;"><strong>奇偶函数性质</strong>：若 $f(x)$ 是定义在 $[-a,a]$ 上的函数，则：
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li style="margin-bottom: 5px;">当 $f(x)$ 为偶函数时，$\\int_{-a}^{a} f(x) dx = 2\\int_{0}^{a} f(x) dx$</li>
                <li style="margin-bottom: 5px;">当 $f(x)$ 为奇函数时，$\\int_{-a}^{a} f(x) dx = 0$</li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;"><strong>不等式性质</strong>：如果 $f(x) \\leq g(x)$，则 $\\int_a^b f(x) dx \\leq \\int_a^b g(x) dx$</li>
            <li style="margin-bottom: 10px;"><strong>广义积分性质</strong>：当积分收敛时，广义积分保持定积分的线性性、区间可加性等基本性质</li>
          </ul>
        </div>
      </div>
    `
    },
    {
      title: "定积分的计算基本方法",
      content: `
      <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
        <div style="border-left: 4px solid #f28e2c; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>牛顿-莱布尼茨公式</strong>：$\\int_a^b f(x) dx = F(b) - F(a)$，其中 $F'(x) = f(x)$</li>
            <li style="margin-bottom: 10px;"><strong>换元法简单步骤</strong>：
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li style="margin-bottom: 5px;">令$x=新变量$，同时替换积分上下限</li>
                <li style="margin-bottom: 5px;">把$dx$用新变量的微分表示</li>
                <li style="margin-bottom: 5px;"><strong>核心原则</strong>：换元必换限，无需换回原积分变量</li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;"><strong>分部积分法</strong>：$\\int_a^b u(x)v'(x) dx = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x) dx$</li>
          </ul>
        </div>
      </div>
    `
    },
    {
      title: "广义积分与计算注意事项",
      content: `
      <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
        <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>无限区间积分处理</strong>：
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li class="formula-container" style="margin-bottom: 5px;">
                  $\\int_a^{+\\infty} f(x) dx = F(+\\infty) - F(a) = \\lim\\limits_{x \\to +\\infty} F(x) - F(a)$
                </li>
                <li class="formula-container" style="margin-bottom: 5px;">
                  $\\int_{-\\infty}^b f(x) dx = F(-\\infty) - F(b) = \\lim\\limits_{x \\to -\\infty} F(x) - F(b)$
                </li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;"><strong>无界函数积分处理</strong>：
              <ul style="margin-top: 5px; padding-left: 20px;">
                <li style="margin-bottom: 5px;">当被积函数在积分区间[a,b]内某点x∈(a,b)处存在瑕点：</li>
                <li style="margin-bottom: 5px;">若瑕点在左端点a处，则处理为右极限：
                  <div class="formula-container">
                    $\\int_a^b f(x) dx = F(b) - F(a) = F(b) - \\lim\\limits_{x \\to a^+} F(x)$
                  </div>
                </li>
                <li style="margin-bottom: 5px;">若瑕点在右端点b处，则处理为左极限：
                  <div class="formula-container">
                    $\\int_a^b f(x) dx = \\lim\\limits_{x \\to b^-} F(x) - F(a)$
                  </div>
                </li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;">必须独立计算各分段极限，不能合并计算</li>
            <li style="margin-bottom: 10px;">极限运算与积分运算不可随意交换顺序</li>
          </ul>
        </div>
      </div>
    `
    },
    {
      title: "定积分的几何应用",
      content: `
      <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
        <div style="border-left: 4px solid #59a14f; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>面积计算</strong>：平面区域的面积 $S = \\int_a^b f(x) dx$ 当 $f(x) \\geq 0$ 时</li>
            <li style="margin-bottom: 10px;"><strong>体积计算</strong>：旋转体的体积 $V = \\pi \\int_a^b [f(x)]^2 dx$ (绕x轴旋转)或 $V = 2\\pi \\int_a^b x f(x) dx$ (绕y轴旋转)</li>
            <li style="margin-bottom: 10px;"><strong>弧长计算</strong>：曲线弧长 $L = \\int_a^b \\sqrt{1 + [f'(x)]^2} dx$</li>
          </ul>
        </div>
      </div>
    `
    }
  ]
};

// Export the exercise manager
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExerciseManager, exerciseData };
} else if (typeof window !== 'undefined') {
  window.ExerciseManager = ExerciseManager;
  window.exerciseData = exerciseData;
}

