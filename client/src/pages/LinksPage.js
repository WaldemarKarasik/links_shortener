import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('http://localhost:5000/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setLinks(fetched)
        } catch(e) {

        }
    },[token, request])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])
    if (loading) {
        return <Loader/>
    }
    return (
        <React.Fragment>
            {!loading && <LinksList links={links}/>}
        </React.Fragment>
    )
}