import { useState, useEffect, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from '../../auth/context/AuthContext';

export default function ModalComentarios({ comentarios, id_pelicula, idModal }) {

  const [comments, setComentarios] = useState([]);
  const { user } = useContext(AuthContext);
  const { comentario, onInputChange } = useForm({ comentario: '' });

  const onAddComentario = async () => {
    console.log(comentario, user.id, id_pelicula);
    if (comentario.trim() === '') {
      alert('El comentario no puede estar vacio.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/peliFlix/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: user.id,
          idPelicula: id_pelicula,
          comentario: comentario
        }),
      });
      const data = await response.json();
      alert('Comentario enviado con exito!');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al enviar comentario');
    }
    onInputChange({ target: { name: 'comentario', value: '' } });
  }

  const onVerComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/peliFlix/comentarios/${user.id}/${id_pelicula}`);
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
  }

  const onDeleteComentario = async (idComentario) => {
    console.log("ID del comentario a eliminar:", idComentario);
    try {
      const response = await fetch(`http://localhost:3000/peliFlix/comentarios/${idComentario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      alert('Comentario eliminado con exito!');
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      alert('Error al eliminar comentario');
    }
  }

  return (
    <div className="modal fade" id={idModal} tabIndex="-1" aria-labelledby={`${idModal}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${idModal}Label`}>Comentarios</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <label className="form-label" htmlFor="comentario">Escriba un comentario: </label>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control"
                  name="comentario"
                  value={comentario}
                  onChange={onInputChange}
                />
              </div>
            </form>
            <button onClick={onAddComentario} className="btn btn-primary btn-block mb-4">
              Enviar
            </button>

            <h5>Comentarios:</h5>
            <button onClick={onVerComentarios} className="btn btn-primary btn-block mb-4">
              Ver comentarios
            </button>
            {comments.map((comentario) => (
              <div key={comentario.id_comentario} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{comentario.comentario}</h5>
                  <button onClick={() => onDeleteComentario(comentario.id_comentario)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}