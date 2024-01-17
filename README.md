# GenGuessr: Gendo Tech Task

Task instructions can be found [here](https://docs.google.com/document/d/1Sv_0liAbUFcOu9dK0m4UmJfFraB4k9Od4Yt9gnvlTXc/edit?usp=sharing). 

This repository was built using this [template](https://github.com/digitros/nextjs-fastapi).

## Requirements

* Node (developed using v20.8.0)
* Python (developed using 3.11.6)
* [pnpm](https://pnpm.io/)

## Usage

To install the required dependencies:

```
pnpm install
```

To start the application for local dev:

```
pnpm dev
```

The application will then be available at http://localhost:3000 and the API at http://localhost:8000.

Swagger docs for the API can be found at: http://localhost:8000/docs

To keep things simple for the task, `pnpm dev` starts both the Next application **and** the Python API (with hot reloading). You're welcome to add docker to the project and run them as two containers, if you'd prefer.