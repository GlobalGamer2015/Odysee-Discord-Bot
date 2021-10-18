module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        'sourceType': 'module'
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["warn", "single"],
        "spaced-comment": ["error", "always"],
        "eol-last": ["error", "always"],
        "no-undef": ["warn"],
        "no-var": ["error"]
    }
};
