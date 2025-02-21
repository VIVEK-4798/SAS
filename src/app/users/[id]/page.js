import UserTabs from '@/components/layout/UserTabs'
import React from 'react'

const EditUserPage = () => {
  return (
    <section className='mt-8 mx-auto max-w-2xl'>
        <UserTabs isAdmin={true}/>
    </section>
  )
}

export default EditUserPage