import { render } from '@stencil/core/testing';
import { <%=componentName%><% if (jsxSupport) { %>, h<% } %> } from './<%=paramCaseComponentName%>';

describe('<%=paramCaseComponentName%>', () => {
  it('should build', () => {
    expect(new <%=componentName%>()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [<%=componentName%>],
        html: '<<%=paramCaseComponentName%>></<%=paramCaseComponentName%>>'
      });
    });
  });
});
