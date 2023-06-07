import React, { useState, useCallback} from 'react';
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone"
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm() {

    const [previewImg, setPreviewImg] = useState(null);

    const onDrop = useCallback((acceptedFile)=>{
        const file = acceptedFile[0];
        setPreviewImg(URL.createObjectURL(file))
        console.log(file)
        
    },[]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png', 
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

  return (

    <Form className='add-edit-category-form'>
        <Form.Input name='title' placeholder='Nombre de la categoria' />

        <Button type='button' fluid  {...getRootProps()}>
            Subir imagen
        </Button>
        <input { ...getInputProps() } />
        <Image src={ previewImg } fluid />

        <Button type='submit' primary fluid content='Crear' />
    </Form>
  )
}
