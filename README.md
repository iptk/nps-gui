# About this project
NPS-GUI is a web-client for the [Neuroimage Processing System (NPS)](https://github.com/neuro/nps). It is build using React, react-toolbox and Redux to provide a responsive user interface with minimal server load.

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
  > yarn run build
  > # or let webpack watch your files for automatic building
  > yarn run watch
```

# 3rd-party stuff that is not a handled dependency
- [Material Design Icons by Google](http://google.github.io/material-design-icons/#getting-icons) (Apache License Version 2.0)
