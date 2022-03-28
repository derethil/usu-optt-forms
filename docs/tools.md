This page serves as a guide to the tools and packages used to create the forms. Documentation for each of these will not be provided as their individual documentation will be much more thorough and helpful than anything written here.

## Language

This project was built from the ground up in [TypeScript](https://www.typescriptlang.org/) rather than JavaScript. This makes some aspects of development more tedious, but as projects grow larger they become easier to deal with especially when it comes to state management. Most other packages used in this project have great Typescript support (with the exception of `jspdf`).

## Framework

This project uses [React](https://reactjs.org/) which is a fantastic framework that is well suited to this type of application. These fairly complex data-heavy forms are extremely easy to manage with React's state management system.

### Datepicker

Note that [React Datepicker](https://reactdatepicker.com/) provides the date selection component used on the Home page.

## State Management

[Redux Toolkit](https://redux-toolkit.js.org/) is used for almost all state management for this project. The main motivation behind this was to avoid passing many, many props throughout the application. In this sort of application it simplifies things a lot when compared to the normal React Hooks.

## Styling

[Styled Components](https://styled-components.com/) make it very easy to style React applications in a more modular fashion and allow easier control over styles via JavaScript/TypeScript. Some regular `css` files are imported to `index.html` but those are mostly externally provided. For instance for `react-datepicker` to work properly they need to import one; Google Fonts and Font Awesome both require importing one as well to work offline.

### Icons

[Font Awesome](https://fontawesome.com/) is a fantastic resource for icons and while not many are actually used in this project it comes in handy.

## Routing

[React Router](https://reactrouter.com/) is used for routing between "pages", making the project a single web page React application. Passing data around between multiple pages would be much more complex. In addition React Router has the [HashRouter](https://v5.reactrouter.com/web/api/HashRouter) which, while not being as advanced as the default `BrowserRouter`, makes it possible to use the forms as static files. This is needed for the offline version of the forms.

## PDF Generation

[jsPDF](https://github.com/parallax/jsPDF) allows for easy generation and saving of the PDFs and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) makes table generation extremely simple.

One thing to note about these two packages: while they do work with TypeScript (especially `jsPDF-AutoTable`) sometimes it can be a little weird to get it working properly. Read the docs thoroughly if you need to make any large changes.
