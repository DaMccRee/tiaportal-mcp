# TIA Portal V19 MCP Server - VS Code Extension

基于 TIA Portal V19 的 Model Context Protocol (MCP) 服务器 VS Code 扩展，支持通过 AI 助手操作 TIA Portal 项目。

## ✨ 新增功能 (v1.0.0)

- ✅ **创建新项目** - 使用 `CreateProject` 工具创建全新的 TIA Portal 项目
- ✅ **获取编译信息** - 编译时获取详细的错误、警告信息和编译器消息
- ✅ **完整的项目管理** - 支持创建、打开、保存、关闭项目的完整生命周期
- ✅ **程序块导入导出** - 支持 XML 格式和 SIMATIC SD Documents 格式 (.s7dcl/.s7res)

## ✨ 核心功能特性

- 🔍 **自动依赖检测** - 自动检测 TIA Portal V19、.NET Framework 4.8、用户组权限等
- ⚙️ **可视化配置界面** - 侧边栏提供友好的参数设置面板
- 📊 **实时运行监控** - 输出面板显示详细的服务器运行状态和日志
- 🚀 **一键启动/停止** - 快捷命令管理 MCP 服务器
- 🔧 **自动修复建议** - 检测到问题时提供修复指导
- 📦 **内置服务器** - 扩展已包含编译好的 TiaMcpServer.exe
- 🤖 **AI 助手集成** - 通过 MCP 协议让 AI 助手操作 TIA Portal

## 🚀 快速开始

### 安装扩展

1. **从 VSIX 文件安装**:

   ```bash
   # 方法 1: 使用命令行
   code --install-extension tiaportal-mcp-v19-1.0.0.vsix

   # 方法 2: 在 VS Code 中
   # 打开 Extensions 视图 (Ctrl+Shift+X)
   # 点击 "..." 菜单 -> Install from VSIX...
   # 选择 tiaportal-mcp-v19-1.0.0.vsix 文件
   ```

2. **重新加载 VS Code**

### 首次使用

1. 安装扩展后,点击左侧活动栏的 **TIA Portal MCP** 图标
2. 在侧边栏中点击 **Check Dependencies** 按钮
3. 扩展会自动检测所有依赖项:
   - ✅ TIA Portal V19 安装
   - ✅ .NET Framework 4.8
   - ✅ 用户组权限
   - ✅ 环境变量配置
   - ✅ 服务器可执行文件

4. 如果发现问题,按照提示修复:
   - 缺少用户组权限 → 点击 **Add to User Group** 按钮
   - 环境变量未设置 → 在设置中配置 TIA Portal 路径

5. 所有依赖满足后,点击 **Start Server** 启动 MCP 服务器

## 📋 可用命令

在命令面板 (Ctrl+Shift+P) 中输入 "TIA Portal MCP":

- `TIA Portal MCP: Check Dependencies` - 检查所有依赖项
- `TIA Portal MCP: Start Server` - 启动 MCP 服务器
- `TIA Portal MCP: Stop Server` - 停止 MCP 服务器
- `TIA Portal MCP: Restart Server` - 重启 MCP 服务器
- `TIA Portal MCP: Open Settings` - 打开设置面板
- `TIA Portal MCP: Show Logs` - 显示详细日志
- `TIA Portal MCP: Add User to Siemens TIA Openness Group` - 添加用户到所需组

## ⚙️ 配置选项

在侧边栏的设置面板中,您可以配置:

- **TIA Portal Installation Path** - TIA Portal V19 安装路径
  - 默认: `C:\Program Files\Siemens\Automation\Portal V19`
  
- **Custom Server Path** - 自定义服务器路径 (可选)
  - 默认: 使用扩展内置的服务器
  
- **TIA Major Version** - TIA Portal 主版本号
  - 默认: 19
  
- **Logging Level** - 日志级别
  - 0 = 无日志
  - 1 = 输出到 stderr
  - 2 = 输出到调试输出 (推荐)
  - 3 = 输出到 Windows 事件日志
  
- **Auto-start server** - 启动时自动运行服务器
  - 默认: false
  
- **Check dependencies on startup** - 启动时检查依赖
  - 默认: true
  
- **Show detailed logs** - 显示详细日志
  - 默认: true

## 📊 监控和日志

### 状态栏

右下角状态栏显示服务器当前状态:
- 🟢 `TIA MCP: Running` - 服务器正在运行
- 🔴 `TIA MCP: Stopped` - 服务器已停止
- 🟡 `TIA MCP: Starting...` - 服务器正在启动

### Server Status 视图

在侧边栏的 "Server Status" 视图中查看:
- ✅ TIA Portal V19 - 安装状态
- ✅ .NET Framework 4.8 - 安装状态
- ✅ User Group - 用户组权限
- ✅ Environment Variable - 环境变量配置
- ✅ Server Executable - 服务器可执行文件

### Output 面板

查看详细的服务器日志:
1. 打开命令面板 (Ctrl+Shift+P)
2. 运行 `TIA Portal MCP: Show Logs`
3. 或者在输出面板中选择 "TIA Portal MCP"

日志包括:
- 服务器启动/停止事件
- 依赖检测结果
- 服务器 stdout/stderr 输出
- 错误和警告信息

## 📦 系统要求

### 必需组件

1. **TIA Portal V19** - 需要安装并正确配置
2. **TIA Openness API V19** - 随 TIA Portal 一起安装
3. **.NET Framework 4.8** - Windows 组件
4. **Windows 用户组** - 用户必须属于 `Siemens TIA Openness` 用户组

### 环境变量

扩展会检查并使用以下环境变量:
- `TiaPortalLocation` = `C:\Program Files\Siemens\Automation\Portal V19`

如果未设置,可以在扩展设置中配置 TIA Portal 路径。

## 🔧 故障排除

### 服务器无法启动

1. **检查依赖项**:
   - 运行 `TIA Portal MCP: Check Dependencies`
   - 查看 "Server Status" 视图中的详细信息

2. **查看日志**:
   - 运行 `TIA Portal MCP: Show Logs`
   - 检查错误信息

3. **常见问题**:
   - ❌ "用户不在所需组中" → 运行 `Add User to Siemens TIA Openness Group`
   - ❌ "找不到 TIA Portal" → 在设置中配置正确的 TIA Portal 路径
   - ❌ ".NET Framework 4.8 未安装" → 安装 .NET Framework 4.8

### 添加用户到用户组后仍然失败

添加用户到 "Siemens TIA Openness" 组后:
1. 必须注销并重新登录 Windows
2. 或者重启计算机
3. 然后重新启动 VS Code

### 服务器运行但无法连接

1. 确保 TIA Portal V19 正在运行
2. 关闭所有打开的项目
3. 重启 MCP 服务器

## 🔨 开发和打包

### 开发准备

```bash
cd vscode-extension
npm install
```

### 测试扩展

在 VS Code 中按 `F5` 启动扩展开发主机。

### 打包扩展

```bash
# 确保 srv\net48 目录包含所有必需的文件
npx @vscode/vsce package

# 生成 tiaportal-mcp-v19-1.0.0.vsix
```

### 安装本地 VSIX

```bash
code --install-extension tiaportal-mcp-v19-1.0.0.vsix
```

## 📁 文件结构

```text
vscode-extension/
├── package.json              # 扩展清单
├── extension.js              # 扩展主代码
├── .vscodeignore            # 打包时忽略的文件
├── resources/               # 资源文件
│   ├── icon.svg            # 扩展图标 (SVG)
│   └── ICON-README.md      # 图标说明
├── srv/                     # 服务器可执行文件
│   └── net48/
│       ├── TiaMcpServer.exe
│       ├── TiaMcpServer.exe.config
│       └── *.dll           # 所有依赖的 DLL
└── README.md               # 本文档
```

## 📝 MCP 工具参考

MCP 服务器提供以下工具 (完整列表请参考主项目 README):

### 连接管理
- `Connect` - 连接到 TIA Portal
- `Disconnect` - 断开连接
- `GetState` - 获取状态

### 项目操作
- `OpenProject` - 打开项目
- `CloseProject` - 关闭项目
- `SaveProject` - 保存项目
- `GetProjectTree` - 获取项目树

### Block 操作
- `GetBlocks` - 获取 Block 列表
- `ExportBlock` - 导出 Block
- `ImportBlock` - 导入 Block
- `ExportBlocks` - 批量导出

### Type 操作
- `GetTypes` - 获取 Type 列表
- `ExportType` - 导出 Type
- `ImportType` - 导入 Type

更多工具和详细说明请参考主项目的 README.md 文件。

## 📄 许可证

MIT License

## � 致谢

本项目基于 [heilingbrunner/tiaportal-mcp](https://github.com/heilingbrunner/tiaportal-mcp) 进行开发和增强。

特别感谢原作者 [@heilingbrunner](https://github.com/heilingbrunner) 创建了优秀的 TIA Portal MCP 服务器基础框架。

### 主要改进和增强

在原项目基础上，本版本增加了以下功能：

- ✨ 支持创建新的 TIA Portal 项目 (`CreateProject`)
- ✨ 获取详细的编译器消息和诊断信息(重要)
- ✨ 改进的错误处理和日志记录
- ✨ 完善的 VSCode 扩展集成
- ✨ 自动依赖检测和配置向导

## �🔗 相关链接

- **本项目仓库**: [https://github.com/DaMccRee/tiaportal-mcp-v19](https://github.com/DaMccRee/tiaportal-mcp-v19)
- **原始项目**: [https://github.com/heilingbrunner/tiaportal-mcp](https://github.com/heilingbrunner/tiaportal-mcp)
- [TIA Portal Openness 官方文档](https://support.industry.siemens.com/cs/document/108716692)
- [Model Context Protocol 规范](https://modelcontextprotocol.io/)
- [VS Code Extension API](https://code.visualstudio.com/api)

## 💬 支持

如有问题或建议，请通过以下方式反馈：

- GitHub Issues: [https://github.com/DaMccRee/tiaportal-mcp-v19/issues](https://github.com/DaMccRee/tiaportal-mcp-v19/issues)
- Pull Requests 欢迎！
