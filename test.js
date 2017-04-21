const renderSupervisor = require('./client/renderSupervisor.js');
renderSupervisor.setRsPath('D:\\Work\\render-server');
renderSupervisor.getConfig((configObj) => {
    console.log(configObj);
});

// renderSupervisor.lunch();
var styles = renderSupervisor.collectTemplates();
console.log(styles);