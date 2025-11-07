# TIA Portal  MCP Server - VS Code Extension

基于 TIA Portal  的 Model Context Protocol (MCP) 服务器 VS Code 扩展实现。

本扩展将 TIA Portal  MCP Server 打包为 VS Code 扩展,提供自动依赖检测、可视化配置界面和实时运行监控。

## ✨ VS Code 扩展功能

- 🔍 **自动依赖检测** - 自动检测 TIA Portal .NET Framework 4.8、用户组权限等
- ⚙️ **可视化配置界面** - 侧边栏提供友好的参数设置面板
- 📊 **实时运行监控** - 输出面板显示详细的服务器运行状态和日志
- 🚀 **一键启动/停止** - 快捷命令管理 MCP 服务器
- 🔧 **自动修复建议** - 检测到问题时提供修复指导
- 📦 **内置服务器** - 扩展已包含编译好的 TiaMcpServer.exe

## 📁 项目结构

```text
tiaportal-mcp-v19/
├── vscode-extension/        # VS Code 扩展目录
│   ├── package.json        # 扩展清单
│   ├── extension.js        # 扩展主代码
│   ├── srv/net48/          # 内置 MCP 服务器
│   └── README.md           # 扩展说明文档
├── src/                    # MCP 服务器源代码
│   └── TiaMcpServer/
├── build-extension.ps1     # 一键构建和打包脚本
├── test-extension.ps1      # 扩展测试脚本
└── README.md              # 本文档
```

## 🚀 快速开始 (推荐使用 VS Code 扩展)

### 方式一: 安装预编译的扩展 (推荐)

1. **下载或构建扩展**:

   ```powershell
   # 构建扩展 (包括编译服务器和打包)
   .\build-extension.ps1
   
   # 或者如果已有编译好的服务器,只打包扩展
   .\build-extension.ps1 -SkipBuild
   
   # 构建并自动安装
   .\build-extension.ps1 -Install
   ```

2. **安装扩展**:

   ```powershell
   # 使用命令行
   code --install-extension tiaportal-mcp-v19-0.1.0.vsix
   
   # 或在 VS Code 中: Extensions 视图 -> "..." -> Install from VSIX...
   ```

3. **首次使用**:
   - 点击左侧活动栏的 **TIA Portal MCP** 图标
   - 点击 **Check Dependencies** 检查所有依赖
   - 如有问题按提示修复
   - 点击 **Start Server** 启动服务器

详细的扩展使用说明请查看 [vscode-extension/README.md](vscode-extension/README.md)

### 方式二: 命令行方式 (传统方式)

如果不使用 VS Code 扩展,可以直接运行 MCP 服务器:

```powershell
# 构建服务器
dotnet build --configuration Release

# 运行服务器
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe --logging 2
```

## 🧪 测试扩展

运行测试脚本验证所有组件:

```powershell
# 基本测试
.\test-extension.ps1

# 详细测试 (显示错误详情)
.\test-extension.ps1 -Verbose
```

测试包括:
- ✅ 扩展文件完整性
- ✅ package.json 有效性
- ✅ 服务器可执行文件和依赖
- ✅ 系统要求检查
- ✅ 打包准备就绪

## 功能特性

本 MCP 服务器专为 TIA Portal  设计,提供以下功能:

### 核心功能
- ✅ 连接到 TIA Portal  实例
- ✅ 打开/关闭/保存项目和会话
- ✅ 获取项目结构树形视图
- ✅ 设备和设备项信息查询
- ✅ PLC 软件管理和编译

### Block 操作
- ✅ 获取 Block 信息和列表
- ✅ 导出单个/批量 Block 到 XML
- ✅ 从 XML 导入 Block
- ✅ 按正则表达式筛选 Block
- ✅ 保留 Block 的层次结构

### Type 操作
- ✅ 获取用户自定义类型（UDT）信息
- ✅ 导出单个/批量 Type 到 XML
- ✅ 从 XML 导入 Type
- ✅ 按正则表达式筛选 Type

### 文档操作（V19 有限支持）
- ⚠️  版本不支持 SIMATIC SD 文档格式（.s7dcl/.s7res）
- ⚠️ 文档导入/导出功能需要 TIA Portal V20 或更高版本

## 🚀 快速开始 (VS Code 扩展方式)

### 安装扩展

1. **从 VSIX 文件安装**:
   ```bash
   # 方法 1: 使用命令行
   code --install-extension tiaportal-mcp-v19-0.1.0.vsix

   # 方法 2: 在 VS Code 中
   # 打开 Extensions 视图 (Ctrl+Shift+X)
   # 点击 "..." 菜单 -> Install from VSIX...
   # 选择 tiaportal-mcp-v19-0.1.0.vsix 文件
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

### 使用命令

在命令面板 (Ctrl+Shift+P) 中输入 "TIA Portal MCP":

- `TIA Portal MCP: Check Dependencies` - 检查所有依赖项
- `TIA Portal MCP: Start Server` - 启动 MCP 服务器
- `TIA Portal MCP: Stop Server` - 停止 MCP 服务器
- `TIA Portal MCP: Restart Server` - 重启 MCP 服务器
- `TIA Portal MCP: Open Settings` - 打开设置面板
- `TIA Portal MCP: Show Logs` - 显示详细日志
- `TIA Portal MCP: Add User to Siemens TIA Openness Group` - 添加用户到所需组

### 配置设置

在侧边栏的设置面板中,您可以配置:

- **TIA Portal Installation Path** - TIA Portal V19 安装路径
- **Custom Server Path** - 自定义服务器路径 (可选)
- **TIA Major Version** - TIA Portal 主版本号
- **Logging Level** - 日志级别 (0-3)
- **Auto-start server** - 启动时自动运行服务器
- **Check dependencies on startup** - 启动时检查依赖
- **Show detailed logs** - 显示详细日志

### 查看运行状态

- **状态栏** - 右下角显示服务器运行状态
- **Server Status 视图** - 显示所有依赖项的检查结果
- **Output 面板** - 显示详细的服务器日志和运行信息

## 📋 系统要求

### 必需组件

1. **TIA Portal V19** - 需要安装并正确配置
2. **TIA Openness API V19** - 随 TIA Portal 一起安装
3. **.NET Framework 4.8** - Windows 组件
4. **Windows 用户组** - 用户必须属于 `Siemens TIA Openness` 用户组

### TIA Openness 安装位置

TIA Portal V19 的 Openness API 位于:

```text
C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V19\Siemens.Engineering.dll
```

### 环境变量配置

需要设置系统环境变量:

- **变量名**: `TiaPortalLocation`
- **变量值**: `C:\Program Files\Siemens\Automation\Portal V19`

**设置步骤**:

1. 右键点击"此电脑" → "属性"
2. 点击"高级系统设置"
3. 点击"环境变量"
4. 在"用户变量"或"系统变量"下点击"新建"
5. 添加上述变量名和值
6. 重启命令行/IDE 使变量生效

## 用户权限配置

### 添加用户到 Siemens TIA Openness 组

**方法 1: 使用计算机管理**
1. Win + X → 选择"计算机管理"
2. 展开"本地用户和组" → "组"
3. 双击"Siemens TIA Openness"
4. 点击"添加" → 输入你的用户名 → "确定"

**方法 2: 使用 PowerShell (管理员)**
```powershell
Add-LocalGroupMember -Group "Siemens TIA Openness" -Member "$env:USERNAME"
```

**验证**:
```powershell
Get-LocalGroupMember -Group "Siemens TIA Openness"
```

**注意**: 添加用户到组后，需要注销并重新登录 Windows 才能生效。

## 项目构建

### 使用 Visual Studio
1. 打开 `TiaMcpServer.sln`
2. 选择 Release 配置
3. 生成解决方案

### 使用命令行 (MSBuild)
```powershell
# 还原 NuGet 包
dotnet restore

# 构建项目
dotnet build --configuration Release

# 构建输出位于
# .\src\TiaMcpServer\bin\Release\net48\
```

### 使用 dotnet CLI
```powershell
cd src\TiaMcpServer
dotnet build -c Release -f net48
```

## 运行服务器

### 直接运行
```powershell
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe
```

### 指定 TIA 版本（如果需要）
```powershell
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe --tia-major-version 19
```

### 启用日志记录
```powershell
# 日志输出到 stderr
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe --logging 1

# 日志输出到调试输出 (Debug Output)
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe --logging 2

# 日志输出到 Windows 事件日志
.\src\TiaMcpServer\bin\Release\net48\TiaMcpServer.exe --logging 3
```

## MCP 客户端配置

### VS Code 配置

在 VS Code 工作区创建 `.vscode/mcp.json`:

```json
{
  "servers": {
    "tiaportal-v19": {
      "command": "C:\\path\\to\\TiaMcpServer.exe",
      "args": [],
      "env": {}
    }
  }
}
```

### Claude Desktop 配置

编辑 `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tiaportal-v19": {
      "command": "C:\\path\\to\\TiaMcpServer.exe",
      "args": [],
      "env": {}
    }
  }
}
```

## 可用的 MCP 工具

### 连接管理
- `Connect` - 连接到 TIA Portal
- `Disconnect` - 断开与 TIA Portal 的连接
- `GetState` - 获取服务器状态

### 项目/会话操作
- `GetProject` - 获取打开的项目列表
- `OpenProject` - 打开项目/会话 (.ap19/.als19)
- `SaveProject` - 保存当前项目/会话
- `SaveAsProject` - 另存为项目
- `CloseProject` - 关闭当前项目/会话

### 项目结构
- `GetProjectTree` - 获取项目树形结构
- `GetDevices` - 获取设备列表
- `GetDeviceInfo` - 获取设备详细信息
- `GetDeviceItemInfo` - 获取设备项信息

### PLC 软件
- `GetSoftwareInfo` - 获取 PLC 软件信息
- `CompileSoftware` - 编译 PLC 软件
- `GetSoftwareTree` - 获取软件树形结构

### Block 操作
- `GetBlockInfo` - 获取 Block 信息
- `GetBlocks` - 获取 Block 列表（支持正则表达式）
- `GetBlocksWithHierarchy` - 获取带层次结构的 Block 列表
- `ExportBlock` - 导出单个 Block
- `ImportBlock` - 导入单个 Block
- `ExportBlocks` - 批量导出 Block
- `ExportBlocksAsDocuments` - ⚠️ 不支持（需要 V20+）

### Type 操作
- `GetTypeInfo` - 获取 Type 信息
- `GetTypes` - 获取 Type 列表（支持正则表达式）
- `ExportType` - 导出单个 Type
- `ImportType` - 导入单个 Type
- `ExportTypes` - 批量导出 Type

## 使用示例

### 示例 1: 打开项目并导出所有 Block

```
1. Connect to TIA Portal
2. Open project from 'D:/Projects/MyProject.ap19'
3. Export all blocks from PLC software 'PLC_1/Software' to 'C:/Export/Blocks'
4. Close project
5. Disconnect from TIA Portal
```

### 示例 2: 导出特定 Block

```
1. Connect to TIA Portal
2. Open project from 'D:/Projects/MyProject.ap19'
3. Export block 'Main/Control/FC100' from PLC software 'PLC_1/Software' to 'C:/Export'
4. Close project
5. Disconnect from TIA Portal
```

### 示例 3: 编译 PLC 软件

```
1. Connect to TIA Portal
2. Open project from 'D:/Projects/MyProject.ap19'
3. Compile PLC software 'PLC_1/Software'
4. Save project
5. Close project
6. Disconnect from TIA Portal
```

## V19 vs V20 差异

### V19 限制
- ❌ 不支持 SIMATIC SD 文档格式 (.s7dcl/.s7res)
- ❌ 无法使用 `ExportAsDocuments`、`ExportBlocksAsDocuments`
- ❌ 无法使用 `ImportFromDocuments`、`ImportBlocksFromDocuments`
- ⚠️ 某些新的 API 功能可能不可用

### V19 支持
- ✅ 完整的 Block 导入/导出（XML 格式）
- ✅ 完整的 Type 导入/导出（XML 格式）
- ✅ 项目编译和管理
- ✅ 设备配置操作
备注：
```
  Siemens.Engineering.dll 组件由于 V16、V17 和 V18 的 Siemens.Engineering.dll 组件包含在交付范围内，因此基于 V16、V17 和 V18 的应用程序在 V19 中无需修改即可运行。
同样的，基于博图V19开发的MCP同样可以直接支持博图V20，但不支持其特有功能，因为API引用是V19版本的。以上可以通过插件侧边栏 “TIA Major Version”实现不同版本博图的适配
要使用 V19 的功能，您必须集成 V19 的 dll 并重新编译应用程序。Siemens.Engineering.dll 组件可在安装目录下的"PublicAPI[版本]\"中找到。
例如，V19 的 dll 可以在"C:\Program Files\Siemens\Automation\Portal V*\PublicAPI\V19\Siemens.Engineering.dll"找到
```

## 故障排除

### 问题: "用户不在所需组中"
**解决方案**: 
1. 确认已将用户添加到 `Siemens TIA Openness` 组
2. 注销并重新登录 Windows
3. 重新运行服务器

### 问题: "找不到 TIA Portal"
**解决方案**:
1. 确认 TIA Portal V19 已正确安装
2. 检查环境变量 `TiaPortalLocation` 设置
3. 确认路径指向正确的 TIA Portal 安装目录

### 问题: "无法加载 Siemens.Engineering.dll"
**解决方案**:
1. 确认 Openness API 已安装（随 TIA Portal 自动安装）
2. 检查路径：`C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V19\`
3. 以管理员身份重新安装 TIA Portal

### 问题: "连接失败"
**解决方案**:
1. 确保 TIA Portal V19 正在运行
2. 关闭所有打开的项目后再尝试连接
3. 检查 TIA Portal 是否被其他程序锁定

## 技术架构

### 核心组件
- **Program.cs** - 应用程序入口点和主机配置
- **McpServer.cs** - MCP 工具实现
- **Portal.cs** - TIA Portal Openness API 封装
- **Openness.cs** - Openness 初始化和用户组管理
- **Engineering.cs** - 程序集解析器（用于旧版本）

### 依赖项
- `ModelContextProtocol` (0.3.0-preview.4) - MCP 协议实现
- `Microsoft.Extensions.Hosting` (10.0.0-preview.4) - 主机框架
- `Siemens.Collaboration.Net.TiaPortal.Packages.Openness` (19.0.x) - V19 Openness API
- `Siemens.Collaboration.Net.TiaPortal.Openness.Resolver` (1.1.x) - 程序集解析

## 版本历史

### v0.0.1 (2025-11-05)
- 初始发布
- 支持 TIA Portal V19
- 实现核心 MCP 工具
- 支持 Block 和 Type 的导入/导出
- 支持项目管理和编译

## 许可证

MIT License

## 作者

基于原始 TIA Portal V20 MCP Server 改编为 V19 版本。

## 参考资源

- [TIA Portal Openness 官方文档](https://support.industry.siemens.com/cs/document/108716692)
- [TIA Portal Openness API 参考](https://docs.tia.siemens.cloud/)
- [Model Context Protocol 规范](https://modelcontextprotocol.io/)

## 支持

如有问题或建议,请通过 GitHub Issues 反馈。

---

## 🔨 扩展开发和打包

### 开发准备

1. **克隆项目并安装依赖**:

   ```bash
   cd c:\Users\DHY\Documents\tiaportal-mcp-v19
   npm install
   ```

2. **构建 TIA MCP Server**:

   ```bash
   # 使用 Visual Studio 或 MSBuild
   dotnet build --configuration Release
   ```

3. **复制服务器文件到扩展目录**:

   ```bash
   # 创建 srv 目录
   mkdir -p srv\net48
   
   # 复制编译后的文件
   Copy-Item -Path "src\TiaMcpServer\bin\Release\net48\*" -Destination "srv\net48\" -Recurse
   ```

### 测试扩展

在 VS Code 中按 `F5` 启动扩展开发主机,或使用命令:

```bash
code --extensionDevelopmentPath=.
```

### 打包扩展

1. **安装 vsce (如果尚未安装)**:

   ```bash
   npm install -g @vscode/vsce
   ```

2. **打包为 VSIX**:

   ```bash
   # 确保 srv\net48 目录包含所有必需的 DLL 和 EXE 文件
   vsce package
   ```

   这将生成 `tiaportal-mcp-v19-0.1.0.vsix` 文件。

3. **安装 VSIX**:

   ```bash
   code --install-extension tiaportal-mcp-v19-0.1.0.vsix
   ```

### 发布扩展 (可选)

如果要发布到 VS Code Marketplace:

```bash
# 首先需要创建 Personal Access Token (PAT)
# 参考: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

vsce publish
```

### 扩展文件结构

```text
tiaportal-mcp-v19/
├── package.json              # 扩展清单
├── extension.js              # 扩展主代码
├── .vscodeignore            # 打包时忽略的文件
├── resources/               # 资源文件
│   ├── icon.svg            # 扩展图标 (SVG)
│   └── icon.png            # 扩展图标 (PNG)
├── srv/                     # 服务器可执行文件
│   └── net48/
│       ├── TiaMcpServer.exe
│       ├── TiaMcpServer.exe.config
│       └── *.dll           # 所有依赖的 DLL
└── README.md               # 说明文档
```

### 调试技巧

1. **查看扩展日志**:
   - 打开命令面板 (`Ctrl+Shift+P`)
   - 运行 `TIA Portal MCP: Show Logs`

2. **调试服务器进程**:
   - 服务器日志会显示在 "TIA Portal MCP" 输出面板
   - 可以在设置中调整日志级别

3. **检查依赖状态**:
   - 在侧边栏的 "Server Status" 视图中查看所有依赖项状态

### 常见问题

**Q: 打包时提示文件过大?**

A: 检查 `.vscodeignore` 文件,确保排除了不必要的源代码和测试文件。

**Q: 扩展无法启动服务器?**

A: 确保 `srv\net48` 目录包含所有必需的 DLL 文件,特别是 Siemens.Engineering.dll 的依赖项。

**Q: 如何更新扩展版本?**

A: 更新 `package.json` 中的 `version` 字段,然后重新打包。

---

## 📝 完整命令参考
