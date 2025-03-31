import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    
    <Layout title ={" Privacy Policy - ShopEase"}>
        <div>

        <section className="bg-gray-100 shadow-lg rounded-md my-3">
  <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <div className="max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Privacy policy</h2>
        <p className="mt-4 text-gray-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
          Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
          malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
        <div className="mt-8">
         
        </div>
      </div>
      <div className="mt-12 md:mt-0">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9saWN5fGVufDB8fDB8fHww" alt="Policy" className="object-cover rounded-lg shadow-md" />
      </div>
    </div>
  </div>
</section>

        </div>
        </Layout>
  )
}

export default Policy