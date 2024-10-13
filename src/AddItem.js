import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddItem = ({ user }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [datePurchased, setDatePurchased] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the image to Supabase storage if provided
    let imageUrl = null;
    if (image) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from('images')
        .upload(`${user.email}/${image.name}`, image);
      if (imageError) {
        console.error('Error uploading image:', imageError);
      } else {
        imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${user.email}/${image.name}`;
      }
    }

    // Insert item into the database
    const { data, error } = await supabase.from('items').insert([
      {
        name,
        category,
        price,
        date_purchased: datePurchased,
        image_url: imageUrl,
        user_id: user.email,
      },
    ]);
    if (error) {
      console.error('Error adding item:', error);
    } else {
      console.log('Item added:', data);
      setName('');
      setCategory('Electronics');
      setPrice('');
      setDatePurchased('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          className="form-control"
          placeholder="Date Purchased"
          value={datePurchased}
          onChange={(e) => setDatePurchased(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control-file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  );
};

export default AddItem;
