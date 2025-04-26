import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './VistaProducto.css';

function VistaProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [error, setError] = useState(null);
  const [comprado, setComprado] = useState(false);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((item) => item.id === parseInt(id));
        if (encontrado) {
          setProducto(encontrado);
        } else {
          setError("Producto no encontrado.");
        }
      })
      .catch((err) => {
        console.error("Error al cargar el producto:", err);
        setError("Error al cargar el producto.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  const imagenes = [producto.imagen1, producto.imagen2, producto.imagen3];

  const manejarCompra = () => {
    setComprado(true);
  };

  return (
    <div className="vista-producto">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </button>

      <div className="marco-producto">
        <div className="lado-izquierdo">
          <img
            src={imagenes[imagenActual]}
            alt="Producto"
            className="imagen-grande"
            onClick={() =>
              setImagenActual((imagenActual + 1) % imagenes.length)
            }
          />
        </div>

        <div className="lado-derecho">
          <h2>{producto.titulo}</h2>
          <p>{producto.descripcion}</p>
          <p className="precio">$ {producto.precio.toLocaleString()}</p>
          <button
            className={`boton-comprar ${comprado ? 'comprado' : ''}`}
            onClick={manejarCompra}
            disabled={comprado}
          >
            {comprado ? 'COMPRADO' : 'COMPRAR'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VistaProducto;
