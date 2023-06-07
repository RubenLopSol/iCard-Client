import React, {useEffect} from 'react';
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableCategoryAdmin } from '../../components/Admin';
import { useCategory } from "../../hooks"

export function CategoriesAdmin() {

    const { loading, categories, getCategories } = useCategory();
    console.log(categories);
    useEffect(() => {
        async function fetchData() {
          try {
            
            await getCategories();
            
          } catch (error) {
            throw error
          }
        }
        fetchData();
    }, []); 

  return (
    <>

        <HeaderPage 
            title="Categorias" 
            btnTitle="Nueva categoria"

        />
        {loading ? (
            <Loader active inline="centered">
                Cargando...
            </Loader>
        ) : (
            <TableCategoryAdmin 
                categories={categories}
            />
        )}



    </>
  );
} 
