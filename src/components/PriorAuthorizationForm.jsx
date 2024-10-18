import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function PriorAuthorizationForm({patientId, name}) {
  const { register, handleSubmit, formState : {errors} } = useForm();

  const navigate = useNavigate()


  const onSubmit = async (data) => {
    const formData = {...data, patientId}
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/prior-authorization`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error('Failed to submit authorization request');
        }

        const result = await response.json();

        alert('authorization request submitted successfully')

        navigate('/AuthorizationList')

    } catch (error) {
        console.error(`error submitting request \n ${error}`)
    }
  };

  return (
    <>
<div className="flex justify-center items-center min-h-screen bg-blue-100">
    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        {/* <h2>Prior Authorization Request</h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="flex flex-col">
                <label className="mb-1">Patient Name</label>
                <input 
                type="text" value={name} readOnly className="border p-2 rounded bg-gray-100" 
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1">Treatment Type</label>
                <input type="text" {...register('treatmentType', { required: 'Treatment type is required' })} className="border p-2 rounded"/>
                {errors.treatmentType && <p className="text-red-600">{errors.treatmentType.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1">Insurance Plan</label>
                <input type="text" {...register('insurancePlan', { required: 'Insurance plan is required' })} className="border p-2 rounded"/>
                {errors.insurancePlan && <p className="text-red-600">{errors.insurancePlan.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1">Date of Service</label>
                <input type="date" {...register('dateOfService', { required: 'Date of service is required' })} className="border p-2 rounded"/>
                {errors.dateOfService && <p className="text-red-600">{errors.dateOfService.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1">Diagnosis Code</label>
                <input type="text" {...register('diagnosisCode', { required: 'Diagnosis code is required' })} className="border p-2 rounded"/>
                {errors.diagnosisCode && <p className="text-red-600">{errors.diagnosisCode.message}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-1">Notes</label>
                <input type="text" {...register('notes', { required: 'Notes is required' })} className="border p-2 rounded"/>
                {errors.notes && <p className="text-red-600">{errors.notes.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">Submit</button>
        </form>
    </div>
</div>

    </>
  );
}

export default PriorAuthorizationForm;
