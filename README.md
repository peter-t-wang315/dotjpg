## Install Dependencies

`npm install`

- This should download all of your needed dependencies right into `node_modules`

## Setup database
- Run ` npx prisma db push ` to update the DB to the latest schema. This will need to be done before running the app
- To get images, run `python3 get_image_blobs.py`. This should take a few minutes to finish running. This will only load the first 200 images

## Run The App

`npm run dev`

- This will build the NextJS application for you
- Go to `localhost:3000` and it should direct you to the main page
- For convinience, an admin user has been provided with credentials admin@example.com:admin
