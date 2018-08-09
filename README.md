# About this project
NPS-GUI is a web-client for the [Neuroimage Processing System (NPS)](https://github.com/neuro/nps). It is build using React, material-ui and Redux to provide a responsive user interface with minimal server load.

# Configuration
The `conf`-directory contains all files used to configure the client. Please duplicate the `*.default.json` file to remove the `.default` and adjust them to your needs. `*.default.json` are used as a fallback.

file | description
--- | ---
npscustom | customization of the appearance of the surface
npsdefaults | default values for inputs
srvlist | server/s to use
theme | surface-theme. See [material-ui documentation](https://material-ui.com/customization/themes/#theme-provider) for more information

# Using docker-image
`nps-gui` is the docker image. See _Developing nps-gui_.
```bash
  > # minimal with mapping to port 80
  > docker run -p80:80 nps-gui
  > # as a custom-named container and as a daemon
  > docker run --name npsgui -p80:80 -dit nps-gui
```

# Developing nps-gui
Initial container creation:
```bash
  > # build docker image
  > docker build -t nps-gui .
  > # install dependencies before running the container
  > docker run --rm -it -v/path/to/repo:/app node:9.3 cd /app && yarn install
  > # run docker image with repository mounted
  > docker run --name npsgui -p80:80 -v/path/to/repo:/app -dit nps-gui
```

While developing you might want to (re-)pack your js-files. At first enter your container with
```bash
  > docker exec -it npsgui bash
```
Inside your container (with working directory `/app`) run:
```bash
  > # pack js-files one single time (using webpack)
  > yarn run build # webpack -p
  > # pack js-files in dev-mode (devtools source-mapping)
  > yarn run build-dev # webpack --devtool source-map
  > # or let webpack watch your files for automatic building
  > yarn run watch # webpack -p --watch
  > # in dev-mode
  > yarn run watch-dev # webpack --watch --devtool source-map
```

# 3rd-party stuff that is not a handled dependency
- [Material Design Icons by Google](http://google.github.io/material-design-icons/#getting-icons) (Apache License Version 2.0)
