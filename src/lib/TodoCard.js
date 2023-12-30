import { Link } from "react-router-dom";

const TodoCard = (curElem) => {
    return (
        <>
            {curElem && (
                <div className="w-52  flex flex-col border-2 rounded-lg" key={curElem._id}>
                    <div>
                        <div className="mt-2">
                            <h3 className="font-bold capitalize truncate">{curElem.title}</h3>
                        </div>
                        <p className="text-sm mt-1 leading-4 text-gray-500 h-20 overflow-hidden">
                            {curElem.description.slice(0, 90)}...Read More
                        </p>
                    </div>
                    <div className="flex flex-row-reverse">
                        <Link to={`/todo/${curElem._id}`} className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black text-center">View Detail</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoCard;
