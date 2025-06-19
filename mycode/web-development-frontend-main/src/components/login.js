import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Functional component for user login
const Login = props => {
   // Define state for name and id inputs
   const [name, setName] = useState('');
   const [id, setId] = useState('');

   // Handle change in the username input field
   const onChangeName = e => {
      const name = e.target.value;
      setName(name); // Update state with new name
   };

   // Handle change in the ID input field
   const onChangeId = e => {
      const id = e.target.value;
      setId(id); // Update state with new ID
   };

   // Function to execute on login button click
   const login = () => {
      // Pass name and id to parent component's login function
      props.login({ name: name, id: id });

      // Redirect user to the homepage after login
      props.history.push('/');
   };

   return (
      <div>
         <Form>
            {/* Username field */}
            <Form.Group>
               <Form.Label>Username</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={name}
                  onChange={onChangeName}
               />
            </Form.Group>

            {/* ID field */}
            <Form.Group>
               <Form.Label>ID</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter id"
                  value={id}
                  onChange={onChangeId}
               />
            </Form.Group>

            {/* Submit button triggers login function */}
            <Button variant="primary" onClick={login}>
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default Login;