
window.exerciseData = {
  title: "不定积分知识点整理",
  knowledgePoints: [
  {
    title: "原函数与导函数关系",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 16px; line-height: 1.6;">
        <div class="formula-vert" style="flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 250px;">
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #f0f5ff; border-radius: 4px; border-left: 4px solid #3a7bd5;">$F(x) \\stackrel{\\text{求导或微分}}{\\longrightarrow} f(x) \\stackrel{\\text{求导或微分}}{\\longrightarrow} f'(x)$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #e1f5fe; border-radius: 4px; border-left: 4px solid #00c6ff;">$\\text{原函数} \\stackrel{\\text{求导或微分}}{\\longrightarrow} \\text{导函数} \\stackrel{\\text{求导或微分}}{\\longrightarrow} \\text{导函数的导函数}$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #f0f5ff; border-radius: 4px; border-left: 4px solid #3a7bd5;">$f'(x) \\stackrel{\\text{求积分}}{\\longrightarrow} f(x)+ C \\stackrel{\\text{求积分}}{\\longrightarrow} F(x) + C$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #e1f5fe; border-radius: 4px; border-left: 4px solid #00c6ff;">$\\text{导函数的导函数} \\stackrel{\\text{求积分}}{\\longrightarrow} \\text{导函数}+ C \\stackrel{\\text{求积分}}{\\longrightarrow} \\text{原函数}+ C$</div>
        </div>
        <div class="formula-vert" style="flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 250px;">
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #f3e5f5; border-radius: 4px; border-left: 4px solid #8e44ad;">$dF(x)=f(x)dx\\stackrel{\\text{求微分}}{\\longrightarrow} d\\text{原函数}=\\text{导函数}dx$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #f3e5f5; border-radius: 4px; border-left: 4px solid #8e44ad;">$df(x)=f'(x)dx\\stackrel{\\text{求微分}}{\\longrightarrow}d\\text{导函数}=\\text{导函数的导函数}dx$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #eaf4ff; border-radius: 4px; border-left: 4px solid #2980b9;">$\\int f(x) dx=F(x)+C\\stackrel{\\text{求积分}}{\\longrightarrow} \\int \\text{导函数} dx=\\text{原函数}+C$</div>
          <div style="text-align: center; font-size: 1rem; padding: 10px; background: #eaf4ff; border-radius: 4px; border-left: 4px solid #2980b9;">$\\int f'(x) dx=f(x)+C\\stackrel{\\text{求积分}}{\\longrightarrow}\\int \\text{导函数的导函数} dx=\\text{导函数}+C$</div>
        </div>
      </div>
    </div>
</div >
  `
  },
  {
    title: "不定积分的概念",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #59a14f; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">

      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">原函数定义</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #59a14f;">若存在函数 $F(x)$，使得对任意 $x \\in I$，都有 $F^{\\prime}(x)=f(x)$，则称 $F(x)$ 是 $f(x)$ 的一个原函数。</li>
          </ul>
        </li>
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">不定积分定义</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #59a14f;">$f(x)$ 的所有原函数的全体称为 $f(x)$ 在 $I$ 上的不定积分，记作：$\\int f(x) dx$，其中 $f(x)$ 是被积函数，$x$ 是积分变量。</li>
          </ul>
        </li>
        <li>
          <strong style="display: block; margin-bottom: 5px;">不定积分的一般形式</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #59a14f; margin-bottom: 10px;">若 $F(x)$ 是 $f(x)$ 的一个原函数，则 $\\int f(x) \\, dx = F(x) + C$，$x \\in I$。这里：</li>
            <li style="padding: 10px; background: #e3f2fd; border-radius: 4px; border-left: 3px solid #1e88e5;">
              <ul style="display: flex; flex-wrap: wrap; justify-content: space-around; list-style: none; padding: 0; margin: 0; font-family: 'Comic Sans MS', cursive; font-size: 1.2rem; color: #ff4500;">
                <li style="margin: 3px 8px;">∫ 代表积分符号</li>
                <li style="margin: 3px 8px;">f(x) 是被积函数</li>
                <li style="margin: 3px 8px;">dx 是积分变量</li>
                <li style="margin: 3px 8px;">C 是积分常数</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</div >
  `
  },
  {
    title: "不定积分的性质",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #f28e2c; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">性质1：不定积分与微分运算的逆关系</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 6px 10px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c; margin-bottom: 6px;">不定积分的导数：$[\\int f(x) dx]^{\\prime}=f(x)$</li>
            <li style="padding: 6px 10px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c;">原函数的积分：$\\int F^{\\prime}(x) dx=F(x)+C$</li>
          </ul>
        </li>
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">性质2：常数因子可以提到积分号前面</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c;">$\\int k f(x) dx=k \\int f(x) dx$，其中 $k$ 为常数</li>
          </ul>
        </li>
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">性质3：积分的线性性质</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #f28e2c;">$\\int[f_1(x) \\pm f_2(x)] dx=\\int f_1(x) dx \\pm \\int f_2(x) dx$</li>
          </ul>
        </li>
        <li>
          <strong style="display: block; margin-bottom: 5px;">不定积分的几何意义</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825;">若 $F^{\\prime}(x)=f(x)$，则曲线 $y=F(x)$ 是 $f(x)$ 的一条积分曲线。不定积分 $\\int f(x) dx=F(x)+C$ 表示一族积分曲线，这些曲线只相差常数 $C$。</li>
          </ul>
        </li>
      </ul>
    </div>
</div >
  `
  },
  {
    title: "不定积分的基本公式 (一)",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <div style="overflow-x: auto;">
        <table width="100%" style="width:100%; border-collapse:collapse; min-width: 600px;">
          <thead>
            <tr style="background-color: #f0f5ff; text-align: center; border-bottom: 2px solid #4e79a7;">
              <th style="padding: 10px 8px; font-weight: 600;">复合形式</th>
              <th style="padding: 10px 8px; font-weight: 600;">基本形式</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应微分</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应导数</th>  
            </tr>
          </thead>
          <tbody>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int k d[f(x)]=k f(x)+C$</td>
              <td style="padding: 8px;">$\\int k dx=k x+C$</td>
              <td style="padding: 8px;">$d k x = kdx$</td>
              <td style="padding: 8px;">$\\frac{d k x}{dx} = k$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int [f(x)]^{n} d[f(x)]=\\frac{[f(x)] ^ { n+ 1}}{n + 1}+C$</td>
              <td style="padding: 8px;">$\\int x^{n} dx=\\frac{x ^ { n+ 1}}{n + 1}+C$</td>
              <td style="padding: 8px;">$d(x)^n = n(x)^{n - 1}dx$</td>
              <td style="padding: 8px;">$\\frac{d(x) ^ n}{dx} = n(x)^{n - 1}$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\frac{1}{[f(x)]} d[f(x)]=\\ln |f(x)|+C$</td>
              <td style="padding: 8px;">$\\int \\frac{1}{x} dx=\\ln |x|+C$</td>
              <td style="padding: 8px;">$d\\ln x = \\frac{1}{x}dx$</td>
              <td style="padding: 8px;">$\\frac{d\\ln x}{dx} = \\frac{1}{x}$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\sin[f(x)] d[f(x)]=-\\cos[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\sin x dx=-\\cos x+C$</td>
              <td style="padding: 8px;">$d\\cos x = -\\sin x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\cos x}{dx} = -\\sin x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\cos[f(x)] d[f(x)]=\\sin[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\cos x dx=\\sin x+C$</td>
              <td style="padding: 8px;">$d\\sin x = \\cos x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\sin x}{dx} = \\cos x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\frac{1}{1 + [f(x)] ^ 2} d[f(x)]=\\arctan[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\frac{1}{1 + x ^ 2} dx=\\arctan x+C$</td>
              <td style="padding: 8px;">$d\\arctan x = \\frac{1}{1 + x ^ 2}dx$</td>
              <td style="padding: 8px;">$\\frac{d\\arctan x}{dx} = \\frac{1}{1 + x ^ 2}$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int e^{[f(x)]} d[f(x)]=e^{[f(x)]}+C$</td>
              <td style="padding: 8px;">$\\int e^x dx=e^x+C$</td>
              <td style="padding: 8px;">$d e^x = e^x dx$</td>
              <td style="padding: 8px;">$\\frac{d e^x}{dx} = e^x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px; line-height: 3.0; background-color: #fafafa;">
              <td style="padding: 8px;">$\\int a^{[f(x)]} d[f(x)]=\\frac{a ^ { [f(x)]}}{\\ln a}+C$</td>
              <td style="padding: 8px;">$\\int a^x dx=\\frac{a ^ x}{\\ln a}+C$</td>
              <td style="padding: 8px;">$d a^x = a^x \\ln a dx$</td>
              <td style="padding: 8px;">$\\frac{d a^x}{dx} = a^x \\ln a$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div >
  `
  },
  {
    title: "不定积分的基本公式 (二)",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <div style="overflow-x: auto;">
        <table width="100%" style="width:100%; border-collapse:collapse; min-width: 600px;">
          <thead>
            <tr style="background-color: #f0f5ff; text-align: center; border-bottom: 2px solid #4e79a7;">
              <th style="padding: 10px 8px; font-weight: 600;">复合形式</th>
              <th style="padding: 10px 8px; font-weight: 600;">基本形式</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应微分</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应导数</th>
            </tr>
          </thead>
          <tbody>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\sec^2[f(x)] d[f(x)]=\\tan[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\sec^2 x dx=\\tan x+C$</td>
              <td style="padding: 8px;">$d\\tan x = \\sec^2 x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\tan x}{dx} = \\sec^2 x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\csc^2[f(x)] d[f(x)]=-\\cot[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\csc^2 x dx=-\\cot x+C$</td>
              <td style="padding: 8px;">$d\\cot x = -\\csc^2 x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\cot x}{dx} = -\\csc^2 x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\sec[f(x)] \\tan[f(x)] d[f(x)]=\\sec[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\sec x \\tan x dx=\\sec x+C$</td>
              <td style="padding: 8px;">$d\\sec x = \\sec x \\tan x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\sec x}{dx} = \\sec x \\tan x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\csc[f(x)] \\cot[f(x)] d[f(x)]=-\\csc[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\csc x \\cot x dx=-\\csc x+C$</td>
              <td style="padding: 8px;">$d\\csc x = -\\csc x\\cot x dx$</td>
              <td style="padding: 8px;">$\\frac{d\\csc x}{dx} = -\\csc x\\cot x$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">$\\int \\frac{1}{\\sqrt{1 - [f(x)] ^ 2}} d[f(x)]=\\arcsin[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int \\frac{1}{\\sqrt{1 - x ^ 2}} dx=\\arcsin x+C$</td>
              <td style="padding: 8px;">$d\\arcsin x = \\frac{1}{\\sqrt{1 - x ^ 2}} dx$</td>
              <td style="padding: 8px;">$\\frac{d\\arcsin x}{dx} = \\frac{1}{\\sqrt{1 - x ^ 2}}$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa;">
              <td style="padding: 8px;">$\\int -\\frac{1}{\\sqrt{1 - [f(x)] ^ 2}} d[f(x)]=\\arccos[f(x)]+C$</td>
              <td style="padding: 8px;">$\\int -\\frac{1}{\\sqrt{1 - x ^ 2}} dx=\\arccos x+C$</td>
              <td style="padding: 8px;">$d\\arccos x = -\\frac{1}{\\sqrt{1 - x ^ 2}} dx$</td>
              <td style="padding: 8px;">$\\frac{d\\arccos x}{dx} = -\\frac{1}{\\sqrt{1 - x ^ 2}}$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div >
  `
  },
  { 
    title: "不定积分特例：f(x)=x+c的情况",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #76b7b2; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <div style="overflow-x: auto;">
        <table width="100%" style="width:100%; border-collapse:collapse; min-width: 500px;">
          <thead>
            <tr style="background-color: #f0f5ff; text-align: center; border-bottom: 2px solid #76b7b2;">
              <th style="padding: 10px 8px; font-weight: 600;">积分公式</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应微分</th>
            </tr>
          </thead>
          <tbody>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int k (x+c) dx = kx + C$</td>
              <td style="padding: 8px;">$d k (x+c) = kdx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int (x+c)^n dx = \\frac{(x + c) ^ { n+ 1}}{n + 1} + C$</td>
              <td style="padding: 8px;">$d (x+c)^{n + 1} = (n+1)(x+c)^n dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\frac{1}{x + c} dx = \\ln|x+c| + C$</td>
              <td style="padding: 8px;">$d \\ln|x+c| = \\frac{1}{x + c} dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\sin(x+c) dx = -\\cos(x+c) + C$</td>
              <td style="padding: 8px;">$d -\\cos(x+c) = \\sin(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\cos(x+c) dx = \\sin(x+c) + C$</td>
              <td style="padding: 8px;">$d \\sin(x+c) = \\cos(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\frac{1}{1 + (x + c) ^ 2} dx = \\arctan(x+c) + C$</td>
              <td style="padding: 8px;">$d \\arctan(x+c) = \\frac{1}{1 + (x + c) ^ 2} dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int e^{x + c} dx = e^{x + c} + C$</td>
              <td style="padding: 8px;">$d e^{x + c} = e^{x + c} dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int a^{x + c} dx = \\frac{a ^ { x+ c}}{\\ln a} + C$</td>
              <td style="padding: 8px;">$d \\frac{a ^ { x+ c}}{\\ln a} = a^{x + c} \\ln a dx$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div >
  `
  },
  { 
    title: "不定积分特例：f(x)=x+c的情况",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #76b7b2; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <div style="overflow-x: auto;">
        <table width="100%" style="width:100%; border-collapse:collapse; min-width: 500px;">
          <thead>
            <tr style="background-color: #f0f5ff; text-align: center; border-bottom: 2px solid #76b7b2;">
              <th style="padding: 10px 8px; font-weight: 600;">积分公式</th>
              <th style="padding: 10px 8px; font-weight: 600;">对应微分</th>
            </tr>
          </thead>
          <tbody>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\sec^2(x+c) dx = \\tan(x+c) + C$</td>
              <td style="padding: 8px;">$d \\tan(x+c) = \\sec^2(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\csc^2(x+c) dx = -\\cot(x+c) + C$</td>
              <td style="padding: 8px;">$d -\\cot(x+c) = \\csc^2(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\sec(x+c) \\tan(x+c) dx = \\sec(x+c) + C$</td>
              <td style="padding: 8px;">$d \\sec(x+c) = \\sec(x+c) \\tan(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\csc(x+c) \\cot(x+c) dx = -\\csc(x+c) + C$</td>
              <td style="padding: 8px;">$d -\\csc(x+c) = \\csc(x+c) \\cot(x+c) dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int \\frac{1}{\\sqrt{1 - (x + c) ^ 2}} dx = \\arcsin(x+c) + C$</td>
              <td style="padding: 8px;">$d \\arcsin(x+c) = \\frac{1}{\\sqrt{1 - (x + c) ^ 2}} dx$</td>
            </tr>
            <tr class="formula-row" style="font-size: 16px;line-height: 3.0; background-color: #fafafa;">
              <td style="padding: 8px;">当 $f(x)=x+c$ 时：$\\int -\\frac{1}{\\sqrt{1 - (x + c) ^ 2}} dx = \\arccos(x+c) + C$</td>
              <td style="padding: 8px;">$d -\\arccos(x+c) = -\\frac{1}{\\sqrt{1 - (x + c) ^ 2}} dx$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div >
  `
  },

  {
    title: "第一类换元积分法(凑微分法)",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #e15759; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">适用形式</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #e15759;">当积分中出现复合函数 $f(g(x))$ 及其内层函数的导数 $g^{\\prime}(x)$ 时，可通过换元简化积分：$\\int f[g(x)] g^{\\prime}(x) dx=\\int f(t) dt$，其中 $t=g(x)$</li>
          </ul>
        </li>
        <li>
          <strong style="display: block; margin-bottom: 5px;">快速换元法步骤</strong>
          <ol style="margin: 0; padding-left: 30px; list-style-type: decimal;">
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">发现复合：找出被积函数中的复合部分(内层函数)</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">强行改写：将 $dx$ 改写为内层函数的微分 $d(内层函数)$</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">调整系数：使用微分公式 $d(内层函数)=(内层函数的导数)\\cdot dx$ 转化得到 $dx=\\frac{1}{内层函数的导数}\\cdot d(内层函数)$</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">套用换元公式：根据具体情况套用基本积分公式</li>
            <li style="padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">化简结果：合并常数项，得到最终结果</li>
          </ol>
        </li>
      </ul>
      <div style="margin-top: 15px; padding: 8px 12px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825; font-size: 0.95rem;">
        <strong>注意</strong>：核心在于识别 $g(x)$ 并凑出其微分 $g'(x)dx = d[g(x)]$。
      </div>
    </div>
</div >
  `
  },
  {
    title: "第二类换元积分法(变量代换)",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #bab0ac; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">适用形式</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #bab0ac;">第二类换元积分法，也称为变量代换法，通过引入一个新的变量 t，并将 x 表示为 t 的函数，从而将原积分转化为关于 t 的新积分。最后要注意变量还原。</li>
          </ul>
        </li>
        <li>
          <strong style="display: block; margin-bottom: 5px;">应用场景</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #bab0ac;">第二类换元积分法只需要掌握根式代换</li>
          </ul>
        </li>
      </ul>
      <div style="margin-top: 15px; padding: 8px 12px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825; font-size: 0.95rem;">
        <strong>关键</strong>：选择合适的代换 $x = \\phi(t)$ 简化积分，计算 $dx = \\phi'(t)dt$，替换后积分，最后将结果用 $t = \\phi^{-1}(x)$ 换回 $x$。
      </div>
    </div>
</div >
  `
  },
  {
    title: "分部积分法",
    content: `
  <div style = "padding: 10px 0; font-family: 'Microsoft YaHei', Arial, sans-serif;" >
    <div style="border-left: 4px solid #4e79a7; padding-left: 10px; margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 15px;">
          <strong style="display: block; margin-bottom: 5px;">分部积分法的基本公式</strong>
          <ul style="list-style: none; padding-left: 15px;">
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7;">$\\int u(x)v'(x)\\,dx = u(x)v(x) - \\int v(x)u'(x)\\,dx$</li>
            <li style="padding: 8px 12px; background: #f0f5ff; border-radius: 4px; border-left: 3px solid #4e79a7; margin-top: 6px;">或写成微分形式：$\\int u\\,dv = uv - \\int v\\,du$</li>
          </ul>
        </li>
        <li>
          <strong style="display: block; margin-bottom: 5px;">步骤</strong>
          <ol style="margin: 0; padding-left: 30px; list-style-type: decimal;">
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">拆分被积函数：将积分式拆分为两部分相乘的形式</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">选择恰当部分：选择一部分保留 $(u)$，另一部分放入微分符号中 $(dv = v'dx)$</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">应用分部积分公式：$\\int u\\,dv = uv - \\int v\\,du$</li>
            <li style="margin-bottom: 6px; padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">处理新的积分：计算交换后得到的新积分 $\\int v\\,du$</li>
            <li style="padding: 4px 8px; background: #f9f9f9; border-radius: 3px;">整合结果：合并所有步骤得到最终结果</li>
          </ol>
        </li>
      </ul>
      <div style="margin-top: 15px; padding: 8px 12px; background: #fff8e1; border-radius: 4px; border-left: 3px solid #f9a825; font-size: 0.95rem;">
        <strong>选择 $u$ 和 $dv$ 的原则</strong>：1. $v = \\int dv$ 要容易求出。 2. $\\int v\\,du$ 要比原积分 $\\int u\\,dv$ 更容易计算。（一般按“反对幂指三”的顺序选择 $u$：反三角函数 > 对数函数 > 幂函数 > 指数函数 > 三角函数）
      </div>
    </div>
</div >
  `
  }

  ],
  exercises: [

    {
      id: 1,
      type: "计算题",
      title: "基本积分公式",
      question: "1. 求 $\\int \\sqrt{x}(x^2-5) dx$",
      explanation: `$$\\int \\sqrt{x}(x^2-5) dx=\\int(x^{\\frac{5}{2}}-5x^{\\frac{1}{2}}) dx$$ (展开)
$$= \\int x^{\\frac{5}{2}} dx - 5 \\int x^{\\frac{1}{2}} dx$$ (积分的线性性质)
$$= \\frac{x^{\\frac{5}{2}+1}}{\\frac{5}{2}+1} - 5\\cdot \\frac{x^{\\frac{1}{2}+1}}{\\frac{1}{2}+1} + C$$ (幂函数积分公式：$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+c$)
$$= \\frac{x^{\\frac{7}{2}}}{\\frac{7}{2}} - 5 \\frac{x^{\\frac{3}{2}}}{\\frac{3}{2}} + C$$ (计算指数)
$$= \\frac{2}{7}x^{\\frac{7}{2}} - \\frac{10}{3}x^{\\frac{3}{2}} + C$$ (化简分数)
$$= \\frac{2}{7}x^3\\sqrt{x}-\\frac{10}{3}x\\sqrt{x}+C$$ (化为根式形式)`,
      answer: "$\\frac{2}{7}x^3\\sqrt{x}-\\frac{10}{3}x\\sqrt{x}+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "幂函数积分公式"
    },
    {
      id: 2,
      type: "计算题",
      title: "基本积分公式",
      question: "2. 求 $\\int 2^x e^x dx$",
      explanation: `$$\\int 2^x e^x dx=\\int(2e)^x dx$$

$$= \\frac{(2e)^x}{\\ln(2e)}+C$$ (指数函数积分公式 $\\int a^x dx = \\frac{a^x}{\\ln a} + C$)`,
      answer: "$\\frac{(2e)^x}{1+\\ln 2}+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "指数函数积分公式"
    },
    {
      id: 3,
      type: "计算题",
      title: "基本积分公式",
      question: "3. 求 $\\int \\frac{(1-x)^2}{x} dx$",
      explanation: `$$\\int \\frac{(1-x)^2}{x} dx=\\int \\frac{1-2x+x^2}{x} dx$$ (展开)
$$= \\int(\\frac{1}{x}-\\frac{2x}{x}+\\frac{x^2}{x}) dx$$ (分项)
$$= \\int(\\frac{1}{x}-2+x) dx$$ (化简)
$$= \\int \\frac{1}{x} dx - \\int 2 dx + \\int x dx$$ (积分的线性性质)
$$= \\ln|x|-2x+\\frac{1}{2}x^2+C$$ (基本积分公式)`,
      answer: "$\\ln|x|-2x+\\frac{1}{2}x^2+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "分项积分法"
    },
    {
      id: 4,
      type: "计算题",
      title: "基本积分公式",
      question: "4. 求 $\\int \\frac{dx}{x^2(1+x^2)}$",
      explanation: `$$\\int \\frac{dx}{x^2(1+x^2)}=\\int \\frac{1+x^2-x^2}{x^2(1+x^2)}dx$$ (分子加减 $x^2$，为了分项)
$$=\\int\\frac{1+x^2}{x^2(1+x^2)}dx-\\int\\frac{x^2}{x^2(1+x^2)}dx$$ (分项)
$$=\\int\\frac{1}{x^2}dx-\\int\\frac{1}{1+x^2}dx$$ (化简)
$$=-\\frac{1}{x}-\\arctan x+C$$ (基本积分公式)`,
      answer: "$-\\frac{1}{x}-\\arctan x+C$",
      difficulty: "hard",
      category: "基本积分",
      method: "分项积分法"
    },
    {
      id: 5,
      type: "计算题",
      title: "基本积分公式",
      question: "5. 求 $\\int \\cos^2 \\frac{x}{2} dx$",
      explanation: `$$\\int\\cos^2\\frac{x}{2}dx=\\int\\frac{1}{2}(1+\\cos x)dx$$ (利用倍角公式变形 $\\cos x=2\\cos^2\\frac{x}{2}-1$)
$$\\int\\cos^2\\frac{x}{2}dx=\\int\\frac{1}{2}(1+\\cos x)dx$$ (代入恒等式)
$$=\\frac{1}{2}\\int(1+\\cos x)dx$$ (常数因子提出)
$$=\\frac{1}{2}(\\int 1dx+\\int\\cos x dx)$$ (积分的线性性质)
$$=\\frac{1}{2}(x+\\sin x)+C$$ (基本积分公式)`,
      answer: "$\\frac{1}{2}(x+\\sin x)+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "二倍角公式"
    },
    {
      id: 6,
      type: "填空题",
      title: "求原函数",
      question: "6. 函数 $x^2$ 的一个原函数是什么？",
      explanation: `积分符号里的函数实际上是导函数，而它的积分结果就是原函数。
              观察到 $x^2$ 是 $\\frac{1}{3}x^3$ 的导数，因此 $\\frac{1}{3}x^3$ 为所求原函数 (令 $C=0$)`,
      answer: "$\\frac{1}{3}x^3$",
      difficulty: "easy",
      category: "原函数",
      method: "积分法"
    },
    {
      id: 7,
      type: "计算题",
      title: "函数求导",
      question: "7. 已知 $\\int f(x)dx=\\arcsin x+C$，求 $f(x)$。",
      explanation: `已知 $\\int f(x)dx=\\arcsin x+C$，
这表示 $\\arcsin x+C$ 是 $f(x)$ 的一个原函数。
也就是说，积分号里面的 $f(x)$ 是其对应原函数的导函数，
而外面的 $\\arcsin x+C$ 则是原函数本身。
因此，我们只需对 $\\arcsin x+C$ 求导:
$(\\arcsin x+C)'=(\\arcsin x)'=\\frac{1}{\\sqrt{1-x^2}}$，
从而得到 $f(x)=\\frac{1}{\\sqrt{1-x^2}}$。`,
      answer: "$\\frac{1}{\\sqrt{1-x^2}}$",
      difficulty: "medium",
      category: "原函数",
      method: "导数法"
    },
    {
      id: 8,
      type: "计算题",
      title: "基本积分公式",
      question: "8. 已知 $f(x)=1$，求 $\\int f(x)dx$。",
      explanation: `题目中给定 $f(x)=1$，我们需要求它的不定积分。
根据基本积分公式，常数函数的积分为：
$$\\int 1dx=x+C,$$
其中 C 为任意常数。

因此，$f(x)=1$ 的不定积分为 $x+C$。
`,
      answer: "$x+C$",
      difficulty: "easy",
      category: "基本积分",
      method: "常数函数积分公式"
    },
    {
      id: 9,
      type: "计算题",
      title: "基本积分公式",
      question: "9. 求 $\\int(10^x+x^{10})dx$",
      explanation: `$$\\int(10^x+x^{10})dx=\\int 10^xdx+\\int x^{10}dx$$ (积分的线性性质)
$$=\\frac{10^x}{\\ln 10}+\\frac{1}{11}x^{11}+C$$ (指数函数和幂函数积分公式)`,
      answer: "$\\frac{10^x}{\\ln 10}+\\frac{1}{11}x^{11}+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "线性性质应用"
    },
    {
      id: 10,
      type: "计算题",
      title: "基本积分公式",
      question: "10. 求 $\\int \\frac{3^x+2^x}{3^x}dx$",
      explanation: `$$\\int\\frac{3^x+2^x}{3^x}dx=\\int(1+(\\frac{2}{3})^x)dx$$ (分项)
$$=\\int 1dx+\\int(\\frac{2}{3})^xdx$$ (积分的线性性质)
$$=x+\\frac{(\\frac{2}{3})^x}{\\ln(\\frac{2}{3})}+C$$ (常数和指数函数积分公式)
$$=x+\\frac{2^x}{3^x\\ln(\\frac{2}{3})}+C$$ (化简)`,
      answer: "$x+\\frac{2^x}{3^x\\ln(\\frac{2}{3})}+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "指数函数积分公式"
    },
    {
      id: 11,
      type: "计算题",
      title: "基本积分公式",
      question: "11. 求 $\\int\\frac{\\cos^2x}{1-\\sin x}dx$",
      explanation: `$$\\int\\frac{\\cos^2x}{1-\\sin x}dx=\\int\\frac{1-\\sin^2x}{1-\\sin x}dx$$ (利用 $\\cos^2x=1-\\sin^2x$)
$$=\\int\\frac{(1-\\sin x)(1+\\sin x)}{1-\\sin x}dx$$ (平方差公式)
$$=\\int(1+\\sin x)dx$$ (约分)
$$=\\int 1dx+\\int\\sin xdx$$ (积分的线性性质)
$$=x-\\cos x+C$$ (基本积分公式)`,
      answer: "$x-\\cos x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "三角函数积分公式"
    },
    {
      id: 12,
      type: "计算题",
      title: "基本积分公式",
      question: "12. 求 $\\int\\frac{x^2}{1+x^2}dx$",
      explanation: `$$\\int\\frac{x^2}{1+x^2}dx=\\int\\frac{1+x^2-1}{1+x^2}dx$$ (分子加减 $1$，为了分项)
$$=\\int(\\frac{1+x^2}{1+x^2}-\\frac{1}{1+x^2})dx$$ (分项)
$$=\\int(1-\\frac{1}{1+x^2})dx$$ (化简)
$$=\\int 1dx-\\int\\frac{1}{1+x^2}dx$$ (积分的线性性质)
$$=x-\\arctan x+C$$ (基本积分公式)`,
      answer: "$x-\\arctan x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "分项积分法"
    },
    {
      id: 13,
      type: "计算题",
      title: "基本积分公式",
      question: "13. 求 $\\int \\frac{1+2x^2}{x^2(1+x^2)} dx$",
      explanation: `$$\\int \\frac{1+2x^2}{x^2(1+x^2)}dx=\\int \\frac{(1+x^2)+x^2}{x^2(1+x^2)}dx$$ (分子拆分)
$$=\\int(\\frac{1+x^2}{x^2(1+x^2)}+\\frac{x^2}{x^2(1+x^2)})dx$$ (分项)
$$=\\int(\\frac{1}{x^2}+\\frac{1}{1+x^2})dx$$ (化简)
$$=\\int\\frac{1}{x^2}dx+\\int\\frac{1}{1+x^2}dx$$ (积分的线性性质)
$$=-\\frac{1}{x}+\\arctan x+C$$ (基本积分公式)`,
      answer: "$-\\frac{1}{x}+\\arctan x+C$",
      difficulty: "hard",
      category: "基本积分",
      method: "分项积分法"
    },
    {
      id: 14,
      type: "计算题",
      title: "基本积分公式",
      question: "14. 求 $\\int \\frac{e^{2x}-1}{e^x+1} dx$",
      explanation: `$$\\int \\frac{e^{2x}-1}{e^x+1}dx=\\int \\frac{(e^x-1)(e^x+1)}{e^x+1}dx$$ (平方差公式)
$$=\\int(e^x-1)dx$$ (约分)
$$=\\int e^xdx-\\int 1dx$$ (积分的线性性质)
$$=e^x-x+C$$ (基本积分公式)`,
      answer: "$e^x-x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "代数技巧与积分法"
    },
    {
      id: 15,
      type: "计算题",
      title: "基本积分公式",
      question: "15. 求 $\\int \\frac{1}{1+\\cos 2x}dx$",
      explanation: `$$\\int \\frac{1}{1+\\cos 2x}dx=\\int \\frac{1}{2\\cos^2 x}dx$$ (倍角公式 $\\cos 2x=2\\cos^2x-1 \\Rightarrow 1+\\cos 2x=2\\cos^2x$)
$$=\\frac{1}{2}\\int \\sec^2xdx$$ ($\\sec x=\\frac{1}{\\cos x}$)
$$=\\frac{1}{2}\\tan x+C$$ (基本积分公式 $\\int \\sec^2xdx=\\tan x+C$)`,
      answer: "$\\frac{1}{2}\\tan x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "三角函数积分公式"
    },
    {
      id: 16,
      type: "计算题",
      title: "基本积分公式",
      question: "16. 求 $\\int \\sin^2 \\frac{x}{2} dx$",
      explanation: `$$\\int \\sin^2 \\frac{x}{2} dx=\\int \\frac{1}{2}(1-\\cos x) dx$$
(半角公式 $\\cos x = 1-2\\sin^2 \\frac{x}{2} \\Rightarrow \\sin^2 \\frac{x}{2} = \\frac{1-\\cos x}{2}$)
$$= \\frac{1}{2} \\int(1-\\cos x) dx$$ (常数因子提出)
$$= \\frac{1}{2} \\left(\\int 1 dx - \\int \\cos x dx\\right)$$ (积分的线性性质)
$$= \\frac{1}{2}(x-\\sin x)+C$$ (基本积分公式)`,
      answer: "$\\frac{1}{2}(x-\\sin x)+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "三角函数积分公式"
    },
    {
      id: 17,
      type: "计算题",
      title: "基本积分公式",
      question: "17. 求 $\\int \\frac{(x+1)^2}{x(x^2+1)} dx$",
      explanation: `部分分式分解：
$$\\frac{(x+1)^2}{x(x^2+1)} = \\frac{A}{x} + \\frac{Bx+C}{x^2+1}$$
$$ {(x+1)}^2 =x^2+2x+1= A{(x^2+1)} + {(Bx+C)}x $$
$$ = {(A+B)}x^2 + {C}x + {A} $$
$$ A=1, C=2, A+B=1 \\Rightarrow B=0 $$
$$ 所以 \\frac{(x+1)^2}{x(x^2+1)} = \\frac{1}{x} + \\frac{2}{x^2+1} $$
积分计算：
$$\\int \\frac{(x+1)^2}{x(x^2+1)} dx = \\int \\frac{1}{x} dx + \\int \\frac{2}{x^2+1} dx$$
$$= \\ln|x| + 2\\arctan x + C$$`,
      answer: "$\\ln|x| + 2\\arctan x + C$",
      difficulty: "hard",
      category: "基本积分",
      method: "部分分式分解法"
    },
    {
      id: 18,
      type: "计算题",
      title: "基本积分公式",
      question: "18. 求 $\\int \\tan^2 x dx$",
      explanation: `$$\\int \\tan^2 x dx=\\int(\\sec^2 x-1) dx$$ (利用恒等式 $\\tan^2 x = \\sec^2 x - 1$)
$$= \\int \\sec^2 x dx - \\int 1 dx$$ (积分的线性性质)
$$= \\tan x-x+C$$ (基本积分公式)`,
      answer: "$\\tan x-x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "三角函数积分公式"
    },
    {
      id: 19,
      type: "计算题",
      title: "基本积分公式",
      question: "19. 求不定积分 $\\int(3x^2+2) dx$",
      explanation: `$$\\int(3x^2+2) dx=\\int 3x^2 dx+\\int 2 dx$$ (积分的线性性质)
$$= 3\\int x^2 dx+2\\int dx$$ (常数因子提出)
$$= 3 \\cdot \\frac{x^{2+1}}{2+1} + 2x + C$$ (幂函数和常数积分公式)
$$= x^3+2x+C$$ (化简)`,
      answer: "$x^3+2x+C$",
      difficulty: "easy",
      category: "基本积分",
      method: "多项式积分法"
    },
    {
      id: 20,
      type: "计算题",
      title: "基本积分公式",
      question: "20. 求不定积分 $\\int(3x^2+2x-1) dx$",
      explanation: `$$\\int(3x^2+2x-1) dx = \\int 3x^2 dx + \\int 2x dx - \\int 1 dx$$
$$= 3\\int x^2 dx + 2\\int x dx - \\int dx$$ (常数因子提出)
$$= 3 \\cdot \\frac{x^{2+1}}{2+1} + 2 \\cdot \\frac{x^{1+1}}{1+1} - x + C$$ (幂函数和常数积分公式)
$$= x^3+x^2-x+C$$ (化简)`,
      answer: "$x^3+x^2-x+C$",
      difficulty: "easy",
      category: "基本积分",
      method: "多项式积分法"
    },
    {
      id: 21,
      type: "计算题",
      title: "基本积分公式",
      question: "21. 求不定积分 $\\int(2\\sin x-3e^x+\\frac{4}{x}) dx$",
      explanation: `$$\\int(2\\sin x-3e^x+\\frac{4}{x}) dx = \\int 2\\sin x dx - \\int 3e^x dx + \\int \\frac{4}{x} dx$$ (积分的线性性质)
$$= 2\\int \\sin x dx - 3\\int e^x dx + 4\\int \\frac{1}{x} dx$$ (常数因子提出)
$$= 2(-\\cos x) - 3e^x + 4\\ln|x| + C$$ (基本积分公式)
$$= -2\\cos x-3e^x+4\\ln|x|+C$$ (化简)`,
      answer: "$-2\\cos x-3e^x+4\\ln|x|+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "组合函数积分公式"
    },
    {
      id: 22,
      type: "计算题",
      title: "基本积分公式",
      question: "22. 求不定积分 $\\int(x^3-\\frac{1}{x^2}+\\cos x) dx$",
      explanation: `$$\\int(x^3-\\frac{1}{x^2}+\\cos x) dx = \\int x^3 dx - \\int \\frac{1}{x^2} dx + \\int \\cos x dx$$ (积分的线性性质)
$$= \\frac{x^{3+1}}{3+1} - \\frac{x^{-2+1}}{-2+1} + \\sin x + C$$ (幂函数和三角函数积分公式)
$$= \\frac{x^4}{4}+\\frac{1}{x}+\\sin x+C$$ (化简)`,
      answer: "$\\frac{x^4}{4}+\\frac{1}{x}+\\sin x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "组合函数积分公式"
    },
    {
      id: 23,
      type: "计算题",
      title: "基本积分公式",
      question: "23. 求不定积分 $\\int(2x+3)^2 dx$",
      explanation: `$$\\int(2x+3)^2 dx = \\int(4x^2+12x+9) dx$$ (展开平方 $(a+b)^2 = a^2 + 2ab + b^2$)
$$= \\int 4x^2 dx + \\int 12x dx + \\int 9 dx$$ (积分的线性性质)
$$= 4\\int x^2 dx + 12\\int x dx + 9\\int dx$$ (常数因子提出)
$$= 4 \\cdot \\frac{x^{2+1}}{2+1} + 12 \\cdot \\frac{x^{1+1}}{1+1} + 9x + C$$ (幂函数和常数积分公式)
$$= \\frac{4x^3}{3}+6x^2+9x+C$$ (化简)`,
      answer: "$\\frac{4x^3}{3}+6x^2+9x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "多项式积分法"
    },
    {
      id: 24,
      type: "判断题",
      title: "原函数的性质",
      question: "24. 判断：若 $F(x)$ 是 $f(x)$ 的原函数，则 $F(x)+5$ 也是 $f(x)$ 的原函数",
      explanation: `已知 $F(x)$ 是 $f(x)$ 的原函数，根据定义有 $F^{\\prime}(x)=f(x)$

现在求 $(F(x)+5)$ 的导数：
$$[F(x)+5]^{\\prime}=F^{\\prime}(x)+5^{\\prime}$$ (导数的线性性质)
$$=F^{\\prime}(x)+0$$ (常数导数为零)
$$=F^{\\prime}(x)$$ (化简)
$$=f(x)$$ (代入 $F^{\\prime}(x)=f(x)$)

因为 $(F(x)+5)^{\\prime}=f(x)$，所以根据原函数的定义，$F(x)+5$ 也是 $f(x)$ 的原函数。

所以该命题是正确的。`,
      answer: "正确",
      difficulty: "easy",
      category: "原函数性质",
      method: "导数法"
    },
    {
      id: 25,
      type: "计算题",
      title: "基本积分公式",
      question: "25. 求不定积分 $\\int(5x^4-3x^2+2x-7) dx$",
      explanation: `$$\\int(5x^4-3x^2+2x-7) dx = \\int 5x^4 dx - \\int 3x^2 dx + \\int 2x dx - \\int 7 dx$$ (积分的线性性质)
$$= 5\\int x^4 dx - 3\\int x^2 dx + 2\\int x dx - 7\\int dx$$ (常数因子提出)
$$= 5 \\cdot \\frac{x^{4+1}}{4+1} - 3 \\cdot \\frac{x^{2+1}}{2+1} + 2 \\cdot \\frac{x^{1+1}}{1+1} - 7x + C$$ (积分公式)
$$= x^5-x^3+x^2-7x+C$$ (化简)`,
      answer: "$x^5-x^3+x^2-7x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "多项式积分法"
    },
    {
      id: 26,
      type: "计算题",
      title: "基本积分公式",
      question: "26. 求不定积分 $\\int(2\\sin x+3\\cos x-4e^x) dx$",
      explanation: `$$\\int(2\\sin x+3\\cos x-4e^x) dx = \\int 2\\sin x dx + \\int 3\\cos x dx - \\int 4e^x dx$$ (积分的线性性质)
$$= 2\\int \\sin x dx + 3\\int \\cos x dx - 4\\int e^x dx$$ (常数因子提出)
$$= 2(-\\cos x) + 3\\sin x - 4e^x + C$$ (基本积分公式)
$$= -2\\cos x+3\\sin x-4e^x+C$$ (化简)`,
      answer: "$-2\\cos x+3\\sin x-4e^x+C$",
      difficulty: "medium",
      category: "基本积分",
      method: "组合函数积分公式"
    },
    {
      id: 27,
      type: "计算题",
      title: "基本积分公式",
      question: "27. 求不定积分 $\\int(\\sin^2 x+\\cos^2 x) dx$",
      explanation: `$$\\int(\\sin^2 x+\\cos^2 x) dx = \\int 1 dx$$ (三角恒等式 $\\sin^2 x+\\cos^2 x=1$)
$$= x+C$$`,
      answer: "$x+C$",
      difficulty: "easy",
      category: "基本积分",
      method: "三角函数积分公式"
    },
    {
      id: 28,
      type: "计算题",
      title: "基本积分公式",
      question: "28. 求不定积分 $\\int(e^x+e^{-x}) dx$",
      explanation: `$$\\int(e^x+e^{-x}) dx = \\int e^x dx + \\int e^{-x} dx$$
$$= e^x - e^{-x} + C$$ `,
      answer: "$e^x - e^{-x} + C$",
      difficulty: "medium",
      category: "基本积分",
      method: "指数函数积分公式"
    },
    {
      id: 29,
      type: "计算题",
      title: "基本积分公式",
      question: "29. 求不定积分 $\\int \\frac{x^2+1}{x^2} dx$",
      explanation: `$$\\int \\frac{x^2+1}{x^2} dx = \\int(1+\\frac{1}{x^2}) dx$$ (分式化简)
$$= \\int 1 dx + \\int \\frac{1}{x^2} dx$$ (积分的线性性质)
$$= x - \\frac{1}{x} + C$$ (化简)`,
      answer: "$x - \\frac{1}{x} + C$",
      difficulty: "medium",
      category: "基本积分",
      method: "分式积分法"
    },
    {
      id: 30,
      type: "计算题",
      title: "第一类换元积分",
      question: "30. 求不定积分 $\\int \\sec^2 x \\tan x dx$",
      explanation: `1. $$\\int \\sec^2 x \\tan x dx = \\int \\tan x d(\\tan x)$$ ($d(\\tan x) = \\sec^2 x dx$)
2. $$\\int \\tan x d(\\tan x) = \\frac{(\\tan x)^2}{2} + C$$ (基本积分公式)
3. $$= \\frac{\\tan^2 x}{2} + C$$ (化简)`,
      answer: "$\\frac{1}{2}\\tan^2 x + C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 31,
      type: "计算题",
      title: "第一类换元积分法",
      question: "31. 求不定积分 $\\int \\sin(5x+2) dx$",
      explanation: `1. 发现复合：$\\sin(5x+2)$，内层函数是 $5x+2$
2. 强行改写：$\\int \\sin(5x+2) dx \\rightarrow \\int \\sin(5x+2) d(5x+2)$
3. 调整系数：$$d(5x+2)=5 dx \\Rightarrow dx=\\frac{1}{5} d(5x+2)$$
   $$\\int \\sin(5x+2) dx=\\int \\sin(5x+2) \\cdot \\frac{1}{5} d(5x+2)=\\frac{1}{5} \\int \\sin(5x+2) d(5x+2)$$
4. 套用公式：$$\\int \\sin t dt=-\\cos t + C$$
5. 化简结果：$$\\int \\sin(5x+2) dx=\\frac{1}{5} \\int \\sin(5x+2) d(5x+2)=-\\frac{1}{5}\\cos(5x+2)+C$$`,
      answer: "$-\\frac{1}{5}\\cos(5x+2)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 32,
      type: "计算题",
      title: "第一类换元积分法",
      question: "32. 求不定积分 $\\int \\cos(2x-1) dx$",
      explanation: `1. 发现复合：$\\cos(2x-1)$，内层函数是 $2x-1$
2. 强行改写：$\\int \\cos(2x-1) dx \\rightarrow \\int \\cos(2x-1) d(2x-1)$
3. 调整系数：$$d(2x-1)=2 dx \\Rightarrow dx=\\frac{1}{2} d(2x-1)$$
   $$\\int \\cos(2x-1) dx=\\int \\cos(2x-1) \\cdot \\frac{1}{2} d(2x-1)=\\frac{1}{2} \\int \\cos(2x-1) d(2x-1)$$
4. 套用公式：$$\\int \\cos t dt=\\sin t + C$$
5. 化简结果：$$\\int \\cos(2x-1) dx=\\frac{1}{2} \\int \\cos(2x-1) d(2x-1)=\\frac{1}{2}\\sin(2x-1)+C$$`,
      answer: "$\\frac{1}{2}\\sin(2x-1)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 33,
      type: "计算题",
      title: "第一类换元积分",
      question: "33. 求不定积分 $\\int \\frac{1}{3x+2} dx$",
      explanation: `1. 发现分母为一次多项式：$3x+2$
2. 调整微分：$$d(3x+2) = 3dx \\Rightarrow dx = \\frac{1}{3}d(3x+2)$$
3. 改写积分：$$\\int \\frac{1}{3x+2} dx = \\frac{1}{3}\\int \\frac{1}{3x+2} d(3x+2)$$
4. 套用公式：$$\\int \\frac{1}{t} dt = \\ln|t| + C$$
5. 得出结果：$$\\frac{1}{3}\\int \\frac{1}{3x+2} d(3x+2) = \\frac{1}{3}\\ln|3x+2|+C$$`,
      answer: "$\\frac{1}{3}\\ln|3x+2|+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 34,
      type: "计算题",
      title: "第一类换元积分",
      question: "34. 求不定积分 $\\int e^{3x} dx$",
      explanation: `1. 发现指数部分为一次多项式：$3x$
2. 调整微分：$$d(3x) = 3dx \\Rightarrow dx = \\frac{1}{3}d(3x)$$
3. 改写积分：$$\\int e^{3x} dx = \\frac{1}{3} \\int e^{3x} d(3x)$$
4. 套用公式：$$\\int e^t dt = e^t + C$$
5. 得出结果：$$\\frac{1}{3} \\int e^{3x} d(3x) = \\frac{1}{3}e^{3x}+C$$`,
      answer: "$\\frac{1}{3}e^{3x}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 35,
      type: "计算题",
      title: "第一类换元积分",
      question: "35. 求不定积分 $\\int \\frac{1}{x(1+2\\ln x)} dx$",
      explanation: `1. 发现内层函数：$1 + 2\\ln x$
2. 调整微分：$$d(1 + 2\\ln x) = \\frac{2}{x} dx \\Rightarrow \\frac{1}{x} dx = \\frac{1}{2} d(1 + 2\\ln x)$$
3. 改写积分：$$\\int \\frac{1}{x(1+2\\ln x)} dx = \\frac{1}{2}\\int \\frac{1}{1+2\\ln x} d(1+2\\ln x)$$
4. 套用公式：$$\\int \\frac{1}{t} dt = \\ln|t| + C$$
5. 得出结果：$$\\frac{1}{2}\\int \\frac{1}{1+2\\ln x} d(1+2\\ln x) = \\frac{1}{2}\\ln|1+2\\ln x|+C$$`,
      answer: "$\\frac{1}{2}\\ln|1+2\\ln x|+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 36,
      type: "计算题",
      title: "第一类换元积分",
      question: "36. 求不定积分 $\\int \\tan x dx$",
      explanation: `1. 三角函数变换：$$\\int \\tan x dx = \\int \\frac{\\sin x}{\\cos x} dx$$
2. 强行改写：$\\int \\frac{\\sin x}{\\cos x} dx \\rightarrow \\int \\frac{\\sin x}{\\cos x} d(\\cos x)$
3. 调整系数：$$d(\\cos x)=-\\sin x dx \\Rightarrow dx=-\\frac{1}{\\sin x} d(\\cos x)$$
$$\\int \\frac{\\sin x}{\\cos x} dx=\\int \\frac{\\sin x}{\\cos x} \\cdot {-\\frac{1}{\\sin x}} d(\\cos x)=\\int {-\\frac{1}{\\cos x}} d(\\cos x)$$
4. 套用公式：$$\\int \\frac{1}{t} dt = \\ln|t| + C$$
5. 化简结果：$$\\int \\tan x dx=-\\int \\frac{1}{\\cos x} d(\\cos x)=-\\ln|\\cos x|+C=\\ln|\\sec x|+C$$`,
      answer: "$\\ln|\\sec x|+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 37,
      type: "计算题",
      title: "第一类换元积分",
      question: "37. 求不定积分 $\\int e^{3x-1} dx$",
      explanation: `1. 发现指数部分为一次多项式：$3x-1$
2. 调整微分：$$d(3x-1) = 3dx \\Rightarrow dx = \\frac{1}{3}d(3x-1)$$
3. 改写积分：$$\\int e^{3x-1} dx = \\frac{1}{3} \\int e^{3x-1} d(3x-1)$$
4. 套用公式：$$\\int e^t dt = e^t + C$$
5. 得出结果：$$\\frac{1}{3} \\int e^{3x-1} d(3x-1) = \\frac{1}{3}e^{3x-1}+C$$`,
      answer: "$\\frac{1}{3}e^{3x-1}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 38,
      type: "计算题",
      title: "第一类换元积分",
      question: "38. 求不定积分 $\\int \\sqrt{1-4x} dx$",
      explanation: `1. 发现根号内为一次多项式：$1-4x$
2. 调整微分：$d(1-4x) = -4 dx \\Rightarrow dx = -\\frac{1}{4} d(1-4x)$
3. 改写积分：$\\int \\sqrt{1-4x} dx = -\\frac{1}{4} \\int \\sqrt{1-4x} \\, d(1-4x)$
4. 套用公式：$\\int t^n dt = \\frac{t^{n+1}}{n+1} + C$
5. 得出结果：
$$-\\frac{1}{4}\\int(1-4x)^{\\frac{1}{2}}d(1-4x)=-\\frac{1}{4}\\cdot\\frac{2}{3}\\cdot(1-4x)^{\\frac{3}{2}}+C={-\\frac{1}{6}}(1-4x)^{\\frac{3}{2}}+C$$`,
      answer: "$-\\frac{1}{6}(1-4x)^{\\frac{3}{2}}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 39,
      type: "计算题",
      title: "第一类换元积分",
      question: "39. 求不定积分 $\\int \\sec^2(3x+1) dx$",
      explanation: "1. 发现内层函数：$3x+1$\n\
2. 调整微分：$d(3x+1) = 3 dx \\Rightarrow dx = \\frac{1}{3} d(3x+1)$\n\
3. 改写积分：$\\int \\sec^2(3x+1) dx = \\frac{1}{3}\\int \\sec^2(3x+1) d(3x+1)$\n\
4. 套用公式：$\\int \\sec^2 t dt = \\tan t + C$\n\
5. 得出结果：$\\frac{1}{3}\\int \\sec^2(3x+1) d(3x+1) = \\frac{1}{3}\\tan(3x+1)+C$",
      answer: "$\\frac{1}{3}\\tan(3x+1)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 40,
      type: "计算题",
      title: "第一类换元积分",
      question: "40. 求不定积分 $\\int \\frac{1}{(2x-3)^3} dx$",
      explanation: "1. 发现分母为一次多项式的幂：$(2x-3)^3$\n\
2. 调整微分：$d(2x-3) = 2 dx \\Rightarrow dx = \\frac{1}{2} d(2x-3)$\n\
3. 改写积分：$\\int \\frac{1}{(2x-3)^3} dx = \\frac{1}{2}\\int \\frac{1}{(2x-3)^3} d(2x-3)$\n\
4. 套用公式：$\\int t^n dt = \\frac{t^{n+1}}{n+1} + C$\n\
5. 得出结果：$\\int \\frac{1}{(2x-3)^3} dx = \\frac{1}{2}\\int \\frac{1}{(2x-3)^3} d(2x-3) = \\frac{1}{2}\\cdot \\frac{(2x-3)^{-2}}{-2} + C = -\\frac{1}{4(2x-3)^2} + C$",
      answer: "$-\\frac{1}{4(2x-3)^2}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 41,
      type: "计算题",
      title: "分部积分法",
      question: "41. 求不定积分 $\\int x e^{x} dx$",
      explanation: `将 $x$ 和 $e^{x}$ 分别看作两个部分
计算 $e^{x}$ 的原函数：$ e^{x}dx = de^{x} $
根据分部积分公式
$$\\int x e^{x} dx = \\int x de^{x} = x e^{x} - \\int e^{x} dx$$
$$= xe^{x} - e^{x} + C$$`,
      answer: "$(x-1)e^{x} + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 42,
      type: "计算题",
      title: "分部积分法",
      question: "42. 已知 $f(x)$ 的一个原函数是 $e^{-x^2}$，求 $\\int x f'(x) dx$",
      explanation: `由题意知 $\\int f(x) dx = e^{-x^2} + C$。直接应用分部积分法：
$$\\int x f'(x) dx = \\int x df(x) = x f(x) - \\int f(x) dx$$ (分部积分基本公式)
$$= x f(x) - e^{-x^2} + C$$ (直接代入已知原函数)

为求具体表达式，需表达$f(x)$：
因$f(x) = \\frac{d}{dx}(e^{-x^2}) = -2x e^{-x^2}$，代入得：
$$= x(-2x e^{-x^2}) - e^{-x^2} + C$$
$$= -2x^2 e^{-x^2} - e^{-x^2} + C$$
$$= -e^{-x^2}(2x^2 + 1) + C$$ (提取公共因子)
$$= -(2x^2 + 1)e^{-x^2} + C$$ (最终形式)`,
      answer: "$-(2x^2 + 1)e^{-x^2} + C$",
      difficulty: "hard",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 43,
      type: "计算题",
      title: "第一类换元积分",
      question: "43. 求不定积分 $\\int e^{2x} dx$",
      explanation: `1. 发现指数部分为一次多项式：$2x$
2. 调整微分：$$d(2x) = 2dx \\Rightarrow dx = \\frac{1}{2}d(2x)$$
3. 改写积分：$$\\int e^{2x} dx = \\frac{1}{2} \\int e^{2x} d(2x)$$
4. 套用公式：$$\\int e^t dt = e^t + C$$
5. 得出结果：$$\\frac{1}{2} \\int e^{2x} d(2x) = \\frac{1}{2}e^{2x}+C$$`,
      answer: "$\\frac{1}{2}e^{2x}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 44,
      type: "计算题",
      title: "第一类换元积分",
      question: "44. 求不定积分 $\\int \\cos(3x-2) dx$",
      explanation: `1. 发现复合函数：$\\cos(3x-2)$，内层函数是 $3x-2$
2. 调整微分：$d(3x-2) = 3dx \\Rightarrow dx = \\frac{1}{3}d(3x-2)$
3. 改写积分：$\\int \\cos(3x-2) dx = \\frac{1}{3}\\int \\cos(3x-2) d(3x-2)$
4. 套用公式：$\\int \\cos t dt = \\sin t + C$
5. 得出结果：$\\int \\cos(3x-2) dx = \\frac{1}{3}\\int \\cos(3x-2) d(3x-2) = \\frac{1}{3}\\sin(3x-2)+C$`,
      answer: "$\\frac{1}{3}\\sin(3x-2)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 45,
      type: "计算题",
      title: "第一类换元积分",
      question: "45. 求不定积分 $\\int \\frac{1}{2x+5} dx$",
      explanation: `1. 发现内层函数：$2x+5$
2. 调整微分：$d(2x+5) = 2dx \\Rightarrow dx = \\frac{1}{2}d(2x+5)$
3. 改写积分：$\\int \\frac{1}{2x+5} dx = \\frac{1}{2}\\int \\frac{1}{2x+5} d(2x+5)$
4. 套用公式：$\\int \\frac{1}{t} dt = \\ln|t| + C$
5. 得出结果：$\\int \\frac{1}{2x+5} dx = \\frac{1}{2}\\int \\frac{1}{2x+5} d(2x+5) = \\frac{1}{2}\\ln|2x+5|+C$`,
      answer: "$\\frac{1}{2}\\ln|2x+5|+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 46,
      type: "计算题",
      title: "分部积分法",
      question: "46. 求不定积分 $\\int x\\ln x dx$",
      explanation: `应用分部积分公式：$ x\\,dx = d\\left(\\frac{x^2}{2}\\right)$
$$\\int x\\ln x dx = \\int \\ln x d\\left(\\frac{x^2}{2}\\right) = \\frac{1}{2}x^2\\ln x - \\int \\frac{1}{2}x^2 \\cdot d(\\ln x)$$
$$= \\frac{1}{2}x^2\\ln x - \\int \\frac{1}{2}x^2 \\cdot \\frac{1}{x}dx$$  ( $d(\\ln x) = \\frac{1}{x}dx$)
$$= \\frac{1}{2}x^2\\ln x - \\frac{1}{2}\\int x dx$$
$$= \\frac{1}{2}x^2\\ln x - \\frac{1}{4}x^2 + C$$
整理得：
$$= \\frac{x^2}{2}(\\ln x - \\frac{1}{2}) + C$$`,
      answer: "$\\frac{x^2}{2}(\\ln x - \\frac{1}{2}) + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 47,
      type: "计算题",
      title: "分部积分法",
      question: "47. 求不定积分 $\\int x^2e^x dx$",
      explanation: `(注：$e^x dx = de^x$)
$$\\int x^2e^x dx = \\int x^2 de^x$$
$$= x^2e^x - \\int e^x d(x^2)$$  ($d(x^2) = 2xdx$)
$$= x^2e^x - 2\\int xe^x dx$$  (继续分部积分 $d(x^2) = 2xdx$)
$$= x^2e^x - 2\\int x de^x$$
$$= x^2e^x - 2(xe^x - \\int e^x dx)$$
$$= x^2e^x - 2xe^x + 2e^x + C$$
$$= e^x(x^2 - 2x + 2) + C$$`,
      answer: "$e^x(x^2 - 2x + 2) + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 48,
      type: "计算题",
      title: "分部积分法",
      question: "48. 求不定积分 $\\int x\\cos x dx$",
      explanation: `(注：$\\cos x dx = d\\sin x$)
$$\\int x\\cos x dx = \\int x d(\\sin x)$$
$$= x \\sin x - \\int \\sin x dx $$
$$= x\\sin x + \\cos x + C$$`,
      answer: "$x\\sin x + \\cos x + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 49,
      type: "计算题",
      title: "分部积分法",
      question: "49. 求不定积分 $\\int \\arcsin x dx$",
      explanation: `$$ 直接应用分部积分公式： \\int \\arcsin x dx = x\\arcsin x - \\int x \\cdot d \\arcsin x $$
$$=x\\arcsin x - \\int x \\cdot \\frac{1}{\\sqrt{1-x^2}} dx $$
$$ 计算新积分： \\int \\frac{x}{\\sqrt{1-x^2}} dx = -\\sqrt{1-x^2} + C $$ 
1. $d(1-x^2) = -2x dx \\Rightarrow dx = -\\frac{1}{2x}d(1-x^2)$
2. 改写积分：$\\int \\frac{x}{\\sqrt{1-x^2}} dx = -\\frac{1}{2}\\int \\frac{1}{\\sqrt{1-x^2}} d(1-x^2)$
3. 套用公式：$\\int \\frac{1}{\\sqrt{u}} du = 2\\sqrt{u} + C$
4. 得出结果：$\\int \\frac{x}{\\sqrt{1-x^2}} dx = -\\frac{1}{2} \\cdot 2\\sqrt{1-x^2} + C = -\\sqrt{1-x^2} + C$
$$ 回代得到最终结果 = x\\arcsin x + \\sqrt{1-x^2} + C $$`,
      answer: "$x\\arcsin x + \\sqrt{1-x^2} + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 50,
      type: "计算题",
      title: "分部积分法",
      question: "50. 求不定积分 $\\int x^2\\sin x dx$",
      explanation: `1. 直接应用分部积分思路：
$\\int x^2\\sin x dx = \\int x^2 d(-\\cos x)$ (因为 $\\sin x dx = d(-\\cos x)$)

2. 展开计算：
$\\int x^2\\sin x dx = \\int x^2 d(-\\cos x)$ (因为 $d(x^2)=2x dx$)
$= -x^2\\cos x + \\int \\cos x \\cdot d(x^2)$
$= -x^2\\cos x + \\int \\cos x \\cdot 2x dx$
$= -x^2\\cos x + \\int 2x\\cos x dx$

3. 处理第二个积分：
$\\int 2x\\cos x dx = 2x\\sin x - \\int 2\\sin x dx$ (因为 $\\cos x dx = d(\\sin x)$)

4. 计算最终积分并组合结果：
$\\int 2\\sin x dx = -2\\cos x$
最终结果：$\\int x^2\\sin x dx = -x^2\\cos x + 2x\\sin x + 2\\cos x + C$`,
      answer: "$-x^2\\cos x + 2x\\sin x + 2\\cos x + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 51,
      type: "计算题",
      title: "分部积分法",
      question: "51. 求不定积分 $\\int x^2\\ln x dx$",
      explanation: `1. 直接应用分部积分思路：
$$ \\int x^2\\ln x dx = \\int \\ln x d(\\frac{x^3}{3}) $$ (因为$ d(\\frac{x^3}{3}) = x^2 dx $) 

2. 展开计算：
$$ \\int x^2\\ln x dx = \\int \\ln x d(\\frac{x^3}{3}) $$
$$= \\frac{x^3}{3}\\ln x - \\int \\frac{x^3}{3} d(\\ln x) $$
$$= \\frac{x^3}{3}\\ln x - \\int \\frac{x^3}{3} \\cdot \\frac{1}{x} dx$$
$$= \\frac{x^3}{3}\\ln x - \\frac{1}{3}\\int x^2 dx$$

3. 计算第二部分积分：
$$\\frac{1}{3}\\int x^2 dx = \\frac{1}{3} \\cdot \\frac{x^3}{3} = \\frac{x^3}{9}$$

4. 合并最终结果：
$$\\int x^2\\ln x dx = \\frac{x^3}{3}\\ln x - \\frac{x^3}{9} + C = \\frac{x^3}{3}(\\ln x - \\frac{1}{3}) + C$$`,
      answer: "$\\frac{x^3}{3}(\\ln x - \\frac{1}{3}) + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 52,
      type: "计算题",
      title: "分部积分法",
      question: "52. 求不定积分 $\\int x\\arctan x dx$",
      explanation: `1. 直接应用分部积分思路：
$$\\int x\\arctan x dx = \\int \\arctan x d(\\frac{x^2}{2}) $$  (因为 $d(\\frac{x^2}{2}) = x dx$)
2. 展开计算：
$$\\int x\\arctan x dx = \\int \\arctan x d(\\frac{x^2}{2}) $$
$$= \\frac{x^2}{2}\\arctan x - \\int \\frac{x^2}{2} d(\\arctan x)$$
$$= \\frac{x^2}{2}\\arctan x - \\int \\frac{x^2}{2} \\cdot \\frac{1}{1+x^2} dx$$

3. 拆分被积函数：
$$\\int \\frac{x^2}{2(1+x^2)} dx = \\frac{1}{2}\\int \\frac{x^2}{1+x^2} dx = \\frac{1}{2}\\int \\frac{1+x^2-1}{1+x^2} dx$$
$$= \\frac{1}{2}\\int dx - \\frac{1}{2}\\int \\frac{1}{1+x^2} dx = \\frac{1}{2}x - \\frac{1}{2}\\arctan x$$

4. 合并最终结果：
$$\\int x\\arctan x dx = \\frac{x^2}{2}\\arctan x - \\frac{1}{2}x + \\frac{1}{2}\\arctan x + C$$
$$= \\frac{1}{2}(x^2\\arctan x - x + \\arctan x) + C$$`,
      answer: "$\\frac{1}{2}(x^2\\arctan x - x + \\arctan x) + C$",
      difficulty: "medium",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 53,
      type: "计算题",
      title: "分部积分法",
      question: "53. 求不定积分 $\\int e^x\\cos x dx$",
      explanation: `1. 第一次分部积分：
$$\\int e^x\\cos x dx = \\int \\cos x d(e^x) $$  (因为 $d(e^x) = e^x dx$)
$$= e^x\\cos x - \\int e^x d(\\cos x)$$  (因为 $d(\\cos x) = -\\sin x dx$)
$$= e^x\\cos x + \\int e^x\\sin x dx$$

2. 第二次分部积分处理 $\\int e^x\\sin x dx$：
$$\\int e^x\\sin x dx = \\int \\sin x d(e^x) $$  (因为 $d(e^x) = e^x dx$)
$$= e^x\\sin x - \\int e^x d(\\sin x)$$  (因为 $d(\\sin x) = \\cos x dx$)
$$= e^x\\sin x - \\int e^x\\cos x dx$$

3. 联立方程：
$$\\int e^x\\cos x dx = e^x\\cos x + e^x\\sin x - \\int e^x\\cos x dx$$
$$2I = e^x(\\cos x + \\sin x)$$
$$I = \\frac{e^x(\\sin x + \\cos x)}{2} + C$$`,
      answer: "$\\frac{e^x(\\sin x + \\cos x)}{2} + C$",
      difficulty: "hard",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 54,
      type: "计算题",
      title: "分部积分法",
      question: "54. 求不定积分 $\\int \\ln^2 x dx$",
      explanation: `1. 第一次分部积分：
$$\\int \\ln^2 x dx = \\int \\ln^2 x d(x) $$  (因为 $d(x) = dx$)
$$= x\\ln^2 x - \\int x d(\\ln^2 x)$$
$$= x\\ln^2 x - \\int x \\cdot 2\\ln x \\cdot \\frac{1}{x} dx$$
$$= x\\ln^2 x - 2\\int \\ln x dx$$

2. 第二次分部积分处理 $\\int \\ln x dx$：
$$\\int \\ln x dx = \\int \\ln x d(x) $$  (因为 $d(x) = dx$)
$$= x\\ln x - \\int x d(\\ln x)$$
$$= x\\ln x - \\int x \\cdot \\frac{1}{x} dx$$
$$= x\\ln x - \\int dx = x\\ln x - x$$

3. 代入第一步求解最终结果：
$$\\int \\ln^2 x dx = x\\ln^2 x - 2(x\\ln x - x)$$
$$= x\\ln^2 x - 2x\\ln x + 2x$$
$$= x(\\ln^2 x - 2\\ln x + 2) + C$$`,
      answer: "$x(\\ln^2 x - 2\\ln x + 2) + C$",
      difficulty: "hard",
      category: "分部积分",
      method: "分部积分法"
    },
    {
      id: 55,
      type: "计算题",
      title: "第一类换元积分法",
      question: "55. 求不定积分 $\\int(2x+3)^5 dx$",
      explanation: "1. 发现复合：$(2x+3)^5$，内层函数是 $2x+3$\n2. 强行改写：$\\int(2x+3)^5 dx \\rightarrow \\int(2x+3)^5 d(2x+3)$\n3. 调整系数：$d(2x+3)=2 dx \\Rightarrow dx=\\frac{1}{2} d(2x+3)$\n   原积分：$\\int(2x+3)^5 dx=\\int(2x+3)^5 \\cdot \\frac{1}{2} d(2x+3)=\\frac{1}{2} \\int(2x+3)^5 d(2x+3)$\n4. 套用公式：$\\int t^5 dt=\\frac{t^6}{6}+C$\n5. 化简结果：$\\int(2x+3)^5 dx=\\frac{1}{2} \\int(2x+3)^5 d(2x+3)=\\frac{1}{12}(2x+3)^6+C$",
      answer: "$\\frac{1}{12}(2x+3)^6+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 56,
      type: "计算题",
      title: "第一类换元积分法",
      question: "56. 求不定积分 $\\int \\frac{x}{\\sqrt{x^2+4}} dx$",
      explanation: "1. 发现复合：$\\frac{x}{\\sqrt{x^2+4}}$，内层函数是 $x^2+4$\n2. 强行改写：$\\int \\frac{x}{\\sqrt{x^2+4}} dx \\rightarrow \\int \\frac{x}{\\sqrt{x^2+4}} d(x^2+4)$\n3. 调整系数：$d(x^2+4)=2x dx \\Rightarrow dx=\\frac{1}{2x} d(x^2+4)$\n   原积分：$\\int \\frac{x}{\\sqrt{x^2+4}} dx=\\int \\frac{x}{\\sqrt{x^2+4}} \\cdot \\frac{1}{2x} d(x^2+4)=\\frac{1}{2} \\int \\frac{1}{\\sqrt{x^2+4}} d(x^2+4)$\n4. 套用公式：$\\int \\frac{1}{\\sqrt{t}} dt=2\\sqrt{t}+C$\n5. 化简结果：$\\int \\frac{x}{\\sqrt{x^2+4}} dx=\\frac{1}{2} \\int \\frac{1}{\\sqrt{x^2+4}} d(x^2+4)=\\sqrt{x^2+4}+C$",
      answer: "$\\sqrt{x^2+4}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 57,
      type: "计算题",
      title: "第一类换元积分法",
      question: "57. 求不定积分 $\\int \\frac{2x}{1+x^2} dx$",
      explanation: "1. 发现复合：$\\frac{2x}{1+x^2}$，内层函数是 $1+x^2$\n2. 强行改写：$\\int \\frac{2x}{1+x^2} dx \\rightarrow \\int \\frac{2x}{1+x^2} d(1+x^2)$\n3. 调整系数：$d(1+x^2)=2x dx \\Rightarrow dx=\\frac{1}{2x} d(1+x^2)$\n   原积分：$\\int \\frac{2x}{1+x^2} dx=\\int \\frac{2x}{1+x^2} \\cdot \\frac{1}{2x} d(1+x^2)=\\int \\frac{1}{1+x^2} d(1+x^2)$\n4. 套用公式：$\\int \\frac{1}{t} dt=\\ln|t|+C$\n5. 化简结果：$\\int \\frac{2x}{1+x^2} dx=\\int \\frac{1}{1+x^2} d(1+x^2)=\\ln|1+x^2|+C$",
      answer: "$\\ln|1+x^2|+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 58,
      type: "计算题",
      title: "第一类换元积分法",
      question: "58. 求不定积分 $\\int \\frac{1}{x(\\ln x+1)} dx$",
      explanation: "1. 发现复合：$\\frac{1}{x(\\ln x+1)}$，内层函数是 $\\ln x+1$\n2. 强行改写：$\\int \\frac{1}{x(\\ln x+1)} dx \\rightarrow \\int \\frac{1}{x(\\ln x+1)} d(\\ln x+1)$\n3. 调整系数：$d(\\ln x+1)=\\frac{1}{x} dx \\Rightarrow dx=x d(\\ln x+1)$\n   原积分：$\\int \\frac{1}{x(\\ln x+1)} dx=\\int \\frac{1}{x(\\ln x+1)} \\cdot x d(\\ln x+1)=\\int \\frac{1}{\\ln x+1} d(\\ln x+1)$\n4. 套用公式：$\\int \\frac{1}{t} dt=\\ln|t|+C$\n5. 化简结果：$\\int \\frac{1}{x(\\ln x+1)} dx=\\int \\frac{1}{\\ln x+1} d(\\ln x+1)=\\ln|\\ln x+1|+C$",
      answer: "$\\ln|\\ln x+1|+C$",
      difficulty: "hard",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 59,
      type: "计算题",
      title: "第一类换元积分法",
      question: "59. 求不定积分 $\\int \\sin(\\omega t+\\varphi) dt$",
      explanation: "1. 发现复合：$\\sin(\\omega t+\\varphi)$，内层函数是 $\\omega t+\\varphi$\n2. 强行改写：$\\int \\sin(\\omega t+\\varphi) dt \\rightarrow \\int \\sin(\\omega t+\\varphi) d(\\omega t+\\varphi)$\n3. 调整系数：$d(\\omega t+\\varphi)=\\omega dt \\Rightarrow dt=\\frac{1}{\\omega} d(\\omega t+\\varphi)$\n   原积分：$\\int \\sin(\\omega t+\\varphi) dt=\\int \\sin(\\omega t+\\varphi) \\cdot \\frac{1}{\\omega} d(\\omega t+\\varphi)=\\frac{1}{\\omega} \\int \\sin(\\omega t+\\varphi) d(\\omega t+\\varphi)$\n4. 套用公式：$\\int \\sin t dt=-\\cos t+C$\n5. 化简结果：$\\int \\sin(\\omega t+\\varphi) dt=\\frac{1}{\\omega} \\int \\sin(\\omega t+\\varphi) d(\\omega t+\\varphi)=-\\frac{1}{\\omega}\\cos(\\omega t+\\varphi)+C$",
      answer: "$-\\frac{1}{\\omega}\\cos(\\omega t+\\varphi)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 60,
      type: "计算题",
      title: "第一类换元积分法",
      question: "60. 求不定积分 $\\int \\cos x \\sin x dx$",
      explanation: "使用二倍角公式：$\\cos x \\sin x=\\frac{1}{2}\\sin 2x$\n1. 发现复合：$\\frac{1}{2}\\sin 2x$，内层函数是 $2x$\n2. 强行改写：$\\int \\frac{1}{2}\\sin 2x dx \\rightarrow \\int \\frac{1}{2}\\sin 2x d(2x)$\n3. 调整系数：$d(2x)=2 dx \\Rightarrow dx=\\frac{1}{2} d(2x)$\n   原积分：$\\int \\frac{1}{2}\\sin 2x dx=\\int \\frac{1}{2}\\sin 2x \\cdot \\frac{1}{2} d(2x)=\\frac{1}{4} \\int \\sin 2x d(2x)$\n4. 套用公式：$\\int \\sin t dt=-\\cos t+C$\n5. 化简结果：$\\int \\frac{1}{2}\\sin 2x dx=\\frac{1}{4} \\int \\sin 2x d(2x)=-\\frac{1}{4}\\cos 2x+C$",
      answer: "$-\\frac{1}{4}\\cos 2x+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 61,
      type: "计算题",
      title: "第一类换元积分法",
      question: "61. 求不定积分 $\\int \\cos^2 x dx$",
      explanation: "使用二倍角公式：$\\cos^2 x=\\frac{1}{2}(1+\\cos 2x)$\n原式 $=\\int \\frac{1}{2} dx+\\int \\frac{1}{2}\\cos 2x dx$\n第一部分：$\\int \\frac{1}{2} dx=\\frac{1}{2}x$\n第二部分：\n1. 发现复合：$\\frac{1}{2}\\cos 2x$，内层函数是 $2x$\n2. 强行改写：$\\int \\frac{1}{2}\\cos 2x dx \\rightarrow \\int \\frac{1}{2}\\cos 2x d(2x)$\n3. 调整系数：$d(2x)=2 dx \\Rightarrow dx=\\frac{1}{2} d(2x)$\n   原积分：$\\int \\frac{1}{2}\\cos 2x dx=\\int \\frac{1}{2}\\cos 2x \\cdot \\frac{1}{2} d(2x)=\\frac{1}{4} \\int \\cos 2x d(2x)$\n4. 套用公式：$\\int \\cos t dt=\\sin t+C$\n5. 化简结果：$\\int \\cos^2 x dx=\\frac{1}{2}x+\\frac{1}{4}\\sin 2x+C$",
      answer: "$\\frac{1}{2}x+\\frac{1}{4}\\sin 2x+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 62,
      type: "计算题",
      title: "第一类换元积分法",
      question: "62. 求不定积分 $\\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} dt$",
      explanation: "1. 发现复合：$\\cos\\sqrt{t}$，内层函数是 $\\sqrt{t}$\n2. 强行改写：$\\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} dt \\rightarrow \\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} d(\\sqrt{t})$\n3. 调整系数：$d(\\sqrt{t})=\\frac{1}{2\\sqrt{t}} dt \\Rightarrow dt=2\\sqrt{t} d(\\sqrt{t})$\n   原积分：$\\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} dt=\\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} \\cdot 2\\sqrt{t} d(\\sqrt{t})=2 \\int \\cos\\sqrt{t} d(\\sqrt{t})$\n4. 套用公式：$\\int \\cos t dt=\\sin t+C$\n5. 化简结果：$\\int \\frac{\\cos\\sqrt{t}}{\\sqrt{t}} dt=2 \\int \\cos\\sqrt{t} d(\\sqrt{t})=2\\sin\\sqrt{t}+C$",
      answer: "$2\\sin\\sqrt{t}+C$",
      difficulty: "hard",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 63,
      type: "计算题",
      title: "第一类换元积分法",
      question: "63. 求 $\\int \\frac{dx}{4+9x^2}$",
      explanation: "提出公因数：$\\int \\frac{dx}{4(1+\\frac{9}{4}x^2)}$\n1. 发现复合：$\\frac{1}{4(1+\\frac{9}{4}x^2)}$，内层函数是 $\\frac{3}{2}x$\n2. 强行改写：$\\int \\frac{1}{4(1+(\\frac{3}{2}x)^2)} dx \\rightarrow \\int \\frac{1}{4(1+(\\frac{3}{2}x)^2)} d(\\frac{3}{2}x)$\n3. 调整系数：$d(\\frac{3}{2}x)=\\frac{3}{2} dx \\Rightarrow dx=\\frac{2}{3} d(\\frac{3}{2}x)$\n   原积分：$\\int \\frac{1}{4(1+(\\frac{3}{2}x)^2)} dx=\\int \\frac{1}{4(1+(\\frac{3}{2}x)^2)} \\cdot \\frac{2}{3} d(\\frac{3}{2}x)=\\frac{1}{6} \\int \\frac{1}{1+(\\frac{3}{2}x)^2} d(\\frac{3}{2}x)$\n4. 套用公式：$\\int \\frac{1}{1+t^2} dt=\\arctan t+C$\n5. 化简结果：$\\int \\frac{dx}{4+9x^2}=\\frac{1}{6}\\arctan(\\frac{3}{2}x)+C$",
      answer: "$\\frac{1}{6}\\arctan(\\frac{3}{2}x)+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 64,
      type: "计算题",
      title: "第一类换元积分法",
      question: "64. 求 $\\int \\frac{\\sin x}{\\cos^3 x} dx$",
      explanation: "1. 发现复合：$\\frac{\\sin x}{\\cos^3 x}$，内层函数是 $\\cos x$\n2. 强行改写：$\\int \\frac{\\sin x}{\\cos^3 x} dx \\rightarrow \\int \\frac{\\sin x}{\\cos^3 x} d(\\cos x)$\n3. 调整系数：$d(\\cos x)=-\\sin x dx \\Rightarrow dx=-\\frac{1}{\\sin x} d(\\cos x)$\n   原积分：$\\int \\frac{\\sin x}{\\cos^3 x} dx=\\int \\frac{\\sin x}{\\cos^3 x} \\cdot(-\\frac{1}{\\sin x}) d(\\cos x)=-\\int \\frac{1}{\\cos^3 x} d(\\cos x)$\n4. 套用公式：$\\int \\frac{1}{t^3} dt=-\\frac{1}{2t^2}+C$\n5. 化简结果：$\\int \\frac{\\sin x}{\\cos^3 x} dx=-(-\\frac{1}{2\\cos^2 x})+C=\\frac{1}{2\\cos^2 x}+C$",
      answer: "$\\frac{1}{2\\cos^2 x}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 65,
      type: "计算题",
      title: "第一类换元积分法",
      question: "65. 求不定积分 $\\int \\frac{dx}{x^2-x-2}$",
      explanation: "分解：$\\frac{1}{x^2-x-2}=\\frac{1}{(x+1)(x-2)}=\\frac{A}{x+1}+\\frac{B}{x-2}$\n通分：$\\frac{A(x-2)+B(x+1)}{(x+1)(x-2)}=\\frac{1}{(x+1)(x-2)}$\n分子相等：$A(x-2)+B(x+1)=1$\n整理：$(A+B)x+(A+2B)=1$\n系数相等：$A+B=0$\n常数项相等：$-2A+B=1$\n解得：$A=-\\frac{1}{3}, B=\\frac{1}{3}$\n所以：$\\frac{1}{x^2-x-2}=-\\frac{1}{3(x+1)}+\\frac{1}{3(x-2)}$\n1. 发现复合：$-\\frac{1}{3(x+1)}+\\frac{1}{3(x-2)}$，内层函数是 $x+1$ 和 $x-2$\n2. 强行改写：$\\int(-\\frac{1}{3(x+1)}+\\frac{1}{3(x-2)}) dx \\rightarrow-\\frac{1}{3} \\int \\frac{1}{x+1} d(x+1)+\\frac{1}{3} \\int \\frac{1}{x-2} d(x-2)$\n3. 调整系数：$d(x+1)=dx$ 和 $d(x-2)=dx$\n   原积分：$\\int \\frac{1}{x^2-x-2} dx=-\\frac{1}{3} \\int \\frac{1}{x+1} d(x+1)+\\frac{1}{3} \\int \\frac{1}{x-2} d(x-2)$\n4. 套用公式：$\\int \\frac{1}{t} dt=\\ln|t|+C$\n5. 化简结果：$\\int \\frac{1}{x^2-x-2} dx=-\\frac{1}{3}\\ln|x+1|+\\frac{1}{3}\\ln|x-2|=\\frac{1}{3}\\ln|\\frac{x-2}{x+1}|+C$",
      answer: "$\\frac{1}{3}\\ln|\\frac{x-2}{x+1}|+C$",
      difficulty: "hard",
      category: "换元积分",
      method: "第一类换元积分法"
    },
    {
      id: 66,
      type: "计算题",
      title: "第二类换元积分法",
      question: "66. 求不定积分 $\\int \\frac{dx}{\\sqrt{1+2x}}$",
      explanation: "设 $\\sqrt{1+2x}=t$，则 $1+2x=t^2$\n解出 $x=\\frac{t^2-1}{2}$\n求 $dx$，由 $x=\\frac{t^2-1}{2}$，得：$dx=t dt$\n将 $x$ 和 $dx$ 代入原式：$\\int \\frac{dx}{\\sqrt{1+2x}}=\\int \\frac{t dt}{t}$\n化简：$=\\int dt$\n积分：$=t+C$\n还原 $t$：$=\\sqrt{1+2x}+C$",
      answer: "$\\sqrt{1+2x}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第二类换元积分法"
    },
    {
      id: 67,
      type: "计算题",
      title: "第二类换元积分法",
      question: "67. 求不定积分 $\\int \\frac{dx}{\\sqrt{x}(1+x)}$",
      explanation: "令 $\\sqrt{x}=t$，则：\n$x=t^2$\n$dx=2t dt$\n原式 $=\\int \\frac{2t}{t(1+t^2)} dt=2 \\int \\frac{dt}{1+t^2}=2 \\arctan t+C=2 \\arctan \\sqrt{x}+C$",
      answer: "$2 \\arctan \\sqrt{x}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第二类换元积分法"
    },
    {
      id: 68,
      type: "计算题",
      title: "第二类换元积分法",
      question: "68. 求不定积分 $\\int \\frac{dx}{(x+2)\\sqrt{x+1}}$",
      explanation: "令 $\\sqrt{x+1}=t$，则：\n$x=t^2-1$\n$dx=2t dt$\n原式 $=\\int \\frac{2t}{(t^2+1)t} dt=2 \\int \\frac{dt}{t^2+1}=2 \\arctan t+C=2 \\arctan \\sqrt{x+1}+C$",
      answer: "$2 \\arctan \\sqrt{x+1}+C$",
      difficulty: "medium",
      category: "换元积分",
      method: "第二类换元积分法"
    },
    {
      id: 69,
      type: "计算题",
      title: "第二类换元积分法",
      question: "69. 求不定积分 $\\int \\frac{dx}{\\sqrt{x}+\\sqrt[3]{x}}$",
      explanation: "令 $\\sqrt[6]{x}=t$，则：\n$x=t^6$\n$dx=6t^5 dt$\n原式 $=\\int \\frac{6t^5}{t^3+t^2} dt=6 \\int \\frac{t^3}{t+1} dt=6 \\int(t^2-t+1-\\frac{1}{t+1}) dt$\n$=6(\\frac{t^3}{3}-\\frac{t^2}{2}+t-\\ln|t+1|)+C$\n$=2t^3-3t^2+6t-6\\ln|t+1|+C$\n$=2(x^{1/2})-3(x^{1/3})+6(x^{1/6})-6\\ln|\\sqrt[6]{x}+1|+C$",
      answer: "$2(x^{1/2})-3(x^{1/3})+6(x^{1/6})-6\\ln|\\sqrt[6]{x}+1|+C$",
      difficulty: "hard",
      category: "换元积分",
      method: "第二类换元积分法"
    }


  ]
}; 