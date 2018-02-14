import { render } from '@stencil/core/testing';
import { <%=componentName%> } from './<%=paramCaseComponentName%>';

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
