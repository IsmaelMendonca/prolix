// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../../_references.ts" />

module App.Scopes {
    'use strict';

    export interface CustomerListScope extends QueryScope<Models.Customer, Queries.CustomerQuery> {
        Countries: Models.Country[];
        Provinces: Models.Province[];
    }
}  
