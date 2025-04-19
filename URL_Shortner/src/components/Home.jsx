import React, { useRef, useState } from 'react';

function Home() {
    const [urlData, setUrlData] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const urlRef = useRef();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: urlRef.current.value,
                })
            });

            const data = await res.json();
            setUrlData(data);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } catch (error) {
            console.error("frontend error", error);
        }
    };

    const handleCopy = () => {
        if (urlData.shortUrl) {
            navigator.clipboard.writeText(urlData.shortUrl);
        }
    };

    return (
        <>
            <h1 className='text-6xl font-serif font-bold tracking-wide text-center text-black my-10'>
                URL <span className='text-orange-500'>Shortener</span>
            </h1>

            <p className="text-center text-2xl text-cyan-800 font-medium tracking-wide leading-relaxed mb-12 italic">
                Paste a long URL to shorten it. We will give you a short link
                that redirects to the original URL.
            </p>

            <form
                onSubmit={handleSubmit}
                className="box h-60 w-2/3 flex flex-col justify-center items-center mx-auto"
            >
                <input
                    type="text"
                    ref={urlRef}
                    placeholder="Enter a URL"
                    className="h-10 w-full m-5 rounded-md p-2 bg-gray-100 border-2 border-cyan-800 outline-none focus:border-orange-500"
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white h-12 w-32 rounded-md font-bold hover:bg-orange-600 transition duration-150 ease-in-out"
                >
                    Shorten
                </button>
            </form>

            <div className="mt-5 flex flex-col items-center">
                <p className="text-center text-lg text-gray-700 mb-2">
                    Your shortened URL will appear here.
                </p>

                {urlData.shortUrl && (
                    <div className={`short-url bg-gray-200 w-1/3 text-3xl p-3 mt-2 rounded-md text-center text-cyan-800 font-semibold ${showPopup ? 'animate-pulse' : ''}`}>
                        {urlData.shortUrl}

                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
