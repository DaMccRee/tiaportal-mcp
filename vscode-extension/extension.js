const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

let statusBarItem;
let outputChannel;
let serverProcess = null;
let statusTreeDataProvider;

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    console.log('TIA Portal MCP V19 extension is now active');

    // Server-Binary from extension folder
    const extensionPath = context.extensionPath;
    const serverPath = path.join(extensionPath, 'srv', 'net48', 'TiaMcpServer.exe');

    // Create output channel
    outputChannel = vscode.window.createOutputChannel('TIA Portal MCP');
    context.subscriptions.push(outputChannel);

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'tiaportal-mcp.openSettings';
    statusBarItem.text = '$(pulse) TIA MCP: Initializing...';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register status tree data provider
    statusTreeDataProvider = new ServerStatusProvider();
    vscode.window.registerTreeDataProvider('tiaportal-mcp.status', statusTreeDataProvider);

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('tiaportal-mcp.checkDependencies', checkDependencies),
        vscode.commands.registerCommand('tiaportal-mcp.startServer', startServer),
        vscode.commands.registerCommand('tiaportal-mcp.stopServer', stopServer),
        vscode.commands.registerCommand('tiaportal-mcp.restartServer', restartServer),
        vscode.commands.registerCommand('tiaportal-mcp.openSettings', openSettings),
        vscode.commands.registerCommand('tiaportal-mcp.showLogs', showLogs),
        vscode.commands.registerCommand('tiaportal-mcp.installToUserGroup', installToUserGroup),
        vscode.commands.registerCommand('tiaportal-mcp.addMcpConfig', () => addMcpConfig(serverPath)),
        vscode.commands.registerCommand('tiaportal-mcp.removeMcpConfig', removeMcpConfig)
    );

    // Register webview provider for settings
    const settingsProvider = new SettingsViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('tiaportal-mcp.settings', settingsProvider)
    );

    // Automatically update MCP configuration if it exists
    updateMcpConfigIfExists(serverPath);

    // Check dependencies on startup if configured
    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    if (config.get('checkDependenciesOnStartup')) {
        await checkDependencies();
    }

    // Auto-start server if configured
    if (config.get('autoStart')) {
        await startServer();
    } else {
        updateStatusBar('Stopped', false);
    }

    logInfo('Extension activated successfully');
}

function deactivate() {
    if (serverProcess) {
        stopServer();
    }
    if (outputChannel) {
        outputChannel.dispose();
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    return undefined;
}

// ========== MCP Configuration Management (Based on Example) ==========

function addMcpConfig(serverPath) {
    if (process.platform !== 'win32') {
        return; // Nothing to do on other platforms
    }

    // VSCode workspace-specific config path
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        logWarning('No workspace folder found.');
        vscode.window.showWarningMessage('No workspace folder found. Please open a workspace first.');
        return;
    }

    const vscodeDir = path.join(workspaceFolder, '.vscode');
    const mcpConfigPath = path.join(vscodeDir, 'mcp.json');

    // Ensure the directory exists
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir, { recursive: true });
    }

    let mcpConfig = { servers: {} };

    // Load existing configuration if present
    if (fs.existsSync(mcpConfigPath)) {
        try {
            const configContent = fs.readFileSync(mcpConfigPath, 'utf8');
            mcpConfig = JSON.parse(configContent);
        } catch (error) {
            logWarning('Error reading existing MCP configuration:', error);
            mcpConfig = { servers: {} };
        }
    }

    // Add/update server configuration
    if (!mcpConfig.servers) {
        mcpConfig.servers = {};
    }

    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    const tiaMajorVersion = config.get('tiaMajorVersion') || 19;
    const loggingLevel = config.get('loggingLevel') || 2;
    const tiaPortalPath = config.get('tiaPortalPath') || 'C:\\Program Files\\Siemens\\Automation\\Portal V19';

    const serverName = 'tiaportal-mcp-v19';
    mcpConfig.servers[serverName] = {
        command: serverPath,
        args: [
            '--tia-major-version', tiaMajorVersion.toString(),
            '--logging', loggingLevel.toString()
        ],
        env: {
            TiaPortalLocation: tiaPortalPath
        }
    };

    // Write configuration back
    try {
        fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
        logInfo(`MCP server "${serverName}" successfully configured in: ${mcpConfigPath}`);
        vscode.window.showInformationMessage('Added TIA Portal MCP server to workspace configuration!\n\nNote: Please restart VS Code for Copilot to detect the new MCP server.');
    } catch (error) {
        logError('Error writing MCP configuration:', error);
        vscode.window.showErrorMessage(`Error writing MCP configuration: ${error.message}`);
    }
}

function updateMcpConfigIfExists(serverPath) {
    if (process.platform !== 'win32') {
        return; // Nothing to do on other platforms
    }

    // VSCode workspace-specific config path
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        return;
    }

    const vscodeDir = path.join(workspaceFolder, '.vscode');
    const mcpConfigPath = path.join(vscodeDir, 'mcp.json');

    // Ensure the directory exists
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir, { recursive: true });
    }

    let mcpConfig = { servers: {} };

    // Load existing configuration if present
    if (fs.existsSync(mcpConfigPath)) {
        try {
            const configContent = fs.readFileSync(mcpConfigPath, 'utf8');
            mcpConfig = JSON.parse(configContent);
        } catch (error) {
            logWarning('Error reading existing MCP configuration:', error);
            mcpConfig = { servers: {} };
        }
    }

    const serverName = 'tiaportal-mcp-v19';
    
    // If 'tiaportal-mcp-v19' already exists, update to correct version
    if (mcpConfig.servers && mcpConfig.servers[serverName]) {
        const config = vscode.workspace.getConfiguration('tiaportalMcp');
        const tiaMajorVersion = config.get('tiaMajorVersion') || 19;
        const loggingLevel = config.get('loggingLevel') || 2;
        const tiaPortalPath = config.get('tiaPortalPath') || 'C:\\Program Files\\Siemens\\Automation\\Portal V19';

        mcpConfig.servers[serverName].command = serverPath;
        mcpConfig.servers[serverName].args = [
            '--tia-major-version', tiaMajorVersion.toString(),
            '--logging', loggingLevel.toString()
        ];
        mcpConfig.servers[serverName].env = {
            TiaPortalLocation: tiaPortalPath
        };

        // Write configuration back
        try {
            fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
            logInfo(`MCP server "${serverName}" successfully updated in: ${mcpConfigPath}`);
            logInfo(`Please restart VS Code for Copilot to detect the updated configuration.`);
        } catch (error) {
            logError('Error writing MCP configuration:', error);
        }
    }
}

function removeMcpConfig() {
    if (process.platform !== 'win32') {
        return; // Nothing to do on other platforms
    }

    // VSCode workspace-specific config path
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        logWarning('No workspace folder found.');
        vscode.window.showWarningMessage('No workspace folder found.');
        return;
    }

    const vscodeDir = path.join(workspaceFolder, '.vscode');
    const mcpConfigPath = path.join(vscodeDir, 'mcp.json');

    if (!fs.existsSync(mcpConfigPath)) {
        vscode.window.showInformationMessage('MCP configuration file does not exist.');
        return;
    }

    try {
        const configContent = fs.readFileSync(mcpConfigPath, 'utf8');
        const mcpConfig = JSON.parse(configContent);

        if (mcpConfig.servers && mcpConfig.servers['tiaportal-mcp-v19']) {
            delete mcpConfig.servers['tiaportal-mcp-v19'];

            fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), 'utf8');

            logInfo('MCP server removed from configuration');
            vscode.window.showInformationMessage('Removed TIA Portal MCP server from workspace configuration!\n\nNote: Please restart VS Code for changes to take effect.');
        }
    } catch (error) {
        logWarning('Error removing MCP server:', error);
        vscode.window.showErrorMessage(`Error removing MCP server: ${error.message}`);
    }
}

// ========== Dependency Checking ==========

async function checkDependencies() {
    logInfo('=== Checking Dependencies ===');
    outputChannel.show();

    const results = {
        tiaPortal: await checkTiaPortal(),
        dotNet: await checkDotNet(),
        userGroup: await checkUserGroup(),
        envVariable: await checkEnvVariable(),
        serverExecutable: await checkServerExecutable()
    };

    // Display results
    const allGood = Object.values(results).every(r => r.status);
    
    if (allGood) {
        vscode.window.showInformationMessage('✅ All dependencies are satisfied!');
        logInfo('✅ All dependencies check passed');
    } else {
        const failedChecks = Object.entries(results)
            .filter(([_, v]) => !v.status)
            .map(([k, v]) => `${k}: ${v.message}`)
            .join('\n');
        
        vscode.window.showWarningMessage(
            'Some dependencies are missing. Check the output panel for details.',
            'View Details'
        ).then(selection => {
            if (selection === 'View Details') {
                outputChannel.show();
            }
        });
        
        logError(`❌ Dependency check failed:\n${failedChecks}`);
    }

    statusTreeDataProvider.updateStatus(results);
    return results;
}

async function checkTiaPortal() {
    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    const tiaPath = config.get('tiaPortalPath');
    
    logInfo(`Checking TIA Portal at: ${tiaPath}`);
    
    if (!fs.existsSync(tiaPath)) {
        logError(`❌ TIA Portal not found at: ${tiaPath}`);
        return { status: false, message: 'TIA Portal V19 not found' };
    }
    
    const opennessPath = path.join(tiaPath, 'PublicAPI', 'V19', 'Siemens.Engineering.dll');
    if (!fs.existsSync(opennessPath)) {
        logError(`❌ Openness API not found at: ${opennessPath}`);
        return { status: false, message: 'Openness API DLL not found' };
    }
    
    logInfo(`✅ TIA Portal V19 found`);
    return { status: true, message: 'TIA Portal V19 installed' };
}

async function checkDotNet() {
    logInfo('Checking .NET Framework 4.8...');
    
    try {
        // Check registry for .NET 4.8
        const { stdout } = await execPromise(
            'reg query "HKLM\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP\\v4\\Full" /v Release'
        );
        
        // .NET 4.8 has Release value >= 528040
        const match = stdout.match(/Release\s+REG_DWORD\s+0x([0-9a-fA-F]+)/);
        if (match) {
            const release = parseInt(match[1], 16);
            if (release >= 528040) {
                logInfo(`✅ .NET Framework 4.8 or later installed (Release: ${release})`);
                return { status: true, message: '.NET Framework 4.8+ installed' };
            }
        }
        
        logError('❌ .NET Framework 4.8 not found');
        return { status: false, message: '.NET Framework 4.8 required' };
    } catch (error) {
        logError(`❌ Error checking .NET Framework: ${error.message}`);
        return { status: false, message: 'Could not verify .NET Framework' };
    }
}

async function checkUserGroup() {
    logInfo('Checking user group membership...');
    
    try {
        const { stdout } = await execPromise(
            'powershell -Command "Get-LocalGroupMember -Group \'Siemens TIA Openness\' | Select-Object -ExpandProperty Name"'
        );
        
        const currentUser = process.env.USERNAME;
        const members = stdout.toLowerCase();
        
        if (members.includes(currentUser.toLowerCase())) {
            logInfo(`✅ User '${currentUser}' is in Siemens TIA Openness group`);
            return { status: true, message: 'User in required group' };
        } else {
            logWarning(`⚠️ User '${currentUser}' is NOT in Siemens TIA Openness group`);
            return { status: false, message: 'User not in Siemens TIA Openness group' };
        }
    } catch (error) {
        logError(`❌ Error checking user group: ${error.message}`);
        return { status: false, message: 'Could not verify user group' };
    }
}

async function checkEnvVariable() {
    logInfo('Checking TiaPortalLocation environment variable...');
    
    const envValue = process.env.TiaPortalLocation;
    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    const expectedPath = config.get('tiaPortalPath');
    
    if (!envValue) {
        logWarning('⚠️ TiaPortalLocation environment variable not set');
        return { status: false, message: 'TiaPortalLocation env var not set' };
    }
    
    if (envValue !== expectedPath) {
        logWarning(`⚠️ TiaPortalLocation mismatch: ${envValue} vs ${expectedPath}`);
        return { status: false, message: 'TiaPortalLocation path mismatch' };
    }
    
    logInfo(`✅ TiaPortalLocation = ${envValue}`);
    return { status: true, message: 'Environment variable configured' };
}

async function checkServerExecutable() {
    const serverPath = getServerPath();
    
    logInfo(`Checking server executable: ${serverPath}`);
    
    if (!fs.existsSync(serverPath)) {
        logError(`❌ Server executable not found: ${serverPath}`);
        return { status: false, message: 'TiaMcpServer.exe not found' };
    }
    
    logInfo(`✅ Server executable found`);
    return { status: true, message: 'Server executable available' };
}

// ========== Server Management ==========

async function startServer() {
    if (serverProcess) {
        vscode.window.showWarningMessage('Server is already running');
        return;
    }

    // Check dependencies first
    const depCheck = await checkDependencies();
    const criticalDeps = [depCheck.tiaPortal, depCheck.dotNet, depCheck.serverExecutable];
    
    if (!criticalDeps.every(d => d.status)) {
        vscode.window.showErrorMessage('Cannot start server: critical dependencies missing');
        return;
    }

    const serverPath = getServerPath();
    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    const tiaMajorVersion = config.get('tiaMajorVersion');
    const loggingLevel = config.get('loggingLevel');

    const args = [
        '--tia-major-version', tiaMajorVersion.toString(),
        '--logging', loggingLevel.toString()
    ];

    logInfo(`Starting MCP Server: ${serverPath} ${args.join(' ')}`);
    updateStatusBar('Starting...', true);

    try {
        serverProcess = spawn(serverPath, args, {
            env: {
                ...process.env,
                TiaPortalLocation: config.get('tiaPortalPath')
            }
        });

        serverProcess.stdout.on('data', (data) => {
            const message = data.toString();
            logInfo(`[STDOUT] ${message}`);
        });

        serverProcess.stderr.on('data', (data) => {
            const message = data.toString();
            if (config.get('showDetailedLogs')) {
                logInfo(`[STDERR] ${message}`);
            }
        });

        serverProcess.on('error', (error) => {
            logError(`Server error: ${error.message}`);
            updateStatusBar('Error', false);
            vscode.window.showErrorMessage(`MCP Server error: ${error.message}`);
            serverProcess = null;
        });

        serverProcess.on('close', (code) => {
            logInfo(`Server process exited with code ${code}`);
            updateStatusBar('Stopped', false);
            serverProcess = null;
            
            if (code !== 0 && code !== null) {
                vscode.window.showErrorMessage(`MCP Server exited with code ${code}`);
            }
        });

        // Give it a moment to start
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (serverProcess && !serverProcess.killed) {
            updateStatusBar('Running', true);
            vscode.window.showInformationMessage('TIA Portal MCP Server started successfully');
            logInfo('✅ Server started successfully');
        }

    } catch (error) {
        logError(`Failed to start server: ${error.message}`);
        updateStatusBar('Error', false);
        vscode.window.showErrorMessage(`Failed to start MCP Server: ${error.message}`);
        serverProcess = null;
    }
}

async function stopServer() {
    if (!serverProcess) {
        vscode.window.showInformationMessage('Server is not running');
        return;
    }

    logInfo('Stopping MCP Server...');
    updateStatusBar('Stopping...', false);

    try {
        serverProcess.kill();
        serverProcess = null;
        updateStatusBar('Stopped', false);
        vscode.window.showInformationMessage('TIA Portal MCP Server stopped');
        logInfo('✅ Server stopped');
    } catch (error) {
        logError(`Error stopping server: ${error.message}`);
        vscode.window.showErrorMessage(`Error stopping server: ${error.message}`);
    }
}

async function restartServer() {
    logInfo('Restarting MCP Server...');
    await stopServer();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await startServer();
}

async function installToUserGroup() {
    const result = await vscode.window.showWarningMessage(
        'This will add your user to the "Siemens TIA Openness" group. You will need to log out and log back in for changes to take effect. Continue?',
        'Yes', 'No'
    );

    if (result !== 'Yes') {
        return;
    }

    const currentUser = process.env.USERNAME;
    const command = `powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-Command', 'Add-LocalGroupMember -Group \\"Siemens TIA Openness\\" -Member \\"${currentUser}\\"' -Wait"`;

    logInfo(`Adding user ${currentUser} to Siemens TIA Openness group...`);

    try {
        await execPromise(command);
        vscode.window.showInformationMessage(
            'User added to group successfully. Please log out and log back in to Windows for the changes to take effect.',
            'OK'
        );
        logInfo('✅ User added to group');
    } catch (error) {
        logError(`Failed to add user to group: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to add user to group: ${error.message}`);
    }
}

// ========== UI Functions ==========

function openSettings() {
    vscode.commands.executeCommand('workbench.view.extension.tiaportal-mcp');
}

function showLogs() {
    outputChannel.show();
}

function updateStatusBar(status, isRunning) {
    const icon = isRunning ? '$(debug-start)' : '$(debug-stop)';
    statusBarItem.text = `${icon} TIA MCP: ${status}`;
}

// ========== Helpers ==========

function getServerPath() {
    const config = vscode.workspace.getConfiguration('tiaportalMcp');
    const customPath = config.get('serverPath');
    
    if (customPath && fs.existsSync(customPath)) {
        return customPath;
    }
    
    // Use bundled server
    const extensionPath = vscode.extensions.getExtension('siemens-automation.tiaportal-mcp-v19')?.extensionPath;
    return path.join(extensionPath, 'srv', 'net48', 'TiaMcpServer.exe');
}

function logInfo(message) {
    const timestamp = new Date().toLocaleTimeString();
    outputChannel.appendLine(`[${timestamp}] ${message}`);
}

function logWarning(message) {
    const timestamp = new Date().toLocaleTimeString();
    outputChannel.appendLine(`[${timestamp}] ⚠️ ${message}`);
}

function logError(message) {
    const timestamp = new Date().toLocaleTimeString();
    outputChannel.appendLine(`[${timestamp}] ❌ ${message}`);
}

// ========== Tree Data Provider ==========

class ServerStatusProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.statusData = {};
    }

    updateStatus(data) {
        this.statusData = data;
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            // Root level
            return [
                new StatusItem('TIA Portal V19', this.statusData.tiaPortal?.status ? '✅' : '❌', this.statusData.tiaPortal?.message),
                new StatusItem('.NET Framework 4.8', this.statusData.dotNet?.status ? '✅' : '❌', this.statusData.dotNet?.message),
                new StatusItem('User Group', this.statusData.userGroup?.status ? '✅' : '❌', this.statusData.userGroup?.message),
                new StatusItem('Environment Variable', this.statusData.envVariable?.status ? '✅' : '❌', this.statusData.envVariable?.message),
                new StatusItem('Server Executable', this.statusData.serverExecutable?.status ? '✅' : '❌', this.statusData.serverExecutable?.message)
            ];
        }
        return [];
    }
}

class StatusItem extends vscode.TreeItem {
    constructor(label, icon, description) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.iconPath = new vscode.ThemeIcon(icon === '✅' ? 'pass' : 'error');
        this.description = description;
    }
}

// ========== Webview Provider ==========

class SettingsViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(async data => {
            switch (data.type) {
                case 'checkDependencies':
                    await checkDependencies();
                    break;
                case 'startServer':
                    await startServer();
                    break;
                case 'stopServer':
                    await stopServer();
                    break;
                case 'restartServer':
                    await restartServer();
                    break;
                case 'installUserGroup':
                    await installToUserGroup();
                    break;
                case 'updateSetting':
                    const config = vscode.workspace.getConfiguration('tiaportalMcp');
                    await config.update(data.key, data.value, vscode.ConfigurationTarget.Global);
                    break;
            }
        });

        // Send current configuration
        this._updateWebview(webviewView.webview);

        // Listen for configuration changes
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('tiaportalMcp')) {
                this._updateWebview(webviewView.webview);
            }
        });
    }

    _updateWebview(webview) {
        const config = vscode.workspace.getConfiguration('tiaportalMcp');
        webview.postMessage({
            type: 'configUpdate',
            config: {
                tiaPortalPath: config.get('tiaPortalPath'),
                serverPath: config.get('serverPath'),
                tiaMajorVersion: config.get('tiaMajorVersion'),
                autoStart: config.get('autoStart'),
                loggingLevel: config.get('loggingLevel'),
                showDetailedLogs: config.get('showDetailedLogs'),
                checkDependenciesOnStartup: config.get('checkDependenciesOnStartup')
            }
        });
    }

    _getHtmlForWebview(webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TIA Portal MCP Settings</title>
    <style>
        body {
            padding: 10px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--vscode-foreground);
        }
        .setting-item {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-size: 13px;
        }
        input[type="text"], input[type="number"], select {
            width: 100%;
            padding: 6px;
            border: 1px solid var(--vscode-input-border);
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            font-size: 13px;
        }
        input[type="checkbox"] {
            margin-right: 8px;
        }
        button {
            padding: 8px 14px;
            margin: 5px 5px 5px 0;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            cursor: pointer;
            font-size: 13px;
        }
        button:hover {
            background: var(--vscode-button-hoverBackground);
        }
        button.secondary {
            background: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
        }
        button.secondary:hover {
            background: var(--vscode-button-secondaryHoverBackground);
        }
        .description {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            margin-top: 3px;
        }
    </style>
</head>
<body>
    <div class="section">
        <div class="section-title">🔧 Quick Actions</div>
        <button onclick="startServer()">Start Server</button>
        <button onclick="stopServer()" class="secondary">Stop Server</button>
    </div>

    <div class="section">
        <div class="section-title">⚙️ Server Configuration</div>
        
        <div class="setting-item">
            <label for="tiaPortalPath">TIA Portal Installation Path</label>
            <input type="text" id="tiaPortalPath" />
            <div class="description">Path to TIA Portal V19 installation directory</div>
        </div>

        <div class="setting-item">
            <label for="serverPath">Custom Server Path (Optional)</label>
            <input type="text" id="serverPath" />
            <div class="description">Leave empty to use bundled TiaMcpServer.exe</div>
        </div>

        <div class="setting-item">
            <label for="tiaMajorVersion">TIA Major Version</label>
            <input type="number" id="tiaMajorVersion" min="15" max="20" />
        </div>

        <div class="setting-item">
            <label for="loggingLevel">Logging Level</label>
            <select id="loggingLevel">
                <option value="0">No logging</option>
                <option value="1">Log to stderr</option>
                <option value="2">Log to debug output</option>
                <option value="3">Log to Windows event log</option>
            </select>
        </div>
    </div>

    <div class="section">
        <div class="section-title">🔄 Startup Options</div>
        
        <div class="setting-item">
            <label>
                <input type="checkbox" id="autoStart" />
                Auto-start server on VS Code startup
            </label>
        </div>

        <div class="setting-item">
            <label>
                <input type="checkbox" id="checkDependenciesOnStartup" />
                Check dependencies on startup
            </label>
        </div>

        <div class="setting-item">
            <label>
                <input type="checkbox" id="showDetailedLogs" />
                Show detailed logs in output panel
            </label>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        // Handle messages from extension
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'configUpdate') {
                updateUI(message.config);
            }
        });

        function updateUI(config) {
            document.getElementById('tiaPortalPath').value = config.tiaPortalPath || '';
            document.getElementById('serverPath').value = config.serverPath || '';
            document.getElementById('tiaMajorVersion').value = config.tiaMajorVersion || 19;
            document.getElementById('loggingLevel').value = config.loggingLevel || 2;
            document.getElementById('autoStart').checked = config.autoStart || false;
            document.getElementById('checkDependenciesOnStartup').checked = config.checkDependenciesOnStartup || false;
            document.getElementById('showDetailedLogs').checked = config.showDetailedLogs || false;
        }

        // Setting change handlers
        document.getElementById('tiaPortalPath').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'tiaPortalPath', value: e.target.value });
        });

        document.getElementById('serverPath').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'serverPath', value: e.target.value });
        });

        document.getElementById('tiaMajorVersion').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'tiaMajorVersion', value: parseInt(e.target.value) });
        });

        document.getElementById('loggingLevel').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'loggingLevel', value: parseInt(e.target.value) });
        });

        document.getElementById('autoStart').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'autoStart', value: e.target.checked });
        });

        document.getElementById('checkDependenciesOnStartup').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'checkDependenciesOnStartup', value: e.target.checked });
        });

        document.getElementById('showDetailedLogs').addEventListener('change', (e) => {
            vscode.postMessage({ type: 'updateSetting', key: 'showDetailedLogs', value: e.target.checked });
        });

        // Action handlers
        function checkDependencies() {
            vscode.postMessage({ type: 'checkDependencies' });
        }

        function startServer() {
            vscode.postMessage({ type: 'startServer' });
        }

        function stopServer() {
            vscode.postMessage({ type: 'stopServer' });
        }

        function restartServer() {
            vscode.postMessage({ type: 'restartServer' });
        }

        function installUserGroup() {
            vscode.postMessage({ type: 'installUserGroup' });
        }
    </script>
</body>
</html>`;
    }
}

module.exports = {
    activate,
    deactivate
};
