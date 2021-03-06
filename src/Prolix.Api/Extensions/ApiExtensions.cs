// Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
// See License.txt in the project root for license information.

using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Filters;

using Prolix.Api.Handlers;
using Prolix.Api.Providers;

namespace Prolix.Api.Extensions
{
    public static class ApiExtensions
    {
        const string DefaultRouteKey = "DefaultRouteName";
        /// <summary>
        /// Maps the default routes
        /// </summary>
        /// <param name="config">The server configuration.</param>
        /// <param name="apiPrefix">The prefix of the route</param>
        /// <param name="name">The name of the default route to map.</param>
        /// <param name="template">The route template for the default route.</param>
        /// <param name="defaults">An object that contains route values for the defaut route.</param>
        public static void MapHttpDefaultRoutes(
            this HttpConfiguration config,
            string apiPrefix = "api",
            string name = "DefaultApi", 
            string template = "{controller}/{id}", 
            object defaults = null
        )
        {
            if (defaults == null)
                defaults = new { id = RouteParameter.Optional };

            string defaultTemplate = $"{apiPrefix}/{template}";
            string notFoundTemplate = "{*uri}";

            config.Routes.MapHttpRoute(
                name: name,
                routeTemplate: defaultTemplate,
                defaults: defaults
            );

            // Catch all invalid routes
            config.Routes.MapHttpRoute(
                name: "InvalidRoute",
                routeTemplate: notFoundTemplate,
                defaults: new { uri = RouteParameter.Optional }
            );

            config.Properties[DefaultRouteKey] = name;
        }

        /// <summary>
        /// Replaces default handers with Prolix default ones (e.g. Exception Habndling, Filter Provider, etc.)
        /// </summary>
        /// <param name="config">The server configuration.</param>
        public static void UseGlobalHandlers(this HttpConfiguration config)
        {
            // Global Services/Handlers
            config.Services.Replace(typeof(IFilterProvider), new GlobalFilterProvider());
            config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());

            // Route interceptor
            config.MessageHandlers.Insert(0, new RouteHandler());
        }

        /// <summary>
        /// Returns the default configured route
        /// </summary>
        /// <param name="config">The server configuration.</param>
        /// <returns>The default route</returns>
        public static string GetDefaultRouteName(this HttpConfiguration config)
        {
            if (!config?.Properties?.ContainsKey(DefaultRouteKey) ?? false)
                return null;

            return $"{config.Properties[DefaultRouteKey]}";
        }

        public static ObjectContent<ModelType> GetContent<ModelType>(this HttpRequestMessage request, ModelType value)
            where ModelType : class
        {
            if (request == null)
                return null;

            var config = request.GetConfiguration();
            var negotiator = config.Services.GetContentNegotiator();
            var formatters = config.Formatters;

            var result = negotiator.Negotiate(typeof(ModelType), request, formatters);
            var content = new ObjectContent<ModelType>(value, result.Formatter, result.MediaType);

            return content;
        }
    }
}
