import React from "react";
import Image from "next/image"
const AnonymousQnA = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="bg-transparent rounded-3xl  w-full max-w-md mb-8 overflow-hidden">
        <div className="bg-white  flex items-center space-x-3 p-4">
          <Image
            src="/default-user.jpg"
            alt="Profile" width={500} height={500}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-muted">@physcopass</p>
            <p className="text-muted">tell me who your crush is, anonymously 🤭</p>
          </div>
        </div>
        <div className="bg-opacity-20 bg-white">
        <textarea
          placeholder="send me anonymous messages..."
          className="w-full text-white mt-4 p-4 pt-0 bg-transparent focus:outline-none border-none text-muted rounded-2xl resize-none"
          rows={4}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mr-2 mb-2">
            🎲
          </button>
        </div>
        </div>
      </div>
      <p className="mb-4 text-white">🔒 anonymous q&a</p>
      <p className="mb-8 text-white">👇 335 people just tapped the button 👇</p>
      <button className="bg-black text-white py-4 px-8 rounded-full">
        Get your own messages!
      </button>
      <div className="mt-8 text-gray-200">
        <a href="#" className="mr-4">Terms</a>
        <a href="#">Privacy</a>
      </div>
    </div>
  );
};

export default AnonymousQnA;