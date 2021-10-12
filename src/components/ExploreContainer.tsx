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
  nombre: string
  apellido: string
  fecha_nacimiento: string
}


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const [usuarios, setUsuarios] = React.useState<Usuario[]>([])

  const getPosts = async () => {
    try {
      const response = await fetch("https://www.mockachino.com/cfc4d7cc-28e8-40/users")
      console.log("llamada");
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      console.log(json.users)

      setUsuarios(json.users)
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
        <IonButton onClick={getPosts}>Get</IonButton>
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
          <IonRow key={usuario.nombre}>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.nombre}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.apellido}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {usuario.fecha_nacimiento}
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
