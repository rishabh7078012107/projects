import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to our store — a space where style, comfort, and quality come together. 
We believe fashion should be simple, affordable, and accessible for everyone. 
Every product you see here is curated with care, keeping modern trends and real-world usability in mind.</p>
        <p>What started as a small idea has now grown into a collection loved by customers who value 
minimal design, premium feel, and everyday functionality. 
We focus on delivering products that not only look great but also stay with you for a long time.

</p>
        
        <b className='text-gray-800'>Our Mission </b>
        <p>Our mission is to bring a seamless shopping experience by offering high-quality products,
smooth delivery, and reliable support.  
We aim to build trust with every order and create a platform where customers feel confident and valued.
</p>
        </div>

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>
            Quality Asurance:
          </b>
          <p className='text-gray-600'>We carefully select every product to ensure it meets high standards of durability, comfort, and style.  
Our team checks materials, finishing, and fit so you always receive products worth your trust.
</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>
           Convenience:
          </b>
          <p className='text-gray-600'>Shop from anywhere, anytime — with easy navigation, secure checkout, and fast delivery.  
We keep the experience simple and hassle-free, so you can focus on what matters: choosing the right products.
</p>
        </div>


        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>
           Exceptional Customer Service:
          </b>
          <p className='text-gray-600'>Your satisfaction is our priority.  
Whether it's tracking your order, product queries, or after-purchase support —  
we are here to help quickly, politely, and effectively.
</p>
        </div>

        
      </div>
      <NewsletterBox/>
      
    </div>
  )
}

export default About
