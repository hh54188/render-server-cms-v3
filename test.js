const renderSupervisor = require('./client/renderSupervisor.js');
renderSupervisor.setRsPath('D:\\Work\\render-server');
renderSupervisor.getConfig((configObj) => {
    console.log(configObj);
});

renderSupervisor.lunch();

setInterval(() => {
    renderSupervisor.isRunning((err, result) => {
        console.log(result);
    });
}, 500)