import React from 'react'
import classes from './navbar.module.css'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Navbar = () => {
  const { data: session } = useSession()

  const isLoggedIn = Boolean(session?.user)
  console.log(isLoggedIn)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link href='/' className={classes.left}>
          <h2>WebDevMania</h2>
        </Link>
        <div className={classes.right}>
          {isLoggedIn ? (
            <button onClick={() => signOut()} className={classes.logoutButton}>
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => signIn()} className={classes.login}>
                Log in
              </button>
              <Link href='/register' className={classes.register}>
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link href='/cart' className={classes.cartContainer}>
              <AiOutlineShoppingCart className={classes.cartIcon} />
              <span className={classes.cartQuantity}>0</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
