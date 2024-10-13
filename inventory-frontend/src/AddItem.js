import React, { useState } from 'react';
import { supabase } from './supabaseClient';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Furniture">Furniture</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date Purchased"
        value={datePurchased}
        onChange={(e) => setDatePurchased(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;