import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCaseComponentName %>',
  styleUrl: '<%= paramCaseComponentName %>.<% if(sassSupport) { %>scss<% } %><% if(!sassSupport) { %>css<% } %>'
})
export class <%=componentName%> {
  render() {
    return (
      <div>
        <%= componentName %>
      </div>
    );
  }
}
