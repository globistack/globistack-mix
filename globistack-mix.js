const fs = require('fs');

class GlobistackMix {
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
    static ltrim(string) {
        return string.replace(/^\//, '');
    }
    static assetPaths(data) {
        let assetPaths = Object.keys(data.compilation.assets);
        assetPaths = assetPaths.filter(assetPath => assetPath.endsWith('.css') || assetPath.endsWith('.js'));
        assetPaths = assetPaths.map(assetPath => this.ltrim(assetPath));
        return assetPaths;
    }
    static optimize(data) {
        const assetPaths = this.assetPaths(data);
        for (const assetPath of assetPaths) {
            let data = fs.readFileSync(assetPath, 'utf8');
            data = data.replace(/\r?\n|\r/g, "");
            fs.writeFileSync(assetPath, data);
        }
    }
}

module.exports = GlobistackMix
