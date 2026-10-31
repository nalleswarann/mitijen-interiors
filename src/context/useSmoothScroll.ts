import { useContext } from 'react';
import { SmoothScrollContext } from './SmoothScrollTypes';

export const useSmoothScroll = () => useContext(SmoothScrollContext);
