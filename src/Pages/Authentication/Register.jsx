import React, { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaUserPlus } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext';

const Register = () => {

    const { createUser, setUser, googleUser, updateUser } = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        const photo = form.photo.value;

        const lengthPattern = /^.{6,}$/;
        const upperPattern = /[A-Z]/;
        const lowerPattern = /[a-z]/;

        if (!lengthPattern.test(password)) {
            toast.error('Password must be at least 6 characters long!');
            return;
        }
        else if (!upperPattern.test(password)) {
            toast.error('Password must include an uppercase letter.');
            return;
        }
        else if (!lowerPattern.test(password)) {
            toast.error('Password must include a lowercase letter.');
            return;
        }
        else if (password !== confirm) {
            toast.error('Passwords do not match!');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });

                        const newUser = {
                            name: name,
                            email: email,
                            photo: photo
                        }

                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('Registered', data);
                            })

                        navigate(location.state ? location.state : '/');
                    })
                    .catch(error => {
                        console.log(error);
                        setUser(user);
                    })
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('This email is already registered! Please login instead.');
                }
            })
    }

    const handleGoogleRegister = () => {
        googleUser()
            .then(result => {
                const user = result.user;
                console.log(user);
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Registered', data);
                    })

                setUser(user);
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex justify-center items-center'>

            <title>Register | Local Food Lovers Network</title>

            <div className='w-10/12 md:8-12 lg:w-6/12 my-10 bg-[#f6f7d0] p-8 md:p-15 shadow-xl rounded-md'>
                <h1 className='text-center font-bold text-2xl md:text-3xl text-[#5f756a]'>
                    Join the Feast!
                </h1>
                <p className='text-center font-medium md:text-lg mt-4 mb-8 text-[#77576b]'>
                    Create your account and start sharing your favorite local bites...
                </p>

                <form onSubmit={handleRegister}>
                    <fieldset className='fieldset'>
                        <label className="label text-sm text-[#52057b] font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            name='name'
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            placeholder="Enter your name"
                            required
                        />

                        <label className="label mt-2 text-sm text-[#52057b] font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            placeholder="Enter your email address"
                            required
                        />

                        <label className="label mt-2 text-sm text-[#52057b] font-semibold">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            name='photo'
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            placeholder="Enter your photo url"
                        />

                        <label className="label mt-2 text-sm text-[#52057b]  font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none pr-3"
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                            </span>
                        </div>

                        <label className="label mt-2 text-sm text-[#52057b] font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirm"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            placeholder="Re-enter your password"
                            required
                        />

                        <button type='submit' className="btn flex items-center gap-2 text-base bg-[#675748] text-white mt-4">
                            <FaUserPlus></FaUserPlus>
                            Register
                        </button>
                    </fieldset>
                </form>

                <fieldset className='fieldset'>
                    <p className='my-2 text-center'>Or</p>

                    <button onClick={handleGoogleRegister} className="btn flex items-center gap-2 bg-white text-black shadow-sm border-[#e5e5e5]">
                        <FcGoogle size={18}></FcGoogle>
                        Continue with Google
                    </button>

                    <p className='mt-2.5 text-sm'>
                        Already Have An Account? <Link className='text-[#046eac] font-semibold' to='/login'>Login</Link>
                    </p>
                </fieldset>
            </div>

            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default Register;