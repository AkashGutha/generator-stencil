import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCasePageName %>',
  styleUrl: '<%= paramCasePageName %>.<% if(stylingSupport) { %>scss<% } %><% if(!stylingSupport) { %>css<% } %>'
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
