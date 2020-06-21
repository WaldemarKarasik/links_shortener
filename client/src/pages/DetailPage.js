import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const params = useParams()

    const {request, loading} = useHttp()
    const getLink = useCallback(async () => {
        try {
          const fetched = await request(`http://localhost:5000/api/link/${params.id}`, 'GET', null, {
              Authorization: `Bearer ${token}`
          })
            setLink(fetched)
        } catch(e) {

        }
    }, [token, params.id, request])
    useEffect(() => {
        getLink()
    }, [getLink])
    if (loading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            {!loading && link && <LinkCard link={link}/> }
        </React.Fragment>
    )
}