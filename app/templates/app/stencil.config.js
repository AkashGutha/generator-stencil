<% if (optionalFeatures.includes('Sass')) { %>const sass = require('@stencil/sass');<% } %>
<% if (optionalFeatures.includes('CSS')) { %>const postcss = require('@stencil/postcss');
  const autoprefixer = require('autoprefixer');<% } %>

    exports.config = {
  publicPath: '/dist',
    plugins: [
      <% if (optionalFeatures.includes('Sass')) { %>sass(),<% } %>
      <% if (optionalFeatures.includes('CSS')) { %>postcss({
        plugins: [autoprefixer()]
      }),<% } %>
    ],
      bundles: [
        { components: [] }
      ],
        collections: [{ name: '<%if(optionalFeatures.includes("Stencil Router")){%>@stencil/router<%}%>' }]
};
