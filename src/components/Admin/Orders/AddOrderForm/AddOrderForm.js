import React, { useState, useEffect } from 'react'
import { Form, Image, Button, Dropdown } from "semantic-ui-react"
import { map } from "lodash"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useProduct } from "../../../../hooks"
import "./AddOrderForm.scss"

export function AddOrderForm(props) {

  const { idTable, openCloseModal} = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const { products, getProducts} = useProduct();


  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    setProductsFormat(formatDropdownData(products))
  }, [products]);


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validationOnChange: false,
    onSubmit: async (formValues) => {
      console.log("Creando pedidos");
      console.log(formValues);
    }
  })
  

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit} >

        <Dropdown 
        placeholder="Productos" 
        fluid 
        selection 
        search 
        options={productsFormat}
        value={null} 
        onChange={(_, data) => formik.setFieldValue("products", [...formik.values.products, data.value, ])}

        />

        <div className="add-orde-form__list" >
          {/* {For de productos seleccionados} */}
        </div>

        <Button type="submit" primary fluid content="Añadir productos a la mesa"  />


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

function initialValues() {

  return{
    products: [],
  }
}

function validationSchema() {

  return {
    products: Yup.array().required(true),
  }
}