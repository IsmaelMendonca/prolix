// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using Prolix.Core.Domain;

namespace Marketplace.Client.Models.Security
{
    public class UserModel : ActiveNamedModel
    {
        public string Email { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
