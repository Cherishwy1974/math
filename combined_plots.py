import numpy as np
import matplotlib.pyplot as plt
import os
from matplotlib.patches import Polygon
import matplotlib

# 创建保存图片的目录
os.makedirs('D:\\cursor play\\math project\\images\\plots', exist_ok=True)

# 设置中文字体支持
matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题

# 设置教科书风格的格式
def setup_textbook_style():
    plt.rcParams.update({
        'font.family': 'sans-serif',  # 使用无衬线字体以支持中文
        'font.sans-serif': ['SimHei', 'Microsoft YaHei', 'SimSun', 'Arial'],
        'mathtext.fontset': 'cm',
        'axes.labelsize': 12,
        'axes.titlesize': 14,
        'xtick.labelsize': 10,
        'ytick.labelsize': 10,
        'legend.fontsize': 10,
        'figure.figsize': (8, 6),
        'text.usetex': False,  # 使用False以支持中文
    })

# 创建教科书风格的坐标轴函数
def setup_textbook_axes(ax, xlim, ylim, title):
    # 设置限制范围
    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    
    # 在适当位置放置坐标轴
    if xlim[0] <= 0 and xlim[1] >= 0:
        ax.spines['left'].set_position(('data', 0))
    else:
        ax.spines['left'].set_position(('axes', 0))
    
    if ylim[0] <= 0 and ylim[1] >= 0:
        ax.spines['bottom'].set_position(('data', 0))
    else:
        ax.spines['bottom'].set_position(('axes', 0))
    
    # 移除顶部和右侧的脊线
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    
    # 添加坐标轴箭头
    ax.plot(1, 0, ">k", transform=ax.get_yaxis_transform(), clip_on=False)
    ax.plot(0, 1, "^k", transform=ax.get_xaxis_transform(), clip_on=False)
    
    # 添加标签和标题
    ax.set_xlabel('$x$', fontsize=12, loc='right')
    ax.set_ylabel('$y$', fontsize=12, loc='top', rotation=0)
    ax.set_title(title, fontsize=14)
    
    # 添加网格
    ax.grid(True, alpha=0.3, linestyle='--')

# 图30: 区间[1, 2]上的函数f(x) = x²
def plot_30():
    fig, ax = plt.subplots()
    
    # 数据点 - 扩展范围以显示原点
    x = np.linspace(0, 2.5, 100)
    y = x**2
    
    # 绘制函数
    ax.plot(x, y, 'b-', linewidth=2)
    
    # 填充面积
    x_fill = np.linspace(1, 2, 100)
    y_fill = x_fill**2
    ax.fill_between(x_fill, 0, y_fill, alpha=0.3, color='skyblue')
    
    # 设置教科书风格坐标轴 - 修改x轴范围，包含0点
    setup_textbook_axes(ax, [0, 2.2], [0, 5], '区间$[1, 2]$上的函数$f(x) = x^2$')
    
    # 标记关键点
    ax.plot([0, 1, 2], [0, 1, 4], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(0.1, 0.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(1, 1)$', xy=(1, 1), xytext=(0.7, 1.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(2, 4)$', xy=(2, 4), xytext=(1.7, 4.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 在x=1和x=2处绘制垂直虚线来标记积分区域
    ax.axvline(x=1, color='r', linestyle='--', alpha=0.5)
    ax.axvline(x=2, color='r', linestyle='--', alpha=0.5)
    
    # 添加面积标签
    ax.text(1.5, 2, '面积 = $\\int_1^2 x^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-30.png', dpi=150)
    plt.close()

# 图31: 区间[-2, 2]上的函数f(x) = 4 - x²及其与x轴的面积
def plot_31():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-3, 3, 200)
    y = 4 - x**2
    
    # 绘制函数
    ax.plot(x, y, 'b-', linewidth=2)
    
    # 填充面积
    x_fill = np.linspace(-2, 2, 100)
    y_fill = 4 - x_fill**2
    ax.fill_between(x_fill, 0, y_fill, alpha=0.3, color='skyblue')
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-3, 3], [-5, 5], '区间$[-2, 2]$上的函数$f(x) = 4 - x^2$')
    
    # 标记关键点
    ax.plot([-2, 0, 2], [0, 4, 0], 'ro')
    ax.annotate('$(-2, 0)$', xy=(-2, 0), xytext=(-2.5, 0.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(0, 4)$', xy=(0, 4), xytext=(-0.5, 4.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(2, 0)$', xy=(2, 0), xytext=(2.2, 0.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加面积标签
    ax.text(0, 2, '面积 = $\\int_{-2}^{2} (4 - x^2) dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-31.png', dpi=150)
    plt.close()

# 图32: 函数f₁(x) = x²和f₂(x) = 4x之间的面积
def plot_32():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(0, 5, 200)
    y1 = x**2
    y2 = 4*x
    
    # 绘制函数
    ax.plot(x, y1, 'b-', linewidth=2, label='$f_1(x) = x^2$')
    ax.plot(x, y2, 'r-', linewidth=2, label='$f_2(x) = 4x$')
    
    # 填充曲线之间的面积
    x_fill = np.linspace(0, 4, 100)
    y1_fill = x_fill**2
    y2_fill = 4*x_fill
    ax.fill_between(x_fill, y1_fill, y2_fill, alpha=0.3, color='lightgreen')
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [0, 5], [0, 20], '函数$f_1(x) = x^2$和$f_2(x) = 4x$之间的面积')
    
    # 标记关键点
    ax.plot([0, 4], [0, 16], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(0.2, 1), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(4, 16)$', xy=(4, 16), xytext=(3.5, 17), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加面积标签
    ax.text(2, 6, '面积 = $\\int_{0}^{4} (4x - x^2) dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    ax.legend(loc='upper left')
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-32.png', dpi=150)
    plt.close()

# 图33: 区间[0, 4]上的函数f(x) = √x绕x轴旋转的旋转体
def plot_33():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.5, 4.5, 200)
    y = np.sqrt(np.maximum(x, 0))  # 使用maximum避免负值
    
    # 绘制函数及其反射
    ax.plot(x, y, 'b-', linewidth=2)
    ax.plot(x, -y, 'b-', linewidth=2)
    
    # 填充旋转区域
    x_fill = np.linspace(0, 4, 100)
    y_fill = np.sqrt(x_fill)
    ax.fill_between(x_fill, y_fill, -y_fill, alpha=0.2, color='skyblue')
    
    # 绘制"切片"来表示旋转体
    slice_positions = [0, 1, 2, 3, 4]
    for pos in slice_positions:
        radius = np.sqrt(pos) if pos > 0 else 0
        ax.plot([pos, pos], [-radius, radius], 'k-', linewidth=0.8)
    
    # 绘制不同视角以增强3D效果
    view_angles = [0.25, 0.5, 0.75]
    for angle in view_angles:
        y_factor = np.cos(angle * np.pi)
        x_curve = np.linspace(0, 4, 50)
        y_curve = np.sqrt(x_curve) * y_factor
        ax.plot(x_curve, y_curve, 'b--', linewidth=0.7, alpha=0.5)
        ax.plot(x_curve, -y_curve, 'b--', linewidth=0.7, alpha=0.5)
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.5, 4.5], [-2.5, 2.5], 
                       '区间$[0, 4]$上的函数$f(x) = \\sqrt{x}$绕$x$轴旋转')
    
    # 标记关键点
    ax.plot([0, 4], [0, 2], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.5, 0.3), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(4, 2)$', xy=(4, 2), xytext=(3.5, 2.3), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加旋转指示
    ax.text(2, 0, '$\\rightarrow$', fontsize=18, ha='center')
    ax.text(2, -0.5, '旋转', fontsize=10, ha='center')
    
    # 添加体积标签
    ax.text(2.5, 1.5, '体积 = $\\pi\\int_{0}^{4} (\\sqrt{x})^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-33.png', dpi=150)
    plt.close()

# 图34: 区间[0, 1]上的函数f(x) = x²绕x轴旋转的旋转体
def plot_34():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.2, 1.2, 200)
    y = x**2
    
    # 绘制函数及其反射
    ax.plot(x, y, 'b-', linewidth=2)
    ax.plot(x, -y, 'b-', linewidth=2)
    
    # 填充旋转区域
    x_fill = np.linspace(0, 1, 100)
    y_fill = x_fill**2
    ax.fill_between(x_fill, y_fill, -y_fill, alpha=0.2, color='skyblue')
    
    # 绘制"切片"来表示旋转体
    slice_positions = [0, 0.25, 0.5, 0.75, 1]
    for pos in slice_positions:
        radius = pos**2
        ax.plot([pos, pos], [-radius, radius], 'k-', linewidth=0.8)
    
    # 绘制不同视角以增强3D效果
    view_angles = [0.25, 0.5, 0.75]
    for angle in view_angles:
        y_factor = np.cos(angle * np.pi)
        x_curve = np.linspace(0, 1, 50)
        y_curve = x_curve**2 * y_factor
        ax.plot(x_curve, y_curve, 'b--', linewidth=0.7, alpha=0.5)
        ax.plot(x_curve, -y_curve, 'b--', linewidth=0.7, alpha=0.5)
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.2, 1.2], [-1.2, 1.2], 
                       '区间$[0, 1]$上的函数$f(x) = x^2$绕$x$轴旋转')
    
    # 标记关键点
    ax.plot([0, 1], [0, 1], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.15, 0.1), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(1, 1)$', xy=(1, 1), xytext=(0.85, 1.1), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加旋转指示
    ax.text(0.5, 0, '$\\rightarrow$', fontsize=18, ha='center')
    ax.text(0.5, -0.2, '旋转', fontsize=10, ha='center')
    
    # 添加体积标签
    ax.text(0.5, 0.7, '体积 = $\\pi\\int_{0}^{1} (x^2)^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-34.png', dpi=150)
    plt.close()

# 图37: 区间[0, π]上的函数f(x) = sin(x)
def plot_37():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.5, np.pi+0.5, 200)
    y = np.sin(x)
    
    # 绘制函数
    ax.plot(x, y, 'b-', linewidth=2)
    
    # 填充面积
    x_fill = np.linspace(0, np.pi, 100)
    y_fill = np.sin(x_fill)
    ax.fill_between(x_fill, 0, y_fill, alpha=0.3, color='skyblue')
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.5, np.pi+0.5], [-0.2, 1.2], 
                       '区间$[0, \\pi]$上的函数$f(x) = \\sin(x)$')
    
    # 标记关键点
    ax.plot([0, np.pi/2, np.pi], [0, 1, 0], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.3, -0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(\\pi/2, 1)$', xy=(np.pi/2, 1), xytext=(np.pi/2-0.5, 1.1), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(\\pi, 0)$', xy=(np.pi, 0), xytext=(np.pi+0.2, -0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加π标记到x轴
    ax.set_xticks([0, np.pi/2, np.pi])
    ax.set_xticklabels(['0', '$\\pi/2$', '$\\pi$'])
    
    # 添加面积标签
    ax.text(np.pi/2, 0.5, '面积 = $\\int_{0}^{\\pi} \\sin(x) dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-37.png', dpi=150)
    plt.close()

# 图38: 区间[0, π]上的函数f(x) = sin(x)绕x轴旋转的旋转体
def plot_38():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.5, np.pi+0.5, 200)
    y = np.sin(x)
    
    # 绘制函数及其反射
    ax.plot(x, y, 'b-', linewidth=2)
    ax.plot(x, -y, 'b-', linewidth=2)
    
    # 填充旋转区域
    x_fill = np.linspace(0, np.pi, 100)
    y_fill = np.sin(x_fill)
    ax.fill_between(x_fill, y_fill, -y_fill, alpha=0.2, color='skyblue')
    
    # 绘制"切片"来表示旋转体
    slice_positions = [0, np.pi/6, np.pi/4, np.pi/3, np.pi/2, 2*np.pi/3, 5*np.pi/6, np.pi]
    for pos in slice_positions:
        radius = np.sin(pos)
        ax.plot([pos, pos], [-radius, radius], 'k-', linewidth=0.8)
    
    # 绘制不同视角以增强3D效果
    view_angles = [0.25, 0.5, 0.75]
    for angle in view_angles:
        y_factor = np.cos(angle * np.pi)
        x_curve = np.linspace(0, np.pi, 50)
        y_curve = np.sin(x_curve) * y_factor
        ax.plot(x_curve, y_curve, 'b--', linewidth=0.7, alpha=0.5)
        ax.plot(x_curve, -y_curve, 'b--', linewidth=0.7, alpha=0.5)
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.5, np.pi+0.5], [-1.2, 1.2], 
                       '区间$[0, \\pi]$上的函数$f(x) = \\sin(x)$绕$x$轴旋转')
    
    # 标记关键点
    ax.plot([0, np.pi/2, np.pi], [0, 1, 0], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.3, 0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(\\pi/2, 1)$', xy=(np.pi/2, 1), xytext=(np.pi/2-0.5, 1.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(\\pi, 0)$', xy=(np.pi, 0), xytext=(np.pi+0.2, 0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加π标记到x轴
    ax.set_xticks([0, np.pi/2, np.pi])
    ax.set_xticklabels(['0', '$\\pi/2$', '$\\pi$'])
    
    # 添加旋转指示
    ax.text(np.pi/2, 0, '$\\rightarrow$', fontsize=18, ha='center')
    ax.text(np.pi/2, -0.2, '旋转', fontsize=10, ha='center')
    
    # 添加体积标签
    ax.text(2, 0.7, '体积 = $\\pi\\int_{0}^{\\pi} (\\sin(x))^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-38.png', dpi=150)
    plt.close()

# 图39: 由y=2x, x=1, y=0围成的区域绕x轴旋转的旋转体
def plot_39():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.2, 1.2, 200)
    y1 = 2 * x  # y = 2x
    y2 = np.zeros_like(x)  # y = 0
    
    # 绘制函数
    ax.plot(x, y1, 'b-', linewidth=2, label='$y = 2x$')
    ax.plot(x, -y1, 'b-', linewidth=2, alpha=0.7)  # 反射
    ax.plot(x, y2, 'r-', linewidth=2, label='$y = 0$')
    ax.axvline(x=1, color='g', linestyle='-', linewidth=2, label='$x = 1$')
    
    # 填充旋转区域
    x_fill = np.linspace(0, 1, 100)
    y_fill = 2 * x_fill
    ax.fill_between(x_fill, y_fill, 0, alpha=0.2, color='skyblue')
    ax.fill_between(x_fill, -y_fill, 0, alpha=0.2, color='skyblue')
    
    # 绘制"切片"来表示旋转体
    slice_positions = [0, 0.25, 0.5, 0.75, 1]
    for pos in slice_positions:
        radius = 2 * pos
        ax.plot([pos, pos], [-radius, radius], 'k-', linewidth=0.8)
    
    # 绘制不同视角以增强3D效果
    view_angles = [0.25, 0.5, 0.75]
    for angle in view_angles:
        y_factor = np.cos(angle * np.pi)
        x_curve = np.linspace(0, 1, 50)
        y_curve = 2 * x_curve * y_factor
        ax.plot(x_curve, y_curve, 'b--', linewidth=0.7, alpha=0.5)
        ax.plot(x_curve, -y_curve, 'b--', linewidth=0.7, alpha=0.5)
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.2, 1.2], [-2.5, 2.5], 
                       '由$y=2x$, $x=1$, $y=0$围成的区域绕$x$轴旋转')
    
    # 标记关键点
    ax.plot([0, 1, 1], [0, 0, 2], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.15, 0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(1, 2)$', xy=(1, 2), xytext=(0.85, 2.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(1, 0)$', xy=(1, 0), xytext=(1.05, -0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加旋转指示
    ax.text(0.5, 0, '$\\rightarrow$', fontsize=18, ha='center')
    ax.text(0.5, -0.3, '旋转', fontsize=10, ha='center')
    
    # 添加体积标签
    ax.text(0.5, 1.5, '体积 = $\\pi\\int_{0}^{1} (2x)^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    ax.legend(loc='upper left')
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-39.png', dpi=150)
    plt.close()

# 图49: 区间[0,1]上y = x(1-x)下的面积
def plot_49():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-0.2, 1.2, 200)
    y = x * (1 - x)
    
    # 绘制函数
    ax.plot(x, y, 'b-', linewidth=2)
    
    # 填充面积
    x_fill = np.linspace(0, 1, 100)
    y_fill = x_fill * (1 - x_fill)
    ax.fill_between(x_fill, 0, y_fill, alpha=0.3, color='skyblue')
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-0.2, 1.2], [-0.1, 0.3], 
                       '区间$[0,1]$上$y = x(1-x)$下的面积')
    
    # 标记关键点
    ax.plot([0, 0.5, 1], [0, 0.25, 0], 'ro')
    ax.annotate('$(0, 0)$', xy=(0, 0), xytext=(-0.15, -0.05), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(0.5, 0.25)$', xy=(0.5, 0.25), xytext=(0.6, 0.25), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(1, 0)$', xy=(1, 0), xytext=(1.05, 0.05), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加面积标签
    ax.text(0.3, 0.1, '面积 = $\\int_{0}^{1} x(1-x) dx = \\frac{1}{6}$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-49.png', dpi=150)
    plt.close()

# 图50: 由y = x + 1, x = -2, x = 2和x轴围成的区域绕x轴旋转的体积
def plot_50():
    fig, ax = plt.subplots()
    
    # 数据点
    x = np.linspace(-2.5, 2.5, 200)
    y = x + 1
    y[y < 0] = 0  # 在y=0处截断
    
    # 绘制函数
    ax.plot(x, x + 1, 'b-', linewidth=2, label='$y = x + 1$')
    ax.plot(x, -(x + 1), 'b-', linewidth=2, alpha=0.7)  # 反射
    ax.axvline(x=-2, color='g', linestyle='-', linewidth=2, label='$x = -2$')
    ax.axvline(x=2, color='g', linestyle='-', linewidth=2, label='$x = 2$')
    ax.axhline(y=0, color='r', linestyle='-', linewidth=2, label='$y = 0$')
    
    # 找到交点
    x1 = -1  # y = x + 1与y = 0的交点
    
    # 填充旋转区域
    x_fill1 = np.linspace(-2, x1, 50)
    y_fill1 = x_fill1 + 1
    ax.fill_between(x_fill1, y_fill1, 0, alpha=0.2, color='skyblue')
    ax.fill_between(x_fill1, -y_fill1, 0, alpha=0.2, color='skyblue')
    
    x_fill2 = np.linspace(x1, 2, 50)
    y_fill2 = x_fill2 + 1
    ax.fill_between(x_fill2, y_fill2, 0, alpha=0.2, color='skyblue')
    ax.fill_between(x_fill2, -y_fill2, 0, alpha=0.2, color='skyblue')
    
    # 绘制"切片"来表示旋转体
    slice_positions = [-2, -1.5, -1, 0, 1, 2]
    for pos in slice_positions:
        radius = max(0, pos + 1)
        ax.plot([pos, pos], [-radius, radius], 'k-', linewidth=0.8)
    
    # 绘制不同视角以增强3D效果
    view_angles = [0.25, 0.5, 0.75]
    for angle in view_angles:
        y_factor = np.cos(angle * np.pi)
        x_curve = np.linspace(-2, 2, 50)
        y_curve = np.maximum(0, x_curve + 1) * y_factor
        ax.plot(x_curve, y_curve, 'b--', linewidth=0.7, alpha=0.5)
        ax.plot(x_curve, -y_curve, 'b--', linewidth=0.7, alpha=0.5)
    
    # 设置教科书风格坐标轴
    setup_textbook_axes(ax, [-2.5, 2.5], [-3.5, 3.5], 
                       '由$y = x + 1$, $x = -2$, $x = 2$, $y = 0$围成的区域绕$x$轴旋转')
    
    # 标记关键点
    ax.plot([-2, -1, 2], [-1, 0, 3], 'ro')
    ax.annotate('$(-2, -1)$', xy=(-2, -1), xytext=(-2.2, -1.5), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(-1, 0)$', xy=(-1, 0), xytext=(-1.2, 0.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    ax.annotate('$(2, 3)$', xy=(2, 3), xytext=(1.7, 3.2), 
                arrowprops=dict(arrowstyle='->'), fontsize=10)
    
    # 添加旋转指示
    ax.text(0, 0, '$\\rightarrow$', fontsize=18, ha='center')
    ax.text(0, -0.3, '旋转', fontsize=10, ha='center')
    
    # 添加体积标签
    ax.text(0, 2, '体积 = $\\pi\\int_{-1}^{2} (x+1)^2 dx$', 
            ha='center', fontsize=10,
            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    ax.legend(loc='upper left')
    plt.savefig('D:\\cursor play\\math project\\images\\plots\\plot-50.png', dpi=150)
    plt.close()

# 创建所有图表的主函数
def create_all_plots():
    # 设置全局绘图风格
    setup_textbook_style()
    
    # 生成所有图表
    plot_30()
    plot_31()
    plot_32()
    plot_33()
    plot_34()
    plot_37()
    plot_38()
    plot_39()
    plot_49()
    plot_50()
    
    print("所有图像已成功创建，保存在 'D:\\cursor play\\math project\\images\\plots' 目录下。")

# 运行主函数
if __name__ == "__main__":
    create_all_plots()