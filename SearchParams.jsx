//search api
import { useState } from "react";

const SearchParams = () => {
  //searches pet in Los Angeles
  /*
    hooks have to be called every single time in the same order

    don't use it for conditional statements
    react will not call it order 
  */

  const [location, setLocation] = useState("");
  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            //this is saying something changed, go update yourself
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
