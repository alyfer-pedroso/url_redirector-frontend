async function handleSubmit(event) {
  event.preventDefault();

  const urlInput = document.getElementById("url").value;
  const shortUrl = document.getElementById("shortUrl");
  const button = document.getElementById("submit");

  button.textContent = "Loading...";
  button.disabled = true;

  try {
    const response = await fetch("https://url-shortener-backend-sable.vercel.app/createShortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
      body: JSON.stringify({ original_url: urlInput }),
    });

    if (response.ok) {
      const result = await response.json();

      shortUrl.classList.add("text-green-500");
      shortUrl.href = result.new_url;
      shortUrl.innerHTML = result.new_url;
      shortUrl.target = "_blank";
      return;
    }

    throw new Error();
  } catch {
    shortUrl.innerHTML = "Failed to create new url";
    shortUrl.target = "_self";
  } finally {
    button.textContent = "Create New Url";
    button.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form")?.addEventListener("submit", handleSubmit);
});
