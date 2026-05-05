import React, { useEffect, useState } from 'react'
import { useProduct } from '../Context-API/ProductContext'
import { useNavigate, useParams } from 'react-router-dom'
import useProductForm from '../hooks/useProductForm'

const EditProduct = () => {
    const {loading, editProduct, products} = useProduct()

    const {id} = useParams()
    const navigate = useNavigate()

        // useProductForm manages all field state and change handling
    const {formData, handleChange, handleImageChange, addImage, removeImage, setFormData} = useProductForm()

    // hydrate from when the matchimg product is found in the context API
    useEffect(() => {
        const existingProduct = products.find(p => p.id === Number(id))

        if (existingProduct) {
            setFormData({
                title: existingProduct.title || '',
                description: existingProduct.description || '',
                price: existingProduct.price || '',
                images: existingProduct.images || [],
            })
        }
    }, [id, products])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const editedProduct = {
            id: Number(id),
            title: formData.title,
            description: formData.description,
            price: formData.price,
            images: formData.images
        }
        
        await editProduct(editedProduct)

        navigate('/')
    }

  return (
    <div className=' max-w-3xl mx-auto p-4'>
        <h2 className=' text-2xl font-bold mb-6 text-center'>Edit Product</h2>

        <form onSubmit={handleSubmit} className=' space-y-4'>
            <input type="text"
            name='title' 
            placeholder='Title'
            value={formData.title}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

             <input type="text"
            name='description' 
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

             <input type="text"
            name='price' 
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            required
            className=' w-full p-2 border rounded'
            />

            {/* Images Array */}
            <div className=' space-y-2'>
                <label className=' block text-sm font-medium text-gray-700'>
                    Image Urls
                </label>
                {formData.images.map((url, index) => (
                    <div key={index} className=' flex gap-2'>
                        <input 
                        type="text"
                        placeholder={`Image URL ${index + 1}`}
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className=' flex-1 p-2 border rounded'
                        />

                        <button
                        type='button'
                        onClick={() => removeImage(index)}
                        className=' px-3 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 text-sm'
                        >
                            Remove
                        </button>
                    </div>
                ))}

                 <button
                        type='button'
                        onClick={addImage}
                        className=' px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 border border-blue-300 text-sm'
                        >
                            Add
                        </button>
            </div>

            <button type='submit' disabled={loading} className=' w-full py-2 bg-green-500 text-white rounded hover:bg-green-600'>
                {loading ? 'Editing...' : 'Edit Product'}
            </button>
        </form>
    </div>
  )
}

export default EditProduct