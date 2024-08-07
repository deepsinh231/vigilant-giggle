import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserTie } from "react-icons/fa";

export default function Header({ onLogout }) {
    const { userdata } = useSelector((state) => state.auth);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status)
    const navlinkdata = [
        { name: "Home", link: "/", active: "true" },
        { name: "All Post", link: "/allposts", active: authStatus },
        { name: "My Post", link: `/mypost`, active: authStatus },
        { name: "Add Post", link: "/addpost", active: authStatus },
        { name: "Login", link: "/login", active: !authStatus },
        { name: "Sign up", link: "/signup", active: !authStatus },
    ];
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };
    const handleLogoutClick = () => {
        setIsUserDropdownOpen(false);
        onLogout();
    }
    const toggleAllMenu = () => {
        setIsUserDropdownOpen(false);
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex relative flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className='className="flex items-center space-x-3 rtl:space-x-reverse"'>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogPost</span>
                </Link>

                <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={isUserDropdownOpen}
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                        onClick={toggleUserDropdown}
                    >
                        <span className="sr-only">Open user menu</span>
                        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" /> */}
                        <FaUserTie className="w-8 h-8 rounded-full p-1 text-white" />
                    </button>
                    <div
                        className={`z-50 ${isUserDropdownOpen ? 'block' : 'hidden'} absolute top-7 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                {userdata ? userdata.name : "Name"}

                            </span>
                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                {userdata ? userdata.email : "name@gmail.com"}
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            {navlinkdata.map((key) => key.active ?
                                (
                                    <li key={key.name}>
                                        <NavLink to={key.link}
                                            onClick={toggleAllMenu}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ?
                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    :
                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            }
                                        >
                                            {key.name}
                                        </NavLink>
                                    </li>
                                )
                                :
                                null
                            )}
                            {authStatus &&
                                <li>
                                    <button
                                        onClick={handleLogoutClick}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    );
}
