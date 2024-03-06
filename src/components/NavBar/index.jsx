import React from 'react'
import Link from 'next/link'
import IconTwitterX from '~icons/ri/twitter-x-line'
import IconGithub from '~icons/ri/github-line'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Demos', href: '/demos' },
  { name: 'About', href: '/about' },
]


export default function NavBar() {
  return <header className="z-50 bg-white">
    <nav className="flex items-center justify-between p-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex gap-x-6 justify-end">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm leading-6 opacity-60 transition-opacity ease-linear duration-200 hover:opacity-100">
              {item.name}
            </Link>
          ))}
          <a href="https://twitter.com/" target="_blank" title="Twitter" className="text-sm opacity-60 transition-opacity ease-linear duration-200 hover:opacity-100">
            <IconTwitterX className="inline-block"  />
          </a>
          <a href="https://github.com/" target="_blank" title="Github" className="text-sm opacity-60 transition-opacity ease-linear duration-200 hover:opacity-100">
            <IconGithub  className="inline-block" />
          </a>
        </div>
      </nav>
  </header>
}
