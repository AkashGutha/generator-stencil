import { Component } from '@stencil/core';

@Component({
  tag: '<%= componentName %>',
  styleUrl: '<%= componentName %>.css'
})
export class MyComponent {

  render() {
    return (
      <div>
        <%= componentName %>
      </div>
    );
  }
}
