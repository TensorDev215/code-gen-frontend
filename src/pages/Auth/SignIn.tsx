import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Define types for form data
interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

// Define types for errors
interface Errors {
  email?: string
  password?: string
  general?: string
}

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Handle input changes with proper typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Clear error for this field when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // Validate form
  const validateForm = (): Errors => {
    const newErrors: Errors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gmail: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const detail = data.detail || 'Login failed'
        throw new Error(detail)
      }

      console.log(data)
      setErrors({})
    } catch (error: any) {
      setErrors({
        general: error.message || 'Signup failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle social login with proper typing
  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    console.log(`Logging in with ${provider}`)
    // Implement social login logic here
  }

  return (
    <div className='min-h-screen flex items-center font-body justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='inline-flex items-center gap-3 h-6 cursor-pointer no-underline'>
            <img src='images/logo.png' alt='logo' className='w-5' />
            <h1 className='font-title font-bold text-xl text-darkBlue'>CodeGen</h1>
          </Link>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center'>{errors.general}</div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-gray-700 text-sm font-medium mb-2'>
              Email Address
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>📧</span>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 border border-solid border-gray rounded-full outline-none transition-all box-border
                  ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }
                  ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
              />
            </div>
            {errors.email && <span className='text-red-500 text-xs mt-1 block'>{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor='password' className='block text-gray-700 text-sm font-medium mb-2'>
              Password
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                disabled={isLoading}
                className={`w-full pl-10 pr-12 py-3 border border-solid border-gray rounded-full outline-none transition-all box-border
                  ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }
                  ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform bg-white border-none -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10'
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className='text-red-500 text-xs mt-1 block'>{errors.password}</span>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className='flex items-center justify-between'>
            <label className='flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='rememberMe'
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className='w-4 h-4 text-blue-600 border border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-600'>Remember me</span>
            </label>
            <a href='/forgot-password' className='text-sm text-blue-600 hover:text-blue-800 hover:underline'>
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-full border-none bg-blue text-white font-semibold transition-all box-border
              ${
                isLoading
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className='mt-8'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>Or continue with</span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className='w-full py-3 px-4 border border-solid border-gray rounded-full text-gray-700 font-medium 
                       hover:border-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 box-border'
            >
              <span className='font-bold'>G</span>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
              className='w-full py-3 px-4 border border-solid border-gray rounded-full text-gray-700 font-medium 
                       hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 box-border'
            >
              <span className='font-bold'>GH</span>
              GitHub
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className='mt-8 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <a href='/signup' className='text-blue hover:text-darkBlue font-semibold hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signin
