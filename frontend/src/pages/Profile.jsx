import React from 'react'
import MyOrderPage from './MyOrderPage'

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <div className="flex-grow container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                {/* Left side */}
                <div className="w-full md:w-1/3 lg:w-1/4 shadow-lg rounded-lg p-8">
                    <h1 className='text-2xl md:text-3xl font-bold mb-4'>John Doe</h1>
                    <p className="text-lg text-gray-600 mb-4">john@example.com</p>
                    <button className='bg-red-500 text-white w-full font-semibold py-2 px-4 hover:bg-red-600 rounded-xl'>Log out</button>
                </div>
                {/* Right Section */}
                <div className=' w-full md:2/3 lg:3/4 shadow-lg'>
                    <MyOrderPage/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile