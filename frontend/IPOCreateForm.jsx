import React, { useState } from 'react';
import axios from 'axios';

const IPOCreateForm = () => {
  const [form, setForm] = useState({
    company: '',
    price: '',
    date: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', form.company);
    formData.append('price', form.price);
    formData.append('date', form.date);
    formData.append('document', form.file); // key depends on your backend

    try {
      const response = await axios.post('/api/ipo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('IPO created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create IPO');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create IPO</h2>

      <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} className="mb-2 p-2 border w-full" required />

      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="mb-2 p-2 border w-full" required />

      <input type="date" name="date" value={form.date} onChange={handleChange} className="mb-2 p-2 border w-full" required />

      <input type="file" name="file" onChange={handleChange} className="mb-4 w-full" required />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default IPOCreateForm;
