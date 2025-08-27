// import React, { useState } from 'react'
// import api from '../../api/axios'

// function Addproduct() {

//     const [formdata, setformdata] = useState({
//         name: "",
//         description: "",
//         price: "",
//         selling_price: "",
//         stock: 0,
//         category: "",
//         image: "",
//     })

//     const [notes, setnotes] = useState({
//         top: "",
//         middle: "",
//         base: ""
//     })

//     const [details, setdetails] = useState({
//         sizeMl: "",
//         concentration: "",
//         longevity: "",
//         sillage: "",
//         season: "",
//         occasion: ""
//     })

//     function handleformdata(e) {
//         const { id, value } = e.target
//         setformdata((prev) => ({ ...prev, [id]: value }))
//     }

//     function handlenotechange(type, value) {
//         setnotes({ ...notes, [type]: value })
//     }

//     function notesconvert() {
//         const finalnotes = {
//             top: notes.top.split(",").map(n => n.trim()).filter(n => n),
//             middle: notes.middle.split(",").map(n => n.trim()).filter(n => n),
//             base: notes.base.split(",").map(n => n.trim()).filter(n => n)
//         }
//         return finalnotes;
//     }



//     function handledetailschange(type, value) {
//         setdetails({ ...details, [type]: value })
//     }

//     function handlesubmin(e) {
//         e.preventDefault()
//         const data = new FormData();

//         data.append("name", formdata.name);
//         data.append("description", formdata.description);
//         data.append("price", formdata.price);
//         data.append("selling_price", formdata.selling_price);
//         data.append("stock", formdata.stock);
//         data.append("category", formdata.category);
//         data.append("image", formdata.image);
//         data.append("notes", JSON.stringify(notesconvert()));
//         data.append("details", JSON.stringify(details));

//         try {
//             api.post("/products/addproduct", data, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             })
//         } catch (error) {
//             console.error("Error adding product:", error);
//         }

//     }
//     return (
//         <div>
//             <form action="" onSubmit={handlesubmin}>

//                 <input
//                     type="text"
//                     id='name'
//                     required
//                     value={formdata.name}
//                     onChange={handleformdata}
//                     placeholder='enter product name'
//                 />
//                 <textarea
//                     name="description"
//                     id="description"
//                     value={formdata.description}
//                     onChange={handleformdata}
//                     placeholder='enter product descriptin'
//                     required
//                 />
//                 <input
//                     type="number"
//                     id='price'
//                     value={formdata.price}
//                     onChange={handleformdata}
//                     placeholder='price'
//                     required
//                 />
//                 <input
//                     type="number"
//                     id='selling_price'
//                     value={formdata.selling_price}
//                     onChange={handleformdata}
//                     placeholder='selling price'
//                     required
//                 />
//                 <input
//                     type="file"
//                     id='image'
//                     accept='image/*'
//                     onChange={(e) => setformdata({ ...formdata, image: e.target.files[0] })}
//                     placeholder='product image'
//                     required
//                 />
//                 <input
//                     type="number"
//                     id='stock'

//                     value={formdata.stock}
//                     onChange={handleformdata}
//                     placeholder='product stock'
//                     required
//                 />

//                 {["top", "middle", "base"].map((items) => (
//                     <div key={items}>
//                         <label className="font-bold capitalize">
//                             {items} Notes:
//                         </label>

//                         <input
//                             type="text"
//                             placeholder={`enter ${items} notes (comma separated)`}
//                             value={notes[items]}
//                             onChange={(e) => handlenotechange(items, e.target.value)}
//                         />
//                     </div>
//                 ))}

//                 {Object.keys(details).map((items) => (
//                     <div key={items}>
//                         <input
//                             type="text"
//                             placeholder={`enter perfume ${items}`}
//                             value={details[items]}
//                             onChange={(e) => (handledetailschange(items, e.target.value))}
//                         />
//                     </div>
//                 ))}

//                 <select name="category" id="category" value={formdata.category} onChange={handleformdata}>
//                     <option value="male">male</option>
//                     <option value="woman">woman</option>
//                     <option value="unisex">unisex</option>
//                 </select>

//                 <button type='submit'>add product</button>

//             </form>
//         </div>
//     )
// }

// export default Addproduct
import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    const [formdata, setformdata] = useState({
        name: "",
        description: "",
        price: "",
        selling_price: "",
        stock: 0,
        category: "",
        image: "",
    });

    const [notes, setnotes] = useState({
        top: "",
        middle: "",
        base: "",
    });

    const [details, setdetails] = useState({
        sizeMl: "",
        concentration: "",
        longevity: "",
        sillage: "",
        season: "",
        occasion: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const usenavigate = useNavigate()
    function handleformdata(e) {
        const { id, value } = e.target;
        setformdata((prev) => ({ ...prev, [id]: value }));
    }

    function handlenotechange(type, value) {
        setnotes({ ...notes, [type]: value });
    }

    function notesconvert() {
        const finalnotes = {
            top: notes.top.split(",").map((n) => n.trim()).filter((n) => n),
            middle: notes.middle.split(",").map((n) => n.trim()).filter((n) => n),
            base: notes.base.split(",").map((n) => n.trim()).filter((n) => n),
        };
        return finalnotes;
    }

    function handledetailschange(type, value) {
        setdetails({ ...details, [type]: value });
    }

    function handlesubmin(e) {
        e.preventDefault();
        const data = new FormData();

        data.append("name", formdata.name);
        data.append("description", formdata.description);
        data.append("price", formdata.price);
        data.append("selling_price", formdata.selling_price);
        data.append("stock", formdata.stock);
        data.append("category", formdata.category);
        data.append("image", formdata.image);
        data.append("notes", JSON.stringify(notesconvert()));
        data.append("details", JSON.stringify(details));

        try {
            api.post("/products/addproduct", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Product added successfully!");
            usenavigate("/admin")

        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <form
                onSubmit={handlesubmin}
                className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Add New Product
                </h2>

                {/* Product Image Upload + Preview */}
                <div>
                    <label className="block font-semibold mb-2">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setformdata({ ...formdata, image: file });
                            setImagePreview(URL.createObjectURL(file));
                        }}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-4 w-full md:w-64 h-64 object-cover rounded-xl shadow-md"
                        />
                    )}
                </div>

                {/* Product Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        id="name"
                        required
                        value={formdata.name}
                        onChange={handleformdata}
                        placeholder="Product Name"
                        className="border rounded-lg px-3 py-2 w-full"
                    />
                    <select
                        id="category"
                        value={formdata.category}
                        onChange={handleformdata}
                        className="border rounded-lg px-3 py-2 w-full"
                    >
                        <option value="">Select Category</option>
                        <option value="male">Male</option>
                        <option value="woman">Woman</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <textarea
                    id="description"
                    value={formdata.description}
                    onChange={handleformdata}
                    placeholder="Product Description"
                    className="border rounded-lg px-3 py-2 w-full"
                    required
                />

                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="number"
                        id="price"
                        value={formdata.price}
                        onChange={handleformdata}
                        placeholder="Original Price"
                        className="border rounded-lg px-3 py-2"
                        required
                    />
                    <input
                        type="number"
                        id="selling_price"
                        value={formdata.selling_price}
                        onChange={handleformdata}
                        placeholder="Selling Price"
                        className="border rounded-lg px-3 py-2"
                        required
                    />
                    <input
                        type="number"
                        id="stock"
                        value={formdata.stock}
                        onChange={handleformdata}
                        placeholder="Stock"
                        className="border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {/* Notes Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Perfume Notes</h3>
                    {["top", "middle", "base"].map((items) => (
                        <div key={items}>
                            <input
                                type="text"
                                placeholder={`Enter ${items} notes (comma separated)`}
                                value={notes[items]}
                                onChange={(e) => handlenotechange(items, e.target.value)}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Details Section */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Perfume Details</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {Object.keys(details).map((items) => (
                            <input
                                key={items}
                                type="text"
                                placeholder={`Enter perfume ${items}`}
                                value={details[items]}
                                onChange={(e) => handledetailschange(items, e.target.value)}
                                className="border rounded-lg px-3 py-2"
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className=" bg-gradient-to-r from-purple-600 to-amber-500 rounded-r-lg hover:from-purple-700 hover:to-amber-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default Addproduct;
