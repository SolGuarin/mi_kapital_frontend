# cinco_lukas_frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Installation First Time

1. Remove the node_modules folder if exists
2. Run ```npm install --legacy-peer-deps```
3. Run ```npm run serve```



### Docker Local
````
docker build -t mi-kapital-frontend .
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 mi-kapital-frontend
````


### Docker Deploy
````
git push heroku main

````
