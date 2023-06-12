import React, { useState, useEffect, useCallback } from 'react'
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react"
import { map } from "lodash";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDropzone } from "react-dropzone"
import { useCategory } from "../../../../hooks"
import "./AddEditProductForm.scss"


export function AddEditProductForm() {

  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(null)
  const { categories, getCategories } = useCategory();

  useEffect(() => {
    async function fetchData() {
      await getCategories();
    }
    fetchData();
  }, []);

  useEffect(() => {
    setCategoriesFormat( formatDropdownData(categories) )
  }, [categories])

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validationOnChange: false,
    onSubmit: (formValue) => {
      console.log('Formulario enviado');
      console.log(formValue);
    },
  })

  const onDrop = useCallback( async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage( URL.createObjectURL(file));
  },[])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  })


  

  return (

    <Form className='add-edit-product-form' onSubmit={ formik.handleSubmit } >
      <Form.Input 
      name="title" 
      placeholder="Nombre del producto" 
      value={formik.values.title} 
      onChange={formik.handleChange} 
      error={formik.errors.title} 

      />

      <Form.Input 
      type="number" 
      name="price" 
      placeholder="Precio" 
      value={formik.values.price} 
      onChange={formik.handleChange} 
      error={formik.errors.price}

      />

      <Dropdown 
      placeholder='Categoria' 
      fluid 
      selection 
      search 
      options={ categoriesFormat } 
      value= {formik.values.category}
      error= {formik.errors.category}
      onChange={(_,data) => formik.setFieldValue('category', data.value)}

      />

      <div className='add-edit-product-form__active'>
        <Checkbox 
        toggle 
        checked={formik.values.active} 
        onChange={(_,data) => formik.setFieldValue('active', data.checked) } 

        />
        Producto activo
        
      </div>

      <Button type='button' fluid  { ...getRootProps() } color={ formik.errors.image && "red" }>
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input { ...getInputProps() } />
      <Image src={previewImage} />

      <Button type='submit' primary fluid content="Crear" />
      

    </Form>

  )
}


function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(){
  return {
    title: "",
    price:"",
    category: "",
    active: false,
    image:"",

  }
}

function newSchema(){
  return{
    title:Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.mixed().required(true),
  }
}