import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react'
const menuItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
    },
]

const CreateTodo = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.clear();
        navigate("/")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://todoapi.1-11.zip/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `random ${window.localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });
            const responseData = await response.json();
            console.log("responseData", responseData);
            if (responseData.status === "Success") {
                navigate("/dashboard");
            } else {
                alert(`Error creating todo: ${responseData?.message}`);
            }
        } catch (error) {
            console.error('Error creating todo', error);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
            <header className="relative w-full border-b bg-white py-2">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
                    <div className="inline-flex items-center space-x-2">
                        <span className="font-bold">TODO</span>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="inline-flex space-x-8">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="hidden lg:block">
                        <button
                            onClick={logout}
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Log Out
                        </button>
                    </div>
                    <div className="lg:hidden">
                        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                    </div>
                    {isMenuOpen && (
                        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="px-5 pb-6 pt-5">
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center space-x-2">
                                            <span className="font-bold">TODO</span>
                                        </div>
                                        <div className="-mr-2">
                                            <button
                                                type="button"
                                                onClick={toggleMenu}
                                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <X className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <nav className="grid gap-y-4">
                                            {menuItems.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                                >
                                                    <span className="ml-3 text-base font-medium text-gray-900">
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md mb-[6em]">
                <h2 className="text-2xl font-semibold mb-4">Create New Todo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/80 focus:outline-none focus-visible:outline-black"
                        >
                            Create Todo
                        </button>
                    </div>
                </form>
            </div>

            <footer className='-ml-2 bottom-0 fixed w-full max-w-7xl bg-white'>
                <hr />
                <div className=" flex justify-center ">
                    <div className="px-4 py-8 ">
                        <p className="text-base font-semibold text-gray-700">Todo Application</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CreateTodo;