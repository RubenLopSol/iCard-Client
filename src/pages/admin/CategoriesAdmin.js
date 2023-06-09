import React, {useEffect, useState} from 'react';
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableCategoryAdmin, AddEditCategoryForm } from '../../components/Admin';
import { useCategory } from "../../hooks"
import { ModalBasic } from "../../components/Common"

export function CategoriesAdmin() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false)

  const { loading, categories, getCategories, deleteCategory } = useCategory();
    
    useEffect(() => {
        async function fetchData() {
          try {
            
            await getCategories();
            
          } catch (error) {
            throw error
          }
        }
        fetchData();
  
    }, [ refetch ]); 

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva categoria");
    setContentModal( <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} /> );
    openCloseModal()
  }

  const updateCategory = (data) => {

    setTitleModal("Actualizar categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data} />
    )
    openCloseModal();

  }

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`Eliminar categoria ${data.title}?`)

    if (result) {
      try {
        await deleteCategory(data.id);
        onRefetch();
        
      } catch (error) {
        console.log( error );
        
      }

    }
  };

  return (
    <>

        <HeaderPage 
            title="Categorias" 
            btnTitle="Nueva categoria"
            btnClick={ addCategory }

        />
        {loading ? (
            <Loader active inline="centered">
                Cargando...
            </Loader>
        ) : (
            <TableCategoryAdmin 
                categories={ categories }
                updateCategory={updateCategory}
                onDeleteCategory={onDeleteCategory}
            />
        )}

        <ModalBasic 
          show={ showModal }
          onClose={ openCloseModal }
          title={ titleModal }
          children={ contentModal }
        />



    </>
  );
} 
