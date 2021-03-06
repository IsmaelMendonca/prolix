// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Marketplace.Domain.Models.Security;

namespace Marketplace.Data.Mappings.Security
{
    internal sealed class AuditChangeMap : EntityTypeConfiguration<AuditChange>
    {
        public AuditChangeMap()
        {
            ToTable("AuditChange");

            #region Main

            HasKey(i => i.Id);

            Property(i => i.Id)
                .HasColumnName("Id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            #endregion

            #region Fields

            Property(i => i.LogId)
                .HasColumnName("LogId");

            Property(i => i.FieldName)
                .HasColumnName("FieldName");

            Property(i => i.NewValue)
                .HasColumnName("NewValue");

            Property(i => i.OldValue)
                .HasColumnName("OldValue");

            #endregion

            #region Relationships

            HasRequired(i => i.Log)
                .WithMany(m => m.Changes)
                .HasForeignKey(c => c.LogId);

            #endregion
        }
    }
}
