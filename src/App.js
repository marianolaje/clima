import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header.js';
import Formulario from './components/Formulario.js';
import Clima from './components/Clima.js';
import Error from './components/Error.js';

function App() {
  console.log("Developed by Mariano Laje Arrigoni")
//transladamos el state del formulario aca, y lo pasamos como hooks
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  const {ciudad, pais} = busqueda;

  const [consultar, setConsultar] = useState(false)
  const [informacion, setInformacion] = useState({})
  const [error, setError] = useState(false)

  useEffect(()=>{
    const consultarAPI = async() => {
      //https://api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
      if(consultar){
        const apiKey = 'a6252b4d80f568869b69777b2a1c652c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setInformacion(resultado)
        setConsultar(false)

        //detectar codigo de error;
        if(informacion.cod === '404'){
          setError(true);
        } else {
          setError(false)
        }
//commit
      }
    }
    consultarAPI();
  }, [consultar, ciudad, pais, informacion]);

  let componente;
  if(error){
    componente = <Error mensaje="There is no match"/>
  } else {
    componente = <Clima informacion={informacion} />
  }

  return (
    <Fragment>
      <Header
        titulo='Weather React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
