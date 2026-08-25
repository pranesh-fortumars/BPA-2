import { useEffect } from 'react';
import { MockGenerator } from '../lib/mockData';

export const MockInit = () => {
   useEffect(() => {
       MockGenerator.initAll().catch(console.error);
   }, []);
   return null;
};
