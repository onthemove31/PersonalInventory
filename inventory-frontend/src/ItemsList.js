import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ItemsList = ({ user }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (user && user.email) {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('user_id', user.email);

        if (error) {
          console.error('Error fetching items:', error.message);
        } else {
          setItems(data || []);
        }
      }
    };
    fetchItems();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Inventory</h2>
      {items.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date Purchased</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.date_purchased}</td>
                <td>{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default ItemsList;
