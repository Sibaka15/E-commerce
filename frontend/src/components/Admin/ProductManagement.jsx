import { Link } from "react-router-dom"


const ProductManagement = () => {
    const products = [
        {
            _id: 123456,
            name: 'Shrit',
            price: 110,
            sku:'rvdwjvb'
        }
    ]

    const handleDeleteProduct = (id)=>{
        if(window.confirm('Are you sure want to delete this Product ?')){
            console.log(id);
            
        }
    }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            <div className="overflow-x-auto sm:rounded-lg shadow-md">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">SKU</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ? (
                                products.map((product, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 border-b cursor-pointer">
                                            <th className="px-3 font-medium text-gray-900 whitespace-nowrap py-4"> {product.name}</th>
                                            <th className="px-3 py-4"> {product.price}</th>
                                            <th className="px-3 py-4"> {product.sku}</th>
                                            <th className="px-3 py-4 flex space-x-2"> 
                                                <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-sm text-white px-2 py-1 rounded">Edit</Link>
                                                <button onClick={()=>handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-600 text-sm text-white px-2 py-1 rounded">Delete</button>
                                            </th>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <th className="px-4 py-3 text-center" colSpan={4}>No Product Found</th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement