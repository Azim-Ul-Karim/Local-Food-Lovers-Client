import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const ForgetPassword = () => {

    const { forgetPassword } = useContext(AuthContext);
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');

    const handleReset = e => {
        e.preventDefault();
        forgetPassword(email)
            .then(() => {
                toast.success('Password reset email sent! Redirecting to Gmail...');
                window.open('https://mail.google.com', '_blank');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>

            <title>Reset Password | Local Food Lovers Network</title>
            
            <div className='w-9/12 md:w-7/12 lg:w-5/12 bg-[#f6f7d0] p-10 shadow-xl rounded-md'>
                <h1 className='text-xl md:text-2xl font-bold text-center mb-6 text-[#5f756a]'>
                    Reset Your Password
                </h1>
                <form onSubmit={handleReset} className='space-y-4'>
                    <label className='font-medium text-[#52057b]'>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='input mt-2 bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none'
                        placeholder='Enter your email address'
                        required
                    />
                    <button type='submit' className='bg-[#675748] text-white px-5 py-2 rounded-md w-full cursor-pointer'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;