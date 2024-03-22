window.addEventListener('message', function(event) {
    if (event.data.toggleState === 'toggled') {
        var iframe = document.getElementById('navbarFrame');
        iframe.style.height = (iframe.style.height === '270px') ? '110px' : '270px';
    }
});

window.addEventListener('load', function() {
    var iframe = document.getElementById('navbarFrame');
    iframe.contentWindow.postMessage({ init: 'true' }, '*');
});