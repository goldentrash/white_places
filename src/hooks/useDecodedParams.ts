import { useParams } from 'react-router-dom';

export const useDecodedParams = (): Record<string, string> => {
  const params = useParams();

  for (const param in params) {
    params[param] = decodeURI(params[param]);
  }
  return params;
};
export default useDecodedParams;
