import { useState, createContext } from "react"
import axios from "axios";

const ClimaContext = createContext();

const ClimaProvider = ({children}) => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [ resultado, setResultado ] = useState({});
  const [ hayResultado, setHayResultado ] = useState(false);

  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }
  const [ cargando, setCargando ] = useState(false);

  const consultarClima = async datos => {
    
    setCargando(true);
    setHayResultado(false);

    try {
      const {ciudad, pais} = datos;

      const appId = import.meta.env.VITE_API_KEY;

      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;
      const { data: dataGeo } = await axios(url);
      const { lat, lon } = dataGeo[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: dataClima } = await axios(urlClima);
      console.log(dataClima);

      setResultado(dataClima);
      setHayResultado(true);
      
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }

  }

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        cargando,
        hayResultado
      }}>
      {children}
    </ClimaContext.Provider>
  )
}

export { ClimaProvider }
export default ClimaContext