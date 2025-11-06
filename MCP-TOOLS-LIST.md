# TIA Portal V19 MCP Server - 可用工具列表

## 📋 完整的 MCP 工具清单

本 MCP 服务器提供以下工具,可通过 GitHub Copilot Chat 或其他 MCP 客户端使用:

### 🔌 连接管理 (3 个工具)

1. **Connect**
   - 描述: 连接到 TIA Portal
   - 用途: 建立与 TIA Portal 的连接

2. **Disconnect**
   - 描述: 断开与 TIA Portal 的连接
   - 用途: 安全地断开连接

3. **GetState**
   - 描述: 获取 TIA Portal MCP 服务器状态
   - 用途: 检查服务器和连接状态

### 📁 项目/会话操作 (6 个工具)

4. **GetProject**
   - 描述: 获取当前打开的本地项目/会话
   - 用途: 查看当前项目信息

5. **OpenProject**
   - 描述: 打开 TIA Portal 本地项目/会话
   - 参数: 项目文件路径 (.ap19 或 .als19)
   - 用途: 打开指定的项目

6. **SaveProject**
   - 描述: 保存当前 TIA Portal 本地项目/会话
   - 用途: 保存项目更改

7. **SaveAsProject**
   - 描述: 将当前项目/会话另存为新名称
   - 参数: 新项目路径
   - 用途: 创建项目副本

8. **CloseProject**
   - 描述: 关闭当前 TIA Portal 项目/会话
   - 用途: 关闭项目释放资源

9. **GetProjectTree**
   - 描述: 获取当前本地项目/会话的项目结构树
   - 用途: 查看项目完整结构

### 🖥️ 设备操作 (4 个工具)

10. **GetDevices**
    - 描述: 获取项目/会话中所有设备的列表
    - 用途: 列出所有 PLC 设备

11. **GetDeviceInfo**
    - 描述: 获取当前项目/会话中设备的信息
    - 参数: 设备名称
    - 用途: 查看设备详细信息

12. **GetDeviceItemInfo**
    - 描述: 获取当前项目/会话中设备项的信息
    - 参数: 设备项路径
    - 用途: 查看设备子项信息

13. **GetSoftwareInfo**
    - 描述: 获取 PLC 软件信息
    - 参数: 软件路径
    - 用途: 查看 PLC 软件详情

### ⚙️ 软件编译 (2 个工具)

14. **CompileSoftware**
    - 描述: 编译 PLC 软件
    - 参数: 软件路径
    - 用途: 编译 PLC 程序

15. **GetSoftwareTree**
    - 描述: 获取给定 PLC 软件的结构/树(显示块、类型和外部源)
    - 参数: 软件路径
    - 用途: 查看软件组织结构

### 📦 Block 操作 (7 个工具)

16. **GetBlockInfo**
    - 描述: 获取位于 PLC 软件中的 Block 信息
    - 参数: 软件路径, Block 名称
    - 用途: 查看单个 Block 详情

17. **GetBlocks**
    - 描述: 获取位于 PLC 软件中的 Block 列表
    - 参数: 软件路径, 可选的正则表达式筛选
    - 用途: 列出所有或筛选的 Block

18. **GetBlocksWithHierarchy**
    - 描述: 获取 PLC 软件中所有 Block 及其组层次结构的列表
    - 参数: 软件路径
    - 用途: 查看带层次的 Block 列表

19. **ExportBlock**
    - 描述: 从 PLC 软件导出 Block 到文件
    - 参数: 软件路径, Block 名称, 导出路径
    - 用途: 导出单个 Block 为 XML

20. **ImportBlock**
    - 描述: 从文件导入 Block 到 PLC 软件
    - 参数: 软件路径, Block 文件路径
    - 用途: 导入 Block XML 文件

21. **ExportBlocks**
    - 描述: 批量导出 Block 从 PLC 软件到目录
    - 参数: 软件路径, Block 名称列表, 导出目录
    - 用途: 批量导出多个 Block

22. **ImportBlocks**
    - 描述: 批量导入 Block 文件到 PLC 软件
    - 参数: 软件路径, Block 文件路径列表
    - 用途: 批量导入多个 Block

### 🔧 Type (UDT) 操作 (6 个工具)

23. **GetTypeInfo**
    - 描述: 获取位于 PLC 软件中的 Type (UDT) 信息
    - 参数: 软件路径, Type 名称
    - 用途: 查看用户自定义类型详情

24. **GetTypes**
    - 描述: 获取位于 PLC 软件中的 Type 列表
    - 参数: 软件路径, 可选的正则表达式筛选
    - 用途: 列出所有或筛选的 Type

25. **ExportType**
    - 描述: 从 PLC 软件导出 Type 到文件
    - 参数: 软件路径, Type 名称, 导出路径
    - 用途: 导出单个 Type 为 XML

26. **ImportType**
    - 描述: 从文件导入 Type 到 PLC 软件
    - 参数: 软件路径, Type 文件路径
    - 用途: 导入 Type XML 文件

27. **ExportTypes**
    - 描述: 批量导出 Type 从 PLC 软件到目录
    - 参数: 软件路径, Type 名称列表, 导出目录
    - 用途: 批量导出多个 Type

28. **ImportTypes**
    - 描述: 批量导入 Type 文件到 PLC 软件
    - 参数: 软件路径, Type 文件路径列表
    - 用途: 批量导入多个 Type

## 📊 工具统计

- **总计**: 28 个 MCP 工具
- **连接管理**: 3 个
- **项目操作**: 6 个
- **设备操作**: 4 个
- **软件编译**: 2 个
- **Block 操作**: 7 个
- **Type 操作**: 6 个

## 💡 使用示例

### 在 GitHub Copilot Chat 中使用:

```
连接到 TIA Portal 并打开项目 D:/Projects/MyProject.ap19
```

```
列出 PLC_1/Software 中的所有 Block
```

```
导出 Block FC100 到 C:/Export
```

```
编译 PLC_1/Software
```

```
获取设备 PLC_1 的信息
```

### 工作流示例:

**完整的导出流程**:
1. Connect - 连接到 TIA Portal
2. OpenProject - 打开项目
3. GetDevices - 列出所有设备
4. GetBlocks - 列出所有 Block
5. ExportBlocks - 批量导出 Block
6. CloseProject - 关闭项目
7. Disconnect - 断开连接

**编译和保存**:
1. Connect
2. OpenProject
3. CompileSoftware - 编译软件
4. SaveProject - 保存项目
5. CloseProject
6. Disconnect

## 🔍 查看工具详情

要在 GitHub Copilot Chat 中查看具体工具的详细参数,可以询问:

```
TIA Portal MCP 的 ExportBlock 工具需要哪些参数?
```

```
如何使用 GetBlocks 工具筛选特定的 Block?
```

## ⚠️ 重要提示

1. **V19 限制**: TIA Portal V19 不支持 SIMATIC SD 文档格式 (.s7dcl/.s7res)
2. **权限要求**: 用户必须在 "Siemens TIA Openness" 用户组中
3. **连接顺序**: 使用前必须先调用 Connect 工具
4. **项目状态**: 某些操作需要先打开项目

## 📝 配置说明

确保在 VS Code 中已配置 GitHub Copilot MCP:
1. 安装 TIA Portal MCP 扩展
2. 点击侧边栏的 "Configure for Copilot Chat" 按钮
3. 重新加载 VS Code
4. 在 Copilot Chat 中即可使用所有工具
