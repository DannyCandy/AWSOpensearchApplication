import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryObject = Record<string, any>; 
const useCustomQuery = (initial: QueryObject): [
  QueryObject,
  (newQuery: Partial<QueryObject>) => void,
  () => void
] => {
    const [ query, setQuery ] = useState(initial);

    const updateQuery = (newQuery: Partial<QueryObject>) => {
      setQuery((prev) => ({
        ...prev,
        ...newQuery,
    }));
  };

    const resetQuery = () => {
      setQuery(initial);
    };

    return [ query, updateQuery, resetQuery ];
};
export default useCustomQuery;