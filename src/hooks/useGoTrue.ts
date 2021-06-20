import GoTrue from 'gotrue-js';
import { useContext } from 'react';
import { GoTrueContext } from 'src/goTrue';

const useGoTrue = (): GoTrue => useContext(GoTrueContext);

export default useGoTrue;
