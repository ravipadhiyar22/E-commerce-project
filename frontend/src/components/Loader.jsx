import { Loader2 } from 'lucide-react';

function Loader() {
    return (

        <div className="flex justify-center items-center space-x-2 h-screen">
            <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-200"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-400"></div>
        </div>

    )
}

export default Loader;
