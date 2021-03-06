// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../../_references.ts" />

module App.Controllers {
    'use strict';

    export class OrderFormController extends Controller {
        
        // $inject: Avoid injection errors caused by minification
        static $inject = ['$scope', '$location', '$stateParams', 'ToastService', 'DealerService', 'ProductService', 'CustomerService', 'StatusTypeService', 'OrderService'];

        // Injected dependencies
        constructor(
            public $scope: Scopes.OrderFormScope,
            private $location: ng.ILocationService,
            private $stateParams: App.StateParameters,
            private ToastService: Services.ToastService,
            private DealerService: Services.DealerService,
            private ProductService: Services.ProductService,
            private CustomerService: Services.CustomerService,
            private StatusTypeService: Services.StatusTypeService,
            private OrderService: Services.OrderService
        ) {
            // Invoke parent constructor
            super($scope);

            // Gets the route parameter
            this.$scope.Id = $stateParams.Id;
        }

        public Init() {
            // Scope initialization
            this.$scope.Customer = new Models.AutoCompleteConfig<Models.Customer>();
            this.$scope.Dealer = new Models.AutoCompleteConfig<Models.Dealer>();
            this.$scope.Product = new Models.AutoCompleteConfig<Models.Product>();
            this.$scope.Form = new Models.Order();

            if (!this.IsNew()) {
                // Load from api
                this.Load();
            }

            this.LoadStatusTypes();
        }

        public IsNew() {
            return Utils.IsUndefined(this.$scope.Id) || this.$scope.Id <= 0;
        }

        public Back() {
            this.$location.url("/orders");
        }

        public Add() {

            var product = this.$scope.Product.Model;
            var form = this.$scope.Form;
            var quantity = this.$scope.Quantity;
            var message = "";


            if (!product || !product.Id) {
                message = "Select a product first.";
            }
            else if (Utils.IsUndefined(quantity)) {
                message = "Enter a quantity a product first.";
            }

            if (Utils.IsEmpty(message)) {
                var amount = product.Price * quantity;
                var item = new Models.OrderItem();

                item.ProductId = product.Id;
                item.ProductName = product.Name;
                item.Price = product.Price
                item.Amount = amount;
                item.Quantity = quantity;

                form.Items.push(item);

                this.$scope.Product.Model = null;
                this.$scope.Quantity = null;
                
                form.TotalAmount = this.GeTotal();
            } 
            else {
                this.ToastService.Warning(message);
            }
        }

        public GeTotal() {
            var total = 0;
            var items = this.$scope.Form.Items;

            for (var i = 0; i < items.length; i++) {
                var product = items[i];
                total += (product.Price * product.Quantity);
            }
            return total;
        }

        public Delete(item: Models.OrderItem) {
            var form = this.$scope.Form;
            var items = form.Items;

            var index = items.indexOf(item);
            items.splice(index, 1);

            form.TotalAmount = this.GeTotal();
        }

        public Save() {
            
            var scope = this.$scope;
            var location = this.$location;

            this.Wait();

            // Sends out data for insert/update
            var promise = this.OrderService.Save(scope.Form);

            promise
                .then((result: any) => {
                    location.url('/orders');
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
            var promise = this.OrderService.Get(scope.Id);

            this.Wait();

            promise
                .then((result: Models.Order) => {
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

        public SearchCustomer(name: string) {

            var scope = this.$scope;

            var filter = new Queries.CustomerQuery();
            filter.Name = name;
            filter.IsSimple = true; // Id/Name

            // Api call
            var promise = this.CustomerService.Search(filter);

            // Parse data
            var result =
                promise
                    .then((response: Queries.PagedList<Models.Customer>) => {
                        return response.Items;
                    })
                    .catch((error: Models.ErrorResult) => {
                        this.ToastService.Warning("There's an error fetching the data..");
                        return [];
                    });

            return result;
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

        public SearchProduct(name: string) {
            
            var scope = this.$scope;

            var filter = new Queries.ProductQuery();
            filter.Name = name;
            filter.IsSimple = true; // Id/Name

            // Api call
            var promise = this.ProductService.Search(filter);

            // Parse data
            var result =
                promise
                    .then((response: Queries.PagedList<Models.Product>) => {
                        return response.Items;
                    })
                    .catch((error: Models.ErrorResult) => {
                        this.ToastService.Warning("There's an error fetching the data..");
                        return [];
                    });

            return result;
        }

        private LoadStatusTypes() {

            var scope = this.$scope;

            var promise = this.StatusTypeService.All();

            this.Wait();

            promise
                .then((result: Models.StatusType[]) => {
                    scope.StatusTypes = result;
                })
                .catch((error: Models.ErrorResult) => {
                    scope.Rule = error.Rule;
                    this.ToastService.Warning(error.Text);
                })
                .finally(() => {
                    this.Done();
                });
        }

        public CustomerChange() {
            this.ClearRule('CustomerId');

            var model = this.$scope.Customer.Model;
            var form = this.$scope.Form;

            if (!Utils.IsUndefined(model))
                form.CustomerId = model.Id;
            else
                form.CustomerId = null;
        }

        public DealerChange() {
            this.ClearRule('DealerId');
            
            var model = this.$scope.Dealer.Model;
            var form = this.$scope.Form;

            if (!Utils.IsUndefined(model))
                form.DealerId = model.Id;
            else
                form.DealerId= null;
        }
    }
} 
