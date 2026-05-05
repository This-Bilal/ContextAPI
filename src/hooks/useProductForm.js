import { useState } from "react";

const DEFAULT_FORM = {
    title: '',
    decription: '',
    price: '',
    images: [],
}


const useProductForm = (initialValues = DEFAULT_FORM) => {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleImageChange = (index, value) => {
    setFormData((prev) => {
        const updated = [prev.images]
        updated[index] = value
        return {...prev, images: updated}
    })
  }

  const addImage = () => setFormData((prev) => ({...prev, images: [...prev.images, '']}))

  const removeImage = (index) => 
    setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_,i) => i !== index)
    }))

  const resetForm = () => setFormData(DEFAULT_FORM)

  return {formData, handleImageChange, addImage, removeImage, handleChange, setFormData, resetForm}
}

export default useProductForm