import { text } from "./ui.js";
const rules = {
  emails: ["EMAIL", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
  phones: [
    "PHONE",
    /(?<!\w)(?:\+\d{1,3}[ .-]?(?:\(?\d{2,4}\)?[ .-]?){2,5}\d{2,4}|\(\d{3}\)[ .-]?\d{3}[ .-]?\d{4})(?!\w)/g,
  ],
  keys: [
    "KEY",
    /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{15,}|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)\b/g,
  ],
  ibans: ["IBAN", /\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]){11,30}\b/g],
};
export function maskText(
  input,
  custom = "",
  options = { emails: true, phones: true, keys: true, ibans: true },
) {
  text(input, 60000);
  text(custom, 10000);
  if (/⟦VP_/.test(input))
    throw new Error(
      "Remove existing Veil Paste aliases before masking a new text.",
    );
  const matches = [];
  for (const [name, [kind, regex]] of Object.entries(rules)) {
    if (!options[name]) continue;
    regex.lastIndex = 0;
    for (const m of input.matchAll(regex)) {
      if (
        kind === "PHONE" &&
        (m[0].replace(/\D/g, "").length < 10 ||
          m[0].replace(/\D/g, "").length > 15)
      )
        continue;
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        kind,
        value: m[0],
      });
    }
  }
  if (options.keys)
    for (const m of input.matchAll(
      /\b(?:api[_-]?key|password|token|secret)\s*[:=]\s*["']?([A-Za-z0-9_\-./+=]{6,})/gi,
    )) {
      const start = m.index + m[0].lastIndexOf(m[1]);
      matches.push({
        start,
        end: start + m[1].length,
        kind: "SECRET",
        value: m[1],
      });
    }
  const terms = [
    ...new Set(
      custom
        .split(/\r?\n/)
        .map((v) => v.trim())
        .filter(Boolean),
    ),
  ];
  if (terms.length > 80 || terms.some((v) => v.length < 2 || v.length > 200))
    throw new Error("Use up to 80 custom terms, each 2–200 characters.");
  for (const term of terms) {
    let from = 0,
      index;
    while ((index = input.indexOf(term, from)) !== -1) {
      matches.push({
        start: index,
        end: index + term.length,
        kind: "CUSTOM",
        value: term,
      });
      from = index + term.length;
    }
  }
  if (matches.length > 20000)
    throw new Error(
      "Too many matching fields. Split the text into smaller pieces.",
    );
  matches.sort(
    (a, b) =>
      b.end - b.start - (a.end - a.start) ||
      (a.kind === "CUSTOM" ? -1 : b.kind === "CUSTOM" ? 1 : 0) ||
      a.start - b.start,
  );
  const accepted = [];
  const occupied = new Uint8Array(input.length);
  for (const match of matches) {
    let overlap = false;
    for (let i = match.start; i < match.end; i++)
      if (occupied[i]) {
        overlap = true;
        break;
      }
    if (!overlap) {
      accepted.push(match);
      occupied.fill(1, match.start, match.end);
    }
  }
  accepted.sort((a, b) => a.start - b.start);
  const mapping = [],
    values = new Map(),
    counts = {};
  let output = "",
    offset = 0;
  for (const m of accepted) {
    let entry = values.get(m.value);
    if (!entry) {
      counts[m.kind] = (counts[m.kind] || 0) + 1;
      entry = {
        token: "⟦VP_" + m.kind + "_" + counts[m.kind] + "⟧",
        value: m.value,
        kind: m.kind,
      };
      mapping.push(entry);
      values.set(m.value, entry);
    }
    output += input.slice(offset, m.start) + entry.token;
    offset = m.end;
  }
  output += input.slice(offset);
  return { output, mapping, occurrences: accepted.length };
}
export function restoreText(reply, mapping) {
  text(reply, 60000);
  const known = new Map(mapping.map((m) => [m.token, m.value]));
  const unknown = new Set();
  const output = reply.replace(/⟦VP_[A-Z]+_\d+⟧/g, (token) => {
    if (known.has(token)) return known.get(token);
    unknown.add(token);
    return token;
  });
  return { output, unknown: [...unknown] };
}
