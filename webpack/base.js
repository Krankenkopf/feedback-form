import path from 'path';

import {aliasItems, externalItems} from './config';
import entry from './entry';
import optimization from './optimization';
import * as plugins from './plugins';
import * as rules from './rules';
import {defaultPort, isDevServer, isProd} from './utils/env';
import {arrayFilterEmpty} from './utils/helpers';

export default {
    context: __dirname,
    target: isDevServer ? 'web' : ['web', 'es5'],
    mode: isProd ? 'production' : 'development',
    entry,
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: isDevServer ? undefined : './',
        filename: isDevServer
            ? '[name].[fullhash].js'
            : '[name].[contenthash].js',
    },
    module: {
        rules: arrayFilterEmpty([
            rules.javascriptRule,
            rules.typescriptRule,
            rules.htmlRule,
            rules.imagesRule,
            rules.fontsRule,
            rules.cssRule,
            ...rules.sassRules,
            ...rules.svgRules,
        ]),
    },
    plugins: arrayFilterEmpty([
        plugins.htmlWebpackPlugin,
        plugins.providePlugin,
        plugins.definePlugin,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.esLintPlugin,
        plugins.copyPlugin,
    ]),
    resolve: {
        alias: aliasItems,
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
          },
          compress: true,
          port: defaultPort,
    },
    optimization,
    externals: externalItems,
};
