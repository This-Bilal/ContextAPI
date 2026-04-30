import axios from 'axios'
import React, { Children, createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

const ProductContext = createContext()

const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        if (loading) return;

        const getProduct = async() => {
            setLoading(true)

            try {
                const response = await axios.get('https://dummyjson.com/products?limit=10&skip=10&select=id,title,price,description,images')

                if (response?.data?.products.length) {
                    setProducts(response.data.products)
                }
            } catch (error) {
                console.error(error.message);
            } finally{
                setLoading(false)
            }
        }
        getProduct()
    }, [])

    const addProduct = async (product) => {
        try {
            setLoading(true)

            const response = await axios.post('https://dummyjson.com/products/add', product)

            const newProduct = response.data 

            if (newProduct && newProduct.id) {
                setProducts((prev) => [...prev, newProduct])
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    const editProduct = async (product) => {
        
        try {
            setLoading(true)

            const response = await axios.put(`https://dummyjson.com/products/${product.id}`, Product)

            const editedProduct = response.data

            const mappedProduct = products.map((product) => product.id === editedProduct.id ? editedProduct : product)

            setProducts(mappedProduct)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    const deleteProduct = async (id) => {
        
        try {
            setLoading(true)

            const response = await axios.delete(`https://dummyjson.com/products${product.id}`)

            const deletedProduct = response.data

            if (deletedProduct.isDeleted) {
                setProducts((prev) => prev.filter((product) => product.id !== deletedProduct.id))
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

  return (
    <ProductContext.Provider value={{addProduct, editProduct, deleteProduct, setDeleteId, setEditing, loading, products, deleteId, editing}}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => {
    return useContext(ProductContext)
}

export default ProductProvider