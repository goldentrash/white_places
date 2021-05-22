import { useParams } from 'react-router-dom';

export const useDecodedParams = (): Record<string, string> => {
  const params = useParams();

  const result: Record<string, string> = {};
  for (const param in params) {
    result[param] = decodeURI(params[param]);
  }
  return Object.freeze(result);
};
export default useDecodedParams;
