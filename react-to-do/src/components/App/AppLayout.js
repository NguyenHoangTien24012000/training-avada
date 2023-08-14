import { Frame } from '@shopify/polaris'
import React from 'react'
import TopBarMarkup from './TopBarMarkup'

export default function AppLayout({children}) {
  return (
    <Frame topBar={<TopBarMarkup></TopBarMarkup>}>
        {children}
        
    </Frame>
  )
}
