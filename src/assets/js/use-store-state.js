import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useStoreState(selector, action) {
  const store = useSelector(selector);
  const [value, setValue] = useState(store);
  const dispatch = useDispatch();
  const setStore = (value) => {
    setValue(value);
    dispatch(action(value));
  };
  useEffect(() => {
    setValue(store);
  }, [store]);

  return [value, setStore];
}

