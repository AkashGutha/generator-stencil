import { Component } from '@stencil/core';
<% if (optionalFeatures.includes('Helmet')) { %>import Helmet from '@stencil/helmet';<% } %>

@Component({
  tag: '<%= paramCasePageName %>',
  styleUrl: '<%= paramCasePageName %>.<% if(stylingSupport.includes("Sass")) { %>scss<% } %><% if(!stylingSupport.includes("Sass")) { %>css<% } %>'
})
export class <%=pageName%> {
  render() {
    return (
      <div class="<%= paramCasePageName %>">
        <h1><%= pageName %></h1>
        <% if(optionalFeatures.includes('Helmet')) { %>
          <Helmet>
            <title>{this.title}</title>
            <meta name="description" content={this.description} />
            <link rel="stylesheet" href="/styles.css" />
          </Helmet>
          <% } %>
      </div>
    );
  }
}
