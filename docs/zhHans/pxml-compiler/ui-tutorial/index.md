# PXML UI 教程

本教程面向第一次使用 PXML 构建 PCL.UI.Next 界面的开发者。示例从最小页面开始，并始终保留一条可验证的构建链：

```text
PXML 源文件 → 检查 → 展开与优化 → PXB → PCL.UI.Next Runtime
```

## 学习路线

1. [创建第一个界面](./First-Page)：编写 `Page`、`Column`、`Text` 和 `Button`，然后生成并检查 PXB。
2. 布局与尺寸：组合 Stack、Grid、Overlay、Absolute 与长度约束。
3. 数据与交互：使用纯函数 Binding、Command 和结构指令。
4. 组件与模板：提取可复用 Component、Property 和 Slot。
5. 样式与资源：组织 PXSS、Theme Token、本地化与资源引用。

当前已发布第一章；后续章节会继续加入这个分类。编译器只负责构建期转换，窗口创建、输入、布局、动画与渲染由 PCL.UI.Next Runtime 执行。

