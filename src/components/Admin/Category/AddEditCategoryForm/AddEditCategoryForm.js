import React, { useState, useCallback} from 'react';
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik" ;
import * as Yup from "yup";
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm() {

    const [previewImg, setPreviewImg] = useState(null);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validationOnChange: false,
        onSubmit: (formValue) => {
            console.log("Formulario enviado");
            console.log(formValue);
        },
    });

    const onDrop = useCallback( async (acceptedFile)=>{
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file );
        setPreviewImg(URL.createObjectURL(file));
        console.log(file)
        
    },[]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png', 
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

  return (

    <Form className='add-edit-category-form' onSubmit={ formik.handleSubmit } >
        <Form.Input 
        name='title' 
        placeholder='Nombre de la categoria' 
        value={formik.values.title} 
        onChange={formik.handleChange}
        error={formik.errors.title}
        />

        <Button 
        type='button' 
        fluid  
        {...getRootProps()} 
        color={formik.errors.image && "red"}
        >

            Subir imagen

        </Button>

        <input { ...getInputProps() } />
        <Image src={ previewImg } fluid />

        <Button type='submit' primary fluid content='Crear' />
    </Form>
  )
}


function initialValues() {
    
    return{
        title:"",
        image:"",
    };
}

function newSchema() {

    return{
        title:Yup.string().required(true),
        image:Yup.string().required(true),
    };
}