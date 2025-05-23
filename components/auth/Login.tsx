'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { MdClose } from "react-icons/md";
import { createPortal } from 'react-dom';

interface ModalLoginProps {
  onClose: () => void;
}

const ModalLogin: FC<ModalLoginProps> = ({ onClose }) => {
    const handleBackdropClick = () => {
        onClose();
    };
    
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    // Kiểm tra xem có phải đang chạy ở client không
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Nội dung modal
    const modalContent = (
        <div 
            className="fixed inset-0 z-[1000] bg-black/50 flex justify-center items-center h-screen w-screen"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-white p-6 rounded-lg w-auto md:w-[400px]"
                onClick={stopPropagation}    
            >
                <div className='flex justify-center relative'>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <button 
                        className='absolute text-xl text-gray-500 top-0 right-0 cursor-pointer hover:text-black'
                        onClick={()=>onClose()}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className='text-center px-12 text-gray-500'>
                    Đăng nhập để tham gia vào các cuộc trò chuyện nào
                </div>
                <div className='flex flex-col'>
                    <input
                        placeholder='Nhập username ...'
                        className='mt-4 px-4 w-full h-[50px] rounded-xl border-gray-400 text-gray-400 border-2 hover:border-black hover:text-black'
                    />
                    <input
                        placeholder='Nhập mật khẩu ...'
                        className='mt-2 px-4 w-full h-[50px] rounded-xl border-gray-400 text-gray-400 border-2 hover:border-black hover:text-black'
                    />
                    <button className='mt-4 w-full h-[50px] rounded-xl border-gray-400 text-black border-2 cursor-pointer hover:border-black hover:bg-gray-200'>
                        Đăng Nhập
                    </button>
                </div>
            </div>
        </div>
    );

    // Chỉ render portal khi component đã mounted (ở client)
    if (!mounted) return null;
    return createPortal(modalContent, document.body);
};

export default ModalLogin;