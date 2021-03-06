// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using Prolix.Core.Domain;
using System;

namespace Marketplace.Client.Models.Trading
{
    public class OrderModel : ActiveModel
    {
        public DateTime? Date { get; set; }
        public decimal TotalAmount { get; set; }

        public int? StatusId { get; set; }
        public int? CustomerId { get; set; }
        public int? DealerId { get; set; }

        public string StatusName { get; set; }
        public string CustomerName { get; set; }
        public string DealerName { get; set; }
    }
}
