import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const TestFetch = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('*');
      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - {item.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestFetch;
