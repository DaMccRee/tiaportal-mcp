# TIA Portal MCP V19 - VS Code Extension Build Script
# 此脚本自动构建 TIA MCP Server 并打包为 VS Code 扩展

param(
    [switch]$SkipBuild,      # 跳过服务器构建
    [switch]$SkipPackage,    # 跳过扩展打包
    [switch]$Install         # 打包后自动安装
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TIA Portal MCP V19 Extension Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
$extensionDir = Join-Path $projectRoot "vscode-extension"
$serverSrcDir = Join-Path $projectRoot "src\TiaMcpServer"
$serverBuildDir = Join-Path $serverSrcDir "bin\Release\net48"
$serverDestDir = Join-Path $extensionDir "srv\net48"

# Step 1: Build TIA MCP Server
if (-not $SkipBuild) {
    Write-Host "[1/4] Building TIA MCP Server..." -ForegroundColor Yellow
    
    Push-Location $projectRoot
    try {
        & dotnet build --configuration Release
        if ($LASTEXITCODE -ne 0) {
            throw "Build failed with exit code $LASTEXITCODE"
        }
        Write-Host "✅ Server build completed" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
    Write-Host ""
} else {
    Write-Host "[1/4] Skipping server build (--SkipBuild)" -ForegroundColor Gray
    Write-Host ""
}

# Step 2: Copy server files to extension directory
if (-not $SkipBuild) {
    Write-Host "[2/4] Copying server files..." -ForegroundColor Yellow
    
    if (-not (Test-Path $serverBuildDir)) {
        throw "Server build directory not found: $serverBuildDir"
    }
    
    # Create destination directory
    if (Test-Path $serverDestDir) {
        Remove-Item $serverDestDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $serverDestDir -Force | Out-Null
    
    # Copy all files
    Copy-Item -Path "$serverBuildDir\*" -Destination $serverDestDir -Recurse -Force
    
    $fileCount = (Get-ChildItem $serverDestDir -File).Count
    Write-Host "✅ Copied $fileCount files to extension directory" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[2/4] Skipping file copy (--SkipBuild)" -ForegroundColor Gray
    Write-Host ""
}

# Step 3: Install npm dependencies
Write-Host "[3/4] Installing npm dependencies..." -ForegroundColor Yellow

Push-Location $extensionDir
try {
    if (-not (Test-Path "node_modules")) {
        & npm install
        if ($LASTEXITCODE -ne 0) {
            throw "npm install failed"
        }
        Write-Host "✅ npm dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✅ npm dependencies already installed" -ForegroundColor Green
    }
}
finally {
    Pop-Location
}
Write-Host ""

# Step 4: Package extension
if (-not $SkipPackage) {
    Write-Host "[4/4] Packaging VS Code extension..." -ForegroundColor Yellow
    
    Push-Location $extensionDir
    try {
        # Remove old VSIX files
        Get-ChildItem -Filter "*.vsix" | Remove-Item -Force
        
        # Package extension
        & npx @vscode/vsce package
        if ($LASTEXITCODE -ne 0) {
            throw "vsce package failed"
        }
        
        $vsixFile = Get-ChildItem -Filter "*.vsix" | Select-Object -First 1
        if ($vsixFile) {
            Write-Host "✅ Extension packaged: $($vsixFile.Name)" -ForegroundColor Green
            
            # Move VSIX to project root for easy access
            $destVsix = Join-Path $projectRoot $vsixFile.Name
            Move-Item $vsixFile.FullName $destVsix -Force
            Write-Host "📦 VSIX moved to: $destVsix" -ForegroundColor Cyan
            
            # Install if requested
            if ($Install) {
                Write-Host ""
                Write-Host "Installing extension (with --force)..." -ForegroundColor Yellow
                
                try {
                    # 使用 --force 参数强制覆盖已安装的版本
                    $installJob = Start-Process -FilePath "code" -ArgumentList "--install-extension", $destVsix, "--force" -NoNewWindow -PassThru -Wait
                    
                    # 等待最多 30 秒
                    $timeout = 30
                    $elapsed = 0
                    while (-not $installJob.HasExited -and $elapsed -lt $timeout) {
                        Start-Sleep -Seconds 1
                        $elapsed++
                        Write-Host "." -NoNewline
                    }
                    Write-Host ""
                    
                    if (-not $installJob.HasExited) {
                        Write-Host "⚠️  Installation timeout after $timeout seconds" -ForegroundColor Yellow
                        Write-Host "💡 You can manually install with: code --install-extension $destVsix --force" -ForegroundColor Cyan
                        $installJob.Kill()
                    } elseif ($installJob.ExitCode -eq 0) {
                        Write-Host "✅ Extension installed successfully" -ForegroundColor Green
                        Write-Host "🔄 Please reload VS Code to activate the new version" -ForegroundColor Cyan
                    } else {
                        Write-Host "❌ Extension installation failed with exit code: $($installJob.ExitCode)" -ForegroundColor Red
                        Write-Host "💡 Try manually: code --install-extension $destVsix --force" -ForegroundColor Cyan
                    }
                }
                catch {
                    Write-Host "❌ Error during installation: $($_.Exception.Message)" -ForegroundColor Red
                    Write-Host "💡 Please install manually: code --install-extension $destVsix --force" -ForegroundColor Cyan
                }
            }
        } else {
            throw "VSIX file not found after packaging"
        }
    }
    finally {
        Pop-Location
    }
} else {
    Write-Host "[4/4] Skipping extension packaging (--SkipPackage)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Install: code --install-extension tiaportal-mcp-v19-*.vsix --force" -ForegroundColor White
Write-Host "  2. Reload VS Code (Ctrl+Shift+P -> Reload Window)" -ForegroundColor White
Write-Host "  3. Open TIA Portal MCP sidebar" -ForegroundColor White
Write-Host "  4. Run 'Check Dependencies'" -ForegroundColor White
Write-Host "  5. Start the MCP server" -ForegroundColor White
Write-Host ""
Write-Host "Quick install with build:" -ForegroundColor Cyan
Write-Host "  .\build-extension.ps1 -Install" -ForegroundColor White
Write-Host ""
