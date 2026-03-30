// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Last modified
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
document.getElementById("timestamp").value = new Date().toISOString();