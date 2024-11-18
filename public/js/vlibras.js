function initVLibras() {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
}

// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', function() {
    // Cria os elementos do VLibras
    const vwContainer = document.createElement('div');
    vwContainer.className = 'enabled';
    vwContainer.setAttribute('vw', '');

    const accessButton = document.createElement('div');
    accessButton.className = 'active';
    accessButton.setAttribute('vw-access-button', '');

    const pluginWrapper = document.createElement('div');
    pluginWrapper.setAttribute('vw-plugin-wrapper', '');

    const topWrapper = document.createElement('div');
    topWrapper.className = 'vw-plugin-top-wrapper';

    // Monta a estrutura
    pluginWrapper.appendChild(topWrapper);
    vwContainer.appendChild(accessButton);
    vwContainer.appendChild(pluginWrapper);
    document.body.appendChild(vwContainer);

    // Carrega o script do VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.onload = initVLibras;
    document.head.appendChild(script);
});