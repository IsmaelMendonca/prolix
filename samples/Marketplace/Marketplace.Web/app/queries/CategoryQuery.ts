// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../_references.ts" />

module App.Queries {
    'use strict';

    export class CategoryQuery extends QueryRequest {
        Name: string;
        
        constructor() {
            super();

            this.SortField = "Name";
        }
    }
}  
