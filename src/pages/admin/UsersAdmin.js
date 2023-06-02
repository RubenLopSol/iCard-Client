import React, { useState, useEffect} from 'react'
import {Loader} from 'semantic-ui-react'
import {HeaderPage, TableUsers} from "../../components/Admin"
import {ModalBasic} from "../../components/Common"
import {useUser} from "../../hooks"

export function UsersAdmin() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  
  const {loading, users, getUsers} = useUser();


  useEffect(() =>{
    getUsers()
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);
  

  return (
    <>
        <HeaderPage title="Usuarios" btnTitle="Nuevo usuario" btnClick={openCloseModal} />
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <TableUsers users= {users} />
        )}

        <ModalBasic show={ showModal } onClose={ openCloseModal } title="Crear usuario" children={ <h2>Content...</h2> }/>
    </>
  );
}
