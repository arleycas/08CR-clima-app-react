import Formulario from "./Formulario"
import Resultado from "./Resultado"
import useClima from "../hooks/useClima"
import Spinner from "./Spinner"

const AppClima = () => {

  const { resultado, cargando, hayResultado } = useClima();

  return (
    <>
      <main className="dos-columnas">
        <Formulario />

        {
          cargando ? <Spinner /> : 
          hayResultado ? <Resultado /> : <p style={{textAlign: 'center', fontWeight: 'bold'}}>No hay resultados </p>
        }
      </main>
    </>
  )
}

export default AppClima