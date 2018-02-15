import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCasePageName %>',
  styleUrl: '<%= paramCasePageName %>.<% if(stylingSupport.includes("Sass")) { %>scss<% } %><% if(!stylingSupport.includes("Sass")) { %>css<% } %>'
})
export class <%=pageName%> {
  render() {
    return (
      <div class="<%= paramCasePageName %>">
        <h1><%= pageName %></h1>
      </div>
    );
  }
}
