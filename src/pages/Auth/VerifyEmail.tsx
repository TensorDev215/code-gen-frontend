import React, { useState } from 'react'

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const email = localStorage.getItem('verifyEmail')

  const handleVerify = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('http://localhost:8000/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.detail)

      setSuccess('Email verified successfully')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Verify Email</h2>

        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder='Enter 6-digit code'
          className='w-full border p-2 rounded mb-4'
        />

        <button onClick={handleVerify} disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded'>
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        {error && <p className='text-red-500 mt-2'>{error}</p>}
        {success && <p className='text-green-500 mt-2'>{success}</p>}
      </div>
    </div>
  )
}

export default VerifyEmail
