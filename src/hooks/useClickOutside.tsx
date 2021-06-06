/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react';

export const useClickOutside = (ref: any, callback: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
};

export default useClickOutside;
