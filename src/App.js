import React, { Fragment, useEffect, useState } from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';




function App() {

  // state del formulario
  const [ busqueda, guardarBusqueda ] = useState({
      ciudad: '',
      pais: ''
  })

  const [consultar, guardarConsultar] = useState(false)
  const [ resultado, guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {

    const consultarAPI = async () => {

        if(consultar) {

          const appId = '3e5bd6c16112a1b8d53898b3cabb0af8';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
    
          guardarResultado(resultado)
          guardarConsultar(false)

          // detecta si los resultados fueron correctos

          if(resultado.cod === '404') {
            guardarError(true)
          }else {
            guardarError(false)
          }
        }
    }

    consultarAPI()
    // eslint-disable-next-line
  }, [consultar])

  // carga condicional de componentes
  // verificar si hay error o no y mostrar en el html el componente
  let componente;
  if(error) {
    componente = <Error mensaje='No hay resultados' />
  }else {
    componente =  <Clima resultado={resultado}/>
  }

  return (
    <Fragment>

      <Header 
        titulo='Clima React App'
      />

      <div className='contenedor-form' >
        <div className='container' >
            <div className="row">
              <div className="col m6 s12">

                <Formulario 
                    busqueda={busqueda}
                    guardarBusqueda={guardarBusqueda}
                    guardarConsultar={guardarConsultar}
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
