// 全局变量，包含知识点和习题数据
window.exerciseData = {
  // 知识点
  knowledgePoints: [
    {
      title: "微分方程基础知识",
      content: `
<div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
  <!-- 基本概念部分 -->
  <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
      <div style="flex: 1; min-width: 300px;">
        <p style="margin: 0 0 8px 0;"><strong>微分方程的定义</strong>：含有未知函数及其导数的方程</p>
        <ul style="margin: 0 0 10px 15px; padding: 0 0 0 10px; list-style-type: circle;">
          <li style="margin-bottom: 6px;"><strong>阶数</strong>：方程中未知函数的最高阶导数的阶数</li>
          <li style="margin-bottom: 6px;"><strong>解</strong>：满足微分方程的函数</li>
        </ul>

        <p style="margin: 10px 0 8px 0;"><strong>常见形式</strong>：</p>
        <div style="margin: 0 0 6px 15px; padding: 6px 10px; background: #f0f5ff; border-radius: 4px;">
          一阶微分方程：$F(x,y,\\frac{dy}{dx})=0$ 或 $\\frac{dy}{dx}=f(x,y)$
        </div>
        <div style="margin: 6px 0 0 15px; padding: 6px 10px; background: #f0f5ff; border-radius: 4px;">
          二阶线性微分方程：$y''+py'+qy=f(x)$
        </div>
      </div>

      <div style="flex: 1; min-width: 300px;">
        <div style="margin: 0 0 12px 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7;">
          <strong>通解</strong>：包含任意常数的解，其中任意常数的个数等于微分方程的阶数
        </div>

        <div style="margin: 12px 0 12px 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7;">
          <strong>特解</strong>：不含任意常数的解，由通解确定任意常数后得到
        </div>

        <div style="margin: 12px 0 0 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7;">
          <strong>初始条件</strong>：确定特解时所需的附加条件，通常为函数在某点的取值或导数值
        </div>
      </div>
    </div>

    <div style="margin-top: 15px; padding: 8px 12px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825; font-size: 0.95rem;">
      <strong>注意</strong>：求解微分方程通常先求通解，再根据初始条件求特解
    </div>
  </div>
</div>`
    },
    {
      title: "一阶微分方程",
      content: `<div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
  <div style="display: flex; flex-wrap: wrap; gap: 15px;">
    <!-- 可分离变量部分 -->
    <div style="flex: 1; min-width: 280px;">
      <div style="border-left: 4px solid #59a14f; padding-left: 10px; margin-bottom: 12px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
        <h4 style="color: #2c4cc3; margin: 0 0 10px 0; font-size: 1.1rem; display: flex; align-items: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <span style="display: inline-block; width: 8px; height: 8px; background: #59a14f; margin-right: 8px; border-radius: 50%;"></span>可分离变量的微分方程
        </h4>
        <div style="margin: 0 0 10px 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #59a14f;">
          <strong>标准形式</strong>：$g(y)dy = f(x)dx$
        </div>

        <p style="margin: 12px 0 8px 0;"><strong>解法步骤</strong>：</p>
        <ol style="margin: 0 0 10px 15px; padding-left: 10px;">
          <li style="margin-bottom: 6px;">将方程化为标准形式 $g(y)dy = f(x)dx$</li>
          <li style="margin-bottom: 6px;">两边积分：$\\int g(y)dy = \\int f(x)dx$</li>
          <li style="margin-bottom: 0px;">求出通解</li>
        </ol>

        <div style="margin-top: 12px; padding: 6px 10px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825; font-size: 0.9rem;">
          <strong>注意</strong>：积分时要加积分常数；注意变量分离时的条件
        </div>
      </div>
    </div>

    <!-- 齐次型部分 -->
    <div style="flex: 1; min-width: 280px;">
      <div style="border-left: 4px solid #f28e2c; padding-left: 10px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
        <h4 style="color: #2c4cc3; margin: 0 0 10px 0; font-size: 1.1rem; display: flex; align-items: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <span style="display: inline-block; width: 8px; height: 8px; background: #f28e2c; margin-right: 8px; border-radius: 50%;"></span>齐次型微分方程
        </h4>
        <div style="margin: 0 0 10px 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c;">
          <strong>定义</strong>：形如 $y' = f(\\frac{y}{x})$ 的微分方程称为齐次型微分方程
        </div>

        <p style="margin: 12px 0 8px 0;"><strong>判断标准</strong>：</p>
        <div style="margin: 0 0 0 15px; padding: 8px 12px; background: #f0f5ff; border-radius: 4px;">
          微分方程右侧是否可以表示为 $F(tx,ty)=F(x,y)$
        </div>

        <p style="margin: 12px 0 8px 0;"><strong>解法</strong>：令 $u = \\frac{y}{x}$ 代入原方程，转化为可分离变量方程后求解。</p>
      </div>
    </div>
    
    <!-- 一阶线性部分 -->
    <div style="flex: 1; min-width: 280px;">
      <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 12px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
        <h4 style="color: #2c4cc3; margin: 0 0 10px 0; font-size: 1.1rem; display: flex; align-items: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
          <span style="display: inline-block; width: 8px; height: 8px; background: #4e79a7; margin-right: 8px; border-radius: 50%;"></span>一阶线性微分方程
        </h4>
        <div style="margin: 0 0 10px 0; padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7;">
          <strong>标准形式</strong>：$y' + p(x)y = Q(x)$
        </div>
        
        <ul style="margin: 0 0 10px 15px; padding-left: 10px; list-style-type: circle;">
          <li style="margin-bottom: 6px;"><strong>一阶线性齐次微分方程</strong>：$Q(x) = 0$</li>
          <li style="margin-bottom: 0px;"><strong>一阶线性非齐次微分方程</strong>：$Q(x) \\neq 0$</li>
        </ul>
        
        <p style="margin: 12px 0 8px 0;"><strong>通解</strong>：</p>
        <div style="margin: 0 0 6px -5px; padding: 8px 12px; background: #f0f5ff; border-radius: 6px;">
          齐次方程：$y = Ce^{-\\int p(x)dx}$
        </div>
        <div style="margin: 6px 0 0 -5px; padding: 8px 12px; background: #f0f5ff; border-radius: 6px;">
          非齐次方程：$y = e^{-\\int p(x)dx}(\\int Q(x)e^{\\int p(x)dx}dx + C)$
        </div>
      </div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 15px; font-size: 0.95rem; background: linear-gradient(to right, #f0f5ff, #e1ebfa, #f0f5ff); padding: 5px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-weight: 500;">认准方程类型，选对解法方法，是解微分方程的关键</p>
  </div>
</div>`
    },
    {
      title: "二阶常系数线性微分方程",
      content: `
            <div style="padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;">
              <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: stretch;">
                <!-- 左侧垂直标题 -->
                <div style="width: 30px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(to bottom, #4e79a7, #2c4cc3); border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: white; padding: 10px 0;">
                  <h3 style="writing-mode: vertical-rl; text-orientation: upright; margin: 0; font-size: 1rem; letter-spacing: 4px; text-align: center; white-space: nowrap;">二阶常系数线性齐次微分方程</h3>
                </div>

                <!-- 中间内容 -->
                <div style="flex: 1; min-width: 290px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 12px; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
                    <h4 style="color: #2c4cc3; margin: 0 0 8px 0; font-size: 1.1rem; display: flex; align-items: center;">
                      <span style="display: inline-block; width: 8px; height: 8px; background: #4e79a7; margin-right: 8px; border-radius: 50%;"></span>基本定义
                    </h4>
                    <p style="margin: 0 0 6px 0;"><strong>标准形式</strong>：$y'' + py' + qy = 0$，其中 $p,q$ 为常数</p>
                    <p style="margin: 0;"><strong>特征方程</strong>：$r^2 + pr + q = 0$</p>
                    <p style="margin: 5px 0 0 15px; font-size: 0.95rem; color: #555;">求根公式：$r_1 = \\frac{-p + \\sqrt{p^2 - 4q}}{2}$, $r_2 = \\frac{-p - \\sqrt{p^2 - 4q}}{2}$</p>
                  </div>

                  <div style="border-left: 4px solid #59a14f; padding-left: 10px; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
                    <h4 style="color: #2c4cc3; margin: 0 0 8px 0; font-size: 1.1rem; display: flex; align-items: center;">
                      <span style="display: inline-block; width: 8px; height: 8px; background: #59a14f; margin-right: 8px; border-radius: 50%;"></span>通解
                    </h4>
                    <div style="margin: 0 0 8px 0; padding: 6px 10px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #59a14f;">
                      <strong>$p^2 - 4q > 0$</strong>：两个不同实根
                    </div>
                    <p style="margin: 8px 0 5px 15px;">$y = C_1e^{r_1x} + C_2e^{r_2x}$</p>
                    <p style="margin: 5px 0 5px 15px; color: #555; font-size: 0.9rem;">$r_1 = \\frac{-p + \\sqrt{p^2 - 4q}}{2}$</p>
                    <p style="margin: 5px 0 0 15px; color: #555; font-size: 0.9rem;">$r_2 = \\frac{-p - \\sqrt{p^2 - 4q}}{2}$</p>
                  </div>
                </div>
                <!-- 右侧内容 -->
                <div style="flex: 1; min-width: 290px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="border-left: 4px solid #f28e2c; padding-left: 10px; margin-bottom: 12px; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
                    <div style="margin: 0 0 8px 0; padding: 6px 10px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c;">
                      <strong>$p^2 - 4q = 0$</strong>：一个二重实根
                    </div>
                    <p style="margin: 8px 0 5px 15px;">$y = (C_1 + C_2x)e^{rx}$</p>
                    <p style="margin: 5px 0 12px 15px; color: #555; font-size: 0.9rem;">$r = -\\frac{p}{2}$</p>
                  </div>
                  <div style="border-left: 4px solid #FF5733; padding-left: 10px; margin-bottom: 12px; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s;">
                    <div style="margin: 15px 0 8px 0; padding: 6px 10px; background: #E8F6F3; border-radius: 4px; border-left: 3px solid #FFC300;">
                      <strong>$p^2 - 4q < 0$</strong>：一对共轭复根
                    </div>
                    <p style="margin: 8px 0 5px 15px;">$y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$</p>
                    <p style="margin: 5px 0 0 15px; color: #555; font-size: 0.9rem;">其中，$r = \\alpha \\pm \\beta i$ 为特征方程的一对共轭复根</p>
                    <p style="margin: 5px 0 5px 15px; color: #555; font-size: 0.9rem;">$\\alpha = -\\frac{p}{2}$</p>
                    <p style="margin: 5px 0 5px 15px; color: #555; font-size: 0.9rem;">$\\beta = \\frac{\\sqrt{4q-p^2}}{2}$</p>
                  </div>
                </div>
              </div>
            </div>
              <div style="display: flex; align-items: center; justify-content: center; margin-top: 6px;">
                <h4 style="color: #2c4cc3; margin: 0; font-size: 1.1rem; display: flex; align-items: center;">
                <span style="background: #f0f5ff; padding: 3px 8px; border-radius: 4px;">非齐次微分方程</span>
                </h4>
                <p style="margin: 0 0 0 15px; background: #f0f5ff; padding: 3px 10px; border-radius: 4px; font-weight: 500;">
                <strong>通解</strong> = 齐次通解 + 特解
                </p>
                <p style="margin-left: 15px; font-weight: 500;">判别式 $\\Delta = p^2 - 4q$ 决定了特征根的类型和通解形式</p>
              </div>
            </div>
            `
    }
  ],

  // 习题
  exercises: [
    {
      id: 1,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "1.求解微分方程 $\\frac{dy}{dx} = xy$",
      explanation: `$$解：$$
$$将方程变形为标准形式：$$
$$\\frac{dy}{dx} = xy$$
$$\\frac{dy}{y} = x dx$$
$$两边积分：$$
$$\\int \\frac{dy}{y} = \\int x dx$$
$$\\ln|y| = \\frac{x^2}{2} + C_1$$
$$两边取指数：$$
$$|y| = e^{\\frac{x^2}{2} + C_1} = e^{C_1} \\cdot e^{\\frac{x^2}{2}} = C_2 \\cdot e^{\\frac{x^2}{2}}$$
$$去掉绝对值符号：$$
$$y = Ce^{\\frac{x^2}{2}}$$
$$其中C为任意常数。这是该微分方程的通解。$$`,
      answer: "$y = Ce^{\\frac{x^2}{2}}$，其中C为任意常数",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 2,
      type: "填空题",
      title: "微分方程的阶",
      question: "2.微分方程 $\\frac{d^2y}{dx^2} + 3\\frac{dy}{dx} - 2y = 0$ 的阶是_______。",
      explanation: `$$解：$$
$$微分方程的阶是指它所含未知函数的最高阶导数的阶数。$$
$$在给定的微分方程 \\frac{d^2y}{dx^2} + 3\\frac{dy}{dx} - 2y = 0 中，最高阶导数是 \\frac{d^2y}{dx^2}，即二阶导数。$$
$$因此，该微分方程是二阶微分方程。$$`,
      answer: "2",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 3,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "3.求解微分方程 $\\frac{dy}{dx} + y = e^x$",
      explanation: `$$解：$$
$$这是一阶线性微分方程，标准形式为：y' + y = e^x，即 y' + p(x)y = Q(x)，其中 p(x) = 1，Q(x) = e^x$$
$$使用公式法求解线性微分方程：$$
$$y = e^{-\\int p(x) \\, dx} \\left( \\int Q(x) e^{\\int p(x) \\, dx} \\, dx + C \\right)$$
$$y = e^{-\\int 1 \\, dx} \\left( \\int e^x e^{\\int 1 \\, dx} \\, dx + C \\right)$$
$$y = e^{-x} \\left( \\int e^{2x} \\, dx + C \\right)$$
$$计算积分：\\int e^{2x} \\, dx = \\frac{1}{2} \\cdot \\int e^{2x} \\, d2x = \\frac{1}{2} \\cdot e^{2x} + C_1$$
$$代入原式：y = e^{-x} \\left( \\frac{1}{2}e^{2x} + C \\right) = \\frac{1}{2}e^x + Ce^{-x}$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = \\frac{1}{2}e^x + Ce^{-x}$，其中C为任意常数",
      difficulty: "hard",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 4,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "4.求解微分方程 $y'' - 5y' + 6y = 0$",
      explanation: `$$解：$$
$$1. 写出特征方程：r^2 - 5r + 6 = 0$$
$$2. 求特征根：(r-2)(r-3) = 0 ,r_1 = 2, r_2 = 3$$
$$3. 由于有两个不同的实根，通解形式为：y = C_1e^{r_1x} + C_2e^{r_2x}$$
$$4. 代入特征根：y = C_1e^{2x} + C_2e^{3x}$$
$$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = C_1e^{2x} + C_2e^{3x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 5,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "5.求解微分方程 $y'' + 4y' + 4y = 0$",
      explanation: `$$解：$$
$$1. 特征方程：r^2 + 4r + 4 = 0$$
$$2. 特征根：(r+2)^2 = 0，r = -2（二重根）$$
$$3. 二重根通解形式：y = (C_1 + C_2x)e^{rx}$$
$$4. 代入特征根：y = (C_1 + C_2x)e^{-2x}$$
$$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = (C_1 + C_2x)e^{-2x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 6,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "6.求解微分方程 $y'' + 2y' + 5y = 0$",
      explanation: `$$解：$$
$$1. 写出特征方程：r^2 + 2r + 5 = 0$$
$$2. 求特征根：r = \\frac{-2 \\pm \\sqrt{4-20}}{2} = -1 \\pm 2i$$
$$3. 由于有一对共轭复根，通解形式为：y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)，其中 \\alpha 是实部，\\beta 是虚部的绝对值$$
$$4. 代入 \\alpha = -1, \\beta = 2：y = e^{-x}(C_1\\cos 2x + C_2\\sin 2x)$$
$$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = e^{-x}(C_1\\cos 2x + C_2\\sin 2x)$，其中$C_1$和$C_2$为任意常数",
      difficulty: "hard",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 7,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "7.求解微分方程 $\\frac{dy}{dx} = \\frac{x}{y}$",
      explanation: `$$解：1. 将方程变形为标准形式：y dy = x dx$$
$$2. 两边积分：\\int y dy = \\int x dx, \\frac{y^2}{2} = \\frac{x^2}{2} + C$$
$$3. 解出y：y^2 = x^2 + 2C, y = \\pm\\sqrt{x^2 + 2C}$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = \\pm\\sqrt{x^2 + 2C}$，其中C为任意常数",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 8,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "8.求解微分方程 $\\frac{dy}{dx} = y\\sin x$",
      explanation: `$$解：1. 将方程变形为标准形式：\\frac{dy}{y} = \\sin x dx$$
$$2. 两边积分：\\int \\frac{dy}{y} = \\int \\sin x dx, \\ln|y| = -\\cos x + C$$
$$3. 解出y：y = \\pm e^{-\\cos x + C} = Ce^{-\\cos x}$$
$$这是该微分方程的通解，其中C为任意非零常数。$$`,
      answer: "$y = Ce^{-\\cos x}$，其中C为任意非零常数",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 9,
      type: "判断题",
      title: "微分方程的基本概念",
      question: "9.判断题：一阶微分方程的阶是指最高阶导数的阶数。",
      explanation: `$$解：这道题的说法是正确的。微分方程的阶是指方程中出现的最高阶导数的阶数。$$
$$一阶微分方程中最高阶导数是一阶导数，即\\frac{dy}{dx}或y'，因此一阶微分方程的阶为1。$$
$$例如：\\frac{dy}{dx} = 2x + y就是一个一阶微分方程。$$`,
      answer: "正确",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 10,
      type: "填空题",
      title: "微分方程的类型",
      question: "10.若微分方程可以写成$P(x)dx + Q(y)dy = 0$的形式，则此方程称为_______的微分方程。",
      explanation: `$$解：若微分方程可以写成P(x)dx + Q(y)dy = 0的形式，其中P(x)只是x的函数，Q(y)只是y的函数，则此方程称为可分离变量的微分方程。$$
$$这类方程可以通过分离变量的方法求解，即将方程整理为\\frac{Q(y)dy}{P(x)dx} = -1，然后对两边积分。$$
$$例如：\\frac{dy}{dx} = xy可以写成xdx - \\frac{1}{y}dy = 0，就是一个可分离变量的微分方程。$$`,
      answer: "可分离变量",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 11,
      type: "判断题",
      title: "微分方程的通解与特解",
      question: "11.判断题：微分方程的通解包含任意常数，特解是通解中常数取特定值得到的解。",
      explanation: `$$解：$$
$$这个说法是正确的。$$
$$1. 通解：微分方程的通解是包含任意常数的解，常数的个数等于微分方程的阶数。$$
$$2. 特解：特解是通解中通过特定值或满足初值条件得到的解。$$`,
      answer: "正确",
      difficulty: "medium",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 12,
      type: "判断题",
      title: "微分方程的初值条件",
      question: "12.判断题：初值条件可以确定微分方程通解中的任意常数，从而得到唯一的特解。",
      explanation: `$$解：$$
$$这个说法是正确的。微分方程的通解通常包含任意常数，而初值条件可以确定这些常数的值，从而得到唯一的特解。$$
$$例如：对于一阶微分方程\\frac{dy}{dx} = f(x,y)，给定初值条件y(x_0) = y_0，就可以确定通解中的任意常数，得到唯一的特解。$$`,
      answer: "正确",
      difficulty: "medium",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 13,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "13.求解微分方程 $\\frac{dy}{dx} = \\frac{y^2}{1+x^2}$",
      explanation: `$$解：$$
$$1. 将方程变形为标准形式：\\frac{dy}{y^2} = \\frac{dx}{1+x^2}$$
$$2. 两边积分：$$
$$\\int \\frac{dy}{y^2} = \\int \\frac{dx}{1+x^2}$$
$$-\\frac{1}{y} = \\arctan x + C$$
$$3. 解出y：$$
$$\\frac{1}{y} = -\\arctan x - C$$
$$\\frac{1}{y} = -\\arctan x + C'$$
$$y = \\frac{1}{-\\arctan x + C'} = \\frac{1}{C - \\arctan x}$$
$$其中C为任意常数。这是该微分方程的通解。$$`,
      answer: "$y = \\frac{1}{C - \\arctan x}$，其中C为任意常数",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 14,
      type: "计算题",
      title: "一阶线性非齐次微分方程求解",
      question: "14.求解一阶线性非齐次微分方程 $\\frac{dy}{dx} + 2y = e^x$。",
      explanation: `$$解：$$
$$1. 这是一阶线性非齐次微分方程，标准形式为：y' + P(x)y = Q(x)$$
$$其中 P(x) = 2，Q(x) = e^x$$
$$2. 使用公式法求解：$$
$$y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)=e^{-\\int 2dx} \\left(\\int e^x e^{2x}dx + C\\right)$$
$$3. 计算积分：$$
$$\\int P(x)dx = \\int 2dx = 2x$$
$$e^{\\int P(x)dx} = e^{2x}$$
$$4. 代入公式：$$
$$y = e^{-2x} \\left(\\int e^x \\cdot e^{2x}dx + C\\right)$$
$$= e^{-2x} \\left(\\int e^{3x}dx + C\\right)$$
$$计算\\int e^{3x}dx：$$
$$\\int e^{3x}dx =\\frac{1}{3}\\int e^{3x}d3x= \\frac{1}{3}e^{3x} + C_1$$
$$继续代入：$$
$$= e^{-2x} \\left(\\frac{1}{3}e^{3x} + C\\right)$$
$$= \\frac{1}{3}e^x + Ce^{-2x}$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = \\frac{1}{3}e^x + Ce^{-2x}$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 15,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "15.求解微分方程 $\\frac{dy}{dx} + y = 6x$",
      explanation: `$$解：$$
$$1. 这是一个一阶线性微分方程，标准形式为：y' + P(x)y = Q(x)$$
$$ y' + y = 6x，其中 P(x) = 1，Q(x) = 6x$$
$$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)=e^{-\\int 1 dx} \\left( \\int 6xe^{\\int 1 dx} dx + C \\right)$$
$$3. 计算积分：$$
$$e^{-\\int 1 dx} = e^{-x}$$
$$\\int 6xe^{\\int 1 dx} dx = 6 \\int xe^{x} dx$$
$$= 6 \\int x de^{x}= 6 \\left(xe^{x} - \\int e^{x} dx\\right)$$
$$= 6 \\left(xe^{x} - e^{x}\\right) + C= 6 \\left(x - 1\\right)e^{x} + C$$
$$4. 得到通解：$$
$$y = e^{-x} \\left(6(x - 1)e^{x} + C\\right)$$
$$= 6(x - 1) + Ce^{-x}$$
$$= 6x - 6 + Ce^{-x}$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = 6x - 6 + Ce^{-x}$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 16,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "16.求解微分方程 $y'' - y' - 6y = 0$",
      explanation: `$$解：$$
$$1. 写出特征方程：r^2 - r - 6 = 0$$
$$2. 求特征根：$$
$$(r-3)(r+2) = 0$$
$$r_1 = 3, r_2 = -2$$
$$3. 由于有两个不同的实根，通解形式为：y = C_1e^{r_1x} + C_2e^{r_2x}$$
$$4. 代入特征根：y = C_1e^{3x} + C_2e^{-2x}$$
$$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = C_1e^{3x} + C_2e^{-2x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 17,
      type: "判断题",
      title: "一阶线性微分方程的形式",
      question: "17.判断题：方程$y' + P(x)y = Q(x)$是一阶线性微分方程的标准形式。",
      explanation: `$$解：这道题的说法是正确的。一阶线性微分方程的标准形式是y' + P(x)y = Q(x)，其中P(x)和Q(x)是关于自变量x的函数。$$
$$当Q(x) = 0时，方程y' + P(x)y = 0称为一阶线性齐次微分方程；$$
$$当Q(x) \\neq 0时，方程y' + P(x)y = Q(x)称为一阶线性非齐次微分方程。$$
$$一阶线性微分方程可以通过公式法求解。$$`,
      answer: "正确",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 18,
      type: "填空题",
      title: "二阶常系数线性微分方程的通解",
      question: "18.若二阶常系数线性齐次微分方程$y'' + py' + qy = 0$的特征方程有一对共轭复根$\\alpha \\pm \\beta i$，则其通解形式为_______。",
      explanation: `$$解：当二阶常系数线性齐次微分方程y'' + py' + qy = 0的特征方程有一对共轭复根\\alpha \\pm \\beta i时，其通解形式为：$$
$$y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$$
$$其中C_1和C_2为任意常数，\\alpha是复根的实部，\\beta是复根的虚部的绝对值。$$
$$这种情况发生在特征方程r^2 + pr + q = 0的判别式小于零时，即p^2 - 4q < 0。$$`,
      answer: "$y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 19,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "19.求解微分方程 $\\frac{dy}{dx} = e^{x-y}$",
      explanation: `$$解：$$
$$1. 将方程变形为标准形式：e^y dy = e^x dx$$
$$2. 两边积分：$$
$$\\int e^y dy = \\int e^x dx$$
$$e^y = e^x + C$$
$$3. 解出y：$$
$$y = \\ln(e^x + C)$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = \\ln(e^x + C)$，其中C为任意常数",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 20,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "20.求解微分方程 $xy' - y = x^2$，$x > 0$",
      explanation: `$$解：$$
$$1. 首先将方程整理为标准形式：$$
$$y' - \\frac{y}{x} = x$$
$$这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
$$y' - \\frac{1}{x}y = x，其中 P(x) = -\\frac{1}{x}, Q(x) = x$$
$$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
$$3. 代入积分：y = e^{-\\int -\\frac{1}{x} dx} \\left( \\int x e^{\\int -\\frac{1}{x} dx} dx + C \\right)$$
$$4. 计算积分（因为x>0，所以|x|=x）：$$
$$\\int -\\frac{1}{x} dx = -\\ln|x|$$
$$e^{-\\int -\\frac{1}{x} dx} = e^{\\ln|x|} = x$$
$$\\int x e^{\\int -\\frac{1}{x} dx} dx = \\int x e^{-\\ln|x|} dx = \\int x e^{\\ln|\\frac{1}{x}|} dx = \\int x \\cdot \\frac{1}{x} dx = \\int 1 dx = x+C$$
$$5. 代入积分结果：$$
$$y = x\\left( x + C \\right) = x^2 + Cx$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = x^2 + Cx$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 21,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "21.求解微分方程 $y'' - 4y = 0$",
      explanation: `$$解：$$
$$1. 写出特征方程：r^2 - 4 = 0$$
$$2. 求特征根：$$
$$r^2 = 4$$
$$r = \\pm 2$$
$$r_1 = 2, r_2 = -2$$
$$3. 由于有两个不同的实根，通解形式为：y = C_1e^{r_1x} + C_2e^{r_2x}$$
$$4. 代入特征根：y = C_1e^{2x} + C_2e^{-2x}$$
$$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = C_1e^{2x} + C_2e^{-2x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 22,
      type: "计算题",
      title: "可分离变量的微分方程",
      question: "22.求解微分方程 $\\frac{dy}{dx} = \\frac{y}{x+1}$",
      explanation: `$$解：$$
$$1. 将方程变形为标准形式：\\frac{dy}{y} = \\frac{dx}{x+1}$$
$$2. 两边积分：$$
$$\\int \\frac{dy}{y} = \\int \\frac{dx}{x+1}$$
$$\\ln|y| = \\ln|x+1| + C_1$$
$$3. 两边取指数：$$
$$|y| = e^{\\ln|x+1| + C_1} = e^{\\ln|x+1|} \\cdot e^{C_1} = |x+1| \\cdot C_2$$
$$其中 C_2 = e^{C_1}$$
$$4. 去除绝对值符号（因为C_2可正可负）：$$
$$y = C(x+1)$$
$$其中C为任意非零常数$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = C(x+1)$，其中C为任意常数",
      difficulty: "easy",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 23,
      type: "判断题",
      title: "齐次微分方程的特征",
      question: "23.判断题：一阶微分方程$\\frac{dy}{dx} = f(\\frac{y}{x})$是齐次微分方程。",
      explanation: `$$解：这道题的说法是正确的。$$
$$一阶微分方程\\frac{dy}{dx} = f(\\frac{y}{x})满足齐次微分方程的定义。齐次微分方程的特点是，如果将方程改写为\\frac{dy}{dx} = F(x,y)的形式，则函数F(x,y)满足F(tx,ty) = F(x,y)，即F(x,y)是关于x和y的齐次函数。$$
$$对于\\frac{dy}{dx} = f(\\frac{y}{x})，令F(x,y) = f(\\frac{y}{x})，则有：$$
$$F(tx,ty) = f(\\frac{ty}{tx}) = f(\\frac{y}{x}) = F(x,y)$$
$$因此，这类微分方程是齐次微分方程，可以通过令u = \\frac{y}{x}进行求解。$$`,
      answer: "正确",
      difficulty: "medium",
      category: "齐次微分方程",
      method: "概念理解"
    },
    {
      id: 24,
      type: "填空题",
      title: "微分方程的阶",
      question: "24.微分方程$y''' - 2y'' + y' - 3y = \\sin x$的阶是_______。",
      explanation: `$$解：微分方程的阶是指方程中未知函数的最高阶导数的阶数。$$
$$在微分方程y''' - 2y'' + y' - 3y = \\sin x中，最高阶导数是y'''（三阶导数），所以这个微分方程是三阶微分方程。$$`,
      answer: "3",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 25,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "25.求解微分方程 $y\\frac{dy}{dx} = x$",
      explanation: `$$解：$$
$$1. 将方程变形为标准形式：y dy = x dx$$
$$2. 两边积分：$$
$$\\int y dy = \\int x dx$$
$$\\frac{y^2}{2} = \\frac{x^2}{2} + C$$
$$3. 解出y：$$
$$y^2 = x^2 + 2C$$
$$y = \\pm\\sqrt{x^2 + 2C}$$
$$这是该微分方程的通解，其中C为任意常数。为了使表达式更简洁，可以令2C = C，得到：$$
$$y = \\pm\\sqrt{x^2 + C}$$
$$其中C为任意常数。$$`,
      answer: "$y = \\pm\\sqrt{x^2 + C}$，其中$C$为任意常数",
      difficulty: "easy",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 26,
      type: "选择题",
      title: "齐次微分方程的判断",
      question: `26.下列哪一个微分方程是齐次微分方程？
          A. $\\frac{dy}{dx} = x^2 + y^2$
          B. $\\frac{dy}{dx} = \\frac{x^2 + y^2}{xy}$
          C. $\\frac{dy}{dx} = x + y$
          D. $\\frac{dy}{dx} = x - y$`,
      explanation: `$$解：$$
$$齐次微分方程的形式是 \\frac{dy}{dx} = f(\\frac{y}{x})，或者可以表示为F(x,y)，其中F(tx,ty) = F(x,y)，即F(x,y)是关于x和y的齐次函数。$$
$$选项分析：$$
$$A. \\frac{dy}{dx} = x^2 + y^2$$
$$设F(x,y) = x^2 + y^2，则F(tx,ty) = (tx)^2 + (ty)^2 = t^2(x^2 + y^2) = t^2F(x,y) \\neq F(x,y)，所以不是齐次微分方程。$$
$$B. \\frac{dy}{dx} = \\frac{x^2 + y^2}{xy}$$
$$设F(x,y) = \\frac{x^2 + y^2}{xy}，则F(tx,ty) = \\frac{t^2x^2 + t^2y^2}{t^2xy} = \\frac{x^2 + y^2}{xy} = F(x,y)，所以是齐次微分方程。$$
$$C. \\frac{dy}{dx} = x + y$$
$$设F(x,y) = x + y，则F(tx,ty) = tx + ty = t(x + y) = tF(x,y) \\neq F(x,y)，所以不是齐次微分方程。$$
$$D. \\frac{dy}{dx} = x - y$$
$$设F(x,y) = x - y，则F(tx,ty) = tx - ty = t(x - y) = tF(x,y) \\neq F(x,y)，所以不是齐次微分方程。$$
$$因此，答案是 B。$$`,
      answer: "B",
      difficulty: "easy",
      category: "齐次微分方程",
      method: "齐次判断"
    },
    {
      id: 27,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "27.求解微分方程 $\\frac{dy}{dx} + \\frac{1}{x}y = x^2$，$x > 0$",
      explanation: `$$解：$$
$$1. 这是一阶线性微分方程，标准形式为：\\frac{dy}{dx} + p(x)y = Q(x)$$
$$其中 p(x) = \\frac{1}{x}，Q(x) = x^2$$
$$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
$$3. 代入积分：y = e^{-\\int \\frac{1}{x} dx} \\left( \\int x^2 e^{\\int \\frac{1}{x} dx} dx + C \\right)$$
$$4. 计算积分：$$
$$\\int \\frac{1}{x} dx = \\ln|x|$$
$$e^{-\\int \\frac{1}{x} dx} = e^{-\\ln|x|} = \\frac{1}{x}$$
$$\\int x^2 e^{\\int \\frac{1}{x} dx} dx = \\int x^2 e^{\\ln|x|} dx = \\int x^3 dx = \\frac{x^4}{4} + C$$
$$5. 代入积分结果：$$
$$y = \\frac{1}{x} \\left( \\frac{x^4}{4} + C \\right) = \\frac{x^3}{4} + \\frac{C}{x}$$
$$这是该微分方程的通解，其中C为任意常数，适用于x > 0的情况。$$`,
      answer: "$y = \\frac{x^3}{4} + \\frac{C}{x}$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 28,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "28.求解微分方程 $y'' - 3y' - 4y = 0$",
      explanation: `$$解：$$
$$1. 写出特征方程：r^2 - 3r - 4 = 0$$
$$2. 求特征根：$$
$$r = \\frac{3 \\pm \\sqrt{9+16}}{2} = \\frac{3 \\pm \\sqrt{25}}{2} = \\frac{3 \\pm 5}{2}$$
$$r_1 = 4, r_2 = -1$$
$$3. 由于有两个不同的实根，通解形式为：y = C_1e^{r_1x} + C_2e^{r_2x}$$
$$4. 代入特征根：y = C_1e^{4x} + C_2e^{-x}$$
$$5. 这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = C_1e^{4x} + C_2e^{-x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 29,
      type: "填空题",
      title: "微分方程的阶",
      question: "29.若微分方程中未知函数的导数的最高阶为n，则称此方程为_______微分方程。",
      explanation: `$$解：$$
$$微分方程的阶是指微分方程中未知函数的导数的最高阶数。$$
$$例如：$$
$$y' = x^2 + y 是一阶微分方程，因为最高阶导数是一阶导数y'。$$
$$y'' + 3y' + 2y = 0 是二阶微分方程，因为最高阶导数是二阶导数y''。$$
$$y''' + y'' - y' + y = \\sin x 是三阶微分方程，因为最高阶导数是三阶导数y'''。$$
$$所以，若微分方程中未知函数的导数的最高阶为n，则称此方程为n阶微分方程。$$`,
      answer: "n阶",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 30,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "30.求解微分方程 $\\frac{dy}{dx} + 2y = 4x^2$",
      explanation: `$$解：$$
$$1. 首先将方程整理为标准形式：$$
$$y' + 2y = 4x^2$$
$$这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
$$其中 P(x) = 2, Q(x) = 4x^2$$
$$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
$$3. 代入积分：y = e^{-\\int 2 dx} \\left( \\int 4x^2 e^{\\int 2 dx} dx + C \\right)$$
$$4. 计算积分：$$
$$\\int 2 dx = 2x$$
$$e^{-\\int 2 dx} = e^{-2x}$$
$$\\int 4x^2 e^{\\int 2 dx} dx = \\int 4x^2 e^{2x} dx$$
$$= 4 \\int x^2 e^{2x} dx$$
$$使用分部积分法：设u = x^2, dv = e^{2x}dx$$
$$du = 2x dx, v = \\frac{1}{2}e^{2x}$$
$$\\int x^2 e^{2x} dx = \\frac{x^2}{2}e^{2x} - \\int \\frac{1}{2}e^{2x} \\cdot 2x dx$$
$$= \\frac{x^2}{2}e^{2x} - \\int xe^{2x} dx$$
$$再次使用分部积分：设u = x, dv = e^{2x}dx$$
$$du = dx, v = \\frac{1}{2}e^{2x}$$
$$\\int xe^{2x} dx = \\frac{x}{2}e^{2x} - \\int \\frac{1}{2}e^{2x} dx$$
$$= \\frac{x}{2}e^{2x} - \\frac{1}{4}e^{2x}$$
$$所以：\\int x^2 e^{2x} dx = \\frac{x^2}{2}e^{2x} - (\\frac{x}{2}e^{2x} - \\frac{1}{4}e^{2x})$$
$$= \\frac{x^2}{2}e^{2x} - \\frac{x}{2}e^{2x} + \\frac{1}{4}e^{2x}$$
$$= \\frac{e^{2x}}{4}(2x^2 - 2x + 1)$$
$$因此：4 \\int x^2 e^{2x} dx = e^{2x}(2x^2 - 2x + 1)$$
$$5. 代入积分结果：$$
$$y = e^{-2x} \\left( e^{2x}(2x^2 - 2x + 1) + C \\right)$$
$$= 2x^2 - 2x + 1 + Ce^{-2x}$$
$$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = 2x^2 - 2x + 1 + Ce^{-2x}$，其中C为任意常数",
      difficulty: "hard",
      category: "一阶线性微分方程",
      method: "公式法"
    },

    {
      id: 31,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "31.求解微分方程 $y'' - 4y' + 4y = 0$",
      explanation: `$$解：$$
        $$1. 写出特征方程：$$
          $$r^2 - 4r + 4 = 0$$
        $$2. 求特征根：$$
          $$(r-2)^2 = 0$$
          $$r = 2$$ $$(二重根)$$
        $$3. 由于有一个二重根，通解形式为：$$
          $$y = (C_1 + C_2x)e^{rx}$$
        $$4. 代入特征根：$$
          $$y = (C_1 + C_2x)e^{2x}$$
        $$这是该微分方程的通解，其中C_1和C_2为任意常数。$$`,
      answer: "$y = (C_1 + C_2x)e^{2x}$，其中$C_1$和$C_2$为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 32,
      type: "判断题",
      title: "齐次微分方程",
      question: "32.判断题：一阶齐次微分方程的形式可以表示为 $\\frac{dy}{dx} = f(\\frac{y}{x})$，其中 $f$ 是一个函数。",
      explanation: `$$解：$$
        $$这个判断是正确的。一阶齐次微分方程是指方程右边可以表示为关于 \\frac{y}{x} 的函数，即可以写成 \\frac{dy}{dx} = f(\\frac{y}{x}) 的形式。$$
        $$例如，微分方程 \\frac{dy}{dx} = \\frac{2x+3y}{x-y} 可以变形为：$$
        $$\\frac{dy}{dx} = \\frac{2x+3y}{x-y} = \\frac{2+3\\frac{y}{x}}{1-\\frac{y}{x}}$$
        $$可以看出，右边是关于 \\frac{y}{x} 的函数，所以这是一个齐次方程。$$
        $$齐次微分方程可以通过代换 y = ux （其中 u = \\frac{y}{x}）将其转化为可分离变量的微分方程来求解。$$`,
      answer: "正确",
      difficulty: "medium",
      category: "齐次微分方程",
      method: "概念理解"
    },
    {
      id: 33,
      type: "判断题",
      title: "微分方程的阶数",
      question: "33.判断题：微分方程的阶数是指方程中最高阶导数的阶数。",
      explanation: `$$解：$$
        $$这个判断是正确的。$$
        $$1. 阶数定义：$$
          $$- 微分方程的阶数是指方程中最高阶导数的阶数。$$
          $$- 例如：在方程 \\frac{d^3y}{dx^3} + 3\\frac{d^2y}{dx^2} - 2y = 0 中，最高阶导数是 \\frac{d^3y}{dx^3}，所以这是三阶微分方程。$$
        $$理解微分方程的阶数有助于选择合适的解法及理解问题的复杂性。$$`,
      answer: "正确",
      difficulty: "medium",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 34,
      type: "计算题",
      title: "二阶齐次线性微分方程",
      question: "34.求解微分方程 $y'' + y = 0$",
      explanation: `$$解：$$
        $$特征方程为：r^2 + 1 = 0$$
        $$特征根：r = \\pm i$$
        $$由于特征根是一对共轭复数 \\alpha \\pm \\beta i，其中 \\alpha = 0, \\beta = 1$$
        $$通解形式为：y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$$
        $$所以齐次通解为：y_c = C_1\\cos x + C_2\\sin x$$`,
        answer: "$y = C_1\\cos x + C_2\\sin x$，其中$C_1$和$C_2$为任意常数",
        difficulty: "medium",
        category: "二阶常系数线性微分方程",
        method: "特征方程法"
    },
    {
      id: 35,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "35.求解微分方程 $xy' - y = x^2$，$x > 0$",
      explanation: `$$解：$$
        $$1. 这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
          $$y' - \\frac{1}{x}y = x，其中 P(x) = -\\frac{1}{x}, Q(x) = x$$
        $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
        $$3. 代入积分：y = e^{-\\int -\\frac{1}{x} dx} \\left( \\int x e^{\\int -\\frac{1}{x} dx} dx + C \\right)$$
        $$4. 计算积分（因为x>0，所以|x|=x）：$$
        $$\\int -\\frac{1}{x} dx = -\\ln|x|$$
        $$e^{-\\int -\\frac{1}{x} dx} = e^{\\ln|x|} = x$$
        $$\\int x e^{\\int -\\frac{1}{x} dx} dx = \\int x e^{-\\ln|x|} dx = \\int x e^{\\ln|\\frac{1}{x}|} dx = \\int x \\cdot \\frac{1}{x} dx = \\int 1 dx = x+C$$
        $$5. 代入积分结果：$$
        $$y = x\\left( x + C \\right) = x^2 + Cx$$
        $$这是该微分方程的通解，其中C为任意常数。$$`,
        answer: "$y = x^2 + Cx$，其中C为任意常数",
        difficulty: "medium",
        category: "一阶线性微分方程",
        method: "公式法"
    },
    {
      id: 36,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "36.求解微分方程 $\\frac{dy}{dx} = y^2\\sin x$",
      explanation: `$$解：$$
        $$1. 这是可分离变量的微分方程，可以写成：\\frac{dy}{y^2} = \\sin x\\,dx$$
        $$2. 两边积分：$$
          $$\\int \\frac{dy}{y^2} = \\int \\sin x\\,dx$$
          $$-\\frac{1}{y} = -\\cos x + C$$
        $$3. 解出y：$$
          $$\\frac{1}{y} = \\cos x + C$$
          $$y = \\frac{1}{\\cos x + C}$$
        $$这是该微分方程的通解，其中C为任意常数。$$`,
        answer: "$y = \\frac{1}{\\cos x + C}$，其中$C$为任意常数",
        difficulty: "medium",
        category: "可分离变量的微分方程",
        method: "分离变量法"
    },
    {
      id: 37,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "37.求解微分方程 $\\frac{dy}{dx} = (1+y^2)\\tan x$，$0 < x < \\frac{\\pi}{2}$",
      explanation: `$$解：$$
        $$1. 将方程写为：\\frac{dy}{1+y^2} = \\tan x\\,dx。$$
    $$2. 两边积分：\\int \\frac{dy}{1+y^2} = \\int \\tan x\\,dx。$$
    $$3. 积分得：$$
      $$左边：\\int \\frac{dy}{1+y^2} = \\arctan y$$
      $$右边：\\int \\tan x\\,dx = \\int \\frac{\\sin x}{\\cos x}dx = -\\int \\frac{-\\sin x}{\\cos x}dx = -\\int \\frac{1}{\\cos x} d(\\cos x)= -\\ln(\\cos x)$$
      $$因此：\\arctan y = -\\ln(\\cos x) + C。$$
    $$4. 故通解为：y = \\tan(-\\ln(\\cos x) + C)。$$
    $$注意：由于积分区间为 0 < x < \\frac{\\pi}{2}，所以 \\cos x > 0，不需要加绝对值符号。$$`,
        answer: "$y = \\tan(-\\ln(\\cos x) + C)$，其中C为任意常数",
        difficulty: "medium",
        category: "可分离变量的微分方程",
        method: "分离变量法"
    },
    {
      id: 38,
      type: "计算题",
      title: "可分离变量微分方程",
      question: "38.求解微分方程 $\\frac{dy}{dx} = xy^2$，并满足初始条件 $y(1) = 1$",
      explanation: `$$解：$$
        $$1. 这是一个可分离变量的微分方程，可以写成：\\frac{dy}{y^2} = x\\,dx$$
        $$2. 两边积分：\\int \\frac{dy}{y^2} = \\int x\\,dx$$
        $$3. 计算积分：-\\frac{1}{y} = \\frac{x^2}{2} + C$$
        $$4. 解出y：y = -\\frac{1}{\\frac{x^2}{2} + C} = -\\frac{2}{x^2 + 2C}$$
        $$5. 代入初始条件 y(1) = 1：$$
          $$1 = -\\frac{2}{1 + 2C}$$
          $$1 + 2C = -2$$
          $$C = -\\frac{3}{2}$$
        $$6. 代入C值得到特解：y = -\\frac{2}{x^2 - 3} = \\frac{2}{3-x^2}$$
        $$这是满足初始条件的特解。$$`,
        answer: "$y = \\frac{2}{3-x^2}$",
        difficulty: "medium",
        category: "可分离变量的微分方程",
        method: "分离变量法"
    },
    {
        id: 39,
        type: "填空题",
        title: "二阶常系数线性齐次微分方程特征根",
        question: "39.二阶常系数线性齐次微分方程 $y''+4y'+4y=0$ 的特征方程为_______________，其特征根是_______________。",
        explanation: `$$解：$$
    $$二阶常系数线性齐次微分方程的标准形式为 y''+py'+qy=0，其中 p 和 q 为常数。$$
    $$对于给定的微分方程 y''+4y'+4y=0，我们可以看出 p=4 和 q=4。$$
    $$对应的特征方程是 r^2+pr+q=0，即 r^2+4r+4=0。$$
    $$解这个特征方程：$$
    $$r^2+4r+4=0$$
    $$(r+2)^2=0$$
    $$因此，特征根是 r=-2（二重根）。$$`,
        answer: "$r^2+4r+4=0$；$r=-2$（二重根）",
        difficulty: "easy",
        category: "二阶常系数线性微分方程",
        method: "特征方程法"
    },
    {
        id: 40,
        type: "选择题",
        title: "微分方程阶数",
        question: "40.下列微分方程中，属于二阶微分方程的是：A. $y' = 2xy$ B. $y''' + y = \\sin x$ C. $y'' - 3y' + 2y = e^x$ D. $\\frac{d^4y}{dx^4} - y = 0$",
        explanation: `$$微分方程的阶数是指方程中出现的最高阶导数。$$
    $$选项A中最高阶导数是一阶；选项B中最高阶导数是三阶；$$
    $$选项C中最高阶导数是二阶；选项D中最高阶导数是四阶。$$`,
        answer: "C",
        difficulty: "easy",
        category: "微分方程基本概念",
        method: "概念辨析"
    },
    {
      id: 41,
      type: "选择题",
      title: "常微分方程解的判断",
      question: "41. 函数 $y = e^{-x} + Ce^{2x}$ 是下列哪个微分方程的通解？（其中C为任意常数）\nA.$y'' - y' - 2y = 0$\nB.$y'' + y' - 2y = 0$\nC.$y'' - y' - 6y = 0$\nD.$y'' + y' + 2y = 0$",
      explanation: `$$解：$$
      $$由通解形式 y = e^{-x} + Ce^{2x} 可知，特征方程具有两个不同的实根 r_1 = -1 和 r_2 = 2。$$
      $$分析各选项的特征方程：$$
      $$A. r^2 - r - 2 = 0，分解因式得 (r-2)(r+1) = 0，故 r_1 = 2，r_2 = -1，与通解中的指数相符。$$
      $$B. r^2 + r - 2 = 0，分解因式得 (r+2)(r-1) = 0，故 r_1 = -2，r_2 = 1，与通解中的指数不符。$$
      $$C. r^2 - r - 6 = 0，分解因式得 (r-3)(r+2) = 0，故 r_1 = 3，r_2 = -2，与通解中的指数不符。$$
      $$D. r^2 + r + 2 = 0，判别式 \\Delta = 1 - 4 \\times 1 \\times 2 = -7 < 0，有一对共轭复根，不会产生纯指数形式的通解，与通解形式不符。$$
      $$因此，正确答案为 A 选项。$$`,
      answer: "A",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 42,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "42.求解微分方程 $y' - 2y = 4e^{2x}$",
      explanation: `$$解：$$
        $$1. 这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
          $$y' - 2y = 4e^{2x}，其中 P(x) = -2, Q(x) = 4e^{2x}$$
        $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
        $$3. 代入积分：y = e^{-\\int -2 dx} \\left( \\int 4e^{2x} e^{\\int -2 dx} dx + C \\right)$$
        $$4. 计算积分：$$
          $$\\int -2 dx = -2x$$
          $$e^{-\\int -2 dx} = e^{2x}$$
          $$\\int 4e^{2x} e^{\\int -2 dx} dx = \\int 4e^{2x} e^{-2x} dx = \\int 4 dx = 4x$$
        $$5. 代入积分结果：$$
          $$y = e^{2x}(4x + C) = 4xe^{2x} + Ce^{2x}$$
        $$这是该微分方程的通解，其中C为任意常数。$$`,
        answer: "$y = 4xe^{2x} + Ce^{2x}$，其中C为任意常数",
        difficulty: "medium",
        category: "一阶线性微分方程",
        method: "公式法"
    },
    {
      id: 43,
      type: "判断题",
      title: "可分离变量微分方程判断",
      question: "43.微分方程 $\\frac{dy}{dx} = \\frac{x^2}{y^3}$ 是可分离变量的微分方程。",
      explanation: `$$解：$$
    $$判断一个微分方程是否为可分离变量的微分方程，需要观察它是否可以写成如下形式：$$
    $$g(y)\\frac{dy}{dx} = f(x)$$
    $$其中f(x)只包含自变量x的函数，g(y)只包含因变量y的函数。$$
    $$对于给定的微分方程 \\frac{dy}{dx} = \\frac{x^2}{y^3}，我们可以将其变形为：$$
    $$y^3\\frac{dy}{dx} = x^2$$
    $$可以看出，等式左边只包含变量y及其微分，右边只包含变量x，符合可分离变量的特征。$$
    $$因此，该微分方程是可分离变量的微分方程。$$`,
        answer: "对",
        difficulty: "easy",
        category: "可分离变量的微分方程",
        method: "概念理解"
    },

    {
      id: 44,
      type: "选择题",
      title: "齐次微分方程识别",
      question: "44.以下哪个微分方程是齐次微分方程？A. $\\frac{dy}{dx} = \\frac{2x+y}{x+3y}$ B. $\\frac{dy}{dx} = \\frac{2x+3}{4y-5}$ C. $\\frac{dy}{dx} = \\frac{y}{x}+\\sin(x)$ D. $\\frac{dy}{dx} = y - x^2$",
      explanation: `$$解：$$
      $$齐次微分方程的形式是 \\frac{dy}{dx} = f(\\frac{y}{x})，或者可以表示为F(x,y)，其中F(tx,ty) = F(x,y)，即F(x,y)是关于x和y的齐次函数。$$
      $$选项分析：$$
      $$A. \\frac{dy}{dx} = \\frac{2x+y}{x+3y}$$
        $$设F(x,y) = \\frac{2x+y}{x+3y}，则F(tx,ty) = \\frac{2tx+ty}{tx+3ty} = \\frac{2x+y}{x+3y} = F(x,y)，所以是齐次微分方程。$$
      $$B. \\frac{dy}{dx} = \\frac{2x+3}{4y-5}$$
        $$设F(x,y) = \\frac{2x+3}{4y-5}，则F(tx,ty) = \\frac{2tx+3}{4ty-5} \\neq F(x,y)，所以不是齐次微分方程。$$
      $$C. \\frac{dy}{dx} = \\frac{y}{x}+\\sin(x)$$
        $$设F(x,y) = \\frac{y}{x}+\\sin(x)，则F(tx,ty) = \\frac{ty}{tx}+\\sin(tx) = \\frac{y}{x}+\\sin(tx) \\neq F(x,y)，所以不是齐次微分方程。$$
      $$D. \\frac{dy}{dx} = y - x^2$$
        $$设F(x,y) = y - x^2，则F(tx,ty) = ty - (tx)^2 = t(y - tx^2) \\neq F(x,y)，所以不是齐次微分方程。$$
      $$因此，答案是 A。$$`,
      answer: "A",
      difficulty: "medium",
      category: "齐次微分方程",
      method: "齐次性判定"

    },

    {
      id: 45,
      type: "选择题",
      title: "微分方程的通解与特解",
      question: "45.在下列选项中，哪一个是微分方程 $y'-2y=0$ 的通解？A. $y=e^{2x}$ B. $y=Ce^{2x}$，其中$C$为任意常数 C. $y=3e^{2x}$ D. $y=0$",
      explanation: `$$解：$$
      $$通解是微分方程的完整解，包含了任意常数，表示了微分方程的所有解。而特解是特定常数值所对应的解。$$
      $$对于给定的微分方程 y'-2y=0，我们可以将其改写为 y'=2y，这是一个可分离变量的微分方程。$$
      $$分离变量得：\\frac{dy}{y} = 2dx$$
      $$两边积分：\\int \\frac{dy}{y} = \\int 2dx$$
      $$得到：\\ln|y| = 2x + C_1，其中C_1为任意常数$$
      $$两边取自然指数：y = e^{2x + C_1} = e^{C_1} \\cdot e^{2x} = Ce^{2x}，其中C = e^{C_1}为任意非零常数$$
      $$因此，这个微分方程的通解是 y = Ce^{2x}，其中C为任意常数。$$
      $$选项A和C是特解，对应于C=1和C=3的情况。$$
      $$选项D也是特解，对应于C=0的情况。$$
      $$因此，该微分方程的通解是 B. y=Ce^{2x}，其中C为任意常数。$$`,
      answer: "B",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念理解"
    },
    {
      id: 46,
      type: "选择题",
      title: "特征方程法",
      question: "46.二阶常系数齐次线性微分方程 $y'' - 5y' + 6y = 0$ 的通解是：A. $y = C_1e^{2x} + C_2e^{3x}$ B. $y = Ce^{3x}$ C. $y = Ce^{-2x} $ D. $y = C_1e^{2x} + C_2xe^{2x}$",
      explanation: `$$解：对于方程 y'' - 5y' + 6y = 0，其特征方程为 r^2 - 5r + 6 = 0。$$
      $$解得 r_1 = 2，r_2 = 3。$$
      $$因此通解为 y = C_1e^{2x} + C_2e^{3x}。$$`,
      answer: "A",
      difficulty: "easy",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 47,
      type: "判断题",
      title: "微分方程通解",
      question: "47.一阶线性微分方程的通解必定包含且仅包含一个任意常数。",
      explanation: `$$对于一阶微分方程，其通解中包含的任意常数的个数等于方程的阶数。$$
      $$由于一阶线性微分方程的阶数为1，所以其通解中必定包含且仅包含一个任意常数。$$`,
      answer: "对",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念判断"
    },
    {
      id: 48,
      type: "填空题",
      title: "可分离变量的微分方程",
      question: "48.求解微分方程 $\\frac{dy}{dx} = \\frac{y^2}{x^3}$ 的通解为 $y$ = ______   。",
      explanation: `$$解：将方程重写为分离变量的形式：\\frac{dy}{y^2} = \\frac{dx}{x^3}。$$
      $$两边积分：\\int \\frac{dy}{y^2} = \\int \\frac{dx}{x^3}。$$
      $$得到：(-\\frac{1}{y} = -\\frac{1}{2x^2} + C)。$$
      $$整理得：\\frac{1}{y} = \\frac{1}{2x^2} + C，即 y = \\frac{1}{\\frac{1}{2x^2} + C} = \\frac{2x^2}{1 + 2Cx^2}。$$`,
      answer: "$\\frac{2x^2}{1 + 2Cx^2}$",
      difficulty: "medium",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 49,
      type: "选择题",
      title: "微分方程通解形式",
      question: "49.下列微分方程中，哪个的通解一定不包含指数函数形式？\nA.$y'' + 4y = 0$\nB.$y'' - 4y = 0$\nC.$y'' - 2y' + y = 0$\nD.$y'' - y = 0$",
      explanation: `$$解：$$
      $$二阶常系数线性齐次微分方程通解是否含有指数函数可以通过一个简单的判断方法确定：$$
      $$当且仅当微分方程的特征方程具有纯虚根（即没有实部的根）时，通解才是纯三角函数形式，不包含指数函数。$$
      $$快速判断法：对于方程 ay'' + by' + cy = 0，当满足以下两个条件时，通解不含指数函数：$$
      $$1. 一阶导数项不存在（即 b = 0）$$
      $$2. 二阶导数项系数与函数项系数同号（即 a·c > 0）$$
      $$对各选项逐一分析：$$
      $$A: y'' + 4y = 0，无一阶导数项，且二阶导数与函数项系数同号（均为正），满足条件。$$
      $$特征方程 r^2 + 4 = 0 的根为 r = ±2i（纯虚根），通解为 y = C_1\\cos(2x) + C_2\\sin(2x)，不含指数函数。$$
      $$B: y'' - 4y = 0，无一阶导数项，但二阶导数与函数项系数异号，不满足条件。$$
      $$特征方程 r^2 - 4 = 0 的根为 r = ±2（实根），通解包含指数函数。$$
      $$C: y'' - 2y' + y = 0，有一阶导数项，不满足条件。$$
      $$特征方程 r^2 - 2r + 1 = 0 的根为 r = 1（重根），通解包含指数函数。$$
      $$D: y'' - y = 0，无一阶导数项，但二阶导数与函数项系数异号，不满足条件。$$
      $$特征方程 r^2 - 1 = 0 的根为 r = ±1（实根），通解包含指数函数。$$
      $$因此，只有选项 A 的通解一定不包含指数函数形式。$$`,
      answer: "A",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程系数判别法"
    },

    {
      id: 50,
      type: "选择题",
      title: "微分方程通解任意常数个数",
      question: "50.下列微分方程中，其通解包含两个任意常数的是：A. $y' + y = 0$ B. $y'' - y = 0$ C. $\\frac{dy}{dx} = \\frac{x}{y}$ D. $y''' = 0$",
      explanation: `$$解：微分方程的通解中包含的任意常数个数等于方程的阶数。$$
      $$A：y' + y = 0是一阶微分方程，通解包含一个任意常数。$$
      $$B：y'' - y = 0是二阶微分方程，通解包含两个任意常数。$$
      $$C：\\frac{dy}{dx} = \\frac{x}{y}是一阶微分方程，通解包含一个任意常数。$$
      $$D：y''' = 0是三阶微分方程，通解包含三个任意常数。$$`,
      answer: "B",
      difficulty: "easy",
      category: "微分方程基本概念",
      method: "概念辨析"
    },

    {
      id: 51,
      type: "计算题",
      title: "一阶线性微分方程",
      question: "51.求解微分方程 $y' + \\frac{2}{x-1}y = e^x$，$x > 1$",
      explanation: `$$解：$$
      $$1. 首先将方程整理为标准形式：$$
      $$y' + \\frac{2}{x-1}y = e^x$$
      $$这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
      $$其中 P(x) = \\frac{2}{x-1}, Q(x) = e^x$$
      $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
      $$3. 代入积分：y = e^{-\\int \\frac{2}{x-1} dx} \\left( \\int e^x e^{\\int \\frac{2}{x-1} dx} dx + C \\right)$$
      $$4. 计算积分：$$
      $$\\int \\frac{2}{x-1} dx = 2\\ln|x-1|$$
      $$e^{-\\int \\frac{2}{x-1} dx} = e^{-2\\ln|x-1|} = \\frac{1}{(x-1)^2}$$
      $$e^{\\int \\frac{2}{x-1} dx} = e^{2\\ln|x-1|} = (x-1)^2$$
      $$\\int e^x e^{\\int \\frac{2}{x-1} dx} dx = \\int e^x (x-1)^2 dx$$
      $$5. 计算积分 \\int e^x (x-1)^2 dx：$$
      $$\\int e^x (x-1)^2 dx = \\int e^x (x^2 - 2x + 1) dx = \\int e^x x^2 dx - 2\\int e^x x dx + \\int e^x dx$$
      $$= \\int x^2 de^x - 2\\int e^x x dx + \\int e^x dx$$
      $$= (e^x x^2 - 2\\int e^x x dx)  - 2\\int e^x x dx + \\int e^x dx$$
      $$= e^x x^2 - 4\\int e^x x dx + e^x$$
      $$= e^x x^2 - 4\\int x de^x + e^x$$
      $$= (e^x x^2 - 4(e^x x - \\int e^x dx)) + e^x$$
      $$= e^x x^2 - 4e^x x + 4e^x + e^x$$
      $$= e^x (x^2 - 4x + 5)$$
      $$6. 代入积分结果：$$
      $$y = e^{-\\int \\frac{2}{x-1} dx} \\left( \\int e^x e^{\\int \\frac{2}{x-1} dx} dx + C \\right)$$
      $$= \\frac{1}{(x-1)^2}\\left( e^x (x^2 - 4x + 5) + C \\right)$$
      $$=\\frac{e^x(x^2 - 4x + 5) + C}{(x-1)^2}$$
      $$这是该微分方程的通解，其中C为任意常数，适用于x > 1的情况。$$`,
      answer: "$y = \\frac{e^x(x^2 - 4x + 5) + C}{(x-1)^2}$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },

    {
      id: 52,
      type: "选择题",
      title: "特殊函数的微分方程",
      question: "52.下列哪个函数是微分方程 $y'' + y = 0$ 的解？\nA.$y = e^x$\nB.$y = \\sin x$\nC.$y = x^2$\nD.$y = \\ln x$",
      explanation: `$$解：$$
      $$微分方程 y'' + y = 0 的特征方程为 r^2 + 1 = 0，解得 r = \\pm i。$$
      $$因此，该微分方程的通解为 y = C_1\\cos x + C_2\\sin x。$$
      
      $$任何解必须是 \\cos x 和 \\sin x 的线性组合。快速判断各选项：$$
      
      $$A: y = e^x 不是 \\cos x 和 \\sin x 的线性组合，不是解。$$
      $$也可通过代入验证：y = e^x，y' = e^x，y'' = e^x。代入原方程得 e^x + e^x = 2e^x \\neq 0，不是解。$$
      
      $$B: y = \\sin x 是原方程通解中的一个基本解，所以是解。$$
      $$代入验证：y = \\sin x，y' = \\cos x，y'' = -\\sin x。代入原方程得 -\\sin x + \\sin x = 0，是解。$$
      
      $$C: y = x^2 不是 \\cos x 和 \\sin x 的线性组合，不是解。$$
      $$代入验证：y = x^2，y' = 2x，y'' = 2。代入原方程得 2 + x^2 \\neq 0，不是解。$$
      
      $$D: y = \\ln x 不是 \\cos x 和 \\sin x 的线性组合，不是解。$$
      $$代入验证：y = \\ln x，y' = \\frac{1}{x}，y'' = -\\frac{1}{x^2}。代入原方程得 -\\frac{1}{x^2} + \\ln x \\neq 0，不是解。$$
      
      $$因此，正确答案为 B。$$`,
      answer: "B",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程和通解形式判断法"
    },
    {
      id: 53,
      type: "判断题",
      title: "二阶齐次微分方程解的组合",
      question: "53.若$y_1(x)$和$y_2(x)$是二阶齐次微分方程的两个解，则$y = 3y_1(x) - 2y_2(x)$也是该方程的解。",
      explanation: `$$解：二阶齐次线性微分方程的一般形式为 a(x)y'' + b(x)y' + c(x)y = 0。$$
      $$此类方程具有线性叠加性质，即若y_1和y_2是方程的解，则它们的线性组合C_1y_1 + C_2y_2（其中C_1和C_2为常数）也是方程的解。$$
      $$因此，y = 3y_1(x) - 2y_2(x)作为y_1和y_2的线性组合，也是原方程的解。$$`,
      answer: "对",
      difficulty: "easy",
      category: "二阶常系数微分方程",
      method: "性质判断"
    },
    {
      id: 54,
      type: "填空题",
      title: "二阶常系数线性微分方程",
      question: "54.求微分方程 $y'' + 4y = 0$ 的通解。",
      explanation: `$$解：对于二阶常系数线性齐次微分方程 y'' + 4y = 0：$$
      $$1. 特征方程为 r^2 + 4 = 0$$
      $$2. 求特征根：r = \\pm 2i$$
      $$3. 由于特征根是一对共轭复数 \\alpha \\pm \\beta i，其中 \\alpha = 0, \\beta = 2$$
      $$4. 通解形式为：y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$$
      $$5. 代入得：y = e^{0 \\cdot x}(C_1\\cos 2x + C_2\\sin 2x) = C_1\\cos 2x + C_2\\sin 2x$$
      $$其中 C_1 和 C_2 是任意常数。$$`,
      answer: "$y = C_1\\cos 2x + C_2\\sin 2x$，其中 $C_1$ 和 $C_2$ 为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 55,
      type: "判断题",
      title: "二阶常系数齐次线性微分方程",
      question: "55.对于方程 $y'' - 4y' + 4y = 0$，函数 $y = xe^{2x}$ 是它的一个解。",
      explanation: `$$解：$$
      $$特征方程判断法$$
      $$对于微分方程 y'' - 4y' + 4y = 0，其特征方程为 r^2 - 4r + 4 = 0，即 (r-2)^2 = 0。$$
      $$解得 r = 2 是一个二重根。当特征方程有二重根 r 时，通解形式为 y = C_1e^{rx} + C_2xe^{rx}。$$
      $$代入 r = 2，得通解为 y = C_1e^{2x} + C_2xe^{2x}。$$
      $$因此，y = xe^{2x} 对应于通解中 C_1 = 0，C_2 = 1 的特解，确实是该微分方程的一个解。$$`,
      answer: "对",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 56,
      type: "选择题",
      title: "特殊解",
      question: "56.微分方程 $y' = \\frac{y}{x}$ 的所有解是：A. $y = Cx$，其中$C$是任意常数B. $y = Ce^x$，其中$C$是任意常数C. $y = C\\sin x$，其中$C$是任意常数D. $y = C + x$，其中$C$是任意常数",
      explanation: `$$解：将方程写为分离变量的形式：\\frac{dy}{y} = \\frac{dx}{x}。$$
      $$两边积分：\\ln|y| = \\ln|x| + \\ln C，其中C是任意常数。$$
      $$化简得：y = Cx，其中C是任意常数。$$`,
      answer: "A",
      difficulty: "easy",
      category: "可分离变量的微分方程",
      method: "分离变量法"
    },
    {
      id: 57,
      type: "计算题",
      title: "一阶线性微分方程的通解",
      question: "57.求解一阶线性微分方程 $y' + 2y = 1$ 的通解",
      explanation: `$$解：$$
      $$1. 首先将方程整理为标准形式：$$
      $$y' + 2y = 1$$
      $$这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
      $$y' + 2y = 1，其中 P(x) = 2, Q(x) = 1$$
      $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
      $$3. 代入积分：y = e^{-\\int 2 dx} \\left( \\int 1 \\cdot e^{\\int 2 dx} dx + C \\right)$$
      $$4. 计算积分：$$
      $$\\int 2 dx = 2x$$
      $$e^{-\\int 2 dx} = e^{-2x}$$
      $$\\int 1 \\cdot e^{\\int 2 dx} dx = \\int e^{2x} dx = \\frac{1}{2}e^{2x} + C$$
      $$5. 代入积分结果：$$
      $$y = e^{-2x} \\left( \\frac{1}{2}e^{2x} + C \\right) = \\frac{1}{2} + Ce^{-2x}$$
      $$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = \\frac{1}{2} + Ce^{-2x}$，其中C为任意常数",
      difficulty: "easy",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 58,
      type: "选择题",
      title: "二阶常系数线性微分方程的通解类型",
      question: "58.二阶常系数线性微分方程 $y'' + 2y' + 10y = 0$ 的通解是：A. $y = C_1e^{r_1x} + C_2e^{r_2x}$，其中$r_1 \\neq r_2$且均为实数  B. $y = (C_1 + C_2x)e^{rx}$，其中$r$为实数  C. $y = e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$，其中$\\alpha, \\beta$为实数且$\\beta \\neq 0$  D. $y = C_1x + C_2$",
      explanation: `$$解：方程y'' + 2y' + 10y = 0的特征方程是r^2 + 2r + 10 = 0。$$
      $$计算判别式：\\Delta = 2^2 - 4 \\cdot 1 \\cdot 10 = 4 - 40 = -36 < 0。$$
      $$由于判别式小于0，特征方程有一对共轭复根：r = -1 \\pm 3i。$$
      $$因此，通解形式为y = e^{-x}(C_1\\cos 3x + C_2\\sin 3x)，属于C选项的形式。$$`,
      answer: "C",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 59,
      type: "计算题",
      title: "二阶常系数线性齐次微分方程",
      question: "59.求 $y'' - 2y' - 3y = 0$ 的通解",
      explanation: `$$解：$$
      $$1. 特征方程为 r^2 - 2r - 3 = 0$$
      $$2. 求解特征根：$$
      $$ (r+1)(r-3) = 0$$
      $$特征根为 r_1 = -1，r_2 = 3$$
      $$3. 通解形式：$$
      $$y = C_1e^{r_1x} + C_2e^{r_2x}$$
      $$4. 代入特征根：$$
      $$y = C_1e^{-x} + C_2e^{3x}$$
      $$因此，方程 y'' - 2y' - 3y = 0 的通解为 y = C_1e^{-x} + C_2e^{3x}，其中 C_1 和 C_2 为任意常数。$$`,
      answer: "$y = C_1e^{-x} + C_2e^{3x}$，其中 $C_1$ 和 $C_2$ 为任意常数",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },

    {
      id: 60,
      type: "计算题",
      title: "二阶常系数线性微分方程",
      question: "60.求微分方程 $y'' - 6y' + 13y = 0$ 的通解",
      explanation: `$$解：特征方程为 r^2 - 6r + 13 = 0$$
      $$特征根为 r = 3 \\pm 2i$$
      $$通解为 y = e^{3x}(C_1\\cos 2x + C_2\\sin 2x)$$`,
      answer: "$y = e^{3x}(C_1\\cos 2x + C_2\\sin 2x)$",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 61,
      type: "计算题",
      title: "二阶常系数线性齐次微分方程初值问题",
      question: "61.求解微分方程 $y'' - 5y' + 6y = 0$，满足初始条件 $y(0) = 1, y'(0) = 4$",
      explanation: `$$解：对于齐次微分方程 y'' - 5y' + 6y = 0，先求特征方程：$$
      $$r^2 - 5r + 6 = 0$$
      $$(r-2)(r-3) = 0$$
      $$特征根 r_1 = 2 和 r_2 = 3$$
      $$因此通解为：y = C_1e^{2x} + C_2e^{3x}$$
      $$求导得：y' = 2C_1e^{2x} + 3C_2e^{3x}$$
      $$代入初始条件 y(0) = 1 到通解中：$$
      $$y(0) = C_1e^{2·0} + C_2e^{3·0} = C_1 + C_2 = 1 \\quad (1)$$
      $$代入初始条件 y'(0) = 4 到导数表达式中：$$
      $$y'(0) = 2C_1e^{2·0} + 3C_2e^{3·0} = 2C_1 + 3C_2 = 4 \\quad (2)$$
      $$联立方程组(1)和(2)：$$
      $$\\begin{cases}
      C_1 + C_2 = 1\\\\
      2C_1 + 3C_2 = 4
      \\end{cases}$$
      $$解得：C_1 = -1, C_2 = 2$$
      $$所以特解为：y = -e^{2x} + 2e^{3x}$$`,
      answer: "$y = -e^{2x} + 2e^{3x}$",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 62,
      type: "选择题",
      title: "微分方程通解与特解的关系",
      question: "62.若 $y_1 = x$ 是微分方程 $y'' + py' + qy = 0$ 的一个解，则下列哪个说法正确： A. $y_2 = x^2$ 也必定是该方程的一个解   B. $y_2 = x\\ln x$ 也必定是该方程的一个解  C. $y_2 = e^x$ 也必定是该方程的一个解  D. 以上都不对",
      explanation: `$$解：已知一个解 y_1 = x，要判断其他函数是否也是解，需要确定原微分方程。$$
      $$步骤1：计算已知解的导数$$
      $$y_1 = x，y_1' = 1，y_1'' = 0$$
      $$步骤2：代入原方程确定参数$$
      $$y_1'' + py_1' + qy_1 = 0$$
      $$0 + p \\cdot 1 + q \\cdot x = 0$$
      $$对任意x恒成立，必须有 p = 0 且 q = 0$$
      $$步骤3：确定完整方程$$
      $$原方程简化为 y'' = 0，只需要验证选项是否满足 y'' = 0$$
      $$步骤4：检验各选项$$
      $$A选项：y_2 = x^2，y_2'' = 2 \\neq 0，不是方程的解$$
      $$B选项：y_2 = x\\ln x，y_2'' \\neq 0，不是方程的解$$
      $$C选项：y_2 = e^x，y_2'' = e^x \\neq 0，不是方程的解$$
      $$D选项：以上都不对$$
      $$综上所述，ABC选项均不正确。$$`,
      answer: "D",
      difficulty: "medium",
      category: "微分方程基本概念",
      method: "解的性质判断"
    },

    {
      id: 63,
      type: "计算题",
      title: "二阶常系数线性齐次微分方程初值问题",
      question: "63.求微分方程 $y'' - 2y' + y = 0$ 满足初始条件 $y(0) = 1$, $y'(0) = 3$ 的特解",
      explanation: `$$解：对于齐次微分方程 y'' - 2y' + y = 0，先求特征方程：$$
      $$r^2 - 2r + 1 = 0$$
      $$(r-1)^2 = 0$$
      $$特征根 r_1 = r_2 = 1（二重根）$$
      $$因此通解为：y = (C_1 + C_2x)e^x$$
      $$求导得：y' = C_1e^x + C_2e^x + C_2xe^x = (C_1 + C_2 + C_2x)e^x$$
      $$代入初始条件 y(0) = 1 到通解中：$$
      $$y(0) = (C_1 + C_2 \\cdot 0)e^0 = C_1 = 1 \\quad (1)$$
      $$代入初始条件 y'(0) = 3 到导数表达式中：$$
      $$y'(0) = (C_1 + C_2 + C_2 \\cdot 0)e^0 = C_1 + C_2 = 3 \\quad (2)$$
      $$联立方程组(1)和(2)：$$
      $$\\begin{cases}C_1 = 1\\\\C_1 + C_2 = 3\\end{cases}$$
      $$解得：C_1 = 1, C_2 = 2$$
      $$所以特解为：y = (1 + 2x)e^x$$`,
      answer: "$y = (1 + 2x)e^x$",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 64,
      type: "计算题",
      title: "二阶常系数线性齐次微分方程求解",
      question: "64.求方程$y'' + 4y' + 4y = 0$的通解。",
      explanation: `$$解：特征方程r^2 +4r +4=0，解得r=-2（二重根）$$
      $$通解为：y = (C_1 + C_2x)e^{-2x}$$`,
      answer: "$y = (C_1 + C_2x)e^{-2x}$",
      difficulty: "medium",
      category: "二阶常系数线性微分方程",
      method: "特征方程法"
    },
    {
      id: 65,
      type: "计算题",
      title: "一阶线性方程",
      question: "65.求解微分方程$\\frac{dy}{dx} + y = 2x$。",
      explanation: `$$解：$$
      $$1. 首先将方程整理为标准形式：$$
        $$y' + y = 2x$$
        $$这是一阶线性微分方程，标准形式为 y' + P(x)y = Q(x)，$$
        $$y' + y = 2x，其中 P(x) = 1, Q(x) = 2x$$
      $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
      $$3. 代入积分：y = e^{-\\int 1 dx} \\left( \\int 2x e^{\\int 1 dx} dx + C \\right)$$
      $$4. 计算积分：$$
        $$\\int 1 dx = x$$
        $$e^{-\\int 1 dx} = e^{-x}$$
        $$\\int 2x e^{\\int 1 dx} dx = \\int 2x e^{x} dx$$
        $$= 2 \\int x e^{x} dx =2 \\int x d e^{x}$$
        $$= 2 \\left( xe^{x} - \\int e^{x} dx \\right) = 2(xe^{x} - e^{x}) + C = 2(x-1)e^{x} + C$$
      $$5. 代入积分结果：$$
        $$y = e^{-x} \\left( 2(x-1)e^{x} + C \\right) = 2x - 2 + Ce^{-x}$$
      $$这是该微分方程的通解，其中C为任意常数。$$`,
      answer: "$y = 2x - 2 + Ce^{-x}$，其中C为任意常数",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    },
    {
      id: 66,
      type: "判断题",
      title: "解的存在性验证",
      question: "66.验证函数$y = e^{2x}$是否是微分方程$y'' - 4y = 0$的解。",
      explanation: `$$解：计算y = e^{2x}的二阶导数：$$
      $$y' = 2e^{2x}, y'' = 4e^{2x}$$
      $$代入方程：y'' -4y = 4e^{2x} -4e^{2x} = 0$$
      $$等式成立，故y = e^{2x}是解。$$`,
      answer: "正确",
      difficulty: "easy",
      category: "验证解",
      method: "基本概念"
    },
    {
      id: 67,
      type: "计算题",
      title: "一阶线性微分方程特解",
      question: "67.求方程 $y' + 3y = e^{-2x}$ 满足初始条件 $y|_{x=0} = 0$ 的特解",
      explanation: `$$解：$$
      $$1. 这是一阶线性微分方程，标准形式为：y' + P(x)y = Q(x)$$
        $$其中 P(x) = 3，Q(x) = e^{-2x}$$
      $$2. 使用公式法求解线性微分方程：y = e^{-\\int P(x)dx} \\left(\\int Q(x)e^{\\int P(x)dx}dx + C\\right)$$
      $$3. 代入积分：y = e^{-\\int 3 dx} \\left( \\int e^{-2x} e^{\\int 3 dx} dx + C \\right)$$
      $$4. 计算积分：$$
        $$\\int 3 dx = 3x$$
        $$e^{-\\int 3 dx} = e^{-3x}$$
        $$\\int e^{-2x} e^{\\int 3 dx} dx = \\int e^{-2x} e^{3x} dx = \\int e^{x} dx = e^{x} + C$$
      $$5. 代入积分结果：$$
        $$y = e^{-3x}(e^{x} + C) = e^{-2x} + Ce^{-3x}$$
      $$6. 代入初始条件 y|_{x=0} = 0：$$
        $$y|_{x=0} = e^{0} + Ce^{0} = 1 + C = 0$$
        $$C = -1$$
      $$7. 特解为：$$
        $$y = e^{-2x} - e^{-3x}$$`,
      answer: "$y = e^{-2x} - e^{-3x}$",
      difficulty: "medium",
      category: "一阶线性微分方程",
      method: "公式法"
    }
    ]
    };



