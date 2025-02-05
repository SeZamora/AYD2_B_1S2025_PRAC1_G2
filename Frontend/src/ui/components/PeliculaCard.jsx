import { useState, useContext } from 'react';
import ModalAlquiler from "./ModalAlquiler";
import ModalComentarios from "./ModalComentarios";
import { AuthContext } from '../../auth/context/AuthContext';

export default function PeliculaCard({ pelicula }) {
  const [comentarios, setComentarios] = useState([]);
  const { user } = useContext(AuthContext);

  const obtenerComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/peliFlix/comentarios/usuario/${user.id}`);
      if (!response.ok) {
        throw new Error('Error al obtener comentarios');
      }
      const data = await response.json();
      setComentarios(data); // Extraer los comentarios del objeto data
      console.log(data);  
    } catch (error) {
      console.error(error);
      // Manejo de errores
    }
  };
  return (
    <>
      <div className="card bg-100" style={{ width: 300, height:600, position: "relative" }}>
        <img className="card-img-top" style={{ width: 300, height: 400 }} src={pelicula.imagen} alt="Card image cap" />
        <div
          className="text-center link-icons"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "5px 10px",
            borderRadius: "5px"
          }}
          onClick={obtenerComentarios}
          data-bs-toggle="modal"
          data-bs-target={`#comentariosPelicula${pelicula.id_pelicula}`}
        >
          <i className="fa-solid fa-comments icon-blue"></i>
          <p><b>Comentarios</b></p>
        
        </div>
        <div className="card-body">
          <h3 className="card-title text-100">{pelicula.titulo}</h3>
          <h6 className="card-subtitle mb-2 text-muted">Genero: {pelicula.genero}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Sinopsis: {pelicula.sinopsis}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Duración: {pelicula.duracion}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Director: {pelicula.director}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Año de estreno: {pelicula.anioEstreno}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Precio de alquiler: {pelicula.precioAlquiler}</h6>
          <div
            className="text-center link-icons"
            data-bs-toggle="modal"
            data-bs-target={`#alquilarPelicula${pelicula.id_pelicula}`}
          >
            <i className="fa-solid fa-cart-plus icon-green"></i>
            <p><b>Alquilar</b></p>
          </div>
        </div>
      </div>
      <ModalAlquiler titulo={pelicula.titulo} id_pelicula={pelicula.id_pelicula} idModal={`alquilarPelicula${pelicula.id_pelicula}`} />
      <ModalComentarios comentarios={{comentarios}} id_pelicula={pelicula.id_pelicula} idModal={`comentariosPelicula${pelicula.id_pelicula}`} />
    </>
  )
}