import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MainContext, useContext } from '../contexts/MainContext';
import axios from 'axios';

export default function EditModal() {
  const { selectedEntry, setLoading } = useContext(MainContext);
  const [formData, setFormData] = useState(selectedEntry);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/entries/' + selectedEntry.id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => setFormData(res.data.data.attributes));
  }, [selectedEntry]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let sentData = { data: { ...formData } };
    axios
      .put(
        'http://localhost:1337/api/entries/' + selectedEntry.id,
        sentData,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .then((res) => setLoading(false));
  };

  function closeModal() {
    document.querySelector('#edit-modal').classList.add('hidden');
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  return (
    <div
      className="hidden fixed flex justify-center items-center top-0 left-0 bg-black/80 h-screen w-screen z-50"
      id="edit-modal"
    >
      <form
        className="relative h-5/6 w-3/4 rounded-2xl bg-gray-200 flex flex-col items-center justify-center gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="name_surname"
          defaultValue={formData.name_surname}
          {...register('name_surname', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="field"
          defaultValue={formData.field}
          {...register('field', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="sectorScore"
          defaultValue={formData.sectorScore}
          {...register('sectorScore', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="credit_type"
          defaultValue={formData.credit_type}
          {...register('credit_type', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="sex"
          defaultValue={formData.sex}
          {...register('sex', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={formData.email}
          {...register('email', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="source"
          defaultValue={formData.source}
          {...register('source', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="tel"
          defaultValue={formData.tel}
          {...register('tel', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="age"
          defaultValue={formData.age}
          {...register('age', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="startYear"
          defaultValue={formData.startYear}
          {...register('startYear', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="job"
          defaultValue={formData.job}
          {...register('job', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="PS"
          defaultValue={formData.PS}
          {...register('PS', { required: false, max: 100, min: 0 })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="education"
          defaultValue={formData.education}
          {...register('education', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="university"
          defaultValue={formData.university}
          {...register('university', { required: false })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
          onChange={(e) => handleChange(e)}
        />

        <div
          className="absolute top-0 translate-x-1/2 -translate-y-1/2 right-0 flex justify-center items-center p-5 rounded-full h-3 w-3 bg-red-500 text-white font-bold cursor-pointer"
          onClick={closeModal}
        >
          x
        </div>

        <input
          type="submit"
          className="px-10 py-2 bg-indigo-600 rounded-full text-white font-bold mt-4 cursor-pointer hover:bg-indigo-500"
        />
      </form>
    </div>
  );
}
