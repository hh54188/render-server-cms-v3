import electronProxy from 'src/electronProxy.js';

class TemplateRemote {
    constructor() {
    }
    getTemplates() {
        return new Promise((resolve, reject) => {
            electronProxy.getTemplates((err, styles) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(styles);
            })
        });
    }
    
}

export default new TemplateRemote();