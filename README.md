# usu-optt-forms
A collection of online web forms to faciliate easy record keeping on USU OPTT students.

## Requirements
This project is built using [Node](https://nodejs.org/en/) via `npm`. Make sure you have this installed, then run
```
git clone https://github.com/jarenglenn/usu-optt-forms.git
cd usu-optt-forms
npm install
```

## Development
To start up a development server, run

```
npm run dev
```

## Deployment
To build the project, run the `generateZip` deployment script.

```
python generateZip.py
```

*Note: This script runs switches to each form using `app/webpack/currentForm.ts` and builds the project for each one via `npm run build`. Additionally it creates a `production.zip` archive for ease of use.*

You'll then need to SSH into USU's servers and replace the current files with the new versions stored in `dist/structure`. Contact your supervisor to get access.

## Documentation

More detailed documentation can be found in the `docs` folder.
