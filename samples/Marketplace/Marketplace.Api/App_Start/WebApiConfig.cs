// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using AutoMapper;
using Newtonsoft.Json;

using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;

using Marketplace.Api.Core.Filters;
using Marketplace.Data;
using Marketplace.Domain.Security;
using Marketplace.Logic.Services.Configuration;

using Prolix.Api.Cors;
using Prolix.Api.Extensions;
using Prolix.Api.Filters;
using Prolix.Api.Formatters;
using Prolix.Api.Ioc;
using Prolix.Identity.AspNet;
using Prolix.Ioc.Autofac;

namespace Marketplace.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Dependency Resolver
            ConfigureDependencies(config);

            // Api Handlers/Services
            ConfigureHandlers(config);

            // Formatters
            ConfigureFormatters(config);

            // Web API routes
            ConfigureRoutes(config);

            // CORS
            ConfigureCors(config);

            // AutoMapper
            ConfigureMapper();
        }

        static void ConfigureDependencies(HttpConfiguration config)
        {
            // IoC container
            var resolver = new AutofacResolver();

            // Map app dependencies
            resolver.ScanAssembly<SecurityContext>();     // Domain
            resolver.ScanAssembly<DataContext>();         // Data
            resolver.ScanAssembly<CategoryService>();     // Logic
            resolver.ScanAssembly<PermissionAttribute>(); // Api

            // Map code dependencies
            resolver.ScanAssembly<GlobalAuthorizeAttribute>();// Filters
            resolver.ScanAssembly<IdentityManager>();         // Identity
            
            // Map all controllers
            resolver.ScanTypes<IHttpController>(Assembly.GetExecutingAssembly());

            // Setting the Resolver
            config.DependencyResolver = resolver.GetHttpResolver();
        }
        
        static void ConfigureHandlers(HttpConfiguration config)
        {
            // Global Services/Handlers
            config.UseGlobalHandlers();
        }

        static void ConfigureRoutes(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.MapHttpDefaultRoutes();
        }

		static void ConfigureFormatters(HttpConfiguration config)
		{
			config.Formatters.Add(new CsvMediaTypeFormatter());

			var jsonSettings = config?.Formatters?.JsonFormatter?.SerializerSettings;

			if (jsonSettings != null)
				jsonSettings.NullValueHandling = NullValueHandling.Ignore;
		}

        static void ConfigureCors(HttpConfiguration config)
        {
            config.EnableCors(new CorsPolicyProvider());
        }

        static void ConfigureMapper()
        {
            var assembly = typeof(WebApiConfig).Assembly;

            Mapper.Initialize(mapper => mapper.AddProfiles(assembly));
        }
    }
}
