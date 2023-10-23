import * as React from 'react';
import {Script} from 'gatsby';
import {createUseStyles} from 'react-jss';

// arroz imports
import {InvalidContainerError, LanguageNotSupportedError} from '../../error';
import {valid_container} from '../containment/container-context';

const useStyles = createUseStyles(({theme}) => ({
    "arroz-code": {
        "&.prettyprint": {
            border: "none",
            display: "block",
            padding: theme.typography.calculate(1),
            backgroundColor: ({container_type}) => theme.scheme.neutral[container_type],
            borderRadius: ({rounded}) => theme.typography.calculate(rounded? 1 : 0.2),
            boxShadow: ({outlined}) => outlined? `inset 0 0 0 ${theme.typography.calculate(0.1)} ${theme.scheme.neutral.outline}` : 0,
            font: theme.typography.code(),
        },
        "& .str": {color: theme.scheme.neutral.code.string},
        "& .kwd": {color: theme.scheme.neutral.code.keyword, fontWeight: "bold"},
        "& .com": {color: theme.scheme.neutral.code.comment},
        "& .typ": {color: theme.scheme.neutral.code.type},
        "& .lit": {color: theme.scheme.neutral.code.literal},
        "& .pun": {color: theme.scheme.neutral.code.punctuation},
        "& .pln": {color: theme.scheme.neutral.code.plaintext},
        "& .tag": {color: theme.scheme.neutral.code.tag, fontWeight: "bold"},
        "& .atn": {color: theme.scheme.neutral.code.attribute_name, fontWeight: "bold"},
        "& .atv": {color: theme.scheme.neutral.code.attribute_value},
        "& .dec": {color: theme.scheme.neutral.code.decimal},
        "& ol.linenums": {
            marginTop: 0, 
            marginBottom: 0, 
            color: theme.scheme.neutral.code.line_numbers
        },
        "& li.L0, & li.L1, & li.L2, & li.L3, & li.L5, & li.L6, & li.L7, & li.L8": {listStyleType: ({all_lined}) => all_lined? "decimal" : "none"}
    }
}));

/**
 * 
 * @param
 */
export default function Code({className, containerType = "container", rounded, outlined, language, showLineNumbers, startingLine = 1, allLined, children}) {
    if(containerType && !valid_container("neutral", containerType))
        throw new InvalidContainerError();

    const VALID_LANGAUGES = [
        "bsh", "c", "cc", "cpp", "cs", "csh", "cyc", "cv", "htm", 
        "html", "java", "js", "m", "mxml", "perl", "pl", "pm", 
        "py", "rb", "sh", "xhtml", "xml", "xsl"
    ];
    if(language && !VALID_LANGAUGES.includes(language))
        throw new LanguageNotSupportedError();

    const classes = useStyles({"container_type": containerType, rounded, outlined, "all_lined": allLined});
    return (
        <>
            <pre className={`prettyprint ${classes['arroz-code']} ${className?? ""} ${showLineNumbers? `linenums:${startingLine}` : ""}`}>
                <code className={`language-${language}`}>
                    {children}
                </code>
            </pre>
            <Script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"/>
        </>
    );
}