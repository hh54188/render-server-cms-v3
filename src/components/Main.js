
import React from 'react';
import { Container, Form, Input, Checkbox } from 'semantic-ui-react'
require('semantic-ui-css/semantic.min.css');

class AppComponent extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <Form.Field inline>
            <label>文件夹路径</label>
            <Input value="Helo" />
          </Form.Field>
          <Form.Field inline>
            <label>端口号</label>
            <Input value="Helo" />            
          </Form.Field>
          <Form.Field inline>
            <label>启用production目录</label>
            <Checkbox toggle label="" />
          </Form.Field>          
        </Form>
      </Container>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
