import { Link, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import { formatCurrency } from "../helpers";
import { Product } from "../types";
import { deleteProduct } from "../services/ProductService";

export const action = async ({ params: { id } } : ActionFunctionArgs) => {
    if(id !== undefined) {
        await deleteProduct(+id);
        
        return redirect('/');
    }
}

type ProductDetailProps = {
    product: Product
}

const ProductDetail = ({ product } : ProductDetailProps) => {
    const { id, name, price, availability } = product;
    const fetcher = useFetcher();

    return (
        <tr className="border-b ">
            <td className="p-5 text-lg text-gray-800">
                { name }
            </td>

            <td className="p-5 text-lg text-gray-800 text-center">
                { formatCurrency(price) }
            </td>

            <td className="p-5 text-lg text-gray-800 text-center">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={ product.id }
                        className={ `${product.availability ? 'text-black' : 'text-red-600 font-bold'} rounded-lg p-2 text-xs uppercase w-full border border-black-100 cursor-pointer` }
                    >
                        { availability ? 'Disponible' : 'No Disponible' }
                    </button>
                </fetcher.Form>
            </td>

            <td className="p-5 text-lg text-gray-800">
                <div className="flex gap-5 items-center">
                    <Link 
                        to={ `products/${id}/edit` }
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center"
                    >Editar</Link>

                    <Form 
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                    >
                        <input 
                            type="submit" 
                            value="Eliminar"
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}

export default ProductDetail;