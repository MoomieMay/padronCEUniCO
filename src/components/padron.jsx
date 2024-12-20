import { useState, useEffect } from 'react';
import Papa from 'papaparse';

function Padron() {
    const [dni, setDni] = useState('');
    const [padron, setPadron] = useState([]);
    const [resultados, setResultados] = useState(null);
    const [error, setError] = useState(null);

    // Cargar el padrón al inicio
    useEffect(() => {
        // Carga del padrón al inicio
        fetch('/data/padron.csv') // Asegúrate de que esta ruta sea correcta
            .then((response) => response.text())
            .then((data) => {
                Papa.parse(data, {
                    header: true,
                    complete: (result) => {
                        setPadron(result.data);
                    },
                    error: (error) => {
                        console.error('Error al leer el CSV:', error);
                    }
                });
            })
            .catch((error) => console.error('Error al cargar el archivo:', error));
    }, []);


    // Función para buscar en el padrón
    const buscarEnPadron = () => {
        const dniBuscado = dni.trim(); // Eliminamos espacios adicionales del DNI

        // Buscar en el padrón por documento
        const resultado = padron.find((fila) => {
            return fila['DOCUMENTO'] && fila['DOCUMENTO'].trim() === dniBuscado;
        });

        if (resultado) {
            setResultados(resultado); // Si se encuentra, mostramos los resultados
            setError(null);
        } else {
            setResultados(null); // Si no se encuentra, mostramos un mensaje de error

            setError('Usted no se encuentra en el padrón');
        }
    };

    // Función para determinar el número de mesa según la primera letra del apellido
    const obtenerMesa = (apellido) => {
        if (!apellido) return ''; // Verifica que el apellido esté definido
        const primeraLetra = apellido.trim().charAt(0).toUpperCase();

        if (primeraLetra >= 'A' && primeraLetra <= 'F') return 1;
        if (primeraLetra >= 'G' && primeraLetra <= 'O') return 2;
        if (primeraLetra >= 'P' && primeraLetra <= 'Z') return 3;

        return ''; // En caso de que no entre en los rangos
    };

    return (
        <div className="form">
            {/* Encabezado */}
            <div className="container text-start">
                <div className="row">
                    <p className='requisitos'>Consideraciones establecidas en el Cap. 5 - Estatuto del Centro de Estudiantes de UUAA Caleta Olivia</p>
                    <ul className="ps-3 ">
                        <li>
                            <strong>Art 87:</strong> La votación es libre, obligatoria, secreta, personal y directa.
                        </li>
                        <li>
                            <strong>Art 91:</strong> Serán anulados todos los votos cuyos sobres presenten leyendas o inscripciones que no correspondan en el exterior del mismo
                            o de la boleta sufragada. Se anularán los votos cuando en los sobres se incluya más de una boleta. Los votos en blanco
                            serán considerados como tales y volcados al acta correspondiente.
                        </li>
                        <li>
                            <strong>Art 92:</strong> Los estudiantes que concurrieran a votar deberán hacerlo con la Libreta Estudiantil o DNI.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card text-start">
                <h3 className="card-header">ELECCIONES 2024</h3>
                <div className="card-body">
                    <p className=''><strong>FECHA:</strong> 07/11/2024</p>
                    <p className=''><strong>HORARIO:</strong> 10 hs a 18 hs</p>
                    <p className=''><strong>LUGAR:</strong> Edificio de Aulas (Edificio 4)</p>
                    <br></br>
                    <h5 className='header-title'><strong>MESAS</strong></h5>
                    <ol className="olcards row">
                        <li className='licards col-12 col-lg-4 col-md-4'>
                            <div className="content">
                                <div className="title"> A - F</div>
                                <div className="text">Aula 1.</div>
                            </div>
                        </li>
                        <li className='licards col-12 col-lg-4 col-md-4'>
                            <div className="content">
                                <div className="title"> G - O</div>
                                <div className="text">Aula 2.</div>
                            </div>
                        </li>
                        <li className='licards col-12 col-lg-4 col-md-4'>
                            <div className="content">
                                <div className="title"> P - Z</div>
                                <div className="text">Aula 4.</div>
                            </div>
                        </li>
                    </ol>

                </div>
            </div>

            {/* Búsqueda del Padrón */}
            <div className="card mx-auto my-4" style={{ maxWidth: '600px' }}>
                <h5 className="card-header text-center fs-6">Búsqueda en el Padrón</h5>
                <div className="card-body px-3 py-2">

                    <h5 className="card-title fw-semibold text-start py-2">&nbsp;Ingrese su número de DNI sin puntos</h5>
                    {/* Input y botón en la misma fila */}
                    <div className="row justify-content-star mb-3">
                        <div className="col-md-12 d-flex justify-content-between">
                            <input
                                type="text"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                placeholder="Número de DNI"
                                className="form-control input-no-radius"
                                style={{ maxWidth: '100%' }}
                            />
                            <button className="btn btn-secondary px-4" onClick={buscarEnPadron}>Buscar</button>
                        </div>
                    </div>

                    {/* Resultados en una fila separada */}
                    {resultados && (
                        <div className="row mt-4">
                            <div className="col-12 text-start ps-4">
                                <h2 className="fs-5 my-3 header-title">Ud vota en MESA {obtenerMesa(resultados['APELLIDO'])}</h2>
                                <br></br>
                                <h3 hidden className="fs-5 my-3 header-title">Datos del Padrón:</h3>
                                <p hidden><strong>Documento:</strong> {resultados['DOCUMENTO']}</p>
                                <p><strong>Apellido:</strong> {resultados['APELLIDO']}</p>
                                <p><strong>Nombre:</strong> {resultados['NOMBRES']}</p>
                                <p><strong>Carrera:</strong> {resultados['NOMBRE DE CARRERA']}</p>
                                <p><strong>Legajo:</strong> {resultados['LEGAJO']}</p>

                                <p hidden className='fs-6'>Para más información comunicate con <a href="mailto:juntalectoral.ceuaco@gmail.com">juntalectoral.ceuaco@gmail.com</a></p>
                            </div>
                        </div>
                    )}

                    {error && <div className="row mt-4">
                        <p className="text-danger fw-bolder">{error}</p>
                        <p className='fs-6'>
                            Para más información comunicate con{' '}
                            <a href="mailto:juntalectoral.ceuaco@gmail.com">juntalectoral.ceuaco@gmail.com</a>
                        </p>
                    </div>}
                </div>
            </div>




        </div>
    );
}

export default Padron;
