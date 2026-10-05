import { $, t, init, notify, copy, download } from "./ui.js";
import { maskText, restoreText } from "./core.js";
let current = null;
function invalidate() {
  current = null;
  $("masked").textContent = "";
  $("restored").textContent = "";
  $("occurrences").textContent = $("aliases").textContent = "0";
  $("summary").textContent = t(
    "Metin değişti; tekrar maskele.",
    "Text changed; mask it again.",
  );
  $("copy").disabled = $("download").disabled = true;
}
for (const id of ["source", "custom", "emails", "phones", "keys", "ibans"])
  $(id).oninput = invalidate;
$("mask").onclick = () => {
  try {
    if (!$("source").value.trim())
      return notify(t("Önce metin ekle.", "Add text first."));
    const options = Object.fromEntries(
      ["emails", "phones", "keys", "ibans"].map((k) => [k, $(k).checked]),
    );
    current = maskText($("source").value, $("custom").value, options);
    $("masked").textContent = current.output;
    $("restored").textContent = "";
    $("occurrences").textContent = current.occurrences;
    $("aliases").textContent = current.mapping.length;
    $("summary").textContent = current.mapping.length
      ? current.mapping.map((m) => m.token).join(" · ")
      : t(
          "Eşleşme yok. Hassas adları özel terim olarak ekle ve metni incele.",
          "No matches. Add private names as custom terms and review the text.",
        );
    $("copy").disabled = $("download").disabled = false;
  } catch (error) {
    invalidate();
    notify(error.message);
  }
};
$("copy").onclick = () => current && copy(current.output);
$("download").onclick = () =>
  current && download("veil-paste-masked.txt", current.output);
$("restore").onclick = () => {
  if (!current)
    return notify(
      t(
        "Önce bu oturumda bir metni maskele.",
        "Mask a text in this session first.",
      ),
    );
  try {
    const result = restoreText($("reply").value, current.mapping);
    $("restored").textContent = result.output;
    if (result.unknown.length)
      notify(
        t(
          "Bilinmeyen takma adlar korunuyor: ",
          "Unknown aliases left unchanged: ",
        ) + result.unknown.join(", "),
      );
  } catch (error) {
    notify(error.message);
  }
};
$("copy-restored").onclick = () => copy($("restored").textContent);
$("clear").onclick = () => {
  for (const id of ["source", "custom", "reply"]) $(id).value = "";
  invalidate();
  $("summary").textContent = "";
  notify(t("Oturum metni temizlendi.", "Session text cleared."));
};
$("demo").onclick = () => {
  if (
    $("source").value &&
    !confirm(
      t(
        "Mevcut metin kurgusal örnekle değiştirilsin mi?",
        "Replace current text with a fictional sample?",
      ),
    )
  )
    return;
  $("source").value =
    'Help draft a project update for Deniz Yılmaz at Acme Labs. Contact deniz@example.com or +90 555 123 45 67. Deniz Yılmaz approved the design. API_KEY="demo_secret_123456". Send a copy to deniz@example.com.';
  $("custom").value = "Deniz Yılmaz\nAcme Labs";
  invalidate();
  $("mask").click();
};
init();
