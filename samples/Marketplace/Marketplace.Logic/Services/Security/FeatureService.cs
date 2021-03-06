// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using Marketplace.Data;
using Marketplace.Domain.Models.Security;
using Marketplace.Domain.Security;
using Marketplace.Logic.Contracts.Security;

namespace Marketplace.Logic.Services.Security
{
    public sealed class FeatureService : RepositoryService<Feature>, IFeatureService
    {
        #region Constructors

        public FeatureService(IDataContext context, SecurityContext security) : base(context, security)
        {
        }

        #endregion

        #region Methods

        public Feature Get(string path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return null;

            return Get(i => i.Path.ToLower() == path.ToLower());
        }

        #endregion
    }
}
