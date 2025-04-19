import React from 'react'
import { useState, useEffect } from 'react'

function History() {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setUrls(data));
  }, [urls]);

  const handleRedirect = (url) => {
    window.open(`http://localhost:8000/${url}`, '_blank');
  };
  
  
  
  return (
    <>
      <headingg className="flex flex-col items-center">
        <div className="w-1/2 bg-cyan-800 flex justify-center items-center p-4 mt-5 rounded-2xl">
          <h1 className="text-5xl font-bold text-white">URL History</h1>
        </div>
      </headingg>

      <div className="flex justify-center p-6 mt-8 rounded-3xl bg-gray-200 shadow-xl">

  <div className="overflow-hidden rounded-xl shadow-lg bg-white w-full max-w-6xl">
    <table className="table-auto w-full border-collapse text-center">
      <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <tr>
          <th className="px-6 py-4 text-lg font-semibold border-b border-gray-300">Short URL</th>
          <th className="px-6 py-4 text-lg font-semibold border-b border-gray-300">Redirect URL</th>
          <th className="px-6 py-4 text-lg font-semibold border-b border-gray-300">Visited</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
          <tr
            key={url._id}
            className="border-b hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 transition-all duration-200"
          >
            <td
              className="px-6 py-4 text-xl text-blue-600 cursor-pointer font-semibold hover:text-orange-500 hover:underline"
              onClick={() => handleRedirect(url.shortUrl)}
            >
              {url.shortUrl}
            </td>
            <td className="px-6 py-4 text-lg text-gray-700">{url.redirectUrl}</td>
            <td className="px-6 py-4 text-lg text-gray-700">
              {url.visited && url.visited.length > 0 ? (
                <div className="space-y-1 text-sm text-gray-500">
                  {url.visited.map((visit, index) => (
                    <div key={index}>
                      {new Date(visit.timestamp).toLocaleString()}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="italic text-gray-400">No visits</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </>
  )
}

export default History