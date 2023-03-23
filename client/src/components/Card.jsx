import React from 'react'; 
import { download } from '../assets';

import { downloadImage } from '../utils'; 

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card cursor-pointer">
      <img
        className="w-ful h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
       />
       <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-lg overflow-y-auto  prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-white w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button className="outline-none bg-transparent border-none" type="button" onClick={() => downloadImage(_id, photo)}>
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>

        </div>
       </div>

    </div>
  )
}

export default Card