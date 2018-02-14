import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCasePageName %>',
  styleUrl: '<%= paramCasePageName %>.<% if(sassSupport) { %>scss<% } %><% if(!sassSupport) { %>css<% } %>'
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
