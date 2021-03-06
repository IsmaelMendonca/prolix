// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Marketplace.Domain.Models.Security;

namespace Marketplace.Data.Mappings.Security
{
    internal sealed class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("Users");

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

            Property(i => i.Email)
                .HasColumnName("Email");

            Property(i => i.RoleId)
                .HasColumnName("RoleId");

            Property(i => i.IdentityId)
                .HasColumnName("IdentityId");

			#endregion

			#region Relationships

			HasRequired(i => i.Role)
                .WithMany(m => m.Users)
                .HasForeignKey(c => c.RoleId);
            
            #endregion
        }
    }
}
