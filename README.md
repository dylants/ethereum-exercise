# Ethereum Exercise

A coding exercise to perform Ethereum operations

## Getting Started

_This app uses [bun](https://bun.sh/) for dependency management and script execution. Node version 20 was used in development._

Switch to Node version 20, optionally using [nvm](https://github.com/nvm-sh/nvm):

```
$ nvm use
```

Install dependencies

```
$ bun install
```

Start the application

```
$ bun dev
```

Browse to the application at: [http://localhost:3000/](http://localhost:3000/)

## Tests

Lint and Jest tests are available.

To run the tests:

```
$ bun run test
```

To run tests in watch mode:

```
$ bun run test:watch
```

To lint the project:

```
$ bun run lint
```

## ENS Lookup

Accepts an Ethereum address and performs an ENS lookup to display the following:

- The ENS domain
  - If not found, "Unknown" is displayed
- The ENS avatar
  - If one does not exist, a [jazzicon](https://github.com/mirshko/jazzicon-ts) is displayed (this wasn't directly mentioned in the design, but seemed appropriate?)
- The ETH balance
  - If not found, "Unknown balance" is displayed

### Example Ethereum addresses

- wevm.eth: `0xd2135CfB216b74109775236E36d4b433F1DF507B`
  - includes an ENS domain, avatar, and balance
- metamask.eth: `0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb`
  - includes an ENS domain and balance, but no avatar

### Technical Details

The EnsLookup component uses a combination of React hooks from [Wagmi](https://wagmi-xyz.vercel.app/react/api/hooks), and UI components from [shadcn](https://ui.shadcn.com/docs). A form accepts the Ethereum address, and if provided, the code uses that address to lookup the ENS domain name, avatar, and ETH balance. Loading states are shown while `isFetched` is not yet `true`.

### Concerns / Limitations

- There were multiple designs provided within the exercise description, one in the PDF and one in the Figma link. Both were similar, but implementation was done based on a "combination" of the two. Hope that's okay :)
- Prior to the lookup, there is no validation done on the Ethereum address provided as input by the user. It is expected to be valid. (Though the field is required.)
- In some situations, it has been observed that [useEnsAvatar](https://wagmi-xyz.vercel.app/react/api/hooks/useEnsAvatar) never returns when an avatar does not exist (so is in a continual state of loading). Not sure if this is a bug or an invalid Ethereum account.

### Given more time...

With more time, I would recommend:

- Resolving the design considerations/questions, if any
- Including the components in [Storybook](https://storybook.js.org/) for demo
- Include validation and/or error states
- Resolving the issue with the `useEnsAvatar` hook not responding
- Adding tests where appropriate, perhaps using [Playwright](https://playwright.dev/) as the test driver

## Wallet Lookup

Allows the user to connect a wallet. Once connected, uses the first address to lookup and display ENS data. Then allows the user to verify themselves by signing a message.

### Technical Details

The ConnectWallet component uses a similar combination of React hooks from Wagmi and UI components, along with a backend API. Once the wallet is connected, the EnsData UI component is displayed, similar to the ENS Lookup page. This flow is limited to only injected wallet types at this time (so MetaMask is available).

The verify user flow is an additional step the user must take (see more details in the notes below as to why). The UI prompts the user to sign a message, which is then sent to the backend `verify` API to process, and if successful, displays to the user they are verified.

### Concerns / Limitations

- Only the first wallet address is used
- The API call did not seem necessary to provide the ENS details since we're connecting a wallet? I discussed this in more detail in the Overall Notes section below.

### Given more time...

With more time, I would recommend:

- Addressing the same points mentioned above for the ENS Lookup page
- Resolving the API use case and user flow to determine how to best fit it in
- Include additional wallet types
- Add loading states when performing operations (while signing and verifying)
- Add Playwright tests for the UI flow
- Improve error handling

## Overall Notes

- I chose to use the Wagmi CLI to generate the application with a Next.js template. This seemed to be an easier way to get started, but was not specifically mentioned in the exercise notes.
- The first part of the exercise (ENS Lookup) was fairly straightforward. The difficulty (for me) was finding wallets to use in test. I used a couple online, but in practice I would probably work with product to make sure we're covering the use cases necessary.
- The second part of the exercise (Authentication) confused me. Having used the Wagmi CLI, I was immediately provided with a method to connect a wallet in the client. I was unsure as to why I would provide an API to validate the user when the wallet connect would do the same?
  - Additionally, I may have misunderstood, but it felt limiting to provide a validation API on the server, and use that true/false to determine if client code was to be run (since the user could manipulate the client code to skip that validation step). So instead perhaps the API should return the data rather than using hooks on the client after the validation is complete?
  - In the end, connecting the wallet was all that was necessary to display the ENS data. The verify API was used in a separate section just to display if the user was verified. Again, maybe I misunderstood?
