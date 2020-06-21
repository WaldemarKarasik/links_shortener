import React, { useState, useEffect, useCallback,useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, setError, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    useEffect(() => {
      window.M.updateTextFields()
    },[])
    useEffect(() => {
      message(error)
      return () => {clearError()}
    }, [error,message, clearError])
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

     const loginHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s7 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>
            <div className="input-field">
            <input 
            placeholder="Email" 
            id="email" 
            value={form.email}
            type="text"
            name="email"
            className="yellow-input"
            onChange={changeHandler}/>
            
            <label htmlFor="email">Email</label>
            </div>
          </div>

          <div>
            <div className="input-field">
            <input 
            placeholder="Password" 
            id="password" 
            type="password"
            name="password"
            value={form.password}
            className="yellow-input"
            onChange={changeHandler}/>
            
            <label htmlFor="password">Password</label>
            </div>
          </div>
          
        </div>
        <div className="card-action">
          <button onClick={()=>loginHandler()}className="btn yellow darken-4" disabled={loading} style={{marginRight: 10}}>Войти</button>
          <button onClick={()=>registerHandler()} disabled={loading} className="btn grey lighten-1 black-text">Регистрация</button>
        </div>
        </div>
      </div>
    </div>
    )
}