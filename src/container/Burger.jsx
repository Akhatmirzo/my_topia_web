import React from 'react';
// import images from '../assets/images';

import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Burger = () => {
  return (
    <>
      <div className='w-full p-[10px_20px]'>
        <div className='flex flex-col items-center gap-[18px]'>
          <div className='flex flex-col items-center text-center'>
            <h2 className='text-[18px] font-[500] text-[#000] leading-[normal]'>Burgerlar</h2>
            <div className='w-[34px] h-[1px] bg-[#FDBF48] m-[5px_0]'></div>
            <p className='text-[14px] font-[400] text-[#000] leading-[18px]'>Choose your delicious meal!</p>
            <p className='text-[14px] font-[400] text-[#000] leading-[18px]'>O'zingizning mazali taomingizni tanlang!</p>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-x-[22px] gap-y-[16px] grid-rows-[auto]'>
            {
              [...Array(7)].map((item, index) => (
                <Link to='/foodetails' key={index} className='relative'>
                  <div className='relative mx-auto z-10 w-[122px] h-[84px] bg-[#98A8B8] rounded-[15px]'></div>
                  <div className='-mt-[40px]'>
                    <div className='w-[153px] h-[109px] bg-[#fff] border-[1px] border-[#FDBF48] rounded-[20px] p-[0_12px]'>
                      <div className='w-full pt-[44px] pb-[10px]'>
                        <div className='text-[15px] text-[#FDBF48] tracking-[-0.333px]'>BigMay</div>
                        <div className='flex items-center justify-between pt-[4px]'>
                          <div className='text-[16px] text-[#36B75A] tracking-[-0.333px] font-[400] leading-[normal]'>25.000</div>
                          <div className='w-[30px] h-[30px] bg-[#FDBF48] rounded-[100%] cursor-pointer flex items-center justify-center'><FiPlus color='#fff' /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Burger;