// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using AutoMapper;

using Marketplace.Api.Models.Security;
using Marketplace.Domain.Models.Security;

namespace Marketplace.Api.Core.Mapping.Security
{
    public class RoleMap : Profile
    {
        public RoleMap()
        {
            CreateMap<Role, RoleModel>()
                .ReverseMap();
        }
    }
}