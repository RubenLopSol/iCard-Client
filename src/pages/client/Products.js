import React, {useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";


export function Products() {

    const { tableNumber, idCategory } = useParams();
    const { loading, products, getProductsByCategory } = useProduct();


    useEffect(() => {
      getProductsByCategory(idCategory);  
    }, [idCategory]);
    

  return (
    <div>
        <Link to={`/client/${tableNumber}`}>Back</Link>

        {loading ? <p>Cargando...</p> : <p>Lista de productos</p> }
    </div>
  )
}
