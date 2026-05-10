# GitHub Copilot Configuration

This directory contains custom configurations for GitHub Copilot to provide specialized assistance for Marta Hayrapetyan's portfolio project.

## Files Structure

```
.github/
├── AGENTS.md                    # Agent definitions and usage instructions
├── copilot-instructions.md      # Main instructions for Copilot behavior
├── agents/
│   └── portfolio-assistant.agent.md  # Custom agent configuration
└── instructions/
    └── portfolio-data.instructions.md # Automatic data loading instructions
```

## How It Works

### Portfolio Assistant Agent

- **Trigger**: `/portfolio-assistant` in chat
- **Purpose**: Answers questions about Marta and helps with project development
- **Data Sources**: Automatically loads portfolio information

### Automatic Instructions

- **copilot-instructions.md**: General guidelines for all Copilot interactions
- **portfolio-data.instructions.md**: Ensures portfolio data is always loaded

## Usage

### In VS Code Chat

- **About Marta**: "What are Marta's skills?" or "Tell me about her experience"
- **Project Help**: "How does this component work?" or "Suggest improvements"
- **Using Agent**: `/portfolio-assistant What technologies does Marta know?`

### Data Updates

When you update Marta's information:

1. Edit `src/content/savedResponses.md`
2. Update `src/data/portfolioData.ts`
3. Copilot will automatically use the new information

## Benefits

- **Personal Branding**: Consistent, professional responses about Marta
- **Development Help**: Specialized assistance for portfolio project
- **Data Accuracy**: Always uses current portfolio information
- **Lead Generation**: Helps potential employers learn about Marta

## Customization

To modify behavior:

- Edit `copilot-instructions.md` for general rules
- Edit `agents/portfolio-assistant.agent.md` for agent-specific behavior
- Update data files for new information
