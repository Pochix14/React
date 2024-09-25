import { useEffect, useState, useMemo } from "react"

import { db } from '../data/db'

const useCart = () => {
    //Se hace arrow function para ver si en localStorage existe algo, si es asi se obtiene el valor y se setea de manera inicial
  //en el state de cart, si no, setea un []
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //State
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFronCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity +1,
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

    //State derivado
    //Se usa useMemo para obligar a hacer el render al cambiar cart, si no cambia, no se renderiza (lo cual hace sin utilizar useMemo)
    //al llamar la variable de useMemo, no hace falta ponerle parentesis (si no, se carga la pantalla en blanco)
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    //La funcion itera por el carrito, obtiene la cantidad y multiplica por el precio, lo va sumando al total, que inicia en 0
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFronCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart