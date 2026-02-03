# System Design Generator

A CLI tool that analyzes a code repository and generates a detailed System Design document with Mermaid.js diagrams.

## Features
- 🔍 **Auto-Detection**: Identifies tech stack (Languages, Frameworks, Databases).
- 🏗 **Structure Analysis**: Maps out key directories and modules.
- 📊 **Diagram Generation**: Creates Architecture Diagrams using Mermaid.js.
- 📝 **Markdown Output**: Generates a clean `SYSTEM_DESIGN.md` file.

## 🚀 Quick Start (Beginner's Guide)

You don't need to install anything! Just open your terminal (Command Prompt, PowerShell, or Terminal) and follow these steps.

### 1. Open Your Project
Navigate to the folder where your code is located.
```bash
cd your-project-folder
```

### 2. Run the Tool
Run this magic command:
```bash
npx system-design-generator
```

That's it! 🎉 
It will analyze your code and create a new file called `SYSTEM_DESIGN.md` in your folder. You can open this file to see your system architecture.

---

## 🛠 Advanced Usage

### Analyze a Specific Folder
If you are in a different folder, you can tell the tool which folder to analyze:
```bash
npx system-design-generator "C:/Path/To/Your/Project"
```

### Install Globally (Optional)
If you want to use this tool often without downloading it every time:
```bash
npm install -g system-design-generator
```
Then you can just run:
```bash
system-design-generator
```

### 👨‍💻 Local Development
If you want to modify this tool:
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
