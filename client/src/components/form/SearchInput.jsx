import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="border rounded-full flex justify-center items-center ">
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64"
            placeholder="Search..."
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            onfocus="this.classList.remove('w-12'); this.classList.add('w-64');"
            onblur="if(this.value === '') { this.classList.remove('w-64'); this.classList.add('w-12'); }"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
