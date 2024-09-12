import { DraftProductSchema, Product, ProductSchema, productsSchema } from '../types';
import { safeParse } from 'valibot';
import axios from 'axios';

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
         
            await axios.post(url, result.output);

            return;
        }

        throw new Error('Datos no válidos');
    } catch (error) {
        console.log(error);
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data: { data: products } } = await axios(url);

        const result = safeParse(productsSchema, products);

        if(result.success) return result.output

        throw new Error('Hubo un error...')
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data: { data: product } } = await axios(url);

        const result = safeParse(ProductSchema, product);

        if(result.success) return result.output

        throw new Error('Hubo un error...')
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id: Product['id'], data: ProductData) => {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: data.availability === 'true'
        });

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            
            await axios.put(url, result.output)

            return;
        }

        throw new Error('Hubo un error...');
    } catch (error) {
        console.log(error);
    }
}

export const updateProductAvailability = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        
        await axios.patch(url);

        return;
    } catch (error) {
        console.log(error);
    }

    throw new Error('Hubo un error...');
}

export const deleteProduct = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}