// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../../_references.ts" />

module App.Scopes {
    'use strict';

    export interface OrderListScope extends QueryScope<Models.Order, Queries.OrderQuery> {
        Customer: Models.AutoCompleteConfig<Models.Customer>;
        Dealer: Models.AutoCompleteConfig<Models.Dealer>;
        Product: Models.AutoCompleteConfig<Models.Product>;

        StatusTypes: Models.StatusType[];
    }
}  
