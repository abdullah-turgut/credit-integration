import React from 'react';
import { useForm } from 'react-hook-form';

export default function EditModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  function closeModal() {
    document.querySelector('#edit-modal').classList.add('hidden');
  }
  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 bg-black/80 h-screen w-screen z-50"
      id="edit-modal"
    >
      <form
        className="h-5/6 w-3/4 rounded-2xl bg-gray-200 flex flex-col items-center justify-center gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="name_surname"
          {...register('name_surname', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="field"
          {...register('field', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="number"
          placeholder="sectorScore"
          {...register('sectorScore', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="credit_type"
          {...register('credit_type', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="sex"
          {...register('sex', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="email"
          {...register('email', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="source"
          {...register('source', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="tel"
          {...register('tel', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="number"
          placeholder="age"
          {...register('age', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="number"
          placeholder="startYear"
          {...register('startYear', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="job"
          {...register('job', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="number"
          placeholder="PS"
          {...register('PS', { required: true, max: 100, min: 0 })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="education"
          {...register('education', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />
        <input
          type="text"
          placeholder="university"
          {...register('university', { required: true })}
          className="w-1/2 text-xl px-3 py-1 outline-none focus:ring-0 rounded-xl"
        />

        <input
          type="submit"
          className="px-10 py-2 bg-indigo-600 rounded-full text-white font-bold mt-4 cursor-pointer hover:bg-indigo-500"
        />
      </form>
      <p id="close-modal" onClick={closeModal} className="fixed left-0 top-0">
        x
      </p>
    </div>
  );
}
