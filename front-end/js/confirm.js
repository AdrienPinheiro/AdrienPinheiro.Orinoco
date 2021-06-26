// Récupère le numéro de commande mis en paramètre URL pour l'afficher dans un message pour le client

function confirm() {
    const orderId = new URL(location.href).searchParams.get("orderId")
    document.getElementById("commandId").textContent = orderId
}

window.addEventListener("DOMContentLoaded", confirm, false);