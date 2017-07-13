// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

/// <reference path="../_References.ts" />

module App.Services {
    "use strict";

    export class IdentityService extends Service {
        static $inject = ["$http", "Application", "$cookies"];

        private _context: Models.SecurityContext;

        constructor(public $http: ng.IHttpService, public Application: IApplication, private $cookies: angular.cookies.ICookiesService) {
            super($http, Application);
            this.LoadContext();
        }

        public Login(data: Models.Login): ng.IHttpPromise<Models.Access> {
            var url = this.BuildUrl("Login");
            var promise = this.$http.post(url, data);
            return promise;
        }

        public Logout(): ng.IHttpPromise<boolean> {
            var url = this.BuildUrl("Logout");
            var promise = this.$http.post(url, {});
            return promise;
        }

        public ChangePassword(data: Models.PasswordChange): ng.IHttpPromise<boolean> {
            var url = this.BuildUrl("ChangePassword");
            var promise = this.$http.post(url, data);
            return promise;
        }

        public Register(data: Models.Register): ng.IHttpPromise<Models.Access> {
            var url = this.BuildUrl("Register");
            var promise = this.$http.post(url, data);
            return promise;
        }

        public ClearContext() {
            if (Utils.IsUndefined(this.CurrentContext)) {
                this.CurrentContext = new Models.SecurityContext();
            }

            this.CurrentContext.Token = "";
            this.SaveContext(this.CurrentContext)
        }

        public CreateContext(data: Models.Access, save: boolean) {
            var obj = new Models.SecurityContext();
            obj.UserName = data.UserName;
            obj.Name = data.FullName;
            obj.Token = data.Token;

            if (save) {
                this.SaveContext(obj);
            }

            this.CurrentContext = obj;
        }

        public SaveContext(obj: Models.SecurityContext) {
            
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);

            var opts: ng.cookies.ICookiesOptions = {
                expires: expireDate
            };

            this.$cookies.putObject("SecurityContext", obj, opts);
        }

        public IsAutheticated(): boolean {
            return !Utils.IsUndefined(this.CurrentContext) && !Utils.IsEmpty(this.CurrentContext.Token);
        }

        get CurrentContext(): Models.SecurityContext {
            return this._context;
        }

        set CurrentContext(value: Models.SecurityContext) {
            this._context = value;

            var auth = "";
            if (!Utils.IsUndefined(value) && !Utils.IsEmpty(value.Token)) {
                auth = "Bearer " + this.CurrentContext.Token;
            }
            // keep user logged in after page refresh
            this.$http.defaults.headers.common["Authorization"] = auth;
        }

        private LoadContext() {
            var obj = new Models.SecurityContext();
            try {
                var data = this.$cookies.getObject("SecurityContext");
                if (!Utils.IsUndefined(data)) {
                    obj = <Models.SecurityContext>data;
                }
            } catch (e) {
                obj = new Models.SecurityContext();
            }

            this.CurrentContext = obj;
        }
    }
} 