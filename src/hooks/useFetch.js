import {useState, useEffect, useCallback} from 'react';
import Api from '../services/api';

export const useFetch = (endpoint, options) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = options?.params
    
    const fetch = useCallback(() => {
        setIsLoading(true)
        Api.get(endpoint, options)
            .then((response) => {
                setFetchedData(response.data)
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }, [endpoint, JSON.stringify(params)])

    const refresh = () => (
        fetch()
    )

    useEffect(() => {
        fetch()
    }, [fetch])

    return { fetchedData, isLoading, error, refresh };
}