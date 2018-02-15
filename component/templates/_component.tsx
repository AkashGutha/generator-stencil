import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCaseComponentName %>',
  styleUrl: '<%=paramCaseComponentName%>.<% if(stylingSupport.includes("Sass")) { %>scss<% } %><% if(!stylingSupport.includes("Sass")) { %>css<% } %>'
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
