const React = require("react");
const Arroz = require('./src/arroz-con-webo');

require('./src/styles/global.scss');

exports.wrapPageElement = ({element, props}) => {
    return <Arroz.Root {...props}>{element}</Arroz.Root>
}