import { useState, type FormEvent } from 'react';

function AddItemForm() {
  const [formData, setFormData] = useState({ name: '', price: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aquiretested-2.onrender.com/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Item successfully add ho gaya!');
        setFormData({ name: '', price: '' });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Backend connection error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
