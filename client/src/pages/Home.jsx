import React, {useState, useEffect } from 'react'; 
import { Loader, Card, Form } from '../components'; 

const RenderCards = ({ data, title  }) => {
  if(data?.length>0) {return data?.map((post, index) =>(
    <Card key={post._id} {...post}/>
  ) )
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false); 
  const [allPosts, setAllPosts] = useState([]); 
  const [searchText, setSearchText] = useState(""); 
  const [searchedResults, setSearchedResults] = useState(null); 
  const [searchTimeout, SetSearchTimeout] = useState(null); 



  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      try {
        const response = await fetch("https://imagorial.onrender.com/api/v1/post", {
          method: "GET", 
          headers: {
            "Content-Type": "application/json", 
          }, 
        })

        if(response.ok) {
          const data = await response.json(); 
          setAllPosts(data.data.reverse()); 
        }

      } catch(err) {
        alert(err); 

      } finally {
        setLoading(false); 
      }
    }

    fetchPosts(); 
  }, []); 

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); 

    setSearchText(e.target.value); 
    SetSearchTimeout(
    setTimeout(() => {
      const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())); 

      setSearchedResults(searchResults); 
    }, 500))
  }
  return (
    <section>
      <h1 className="font-extrabold text-[#222328] text-[32px]">
        The Community Showcase
      </h1>
      <p className="mt-2 text-[#666e75 text-[16px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E API</p>
      <div className="mt-16">
       <Form 
        labelName="search post"
        type="text"
        name="text"
        placeholder="Search posts"
        value={searchText}
        handleChange={handleSearchChange}

       />

      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
          <Loader />

          </div>

        ): (
          <>
          {searchText && (
            <h2 className="font-medium text-[#666e74] mb-5">
              Showing Results for <span className="text-[#222328]">{searchText}</span>
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            {searchText ? (
              <RenderCards 
                data={searchedResults}
                title="No search results found"
              />
            ): (
              <RenderCards 
                data={allPosts}
                title="No posts found"
              />
            )}
          </div>

          </>

        )}
      </div>
    </section>
  )
}

export default Home