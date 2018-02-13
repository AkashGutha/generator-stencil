exports.config = {
  publicPath: '/dist',
  bundles: [
    { components: [] }
  ],
  collections: [{ name: '<%if(stencilRouterSupport){%>@stencil/router<%}%>' }]
};
