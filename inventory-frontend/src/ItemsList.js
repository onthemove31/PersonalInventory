import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const ItemsList = ({ user }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('*').eq('user_id', user.email);
      if (error) console.error('Error fetching items:', error);
      else setItems(data);
    };
    fetchItems();
  }, [user]);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - {item.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;