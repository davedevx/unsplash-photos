# Unsplash Photos

You can get a list of popular/latest/oldest photos or search by keyword using [Unsplash's](https://unsplash.com/) [API](https://unsplash.com/developers) and [unsplash-js](https://github.com/unsplash/unsplash-js) library.

This app is built with [NodeJS](https://nodejs.org/en/) / [Express](https://expressjs.com/), and [React](https://reactjs.org/) with [Create React App](https://github.com/facebook/create-react-app) and is fully responsive.

Styles are by [Bulma](https://bulma.io/) and [Ant Design](https://ant.design/).

You can configure some app settings via **.env**:
- **PHOTOS_PER_PAGE** (number of images during search, max: 30)
- **UNSPLASH_CLIENT_ID** (head over to this [page](https://unsplash.com/documentation#creating-a-developer-account), create a developer account and paste your **Client-ID**)

## Installation

```sh
$ git clone https://github.com/daveedx/unsplash-photos.git
$ cd unsplash-photos
$ yarn install
```
Start server (NodeJS / Express) by:
```sh
$ yarn run server
```
then open a separate terminal and start client (React) app by:
```sh
$ yarn start
```

## Usage
Server runs on port 8080.
Client app runs on port 3000 by default. If this port is in use by another app, you will see what port is used instead.

Once Client app is ready, it opens http://localhost:3000/ in your browser.

On the homepage you can see the most popular photos from Unsplash. You can change the selection by changing **Order by** to 'Popular / Latest / Oldest'.

On the search page (you can find in in the menu) once you enter a keyword and hit enter, you will find photos loaded from Unsplash regarding to the keyword you have entered before. Pagination is handled by a button (Load more...) which loads another portion of photos.
