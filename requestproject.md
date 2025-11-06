
### 当前TIA Portal 状态

1. 已经安装TIA Portal V19.0
2. TIAopenness已经安装
3. .net framework 4.8 已经安装
TIAopenness安装位置：
C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V16\Siemens.Engineering.dll
C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V17\Siemens.Engineering.dll
C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V18\Siemens.Engineering.dll
C:\Program Files\Siemens\Automation\Portal V19\PublicAPI\V19\Siemens.Engineering.dll

### TIA Openness API 项目开发和编程规划指南

本指南基于 Siemens 官方文档、系统手册和社区资源，针对使用 TIA Openness API 进行 TIA Portal 项目开发和自动化编程的规划。TIA Openness 是一个基于 .NET Framework 的 API，用于自动化工程工作流，如项目创建、设备配置、代码生成和编译等。你计划使用 VS Code 作为编辑器，将 Openness API 作为后端进行编译、组态（配置）等操作。这完全可行，因为 Openness 支持 .NET 开发，而 VS Code 通过扩展（如 C# 支持）可以处理此类项目。

- 目前版本是基于TIAV20，

- 参考本项目，实现基于TIA V19.0的新建、打开、导出、导入、编译、组态等功能

- 了解 TIA Openness API V19有哪些可用的方法，全部构建，包装成MCP供AI 进行操作。



### 官方 Siemens 资源
1. **TIA Portal Openness: Introduction and Demo Application**  
   这是一个官方入门指南，包括演示应用和编程帮助。  
   链接：https://support.industry.siemens.com/cs/document/108716692/tia-portal-openness-introduction-and-demo-application  
   适合初学者，包含详细的函数概述。

2. **TIA Portal Openness: Automation of engineering workflows**  
   介绍 Openness API 的对象导向访问和自动化工作流。  
   链接：https://www.industry-mobile-support.siemens-info.com/en/article/detail/109792902  
   基于 .NET Framework，适用于工程自动化。

3. **Programming steps for TIA Portal Openness**  
   详细说明访问 Openness API 的编程步骤。  
   链接：https://docs.tia.siemens.cloud/r/Rc0LxW522mLHDCX_sejL~A/beI21LhIgxUUs16jrs359Q  
   包括开发环境的配置指南。

4. **Siemens TIA Portal Openness Feature Functionality and Possible Use (PDF)**  
   PDF 文档，解释 Openness 的功能和外部控制工程自动化的方法。  
   下载链接：https://indico.cern.ch/event/461080/contributions/1976364/attachments/1220306/1783629/Siemens_TIA_Portal_Openness_Feature_N.Levchenko.pdf  

5. **TIA Portal Openness: Introduction and demo application (PDF)**  
   另一个官方 PDF，展示应用示例和自动化任务解决方案。  
   下载链接：https://support.industry.siemens.com/cs/attachments/108716692/108716692_TIA_PortalOpenness_GettingStartedAndDemo_V17_en.pdf  

### 视频教程
1. **Openness - Efficient generation of program code using TIA Portal Openness**  
   YouTube 视频，演示程序生成函数，如项目管理和导出。  
   链接：https://www.youtube.com/watch?v=Ki12pLbEcxs  
   时长约几分钟，适合快速入门。

2. **Develop and use openness scripts as TIA Add-Ins**  
   YouTube 视频，讲解如何开发和使用 Openness 脚本作为 TIA 插件。  
   链接：https://www.youtube.com/watch?v=jtCjOI96c9c  
   重点在自动化工程工作流。

### 社区和论坛资源
1. **Reddit 讨论: Where do you learn TIA Openness?**  
   社区用户分享学习经验，提到官方手册的不足和 .NET/C# 的相关性。  
   链接：https://www.reddit.com/r/PLC/comments/14tve5o/where_do_you_learn_tia_openness_basic_siemens/  
   适合寻找实用建议。

2. **SiePortal 论坛: TIA Portal Openness v18 - Export/Import FC's**  
   讨论导出/导入函数块，并推荐 TIA Openness Scripter 工具。  
   链接：https://sieportal.siemens.com/en-ke/support/forum/posts/tia-portal-openness-v18-export-import-fc-s/313003  
   可以下载相关工具。

### 在线课程
- **Udemy Siemens TIA Portal Courses**  
  多个在线课程捆绑包，涵盖 TIA Portal 技能，包括 Openness 相关内容。  
  链接：https://www.udemy.com/topic/siemens-tia-portal/  
  适合系统学习，包含视频和实践项目。

