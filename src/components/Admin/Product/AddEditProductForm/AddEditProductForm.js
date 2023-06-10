import React from 'react'
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react"
import "./AddEditProductForm.scss"

export function AddEditProductForm() {
  return (

    <Form className='add-edit-product-form'>
      <Form.Input name="title" placeholder="Nombre del producto" />
      <Form.Input type="number" name="price" placeholder="Precio" />
      <Dropdown placeholder='Categoria' fluid selection search />

      <div className='add-edit-product-form__active'>
        <Checkbox toggle />
        Producto activo
        
      </div>

      <Button type='button' fluid >
        Subir imagen
      </Button>

      <Button type='submit' primary fluid content="Crear" />
      

    </Form>

  )
}
