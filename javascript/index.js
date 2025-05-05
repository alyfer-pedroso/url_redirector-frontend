function copyUrl(e) {
  navigator.clipboard.writeText(e.target.textContent).then(() => {
    alert("Copied to clipboard!");
  });
}

function urlValidator(url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  return regex.test(url);
}

async function handleSubmit(event) {
  event.preventDefault();

  const urlInput = document.getElementById("url").value.trim();
  const shortUrlDisplay = document.getElementById("shortUrl");
  const submitButton = document.getElementById("submit");

  shortUrlDisplay.textContent = "";
  shortUrlDisplay.classList.remove("text-green-500", "text-red-500");

  submitButton.textContent = "Loading...";
  submitButton.disabled = true;

  if (!urlInput || !urlValidator(urlInput)) {
    shortUrlDisplay.textContent = "Please enter a URL.";
    shortUrlDisplay.classList.add("text-red-500");
    submitButton.textContent = "Create New URL";
    submitButton.disabled = false;
    return;
  }

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
    shortUrlDisplay.textContent = result.new_url;
  } catch (error) {
    shortUrlDisplay.classList.add("text-red-500");
    shortUrlDisplay.textContent = "Failed to create short URL. Please try again.";
    console.error("URL shortening failed:", error);
  } finally {
    submitButton.textContent = "Create New URL";
    submitButton.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const urlButton = document.getElementById("shortUrl");

  if (urlButton) {
    urlButton.addEventListener("click", copyUrl);
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
