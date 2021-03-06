// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Marketplace.Domain.Models.Security;

namespace Marketplace.Data.Mappings.Security
{
    internal sealed class AuditLogMap : EntityTypeConfiguration<AuditLog>
    {
        public AuditLogMap()
        {
            ToTable("AuditLog");

            #region Main

            HasKey(i => i.Id);

            Property(i => i.Id)
                .HasColumnName("Id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            #endregion

            #region Fields

            Property(i => i.UserId)
                .HasColumnName("UserId");

            Property(i => i.FeatureId)
                .HasColumnName("FeatureId");

            Property(i => i.Date)
                .HasColumnName("Date");

            Property(i => i.Detail)
                .HasColumnName("Detail");

            #endregion

            #region Relationships

            HasOptional(i => i.User)
                .WithMany()
                .HasForeignKey(c => c.UserId);

            HasRequired(i => i.Feature)
                .WithMany()
                .HasForeignKey(c => c.FeatureId);

            #endregion
        }
    }
}
