import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "../../Contexts/AuthContext";
import Loader from "../Loader";

const Navbar = () => {
    const { user, logoutUser, loading } = use(AuthContext);
    const [mobile, setMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const fallbackImage = "https://i.postimg.cc/vHRwqWXs/prop.jpg";

    const handleLogout = () => {
        logoutUser()
            .then(() => { })
            .catch(() => { });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <nav className="bg-linear-to-r from-[#fffaf3] to-[#f1ffed] shadow-md sticky top-0 z-50">
            <div className="flex items-center justify-between w-11/12 mx-auto p-2 md:hidden">
                <div className="cursor-pointer text-2xl" onClick={() => setMobile(!mobile)}>
                    {mobile ? <IoIosArrowDropup /> : <AiOutlineMenuUnfold />}
                </div>

                <Link to="/">
                    <img src="https://i.postimg.cc/MTy3VZsL/LFLN.png" className="w-16 h-8" />
                </Link>

                {
                    user &&
                    <img
                        src={user.photoURL || fallbackImage}
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#c89aa8]"
                    />
                }
            </div>

            <div className={`md:hidden flex flex-col gap-2 absolute bg-[#fdfcf3] rounded-md shadow-md p-4 w-48 left-4 
            ${mobile ? "top-13" : "-top-60"}`}
            >
                <NavLink to="/" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                    Home
                </NavLink>
                <NavLink to="/all-reviews" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                    All Reviews
                </NavLink>
                {
                    user ? (
                        <>
                            <NavLink to="/add-review" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                                Add Review
                            </NavLink>
                            <NavLink to="/my-reviews" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                                My Reviews
                            </NavLink>
                            <NavLink to="/my-favorites" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                                My Favorites
                            </NavLink>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobile(false);
                                }}
                                className="text-left cursor-pointer hover:bg-[#f8e2e2] hover:px-3 hover:py-1"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="hover:bg-[#e2f2e3] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                                Log In
                            </NavLink>
                            <NavLink to="/register" className="hover:bg-[#e2f2e3] hover:px-3 hover:py-1" onClick={() => setMobile(false)}>
                                Register
                            </NavLink>
                        </>
                    )
                }
            </div>

            <div className="w-11/12 mx-auto p-3 hidden md:flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img src="https://i.postimg.cc/MTy3VZsL/LFLN.png" className="w-16 h-8" />
                    <h2 className="font-bold text-xl">
                        <span className="text-[#88a59e]">Local Food </span>
                        <span className="text-[#ce6083]">Lovers </span>
                        <span className="text-[#9bc5ba]">Network</span>
                    </h2>
                </Link>

                <div className="flex items-center gap-10">
                    <NavLink to="/" className="hover:bg-[#fbf2d7] hover:px-2 hover:py-1">
                        Home
                    </NavLink>
                    <NavLink to="/all-reviews" className="hover:bg-[#fbf2d7] hover:px-2 hover:py-1">
                        All Reviews
                    </NavLink>
                </div>

                <div className="relative">
                    {
                        user ? (
                            <>
                                <img
                                    src={user.photoURL || fallbackImage}
                                    className="w-10 h-10 rounded-full border-2 border-[#9ac2c8] cursor-pointer object-cover"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                />

                                {
                                    menuOpen &&
                                    <div className="flex flex-col gap-2 absolute right-0 mt-4 w-48 p-4 bg-[#fdfcf3] rounded-md shadow-md">
                                        <NavLink to="/add-review" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMenuOpen(false)}>
                                            Add Review
                                        </NavLink>
                                        <NavLink to="/my-reviews" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMenuOpen(false)}>
                                            My Reviews
                                        </NavLink>
                                        <NavLink to="/my-favorites" className="hover:bg-[#fbf2d7] hover:px-3 hover:py-1" onClick={() => setMenuOpen(false)}>
                                            My Favorites
                                        </NavLink>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMenuOpen(false);
                                            }}
                                            className="text-left cursor-pointer hover:bg-[#f8e2e2] hover:px-3 hover:py-1"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                }
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="bg-[#faf2f9] px-4 py-1.5 rounded-md shadow-md font-medium">
                                    Log In
                                </Link>
                                <Link to="/register" className="bg-[#faf2f9] px-4 py-1.5 rounded-md shadow-md font-medium">
                                    Register
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;