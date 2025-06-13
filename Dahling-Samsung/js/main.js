window.onload = function() {
    // Create a fullscreen webview
    var webview = document.createElement("webview");
    webview.style.width = "100%";
    webview.style.height = "100%";
    webview.src = "https://dahling.dumbwood.com";
    
    document.body.appendChild(webview);
    
    // Optional: Handle errors
    webview.onerror = function(e) {
        console.error("WebView error:", e);
    };
};