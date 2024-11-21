import Link from 'next/link'
import React from 'react'

const header = () => {
  return (
    <header>
        {/* <img src='../public/pizzeria-logo.jpg'/> */}
        <Link  href="">Pizzeria</Link>
        <nav>
            <Link href={''}>Home</Link>
            <Link href={''}>Menu</Link>
            <Link href={''}>About</Link>
            <Link href={''}>Contact</Link>
            <Link href={''}>Login</Link>
        </nav>
    </header>
  )
}

export default header