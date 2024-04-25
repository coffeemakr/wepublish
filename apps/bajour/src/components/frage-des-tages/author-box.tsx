import {css} from '@emotion/react'
import {styled} from '@mui/material'
import {ApiV1, useWebsiteBuilder} from '@wepublish/website'
import {memo} from 'react'
import {MdPerson} from 'react-icons/md'

interface AuthorBoxProps {
  author: ApiV1.Author
  className?: string
}

const avatarStyles = css`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`

export const AuthorWrapper = styled('article')`
  display: grid;
  gap: ${({theme}) => theme.spacing(2)};
  background-color: ${({theme}) => theme.palette.common.white};
  padding: ${({theme}) => theme.spacing(1.5)};
  border-radius: ${({theme}) => theme.spacing(2.5)};
  color: ${({theme}) => theme.palette.primary.main};
`

export const AuthorHeader = styled('header')`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${({theme}) => theme.spacing(2)};
  align-items: center;
`

export const AuthorHeaderContent = styled('div')``

export const AuthorName = styled('div')`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: ${({theme}) => theme.spacing(1)};
  align-items: center;
  font-weight: ${({theme}) => theme.typography.fontWeightBold};
`

export const AuthorContent = styled('div')``

export const Moderation = styled('span')`
  font-size: 12px;
`

export const AuthorBox = memo(function AuthorBox({author, className}: AuthorBoxProps) {
  const {
    elements: {Image},
    blocks: {RichText}
  } = useWebsiteBuilder()

  const image = author?.image
  const name = author?.name
  const bio = author?.bio

  return (
    <AuthorWrapper className={className}>
      <AuthorHeader>
        {image && <Image image={image} square css={avatarStyles} />}
        {!image && <MdPerson css={avatarStyles} />}

        <AuthorHeaderContent>
          <AuthorName>{name}</AuthorName>

          <Moderation>Moderation</Moderation>
        </AuthorHeaderContent>
      </AuthorHeader>

      <AuthorContent>
        <RichText richText={bio ?? []} />
      </AuthorContent>
    </AuthorWrapper>
  )
})
