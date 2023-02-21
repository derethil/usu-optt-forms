This page serves as a guide to the tools and packages used to create the forms. Documentation for each of these will not be provided as their individual documentation will be much more thorough and helpful than anything written here.

## Language

TypeScript was chosen to build this project with over JavaScript since it solves SO many type issues. It's not too different than JavaScript, but it requires more thinking.

## Framework

[React](https://reactjs.org/) is used as the major framework for this application.

### Datepicker

[React Datepicker](https://reactdatepicker.com/) provides the date selection component.

## State Management

[Redux Toolkit](https://redux-toolkit.js.org/) is used for almost all state management for this project.

## Styling

[Styled Components](https://styled-components.com/) is used in most cases to style the application. Some regular `css` files are imported to `index.html` but these are mostly externally provided. For instance for `react-datepicker` to work properly they need to import one; Google Fonts and Font Awesome both require importing one as well to work offline.

### Icons

[Font Awesome](https://fontawesome.com/) is used for the few icons this project uses.

## Routing

[React Router](https://reactrouter.com/) is used for routing between "pages". We use React Router's [HashRouter](https://v5.reactrouter.com/web/api/HashRouter) which, while not being as advanced as the default `BrowserRouter`, makes it possible to use the forms as static files. This is needed for the offline version of the forms.

## PDF Generation

[jsPDF](https://github.com/parallax/jsPDF) allows for easy generation and saving of the PDFs and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) makes table generation extremely simple.

One thing to note about these two packages: while they do work with TypeScript (especially `jsPDF-AutoTable`) sometimes it can be a little weird to get it working properly. Read the docs thoroughly if you need to make any large changes.
