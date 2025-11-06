// Copyright (c) 2025 DHY
// This file contains extension method stubs for V20 document features not available in V19

using System;
using System.ComponentModel;
using System.IO;

namespace Siemens.Engineering.SW.Blocks
{
    /// <summary>
    /// Extension methods to provide V20 document functionality stubs for V19 compilation
    /// These methods throw runtime exceptions as document features are not available in V19
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class BlockDocumentExtensions
    {
        /// <summary>
        /// Stub for V20 ExportAsDocuments method (DirectoryInfo + string version)
        /// </summary>
        public static DocumentExportResult ExportAsDocuments(this PlcBlock block, DirectoryInfo targetDirectory, string fileName)
        {
            throw new NotSupportedException("Document export (.s7dcl/.s7res) is only available in TIA Portal V20 or later");
        }

        /// <summary>
        /// Stub for V20 ImportFromDocuments method (DirectoryInfo + string + options)
        /// </summary>
        public static DocumentImportResult ImportFromDocuments(this PlcBlockComposition blocks, DirectoryInfo sourceDirectory, string fileName, ImportDocumentOptions options)
        {
            throw new NotSupportedException("Document import (.s7dcl/.s7res) is only available in TIA Portal V20 or later");
        }
    }
}
