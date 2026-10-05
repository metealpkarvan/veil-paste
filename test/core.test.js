import test from "node:test";
import assert from "node:assert/strict";
import { maskText, restoreText } from "../src/core.js";
test("repeated emails get one stable alias", () => {
  const r = maskText("a@example.com a@example.com");
  assert.equal(r.mapping.length, 1);
  assert.equal(r.occurrences, 2);
  assert.ok(!r.output.includes("a@example"));
});
test("roundtrip returns original text", () => {
  const s = "Hi Ada, email a@example.com or +90 555 123 45 67";
  const r = maskText(s, "Ada");
  assert.equal(restoreText(r.output, r.mapping).output, s);
});
test("custom longest phrase wins overlaps", () => {
  const r = maskText("Ada Lovelace", "Ada\nAda Lovelace");
  assert.equal(r.mapping.length, 1);
  assert.equal(r.mapping[0].value, "Ada Lovelace");
});
test("custom matching is case sensitive", () =>
  assert.equal(maskText("Ada ada", "Ada").occurrences, 1));
test("GitHub key masked", () =>
  assert.equal(
    maskText("ghp_abcdefghijklmnopqrstuvwxyz123456").mapping[0].kind,
    "KEY",
  ));
test("labeled password value only", () => {
  const r = maskText('password: "demo12345"');
  assert.ok(r.output.startsWith('password: "'));
  assert.ok(!r.output.includes("demo12345"));
});
test("JWT masked", () =>
  assert.equal(
    maskText("eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYiJ9.abcdefghi").mapping[0].kind,
    "KEY",
  ));
test("IBAN-like data masked without asserting validity", () =>
  assert.equal(
    maskText("TR33 0006 1005 1978 6457 8413 26").mapping[0].kind,
    "IBAN",
  ));
test("dates not treated as phone numbers", () =>
  assert.equal(maskText("2026-10-05").occurrences, 0));
test("US formatted phone detected", () =>
  assert.equal(maskText("(415) 555-0123").mapping[0].kind, "PHONE"));
test("disabled rule leaves data intact", () =>
  assert.equal(
    maskText("a@example.com", "", { emails: false }).output,
    "a@example.com",
  ));
test("unknown reply aliases preserved", () => {
  const r = restoreText("⟦VP_EMAIL_999⟧", []);
  assert.equal(r.unknown.length, 1);
  assert.equal(r.output, "⟦VP_EMAIL_999⟧");
});
test("replacement literal dollar characters preserved", () => {
  const r = maskText("secret=$&private123", "$&private123");
  assert.equal(restoreText(r.output, r.mapping).output, "secret=$&private123");
});
test("reserved alias rejected", () =>
  assert.throws(() => maskText("⟦VP_EMAIL_1⟧")));
test("unmatched input unchanged", () =>
  assert.equal(maskText("A sunny day.").output, "A sunny day."));
test("one character custom terms rejected", () =>
  assert.throws(() => maskText("hello", "h")));
test("length limited", () => assert.throws(() => maskText("x".repeat(60001))));
test("HTML is data, not transformed into markup", () => {
  const r = maskText("<b>a@example.com</b>");
  assert.ok(r.output.startsWith("<b>"));
  assert.equal(restoreText(r.output, r.mapping).output, "<b>a@example.com</b>");
});

test("dense matches bounded with an actionable error", () =>
  assert.throws(() => maskText("aa".repeat(21000), "aa"), /smaller pieces/));
