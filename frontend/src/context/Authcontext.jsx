import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios';
import { useLayoutEffect } from 'react';

const Authcontext = createContext();


export function Authcontextprovider({ children }) {

    const [user, setuser] = useState(null);

    const [loading, setloading] = useState(true);

    useEffect(() => {

        const fetchuser = async () => {
            try {

                const res = await api.get("/users/me");
                setuser(res.data.user);

            } catch (error) {
                setuser(null);

            } finally {
                setloading(false);
            }
        };
        fetchuser();
    }, [])



    useLayoutEffect(() => {


        const intercept = api.interceptors.response.use(
            response => response,
            async error => {
                const originalrequest = error.config;

                if (error.response?.status === 403 && error.response?.data?.message === 'unauthorized') {
                    try {
                        const res = await api.post("/users/refresh-token");

                        return api(originalrequest)
                    } catch (error) {
                        setuser(null);
                    }
                }
                return Promise.reject(error);
            }

        )
        return () => {
            api.interceptors.response.eject(intercept);
        }

    }, [])



    return (
        <Authcontext.Provider value={{ user, setuser, loading }}>
            {children}
        </Authcontext.Provider>


    )
};

export default function useAuth() {
    return useContext(Authcontext);
}
