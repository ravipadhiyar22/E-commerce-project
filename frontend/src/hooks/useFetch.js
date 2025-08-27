import { useEffect, useState } from "react";
import api from "../api/axios";


export function useFetch(baseurl) {
    const [data, setdata] = useState([]);
    const [error, seterror] = useState();
    const [loading, setloading] = useState(false);
    useEffect(() => {

        const fetchdata = async () => {
            try {
                setloading(true);
                const resdata = await api.get(baseurl);
                if (resdata.status > 400) {
                    // seterror(resdata);
                    throw new error("error while fetch data")
                }
                setdata(resdata.data)

            } catch (error) {
                seterror(error?.response?.data?.message);

            } finally {
                setloading(false);
            }
        }
        fetchdata();
    }, [baseurl]);

    return { data, loading, error };

}