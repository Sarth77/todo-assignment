import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';


function ErrorPage() {
    const navigate = useNavigate();
    return (
        <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
            <header className="relative w-full border-b bg-white pb-4 pt-4 flex items-center justify-center">
                <span className="font-bold">TODO</span>
            </header>
            <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0 mb-[8em]">
                <div className="lg:flex lg:items-center lg:space-x-10">
                    <img
                        src="https://illustrations.popsy.co/white/resistance-band.svg"
                        alt="question-mark"
                        className="h-[300px] w-auto"
                    />
                    <div>
                        <p className="mt-6 text-sm font-semibold text-black">404 error</p>
                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                            We can&apos;t find that page
                        </h1>
                        <p className="mt-4 text-gray-500">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
                        </p>
                        <div className="mt-6 flex items-center space-x-3">
                            <button
                                onClick={() => navigate(-1)}
                                type="button"
                                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Go back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='mx-auto bottom-0 fixed w-full max-w-7xl bg-white'>
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
export default ErrorPage;