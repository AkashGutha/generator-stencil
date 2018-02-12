import { Component } from '@stencil/core';

@Component({
  tag: '<%= paramCaseComponentName %>',
  styleUrl: '<%= paramCaseComponentName %>.css'
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
