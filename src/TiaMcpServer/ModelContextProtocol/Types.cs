using System.Collections.Generic;

namespace TiaMcpServer.ModelContextProtocol
{
    public class Attribute
    {
        public string? Name { get; set; }
        public object? Value { get; set; }
        public string? AccessMode { get; set; }
    }

    public class BlockGroupInfo
    {
        public string? Name { get; set; }
        public IEnumerable<BlockGroupInfo>? Groups { get; set; }
        public IEnumerable<ResponseBlockInfo>? Blocks { get; set; }
    }
}
