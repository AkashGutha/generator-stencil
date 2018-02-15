<% if (stylingSupport.includes('Sass')) { %>const sass = require('@stencil/sass');<% } %>
<% if (stylingSupport.includes('CSS')) { %>const postcss = require('@stencil/postcss');
const autoprefixer = require('autoprefixer');<% } %>

    exports.config = {
  publicPath: '/dist',
    plugins: [
      <% if (stylingSupport.includes('Sass')) { %>sass(),<% } %>
      <% if (stylingSupport.includes('CSS')) { %>postcss({
        plugins: [autoprefixer()]
      }),<% } %>
    ],
      bundles: [
        { components: [] }
      ],
        collections: [{
          name: '<%if(optionalFeatures.includes("Stencil Router")){%>@stencil/router<%}%>'
        },{
          name: '<%if(optionalFeatures.includes("Helmet")){%>@stencil/helmet<%}%>'
        }]
};
