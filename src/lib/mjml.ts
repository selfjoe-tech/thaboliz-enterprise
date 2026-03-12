import "server-only";
import path from "node:path";
import { readFile } from "node:fs/promises";
import mjml2html from "mjml";

type TemplateVars = Record<string, string>;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMessageHtml(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function injectVars(template: string, vars: TemplateVars): string {
  let output = template;

  for (const [key, value] of Object.entries(vars)) {
    const safeValue =
      key === "message" ? formatMessageHtml(value) : escapeHtml(value);

    output = output.replaceAll(`{{${key}}}`, safeValue);
  }

  return output;
}

export async function renderMjmlTemplate(
  filename: string,
  vars: TemplateVars
): Promise<string> {
  const emailsDir = path.join(process.cwd(), "emails");
  const filePath = path.join(emailsDir, filename);

  const template = await readFile(filePath, "utf8");
  const compiledMjml = injectVars(template, vars);

  const result = mjml2html(compiledMjml, {
    filePath,
    validationLevel: "strict",
    minify: false,
    beautify: false,
  });

  if (result.errors.length > 0) {
    console.error("MJML render errors:", result.errors);
  }

  return result.html;
}