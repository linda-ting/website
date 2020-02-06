import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { WideContainer } from '../shared'
import { ITeam } from '../types'
import { TeamHero } from '../components/Team/Hero'
import { Teams } from '../components/Team/Teams'

const AboutPage = (): React.ReactElement => {
  const {
    allTeam: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allTeam {
          edges {
            node {
              name
              description
              children {
                ... on Member {
                  id
                  student {
                    name
                  }
                  photo
                  url
                  year_joined(formatString: "YYYY")
                  roles {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  )

  const teams: ITeam[] = edges.map(({ node }) => node)

  return (
    <Layout>
      <SEO title="Team" />
      <WideContainer>
        <TeamHero />
        <Teams teams={teams} />
      </WideContainer>
    </Layout>
  )
}

export default AboutPage
