const fs = require('fs');

class GlobistackMix {
    /**
     * 
     * @returns {string}
     */
    static getConfig() {
        return {
            cleanCss: {
                level: {
                    1: {
                        specialComments: 'none'
                    }
                }
            }
        }
    }
    /**
     * 
     * @param {string} string
     * @returns {string}
     */
    static ltrim(string) {
        return string.replace(/^\//, '');
    }
    /**
     * 
     * @param {Object} data
     * @returns {Array}
     */
    static assetPaths(data) {
        let assetPaths = Object.keys(data.compilation.assets);
        assetPaths = assetPaths.filter(assetPath => assetPath.endsWith('.css') || assetPath.endsWith('.js'));
        assetPaths = assetPaths.map(assetPath => this.ltrim(assetPath));
        return assetPaths;
    }
    /**
     * 
     * @param {Object} data
     * @returns {void}
     */
    static optimize(data) {
        const assetPaths = this.assetPaths(data);
        for (const assetPath of assetPaths) {
            let data = fs.readFileSync(assetPath, 'utf8');
            data = data.replace(/^\s+|\s+$/g, '');
            fs.writeFileSync(assetPath, data);
        }
    }
}

module.exports = GlobistackMix
