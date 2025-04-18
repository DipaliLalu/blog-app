import { endPoints } from '@/utils/axios';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) =>
    axios.get(url, {
        withCredentials: true, 
    }).then((res) => res.data); 

export function useEncodedToken() {
    const url = endPoints.auth.me; 
    const { data, error, isLoading } = useSWR(url, fetcher); 
   
    return {
        user: data,
        isLoading,
        isError: error,
    };
}
