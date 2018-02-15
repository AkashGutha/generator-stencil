import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCaseComponentName %>',
  styleUrl: '<%= paramCaseComponentName %>.<% if(stylingSupport) { %>scss<% } %><% if(!stylingSupport) { %>css<% } %>'
})
export class <%=componentName%> {
  render() {
    return (
      <div class="<%= paramCaseComponentName %>">
        <%= componentName %>
      </div>
    );
  }
}
