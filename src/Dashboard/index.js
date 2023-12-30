import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react'
import TodoCard from '../lib/TodoCard';

const menuItems = [
    {
        name: 'Create Todo',
        href: '/createtodo',
    },
]

function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [tododetails, setTodoDetails] = React.useState([])
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.clear();
        navigate("/")
    }
    const fetchTodo = async () => {
        try {
            const response = await fetch("https://todoapi.1-11.zip/activity", {
                method: "GET",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `random ${window.localStorage.getItem("token")}`
                },
            });

            const responseData = await response.json();
            console.log("responseData", responseData);
            if (responseData.status === "Failed" && response.message === "jwt expired") {
                window.localStorage.clear();
                navigate("/")
            }
            setTodoDetails(responseData?.details)
        } catch (e) {
            console.log("error", e)
        }
    }
    useEffect(() => {
        fetchTodo()
    }, [])

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

            <div className="card-grid my-[2em] mb-[8em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
                {tododetails && tododetails.map((todo) => {
                    return (
                        <div key={todo._id}>
                            <TodoCard key={todo._id} {...todo} />
                        </div>
                    );
                })}
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
    )
}
export default Dashboard;