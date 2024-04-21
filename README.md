## Install Dependencies

`npm install`

- This should download all of your needed dependencies right into `node_modules`
- You are now set to run things!

## Setup database
- Run ` npx prisma db push ` to update the DB to the latest schema. This will need to be done before running the app
- If you want images, run the `get_image_blobs.py` python script. This should take a few minutes to finish running

## Run The App

`npm run dev`

- This will build the NextJS application for you
- Go to `localhost:3000` and it should direct you to the main page
