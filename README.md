# Smarty-Quote

![Smarty-Quote Demo](https://via.placeholder.com/800x400.png?text=Smarty-Quote+Demo)

**Smarty-Quote** is an AI-powered web application that generates inspirational quotes expressed as concise mathematical analogies. Built with **React**, **Tailwind CSS**, and powered by the **Hugging Face Inference API** with the `deepseek/deepseek-prover-v2-671b` model via **Novita AI**, this project showcases modern web development and AI integration.

This app was created as a fun and educational project to explore AI-driven content generation, leveraging tools like **Cursor** for rapid development and **Vercel** for seamless deployment.

## Features

- **AI-Generated Quotes**: Create unique mathematical analogies for themes like Motivation, Leadership, Programming, and Success using the DeepSeek-Prover-V2-671B model.
- **Interactive UI**: Select a theme from a dropdown and generate quotes with a single click.
- **Responsive Design**: Styled with Tailwind CSS for a clean, modern look across devices.
- **Copy to Clipboard**: Easily copy generated quotes for sharing.
- **Secure Configuration**: Uses environment variables to protect API tokens.

## Demo

Check out the live demo: [Smarty-Quote]()

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **AI Backend**: Hugging Face Inference API with Novita AI provider (`deepseek/deepseek-prover-v2-671b`)
- **Tools**: Cursor (AI-assisted coding), Vercel (deployment), GitHub (version control)
- **Libraries**: Axios (API requests)

## Getting Started

Follow these steps to run Smarty-Quote locally.

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A **Hugging Face API token** (sign up at [Hugging Face](https://huggingface.co/))
- **Vercel CLI** (for local development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smarty-quote.git
   cd smarty-quote
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory with:
   ```
   HF_ACCESS_TOKEN=your_huggingface_token_here
   ```

5. **Run the development server**:
   ```bash
   vercel dev
   ```
   The first time you run this command, it will:
   - Ask you to log in to Vercel
   - Link the project to your Vercel account
   - Set up the development environment

   After setup, the app will be available at `http://localhost:3000`

### Deployment

The app is configured for automatic deployment with Vercel:

1. Push your changes to GitHub
2. Vercel will automatically deploy your updates
3. Make sure to set the `HF_ACCESS_TOKEN` environment variable in your Vercel project settings

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by Gino Nacchio