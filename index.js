main()

function main() {
    expandTheorems()
}

function expandTheorems() {
    // take all <p> with class "theorem"
    // and add a <b>Teorema</b> as initial text
    // if <p> has a "name" property, then add 
    // then enclose the name between parentheses
    const classes = {
        theorem: {title: "Teorema"},
        lemma: {title: "Lemma"},
        corollary: {title: "Corollario"},
        proposition: {title: "Proposizione"},
        definition: {title: "Definizione"},
        example: {title: "Esempio"},
        remark: {title: "Osservazione"},
        exercise: {title: "Esercizio"},
        proof: {title: "Dimostrazione", proofType: true},
        problem: {title: "Problema"},
    }

    Object.entries(classes).forEach(([className, options]) => {
        const title = options.title
        const theorems = document.querySelectorAll(`p.${className}`)
        for (let i = 0; i < theorems.length; i++) {
            let theorem = theorems[i]
            let text = theorem.innerHTML
            let myTitle = title 
            const name = theorem.getAttribute("name")
            if (options.proofType) {
                if (name) myTitle = name
                theorem.innerHTML = `<i>${myTitle}.</i> ${text}`
            } else { 
                if (name) myTitle = `${myTitle} (${name})`
                theorem.innerHTML = `<b>${myTitle}.</b> ${text}`
            }
        }
    })
}

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
            "\\M": "\\mathcal{M}",
            "\\P": "\\mathcal{P}",
            "\\phi": "\\varphi",
            "\\eps": "\\varepsilon",
            "\\enclose": "\\left(#1\\right)",
            "\\Enclose": "\\left[#1\\right]",
            "\\ENCLOSE": "\\left\\{#1\\right\\}",
            "\\abs": "\\left\\lvert#1\\right\\rvert",
        }
      });
}

