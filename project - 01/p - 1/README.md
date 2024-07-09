# Gemini Chat Application

This application uses Google Generative AI to simulate a chat session. Users can input messages, and the AI will respond based on the input.

## Prerequisites

- Node.js installed
- `dotenv` package installed
- `@google/generative-ai` package installed
- `node-fetch` package installed

## Installation

1. Install the required packages:

    ```
    npm install dotenv @google/generative-ai node-fetch
    ```

2. Create a `.env.local` file with your Google Generative AI API key:

    ```
    API_KEY=your_api_key_here
    ```

## Usage

1. Ensure you are in the project directory.

2. Run the application:

    ```
    node gemini-chat.js
    ```

3. Enter your messages in the terminal. To exit the chat, type `exit`.

## Code Explanation

- **dotenv:** Loads environment variables from a `.env.local` file.
- **readline:** Provides an interface for reading data from a readable stream.
- **GoogleGenerativeAI:** The class used to interact with Google Generative AI.
- **fetch:** The global `fetch` function provided by `node-fetch`.

The script initializes a chat session with the AI model and continuously prompts the user for input. The user's message is sent to the AI, and the AI's response is printed to the console.

### Example Outputs

#### Output
![Output](../img/1gemini-chat.png)
