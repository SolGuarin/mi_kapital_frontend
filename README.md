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



### Docker
````
docker build -t mi-kapital-frontend .
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 mi-kapital-frontend
docker tag mi-kapital-frontend 321589623229.dkr.ecr.us-east-1.amazonaws.com/mi-kapital-frontend:0.0.1
docker push 321589623229.dkr.ecr.us-east-1.amazonaws.com/mi-kapital-frontend:0.0.1


aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 199585361222.dkr.ecr.us-east-1.amazonaws.com

````