type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

type GuitarProps = {
    guitar: Guitar, 
    addToCart: (item: Guitar) => void
}

export default function Guitar ({guitar, addToCart} : GuitarProps) {

    //La funcion se puede poner directamente en el onclick del boton
    //Se puede pasar el carrito de compras, pero en automatico al utilizar un arrow function,
    //se sabe que un parametro que se pasa el es estado previo del state, o sea, el carrito
    /*const handleClick = (guitar) => {
        //setCart([...cart, guitar])
        setCart(prevCart => [...prevCart, guitar]) //Sin la necesidad de pasar el carrito
    }*/


    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                    <p>{guitar.description}</p>
                    <p className="fw-black text-primary fs-3">${guitar.price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(guitar)/*handleClick(guitar)*/}
                    >Agregar al Carrito</button>
                </div>
            </div>
    )
}