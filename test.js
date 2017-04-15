const renderSupervisor = require('./client/renderSupervisor.js');
renderSupervisor.setRsPath('I:\\render-server');
renderSupervisor.getConfig((configObj) => {
    console.log(configObj);
});

renderSupervisor.lunch();