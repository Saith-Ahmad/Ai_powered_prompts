'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";

export const Nav = () => {
  const { data : session } = useSession();
  const [providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown ] = useState(false);

  useEffect(()=>{
    const setUpproviders =async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpproviders();
  }, [])
  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image src={'/assets/images/logo.svg'} alt="logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">Promtopia</p>
      </Link>


      {/* Desktop Menu */}
      <div className="sm:flex hidden gap-3 md:gap-5">
        {
          session?.user ?
            (
            <>
            <Link href={'/create-prompt'} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Signout
            </button>

            <Link href={"/profile"}>
              <Image src={session?.user.image} width={37} height={37} alt="profile" className="rounded-full"/>
            </Link>
            </>
            )
            : (
              <>
              {
                providers && Object.values(providers).map((provider)=>(
                  <button type="button" key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
                    Sign In
                  </button>
                ))
              }
              </>
            )
        }
      </div>


      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex ">
              <Image src={session?.user.image} width={37} height={37} alt="profile" className="rounded-full"
              onClick={()=>setToggleDropdown((prev)=>!prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href={'/profile'} className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                  My Profile
                  </Link>
                  <Link href={'/create-prompt'} className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                  Create Promt
                  </Link>
                  <button type="button" className="mt-5 w-full black_btn" 
                  onClick={()=>{
                    signOut();
                    setToggleDropdown(false)
                  }}>
                    Signout
                  </button>
                </div>
              )}
            </div>
          ):(
            <>
             {
                providers && Object.values(providers).map((provider)=>(
                  <button type="button" key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}
