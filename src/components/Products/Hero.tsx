import React from 'react'
import styled from 'styled-components'
import { Hero } from '../../shared'

const productsPath = require('../../images/hero-products.svg') as string // tslint:disable-line

const Products = styled.img`
  width: 90%;
  margin-left: 5%;
  height: auto;
`

export const ProductsHero = () => {
  return (
    <Hero
      Image={<Products src={productsPath} />}
      title="Products"
      subtitle="From academics to campus life, to everything in between"
      body={`
        Our products are intended to solve everyday problems for you, so that
        you can focus on the more important parts of life at Penn.
      `}
    />
  )
}