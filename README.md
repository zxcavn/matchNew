# xfi.console.front

Project technology stack
`Next v13, material-ui v5, typescript, redux-thunk, redux-toolkit`

## How to run the project:

1. Install dependencies

```bash
yarn
```

2. Create `.env` file  from env.dist

3. Starts up dev server with live updates

```bash
yarn dev
```

Project will start on [localhost:3000](http://localhost:3000)

## File structure:

```
- components   // all components
  |-- atoms                 // labels, buttons, inputs, etc.
      |-- [component name]  // component directory
          |-- index.tsx     // component logic
          |-- styles.ts     // component styles
      |-- index.tsx         // export atoms
  |-- molecules             // tangible UI elements such as search forms
      |-- [component name] // component directory
          |-- index.tsx    // component logic
          |-- styles.ts    // component styles
      |-- index.tsx        // export molecules
  |-- organisms            // complex structures
      |-- [component name] //component directory
          |-- index.tsx    // component logic
          |-- styles.ts    // component styles
      |-- index.tsx        // export organisms
- helpers        // common constants, enums types
- hocs           // high order components
- hooks          // react hooks
- lib            // internationalisation, MUI theme file
- pages          // app pages
- public         // shared media, fonts
- crud           // api requests and config
- services       // complex utils
- shared         // common constants, types
  |-- constants  // common constants
  |-- types      // common types
- store          // redux store
- styles         // common styles
  |-- fonsts.scss    // project fonts
  |-- globals.scss   // common styles
  |-- reset.scss     // reset brouser styles
```


## Coding Conventions:

- [Figma](https://www.figma.com/file/oiP0tGSKYNwwT4kh0sGuXw/console.mineplex.io?node-id=130%3A14977&mode=dev)
- [JS Rules](https://confluence.fasttech.dev/display/MIN/UI+JS+Rules)
- [Git naming](https://confluence.fasttech.dev/display/MIN/Git+naming)
- [Variables naming](https://confluence.fasttech.dev/display/MIN/Variables+naming)
- [HTML + CSS Ruses](https://codeguide.academy/html-css.html)
- [React JSX by Airbnb](https://codeguide.academy/html-css.html)

## F.A.Q.

### WebStorm does not understand paths from the root (cannot resolve directory)

Open `File > Settings > Directories` click on `src` in the tree and put the label `Resource Root`

### How to set up auto-formatting of code in WebStorm?

Install the `JavaScript and TypeScript` plugin. Open `Setting > Keymap > Plugins > JavaScript and TypeScript > Fix ESLint Problems` double click on `Fix ESLint Problems` and assign a combination (for example `Ctrl + Alt + ;`).

### How to set up auto-formatting of code in VSCode?

Install the `ESLint` plugin. Open `Setting > Workspace > Extensions > ESLint`. Turn on the checkboxes about "enable". Perhaps we restart VSCode (or maybe it will work). Use the combination `Alt + Shift + F` to format the code.


## Break character (LF / CRLF)

The default line break is LF. If you are using Windows you need to go to

```
./git/config
```

and make sure autocorrect migration is disabled (autocrlf)

```
[core]
     autocrlf=false
```

Also in WebStorm you need to go to `Setting / Editor / Code Style` and enable `Line separator` in position `Unix and macOS (\n)`.

If by now GIT has managed to fix the breaks in all files, run `nmp run js:fix`

## Create simple test file

### testing React components
```
// Icon.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './index';

describe('Test Icon component', () => {
  test('# component should be rendered in the document', () => {
    render(<Icon src={MpxIcon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
```

### testing util functions
```
// pow.test.ts
const pow = (base: number, exponent = 2) => Math.pow(base, exponent);

describe('Simple test', () => {
  test('test util', () => {
    expect(pow(2)).toBe(4);
    expect(pow(3)).toBe(9);
  });
});

