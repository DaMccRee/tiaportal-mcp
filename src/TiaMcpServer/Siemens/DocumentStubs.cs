// Copyright (c) 2025 DHY
// This file contains stubs for V20 document features not available in V19

using System.Collections.Generic;
using System.ComponentModel;

namespace Siemens.Engineering.SW.Blocks
{
    /// <summary>
    /// Stub for V20-only ImportDocumentOptions enum
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public enum ImportDocumentOptions
    {
        None = 0,
        Override = 1,
        SkipInactiveCultures = 2,
        ActivateInactiveCultures = 4
    }

    /// <summary>
    /// Stub for V20-only DocumentResultState enum
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public enum DocumentResultState
    {
        Success = 0,
        PartialSuccess = 1,
        Failure = 2
    }

    /// <summary>
    /// Stub for V20-only DocumentExportResult class
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class DocumentExportResult
    {
        public DocumentResultState State { get; set; }
        public string Message { get; set; } = string.Empty;
    }

    /// <summary>
    /// Stub for V20-only DocumentImportResult class
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class DocumentImportResult
    {
        public DocumentResultState State { get; set; }
        public string Message { get; set; } = string.Empty;
        public IEnumerable<PlcBlock>? ImportedPlcBlocks { get; set; }
    }
}
