# Gin

Spaced repetition learning web application

![image](https://github.com/etherbits/gin/assets/43289097/fcea0fde-0ab6-42fb-90dd-62f435f3f4e6)
![image](https://github.com/etherbits/gin/assets/43289097/8cbbcf77-715a-4587-b4ae-2094d83e6d20)

## Getting Started

First build the docker image using the Dockerfile:

```console
> docker build -t gin-docker .
```

Run the container and attach to it's shell:

```console
> docker run --name gin --rm -it -p 3000:3000 gin-docker sh
```

Finally you can use the scripts provided in the package.json.
Run a development server using:
```console
> npm run dev
(or)
> pnpm dev
(or an equivalent)
```
