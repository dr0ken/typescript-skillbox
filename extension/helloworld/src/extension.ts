import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import { full as markdownItEmoji } from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      // Alert blocks
      md.use(markdownItContainer, 'alert', {
        validate: () => true,
        render: (tokens: any, idx: number) => {
          return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
        }
      });

      // Spoiler blocks
      md.use(markdownItContainer, 'spoiler', {
        marker: '?',
        validate: () => true,
        render: (tokens: any, idx: number) => {
          // Логика для скрытия/раскрытия
          return tokens[idx].nesting === 1 ? 
            '<div class="spoiler"><details><summary>Spoiler</summary>' : 
            '</details></div>';
        }
      });

      md.use(markdownItEmoji);

      return md;
    }
  };
}

export function deactivate() {}
