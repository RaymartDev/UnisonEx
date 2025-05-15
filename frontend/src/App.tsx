import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [products, setProducts] = useState<{ id: number, name:any, category: any, price: any }[]>([])
  const [newProduct, setNewProduct] = useState({ id: 0, name: '', category: '', price: ''})
  const [editingProduct, setEditingProduct] = useState<{id: number, name: any, category: any, price: any} | null>(null)

  const api = 'http://localhost:5000/api/products'

  useEffect(() => {
    axios.get(api)
        .then(res => {
          setProducts(res.data.products)
        })
        .catch(error => toast.error(error.message))
  }, [])

  const handleAdditionalProduct = async () => {
    try {
      const response = await axios.post(api, newProduct);
      if (response.status >= 200) {
        setProducts([...products, response.data.product]);
        setNewProduct({ id: 0, name: '', category: '', price: '' })
      }
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const handleEditProduct = (product: { id: number, name:any, category: any, price: any } ) => {
    setEditingProduct(product)
    setNewProduct({ id: product.id, name: product.name, category: product.category ,price: product.price })
  }

  const handleUpdateProduct = async() => {
    try {
      console.log(editingProduct)
      const response = await axios.put(`${api}/${editingProduct?.id}`, newProduct);
      const updatedProducts = products.map((product) =>
        product.id === editingProduct?.id ? response.data : product )
      setProducts(updatedProducts)
      setEditingProduct(null)
      setNewProduct({ id: 0, name: '', category: '', price: '' })
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const handleDeleteProduct = async (id:number) => {
    try {
      const response = await axios.delete(`${api}/${id}`)
      if (response.status >= 200) {
        setProducts(products.filter((product) => product.id !== id))
      }
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="container">
      <h2>Product CRUD</h2>

      { /* Product Additional */ }
      <form
          className="form"
      >
        <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <input
            type="text"
            placeholder="Product Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
        />
        <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
        <button type="submit" onClick={editingProduct ? handleUpdateProduct : handleAdditionalProduct}>{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      { /* Table */}
      <table className="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (<>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button className={"edit-btn"} onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className={"delete-btn"} onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            </>)
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default App
