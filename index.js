function myRender() {
    console.log(`myRender() called`)
    // • renderMathInElement() is a function from KaTeX
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError : false,
        macros: {
            "\\RR": "\\mathbb{R}",
            "\\ZZ": "\\mathbb{Z}",
            "\\CC": "\\mathbb{C}",
            "\\QQ": "\\mathbb{Q}",
            "\\NN": "\\mathbb{N}",
            "\\F": "\\mathcal{F}",
            "\\phi": "\\varphi",
            "\\eps": "\\varepsilon",
            "\\enclose": "\\left(#1\\right)",
            "\\Enclose": "\\left[#1\\right]",
            "\\ENCLOSE": "\\left\\{#1\\right\\}",
            "\\abs": "\\left\\lvert#1\\right\\rvert",
        }
      });
}
