import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft } from "react-icons/md";
import images from '../../assets/images';

const Cart = ({ previousLocation }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'BigMay', price: 25000, quantity: 1 },
    ]);

    const navigate = useNavigate();

    const increment = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decrement = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleBackClick = () => {
        if (previousLocation) {
            navigate(previousLocation);
        } else {
            navigate(-1);
        }
    };

    return (
        <>
            <div className='w-full p-[24px] relative'>
                <div className='flex items-start flex-col gap-[24px]'>
                    {/* Return to back */}
                    <div onClick={handleBackClick} className='flex items-center gap-[18px] cursor-pointer'>
                        <div className='w-[45px] h-[45px] bg-[#FDBF48] rounded-[100%] flex items-center justify-center'>
                            <MdChevronLeft fontSize={22} color='#fff' />
                        </div>
                        <div className='text-[17px] text-[#36B75A] font-[500] leading-[22px]'>Savat / Cart</div>
                    </div>
                    {/* Products added to cart */}
                    <div className='w-full flex flex-col items-start gap-[32px]'>
                        {cartItems.map(item => (
                            <div key={item.id} className='w-full flex items-start gap-[20px]'>
                                <div className='w-[136px] h-[117px] rounded-[25px] bg-[#646982]'>
                                    <img src="" alt="order-photo" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex items-start flex-col'>
                                    <div className='w-[171px] flex items-center justify-between'>
                                        <div className='text-[18px] text-[#FDBF48] leading-[normal] font-[500]'>{item.name}</div>
                                        <div className='cursor-pointer' onClick={() => deleteItem(item.id)}>
                                            <img src={images.Delete} alt="delete icon" />
                                        </div>
                                    </div>
                                    <div className='pt-[22px] text-[20px] text-[#36B75A] font-[400] leading-[normal]'>{item.price}</div>
                                    <div className='w-[171px] flex items-center justify-between pt-[13px]'>
                                        <div className='text-[18px] text-[#181C2E] font-[400] leading-[normal]'>14''</div>
                                        <div className='flex items-center gap-[19px]'>
                                            <div className='cursor-pointer' onClick={() => decrement(item.id)} data-name='product-delete'><img src={images.Minus} alt="" /></div>
                                            <div className='text-[16px] font-[500] text-[#FDBF48] leading-[normal]'>{item.quantity}</div>
                                            <div className='cursor-pointer' onClick={() => increment(item.id)}><img src={images.Plus} alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full h-auto bg-[#fff] rounded-[24px_24px_0px_0px] absolute top-auto left-0 bottom-0 box-shadow p-[0_24px]'>
                <div className='w-full flex flex-col items-center text-center pt-[30px] pb-[22px]'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='text-[18px] font-[600] leading-[24px] text-[#36B75A] uppercase'>Umumiy:</div>
                        <div className='text-[34px] font-[500] text-[#FDBF48] leading-[normal]'>{calculateTotalPrice()}</div>
                    </div>
                    <button type='submit' className='text-center bg-[#FDBF48] w-full p-[21px_0] rounded-[12px]'>
                        <span className='text-[#000] text-[14px] font-[400] leading-[normal] uppercase tracking-[1px]'>Buyurtma berish</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;