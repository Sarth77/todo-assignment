import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'
const menuItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
    },
]
function TodoDetail() {
    const { todoId } = useParams();
    console.log("params", todoId)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const [todo, setTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.clear();
        navigate("/")
    }
    const fetchTodoDetail = async () => {
        try {
            const response = await fetch(`https://todoapi.1-11.zip/activity/${todoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `random ${window.localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            console.log("responseData", responseData);
            if (responseData.status === "Success") {
                setTodo(responseData.todo);
                setEditedTitle(responseData.todo.title);
                setEditedDescription(responseData.todo.description);
            } else if (responseData.status === "Failed" && responseData.message === "jwt expired") {
                window.localStorage.clear();
                navigate("/")
            } else if (responseData.status === "Failed") {
                navigate("/error")
            } else {
                navigate("/error")
            }
        } catch (error) {
            navigate("/error")
        }
    };
    useEffect(() => {
        fetchTodoDetail();
    }, [todoId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleEditSave = async () => {
        try {
            const response = await fetch(`https://todoapi.1-11.zip/activity/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `random ${window.localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: editedTitle,
                    description: editedDescription,
                }),
            });

            if (response.ok) {
                setIsEditing(false);
                fetchTodoDetail();
            } else {
                alert('Error updating todo');
            }
        } catch (error) {
            alert('Error updating todo', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://todoapi.1-11.zip/activity/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `random ${window.localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                alert('Error deleting todo');
            }
        } catch (error) {
            alert('Error deleting todo', error);
        }
    };

    if (!todo) {
        return <div className="text-center mt-8">Loading...</div>;
    }

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

            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md mb-[8em]">
                <div className="mb-4">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="text-2xl font-semibold w-full border-b-2 focus:outline-none focus:border-blue-500"
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold mb-2" onClick={handleEditToggle} style={{ cursor: 'pointer' }}>
                            {editedTitle}
                        </h2>
                    )}
                    {isEditing ? (
                        <textarea
                            value={editedDescription}
                            rows="7"
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="w-full border focus:outline-none focus:border-blue-500 overflow-hidden"
                        />
                    ) : (
                        <p className="text-gray-600 overflow-hidden" onClick={handleEditToggle} style={{ cursor: 'pointer' }}>
                            {editedDescription}
                        </p>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    {isEditing ? (
                        <button
                            onClick={handleEditSave}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:border-green-700"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:border-red-700"
                    >
                        Delete
                    </button>
                </div>
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

export default TodoDetail;
