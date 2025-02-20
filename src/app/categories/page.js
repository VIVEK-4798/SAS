"use client";
import UserTabs from '@/components/layout/UserTabs';
import {React, useState, useEffect} from 'react';
import {useProfile} from '../../components/UseProfile';
import DeleteButton from '@/components/DeleteButton';
import toast from 'react-hot-toast';

const CategoriesPage = () => {

  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  const {loading: profileLoading, data: profileData} = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }
  

  async function handleCategorySubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {name: categoryName};
      if(editedCategory){
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);
      if(response.ok)
         resolve() 
      else
         reject();
    });
    await toast.promise(creationPromise,{
      loading: editedCategory ?
                'Updating category...' : 
                'Creating your new category...',
      success: editedCategory ?
                'Category updated' :
                'Category created',
      error: 'Error, sorry...',
    })
  }

  async function handleDeleteClick(_id){
    const promise = new Promise(async(resolve, reject) => {
      const response = await fetch('/api/categories?_id='+_id, {
        method: 'DELETE',
      });
      if(response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });
    fetchCategories();
  }

  if(profileLoading){
    return 'Loading user info...';
  }

  if(!profileData){
    return 'Not an admin';
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
        <UserTabs isAdmin={true}/>
        <form className='mt-8' onSubmit={handleCategorySubmit}>
          <div className='flex gap-2 items-end'>
            <div className='grow'>
              <label>
                {editedCategory ? 'Update Category' : 'New category name'}
                {editedCategory && (
                  <>: <b>{editedCategory.name}</b></>
                )}
              </label>
              <input 
                type='text'
                value={categoryName || ''}
                onChange={ev => setCategoryName(ev.target.value)}
              />
            </div>
            <div className='flex gap-2 pb-2'>
              <button 
                type='submit'
                className='border border-primary'>
                {editedCategory ? 'Update' : 'Create'}
              </button>
              <button
                type='button'
                onClick={() => {
                  setEditedCategory(null)
                  setCategoryName('');
                }}
                style={{ display: editedCategory ? 'block' : 'none' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className='mt-8 mb-2 text-sm text-gray-500'>Existing category:</h2>
          {categories?.length > 0 && categories.map(c => (
            <div
              key={c._id}
              className=' bg-gray-100 items-center rounded-xl p-2 px-4 flex gap-1 mb-1'>
              <div 
                className='grow'>
                {c.name}
              </div>
               <div className='flex gap-1'>
                  <button 
                    onClick={() => {
                      setEditedCategory(c);
                      setCategoryName(c.name)
                    }}
                    type='button'>
                    Edit
                  </button>
                  <DeleteButton 
                      label="Delete"
                       onDelete={() => handleDeleteClick(c._id)}
                  />
               </div>
            </div>
            ))}
        </div>
    </section>
  );
};

export default CategoriesPage