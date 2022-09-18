(async function () {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("entry_point") === "workspace_signin") {
    window.location.href = window.location.origin;
  }
})();
