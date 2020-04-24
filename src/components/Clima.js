import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({informacion}) => {

  //extraemos los valores
  const {name, main} = informacion;

  if(!name) return null;

  //pasamos de grados kelvin a farenheit
  const kelvin = 273.15;
  const farenheit = parseFloat(main.temp - kelvin, 10).toFixed(2);

  return(
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>The weather of {name} is:</h2>
        <p>{farenheit} <span>&#x2103;</span></p>
      </div>
    </div>
  )

}
Clima.propTypes = {
  informacion: PropTypes.object.isRequired
}

export default Clima;
