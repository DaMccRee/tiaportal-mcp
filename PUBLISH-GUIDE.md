# VSCode 扩展发布指南

## 📋 发布到 Visual Studio Code Marketplace

### 1️⃣ 准备工作

#### 创建 Azure DevOps 账号

1. 访问 [Azure DevOps](https://dev.azure.com/)
2. 使用 Microsoft 账号登录（或创建新账号）
3. 创建一个组织（Organization）

#### 创建发布者账号

1. 访问 [Visual Studio Marketplace 发布者管理](https://marketplace.visualstudio.com/manage)
2. 点击 "Create publisher"
3. 填写发布者信息：
   - **Publisher ID**: `DaMccRee` （必须唯一，小写字母、数字、连字符）
   - **Display Name**: `DaMccRee` 或您的显示名称
   - **Email**: 您的邮箱

#### 生成个人访问令牌 (PAT)

1. 访问 [Azure DevOps Personal Access Tokens](https://dev.azure.com/) 
2. 点击右上角用户图标 → "Personal access tokens"
3. 点击 "+ New Token"
4. 设置令牌：
   - **Name**: `vsce-publish-token`
   - **Organization**: 选择您的组织
   - **Expiration**: 设置过期时间（建议 90 天）
   - **Scopes**: 选择 "Custom defined"
     - 展开 "Marketplace"
     - 勾选 ✅ **Acquire** (获取)
     - 勾选 ✅ **Publish** (发布)
     - 勾选 ✅ **Manage** (管理)
5. 点击 "Create"
6. **⚠️ 重要**: 立即复制并保存令牌，关闭后将无法再次查看

### 2️⃣ 配置发布者信息

确认 `package.json` 中的发布者 ID 与您创建的发布者 ID 一致：

```json
{
  "publisher": "DaMccRee"
}
```

### 3️⃣ 登录 VSCE

在终端中运行：

```bash
cd c:\Users\DHY\Documents\tiaportal-mcp-v19\vscode-extension

# 使用您的 PAT 登录
npx @vscode/vsce login DaMccRee
# 输入刚才复制的 PAT（粘贴时不会显示）
```

### 4️⃣ 发布扩展

#### 首次发布

```bash
# 方法 1: 直接发布（自动打包）
npx @vscode/vsce publish

# 方法 2: 使用已打包的 VSIX
npx @vscode/vsce publish -p <YOUR_PAT> tiaportal-mcp-v19-1.0.0.vsix
```

#### 后续更新发布

发布新版本时，可以指定版本号递增方式：

```bash
# 发布补丁版本 (1.0.0 → 1.0.1)
npx @vscode/vsce publish patch

# 发布次要版本 (1.0.0 → 1.1.0)
npx @vscode/vsce publish minor

# 发布主要版本 (1.0.0 → 2.0.0)
npx @vscode/vsce publish major

# 或指定具体版本号
npx @vscode/vsce publish 1.0.1
```

### 5️⃣ 验证发布

1. 访问 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. 搜索 "TIA Portal V19 MCP Server"
3. 或直接访问您的扩展页面：
   - `https://marketplace.visualstudio.com/items?itemName=DaMccRee.tiaportal-mcp-v19`

### 6️⃣ 管理扩展

访问 [发布者管理面板](https://marketplace.visualstudio.com/manage/publishers/DaMccRee) 可以：

- 查看下载统计
- 更新扩展描述
- 上传新版本
- 回复用户评论
- 删除或隐藏版本

---

## 📝 发布前检查清单

在执行发布前，请确认：

- ✅ **package.json** 已更新：
  - [ ] `version` 设置为 `1.0.0`
  - [ ] `publisher` 设置为 `DaMccRee`
  - [ ] `repository` URL 正确
  - [ ] `bugs` URL 正确
  - [ ] `homepage` URL 正确
  - [ ] `description` 清晰准确
  - [ ] `keywords` 包含相关关键词

- ✅ **README.md** 已完善：
  - [ ] 功能描述清晰
  - [ ] 安装说明完整
  - [ ] 使用示例详细
  - [ ] 包含截图/动图（如有）
  - [ ] 添加了感谢信息
  - [ ] 链接都可访问

- ✅ **许可证**：
  - [ ] LICENSE 文件存在
  - [ ] LICENSE 类型正确（MIT）

- ✅ **图标**：
  - [ ] `resources/icon.png` 存在
  - [ ] 图标尺寸至少 128x128 像素
  - [ ] 图标清晰美观

- ✅ **构建测试**：
  - [ ] 扩展可以成功打包
  - [ ] 本地安装测试通过
  - [ ] 所有功能正常工作
  - [ ] 没有明显的错误或警告

---

## 🔄 发布工作流

### 标准发布流程

```bash
# 1. 更新版本号（在 package.json 中或使用命令）
npm version patch  # 或 minor, major

# 2. 构建扩展
cd c:\Users\DHY\Documents\tiaportal-mcp-v19
.\build-extension.ps1

# 3. 测试扩展
code --install-extension tiaportal-mcp-v19-1.0.0.vsix --force
# 手动测试所有功能

# 4. 提交代码
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags

# 5. 发布到 Marketplace
cd vscode-extension
npx @vscode/vsce publish

# 6. 创建 GitHub Release（可选）
# 在 GitHub 上创建 Release，上传 .vsix 文件
```

---

## 🚨 常见问题

### 发布失败：Publisher not found

确保：
1. 在 [Marketplace](https://marketplace.visualstudio.com/manage) 创建了发布者
2. `package.json` 中的 `publisher` 字段与发布者 ID 完全一致

### 发布失败：PAT 无效

1. 检查 PAT 是否过期
2. 确认 PAT 权限包含 Marketplace: Acquire, Publish, Manage
3. 重新生成 PAT 并重试

### 扩展未显示在 Marketplace

1. 发布后需要等待 5-10 分钟
2. 清除浏览器缓存
3. 检查发布状态：访问管理面板

### 版本冲突

如果版本号已存在：
```bash
# 增加版本号
npm version patch
npx @vscode/vsce publish
```

---

## 📊 发布后

### 监控指标

定期检查：
- 下载量
- 评分和评论
- 问题反馈（GitHub Issues）

### 维护建议

- 及时回复用户评论和问题
- 定期发布更新修复 bug
- 在 README 中保持更新日志
- 考虑添加 CHANGELOG.md 文件

---

## 🎯 下一步

发布成功后：

1. **更新 GitHub README**
   - 添加 Marketplace 徽章
   - 添加安装链接

2. **宣传推广**
   - 在相关社区分享
   - 撰写博客文章
   - 制作使用视频

3. **收集反馈**
   - 关注 GitHub Issues
   - 查看 Marketplace 评论
   - 改进扩展功能

---

## 📚 参考资源

- [VSCE 官方文档](https://github.com/microsoft/vscode-vsce)
- [发布扩展指南](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [扩展清单参考](https://code.visualstudio.com/api/references/extension-manifest)
- [Azure DevOps PAT 文档](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
