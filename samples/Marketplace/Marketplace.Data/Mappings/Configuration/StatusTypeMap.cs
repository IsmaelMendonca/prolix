// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Marketplace.Domain.Models.Configuration;

namespace Marketplace.Data.Mappings.Configuration
{
    internal sealed class StatusTypeMap : EntityTypeConfiguration<StatusType>
    {
        public StatusTypeMap()
        {
            ToTable("StatusTypes");

            #region Main

            HasKey(i => i.Id);

            Property(i => i.Id)
                .HasColumnName("Id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(i => i.Active)
                .HasColumnName("Active");

            #endregion

            #region Fields

            Property(i => i.Name)
                .HasColumnName("Name");

            #endregion
        }
    }
}
