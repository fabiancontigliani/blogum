import './ExploreContainer.css';


import React from 'react';

import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react"

interface Usuario {
  firstName: string
  lastName: string
  email: string
}


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const [usuarios, setUsuarios] = React.useState<Usuario[]>([])

  const login = async () => {
    
    try {
      const data = {username: "admin", password: "admin", rememberMe: false};

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
      };
      const response = await fetch("http://localhost:8080/api/authenticate",requestOptions)
      console.log("llamada");
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      console.log(json.Usuarios)

      setUsuarios(json.Usuarios)
      console.log("set usuario");
    } catch (error) {
      console.error("falló")
    }
  }



  const getPosts = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYzNTYwMTYwMn0.k-Hg5tu7vh2gGn0J0DnMnLVYCv6mrDM0AGc_I0IFrKGuu3wlvak8vyJ9jFMuuEShjCBqTcfs95rXCDN2PtID1A' }
    };
      //const response = await fetch("http://localhost:8080/api/admin/users?page=0&size=20&sort=id,asc",requestOptions)
      const response = await fetch("https://www.mockachino.com/cfc4d7cc-28e8-40/users",requestOptions)
      
      console.log("llamada");
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      console.log(json.Usuarios)

      setUsuarios(json.Usuarios)
    } catch (error) {
      console.error("falló")
    }
  }

  return (
    <div className="container">
       <div className="ion-padding">
        <h1>Ionic React Rest Example</h1>
      </div>
      <div className="ion-padding">
        <IonButton onClick={getPosts}>Recuperar Usuarios</IonButton>
      </div>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Nombre</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Apellido</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Fecha Nacimiento</IonText>
          </IonCol>
        </IonRow>
        {usuarios.map((usuario) => (
          <IonRow key={usuario.firstName}>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.firstName}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.lastName}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.email}
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
