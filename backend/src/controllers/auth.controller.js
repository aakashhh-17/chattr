import express from 'express'

export const signUp = async (req, res)=>{
res.send('Hello from signup')
}

export const logIn = async (req, res)=>{
res.send('Hello from login')
}

export const logOut = async (req, res)=>{
res.send('Hello from logout')
}