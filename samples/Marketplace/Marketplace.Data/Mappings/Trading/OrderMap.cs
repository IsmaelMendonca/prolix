// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Marketplace.Domain.Models.Trading;

namespace Marketplace.Data.Mappings.Trading
{
    internal sealed class OrderMap : EntityTypeConfiguration<Order>
    {
        public OrderMap()
        {
            ToTable("Orders");

            #region Main

            HasKey(i => i.Id);

            Property(i => i.Id)
                .HasColumnName("Id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(i => i.Active)
                .HasColumnName("Active");

            #endregion

            #region Fields

            Property(i => i.Date)
                .HasColumnName("Date");

            Property(i => i.TotalAmount)
                .HasColumnName("TotalAmount");

            Property(i => i.StatusId)
                .HasColumnName("StatusId");

            Property(i => i.DealerId)
                .HasColumnName("DealerId");

            Property(i => i.CustomerId)
                .HasColumnName("CustomerId");

            #endregion

            #region Relationships

            HasRequired(i => i.Status)
                .WithMany()
                .HasForeignKey(c => c.StatusId);

            HasRequired(i => i.Customer)
                .WithMany(m => m.Orders)
                .HasForeignKey(c => c.CustomerId);

            HasRequired(i => i.Dealer)
                .WithMany(m => m.Orders)
                .HasForeignKey(c => c.DealerId);

            #endregion
        }
    }
}
