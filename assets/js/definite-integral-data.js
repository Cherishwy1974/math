window.exerciseData = {
  // 知识点
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

window.exerciseData.exercises = [
  {
    id: 1,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 (2x+3) dx$",
    explanation: `<strong>第一步：计算不定积分</strong>

将原积分拆分为两项：
$$\\int (2x+3) dx = \\int 2x dx + \\int 3 dx$$

根据积分的线性性质，提出常数：
$$= 2\\int x dx + 3\\int dx$$

应用幂函数和常数积分公式：
$$= 2 \\cdot \\frac{x^2}{2} + 3x + C$$

化简得到原函数：
$$= x^2 + 3x + C$$

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^1 (2x+3) dx = [x^2 + 3x]_0^1$$

代入上限 $x=1$：
$$F(1) = 1^2 + 3 \\cdot 1 = 1 + 3 = 4$$

代入下限 $x=0$：
$$F(0) = 0^2 + 3 \\cdot 0 = 0$$

<strong>第三步：计算最终结果</strong>

$$\\int_0^1 (2x+3) dx = F(1) - F(0) = 4 - 0 = 4$$`,
    answer: "4",
    difficulty: "easy",
    category: "定积分计算",
    method: "牛顿-莱布尼茨公式"
  },
  {
    id: 2,
    type: "计算题",
    title: "基本定积分计算",
    question: "设 $f(x) = \\begin{cases} x, & 0 \\leq x < 1 \\\\ 2-x, & 1 \\leq x \\leq 2 \\end{cases}$，求 $\\int_0^2 f(x) dx$",
    explanation: `<strong>第一步：识别分段函数</strong>

$f(x)$ 在 $x=1$ 处分段，需要分区间计算

<strong>第二步：应用区间可加性</strong>

根据定积分的区间可加性：
$$\\int_0^2 f(x) dx = \\int_0^1 f(x) dx + \\int_1^2 f(x) dx$$

<strong>第三步：计算第一部分 $[0,1]$</strong>

当 $0 \\leq x < 1$ 时，$f(x) = x$

$$\\int_0^1 x dx = \\left[\\frac{x^2}{2}\\right]_0^1$$

$$= \\frac{1^2}{2} - \\frac{0^2}{2} = \\frac{1}{2}$$

<strong>第四步：计算第二部分 $[1,2]$</strong>

当 $1 \\leq x \\leq 2$ 时，$f(x) = 2-x$

$$\\int_1^2 (2-x) dx = \\int_1^2 2 dx - \\int_1^2 x dx$$

$$= 2[x]_1^2 - \\left[\\frac{x^2}{2}\\right]_1^2$$

$$= 2(2-1) - \\left(\\frac{4}{2} - \\frac{1}{2}\\right)$$

$$= 2 - \\frac{3}{2} = \\frac{1}{2}$$

<strong>第五步：合并结果</strong>

$$\\int_0^2 f(x) dx = \\frac{1}{2} + \\frac{1}{2} = 1$$`,
    answer: "1",
    difficulty: "medium",
    category: "定积分计算",
    method: "区间可加性"
  },
  {
    id: 3,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-\\pi}^{\\pi} \\sin x dx$",
    explanation: `<strong>方法一：利用奇函数性质</strong>

<strong>第一步：判断函数奇偶性</strong>

令 $f(x) = \\sin x$，验证 $f(-x)$：
$$f(-x) = \\sin(-x) = -\\sin x = -f(x)$$

因此 $\\sin x$ 是奇函数

<strong>第二步：应用奇函数对称性质</strong>

对于奇函数在对称区间上的积分：
$$\\int_{-a}^{a} f(x) dx = 0$$

<strong>第三步：得出结论</strong>

$$\\int_{-\\pi}^{\\pi} \\sin x dx = 0$$

<strong>几何解释：</strong>
$\\sin x$ 在 $[-\\pi,0]$ 的面积与在 $[0,\\pi]$ 的面积大小相等但符号相反，相互抵消

<strong>方法二：直接计算验证</strong>

$$\\int_{-\\pi}^{\\pi} \\sin x dx = [-\\cos x]_{-\\pi}^{\\pi}$$

$$= -\\cos(\\pi) - (-\\cos(-\\pi))$$

$$= -(-1) - (-(-1)) = 1 - 1 = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性对称性"
  },
  {
    id: 4,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\frac{d}{dx}\\int_{a}^{b} f(x)dx$",
    explanation: `<strong>第一步：理解题意</strong>

要求对 $x$ 求导的是一个定积分

<strong>第二步：分析积分限</strong>

积分上限是常数 $b$
积分下限是常数 $a$
积分变量是 $x$（但与求导变量同名）

<strong>第三步：关键认识</strong>

当积分限都是常数时，定积分的结果是一个常数
与求导变量 $x$ 无关

<strong>第四步：应用导数性质</strong>

常数的导数为 $0$

$$\\frac{d}{dx}\\int_{a}^{b} f(x)dx = \\frac{d}{dx}(\\text{常数}) = 0$$

<strong>注意：</strong>这与变上限积分 $\\frac{d}{dx}\\int_{a}^{x} f(t)dt = f(x)$ 有本质区别`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "定积分导数"
  },
  {
    id: 5,
    type: "计算题",
    title: "定积分定义与性质",
    question: "设 $F(x) = \\int_{0}^{2} \\frac{t}{\\sqrt{1+t^2}} dt$，求 $F'(x)$",
    explanation: `<strong>第一步：分析函数 $F(x)$</strong>

观察积分表达式：
- 被积函数：$\\frac{t}{\\sqrt{1+t^2}}$
- 积分变量：$t$
- 积分上限：常数 $2$
- 积分下限：常数 $0$

<strong>第二步：关键认识</strong>

$F(x)$ 中没有出现变量 $x$
积分上下限都是常数
积分结果是一个确定的数值

<strong>第三步：得出结论</strong>

$F(x)$ 实际上是一个常数函数

<strong>第四步：求导</strong>

常数的导数为 $0$

$$F'(x) = \\frac{d}{dx}(\\text{常数}) = 0$$

<strong>注意：</strong>
如果题目是 $F(x) = \\int_{0}^{x} \\frac{t}{\\sqrt{1+t^2}} dt$
那么 $F'(x) = \\frac{x}{\\sqrt{1+x^2}}$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "微积分基本定理"
  },
  {
    id: 6,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-1}^{1} x^3 dx$",
    explanation: `<strong>方法一：利用奇函数性质（推荐）</strong>

<strong>第一步：判断函数奇偶性</strong>

设 $f(x) = x^3$，计算 $f(-x)$：
$$f(-x) = (-x)^3 = -x^3 = -f(x)$$

所以 $x^3$ 是奇函数

<strong>第二步：应用奇函数性质</strong>

奇函数在对称区间上的积分为零：
$$\\int_{-a}^{a} f(x)dx = 0$$

<strong>第三步：得出结论</strong>

$$\\int_{-1}^{1} x^3 dx = 0$$

<strong>方法二：直接计算验证</strong>

$$\\int_{-1}^{1} x^3 dx = \\left[\\frac{x^4}{4}\\right]_{-1}^{1}$$

$$= \\frac{1^4}{4} - \\frac{(-1)^4}{4}$$

$$= \\frac{1}{4} - \\frac{1}{4} = 0$$`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 7,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}} \\frac{x^3}{1+\\cos x}dx$",
    explanation: `<strong>第一步：判断被积函数的奇偶性</strong>

设 $f(x) = \\frac{x^3}{1+\\cos x}$

<strong>第二步：验证 $f(-x)$</strong>

计算 $f(-x)$：
- 分子：$(-x)^3 = -x^3$
- 分母：$1 + \\cos(-x) = 1 + \\cos x$（余弦是偶函数）

因此：
$$f(-x) = \\frac{-x^3}{1+\\cos x} = -\\frac{x^3}{1+\\cos x} = -f(x)$$

<strong>第三步：确认积分区间</strong>

积分区间 $\\left[-\\frac{\\pi}{4}, \\frac{\\pi}{4}\\right]$ 关于原点对称

<strong>第四步：应用奇函数性质</strong>

奇函数在对称区间上的积分为零：
$$\\int_{-\\frac{\\pi}{4}}^{\\frac{\\pi}{4}} \\frac{x^3}{1+\\cos x}dx = 0$$

<strong>几何意义：</strong>
函数图像关于原点对称，正负面积相互抵消`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 8,
    type: "计算题",
    title: "广义积分",
    question: "求广义积分 $\\int_0^{+\\infty} x e^{x} dx$",
    explanation: `<strong>第一步：计算不定积分</strong>

使用分部积分法：
设 $u = x$，$dv = e^x dx$
则 $du = dx$，$v = e^x$

$$\\int x e^x dx = xe^x - \\int e^x dx$$

$$= xe^x - e^x + C = e^x(x-1) + C$$

<strong>第二步：应用广义积分定义</strong>

$$\\int_0^{+\\infty} x e^x dx = \\lim\\limits_{b \\to +\\infty} \\int_0^b x e^x dx$$

$$= \\lim\\limits_{b \\to +\\infty} [e^x(x-1)]_0^b$$

<strong>第三步：计算极限</strong>

代入上限：
$$\\lim\\limits_{b \\to +\\infty} e^b(b-1) = \\lim\\limits_{b \\to +\\infty} be^b - \\lim\\limits_{b \\to +\\infty} e^b$$

当 $b \\to +\\infty$ 时，$be^b \\to +\\infty$，$e^b \\to +\\infty$

代入下限：
$$e^0(0-1) = 1 \\cdot (-1) = -1$$

<strong>第四步：判断收敛性</strong>

因为 $\\lim\\limits_{b \\to +\\infty} e^b(b-1) = +\\infty$

所以广义积分 $\\int_0^{+\\infty} x e^x dx$ 发散`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "分部积分法"
  },
  {
    id: 9,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 (3x^2+2) dx$",
    explanation: `<strong>第一步：拆分积分</strong>

根据积分的线性性质：
$$\\int_0^1(3x^2+2) dx = \\int_0^1 3x^2 dx + \\int_0^1 2 dx$$

<strong>第二步：提出常数因子</strong>

$$= 3\\int_0^1 x^2 dx + 2\\int_0^1 dx$$

<strong>第三步：计算原函数</strong>

应用幂函数积分公式：
$$= 3 \\cdot \\left[\\frac{x^3}{3}\\right]_0^1 + 2[x]_0^1$$

<strong>第四步：代入上下限</strong>

代入上限 $x=1$：
$$3 \\cdot \\frac{1^3}{3} + 2 \\cdot 1 = 1 + 2 = 3$$

代入下限 $x=0$：
$$3 \\cdot \\frac{0^3}{3} + 2 \\cdot 0 = 0 + 0 = 0$$

<strong>第五步：计算最终结果</strong>

$$\\int_0^1 (3x^2+2) dx = 3 - 0 = 3$$`,
    answer: "$3$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 10,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^2 (5x^4-3x^2+2x-7) dx$",
    explanation: `<strong>第一步：应用积分的线性性质</strong>

$$\\int_0^2(5x^4-3x^2+2x-7) dx = \\int_0^2 5x^4 dx - \\int_0^2 3x^2 dx + \\int_0^2 2x dx - \\int_0^2 7 dx$$

<strong>第二步：提出常数因子</strong>

$$= 5\\int_0^2 x^4 dx - 3\\int_0^2 x^2 dx + 2\\int_0^2 x dx - 7\\int_0^2 dx$$

<strong>第三步：计算各项原函数</strong>

$$= 5 \\cdot \\left[\\frac{x^5}{5}\\right]_0^2 - 3 \\cdot \\left[\\frac{x^3}{3}\\right]_0^2 + 2 \\cdot \\left[\\frac{x^2}{2}\\right]_0^2 - 7[x]_0^2$$

$$= [x^5]_0^2 - [x^3]_0^2 + [x^2]_0^2 - 7[x]_0^2$$

<strong>第四步：代入上下限计算</strong>

代入上限 $x=2$：
$$2^5 - 2^3 + 2^2 - 7 \\cdot 2 = 32 - 8 + 4 - 14 = 14$$

代入下限 $x=0$：
$$0^5 - 0^3 + 0^2 - 7 \\cdot 0 = 0$$

<strong>第五步：得出最终结果</strong>

$$\\int_0^2 (5x^4-3x^2+2x-7) dx = 14 - 0 = 14$$`,
    answer: "$14$",
    difficulty: "medium",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 11,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^1 x\\ln x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^1 x\\ln x dx$，我们需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $x dx$ 凑成微分形式：
$$x dx = d\\left(\\frac{x^2}{2}\\right)$$

验证：$d\\left(\\frac{x^2}{2}\\right) = \\frac{2x}{2} dx = x dx$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^1 x\\ln x dx = \\int_0^1 \\ln x \\cdot d\\left(\\frac{x^2}{2}\\right)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_0^1 \\ln x \\cdot d\\left(\\frac{x^2}{2}\\right) = \\left[\\ln x \\cdot \\frac{x^2}{2}\\right]_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot d(\\ln x)$$

<strong>第五步：计算 $d(\\ln x)$</strong>

$$d(\\ln x) = \\frac{1}{x} dx$$

<strong>第六步：代入并化简</strong>

$$= \\left[\\frac{x^2}{2} \\ln x\\right]_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot \\frac{1}{x} dx$$

$$= \\left[\\frac{x^2}{2} \\ln x\\right]_0^1 - \\int_0^1 \\frac{x}{2} dx$$

$$= \\left[\\frac{x^2}{2} \\ln x\\right]_0^1 - \\frac{1}{2}\\int_0^1 x dx$$

<strong>第七步：计算剩余积分</strong>

$$= \\left[\\frac{x^2}{2} \\ln x\\right]_0^1 - \\frac{1}{2} \\left[\\frac{x^2}{2}\\right]_0^1$$

$$= \\left[\\frac{x^2}{2} \\ln x\\right]_0^1 - \\frac{1}{4}[x^2]_0^1$$

<strong>第八步：处理边界值</strong>

代入上限 $x=1$：
$$\\frac{1^2}{2} \\ln 1 - \\frac{1}{4} \\cdot 1^2 = 0 - \\frac{1}{4} = -\\frac{1}{4}$$

代入下限 $x=0$：
注意 $\\lim\\limits_{x \\to 0^+} x^2 \\ln x = 0$（可用洛必达法则证明）

<strong>第九步：得出最终结果</strong>

$$\\int_0^1 x\\ln x dx = -\\frac{1}{4} - 0 = -\\frac{1}{4}$$`,
    answer: "$-\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 12,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^{\\pi/2} \\sin^2 x dx$",
    explanation: `<strong>第一步：使用二倍角公式</strong>

利用恒等式：$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$

$$\\int_0^{\\pi/2} \\sin^2 x dx = \\int_0^{\\pi/2} \\frac{1 - \\cos 2x}{2} dx$$

<strong>第二步：拆分积分</strong>

$$= \\frac{1}{2} \\int_0^{\\pi/2} (1 - \\cos 2x) dx$$

$$= \\frac{1}{2} \\left( \\int_0^{\\pi/2} 1 dx - \\int_0^{\\pi/2} \\cos 2x dx \\right)$$

<strong>第三步：计算第一项</strong>

$$\\int_0^{\\pi/2} 1 dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2} - 0 = \\frac{\\pi}{2}$$

<strong>第四步：计算第二项（凑微分法）</strong>

发现复合函数：$\\cos(2x)$，内层函数是 $2x$

调整微分：$d(2x) = 2dx \\Rightarrow dx = \\frac{1}{2}d(2x)$

$$\\int_0^{\\pi/2} \\cos 2x dx = \\frac{1}{2} \\int_0^{\\pi/2} \\cos 2x \\cdot d(2x)$$

$$= \\frac{1}{2} [\\sin 2x]_0^{\\pi/2} = \\frac{1}{2}(\\sin \\pi - \\sin 0) = 0$$

<strong>第五步：合并结果</strong>

$$\\int_0^{\\pi/2} \\sin^2 x dx = \\frac{1}{2} \\left( \\frac{\\pi}{2} - 0 \\right) = \\frac{\\pi}{4}$$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 13,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^1 e^{3x} dx$",
    explanation: `<strong>第一步：识别复合函数</strong>

发现复合函数：$e^{3x}$，内层函数是 $3x$

<strong>第二步：凑微分</strong>

强行改写：$\\int_0^1 e^{3x} dx \\rightarrow \\int_0^1 e^{3x} d(3x)$

<strong>第三步：调整系数</strong>

因为 $d(3x) = 3dx$，所以 $dx = \\frac{1}{3}d(3x)$

$$\\int_0^1 e^{3x} dx = \\int_0^1 e^{3x} \\cdot \\frac{1}{3} d(3x)$$

$$= \\frac{1}{3} \\int_0^1 e^{3x} d(3x)$$

<strong>第四步：套用基本积分公式</strong>

$$\\int e^u du = e^u + C$$

$$\\frac{1}{3} \\int_0^1 e^{3x} d(3x) = \\frac{1}{3}[e^{3x}]_0^1$$

<strong>第五步：代入上下限</strong>

$$= \\frac{1}{3}(e^3 - e^0) = \\frac{1}{3}(e^3 - 1)$$`,
    answer: "$\\frac{1}{3}(e^3 - 1)$",
    difficulty: "medium",
    category: "定积分计算",
    method: "第一类换元积分法"
  },
  {
    id: 14,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^1 x^2e^x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^1 x^2e^x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $e^x dx$ 凑成微分形式：
$$e^x dx = d(e^x)$$

验证：$d(e^x) = e^x dx$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^1 x^2e^x dx = \\int_0^1 x^2 \\cdot d(e^x)$$

<strong>第四步：第一次应用分部积分公式</strong>

$$\\int_0^1 x^2 \\cdot d(e^x) = [x^2 \\cdot e^x]_0^1 - \\int_0^1 e^x \\cdot d(x^2)$$

<strong>第五步：计算 $d(x^2)$</strong>

$$d(x^2) = 2x dx$$

<strong>第六步：代入并化简</strong>

$$= [x^2e^x]_0^1 - \\int_0^1 e^x \\cdot 2x dx$$

$$= [x^2e^x]_0^1 - 2\\int_0^1 xe^x dx$$

<strong>第七步：第二次分部积分</strong>

对 $\\int_0^1 xe^x dx$，同样凑微分：
$$\\int_0^1 xe^x dx = \\int_0^1 x \\cdot d(e^x)$$

$$= [xe^x]_0^1 - \\int_0^1 e^x \\cdot d(x)$$

$$= [xe^x]_0^1 - \\int_0^1 e^x dx$$

<strong>第八步：计算 $d(x) = dx$，继续计算</strong>

$$= [xe^x]_0^1 - [e^x]_0^1$$

$$= (e - 0) - (e - 1) = e - e + 1 = 1$$

<strong>第九步：代回原式</strong>

$$\\int_0^1 x^2e^x dx = [x^2e^x]_0^1 - 2 \\cdot 1$$

$$= (1^2 \\cdot e - 0^2 \\cdot 1) - 2 = e - 2$$`,
    answer: "$e - 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 15,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^4 \\sqrt{x} dx$",
    explanation: `<strong>第一步：转换为幂函数</strong>

$$\\sqrt{x} = x^{1/2}$$

<strong>第二步：应用幂函数积分公式</strong>

$$\\int x^{1/2} dx = \\frac{x^{1/2+1}}{1/2+1} + C = \\frac{x^{3/2}}{3/2} + C$$

<strong>第三步：化简原函数</strong>

$$= \\frac{2}{3}x^{3/2} + C$$

<strong>第四步：计算定积分</strong>

$$\\int_0^4 \\sqrt{x} dx = \\left[\\frac{2}{3}x^{3/2}\\right]_0^4$$

<strong>第五步：代入上下限</strong>

代入上限 $x=4$：
$$\\frac{2}{3} \\cdot 4^{3/2} = \\frac{2}{3} \\cdot 8 = \\frac{16}{3}$$

代入下限 $x=0$：
$$\\frac{2}{3} \\cdot 0^{3/2} = 0$$

<strong>第六步：得出结果</strong>

$$\\int_0^4 \\sqrt{x} dx = \\frac{16}{3} - 0 = \\frac{16}{3}$$`,
    answer: "$\\frac{16}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 16,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^\\pi \\sin x dx$",
    explanation: `<strong>第一步：回忆基本积分公式</strong>

$$\\int \\sin x dx = -\\cos x + C$$

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^\\pi \\sin x dx = [-\\cos x]_0^\\pi$$

<strong>第三步：代入上限</strong>

$$-\\cos \\pi = -(-1) = 1$$

<strong>第四步：代入下限</strong>

$$-\\cos 0 = -1$$

<strong>第五步：计算最终结果</strong>

$$\\int_0^\\pi \\sin x dx = 1 - (-1) = 2$$`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 17,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-1}^1 x^3 dx$",
    explanation: `<strong>方法一：利用奇函数性质（推荐）</strong>

<strong>第一步：判断奇偶性</strong>

$f(x) = x^3$，则 $f(-x) = (-x)^3 = -x^3 = -f(x)$

所以 $x^3$ 是奇函数

<strong>第二步：应用奇函数性质</strong>

积分区间 $[-1,1]$ 关于原点对称

奇函数在对称区间上的积分为零

<strong>第三步：得出结论</strong>

$$\\int_{-1}^{1} x^3 dx = 0$$

<strong>方法二：直接计算验证</strong>

$$\\int_{-1}^{1} x^3 dx = \\left[\\frac{x^4}{4}\\right]_{-1}^{1}$$

$$= \\frac{1^4}{4} - \\frac{(-1)^4}{4}$$

$$= \\frac{1}{4} - \\frac{1}{4} = 0$$`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分计算",
    method: "对称性质应用"
  },
  {
    id: 18,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^{\\pi/4} \\tan^2 x dx$",
    explanation: `<strong>第一步：利用三角恒等式</strong>

使用恒等式：$\\tan^2 x = \\sec^2 x - 1$

$$\\int_0^{\\pi/4} \\tan^2 x dx = \\int_0^{\\pi/4}(\\sec^2 x - 1) dx$$

<strong>第二步：拆分积分</strong>

$$= \\int_0^{\\pi/4} \\sec^2 x dx - \\int_0^{\\pi/4} 1 dx$$

<strong>第三步：计算第一项</strong>

基本积分公式：$\\int \\sec^2 x dx = \\tan x + C$

$$\\int_0^{\\pi/4} \\sec^2 x dx = [\\tan x]_0^{\\pi/4} = \\tan \\frac{\\pi}{4} - \\tan 0 = 1 - 0 = 1$$

<strong>第四步：计算第二项</strong>

$$\\int_0^{\\pi/4} 1 dx = [x]_0^{\\pi/4} = \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}$$

<strong>第五步：合并结果</strong>

$$\\int_0^{\\pi/4} \\tan^2 x dx = 1 - \\frac{\\pi}{4}$$`,
    answer: "$1 - \\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 19,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_1^2 \\frac{x^2}{1+x^2} dx$",
    explanation: `<strong>第一步：巧妙变形分子</strong>

将分子 $x^2$ 写成 $(1+x^2)-1$：
$$\\frac{x^2}{1+x^2} = \\frac{(1+x^2)-1}{1+x^2}$$

<strong>第二步：分项</strong>

$$= \\frac{1+x^2}{1+x^2} - \\frac{1}{1+x^2}$$

$$= 1 - \\frac{1}{1+x^2}$$

<strong>第三步：积分化为两项</strong>

$$\\int_1^2 \\frac{x^2}{1+x^2} dx = \\int_1^2 1 dx - \\int_1^2 \\frac{1}{1+x^2}dx$$

<strong>第四步：计算各项</strong>

第一项：$\\int_1^2 1 dx = [x]_1^2 = 2 - 1 = 1$

第二项：$\\int_1^2 \\frac{1}{1+x^2}dx = [\\arctan x]_1^2 = \\arctan 2 - \\arctan 1 = \\arctan 2 - \\frac{\\pi}{4}$

<strong>第五步：合并结果</strong>

$$\\int_1^2 \\frac{x^2}{1+x^2} dx = 1 - \\arctan 2 + \\frac{\\pi}{4}$$`,
    answer: "$1 - \\arctan 2 + \\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分项积分法"
  },
  {
    id: 20,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^{\\pi/2} x\\cos x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\pi/2} x\\cos x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $\\cos x dx$ 凑成微分形式：
$$\\cos x dx = d(\\sin x)$$

验证：$d(\\sin x) = \\cos x dx$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x \\cdot d(\\sin x)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_0^{\\pi/2} x \\cdot d(\\sin x) = [x \\cdot \\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x \\cdot d(x)$$

<strong>第五步：计算 $d(x)$</strong>

$$d(x) = dx$$

<strong>第六步：代入并化简</strong>

$$= [x \\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x dx$$

<strong>第七步：计算边界项</strong>

$$[x \\sin x]_0^{\\pi/2} = \\frac{\\pi}{2} \\cdot \\sin\\frac{\\pi}{2} - 0 \\cdot \\sin 0 = \\frac{\\pi}{2} \\cdot 1 = \\frac{\\pi}{2}$$

<strong>第八步：计算剩余积分</strong>

$$\\int_0^{\\pi/2} \\sin x dx = [-\\cos x]_0^{\\pi/2} = -\\cos\\frac{\\pi}{2} + \\cos 0 = 0 + 1 = 1$$

<strong>第九步：合并最终结果</strong>

$$\\int_0^{\\pi/2} x\\cos x dx = \\frac{\\pi}{2} - 1$$`,
    answer: "$\\frac{\\pi}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 21,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 \\frac{1}{1+x^2} dx$",
    explanation: `<strong>第一步：识别基本积分公式</strong>

回忆基本积分公式：
$$\\int \\frac{1}{1+x^2} dx = \\arctan x + C$$

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^1 \\frac{1}{1+x^2} dx = [\\arctan x]_0^1$$

<strong>第三步：代入上限</strong>

$$\\arctan 1 = \\frac{\\pi}{4}$$

<strong>第四步：代入下限</strong>

$$\\arctan 0 = 0$$

<strong>第五步：计算最终结果</strong>

$$\\int_0^1 \\frac{1}{1+x^2} dx = \\frac{\\pi}{4} - 0 = \\frac{\\pi}{4}$$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "基本积分公式应用"
  },
  {
    id: 22,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^{\\pi} \\sin x dx$",
    explanation: `<strong>第一步：回忆基本积分公式</strong>

$$\\int \\sin x dx = -\\cos x + C$$

<strong>第二步：应用定积分计算</strong>

$$\\int_0^{\\pi} \\sin x dx = [-\\cos x]_0^{\\pi}$$

<strong>第三步：代入上限</strong>

$$-\\cos \\pi = -(-1) = 1$$

<strong>第四步：代入下限</strong>

$$-\\cos 0 = -1$$

<strong>第五步：计算最终结果</strong>

$$\\int_0^{\\pi} \\sin x dx = 1 - (-1) = 2$$`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 23,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^2 x^2 dx$",
    explanation: `<strong>第一步：应用幂函数积分公式</strong>

$$\\int x^2 dx = \\frac{x^3}{3} + C$$

<strong>第二步：计算定积分</strong>

$$\\int_0^2 x^2 dx = \\left[\\frac{x^3}{3}\\right]_0^2$$

<strong>第三步：代入上限</strong>

$$\\frac{2^3}{3} = \\frac{8}{3}$$

<strong>第四步：代入下限</strong>

$$\\frac{0^3}{3} = 0$$

<strong>第五步：得出结果</strong>

$$\\int_0^2 x^2 dx = \\frac{8}{3} - 0 = \\frac{8}{3}$$`,
    answer: "$\\frac{8}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分的几何意义"
  },
  {
    id: 24,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^1 \\frac{2x}{(1+x^2)^2} dx$",
    explanation: `<strong>第一步：识别复合函数</strong>

发现分母中的复合函数：$(1+x^2)^2$
内层函数是 $1+x^2$

<strong>第二步：凑微分</strong>

注意到 $d(1+x^2) = 2x dx$
恰好分子是 $2x$

<strong>第三步：改写积分</strong>

$$\\int_0^1 \\frac{2x}{(1+x^2)^2} dx = \\int_0^1 \\frac{1}{(1+x^2)^2} d(1+x^2)$$

<strong>第四步：套用幂函数积分公式</strong>

令 $u = 1+x^2$，则
$$\\int \\frac{1}{u^2} du = -\\frac{1}{u} + C$$

<strong>第五步：计算定积分</strong>

$$\\int_0^1 \\frac{1}{(1+x^2)^2} d(1+x^2) = \\left[-\\frac{1}{1+x^2}\\right]_0^1$$

$$= -\\frac{1}{1+1} - \\left(-\\frac{1}{1+0}\\right)$$

$$= -\\frac{1}{2} + 1 = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "第一类换元积分法"
  },
  {
    id: 25,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_1^e \\ln x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_1^e \\ln x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $dx$ 凑成微分形式：
$$dx = d(x)$$

<strong>第三步：改写积分</strong>

$$\\int_1^e \\ln x dx = \\int_1^e \\ln x \\cdot d(x)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_1^e \\ln x \\cdot d(x) = [\\ln x \\cdot x]_1^e - \\int_1^e x \\cdot d(\\ln x)$$

<strong>第五步：计算 $d(\\ln x)$</strong>

$$d(\\ln x) = \\frac{1}{x} dx$$

<strong>第六步：代入并化简</strong>

$$= [x\\ln x]_1^e - \\int_1^e x \\cdot \\frac{1}{x} dx$$

$$= [x\\ln x]_1^e - \\int_1^e 1 dx$$

$$= [x\\ln x]_1^e - [x]_1^e$$

<strong>第七步：计算边界值</strong>

第一项：
$$[x\\ln x]_1^e = e\\ln e - 1\\ln 1 = e \\cdot 1 - 1 \\cdot 0 = e$$

第二项：
$$[x]_1^e = e - 1$$

<strong>第八步：合并结果</strong>

$$\\int_1^e \\ln x dx = e - (e - 1) = e - e + 1 = 1$$`,
    answer: "$1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 26,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-\\pi}^{\\pi} \\cos x dx$",
    explanation: `<strong>方法一：利用偶函数性质</strong>

<strong>第一步：判断奇偶性</strong>

$\\cos(-x) = \\cos x$，所以 $\\cos x$ 是偶函数

<strong>第二步：应用偶函数性质</strong>

对于偶函数：$\\int_{-a}^{a} f(x) dx = 2\\int_0^{a} f(x) dx$

$$\\int_{-\\pi}^{\\pi} \\cos x dx = 2\\int_0^{\\pi} \\cos x dx$$

<strong>第三步：计算右侧积分</strong>

$$\\int_0^{\\pi} \\cos x dx = [\\sin x]_0^{\\pi} = \\sin \\pi - \\sin 0 = 0 - 0 = 0$$

<strong>第四步：得出结论</strong>

$$\\int_{-\\pi}^{\\pi} \\cos x dx = 2 \\cdot 0 = 0$$

<strong>方法二：直接计算</strong>

$$\\int_{-\\pi}^{\\pi} \\cos x dx = [\\sin x]_{-\\pi}^{\\pi} = \\sin \\pi - \\sin(-\\pi) = 0 - 0 = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分计算",
    method: "对称性质应用"
  },
  {
    id: 27,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^{\\pi/2} e^x\\sin x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\pi/2} e^x\\sin x dx$，需要将其中一部分凑成微分形式

<strong>第二步：第一次凑微分</strong>

将 $e^x dx$ 凑成微分形式：
$$e^x dx = d(e^x)$$

<strong>第三步：第一次改写积分</strong>

$$\\int_0^{\\pi/2} e^x\\sin x dx = \\int_0^{\\pi/2} \\sin x \\cdot d(e^x)$$

<strong>第四步：第一次应用分部积分公式</strong>

$$\\int_0^{\\pi/2} \\sin x \\cdot d(e^x) = [\\sin x \\cdot e^x]_0^{\\pi/2} - \\int_0^{\\pi/2} e^x \\cdot d(\\sin x)$$

<strong>第五步：计算 $d(\\sin x)$</strong>

$$d(\\sin x) = \\cos x dx$$

<strong>第六步：代入得</strong>

$$= [e^x\\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} e^x\\cos x dx$$

边界项：$[e^x\\sin x]_0^{\\pi/2} = e^{\\pi/2} \\cdot 1 - e^0 \\cdot 0 = e^{\\pi/2}$

<strong>第七步：第二次分部积分</strong>

对 $\\int_0^{\\pi/2} e^x\\cos x dx$，同样凑微分：
$$\\int_0^{\\pi/2} e^x\\cos x dx = \\int_0^{\\pi/2} \\cos x \\cdot d(e^x)$$

$$= [\\cos x \\cdot e^x]_0^{\\pi/2} - \\int_0^{\\pi/2} e^x \\cdot d(\\cos x)$$

<strong>第八步：计算 $d(\\cos x) = -\\sin x dx$</strong>

$$= [e^x\\cos x]_0^{\\pi/2} + \\int_0^{\\pi/2} e^x\\sin x dx$$

边界项：$[e^x\\cos x]_0^{\\pi/2} = e^{\\pi/2} \\cdot 0 - e^0 \\cdot 1 = -1$

<strong>第九步：建立方程求解</strong>

设 $I = \\int_0^{\\pi/2} e^x\\sin x dx$，则：
$$I = e^{\\pi/2} - (-1 + I)$$
$$I = e^{\\pi/2} + 1 - I$$
$$2I = e^{\\pi/2} + 1$$
$$I = \\frac{e^{\\pi/2} + 1}{2}$$`,
    answer: "$\\frac{1 + e^{\\pi/2}}{2}$",
    difficulty: "hard",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 28,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^3 (2x+1) dx$",
    explanation: `<strong>第一步：拆分积分</strong>

$$\\int_0^3 (2x+1) dx = \\int_0^3 2x dx + \\int_0^3 1 dx$$

<strong>第二步：提出常数</strong>

$$= 2\\int_0^3 x dx + \\int_0^3 dx$$

<strong>第三步：计算原函数</strong>

$$= 2 \\cdot \\left[\\frac{x^2}{2}\\right]_0^3 + [x]_0^3$$

$$= [x^2]_0^3 + [x]_0^3$$

<strong>第四步：代入上下限</strong>

$$= (3^2 - 0^2) + (3 - 0)$$

$$= 9 + 3$$

<strong>第五步：得出结果</strong>

$$\\int_0^3 (2x+1) dx = 12$$`,
    answer: "$12$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 29,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_1^3 x^2 dx$",
    explanation: `<strong>第一步：应用幂函数积分公式</strong>

$$\\int x^2 dx = \\frac{x^3}{3} + C$$

<strong>第二步：计算定积分</strong>

$$\\int_1^3 x^2 dx = \\left[\\frac{x^3}{3}\\right]_1^3$$

<strong>第三步：代入上限</strong>

$$\\frac{3^3}{3} = \\frac{27}{3} = 9$$

<strong>第四步：代入下限</strong>

$$\\frac{1^3}{3} = \\frac{1}{3}$$

<strong>第五步：计算结果</strong>

$$\\int_1^3 x^2 dx = 9 - \\frac{1}{3} = \\frac{27-1}{3} = \\frac{26}{3}$$`,
    answer: "$\\frac{26}{3}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 30,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = x^2$ 与 $x$ 轴以及直线 $x = 1$ 和 $x = 2$ 所围成的平面图形的面积",
    explanation: `<strong>第一步：确定积分区间</strong>

区间为 $[1, 2]$

<strong>第二步：确定被积函数</strong>

在区间 $[1, 2]$ 上，$y = x^2 > 0$

<strong>第三步：建立面积积分</strong>

$$A = \\int_1^2 x^2 dx$$

<strong>第四步：计算积分</strong>

$$A = \\left[\\frac{x^3}{3}\\right]_1^2$$

$$= \\frac{2^3}{3} - \\frac{1^3}{3}$$

$$= \\frac{8}{3} - \\frac{1}{3}$$

<strong>第五步：得出面积</strong>

$$A = \\frac{7}{3} \\text{ 平方单位}$$`,
    answer: "$\\frac{7}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 31,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = 4-x^2$ 与 $x$ 轴所围成的平面图形的面积",
    explanation: `<strong>第一步：求曲线与 $x$ 轴的交点</strong>

令 $y = 0$：$4 - x^2 = 0$
解得：$x^2 = 4$，即 $x = \\pm 2$

<strong>第二步：确定积分区间</strong>

曲线与 $x$ 轴的交点为 $(-2, 0)$ 和 $(2, 0)$
积分区间为 $[-2, 2]$

<strong>第三步：确定被积函数符号</strong>

在区间 $[-2, 2]$ 内，$y = 4 - x^2 > 0$

<strong>第四步：计算面积积分</strong>

$$A = \\int_{-2}^2 (4-x^2) dx$$

$$= \\int_{-2}^2 4 dx - \\int_{-2}^2 x^2 dx$$

$$= [4x]_{-2}^2 - \\left[\\frac{x^3}{3}\\right]_{-2}^2$$

<strong>第五步：代入计算</strong>

第一项：$4(2) - 4(-2) = 8 + 8 = 16$

第二项：$\\frac{2^3}{3} - \\frac{(-2)^3}{3} = \\frac{8}{3} - \\frac{-8}{3} = \\frac{16}{3}$

<strong>第六步：得出面积</strong>

$$A = 16 - \\frac{16}{3} = \\frac{48-16}{3} = \\frac{32}{3} \\text{ 平方单位}$$`,
    answer: "$\\frac{32}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 32,
    type: "计算题",
    title: "定积分应用",
    question: "求抛物线 $y = x^2$ 与直线 $y = 4x$ 所围成的平面图形的面积",
    explanation: `<strong>第一步：求两曲线的交点</strong>

令 $x^2 = 4x$
$x^2 - 4x = 0$
$x(x - 4) = 0$
解得：$x = 0$ 或 $x = 4$

<strong>第二步：确定上下曲线</strong>

在区间 $[0, 4]$ 内，比较两函数大小：
- 当 $x = 2$ 时：$y_1 = 2^2 = 4$，$y_2 = 4 \\cdot 2 = 8$
- 所以直线在上，抛物线在下

<strong>第三步：建立面积积分</strong>

$$A = \\int_0^4 (4x - x^2) dx$$

<strong>第四步：计算积分</strong>

$$= \\int_0^4 4x dx - \\int_0^4 x^2 dx$$

$$= 4 \\cdot \\left[\\frac{x^2}{2}\\right]_0^4 - \\left[\\frac{x^3}{3}\\right]_0^4$$

$$= 2[x^2]_0^4 - \\frac{1}{3}[x^3]_0^4$$

<strong>第五步：代入计算</strong>

$$= 2(16 - 0) - \\frac{1}{3}(64 - 0)$$

$$= 32 - \\frac{64}{3}$$

$$= \\frac{96 - 64}{3} = \\frac{32}{3}$$

<strong>第六步：得出面积</strong>

$$A = \\frac{32}{3} \\text{ 平方单位}$$`,
    answer: "$\\frac{32}{3}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 33,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = \\sqrt{x}$、$x = 0$、$x = 4$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `<strong>第一步：确定旋转体积公式</strong>

绕 $x$ 轴旋转的体积公式：
$$V = \\pi \\int_a^b [f(x)]^2 dx$$

<strong>第二步：确定被积函数</strong>

$f(x) = \\sqrt{x}$，积分区间为 $[0, 4]$

<strong>第三步：计算 $[f(x)]^2$</strong>

$$[\\sqrt{x}]^2 = x$$

<strong>第四步：建立体积积分</strong>

$$V = \\pi \\int_0^4 x dx$$

<strong>第五步：计算积分</strong>

$$V = \\pi \\left[\\frac{x^2}{2}\\right]_0^4$$

$$= \\pi \\cdot \\frac{4^2}{2}$$

$$= \\pi \\cdot \\frac{16}{2}$$

$$= 8\\pi$$

<strong>第六步：得出体积</strong>

$$V = 8\\pi \\text{ 立方单位}$$`,
    answer: "$8\\pi$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 34,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = x^2$、$x = 0$、$x = 1$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `<strong>第一步：确定旋转体积公式</strong>

绕 $x$ 轴旋转的体积公式：
$$V = \\pi \\int_a^b [f(x)]^2 dx$$

<strong>第二步：确定积分要素</strong>

- 函数：$f(x) = x^2$
- 积分区间：$[0, 1]$

<strong>第三步：计算 $[f(x)]^2$</strong>

$$[x^2]^2 = x^4$$

<strong>第四步：建立体积积分</strong>

$$V = \\pi \\int_0^1 x^4 dx$$

<strong>第五步：计算积分</strong>

$$V = \\pi \\left[\\frac{x^5}{5}\\right]_0^1$$

$$= \\pi \\cdot \\frac{1^5}{5}$$

$$= \\frac{\\pi}{5}$$

<strong>第六步：得出体积</strong>

$$V = \\frac{\\pi}{5} \\text{ 立方单位}$$`,
    answer: "$\\frac{\\pi}{5}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 35,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^\\pi \\cos x dx$",
    explanation: `<strong>第一步：回忆基本积分公式</strong>

$$\\int \\cos x dx = \\sin x + C$$

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^\\pi \\cos x dx = [\\sin x]_0^\\pi$$

<strong>第三步：代入上限</strong>

$$\\sin \\pi = 0$$

<strong>第四步：代入下限</strong>

$$\\sin 0 = 0$$

<strong>第五步：计算结果</strong>

$$\\int_0^\\pi \\cos x dx = 0 - 0 = 0$$`,
    answer: "$0$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 36,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 3x^2 dx$",
    explanation: `<strong>第一步：提出常数</strong>

$$\\int_0^1 3x^2 dx = 3\\int_0^1 x^2 dx$$

<strong>第二步：应用幂函数积分公式</strong>

$$= 3 \\cdot \\left[\\frac{x^3}{3}\\right]_0^1$$

<strong>第三步：化简</strong>

$$= [x^3]_0^1$$

<strong>第四步：代入上下限</strong>

$$= 1^3 - 0^3 = 1 - 0$$

<strong>第五步：得出结果</strong>

$$\\int_0^1 3x^2 dx = 1$$`,
    answer: "$1$",
    difficulty: "easy",
    category: "定积分计算",
    method: "幂函数积分法"
  },
  {
    id: 37,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = \\sin x$ 在区间 $[0, \\pi]$ 与 $x$ 轴所围成的平面图形的面积",
    explanation: `<strong>第一步：分析函数在区间上的符号</strong>

在区间 $[0, \\pi]$ 上，$\\sin x \\geq 0$

<strong>第二步：建立面积积分</strong>

因为函数非负，面积直接等于积分值：
$$A = \\int_0^\\pi \\sin x dx$$

<strong>第三步：计算积分</strong>

$$A = [-\\cos x]_0^\\pi$$

<strong>第四步：代入上下限</strong>

$$= -\\cos \\pi - (-\\cos 0)$$

$$= -(-1) - (-1)$$

$$= 1 + 1$$

<strong>第五步：得出面积</strong>

$$A = 2 \\text{ 平方单位}$$`,
    answer: "$2$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 38,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = \\sin x$ 在区间 $[0, \\pi]$ 与 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `<strong>第一步：确定旋转体积公式</strong>

$$V = \\pi \\int_a^b [f(x)]^2 dx$$

其中 $f(x) = \\sin x$，积分区间为 $[0, \\pi]$

<strong>第二步：使用三角恒等式</strong>

利用恒等式：$\\sin^2 x = \\frac{1-\\cos 2x}{2}$

$$V = \\pi \\int_0^\\pi \\sin^2 x dx = \\pi \\int_0^\\pi \\frac{1-\\cos 2x}{2} dx$$

<strong>第三步：拆分积分</strong>

$$= \\frac{\\pi}{2} \\int_0^\\pi (1-\\cos 2x) dx$$

$$= \\frac{\\pi}{2} \\left(\\int_0^\\pi dx - \\int_0^\\pi \\cos 2x dx\\right)$$

<strong>第四步：计算各项</strong>

第一项：$\\int_0^\\pi dx = [x]_0^\\pi = \\pi$

第二项：凑微分
$$\\int_0^\\pi \\cos 2x dx = \\frac{1}{2}\\int_0^\\pi \\cos 2x \\cdot d(2x) = \\frac{1}{2}[\\sin 2x]_0^\\pi = 0$$

<strong>第五步：合并结果</strong>

$$V = \\frac{\\pi}{2}(\\pi - 0) = \\frac{\\pi^2}{2}$$

<strong>第六步：得出体积</strong>

$$V = \\frac{\\pi^2}{2} \\text{ 立方单位}$$`,
    answer: "$\\frac{\\pi^2}{2}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 39,
    type: "计算题",
    title: "定积分应用",
    question: "求直线 $y = 2x$、$x = 1$ 和 $y = 0$ 所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `<strong>第一步：确定积分区间</strong>

三条线围成的区域：
- $y = 2x$（斜线）
- $x = 1$（垂直线）
- $y = 0$（$x$ 轴）

积分区间为 $[0, 1]$

<strong>第二步：确定旋转函数</strong>

$f(x) = 2x$

<strong>第三步：应用旋转体积公式</strong>

$$V = \\pi \\int_0^1 [f(x)]^2 dx = \\pi \\int_0^1 (2x)^2 dx$$

<strong>第四步：计算积分</strong>

$$= \\pi \\int_0^1 4x^2 dx$$

$$= 4\\pi \\int_0^1 x^2 dx$$

$$= 4\\pi \\cdot \\left[\\frac{x^3}{3}\\right]_0^1$$

<strong>第五步：代入上下限</strong>

$$= 4\\pi \\cdot \\frac{1^3}{3}$$

$$= \\frac{4\\pi}{3}$$

<strong>第六步：得出体积</strong>

$$V = \\frac{4\\pi}{3} \\text{ 立方单位}$$`,
    answer: "$\\frac{4\\pi}{3}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "旋转体体积计算"
  },
  {
    id: 40,
    type: "计算题",
    title: "广义积分",
    question: "求广义积分 $\\int_1^{+\\infty} \\frac{1}{x} dx$",
    explanation: `<strong>第一步：识别广义积分类型</strong>

这是无限区间的广义积分

<strong>第二步：计算原函数</strong>

$$\\int \\frac{1}{x} dx = \\ln|x| + C$$

<strong>第三步：应用广义积分定义</strong>

$$\\int_1^{+\\infty} \\frac{1}{x} dx = \\lim\\limits_{b \\to +\\infty} \\int_1^b \\frac{1}{x} dx$$

$$= \\lim\\limits_{b \\to +\\infty} [\\ln x]_1^b$$

<strong>第四步：计算极限</strong>

$$= \\lim\\limits_{b \\to +\\infty} (\\ln b - \\ln 1)$$

$$= \\lim\\limits_{b \\to +\\infty} \\ln b - 0$$

$$= +\\infty$$

<strong>第五步：判断收敛性</strong>

因为极限为 $+\\infty$，所以广义积分发散`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 41,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 \\frac{x^2}{1+x^3} dx$",
    explanation: `<strong>第一步：观察被积函数结构</strong>

注意到分子 $x^2$ 与分母中 $x^3$ 的导数相关

<strong>第二步：凑微分</strong>

因为 $d(x^3) = 3x^2 dx$，所以 $x^2 dx = \\frac{1}{3}d(x^3)$

同时 $d(1+x^3) = 3x^2 dx$，所以 $x^2 dx = \\frac{1}{3}d(1+x^3)$

<strong>第三步：改写积分</strong>

$$\\int_0^1 \\frac{x^2}{1+x^3} dx = \\frac{1}{3}\\int_0^1 \\frac{1}{1+x^3} d(1+x^3)$$

<strong>第四步：套用基本积分公式</strong>

$$\\int \\frac{1}{u} du = \\ln|u| + C$$

$$\\frac{1}{3}\\int_0^1 \\frac{1}{1+x^3} d(1+x^3) = \\frac{1}{3}[\\ln|1+x^3|]_0^1$$

<strong>第五步：代入上下限</strong>

$$= \\frac{1}{3}(\\ln|1+1| - \\ln|1+0|)$$

$$= \\frac{1}{3}(\\ln 2 - \\ln 1)$$

$$= \\frac{1}{3}\\ln 2$$`,
    answer: "$\\frac{1}{3}\\ln 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法与对称性"
  },
  {
    id: 42,
    type: "计算题",
    title: "广义积分",
    question: "求广义积分 $\\int_2^{+\\infty} \\frac{1}{x^2} dx$",
    explanation: `<strong>第一步：识别广义积分类型</strong>

这是无限区间的广义积分

<strong>第二步：计算原函数</strong>

$$\\int \\frac{1}{x^2} dx = \\int x^{-2} dx = \\frac{x^{-1}}{-1} = -\\frac{1}{x} + C$$

<strong>第三步：应用广义积分定义</strong>

$$\\int_2^{+\\infty} \\frac{1}{x^2} dx = \\lim\\limits_{b \\to +\\infty} \\int_2^b \\frac{1}{x^2} dx$$

$$= \\lim\\limits_{b \\to +\\infty} \\left[-\\frac{1}{x}\\right]_2^b$$

<strong>第四步：计算极限</strong>

$$= \\lim\\limits_{b \\to +\\infty} \\left(-\\frac{1}{b} - \\left(-\\frac{1}{2}\\right)\\right)$$

$$= \\lim\\limits_{b \\to +\\infty} \\left(-\\frac{1}{b} + \\frac{1}{2}\\right)$$

$$= 0 + \\frac{1}{2}$$

<strong>第五步：得出结论</strong>

广义积分收敛，值为 $\\frac{1}{2}$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 43,
    type: "计算题",
    title: "分部积分法",
    question: "计算定积分 $\\int_0^{\\pi/2} x\\cos x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\pi/2} x\\cos x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $\\cos x dx$ 凑成微分形式：
$$\\cos x dx = d(\\sin x)$$

验证：$d(\\sin x) = \\cos x dx$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^{\\pi/2} x\\cos x dx = \\int_0^{\\pi/2} x \\cdot d(\\sin x)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_0^{\\pi/2} x \\cdot d(\\sin x) = [x \\cdot \\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x \\cdot d(x)$$

<strong>第五步：计算 $d(x)$</strong>

$$d(x) = dx$$

<strong>第六步：代入并化简</strong>

$$= [x \\sin x]_0^{\\pi/2} - \\int_0^{\\pi/2} \\sin x dx$$

<strong>第七步：计算边界项</strong>

$$[x \\sin x]_0^{\\pi/2} = \\frac{\\pi}{2} \\cdot \\sin \\frac{\\pi}{2} - 0 \\cdot \\sin 0 = \\frac{\\pi}{2} \\cdot 1 = \\frac{\\pi}{2}$$

<strong>第八步：计算剩余积分</strong>

$$\\int_0^{\\pi/2} \\sin x dx = [-\\cos x]_0^{\\pi/2} = -\\cos\\frac{\\pi}{2} + \\cos 0 = 0 + 1 = 1$$

<strong>第九步：合并最终结果</strong>

$$\\int_0^{\\pi/2} x\\cos x dx = \\frac{\\pi}{2} - 1$$`,
    answer: "$\\frac{\\pi}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 44,
    type: "计算题",
    title: "换元定积分计算",
    question: "计算定积分 $\\int_0^{\\pi/2} \\sin^2 x dx$",
    explanation: `<strong>第一步：使用二倍角公式降次</strong>

$$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$$

<strong>第二步：代入并拆分积分</strong>

$$\\int_0^{\\pi/2} \\sin^2 x dx = \\int_0^{\\pi/2} \\frac{1 - \\cos 2x}{2} dx$$

$$= \\frac{1}{2} \\int_0^{\\pi/2} (1 - \\cos 2x) dx$$

$$= \\frac{1}{2} \\left( \\int_0^{\\pi/2} 1 dx - \\int_0^{\\pi/2} \\cos 2x dx \\right)$$

<strong>第三步：计算第一个积分</strong>

$$\\int_0^{\\pi/2} 1 dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2}$$

<strong>第四步：计算第二个积分（凑微分）</strong>

对于 $\\int_0^{\\pi/2} \\cos 2x dx$：

因为 $d(2x) = 2dx$，所以 $dx = \\frac{1}{2}d(2x)$

$$\\int_0^{\\pi/2} \\cos 2x dx = \\frac{1}{2} \\int_0^{\\pi/2} \\cos 2x d(2x)$$

$$= \\frac{1}{2} [\\sin 2x]_0^{\\pi/2} = \\frac{1}{2}(\\sin \\pi - \\sin 0) = 0$$

<strong>第五步：合并结果</strong>

$$\\int_0^{\\pi/2} \\sin^2 x dx = \\frac{1}{2} \\left( \\frac{\\pi}{2} - 0 \\right) = \\frac{\\pi}{4}$$`,
    answer: "$\\frac{\\pi}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分"
  },
  {
    id: 45,
    type: "计算题",
    title: "分部积分法",
    question: "利用分部积分法计算 $\\int_0^1 x \\ln(1+x) dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^1 x \\ln(1+x) dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $x dx$ 凑成微分形式：
$$x dx = d\\left(\\frac{x^2}{2}\\right)$$

验证：$d\\left(\\frac{x^2}{2}\\right) = \\frac{2x}{2} dx = x dx$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^1 x \\ln(1+x) dx = \\int_0^1 \\ln(1+x) \\cdot d\\left(\\frac{x^2}{2}\\right)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_0^1 \\ln(1+x) \\cdot d\\left(\\frac{x^2}{2}\\right) = \\left[\\ln(1+x) \\cdot \\frac{x^2}{2}\\right]_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot d[\\ln(1+x)]$$

<strong>第五步：计算 $d[\\ln(1+x)]$</strong>

$$d[\\ln(1+x)] = \\frac{1}{1+x} dx$$

<strong>第六步：代入并化简</strong>

$$= \\left[\\frac{x^2}{2} \\ln(1+x)\\right]_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot \\frac{1}{1+x} dx$$

<strong>第七步：计算边界项</strong>

$$\\left[\\frac{x^2}{2} \\ln(1+x)\\right]_0^1 = \\frac{1}{2} \\ln 2 - 0 = \\frac{\\ln 2}{2}$$

<strong>第八步：处理剩余积分</strong>

对于 $\\int_0^1 \\frac{x^2}{2(1+x)} dx$，使用多项式除法：
$$\\frac{x^2}{1+x} = x - 1 + \\frac{1}{1+x}$$

因此：
$$\\int_0^1 \\frac{x^2}{2(1+x)} dx = \\frac{1}{2} \\int_0^1 \\left(x - 1 + \\frac{1}{1+x}\\right) dx$$

$$= \\frac{1}{2} \\left[\\frac{x^2}{2} - x + \\ln(1+x)\\right]_0^1$$

$$= \\frac{1}{2} \\left[(\\frac{1}{2} - 1 + \\ln 2) - 0\\right] = \\frac{1}{2} \\left(-\\frac{1}{2} + \\ln 2\\right) = -\\frac{1}{4} + \\frac{\\ln 2}{2}$$

<strong>第九步：合并最终结果</strong>

$$\\int_0^1 x \\ln(1+x) dx = \\frac{\\ln 2}{2} - \\left(-\\frac{1}{4} + \\frac{\\ln 2}{2}\\right) = \\frac{1}{4}$$`,
    answer: "$\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 46,
    type: "计算题",
    title: "换元定积分计算",
    question: "计算 $\\int_0^{\\pi/3} \\sec^2 x dx$",
    explanation: `<strong>第一步：识别基本积分公式</strong>

$$\\int \\sec^2 x dx = \\tan x + C$$

这是一个基本积分公式

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^{\\pi/3} \\sec^2 x dx = [\\tan x]_0^{\\pi/3}$$

<strong>第三步：代入上限</strong>

$$\\tan \\frac{\\pi}{3} = \\sqrt{3}$$

<strong>第四步：代入下限</strong>

$$\\tan 0 = 0$$

<strong>第五步：计算结果</strong>

$$\\int_0^{\\pi/3} \\sec^2 x dx = \\sqrt{3} - 0 = \\sqrt{3}$$`,
    answer: "$\\sqrt{3}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分"
  },
  {
    id: 47,
    type: "计算题",
    title: "换元定积分计算",
    question: "计算 $\\int_0^{\\pi/2} \\sin^3 x dx$",
    explanation: `<strong>第一步：分解 $\\sin^3 x$</strong>

$$\\sin^3 x = \\sin x \\cdot \\sin^2 x = \\sin x \\cdot (1 - \\cos^2 x)$$

<strong>第二步：展开并拆分积分</strong>

$$\\int_0^{\\pi/2} \\sin^3 x dx = \\int_0^{\\pi/2} \\sin x(1 - \\cos^2 x) dx$$

$$= \\int_0^{\\pi/2} \\sin x dx - \\int_0^{\\pi/2} \\sin x \\cos^2 x dx$$

<strong>第三步：计算第一个积分</strong>

$$\\int_0^{\\pi/2} \\sin x dx = [-\\cos x]_0^{\\pi/2} = -\\cos\\frac{\\pi}{2} + \\cos 0 = 0 + 1 = 1$$

<strong>第四步：计算第二个积分（凑微分）</strong>

注意到 $\\sin x dx = -d(\\cos x)$

$$\\int_0^{\\pi/2} \\sin x \\cos^2 x dx = -\\int_0^{\\pi/2} \\cos^2 x d(\\cos x)$$

令 $u = \\cos x$，当 $x=0$ 时 $u=1$，当 $x=\\frac{\\pi}{2}$ 时 $u=0$

$$= -\\int_1^0 u^2 du = \\int_0^1 u^2 du = \\left[\\frac{u^3}{3}\\right]_0^1 = \\frac{1}{3}$$

<strong>第五步：合并结果</strong>

$$\\int_0^{\\pi/2} \\sin^3 x dx = 1 - \\frac{1}{3} = \\frac{2}{3}$$`,
    answer: "$\\frac{2}{3}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 48,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 x^2(1-x) dx$",
    explanation: `<strong>第一步：展开被积函数</strong>

$$x^2(1-x) = x^2 - x^3$$

<strong>第二步：拆分积分</strong>

$$\\int_0^1 x^2(1-x) dx = \\int_0^1 (x^2 - x^3) dx$$

$$= \\int_0^1 x^2 dx - \\int_0^1 x^3 dx$$

<strong>第三步：计算第一个积分</strong>

$$\\int_0^1 x^2 dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}$$

<strong>第四步：计算第二个积分</strong>

$$\\int_0^1 x^3 dx = \\left[\\frac{x^4}{4}\\right]_0^1 = \\frac{1}{4} - 0 = \\frac{1}{4}$$

<strong>第五步：合并结果</strong>

$$\\int_0^1 x^2(1-x) dx = \\frac{1}{3} - \\frac{1}{4} = \\frac{4-3}{12} = \\frac{1}{12}$$`,
    answer: "$\\frac{1}{12}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 49,
    type: "计算题",
    title: "定积分应用",
    question: "求曲线 $y = x(1-x)$ 与 $x$ 轴在区间 $[0,1]$ 所围成的平面图形的面积",
    explanation: `<strong>第一步：分析函数在区间上的符号</strong>

$y = x(1-x) = x - x^2$

当 $x \\in [0,1]$ 时，$x \\geq 0$ 且 $1-x \\geq 0$
所以 $y = x(1-x) \\geq 0$

<strong>第二步：建立面积积分</strong>

$$A = \\int_0^1 x(1-x) dx = \\int_0^1 (x - x^2) dx$$

<strong>第三步：计算积分</strong>

$$= \\int_0^1 x dx - \\int_0^1 x^2 dx$$

$$= \\left[\\frac{x^2}{2}\\right]_0^1 - \\left[\\frac{x^3}{3}\\right]_0^1$$

<strong>第四步：代入上下限</strong>

$$= \\frac{1^2}{2} - \\frac{1^3}{3}$$

$$= \\frac{1}{2} - \\frac{1}{3}$$

<strong>第五步：计算面积</strong>

$$A = \\frac{3-2}{6} = \\frac{1}{6} \\text{ 平方单位}$$`,
    answer: "$\\frac{1}{6}$",
    difficulty: "easy",
    category: "定积分应用",
    method: "定积分面积计算"
  },
  {
    id: 50,
    type: "计算题",
    title: "定积分应用",
    question: "求由曲线 $y = x + 1$、$x = -2$、$x = 2$ 和 $x$ 轴所围成的平面图形绕 $x$ 轴旋转所得到的旋转体的体积",
    explanation: `<strong>第一步：应用旋转体积公式</strong>

$$V = \\pi \\int_{-2}^{2} (x + 1)^2 dx$$

<strong>第二步：展开被积函数</strong>

$$(x + 1)^2 = x^2 + 2x + 1$$

<strong>第三步：利用函数奇偶性简化计算</strong>

将积分拆分为奇函数和偶函数部分：
- $x^2$ 是偶函数
- $2x$ 是奇函数  
- $1$ 是偶函数

<strong>第四步：应用奇偶函数性质</strong>

奇函数在对称区间上的积分为 0：
$$\\int_{-2}^{2} 2x dx = 0$$

偶函数在对称区间上的积分：
$$\\int_{-2}^{2} (x^2 + 1) dx = 2\\int_{0}^{2} (x^2 + 1) dx$$

<strong>第五步：计算偶函数部分</strong>

$$2\\int_{0}^{2} (x^2 + 1) dx = 2\\left[\\frac{x^3}{3} + x\\right]_0^2$$

$$= 2\\left(\\frac{8}{3} + 2 - 0\\right) = 2 \\cdot \\frac{14}{3} = \\frac{28}{3}$$

<strong>第六步：得出体积</strong>

$$V = \\pi \\cdot \\frac{28}{3} = \\frac{28\\pi}{3} \\text{ 立方单位}$$`,
    answer: "$\\frac{28\\pi}{3}$",
    difficulty: "medium",
    category: "定积分应用",
    method: "对称性简化积分"
  },
  {
    id: 51,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 x^3(1-x)^2 dx$",
    explanation: `<strong>第一步：展开 $(1-x)^2$</strong>

$$(1-x)^2 = 1 - 2x + x^2$$

<strong>第二步：展开被积函数</strong>

$$x^3(1-x)^2 = x^3(1 - 2x + x^2)$$

$$= x^3 - 2x^4 + x^5$$

<strong>第三步：拆分积分</strong>

$$\\int_0^1 x^3(1-x)^2 dx = \\int_0^1 (x^3 - 2x^4 + x^5) dx$$

$$= \\int_0^1 x^3 dx - 2\\int_0^1 x^4 dx + \\int_0^1 x^5 dx$$

<strong>第四步：计算各项积分</strong>

$$= \\left[\\frac{x^4}{4}\\right]_0^1 - 2\\left[\\frac{x^5}{5}\\right]_0^1 + \\left[\\frac{x^6}{6}\\right]_0^1$$

$$= \\frac{1}{4} - 2 \\cdot \\frac{1}{5} + \\frac{1}{6}$$

<strong>第五步：通分计算</strong>

找最小公倍数 60：

$$= \\frac{15}{60} - \\frac{24}{60} + \\frac{10}{60}$$

$$= \\frac{15-24+10}{60} = \\frac{1}{60}$$`,
    answer: "$\\frac{1}{60}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 52,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_{-2}^2 |x| dx$",
    explanation: `<strong>第一步：分析绝对值函数</strong>

$$|x| = \\begin{cases} 
-x, & x < 0 \\\\
x, & x \\geq 0 
\\end{cases}$$

<strong>第二步：根据定义域分段</strong>

在区间 $[-2, 2]$ 上：
- 当 $x \\in [-2, 0)$ 时，$|x| = -x$
- 当 $x \\in [0, 2]$ 时，$|x| = x$

<strong>第三步：应用区间可加性</strong>

$$\\int_{-2}^2 |x| dx = \\int_{-2}^0 |x| dx + \\int_0^2 |x| dx$$

$$= \\int_{-2}^0 (-x) dx + \\int_0^2 x dx$$

<strong>第四步：计算第一个积分</strong>

$$\\int_{-2}^0 (-x) dx = -\\int_{-2}^0 x dx = -\\left[\\frac{x^2}{2}\\right]_{-2}^0$$

$$= -\\left(0 - \\frac{4}{2}\\right) = 2$$

<strong>第五步：计算第二个积分</strong>

$$\\int_0^2 x dx = \\left[\\frac{x^2}{2}\\right]_0^2 = \\frac{4}{2} - 0 = 2$$

<strong>第六步：合并结果</strong>

$$\\int_{-2}^2 |x| dx = 2 + 2 = 4$$`,
    answer: "$4$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分段函数定积分"
  },
  {
    id: 53,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^{\\pi} t\\sin t dt$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\pi} t\\sin t dt$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $\\sin t dt$ 凑成微分形式：
$$\\sin t dt = -d(\\cos t)$$

验证：$d(-\\cos t) = \\sin t dt$ ✓

<strong>第三步：改写积分</strong>

$$\\int_0^{\\pi} t\\sin t dt = \\int_0^{\\pi} t \\cdot [-d(\\cos t)]$$

$$= -\\int_0^{\\pi} t \\cdot d(\\cos t)$$

<strong>第四步：应用分部积分公式</strong>

$$-\\int_0^{\\pi} t \\cdot d(\\cos t) = -[t \\cdot \\cos t]_0^{\\pi} + \\int_0^{\\pi} \\cos t \\cdot d(t)$$

<strong>第五步：计算 $d(t)$</strong>

$$d(t) = dt$$

<strong>第六步：代入并化简</strong>

$$= -[t\\cos t]_0^{\\pi} + \\int_0^{\\pi} \\cos t dt$$

<strong>第七步：计算边界项</strong>

$$-[t\\cos t]_0^{\\pi} = -(\\pi \\cos \\pi - 0 \\cdot \\cos 0) = -(\\pi \\cdot (-1)) = \\pi$$

<strong>第八步：计算剩余积分</strong>

$$\\int_0^{\\pi} \\cos t dt = [\\sin t]_0^{\\pi} = \\sin \\pi - \\sin 0 = 0 - 0 = 0$$

<strong>第九步：合并结果</strong>

$$\\int_0^{\\pi} t\\sin t dt = \\pi + 0 = \\pi$$`,
    answer: "$\\pi$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 54,
    type: "计算题",
    title: "广义积分",
    question: "讨论广义积分 $\\int_0^2 \\frac{dx}{(x-1)^2}$ 的敛散性",
    explanation: `<strong>第一步：识别瑕点</strong>

当 $x = 1$ 时，$(x-1)^2 = 0$，分母为零
所以 $x = 1$ 是瑕点，且在积分区间 $(0, 2)$ 内部

<strong>第二步：分解积分</strong>

根据瑕点将积分分为两部分：
$$\\int_0^2 \\frac{dx}{(x-1)^2} = \\int_0^1 \\frac{dx}{(x-1)^2} + \\int_1^2 \\frac{dx}{(x-1)^2}$$

<strong>第三步：计算原函数</strong>

$$\\int \\frac{dx}{(x-1)^2} = \\int (x-1)^{-2} dx = -\\frac{1}{x-1} + C$$

<strong>第四步：处理第一部分（左侧瑕点）</strong>

$$\\int_0^1 \\frac{dx}{(x-1)^2} = \\lim\\limits_{a \\to 1^-} \\int_0^a \\frac{dx}{(x-1)^2}$$

$$= \\lim\\limits_{a \\to 1^-} \\left[-\\frac{1}{x-1}\\right]_0^a$$

$$= \\lim\\limits_{a \\to 1^-} \\left(-\\frac{1}{a-1} + \\frac{1}{0-1}\\right)$$

$$= \\lim\\limits_{a \\to 1^-} \\left(-\\frac{1}{a-1} - 1\\right)$$

当 $a \\to 1^-$ 时，$a-1 \\to 0^-$，所以 $-\\frac{1}{a-1} \\to +\\infty$

<strong>第五步：判断收敛性</strong>

因为第一部分积分发散到 $+\\infty$，
所以整个广义积分 $\\int_0^2 \\frac{dx}{(x-1)^2}$ 发散`,
    answer: "发散",
    difficulty: "medium",
    category: "广义积分",
    method: "广义积分计算法"
  },
  {
    id: 55,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^{\\pi} \\sin^2 x \\cos x dx$",
    explanation: `<strong>第一步：识别凑微分结构</strong>

注意到 $\\cos x dx = d(\\sin x)$

<strong>第二步：凑微分</strong>

$$\\int_0^{\\pi} \\sin^2 x \\cos x dx = \\int_0^{\\pi} \\sin^2 x \\cdot d(\\sin x)$$

<strong>第三步：令 $u = \\sin x$</strong>

当 $x = 0$ 时，$u = \\sin 0 = 0$
当 $x = \\pi$ 时，$u = \\sin \\pi = 0$

<strong>第四步：转换积分</strong>

$$\\int_0^{\\pi} \\sin^2 x \\cdot d(\\sin x) = \\int_0^0 u^2 du$$

<strong>第五步：分析结果</strong>

积分的上限和下限相同，根据定积分性质：
$$\\int_0^0 u^2 du = 0$$

<strong>几何解释：</strong>
$\\sin x$ 在 $[0, \\pi]$ 上先增后减，回到原点，
相当于没有累积效果`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 56,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^4 \\frac{1}{1+\\sqrt{x}} dx$",
    explanation: `<strong>第一步：选择换元</strong>

令 $t = \\sqrt{x}$，则 $x = t^2$

<strong>第二步：计算微分</strong>

$$dx = 2t dt$$

<strong>第三步：确定新的积分限</strong>

当 $x = 0$ 时，$t = \\sqrt{0} = 0$
当 $x = 4$ 时，$t = \\sqrt{4} = 2$

<strong>第四步：换元后的积分</strong>

$$\\int_0^4 \\frac{1}{1+\\sqrt{x}} dx = \\int_0^2 \\frac{2t}{1+t} dt$$

<strong>第五步：分解被积函数</strong>

对 $\\frac{2t}{1+t}$ 进行分解：
$$\\frac{2t}{1+t} = \\frac{2(t+1-1)}{1+t} = \\frac{2(t+1)}{1+t} - \\frac{2}{1+t} = 2 - \\frac{2}{1+t}$$

<strong>第六步：计算积分</strong>

$$\\int_0^2 \\left(2 - \\frac{2}{1+t}\\right) dt = [2t - 2\\ln|1+t|]_0^2$$

$$= (2 \\cdot 2 - 2\\ln 3) - (0 - 2\\ln 1)$$

$$= 4 - 2\\ln 3$$

$$= 2(2 - \\ln 3)$$`,
    answer: "$2(2-\\ln3)$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 57,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-\\sqrt{3}}^{\\sqrt{3}} \\frac{x^2\\sin x}{1+x^4} dx$",
    explanation: `<strong>第一步：判断被积函数的奇偶性</strong>

设 $f(x) = \\frac{x^2\\sin x}{1+x^4}$

<strong>第二步：分析各部分的奇偶性</strong>

- 分子：$x^2$ 是偶函数，$\\sin x$ 是奇函数
- 所以 $x^2\\sin x$ 是奇函数
- 分母：$1+x^4$ 是偶函数（因为 $x^4$ 是偶函数）

<strong>第三步：判断整体奇偶性</strong>

$$f(-x) = \\frac{(-x)^2\\sin(-x)}{1+(-x)^4} = \\frac{x^2(-\\sin x)}{1+x^4} = -\\frac{x^2\\sin x}{1+x^4} = -f(x)$$

所以 $f(x)$ 是奇函数

<strong>第四步：确认积分区间</strong>

积分区间 $[-\\sqrt{3}, \\sqrt{3}]$ 关于原点对称

<strong>第五步：应用奇函数性质</strong>

奇函数在对称区间上的积分为零：
$$\\int_{-\\sqrt{3}}^{\\sqrt{3}} \frac{x^2\\sin x}{1+x^4} dx = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 58,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-1}^1 (\\sin 3x\\cdot\\tan^2 x + \\frac{x}{\\sqrt{1+x^2}} + x^2) dx$",
    explanation: `<strong>第一步：分析被积函数的奇偶性</strong>

将被积函数分为三部分：
- $\\sin 3x \\cdot \\tan^2 x$
- $\\frac{x}{\\sqrt{1+x^2}}$  
- $x^2$

<strong>第二步：判断各部分的奇偶性</strong>

对于第一部分：$\\sin 3x$ 是奇函数，$\\tan^2 x$ 是偶函数
所以 $\\sin 3x \\cdot \\tan^2 x$ 是奇函数

对于第二部分：分子 $x$ 是奇函数，分母 $\\sqrt{1+x^2}$ 是偶函数
所以 $\\frac{x}{\\sqrt{1+x^2}}$ 是奇函数

对于第三部分：$x^2$ 是偶函数

<strong>第三步：应用积分的线性性质</strong>

$$\\int_{-1}^1 (\\sin 3x\\cdot\\tan^2 x + \\frac{x}{\\sqrt{1+x^2}} + x^2) dx$$

$$= \\int_{-1}^1 \\sin 3x\\cdot\\tan^2 x dx + \\int_{-1}^1 \\frac{x}{\\sqrt{1+x^2}} dx + \\int_{-1}^1 x^2 dx$$

<strong>第四步：利用奇偶函数性质</strong>

前两项是奇函数在对称区间上的积分，结果为 0：
$$\\int_{-1}^1 \\sin 3x\\cdot\\tan^2 x dx = 0$$
$$\\int_{-1}^1 \\frac{x}{\\sqrt{1+x^2}} dx = 0$$

对于偶函数项：
$$\\int_{-1}^1 x^2 dx = 2\\int_0^1 x^2 dx = 2 \\cdot \\left[\\frac{x^3}{3}\\right]_0^1 = 2 \\cdot \\frac{1}{3} = \\frac{2}{3}$$

<strong>第五步：得出最终结果</strong>

$$\\int_{-1}^1 (\\sin 3x\\cdot\\tan^2 x + \\frac{x}{\\sqrt{1+x^2}} + x^2) dx = 0 + 0 + \\frac{2}{3} = \\frac{2}{3}$$`,
    answer: "$\\frac{2}{3}$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 59,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^{\\frac{1}{2}} \\arcsin x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\frac{1}{2}} \\arcsin x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $dx$ 凑成微分形式：
$$dx = d(x)$$

<strong>第三步：改写积分</strong>

$$\\int_0^{\\frac{1}{2}} \\arcsin x dx = \\int_0^{\\frac{1}{2}} \\arcsin x \\cdot d(x)$$

<strong>第四步：应用分部积分公式</strong>

$$\\int_0^{\\frac{1}{2}} \\arcsin x \\cdot d(x) = [\\arcsin x \\cdot x]_0^{\\frac{1}{2}} - \\int_0^{\\frac{1}{2}} x \\cdot d(\\arcsin x)$$

<strong>第五步：计算 $d(\\arcsin x)$</strong>

$$d(\\arcsin x) = \\frac{1}{\\sqrt{1-x^2}} dx$$

<strong>第六步：代入并化简</strong>

$$= [x \\arcsin x]_0^{\\frac{1}{2}} - \\int_0^{\\frac{1}{2}} x \\cdot \\frac{1}{\\sqrt{1-x^2}} dx$$

$$= [x \\arcsin x]_0^{\\frac{1}{2}} - \\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx$$

<strong>第七步：计算边界项</strong>

$$[x \\arcsin x]_0^{\\frac{1}{2}} = \\frac{1}{2} \\arcsin \\frac{1}{2} - 0 = \\frac{1}{2} \\cdot \\frac{\\pi}{6} = \\frac{\\pi}{12}$$

<strong>第八步：计算剩余积分（凑微分法）</strong>

对于 $\\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx$：

注意到 $d(1-x^2) = -2x dx$，所以 $x dx = -\\frac{1}{2} d(1-x^2)$

$$\\int_0^{\\frac{1}{2}} \\frac{x}{\\sqrt{1-x^2}} dx = -\\frac{1}{2} \\int_0^{\\frac{1}{2}} \\frac{1}{\\sqrt{1-x^2}} d(1-x^2)$$

$$= -\\frac{1}{2} \\cdot 2\\sqrt{1-x^2} \\bigg|_0^{\\frac{1}{2}} = -\\sqrt{1-x^2} \\bigg|_0^{\\frac{1}{2}}$$

$$= -\\sqrt{1-\\frac{1}{4}} + \\sqrt{1} = -\\frac{\\sqrt{3}}{2} + 1 = 1 - \\frac{\\sqrt{3}}{2}$$

<strong>第九步：合并最终结果</strong>

$$\\int_0^{\\frac{1}{2}} \\arcsin x dx = \\frac{\\pi}{12} - \\left(1 - \\frac{\\sqrt{3}}{2}\\right) = \\frac{\\pi}{12} + \\frac{\\sqrt{3}}{2} - 1$$`,
    answer: "$\\frac{\\pi}{12} + \\frac{\\sqrt{3}}{2} - 1$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 60,
    type: "计算题",
    title: "分部积分法",
    question: "求 $\\int_0^{\\pi/4} x\\sin 2x dx$",
    explanation: `<strong>第一步：分析分部积分结构</strong>

对于 $\\int_0^{\\pi/4} x\\sin 2x dx$，需要将其中一部分凑成微分形式

<strong>第二步：凑微分</strong>

将 $\\sin 2x dx$ 凑成微分形式。首先注意：
$$d(\\cos 2x) = -2\\sin 2x dx$$

所以：$$\\sin 2x dx = -\\frac{1}{2} d(\\cos 2x)$$

<strong>第三步：改写积分</strong>

$$\\int_0^{\\pi/4} x\\sin 2x dx = \\int_0^{\\pi/4} x \\cdot \\left[-\\frac{1}{2} d(\\cos 2x)\\right]$$

$$= -\\frac{1}{2} \\int_0^{\\pi/4} x \\cdot d(\\cos 2x)$$

<strong>第四步：应用分部积分公式</strong>

$$-\\frac{1}{2} \\int_0^{\\pi/4} x \\cdot d(\\cos 2x) = -\\frac{1}{2}[x \\cdot \\cos 2x]_0^{\\pi/4} + \\frac{1}{2}\\int_0^{\\pi/4} \\cos 2x \\cdot d(x)$$

<strong>第五步：计算 $d(x)$</strong>

$$d(x) = dx$$

<strong>第六步：代入并化简</strong>

$$= -\\frac{1}{2}[x \\cos 2x]_0^{\\pi/4} + \\frac{1}{2}\\int_0^{\\pi/4} \\cos 2x dx$$

<strong>第七步：计算边界项</strong>

$$-\\frac{1}{2}[x \\cos 2x]_0^{\\pi/4} = -\\frac{1}{2}\\left(\\frac{\\pi}{4} \\cos \\frac{\\pi}{2} - 0 \\cdot \\cos 0\\right)$$

$$= -\\frac{1}{2}\\left(\\frac{\\pi}{4} \\cdot 0 - 0\\right) = 0$$

<strong>第八步：计算剩余积分</strong>

对于 $\\int_0^{\\pi/4} \\cos 2x dx$，凑微分：
$$\\int_0^{\\pi/4} \\cos 2x dx = \\frac{1}{2}\\int_0^{\\pi/4} \\cos 2x \\cdot d(2x) = \\frac{1}{2}[\\sin 2x]_0^{\\pi/4}$$

$$= \\frac{1}{2}\\left(\\sin \\frac{\\pi}{2} - \\sin 0\\right) = \\frac{1}{2}(1 - 0) = \\frac{1}{2}$$

<strong>第九步：合并最终结果</strong>

$$\\int_0^{\\pi/4} x\\sin 2x dx = 0 + \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$$`,
    answer: "$\\frac{1}{4}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "分部积分法"
  },
  {
    id: 61,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 e^x dx$",
    explanation: `<strong>第一步：识别基本积分公式</strong>

$$\\int e^x dx = e^x + C$$

这是指数函数的基本积分公式

<strong>第二步：应用牛顿-莱布尼茨公式</strong>

$$\\int_0^1 e^x dx = [e^x]_0^1$$

<strong>第三步：代入上限</strong>

$$e^1 = e$$

<strong>第四步：代入下限</strong>

$$e^0 = 1$$

<strong>第五步：计算最终结果</strong>

$$\\int_0^1 e^x dx = e - 1$$`,
    answer: "$e-1$",
    difficulty: "easy",
    category: "定积分计算",
    method: "指数函数积分法"
  },
  {
    id: 62,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_{0}^{\\pi} \\sin^2 x dx$",
    explanation: `<strong>第一步：使用二倍角公式降次</strong>

利用三角恒等式：$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$

$$\\int_{0}^{\\pi} \\sin^2 x dx = \\int_{0}^{\\pi} \\frac{1 - \\cos 2x}{2} dx$$

<strong>第二步：拆分积分</strong>

$$= \\frac{1}{2} \\int_{0}^{\\pi} (1 - \\cos 2x) dx$$

$$= \\frac{1}{2} \\left(\\int_{0}^{\\pi} 1 dx - \\int_{0}^{\\pi} \\cos 2x dx\\right)$$

<strong>第三步：计算第一项</strong>

$$\\int_{0}^{\\pi} 1 dx = [x]_{0}^{\\pi} = \\pi - 0 = \\pi$$

<strong>第四步：计算第二项（凑微分法）</strong>

对于 $\\int_{0}^{\\pi} \\cos 2x dx$：
因为 $d(2x) = 2dx$，所以 $dx = \\frac{1}{2} d(2x)$

$$\\int_{0}^{\\pi} \\cos 2x dx = \\frac{1}{2} \\int_{0}^{\\pi} \\cos 2x d(2x) = \\frac{1}{2} [\\sin 2x]_{0}^{\\pi}$$

$$= \\frac{1}{2} (\\sin 2\\pi - \\sin 0) = \\frac{1}{2} (0 - 0) = 0$$

<strong>第五步：合并结果</strong>

$$\\int_{0}^{\\pi} \\sin^2 x dx = \\frac{1}{2}(\\pi - 0) = \\frac{\\pi}{2}$$`,
    answer: "$\\frac{\\pi}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 63,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^{\\ln 2} e^x(e^x+1) dx$",
    explanation: `<strong>第一步：展开被积函数</strong>

$$e^x(e^x+1) = e^{2x} + e^x$$

<strong>第二步：拆分积分</strong>

$$\\int_0^{\\ln 2} e^x(e^x+1) dx = \\int_0^{\\ln 2} (e^{2x} + e^x) dx$$

$$= \\int_0^{\\ln 2} e^{2x} dx + \\int_0^{\\ln 2} e^x dx$$

<strong>第三步：计算第一项（凑微分法）</strong>

对于 $\\int_0^{\\ln 2} e^{2x} dx$：
因为 $d(2x) = 2dx$，所以 $dx = \\frac{1}{2} d(2x)$

$$\\int_0^{\\ln 2} e^{2x} dx = \\frac{1}{2} \\int_0^{\\ln 2} e^{2x} d(2x) = \\frac{1}{2} [e^{2x}]_0^{\\ln 2}$$

$$= \\frac{1}{2} (e^{2\\ln 2} - e^0) = \\frac{1}{2} (e^{\\ln 2^2} - 1) = \\frac{1}{2} (4 - 1) = \\frac{3}{2}$$

<strong>第四步：计算第二项</strong>

$$\\int_0^{\\ln 2} e^x dx = [e^x]_0^{\\ln 2} = e^{\\ln 2} - e^0 = 2 - 1 = 1$$

<strong>第五步：合并结果</strong>

$$\\int_0^{\\ln 2} e^x(e^x+1) dx = \\frac{3}{2} + 1 = \\frac{5}{2}$$`,
    answer: "$\\frac{5}{2}$",
    difficulty: "medium",
    category: "定积分计算",
    method: "指数函数积分法"
  },
  {
    id: 64,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^1 \\frac{dx}{(x+1)^2}$",
    explanation: `<strong>第一步：识别复合函数</strong>

分母为 $(x+1)^2$，内层函数是 $x+1$

<strong>第二步：凑微分</strong>

注意到 $d(x+1) = dx$

$$\\int_0^1 \\frac{dx}{(x+1)^2} = \\int_0^1 \\frac{d(x+1)}{(x+1)^2}$$

<strong>第三步：套用幂函数积分公式</strong>

$$\\int \\frac{du}{u^2} = \\int u^{-2} du = -u^{-1} + C = -\\frac{1}{u} + C$$

<strong>第四步：计算定积分</strong>

$$\\int_0^1 \\frac{d(x+1)}{(x+1)^2} = \\left[-\\frac{1}{x+1}\\right]_0^1$$

<strong>第五步：代入上下限</strong>

代入上限 $x=1$：$-\\frac{1}{1+1} = -\\frac{1}{2}$

代入下限 $x=0$：$-\\frac{1}{0+1} = -1$

<strong>第六步：计算最终结果</strong>

$$\\int_0^1 \\frac{dx}{(x+1)^2} = -\\frac{1}{2} - (-1) = -\\frac{1}{2} + 1 = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "换元法"
  },
  {
    id: 65,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^{\\pi/2} \\sin x \\cos x dx$",
    explanation: `<strong>第一步：使用二倍角公式</strong>

利用恒等式：$\\sin x \\cos x = \\frac{\\sin 2x}{2}$

$$\\int_0^{\\pi/2} \\sin x \\cos x dx = \\int_0^{\\pi/2} \\frac{\\sin 2x}{2} dx$$

<strong>第二步：提出常数因子</strong>

$$= \\frac{1}{2} \\int_0^{\\pi/2} \\sin 2x dx$$

<strong>第三步：凑微分</strong>

因为 $d(2x) = 2dx$，所以 $dx = \\frac{1}{2} d(2x)$

$$\\frac{1}{2} \\int_0^{\\pi/2} \\sin 2x dx = \\frac{1}{2} \\cdot \\frac{1}{2} \\int_0^{\\pi/2} \\sin 2x d(2x)$$

$$= \\frac{1}{4} \\int_0^{\\pi/2} \\sin 2x d(2x)$$

<strong>第四步：计算积分</strong>

$$= \\frac{1}{4} [-\\cos 2x]_0^{\\pi/2}$$

<strong>第五步：代入上下限</strong>

$$= \\frac{1}{4} (-\\cos \\pi + \\cos 0) = \\frac{1}{4} (-(-1) + 1) = \\frac{1}{4} \\cdot 2 = \\frac{1}{2}$$`,
    answer: "$\\frac{1}{2}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "三角函数积分法"
  },
  {
    id: 66,
    type: "计算题",
    title: "基本定积分计算",
    question: "求 $\\int_0^1 (x^2+1)^2 dx$",
    explanation: `<strong>第一步：展开被积函数</strong>

$$(x^2+1)^2 = (x^2)^2 + 2x^2 \\cdot 1 + 1^2 = x^4 + 2x^2 + 1$$

<strong>第二步：拆分积分</strong>

$$\\int_0^1 (x^2+1)^2 dx = \\int_0^1 (x^4 + 2x^2 + 1) dx$$

$$= \\int_0^1 x^4 dx + 2\\int_0^1 x^2 dx + \\int_0^1 1 dx$$

<strong>第三步：计算各项积分</strong>

$$= \\left[\\frac{x^5}{5}\\right]_0^1 + 2\\left[\\frac{x^3}{3}\\right]_0^1 + [x]_0^1$$

<strong>第四步：代入上下限</strong>

第一项：$\\frac{1^5}{5} - \\frac{0^5}{5} = \\frac{1}{5}$

第二项：$2 \\cdot \\left(\\frac{1^3}{3} - \\frac{0^3}{3}\\right) = 2 \\cdot \\frac{1}{3} = \\frac{2}{3}$

第三项：$1 - 0 = 1$

<strong>第五步：合并结果</strong>

$$\\int_0^1 (x^2+1)^2 dx = \\frac{1}{5} + \\frac{2}{3} + 1$$

通分（公分母为15）：
$$= \\frac{3}{15} + \\frac{10}{15} + \\frac{15}{15} = \\frac{28}{15}$$`,
    answer: "$\\frac{28}{15}$",
    difficulty: "easy",
    category: "定积分计算",
    method: "定积分基本计算法"
  },
  {
    id: 67,
    type: "计算题",
    title: "换元定积分计算",
    question: "求 $\\int_0^4 e^{\\sqrt{x}} dx$",
    explanation: `<strong>第一步：选择换元</strong>

令 $t = \\sqrt{x}$，则 $x = t^2$

<strong>第二步：计算微分</strong>

$$dx = d(t^2) = 2t dt$$

<strong>第三步：确定新的积分限</strong>

当 $x = 0$ 时，$t = \\sqrt{0} = 0$
当 $x = 4$ 时，$t = \\sqrt{4} = 2$

<strong>第四步：换元后的积分</strong>

$$\\int_0^4 e^{\\sqrt{x}} dx = \\int_0^2 e^t \\cdot 2t dt = 2\\int_0^2 t e^t dt$$

<strong>第五步：应用分部积分法</strong>

对 $\\int_0^2 t e^t dt$，设 $u = t$，$dv = e^t dt$
则 $du = dt$，$v = e^t$

$$2\\int_0^2 t e^t dt = 2\\left([t e^t]_0^2 - \\int_0^2 e^t dt\\right)$$

<strong>第六步：计算边界项和剩余积分</strong>

边界项：$[t e^t]_0^2 = 2e^2 - 0 \\cdot e^0 = 2e^2$

剩余积分：$\\int_0^2 e^t dt = [e^t]_0^2 = e^2 - e^0 = e^2 - 1$

<strong>第七步：合并最终结果</strong>

$$\\int_0^4 e^{\\sqrt{x}} dx = 2(2e^2 - (e^2 - 1)) = 2(2e^2 - e^2 + 1) = 2(e^2 + 1) = 2e^2 + 2$$`,
    answer: "$2e^2 + 2$",
    difficulty: "medium",
    category: "定积分计算",
    method: "换元法与分部积分法"
  },
  {
    id: 68,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-\\pi}^{\\pi} x^6 \\sin x dx$",
    explanation: `<strong>第一步：判断被积函数的奇偶性</strong>

设 $f(x) = x^6 \\sin x$

<strong>第二步：分析各部分的奇偶性</strong>

- $x^6$ 是偶函数，因为 $(-x)^6 = x^6$
- $\\sin x$ 是奇函数，因为 $\\sin(-x) = -\\sin x$

<strong>第三步：确定整体奇偶性</strong>

$$f(-x) = (-x)^6 \\sin(-x) = x^6 \\cdot (-\\sin x) = -x^6 \\sin x = -f(x)$$

所以 $f(x) = x^6 \\sin x$ 是奇函数

<strong>第四步：确认积分区间</strong>

积分区间 $[-\\pi, \\pi]$ 关于原点对称

<strong>第五步：应用奇函数性质</strong>

奇函数在对称区间上的积分为零：
$$\\int_{-\\pi}^{\\pi} x^6 \\sin x dx = 0$$`,
    answer: "$0$",
    difficulty: "medium",
    category: "定积分性质",
    method: "奇偶性"
  },
  {
    id: 69,
    type: "计算题",
    title: "定积分定义与性质",
    question: "求 $\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx$",
    explanation: `<strong>第一步：拆分被积函数</strong>

$$\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx = \\int_{-1}^1 \\frac{2}{1+x^2} dx + \\int_{-1}^1 \\frac{\\sin x}{1+x^2} dx$$

<strong>第二步：分析第一项的奇偶性</strong>

$\\frac{2}{1+x^2}$ 是偶函数，因为：
$$f(-x) = \\frac{2}{1+(-x)^2} = \\frac{2}{1+x^2} = f(x)$$

<strong>第三步：计算第一项</strong>

利用偶函数性质：
$$\\int_{-1}^1 \\frac{2}{1+x^2} dx = 2\\int_0^1 \\frac{2}{1+x^2} dx = 4\\int_0^1 \\frac{1}{1+x^2} dx$$

$$= 4[\\arctan x]_0^1 = 4(\\arctan 1 - \\arctan 0) = 4 \\cdot \\frac{\\pi}{4} = \\pi$$

<strong>第四步：分析第二项的奇偶性</strong>

对于 $\\frac{\\sin x}{1+x^2}$：
- $\\sin x$ 是奇函数
- $\\frac{1}{1+x^2}$ 是偶函数
- 奇函数与偶函数的乘积是奇函数

<strong>第五步：计算第二项</strong>

奇函数在对称区间上的积分为零：
$$\\int_{-1}^1 \\frac{\\sin x}{1+x^2} dx = 0$$

<strong>第六步：合并最终结果</strong>

$$\\int_{-1}^1 \\frac{2+\\sin x}{1+x^2} dx = \\pi + 0 = \\pi$$`,
    answer: "$\\pi$",
    difficulty: "medium",
    category: "定积分计算",
    method: "奇偶性与分部积分法"
  }

];
