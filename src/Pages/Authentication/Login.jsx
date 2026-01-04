import React, { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoEnterOutline } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const { loginUser, setUser, googleUser } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const DEMO_USER = {
        email: 'ami@tumi.iu',
        password: 'Amitumi@1',
    };

    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Invalid credentials. Please try again.');
            });
    };

    const handleGoogleLogin = () => {
        googleUser()
            .then(result => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                };

                fetch('https://local-food-lovers-server-liard.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('User continued with Google', data);
                    });

                setUser(user);
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Google sign-in failed. Try again.');
            });
    };

    const handleDemoLogin = () => {
        setEmail(DEMO_USER.email);
        setPassword(DEMO_USER.password);
        toast.info('Demo credentials filled!');
    };

    return (
        <div className="flex justify-center items-center">

            <title>Login | Local Food Lovers Network</title>

            <div className="w-10/12 md:w-8/12 lg:w-6/12 my-10 bg-[#f6f7d0] p-8 md:p-15 shadow-xl rounded-md">
                <h1 className="text-center font-bold text-2xl md:text-3xl text-[#5f756a]">
                    Welcome Back!
                </h1>
                <p className="text-center font-medium md:text-lg mt-4 mb-8 text-[#77576b]">
                    Log in to share your latest food finds...
                </p>

                <form onSubmit={handleLogin}>
                    <fieldset className="fieldset">
                        <label className="label text-sm text-[#52057b] font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            placeholder="Enter your email address" required
                        />

                        <label className="label mt-2 text-sm text-[#52057b] font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none pr-3"
                                placeholder="Enter your password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>

                        <Link
                            to="/forget-password"
                            state={{ email }}
                            className="my-2 text-[#bd2000]"
                        >
                            Forgot password?
                        </Link>

                        <button
                            type="submit"
                            className="btn flex items-center gap-2 text-base bg-[#675748] text-white mt-4"
                        >
                            <IoEnterOutline />
                            Login
                        </button>
                    </fieldset>
                </form>

                <fieldset className="fieldset">
                    <p className="my-2 text-center">Or</p>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn flex items-center gap-2 bg-white text-black shadow-sm border-[#e5e5e5]"
                    >
                        <FcGoogle size={18} />
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="btn w-full mt-2"
                    >
                        Demo User Login
                    </button>

                    <p className="mt-2.5 text-sm">
                        Don't Have An Account? <Link className='text-[#046eac] font-semibold' to='/register'>Register</Link>
                    </p>
                </fieldset>
            </div>

            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default Login;