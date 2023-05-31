import React from 'react'
import { Button, Fom, Form } from "semantic-ui-react"
import './LoginForm.scss'



export function LoginForm() {
  return (

    <Form className='login-form-admin'>

        <Form.Input name='email' placeholder="Correo electronico" />

        <Form.Input name="password" type="password" placeholder="Contraseña" />            
        
        <Button type='submit' content="Iniciar sesión" primary fluid /> 
        
    </Form>

  )
}
