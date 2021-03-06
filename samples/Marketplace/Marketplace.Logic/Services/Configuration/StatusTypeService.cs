// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using Marketplace.Data;
using Marketplace.Domain.Models.Configuration;
using Marketplace.Domain.Security;
using Marketplace.Logic.Contracts.Configuration;

namespace Marketplace.Logic.Services.Configuration
{
    public sealed class StatusTypeService : RepositoryService<StatusType>, IStatusTypeService
    {
        public StatusTypeService(IDataContext context, SecurityContext security) : base(context, security)
        {
        }
    }
}
