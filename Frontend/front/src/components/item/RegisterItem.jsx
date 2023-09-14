import { Col, Form, InputGroup, Row } from 'react-bootstrap';

function RegisterItem({first_name, last_name, email, password, onInputChange}) {
  return (
         <Form>
      <Row className="align-items-center">
      <Col xs="auto">
          <Form.Label htmlFor="first_name" visuallyHidden>
            First_Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={onInputChange}
            placeholder="First Name"
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="Last_name" visuallyHidden>
            Last_Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={onInputChange}
            placeholder="First Name"
          />
        </Col>
        <Row xs="auto">
        <Col xs="auto">
          <Form.Label  htmlFor="email" visuallyHidden>
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control 
            className="mb-2"
            id="email"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="Email" />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="password" visuallyHidden>
            Password
          </Form.Label>
          <Form.Control
            className="mb-2"
            type='password'
            id="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Password"
          />
        </Col>
        </Row >
      </Row>
    </Form>
  );
}

export default RegisterItem;
