# Image Processing API

## About
This is a simple API built using Express to request jpeg images from the file system and to resize them using Sharp. Resizing will only take place if the image cannot be found in the cache.

## Objective
The server responds to the following request type:
* A GET request whose path contains three properties: filename (without extension), width, and height. All three properties are mandatory.
```sh 
$ GET /api/images?filename=santamonica&width=100&height=100
```
## Getting Started
Download this [file](https://github.com/LeaSak/ImageProcessingAPI) or 
```sh 
$ git clone https://github.com/LeaSak/ImageProcessingAPI
```
Run ```npm install```to get the project dependencies.

Included Images:
 - santamonica.jpg
 - palmtunnel.jpg
 - icelandwaterfall.jpg
 - fjord.jpg
 - encenadaport.jpg

Included Scripts:

 - Build: ```npm run build```
 - Lint: ```npm run lint```
 - Prettify: ```npm run prettier```
 - Run unit tests: ```npm run test```
 - Start server: ```npm run start```# Image Processing API
