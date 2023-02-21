# usu-optt-forms

A collection of online web forms to faciliate easy record keeping on USU OPTT students.

## Requirements

This project is built using [Node](https://nodejs.org/en/) via `npm`.

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

Then open `http://localhost:8080/` to view your changes.

## Deployment

To deploy the project, first install the dependencies in `requirements.txt` using `pip`. This can be done either globally or in a virtual environment.

After the dependencies are installed, run `deploy.py`.

```
python deploy.py
```

_Note: You must have access to USU's servers when deploying this application. This means you need to be on campus or have an open VPN connection to the network._

## Documentation

More detailed documentation can be found on the documentation site at [https://jarenglenn.github.io/usu-optt-forms](https://jarenglenn.github.io/usu-optt-forms).
