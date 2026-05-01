---
description: Synchronize UI components (About, Contact, Footer) with the data from savedResponses.md.
globs: src/content/savedResponses.md, src/components/**/*
---

# Skill: Sync Portfolio Components

## Goal

Synchronize UI components with `src/content/savedResponses.md`.

## Steps

1. Read and analyze `src/content/savedResponses.md`.

2. Map Markdown sections to existing component sections (About, Contact, Footer) based on semantic meaning (e.g., skills → skills section, contacts → contact section).

3. Update only matching content:
   - text
   - links
   - skills

4. Do not rephrase or enhance text. Use content exactly as written in Markdown.

5. Do not modify layout, structure, or CSS classes (className).

6. Apply strict sync for contacts:
   - If a contact exists in Markdown → include it
   - If a contact is missing in Markdown → remove it from UI

**Always respect rules from .cursor/rules/portfolio-sync.md**

## Output

Provide a report:

- Updated: (list changes)
- Added: (list new items)
- Removed: (list items removed due to missing data)
- Unchanged: (list sections kept as is)
