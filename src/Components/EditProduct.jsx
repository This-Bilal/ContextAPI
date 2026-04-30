import React, { useEffect, useState } from 'react'
import { useProduct } from '../Context-API/ProductContext'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
    const {loading, editProduct, setEditing, editing, products} = useProduct()

    const {id} = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: []
    })

    useEffect(() => {
        const existingProduct = products.find(p => p.id === Number(id))

        if (existingProduct) {
            setProduct(existingProduct)
        }
    }, [id, products])

    const handleSubmit = async (e) => {
        e.preventDafault()

        const editedProduct = {...product, price: Number(product.price), images: [product.image]}
        await editProduct(editedProduct)

        navigate('/')
    }

    const handleChange = (e) => {
            setProduct({...product, [e.target.name] : [e.target.value]})
        }
  return (
    <div className=' max-w-3xl mx-auto p-4'>
        <h2 className=' text-2xl font-bold mb-6 text-center'>Edit Product</h2>

        <form onSubmit={handleSubmit}>
            <input type="text"
            name='title' 
            placeholder='Title'
            value={product.title}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

             <input type="text"
            name='description' 
            placeholder='Description'
            value={product.description}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

             <input type="text"
            name='price' 
            placeholder='Price'
            value={product.price}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

             <input type="text"
            name='image' 
            placeholder='Image url'
            value={product.image}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />
        </form>

        <button type='submit' disabled={loading} className=' w-full py-2 bg-green-500 text-white rounded hover:bg-green-600'>
            {loading ? 'Editing...' : 'Edit Product'}
        </button>
    </div>
  )
}

export default EditProduct