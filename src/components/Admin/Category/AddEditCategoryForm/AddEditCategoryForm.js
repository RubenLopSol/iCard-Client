import React from 'react';
import { Form, Image, Button } from "semantic-ui-react";
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm() {
  return (

    <Form className='add-edit-category-form'>
        <Form.Input name='title' placeholder='Nombre de la categoria' />

        <Button type='button' fluid >
            Subir imagen
        </Button>

        <Button type='submit' primary fluid content='Crear' />
    </Form>
  )
}
