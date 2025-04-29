# Movie Database using React

This helps users find their next movie to watch by showing helpful stats

- Users can see the top 10 latest movies on the front page
- Users can scroll down to see all the other movies (100 max at the moment) according to their release date
- Users can click on any movie to go into the movie details where they can see the ratings, description and actors

# Instructions
In order to run app locally:

- Clone repo and open in IDE.
- Run `npm i` in IDE terminal.
- You will need a TMDB account in order to generate an API Token which can be used for the requests.
- Create an account [here](https://www.themoviedb.org/signup)
- Once you have created and logged into your account, click on your profile icon to launch dropdown menu and then click on `API subscription` or navigate directly to [this link](https://www.themoviedb.org/subscription?language=en-CA)
- Register for a new API Key
- Add a .env.local file in the project root and copy your API Token into a variable called `VITE_TMDB_API_TOKEN` which should look like `VITE_TMDB_API_TOKEN=${API_TOKEN}`
- Run `npm run dev` to boot up app.

#TO-DOs
- Implement pagination
- Implement authentication
- Allow watchlist creation + reviews
- Add UI testing using playwright
- Clean up UI (better design + add responsiveness)
- Implement better error handling