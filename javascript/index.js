async function handleSubmit(event) {
  event.preventDefault();

  const urlInput = document.getElementById("url").value.trim();
  const shortUrlDisplay = document.getElementById("shortUrl");
  const submitButton = document.getElementById("submit");

  shortUrlDisplay.textContent = "";
  shortUrlDisplay.removeAttribute("href");
  shortUrlDisplay.classList.remove("text-green-500", "text-red-500");

  submitButton.textContent = "Loading...";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://alyurl.fun/createShortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ original_url: urlInput }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    shortUrlDisplay.classList.add("text-green-500");
    shortUrlDisplay.href = result.new_url;
    shortUrlDisplay.textContent = result.new_url;
    shortUrlDisplay.target = "_blank";
  } catch (error) {
    shortUrlDisplay.classList.add("text-red-500");
    shortUrlDisplay.textContent = "Failed to create short URL. Please try again.";
    shortUrlDisplay.removeAttribute("target");
    console.error("URL shortening failed:", error);
  } finally {
    submitButton.textContent = "Create New URL";
    submitButton.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
