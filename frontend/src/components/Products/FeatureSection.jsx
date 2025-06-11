import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeatureSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 text-center gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiShoppingBag className='text-xl'/>
                </div>
                <p className='mb-2 uppercase tracking-tighter'>Free International Shipping</p>
                <p className='text-gray-600'>
                    on All orders over $100.00
                </p>
            </div>
            {/* Feature 2 */}
             <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiArrowPathRoundedSquare className='text-xl'/>
                </div>
                <p className='mb-2 uppercase tracking-tighter'>45 days return</p>
                <p className='text-gray-600'>
                    Money back gaurantee
                </p>
            </div>
            {/* Feature 3 */}
             <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiOutlineCreditCard className='text-xl'/>
                </div>
                <p className='mb-2 uppercase tracking-tighter'>Secure Checkout</p>
                <p className='text-gray-600'>
                    100% secure checkout process
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeatureSection