import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative flex w-full max-w-[24rem]">
          <div>
            <input
              type="text"
              placeholder=""
              class="block py-2.5 px-0 w-full text-sm text-emerald-900 bg-transparent border-0 border-b-2 border-emerald-300 appearance-none dark:text-emerald-800 dark:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <label class="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-emerald-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter new category
            </label>
          </div>

          <button className="px-2 py-2 ml-3 bg-gray-900 text-emerald-400 font-mono rounded-lg border border-emerald-400 relative group">
            <span className="absolute inset-0 bg-emerald-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
              Submit
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
