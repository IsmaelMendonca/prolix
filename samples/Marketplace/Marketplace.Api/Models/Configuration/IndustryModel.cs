// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using Wwa.Core.Domain;

namespace Marketplace.Api.Models.Configuration
{
    public class IndustryModel : ActiveNamedModel
    {
        public int? SectorId { get; set; }

        public string SectorName { get; set; }
    }
}