import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Form, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatingImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true); 
        const response = await fetch("http://localhost:5000/api/v1/dalle", {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json', 

          }, 
          body: JSON.stringify({ prompt: form.prompt }), 

        })

        const data  = await response.json(); 

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        console.log({...form})

      } catch(err) {
        alert(err); 


      } finally {
        setGeneratingImg(false); 
      }
    } else {
      alert("Please Enter a Prompt"); 
    }
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

   if(form.prompt && form.photo) {
    setLoading(true); 
    try {
      const response = await fetch("http://localhost:5000/api/v1/post", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({...form}), 
      })

      await response.json(); 
      alert("success")
      navigate("/"); 
    } catch(err) {
      alert(err)
    } finally {
      setLoading(false); 
    }
   } else {
    alert("Please generate an image with proper details"); 
   }


  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    console.log(form.prompt);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222828] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share the Image to the community{" "}
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Form
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <Form
            labelName="Prompt"
            type="text"
            name="prompt"
            value={form.prompt}
            placeholder="Enter prompt"
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[4">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            className="text-white bg-green-700 rounded-md text-sm w-full sm:w-auto px-6 py-2.5 text-center"
            type="button"
            onClick={generatingImage}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, You can share it with
            others in the community
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
