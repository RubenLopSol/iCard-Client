import React, { useState, useCallback} from 'react';
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik" ;
import * as Yup from "yup";
import { useCategory } from "../../../../hooks/"
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm( props ) {

    const { onClose , onRefetch, category } = props;

    const [previewImage, setPreviewImage] = useState(category?.image || null);
    const { addCategory } = useCategory()


    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        validationOnChange: false,
        onSubmit: async (formValue) => {

            try {
                if(category) console.log('Actualizar categoría')
                else await addCategory(formValue);

                onRefetch();
                onClose();


            } catch (error) {
                
                console.error(error);
            }

        },
    });

    const onDrop = useCallback( async (acceptedFile)=>{
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file );
        setPreviewImage(URL.createObjectURL(file));
        console.log(file)
        
    }, []);

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

            {previewImage ? "Actualizar imagen" : "Subir imagen"}

        </Button>

        <input { ...getInputProps() } />
        <Image src={ previewImage } fluid />

        <Button type='submit' primary fluid content={category ? "Actualizar" : "Crear" } />
    </Form>
  )
}


function initialValues(data) {
    
    return{
        title: data?.title || "",
        image: "",
    };
}

function newSchema() {

    return{
        title:Yup.string().required(true),
        image:Yup.mixed().required(true),
    };
}

function updateSchema() {

    return{
        title:Yup.string().required(true),
        image:Yup.mixed(),
    };
}