# Cadmus Editor

Cadmus Editor is a collaborative text editor built using **React**, **TypeScript**, and **Vite**. It supports versioning, branching, and a tree-like visualization of branches, making it ideal for collaborative editing and content management.

## Features

- **Versioning**: Automatically create versions of your content with a history of changes.
- **Branching**: Create branches from any version to experiment or work on alternative content paths.
- **Branch Tree Visualization**: View the branching structure in a tree-like format for better understanding of the content hierarchy.
- **Rich Text Editing**: Built with [Tiptap](https://tiptap.dev/) for a modern and extensible editing experience.
- **Dynamic Updates**: Real-time updates to the editor and branch tree as changes are made.
- **Collaborative Editing**: Designed to support multiple users working on the same content.

## How to Run the Application

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or later)
- **npm** or **yarn**

### Steps to Run

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd cadmus-editor
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Open the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Build for Production

To create a production build of the application:

```bash
npm run build
```

The build output will be available in the `dist` directory.

### Preview the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
cadmus-editor/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Application pages
│   ├── store/            # MobX store for state management
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application entry point
├── public/               # Static assets
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Vite**: Fast build tool for modern web applications.
- **MobX**: State management library for managing application state.
- **Tiptap**: Rich text editor framework for extensible editing capabilities.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
