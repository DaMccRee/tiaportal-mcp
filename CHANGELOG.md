# TIA Portal V19 MCP Server 变更日志

本文档记录 TIA Portal V19 MCP Server 的所有重要变更。

## [1.0.0] - 2025-11-06

### 🎉 首个正式版本发布

基于 [heilingbrunner/tiaportal-mcp](https://github.com/heilingbrunner/tiaportal-mcp) 进行大幅增强和改进。

### ✨ 新增功能

#### 项目管理
- ✅ **CreateProject** - 支持创建全新的 TIA Portal 项目
  - 通过 `ProjectComposition.Create` API 创建项目
  - 自动关闭现有项目
  - 完整的错误处理和日志记录

- ✅ **完整的项目生命周期管理**
  - 创建项目 (CreateProject)
  - 打开项目 (OpenProject)
  - 保存项目 (SaveProject)
  - 另存为 (SaveAsProject)
  - 关闭项目 (CloseProject)

#### 编译功能增强
- ✅ **详细的编译器消息**
  - 获取每条编译错误/警告的详细信息
  - 包含错误路径、描述、时间戳
  - 统计错误和警告数量
  - 支持多级日志记录（Error/Warning/Information）

#### 程序块操作
- ✅ **SIMATIC SD Documents 支持** (V20+)
  - ImportFromDocuments - 导入单个 .s7dcl/.s7res 文档
  - ImportBlocksFromDocuments - 批量导入文档
  - ExportAsDocuments - 导出为 SIMATIC SD 文档格式
  - ExportBlocksAsDocuments - 批量导出为文档格式
  - 支持多语言文档和文化设置

- ✅ **改进的导入导出**
  - 支持保留原始文件夹结构 (preservePath)
  - 正则表达式筛选
  - 批量操作支持

#### 项目分析
- ✅ **GetBlocksWithHierarchy** - 获取程序块的完整层次结构
- ✅ **GetSoftwareTree** - 获取 PLC 软件的树形结构
- ✅ **GetProjectTree** - 获取完整的项目结构树

### 🔧 改进

#### 代码质量
- 📝 完善的日志记录系统
- 🛡️ 增强的异常处理和错误反馈
- ✅ 改进的输入验证
- 📊 更详细的操作状态反馈

#### 用户体验
- 🎨 友好的错误消息
- 📖 详细的中英文档
- 🚀 自动依赖检测
- ⚙️ 可视化配置界面

#### VSCode 扩展
- 📦 内置编译好的服务器 (56 个文件)
- 🔍 实时状态监控
- 📊 详细的输出日志
- 🎯 快捷命令支持
- 🛠️ 自动修复建议

### 📚 文档

- ✅ 完整的 README.md（中文）
- ✅ 发布指南 (PUBLISH-GUIDE.md)
- ✅ 工具列表文档 (MCP-TOOLS-LIST.md)
- ✅ 快速参考 (QUICK-REFERENCE.md)
- ✅ 使用示例和最佳实践

### 🙏 致谢

特别感谢 [@heilingbrunner](https://github.com/heilingbrunner) 创建了优秀的 TIA Portal MCP 服务器基础框架。

本项目在其基础上进行了以下改进：
- 新增项目创建功能
- 增强编译器诊断
- 支持 SIMATIC SD Documents
- 完善的 VSCode 扩展
- 详细的中文文档

### 🔗 链接

- **本项目**: [https://github.com/DaMccRee/tiaportal-mcp-v19](https://github.com/DaMccRee/tiaportal-mcp-v19)
- **原始项目**: [https://github.com/heilingbrunner/tiaportal-mcp](https://github.com/heilingbrunner/tiaportal-mcp)

---

## [0.0.1] - 2025-11-05

### 新增
- 初始发布 TIA Portal V19 MCP Server
- 支持 TIA Portal V19 Openness API
- 实现核心 MCP 工具集合
- 支持项目/会话的打开、保存、关闭操作
- 支持设备和 PLC 软件信息查询
- 支持 Block 的导入/导出（XML 格式）
- 支持 Type 的导入/导出（XML 格式）
- 支持 PLC 软件编译功能
- 支持正则表达式筛选 Block 和 Type
- 支持保留层次结构的导出功能
- 添加详细的中文文档

### 限制
- 不支持 SIMATIC SD 文档格式 (.s7dcl/.s7res)
- 文档导入/导出功能需要 TIA Portal V20 或更高版本

### 技术细节
- 基于 .NET Framework 4.8
- 使用 ModelContextProtocol 0.3.0-preview.4
- 使用 Siemens.Collaboration.Net.TiaPortal.Packages.Openness 19.0.x
- 使用 Microsoft.Extensions.Hosting 10.0.0-preview.4


