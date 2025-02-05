import { useForm } from "react-hook-form";
import { AuthContext } from '../../auth/context/AuthContext';
import { useContext } from 'react';

export default function  ModalAlquiler ({
    idModal,
    id_pelicula,
    titulo
}){

    const { user } = useContext(AuthContext);

    const onAlquilar = () => {
        fetch(`http://localhost:3000/peliFlix/alquileres`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUsuario: user.id,
                idPelicula: id_pelicula,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert(data.mensaje);
                const modalElement = document.getElementById(idModal);
                const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                } 
            })



    }

    return (
        <div className="modal fade" id={idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Eliminar película {titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Está seguro de alquilar la película {titulo}?</p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={onAlquilar}

                        >Alquilar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}