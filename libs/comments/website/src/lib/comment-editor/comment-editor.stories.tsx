import {action} from '@storybook/addon-actions'
import {Meta, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'
import {CommentEditor} from './comment-editor'
import {ComponentType} from 'react'
import {SessionTokenContext} from '@wepublish/authentication/website'
import {ApolloError} from '@apollo/client'
import {challenge} from '@wepublish/testing/fixtures/graphql'

export default {
  component: CommentEditor,
  title: 'Components/Comment Editor'
} as Meta

const WithUserDecorator = (Story: ComponentType) => {
  return (
    <SessionTokenContext.Provider
      value={[
        {} as any,
        true,
        () => {
          /* do nothing */
        }
      ]}>
      <Story />
    </SessionTokenContext.Provider>
  )
}

const fillComment: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)

  const input = canvas.getByLabelText('Kommentar', {
    selector: 'textarea'
  })

  await step('Enter Comment', async () => {
    await userEvent.click(input)
    await userEvent.type(input, 'Lorem Ipsum')
  })
}

const fillName: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)

  const input = canvas.getByLabelText('Name', {
    selector: 'input'
  })

  await step('Enter Name', async () => {
    await userEvent.click(input)
    await userEvent.type(input, 'Foo')
  })
}

const fillTitle: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)

  const input = canvas.getByLabelText('Titel', {
    selector: 'input'
  })

  await step('Enter Title', async () => {
    await userEvent.click(input)
    await userEvent.type(input, 'Foobar')
  })
}

const fillCaptcha: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)

  const input = canvas.getByLabelText('Captcha', {
    selector: 'input'
  })

  await step('Enter captcha', async () => {
    await userEvent.click(input)
    await userEvent.type(input, '1')
  })
}

const clickSubmit: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)
  const submitButton = canvas.getByText('Kommentieren')

  await step('Submit form', async () => {
    await userEvent.click(submitButton)
  })
}

const clickCancel: StoryObj['play'] = async ({canvasElement, step}) => {
  const canvas = within(canvasElement)
  const cancelButton = canvas.getByText('Abbrechen')

  await step('Cancel form', async () => {
    await userEvent.click(cancelButton)
  })
}

const fillLoggedIn: StoryObj['play'] = async ctx => {
  await fillTitle(ctx)
  await fillComment(ctx)
  await clickSubmit(ctx)
}

const fillAnonymous: StoryObj['play'] = async ctx => {
  await fillTitle(ctx)
  await fillComment(ctx)
  await fillName(ctx)
  await fillCaptcha(ctx)
  await clickSubmit(ctx)
}

export const Anonymous = {
  args: {
    maxCommentLength: 1000,
    onCancel: action('onCancel'),
    onSubmit: action('onSubmit'),
    challenge: {
      data: {
        challenge
      }
    }
  }
}

export const AnonymousFilled: StoryObj = {
  ...Anonymous,
  play: fillAnonymous
}

export const AnonymousInvalid: StoryObj = {
  ...Anonymous,
  play: async ctx => {
    await clickSubmit(ctx)
  }
}

export const LoggedIn: StoryObj = {
  args: {
    ...Anonymous.args,
    challenge: null
  },
  decorators: [WithUserDecorator]
}

export const LoggedInFilled: StoryObj = {
  ...LoggedIn,
  play: fillLoggedIn
}

export const LoggedInInvalid: StoryObj = {
  ...LoggedIn,
  play: async ctx => {
    await clickSubmit(ctx)
  }
}

export const Cancel: StoryObj = {
  ...Anonymous,
  play: async ctx => {
    await fillTitle(ctx)
    await clickCancel(ctx)
  }
}

export const WithChallengeError: StoryObj = {
  args: {
    ...Anonymous.args,
    challenge: {
      error: new ApolloError({
        errorMessage: 'Something went wrong with the captcha.'
      })
    }
  }
}

export const WithError: StoryObj = {
  args: {
    ...Anonymous.args,
    error: new ApolloError({
      errorMessage: 'Something went wrong.'
    })
  },
  play: fillAnonymous
}
