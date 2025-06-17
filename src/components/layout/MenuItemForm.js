import { React, useEffect, useState } from 'react';
import EditableImage from '@/components/layout/EditableImage';
import MenuItemPriceProps from '../layout/menuItemPriceProps';

const MenuItemForm = ({ onSubmit, menuItem }) => {
    const [image, setImage] = useState(menuItem?.image || []);
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(menuItem?.extraIngredientsPrices || []);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(categories => {
                if (!categories.length) {
                    setErrors(prev => ({ ...prev, category: "No categories found. Please add categories first." }));
                }
                setCategories(categories);
            })
            .catch(() => {
                setErrors(prev => ({ ...prev, category: "Failed to load categories" }));
            });
    }, []);

    const validateForm = () => {
        let newErrors = {};
        if (!image || image.length === 0) newErrors.image = "At least one image is required.";
        if (!name.trim()) newErrors.name = "Item name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!basePrice && basePrice !== 0) newErrors.basePrice = "Base price is required.";
        if (!category) newErrors.category = "Please select a category.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!validateForm()) return; 

        onSubmit(ev, { image, name, description, basePrice, sizes, extraIngredientsPrices, category });
    };

    return (
        <form onSubmit={handleSubmit} className='mt-8 max-w-2xl mx-auto'>
            <div className="md:grid items-start gap-4" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>
                <div className='grow'>
                    <label>Item Name</label>
                    <input 
                        type='text'
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <label>Description</label>
                    <input 
                        type='text'
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    <label>Category</label>
                    <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
                        <option value="">Select a category</option>  
                        {categories?.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

                    <label>Base Price</label>
                    <input 
                        type='text'
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                    />
                    {errors.basePrice && <p className="text-red-500 text-sm">{errors.basePrice}</p>}

                    <MenuItemPriceProps 
                        name={'Sizes'}
                        addLabel={'Add item size'} 
                        props={sizes} 
                        setProps={setSizes}
                    />
                    {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes}</p>}

                    <MenuItemPriceProps 
                        name={'Fit Type'}
                        addLabel={'Add ingredient'} 
                        props={extraIngredientsPrices} 
                        setProps={setExtraIngredientsPrices}
                    />

                    <button type='submit' className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default MenuItemForm;
