const path = require('path');

module.exports = {
  extends: 'airbnb',
  
  parser: 'babel-eslint',
  
  plugins: [
    'react',
  ],
  
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
    }],

    experimentalDecorators: true,
    
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': [0, "as-needed"],
    
    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': 0,
    
    // http://eslint.org/docs/rules/func-names
    'func-names': 0,
    
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    'react/jsx-indent': [2, 2],
    
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': [2, 2],
    
    'react/prop-types': 0,
    
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "semi": 0,
    "no-trailing-space": 0,
    "spaced-comment": 0,
    "no-useless-constructor": 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "function-paren-newline": 0,
  },
  
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'webpack.config.js'),
      },
    },
  },
  
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  
  globals: {
    ENV: false,
    NODE_ENV: false,
    API_VERSION: false,
    Backbone: false,
  },
};
