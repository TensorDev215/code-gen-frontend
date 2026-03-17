import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Define types for form data
interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

// Define types for errors
interface Errors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeTerms?: string
  general?: string
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

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

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
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

    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.name,
          gmail: formData.email,
          password: formData.password
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate code')
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      setErrors({
        general: 'Signup failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle social signup with proper typing
  const handleSocialSignup = (provider: 'Google' | 'GitHub') => {
    console.log(`Signing up with ${provider}`)
    // Implement social signup logic here
  }

  return (
    <div className='min-h-screen flex items-center font-body justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='inline-flex items-center gap-3 cursor-pointer no-underline'>
            <img src='images/logo.png' alt='logo' className='w-5' />
            <h1 className='font-title font-bold text-xl text-darkBlue'>CodeGen</h1>
          </Link>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center'>{errors.general}</div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label htmlFor='name' className='block text-gray-700 text-sm font-medium mb-2'>
              Full Name
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>👤</span>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 border border-solid border-gray rounded-full outline-none transition-all box-border
                  ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }
                  ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
              />
            </div>
            {errors.name && <span className='text-red-500 text-xs mt-1 block'>{errors.name}</span>}
          </div>

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
                placeholder='Create a password'
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
                className='absolute right-3 border-none bg-white top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10'
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className='text-red-500 text-xs mt-1 block'>{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-medium mb-2'>
              Confirm Password
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10'>🔒</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
                disabled={isLoading}
                className={`w-full pl-10 pr-12 py-3 border border-solid border-gray rounded-full outline-none transition-all box-border
                  ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }
                  ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 border-none bg-white  transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10'
                disabled={isLoading}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className='text-red-500 text-xs mt-1 block'>{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className='flex items-start'>
            <label className='flex items-center cursor-pointer'>
              <input
                type='checkbox'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={isLoading}
                className='w-4 h-4 mt-1 text-blue-600 border border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='ml-2 text-sm text-gray-600'>
                I agree to the{' '}
                <a href='/terms' className='text-blue-600 hover:text-blue-800 hover:underline'>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href='/privacy' className='text-blue-600 hover:text-blue-800 hover:underline'>
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
          {errors.agreeTerms && <span className='text-red-500 text-xs mt-1 block'>{errors.agreeTerms}</span>}

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3 px-4 border-none rounded-full text-white bg-blue font-semibold transition-all box-border mt-6
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
                Creating account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Social Signup */}
        <div className='mt-8'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>Or sign up with</span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button
              onClick={() => handleSocialSignup('Google')}
              disabled={isLoading}
              className='w-full py-3 px-4 border border-solid border-gray rounded-full text-gray-700 font-medium 
                       hover:border-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 box-border'
            >
              <span className='font-bold'>G</span>
              Google
            </button>
            <button
              onClick={() => handleSocialSignup('GitHub')}
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

        {/* Sign In Link */}
        <p className='mt-8 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/signin' className='text-blue hover:text-darkBlue font-semibold hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
