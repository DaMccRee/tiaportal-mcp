// TIA Portal MCP Tools Definition for VS Code Language Model Tools
// This file defines all 28 MCP tools for GitHub Copilot Chat integration

module.exports.tools = [
    // Connection Management (3 tools)
    {
        name: 'tia_connect',
        description: 'Connect to TIA Portal. Must be called before any other operations.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['connection', 'tia-portal']
    },
    {
        name: 'tia_disconnect',
        description: 'Disconnect from TIA Portal. Should be called when operations are complete.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['connection', 'tia-portal']
    },
    {
        name: 'tia_get_state',
        description: 'Get the current state of TIA Portal MCP server and connection status.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['status', 'connection']
    },

    // Project/Session Operations (6 tools)
    {
        name: 'tia_get_project',
        description: 'Get information about the currently opened TIA Portal project/session.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['project', 'session']
    },
    {
        name: 'tia_open_project',
        description: 'Open a TIA Portal local project/session file (.ap19 or .als19).',
        inputSchema: {
            type: 'object',
            properties: {
                projectPath: {
                    type: 'string',
                    description: 'Full path to the project file (.ap19 or .als19)'
                }
            },
            required: ['projectPath']
        },
        tags: ['project', 'session']
    },
    {
        name: 'tia_save_project',
        description: 'Save the current TIA Portal project/session.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['project', 'session']
    },
    {
        name: 'tia_save_as_project',
        description: 'Save the current project/session with a new name.',
        inputSchema: {
            type: 'object',
            properties: {
                newPath: {
                    type: 'string',
                    description: 'Full path for the new project file'
                }
            },
            required: ['newPath']
        },
        tags: ['project', 'session']
    },
    {
        name: 'tia_close_project',
        description: 'Close the current TIA Portal project/session.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['project', 'session']
    },
    {
        name: 'tia_get_project_tree',
        description: 'Get the complete structure tree of the current project/session.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['project', 'tree', 'structure']
    },

    // Device Operations (4 tools)
    {
        name: 'tia_get_devices',
        description: 'Get a list of all devices (PLCs) in the current project/session.',
        inputSchema: {
            type: 'object',
            properties: {}
        },
        tags: ['device', 'plc']
    },
    {
        name: 'tia_get_device_info',
        description: 'Get detailed information about a specific device in the project.',
        inputSchema: {
            type: 'object',
            properties: {
                deviceName: {
                    type: 'string',
                    description: 'Name of the device'
                }
            },
            required: ['deviceName']
        },
        tags: ['device', 'plc', 'info']
    },
    {
        name: 'tia_get_device_item_info',
        description: 'Get information about a specific device item.',
        inputSchema: {
            type: 'object',
            properties: {
                deviceItemPath: {
                    type: 'string',
                    description: 'Path to the device item'
                }
            },
            required: ['deviceItemPath']
        },
        tags: ['device', 'item', 'info']
    },
    {
        name: 'tia_get_software_info',
        description: 'Get information about PLC software.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                }
            },
            required: ['softwarePath']
        },
        tags: ['software', 'plc', 'info']
    },

    // Software Compilation (2 tools)
    {
        name: 'tia_compile_software',
        description: 'Compile PLC software. Returns compilation results including errors and warnings.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software to compile (e.g., "PLC_1/Software")'
                }
            },
            required: ['softwarePath']
        },
        tags: ['software', 'compile', 'build']
    },
    {
        name: 'tia_get_software_tree',
        description: 'Get the structure tree of PLC software showing blocks, types, and external sources.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                }
            },
            required: ['softwarePath']
        },
        tags: ['software', 'tree', 'structure']
    },

    // Block Operations (7 tools)
    {
        name: 'tia_get_block_info',
        description: 'Get detailed information about a specific block (FB, FC, DB, OB, etc.).',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                blockName: {
                    type: 'string',
                    description: 'Name of the block (e.g., "FC100", "DB1")'
                }
            },
            required: ['softwarePath', 'blockName']
        },
        tags: ['block', 'info', 'fb', 'fc', 'db', 'ob']
    },
    {
        name: 'tia_get_blocks',
        description: 'Get a list of all blocks in PLC software, optionally filtered by regex.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                filter: {
                    type: 'string',
                    description: 'Optional regex pattern to filter block names'
                }
            },
            required: ['softwarePath']
        },
        tags: ['block', 'list', 'filter']
    },
    {
        name: 'tia_get_blocks_with_hierarchy',
        description: 'Get all blocks with their group hierarchy structure.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                }
            },
            required: ['softwarePath']
        },
        tags: ['block', 'hierarchy', 'tree']
    },
    {
        name: 'tia_export_block',
        description: 'Export a single block to an XML file.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                blockName: {
                    type: 'string',
                    description: 'Name of the block to export (e.g., "FC100")'
                },
                exportPath: {
                    type: 'string',
                    description: 'Full path for the exported XML file'
                }
            },
            required: ['softwarePath', 'blockName', 'exportPath']
        },
        tags: ['block', 'export', 'xml']
    },
    {
        name: 'tia_import_block',
        description: 'Import a block from an XML file into PLC software.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                blockFilePath: {
                    type: 'string',
                    description: 'Full path to the block XML file to import'
                }
            },
            required: ['softwarePath', 'blockFilePath']
        },
        tags: ['block', 'import', 'xml']
    },
    {
        name: 'tia_export_blocks',
        description: 'Batch export multiple blocks to a directory.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                blockNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of block names to export'
                },
                exportDirectory: {
                    type: 'string',
                    description: 'Directory path where blocks will be exported'
                }
            },
            required: ['softwarePath', 'blockNames', 'exportDirectory']
        },
        tags: ['block', 'export', 'batch', 'xml']
    },
    {
        name: 'tia_import_blocks',
        description: 'Batch import multiple blocks from XML files.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                blockFilePaths: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of full paths to block XML files'
                }
            },
            required: ['softwarePath', 'blockFilePaths']
        },
        tags: ['block', 'import', 'batch', 'xml']
    },

    // Type (UDT) Operations (6 tools)
    {
        name: 'tia_get_type_info',
        description: 'Get detailed information about a specific user-defined type (UDT).',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                typeName: {
                    type: 'string',
                    description: 'Name of the type/UDT'
                }
            },
            required: ['softwarePath', 'typeName']
        },
        tags: ['type', 'udt', 'info']
    },
    {
        name: 'tia_get_types',
        description: 'Get a list of all user-defined types in PLC software, optionally filtered by regex.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                filter: {
                    type: 'string',
                    description: 'Optional regex pattern to filter type names'
                }
            },
            required: ['softwarePath']
        },
        tags: ['type', 'udt', 'list', 'filter']
    },
    {
        name: 'tia_export_type',
        description: 'Export a single user-defined type to an XML file.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                typeName: {
                    type: 'string',
                    description: 'Name of the type to export'
                },
                exportPath: {
                    type: 'string',
                    description: 'Full path for the exported XML file'
                }
            },
            required: ['softwarePath', 'typeName', 'exportPath']
        },
        tags: ['type', 'udt', 'export', 'xml']
    },
    {
        name: 'tia_import_type',
        description: 'Import a user-defined type from an XML file into PLC software.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                typeFilePath: {
                    type: 'string',
                    description: 'Full path to the type XML file to import'
                }
            },
            required: ['softwarePath', 'typeFilePath']
        },
        tags: ['type', 'udt', 'import', 'xml']
    },
    {
        name: 'tia_export_types',
        description: 'Batch export multiple user-defined types to a directory.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                typeNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of type names to export'
                },
                exportDirectory: {
                    type: 'string',
                    description: 'Directory path where types will be exported'
                }
            },
            required: ['softwarePath', 'typeNames', 'exportDirectory']
        },
        tags: ['type', 'udt', 'export', 'batch', 'xml']
    },
    {
        name: 'tia_import_types',
        description: 'Batch import multiple user-defined types from XML files.',
        inputSchema: {
            type: 'object',
            properties: {
                softwarePath: {
                    type: 'string',
                    description: 'Path to the PLC software (e.g., "PLC_1/Software")'
                },
                typeFilePaths: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of full paths to type XML files'
                }
            },
            required: ['softwarePath', 'typeFilePaths']
        },
        tags: ['type', 'udt', 'import', 'batch', 'xml']
    }
];
