import React from 'react'
import { Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./ListProducts.scss"

export function ListProducts(props) {

    const { products } = props;

    const addCart = (product) => {
        console.log("Producto añadido", product.title)
    }

  return (
    <div className='list-product' >
        {map(products, (product) => (
            <div key={product.id} className='list-product__product'>
                <div>
                    <Image src={product.image} />
                    <span>{product.title}</span>
                </div>

                <Button prymary icon onClick={() =>addCart(product)} >
                    <Icon name='add' />
                </Button>

            </div>
        ))}
    </div>
  )
}
