import { codeToHtml } from "shiki";

export async function highlightCommand(code: string, lang = "bash"): Promise<string> {
  return await codeToHtml(code.trim(), {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });
}
