# System Design Generator

A CLI tool that analyzes a code repository and generates a detailed System Design document with Mermaid.js diagrams.

## Features
- 🔍 **Auto-Detection**: Identifies tech stack (Languages, Frameworks, Databases).
- 🏗 **Structure Analysis**: Maps out key directories and modules.
- 📊 **Diagram Generation**: Creates Architecture Diagrams using Mermaid.js.
- 📝 **Markdown Output**: Generates a clean `SYSTEM_DESIGN.md` file.

## Usage

🚀 **Quick Start (No Install Required)**

Run the following command in your repository root:

```bash
npx system-design-generator
```

Or specify a path:

```bash
npx system-design-generator /path/to/your/project
```

### 📦 Install Globally
If you want to use it frequently:

```bash
npm install -g system-design-generator
```
Then run:
```bash
system-design-generator .
```

### 🛠 Local Development
1. Clone the repo
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Link locally: `npm link`
5. Run: `system-design-generator`

## Example Output
The tool generates a `SYSTEM_DESIGN.md` file containing:
- Project Type (Frontend/Backend/Fullstack)
- Technology Stack Table
- High-Level Architecture Diagram
- Folder Structure

## Contributing
Pull requests are welcome!

## Author
**Mallik Galib Shahriar**
