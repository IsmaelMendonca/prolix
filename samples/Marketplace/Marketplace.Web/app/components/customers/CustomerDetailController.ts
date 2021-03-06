// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../../_references.ts" />

module App.Controllers {
    'use strict';

    export class CustomerDetailController extends Controller {
        
        // $inject: Avoid injection errors caused by minification
        static $inject = ['$scope', '$location', '$stateParams', 'ToastService', 'CustomerService'];

        // Injected dependencies
        constructor(
            public $scope: Scopes.CustomerDetailScope,
            private $location: ng.ILocationService,
            private $stateParams: App.StateParameters,
            private ToastService: Services.ToastService,
            private CustomerService: Services.CustomerService
        ) {
            // Invoke parent constructor
            super($scope);

            // Gets the route parameter
            $scope.Id = $stateParams.Id;
        }

        public Init() {
            // Load from api
            this.Load();
        }

        public Load() {
            var scope = this.$scope;
            var promise = this.CustomerService.Get(scope.Id);

            this.Wait();

            promise
                .then((result: Models.Customer) => {
                    scope.Item = result;
                })
                .catch((error: Models.ErrorResult) => {
                    scope.Rule = error.Rule;
                    this.ToastService.Warning(error.Text);
                })
                .finally(() => {
                    this.Done();
                });
        }
    }
} 
