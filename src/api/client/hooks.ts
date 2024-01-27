import { useEffect, useState } from 'react';

export const useFetcher = <TResponse extends {} | string>(callback: Promise<TResponse>) => {
    const [response, setResponse] = useState<TResponse>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        callback.then((response) => {
            setResponse(response);
            setLoading(false);
        });
    }, []);

    return {
        loading,
        response
    };
};
