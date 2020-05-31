import { useLocation } from 'react-router';

export const useQuery = <S extends {}>() => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const result = {};
  for (const key of query.keys()) {
    result[key] = query.getAll(key);
  }
};
