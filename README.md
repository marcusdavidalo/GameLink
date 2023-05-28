# GameLink

GameLink is a Game Database and Gaming News website developed as a project for the KodeGo Bootcamp. The website allows users to explore a wide range of games, read the latest gaming news, and stay up-to-date with the gaming industry.

## Features

- **Game Database**: GameLink utilizes the RAWG API to fetch game data, allowing users to search for games, view details such as release date, ratings, genres, and descriptions, and access additional information such as screenshots and videos.

- **Gaming News**: The website integrates with the NewsCatcher API to provide up-to-date gaming news from various sources. Users can read articles, stay informed about the latest releases, trends, and updates in the gaming world.

- **User-Friendly Interface**: GameLink is built using React and styled with Tailwind CSS, resulting in a modern and intuitive user interface. The design prioritizes ease of use, allowing users to navigate the website effortlessly and discover new games and news articles seamlessly.

## Motivation and APIs

GameLink was developed with the goal of providing gamers with a comprehensive platform to explore games and access gaming-related news conveniently. The project leverages the following APIs:

- [RAWG API](https://rawg.io/apidocs): The RAWG API offers a vast database of games, enabling us to fetch game information, including details, ratings, screenshots, and videos. This allows GameLink users to browse and search for their favorite games easily.

- [NewsCatcher API](https://newscatcherapi.com/): The NewsCatcher API provides real-time news articles from numerous sources, including gaming publications and websites. By integrating this API, GameLink ensures that users can stay updated with the latest gaming news and trends.

## Installation

```md
1. Clone the repository:

   git clone https://github.com/your-username/GameLink.git

2. Navigate to the project directory:

   cd GameLink

3. Install the dependencies:

   npm install

4. Create a `.env` file in the root directory and provide the necessary API keys. You will need the API keys for both the RAWG API and NewsCatcher API.

   RAWG_API_KEY=your_rawg_api_key
   NEWSCATCHER_API_KEY=your_newscatcher_api_key

5. Start the development server:

   npm start

6. Open your browser and navigate to `http://localhost:3000` to access GameLink.

## Contributing

We welcome contributions to GameLink! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature:

   git checkout -b feature/my-feature

3. Make the necessary changes and commit them:

   git commit -m "Add my feature"

4. Push the changes to your forked repository:

   git push origin feature/my-feature

5. Open a pull request, and we will review your changes.

## License

This project is licensed under the [MIT License](LICENSE).

Make sure to replace `your-username` with your GitHub username in the installation instructions. Also, don't forget to add your own API keys in the `.env` file instructions.

Remember to replace `your_rawg_api_key` and `your_newscatcher_api_key` with your respective API keys.
```
