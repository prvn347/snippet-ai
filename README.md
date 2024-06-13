# CodeShareAI

SnippetAI is a modern code-sharing platform similar to GitHub Gist, with an additional feature of AI-powered code explanations. Built with Next.js, TypeScript, Gemini Pro API, Tailwind CSS, Prisma ORM, and PostgreSQL, it provides a seamless experience for sharing and understanding code snippets.

## Features

- **Code Sharing**: Easily share code snippets with others.
- **AI Explanations**: Get detailed explanations for your code using the Gemini Pro API.
- **User Authentication**: Secure user authentication and authorization.
- **Responsive Design**: Mobile-friendly design using Tailwind CSS.
- **Collaborations**:Collaborate on code with built-in sharing and commenting features.

## Technologies Used

- **Next.js**: React framework for server-side rendering and generating static websites.
- **TypeScript**: Typed JavaScript for robust and maintainable code.
- **Gemini Pro API**: AI-powered explanations for code snippets.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Prisma ORM**: Type-safe database client for Node.js & TypeScript.
- **PostgreSQL**: Open-source relational database.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prvn347/snippet.git
   cd snippet
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set Up Environment Variables**:
 Create a .env file in the root of your project and add the following
   ```bash
    OPENAI_API_KEY=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=
    API_KEY=

4. **Migrate the Database**:
   ```bash
   npx prisma migrate dev
5. **Run the Development Server**:
   ```bash
   npm run dev
