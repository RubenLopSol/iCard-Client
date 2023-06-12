import React from 'react'
import { Form, Button} from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {useTable} from "../../../../hooks"
import "./AddEditTableForm.scss"

export function AddEditTableForm(props) {

    const { onClose, onRefetch }= props;
    const { addTable } = useTable()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            await addTable(formValue);

            onRefetch();
            onClose();
        },
    })

  return (
    
    <Form className='add-edit-table-form' onSubmit={formik.handleSubmit} >
        <Form.Input 
        name='number' 
        type='number' 
        placeholder="Numero de mesa" 
        value={formik.values.number}  
        onChange={formik.handleChange}
        error={formik.errors.number}    
        />

        <Button type='submit' primary fluid content='Crear' />
    </Form>
  )
}


function initialValues(){
    return {
        number: "",
    };
}

function validationSchema() {
    return{
        number: Yup.number().required(true),
    };
}