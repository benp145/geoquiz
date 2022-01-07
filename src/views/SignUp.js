import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthProvider'

export const SignUp = () => {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPassowrdRef = useRef()
    const { signUp, currentUser, auth } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('poop')

        if (passwordRef.current.value !== confirmPassowrdRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(auth, emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)

    }

    return (
        <React.Fragment>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Sign Up</h4>
                    {error && <div class="alert alert-danger" role="alert">
                        <strong>{error}</strong>
                    </div>}
                    
                    <div class="card-text">
                        <form class="form-group" onSubmit={handleSubmit}>
                            <label for="">username</label>
                            <input ref={usernameRef} type="text" id="username" class="form-control" placeholder="enter email"  />
                            <label for="">Email</label>
                            <input ref={emailRef} type="email" id="email" class="form-control" placeholder="enter email"  />
                            <label for="">Password</label>
                            <input ref={passwordRef} type="password" id="password" class="form-control" placeholder="enter email"  />
                            <label for=""> Confirm Password</label>
                            <input ref={confirmPassowrdRef} type="password" id="confirm_password" class="form-control" placeholder="enter email" />
                            <button disabled={loading}type="submit" class="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>Already have an account? </div>
        </React.Fragment>
    )
}
