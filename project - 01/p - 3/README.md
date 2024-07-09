# Gemini Pro Vision

This application uses Google Generative AI to analyze and compare images.

## Prerequisites

- Node.js installed
- `dotenv` package installed
- `@google/generative-ai` package installed
- `node-fetch` package installed
- Images to compare (e.g., `hand.jpeg`, `paper.jpeg`)

## Installation

1. Install the required packages:

    ```bash
    npm install dotenv @google/generative-ai node-fetch
    ```

2. Create a `.env.local` file with your Google Generative AI API key:

    ```plaintext
    API_KEY=your_api_key_here
    ```

3. Place your images in the project directory.

## Usage

1. Ensure you are in the project directory.

2. Run the application:

    ```bash
    node gemini-pro-vision.js
    ```

## Code Explanation

- **dotenv:** Loads environment variables from a `.env.local` file.
- **fs:** Node.js file system module for reading files.
- **GoogleGenerativeAI:** The class used to interact with Google Generative AI.
- **fetch:** The global `fetch` function provided by `node-fetch`.

The script reads two images, converts them to base64, and sends them to the AI model along with a prompt. The AI's response is printed to the console.

### Example Outputs

#### Output
![Output](../img/1geminiprovision.png)
