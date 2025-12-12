import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ClickSpark from '../../components/UI/ClickSpark'
//! HAVE TO MAKE IT RESPONSIVE

const ResetPassword = () => {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={10}
      duration={200}
    >
    <section className='ResetBlock'>
        <Navbar />
        <h1 className='text-9xl'>hello BROTHER</h1>
    </section>
    </ClickSpark>
  )
}

export default ResetPassword