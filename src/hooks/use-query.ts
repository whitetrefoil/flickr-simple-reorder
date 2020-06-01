import { useLocation } from 'react-router';


export const useQuery = <S extends Record<string, string>>(): S => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const result = {};
  for (const key of query.keys()) {
    const val = query.get(key);
    if (val == null || val.length === 0) {
      continue;
    }
    result[key] = val;
  }
  return result as S;
};
