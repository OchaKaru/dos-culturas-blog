const React = require("react");
const Arroz = require('./src/arroz-con-webo');

require('./src/styles/global.scss');
const Header = require('./src/components/header').default;
// require('./src/components/footer');

exports.wrapPageElement = ({element, props}) => {
    return (
        <Arroz.Root {...props}>
            <Header />
            {element}
            {/* <Footer /> */}
        </Arroz.Root>
    );
}