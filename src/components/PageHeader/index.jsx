import React from 'react'
import DesktopNav from './DesktopNav'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Demos', href: '/demos' },
  { name: 'About', href: '/about' },
]


export default function PageHeader() {
  return <header className="sticky top-0 z-50 bg-white">
    <DesktopNav navigation={navigation}  />
  </header>
}
