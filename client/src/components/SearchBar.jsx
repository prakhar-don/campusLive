import React,{useState, useEffect, useContext} from 'react';
import Input from '../components/ui/Input'
import axios from 'axios';

const SearchBar = () => {

    const [searchTerm, setSearch]= useState("");

    const {setEvents}= useContext(AppContext);

    useEffect(()=>{

        const delayDebounceFn = setTimeout(() => {

            if(searchTerm){
                const res= axios.get(`${import.meta.env.VITE_API_URL}/search-event?search=${searchTerm}`)
                .then((res)=> setEvents(res.data.data))
                .catch((err)=> console.log(err));
            }

        }, 300)

        return () => {
            clearTimeout(delayDebounceFn)
        };

    },[searchTerm]);

    const handleChange= (e)=>{
        setSearch(e.target.value);
    }
  return (
    <div className="w-full sm:w-[50vw] mx-auto px-5 flex justify-evenly mb-3">
      <Input placeholder="Search rooms, events..."  id="search" onChange={handleChange}/>
    </div>
  )
}

export default SearchBar