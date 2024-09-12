import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateProductAvailability } from '../services/ProductService';
import { useMemo } from 'react';
import { Product } from '../types';
import ProductDetail from '../components/ProductDetail';

export const loader = async () => {
    return await getProducts();
}

export const action = async ({ request } : ActionFunctionArgs) => {
    const { id } = Object.fromEntries(await request.formData());
    
    await updateProductAvailability(+id);

    return {};
}

const Products = () => {
    const products = useLoaderData() as Product[];

    const isEmptyProducts = useMemo(() => products.length, [ products ]);

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-600'>Productos</h2>

                <Link to='/products/new'
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700'>Agregar producto</Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            isEmptyProducts && (
                                products.map(productState => (
                                    <ProductDetail
                                        key={ productState.id } 
                                        product={ productState }
                                    />
                                ))

                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products
