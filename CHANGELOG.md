# TIA Portal V19 MCP Server 变更日志

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


