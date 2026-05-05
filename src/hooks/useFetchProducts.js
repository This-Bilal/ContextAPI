import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get('https://dummyjson.com/products?limit=10&skip=10&select=id,title,price,description,images')

            if(response?.data?.products?.length){
                setProducts(response.data.products)
            }
        } catch (error) {
            setError(error.message || 'Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {products, setProducts, loading, error, refetch: fetchProducts}
}

export default useFetchProducts