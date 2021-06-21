function confirm() {
    const orderId = new URL(location.href).searchParams.get('orderId')
    document.getElementById('commandId').textContent = orderId
}

window.addEventListener("DOMContentLoaded", confirm, false);