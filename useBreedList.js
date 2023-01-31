import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);

  //unloaded, loading, loaded
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    //checks if it's empty
    if (!animal) {
      setBreedList([]);

      //returns previous loaded breeds
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);

      //loads new breed list if wasn't used previously
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-vs.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
