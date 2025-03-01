'use client';
import React, { useState, useEffect } from 'react';
import EditableImage from './EditableImage';
import { useProfile } from '../UseProfile';

const UserForm = ({ user, onSave }) => {
    
    const normalizedUser = { 
        name: user?.name || user?.user?.name || '',
        email: user?.email || user?.userInfo?.email || '',
        image: user?.image || user?.user?.image || '',
        phone: user?.phone || user?.userInfo?.phone || '',
        streetAddress: user?.streetAddress || user?.userInfo?.streetAddress || '',
        zipCode: user?.zipCode || user?.userInfo?.zipCode || '',
        city: user?.city || user?.userInfo?.city || '',
        country: user?.country || user?.userInfo?.country || '',
        admin: user?.admin || user?.userInfo?.admin || false,
    };

    const [originalData, setOriginalData] = useState({});
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [admin, setAdmin] = useState(originalData?.admin || false);
    const {data: loggedInUserData} = useProfile();
    
    useEffect(() => {
        if (user) {
            setOriginalData(normalizedUser);
            setUserName(normalizedUser.name);
            setEmail(normalizedUser.email);
            setImage(normalizedUser.image);
            setPhone(normalizedUser.phone);
            setStreetAddress(normalizedUser.streetAddress);
            setZipCode(normalizedUser.zipCode);
            setCity(normalizedUser.city);
            setCountry(normalizedUser.country);
            setAdmin(normalizedUser.admin);
        }
    }, [user]);

    useEffect(() => {
        if (originalData) {
            setAdmin(originalData.admin); 
        };
    }, [originalData]);
    
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setAdmin(isChecked); 
    };
    

    const isEdited =
        originalData &&
        (userName !== originalData.name ||
            image !== originalData.image ||
            phone !== originalData.phone ||
            streetAddress !== originalData.streetAddress ||
            zipCode !== originalData.zipCode ||
            city !== originalData.city ||
            country !== originalData.country ||
            admin !== originalData?.admin || false);

    return (
        <div className="flex gap-4">
            <div className="p-2 rounded-lg relative max-w-[80px]">
                <EditableImage link={image} setLink={setImage} />
            </div>
            <form
                className="grow"
                onSubmit={(ev) =>
                    onSave(ev, {
                        name: userName, image, admin, userInfo: {  
                            phone,
                            streetAddress,
                            zipCode,
                            city,
                            country,
                        }
                    })}
            >
                <label> First and last name </label>
                <input
                    type="text"
                    placeholder="First and Last Name"
                    value={userName}
                    onChange={(ev) => setUserName(ev.target.value)}
                />

                <label> Email </label>
                <input type="email" placeholder="email" disabled value={email} />

                <label> Phone No. </label>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                />

                <label> Street address </label>
                <input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                />

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label> Zip code </label>
                        <input
                            type="text"
                            placeholder="Zip Code"
                            value={zipCode}
                            onChange={(ev) => setZipCode(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label> City </label>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(ev) => setCity(ev.target.value)}
                        />
                    </div>
                </div>

                <label> Country </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(ev) => setCountry(ev.target.value)}
                />
                {loggedInUserData && (
                    <div>
                    <label
                        className='inline-flex items-center gap-2 mb-2 p-2'
                        htmlFor='adminCb'>
                            <input 
                                type='checkbox'
                                id='adminCb'
                                className=''
                                value={'1'}
                                checked={admin}
                                onChange={handleCheckboxChange} 
                                />
                            <span>Admin</span>
                    </label>
                </div>
                )}
                <button type="submit" disabled={!isEdited}>Save</button>
            </form>
        </div>
    );
};

export default UserForm;
