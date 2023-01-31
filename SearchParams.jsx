//search api
//effect is something that happens outside of your component
//ex)
//      location, animal, breed when user clicks submit
//      it goes out to the api and gets a new list of pets so user can see what they searched for

import { useState, useEffect } from "react";
import Results from "./Result";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //searches pet in Los Angeles
  /*
    hooks have to be called every single time in the same order

    don't use it for conditional statements
    react will not call it order 
  */

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  //corresponds to animals appropriate breed list
  const [breeds] = useBreedList(animal);

  //request once in the beginning and never again
  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hookos/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    //gives a react array

    <div className="search-params">
      {/*controlled form*/}
      <form
        //react dom effect
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        {/*first label is location selection*/}

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

        {/**second label is animal selection (what kind of animal )*/}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);

              //each time new animal is selected
              //it resets the breed
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        {/**third label is breed selection*/}
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
