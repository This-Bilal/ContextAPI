import axios from 'axios'
import React, {createContext, useContext} from 'react'
import useFetchProducts from '../hooks/useFetchProducts'
import useConfirm from '../hooks/useConfirm'

const ProductContext = createContext()

const ProductProvider = ({children}) => {


    const {
        products,
        setProducts,
        loading,
        error,
        refetch,
    } = useFetchProducts()


    const {
        pendingId: deleteId,
        isOpen: confirmOpen,
        requestConfirm: setDeleteId,
        cancelConfirm
    } = useConfirm()


    const addProduct = async (product) => {
        try {

            const response = await axios.post('https://dummyjson.com/products/add', product)

            const newProduct = response.data 

            if (newProduct && newProduct.id) {
                setProducts((prev) => [...prev, newProduct])
            }
        } catch (error) {
            console.error('AddProduct error', error.message);
        }
    }

    const editProduct = async (product) => {
        
        try {

            const response = await axios.put(`https://dummyjson.com/products/${product.id}`, product)

            const editedProduct = response.data

            const mappedProduct = products.map((product) => product.id === editedProduct.id ? editedProduct : product)

            setProducts(mappedProduct)
        } catch (error) {
            console.error('EditProduct error', error.message);
        }
    }

    const deleteProduct = async (id) => {
        
        try {

            const response = await axios.delete(`https://dummyjson.com/products/${id}`)

            const deletedProduct = response.data

            if (deletedProduct.isDeleted) {
                setProducts((prev) => prev.filter((product) => product.id !== deletedProduct.id))
            }
        } catch (error) {
            console.error('DeleteProduct error', error.message);
        }
    }

  return (
    <ProductContext.Provider value={{
        // data
        products,
        loading,
        error,
        refetch,

        // confirmation dialog
        deleteId,
        confirmOpen,
        setDeleteId,
        cancelConfirm,

        // Operations
        addProduct,
        editProduct,
        deleteProduct
    }}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => {
    return useContext(ProductContext)
}

export default ProductProvider