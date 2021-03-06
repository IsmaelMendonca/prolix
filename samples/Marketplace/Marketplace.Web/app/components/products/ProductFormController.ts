// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../../_references.ts" />

module App.Controllers {
    'use strict';

    export class ProductFormController extends Controller {
        
        // $inject: Avoid injection errors caused by minification
        static $inject = ['$scope', '$location', '$stateParams', 'ToastService', 'CategoryService', 'DealerService', 'ProductService'];

        // Injected dependencies
        constructor(
            public $scope: Scopes.ProductFormScope,
            private $location: ng.ILocationService,
            private $stateParams: App.StateParameters,
            private ToastService: Services.ToastService,
            private CategoryService: Services.CategoryService,
            private DealerService: Services.DealerService,
            private ProductService: Services.ProductService
        ) {
            // Invoke parent constructor
            super($scope);

            // Gets the route parameter
            this.$scope.Id = $stateParams.Id;
        }

        public Init() {
            // Load lists
            this.LoadCategories();

            // Scope initialization
            this.$scope.Form = new Models.Product();
            this.$scope.Dealer = new Models.AutoCompleteConfig<Models.Dealer>();

            if (!this.IsNew()) {
                // Load from api
                this.Load();
            }
        }

        public NameRemaining() {
            if (Utils.IsUndefined(this.$scope.Form))
                return 100;

            return super.Remainder(100, this.$scope.Form.Name);
        }

        public IsNew() {
            return Utils.IsUndefined(this.$scope.Id) || this.$scope.Id <= 0;
        }

        public Back() {
            this.$location.url("/products");
        }

        public Save() {
            
            var scope = this.$scope;
            var location = this.$location;

            this.Wait();

            // Sends out data for insert/update
            var promise = this.ProductService.Save(scope.Form);

            promise
                .then((result: any) => {
                    location.url('/products');
                })
                .catch((error: Models.ErrorResult) => {
                    scope.Rule = error.Rule;
                    this.ToastService.Warning(error.Text);
                })
                .finally(() => {
                    this.Done();
                });
        }

        public Load() {
            // Load from api
            var scope = this.$scope;
            var promise = this.ProductService.Get(scope.Id);

            this.Wait();

            promise
                .then((result: Models.Product) => {
                    
                    var dealer = new Models.Dealer();
                    dealer.Id = result.DealerId;
                    dealer.Name = result.DealerName;

                    scope.Dealer.Model = dealer;
                    scope.Form = result;
                })
                .catch((error: Models.ErrorResult) => {
                    if (error.Rule != null) 
                        scope.Rule = error.Rule;

                    this.ToastService.Warning(error.Text);
                })
                .finally(() => {
                    this.Done();
                });
        }

        private LoadCategories() {
            var scope = this.$scope;
            var promise = this.CategoryService.All();

            this.Wait();

            promise
                .then((result: Models.Category[]) => {
                    scope.Categories = result;
                })
                .catch((error: Models.ErrorResult) => {
                    scope.Rule = error.Rule;
                    this.ToastService.Warning(error.Text);
                })
                .finally(() => {
                    this.Done();
                });
        }

        public SearchDealer(name: string) {

            var scope = this.$scope;

            var filter = new Queries.DealerQuery();
            filter.Name = name;
            filter.IsSimple = true; // Id/Name

            // Api call
            var promise = this.DealerService.Search(filter);

            // Parse data
            var result =
                promise
                    .then((response: Queries.PagedList<Models.Dealer>) => {
                        return response.Items;
                    })
                    .catch((error: Models.ErrorResult) => {
                        this.ToastService.Warning("There's an error fetching the data..");
                        return [];
                    });

            return result;
        }

    }
} 
