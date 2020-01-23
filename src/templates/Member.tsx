import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { IMember, Subset } from '../shared/Icons/types'
import {
  Section,
  H1,
  P,
  Tags,
  GitHubIcon,
  LinkedInIcon,
  LinkIcon,
  Row,
  Col,
  BookOpenIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  MediumContainer,
  Card,
  HR,
} from '../shared'
import {
  M2,
  BORDER_RADIUS,
  M1,
  M3,
  maxWidth,
  PHONE,
  M4,
  minWidth,
  DESKTOP,
  TABLET,
} from '../constants/measurements'
import { DARK_GRAY } from '../constants/colors'

type ILinks = Subset<
  IMember,
  {
    github?: string
    linkedin?: string
    website?: string
  }
>

const LinksTag = styled.div<{}>`
  a {
    color: ${DARK_GRAY} !important;
    opacity: 0.5;
    margin-right: ${M2};
    transform: scale(0.8);

    svg {
      stroke-width: 1.8px;
    }

    :hover,
    :focus,
    :active {
      opacity: 0.75;
    }
  }
`

const StyledCard = styled(Card)<{}>`
  padding: ${M4};
  margin-top: ${M2};

  ${minWidth(DESKTOP)} {
    margin-top: 7.5vh;
  }

  ${maxWidth(PHONE)} {
    padding: ${M2};
  }
`

const Links = ({ github, linkedin, website }: ILinks) => (
  <LinksTag>
    {github && (
      <a href={github} target="_BLANK">
        <GitHubIcon />
      </a>
    )}
    {linkedin && (
      <a href={linkedin} target="_BLANK">
        <LinkedInIcon />
      </a>
    )}
    {website && (
      <a href={website} target="_BLANK">
        <LinkIcon />
      </a>
    )}
  </LinksTag>
)

const ProfilePicture = styled.div<{ src: string }>`
  height: 10.4rem;
  width: 10.4rem;
  margin-right: ${M2};
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 0;

  ${maxWidth(DESKTOP)} {
    margin-bottom: ${M3};
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    height: auto;
    padding-top: 100%;
    margin-right: 0;
  }

  ${minWidth(DESKTOP)} {
    margin-right: ${M4};
  }
`

interface IMemberTemplateProps {
  data: {
    member: IMember
  }
}

const Detail = ({ text, Icon }) => {
  if (!text) return null
  return (
    <Col sm={12} margin={M1}>
      <Icon
        style={{
          transform: 'scale(0.8)',
          position: 'absolute',
          color: DARK_GRAY,
          opacity: 0.8,
          marginTop: '-2px',
        }}
      />
      <P sm style={{ marginLeft: M4 }} mb2>
        {text}
      </P>
    </Col>
  )
}

const Studies = ({ major, school }: { major?: string; school?: string }) => {
  const getStudiesText = (): string | null => {
    if (!major && !school) return null
    if (!major) return `Studies in ${school}`
    if (!school) return `Studies ${major}`
    return `Studies ${major} in ${school}`
  }

  return <Detail text={getStudiesText()} Icon={BookOpenIcon} />
}

const MemberTemplate = ({ data }: IMemberTemplateProps) => {
  const {
    member: {
      bio,
      github,
      graduation_year: gradYear,
      linkedin,
      location,
      photo,
      roles,
      student: { name, major, school },
      team,
      website,
      year_joined: yearJoined,
    },
  } = data

  const roleNames = roles.map(({ name: roleName }) => roleName)

  return (
    <Layout>
      <SEO title={name} />
      <MediumContainer>
        <StyledCard shaded>
          <Row>
            {photo && <ProfilePicture src={photo} />}
            <Col flex>
              <div style={{ width: '100%', alignSelf: 'center' }}>
                <H1 mb2>{name}</H1>
                <div style={{ marginBottom: M1 }}>
                  <Tags tags={roleNames} />
                </div>
                <P mb2>Part of {team}</P>
                <Links github={github} linkedin={linkedin} website={website} />
              </div>
            </Col>
          </Row>
        </StyledCard>

        {bio && <div dangerouslySetInnerHTML={{ __html: bio }} />}

        <HR />

        <Row margin={M1}>
          <Studies major={major} school={school} />
          {location && <Detail text={`From ${location}`} Icon={HomeIcon} />}
          {yearJoined && (
            <Detail text={`Member since ${yearJoined}`} Icon={CalendarIcon} />
          )}
          {gradYear && (
            <Detail text={`Graduates in ${gradYear}`} Icon={LogOutIcon} />
          )}
        </Row>
      </MediumContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    member(id: { eq: $id }) {
      bio
      github
      graduation_year
      linkedin
      location
      photo
      roles {
        name
      }
      student {
        name
        major
        school
      }
      team
      website
      year_joined(formatString: "YYYY")
    }
  }
`

export default MemberTemplate