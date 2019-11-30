module.exports = {
    entry: './src/app/index.js', //archivo a tranformar
    output: {
        path: __dirname + '/src/public', //lugar de destino
        filename: 'bundle.js' //archivo tranformado
    },
    //Otras configuraciones usando babel
    module: {
        rules: [
            {
                use: 'babel-loader', //para que webpack se comunique con babel y traducir el codigo
                test: /\.js$/, //testea todo los file.js
                exclude: /node_modules/ //menos esta carpeta
            }
        ]
    }
};