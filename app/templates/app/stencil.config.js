exports.config = {
  publicPath: '/dist',
  bundles: [
    { components: [] }
  ],
  collections: [{ name: '<%if(optionalFeatures.includes("Stencil Router")){%>@stencil/router<%}%>' }]
};
