import Centered from '../../layouts/centered'
import Link from 'next/link'

const Card = ({ title, totalMeg }) => {
  return (
    <>
    <div className='flex flex-col w-full mb-4 lg:w-1/4 '>
    <div className='card bg-white shadow-lg py-4'>
    <div className="title text-sm font-base font-bold font-poppins  text-center mb-4"> { title }</div>
      

      <div className="flex flex-col items-center justify-center">
      <h5 className="text-base text-secondary mb-4 text-center">
            { totalMeg }
      </h5>
      </div>

    
      </div>
      </div>
    </>
  )
}

export default Card
