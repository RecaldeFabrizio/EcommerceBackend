import { Form } from 'react-bootstrap'

const LoginItem = ({email, password, inputChanges}) => {
  return (
    <Form xs="auto">
    <Form.Group className="mb-3" >
      <Form.Label >Email address</Form.Label>
      <Form.Control 
      type="email" 
      id='email'
      name='email'
      value={email}
      onChange={inputChanges}
      placeholder="Enter email"
      />
      <Form.Text className="text-muted">
      enter your email.
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label >Password</Form.Label>
      <Form.Control 
      type="password"
      id='password'
      name='password'
      value={password}
      onChange={inputChanges}
      placeholder="Password" 
      />
    </Form.Group>
  </Form>   
  )
}

export default LoginItem
