# 交易聊天室 UI

这是一个基于 React + TypeScript + Tailwind CSS 的交易聊天室用户界面演示项目。

## 功能特性

- ✅ 实时聊天界面
- ✅ 智能客服回复（基于关键词匹配）
- ✅ 表情选择面板
- ✅ 图片上传功能
- ✅ 快速操作按钮（催客服、评价、交易信息、投诉建议）
- ✅ 弹窗表单（评分、投诉等）
- ✅ 移动端适配
- ✅ 自动滚动到最新消息

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可看到界面。

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
.
├── src/
│   ├── routes/
│   │   └── index.tsx       # 主聊天室组件
│   ├── index.css           # 全局样式
│   └── main.tsx            # 应用入口
├── index.html              # HTML 模板
├── tailwind.config.js      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 配置
```

## 技术栈

- **React 18** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Lucide React** - 图标库
- **Sonner** - 通知提示

## 主要功能说明

### 智能回复

系统会根据用户输入的关键词自动匹配并回复：
- "价格", "多少钱" → 价格相关回复
- "发货", "什么时候" → 发货相关回复
- "退款", "退货" → 退款相关回复
- 等等...

### 快速操作

- **催客服** - 发送催促消息
- **评价** - 打开评分表单
- **交易信息** - 查看订单详情
- **投诉建议** - 提交投诉或建议

### 消息类型

- 系统消息（系统通知）
- 用户文本消息（橙色气泡）
- 用户图片消息
- 客服回复消息（白色气泡）

## 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 许可证

MIT
