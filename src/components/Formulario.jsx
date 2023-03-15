import { useState } from "react";
import useClima from "../hooks/useClima"

const Formulario = () => {

  const [ alerta, setAlerta ] = useState('');
  const { busqueda, datosBusqueda, consultarClima } = useClima();
  const {ciudad, pais} = busqueda;

  const handleSubmit = e => {
    e.preventDefault();

    if(Object.values(busqueda).includes('')) return setAlerta('Todos los campos son obligatorios');

    consultarClima(busqueda)
    setAlerta('')
  }

  return (
    <div className="contenedor">

      {alerta && <p>{alerta}</p>}

      <form
        onSubmit={handleSubmit}>
        <div className='campo'>
          <label htmlFor='inpCiudad'>Ciudad</label>
          <input 
            type='text'
            id="inpCiudad"
            name="ciudad"
            onChange={datosBusqueda}
            value={ciudad} />
        </div>

        <div className='campo'>
          <label htmlFor='selPais'>Pais</label>
          <select 
            id="selPais"
            name="pais"
            onChange={datosBusqueda}
            value={pais} >

            <option value=''>Seleccione un país</option>
            <option value='US'>Estados Unidos</option>
            <option value='MX'>Mexico</option>
            <option value='AR'>Argentina</option>
            <option value='CO'>Colombia</option>
            <option value='CR'>Costa Rica</option>
            <option value='ES'>España</option>
            <option value='PE'>Perú</option>

          </select>
        </div>

        <input 
          type='submit' 
          value='Consultar clima'/>
      </form>
    </div>
  )
}

export default Formulario