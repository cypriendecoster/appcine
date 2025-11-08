import { useEffect, useState } from "react";

export default function useFetch(asyncCallback, dependencies = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            setLoading(true);
            const { data, error } = await asyncCallback();

            if (!mounted) return;

            if (error) setError(error);
            else setData(data);

            setLoading(false);
        }

        fetchData();

        return () => {
            mounted = false;
        };
    }, dependencies);

    return { data, error, loading };
}
