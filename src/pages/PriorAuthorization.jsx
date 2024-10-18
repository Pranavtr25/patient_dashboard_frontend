import React from 'react'
import PriorAuthorizationForm from '../components/PriorAuthorizationForm'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'

const PriorAuthorization = () => {
    const {state} = useLocation()
    const {id, name} = state || {}
  return (
    <>
        <div>
            <Header title={'Prior Authorization Request'}/>
            <PriorAuthorizationForm patientId = {id} name = {name}/>
        </div>
    </>
  )
}

export default PriorAuthorization